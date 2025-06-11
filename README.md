# BlogSpace - Full Stack MERN Blog Application

A modern, full-stack blogging platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, CRUD operations, image uploads, likes, and comments.

## ✨ Features

### 🔐 Authentication
- User registration and login with JWT
- Password hashing with bcrypt
- Protected routes and middleware
- Persistent login state

### 📝 Blog Management
- Create, read, update, and delete posts
- Rich text content support
- Image upload functionality
- Author-only edit/delete permissions

### 🎯 Interactive Features
- Like/unlike posts
- Comment system
- Real-time interaction feedback
- User avatars and profiles

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Beautiful animations and transitions
- Loading states and error handling
- Mobile-first approach

## 🛠 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **Express Validator** - Input validation

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first styling

## 📦 Project Structure

```
├── client/                 # React frontend
│   ├── public/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   └── ...
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                 # Node.js backend
│   ├── config/            # Database configuration
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── uploads/           # File upload directory
│   ├── package.json
│   └── server.js
│
└── README.md
```

## 🚀 Getting Started

### 🏃‍♂️ Quick Start (Windows)

**Easiest way to run the application:**
1. Double-click `run-blog.bat` to start both servers automatically
2. Open http://localhost:3000 in your browser
3. To stop: double-click `stop-blog.bat`

**Having port issues?** Run `stop-blog.bat` first to kill existing processes.

---

### 📝 Manual Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd mern-blog
```

### 2. Backend Setup

Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the server directory:
```env
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

Start the backend server:
```bash
# Development
npm run dev

# Production
npm start
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

Navigate to the client directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the client directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

Start the React development server:
```bash
npm start
```

The client will run on `http://localhost:3000`

### 4. Database Setup

#### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The app will connect to `mongodb://localhost:27017/mern-blog`

#### Option 2: MongoDB Atlas
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

## 📱 Usage

1. **Register/Login**: Create an account or sign in
2. **Browse Posts**: View all posts on the home page
3. **Create Posts**: Click "Create Post" to write new content
4. **Edit/Delete**: Manage your own posts (author permissions)
5. **Interact**: Like posts and add comments
6. **Upload Images**: Add images to enhance your posts

## 🌐 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Post Routes
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (author only)
- `DELETE /api/posts/:id` - Delete post (author only)
- `POST /api/posts/:id/like` - Like/unlike post (protected)
- `POST /api/posts/:id/comment` - Add comment (protected)

## 🚀 Deployment

### Frontend - Vercel

1. Build the React app:
```bash
cd client
npm run build
```

2. Deploy to Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo to Vercel dashboard
```

3. Set environment variables in Vercel:
   - `REACT_APP_API_URL` = Your backend URL

### Backend - Render

1. Create a `render.yaml` file in the server directory:
```yaml
services:
  - type: web
    name: mern-blog-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: CLIENT_URL
        sync: false
```

2. Connect your GitHub repository to Render
3. Set environment variables in Render dashboard
4. Deploy!

### Backend - Railway (Alternative)

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and deploy:
```bash
railway login
railway init
railway up
```

3. Set environment variables in Railway dashboard

### Environment Variables for Production

**Backend:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-blog
JWT_SECRET=your-super-secure-production-secret
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.vercel.app
```

**Frontend:**
```env
REACT_APP_API_URL=https://your-backend-domain.render.com
```

## 🔧 Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Code Structure

The application follows a clean, modular architecture:

- **Separation of Concerns**: Clear separation between frontend and backend
- **RESTful API**: Well-structured REST endpoints
- **Component-Based**: Reusable React components
- **Context Pattern**: Centralized state management
- **Error Handling**: Comprehensive error handling and validation
- **Security**: JWT authentication, input validation, file upload restrictions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check MongoDB is running
   - Verify connection string
   - Check network connectivity for Atlas

2. **CORS Errors**
   - Verify CLIENT_URL environment variable
   - Check CORS configuration in server

3. **JWT Authentication Issues**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Clear localStorage and re-login

4. **File Upload Issues**
   - Check uploads directory exists
   - Verify file size limits
   - Check file type restrictions

### Support

If you encounter any issues, please:
1. Check the troubleshooting section
2. Search existing issues on GitHub
3. Create a new issue with detailed information

## 🌟 Features Roadmap

- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profiles and avatars
- [ ] Post categories and tags
- [ ] Search functionality
- [ ] Real-time notifications
- [ ] Social media sharing
- [ ] Rich text editor
- [ ] Draft posts
- [ ] Post analytics

---

Built with ❤️ using the MERN stack 