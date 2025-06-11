import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    fetchPost();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/posts/${id}`);
      setPost(response.data.post);
      setError(null);
    } catch (err) {
      setError(err.response?.status === 404 ? 'Post not found' : 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) return;

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/posts/${id}/like`);
      setPost({
        ...post,
        likesCount: response.data.likesCount,
        isLiked: response.data.isLiked
      });
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !isAuthenticated) return;

    setIsCommenting(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/posts/${id}/comment`, {
        text: comment
      });
      
      setPost({
        ...post,
        comments: response.data.comments
      });
      setComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    } finally {
      setIsCommenting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Post Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Link to="/" className="text-primary-600 hover:text-primary-700">
                ← Back to Posts
              </Link>
              {isAuthenticated && user?.id === post.author._id && (
                <Link
                  to={`/edit/${post._id}`}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm"
                >
                  Edit Post
                </Link>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {post.author?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author?.name}</p>
                <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Post Image */}
          {post.image && (
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/uploads/${post.image}`}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Post Content */}
          <div className="p-6">
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            {/* Like Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleLike}
                disabled={!isAuthenticated}
                className={`flex items-center space-x-2 ${
                  isAuthenticated ? 'hover:text-red-600' : 'cursor-not-allowed'
                } ${post.isLiked ? 'text-red-600' : 'text-gray-500'}`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>{post.likesCount || 0} {post.likesCount === 1 ? 'Like' : 'Likes'}</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Comments ({post.comments?.length || 0})
            </h3>

            {/* Add Comment Form */}
            {isAuthenticated ? (
              <form onSubmit={handleComment} className="mb-8">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-medium text-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write a comment..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={!comment.trim() || isCommenting}
                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isCommenting ? 'Posting...' : 'Post Comment'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="mb-8 p-4 bg-gray-100 rounded-md">
                <p className="text-gray-600">
                  <Link to="/login" className="text-primary-600 hover:text-primary-700">
                    Sign in
                  </Link> to leave a comment.
                </p>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {post.comments?.map((comment) => (
                <div key={comment._id} className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-medium text-sm">
                      {comment.user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{comment.user?.name}</span>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {post.comments?.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;