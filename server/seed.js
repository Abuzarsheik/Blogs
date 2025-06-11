const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Post = require('./models/Post');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Create sample users
    const users = [
      {
        name: 'Alex Chen',
        email: 'alex.chen@example.com',
        password: await bcrypt.hash('password123', 10)
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        password: await bcrypt.hash('password123', 10)
      },
      {
        name: 'Michael Rodriguez',
        email: 'michael.rodriguez@example.com',
        password: await bcrypt.hash('password123', 10)
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        password: await bcrypt.hash('password123', 10)
      },
      {
        name: 'David Kim',
        email: 'david.kim@example.com',
        password: await bcrypt.hash('password123', 10)
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log('👥 Created sample users');

    // Create sample posts
    const posts = [
      {
        title: 'The Future of Web Development: Trends to Watch in 2024',
        content: `As we navigate through 2024, the landscape of web development continues to evolve at an unprecedented pace. From artificial intelligence integration to revolutionary frontend frameworks, developers are constantly adapting to new technologies and methodologies.

One of the most significant trends we're witnessing is the rise of AI-powered development tools. These tools are not just automating repetitive tasks but are fundamentally changing how we approach problem-solving in web development. GitHub Copilot, for instance, has become an indispensable companion for many developers, offering intelligent code suggestions and helping to reduce development time significantly.

Another trend gaining momentum is the adoption of micro-frontends architecture. This approach allows teams to work independently on different parts of a web application, leading to better scalability and maintainability. Companies like Netflix and Spotify have successfully implemented this architecture, demonstrating its effectiveness in large-scale applications.

The emphasis on web performance has also reached new heights. With Core Web Vitals becoming a ranking factor for Google, developers are prioritizing performance optimization more than ever. Technologies like Vite and esbuild are revolutionizing the build process, offering lightning-fast development experiences.

Looking ahead, I believe we'll see even more integration of AI in development workflows, continued growth in serverless architectures, and an increased focus on sustainability in web development. The future is certainly exciting for web developers!`,
        author: createdUsers[0]._id,
        likesCount: 23,
        comments: [
          {
            user: createdUsers[1]._id,
            text: 'Great insights! I especially agree with the point about AI-powered development tools. They\'ve been a game-changer in my workflow.',
            createdAt: new Date('2024-01-15T10:30:00Z')
          },
          {
            user: createdUsers[2]._id,
            text: 'The micro-frontends architecture is definitely something worth exploring. Thanks for sharing!',
            createdAt: new Date('2024-01-15T14:20:00Z')
          }
        ],
        createdAt: new Date('2024-01-14T09:00:00Z')
      },
      {
        title: 'Building Scalable React Applications: Lessons Learned',
        content: `After working on several large-scale React applications, I've gathered some valuable insights that I believe every React developer should know. These lessons have been learned through both successes and mistakes, and I hope they can help you in your React journey.

First and foremost, state management is crucial. While React's built-in state is sufficient for small applications, larger applications benefit greatly from external state management solutions. I've had great success with Redux Toolkit, which simplifies Redux usage significantly and reduces boilerplate code.

Component composition is another area where many developers struggle initially. Instead of creating monolithic components, breaking them down into smaller, reusable pieces makes your codebase more maintainable and testable. The principle of single responsibility applies beautifully to React components.

Performance optimization shouldn't be an afterthought. Using React.memo, useMemo, and useCallback strategically can prevent unnecessary re-renders. However, it's important not to over-optimize early in development. Profile first, then optimize based on actual performance bottlenecks.

Testing has become an integral part of my development process. React Testing Library provides an excellent way to test components from a user's perspective, focusing on behavior rather than implementation details. This approach has saved me countless hours in debugging and refactoring.

Finally, keep your dependencies updated and regularly audit your bundle size. Tools like Bundle Analyzer can help identify heavy dependencies that might be slowing down your application.`,
        author: createdUsers[1]._id,
        likesCount: 18,
        comments: [
          {
            user: createdUsers[0]._id,
            text: 'Excellent tips! The point about component composition really resonates with me.',
            createdAt: new Date('2024-01-12T16:45:00Z')
          }
        ],
        createdAt: new Date('2024-01-11T14:30:00Z')
      },
      {
        title: 'Node.js Best Practices for Backend Development',
        content: `Node.js has become the backbone of modern web applications, powering everything from simple APIs to complex microservices. Over the years, I've compiled a list of best practices that have helped me build robust and scalable Node.js applications.

Security should always be your top priority. Always validate and sanitize user inputs, use HTTPS in production, and implement proper authentication and authorization mechanisms. Tools like Helmet.js can help secure your Express applications by setting various HTTP headers.

Error handling is often overlooked but is crucial for production applications. Implement global error handlers, use proper HTTP status codes, and always log errors for debugging purposes. Never expose internal error details to clients, as this can pose security risks.

Database connections should be managed efficiently. Use connection pooling to optimize database performance and always close connections when they're no longer needed. Consider using an ORM like Sequelize or Mongoose to simplify database operations and add an extra layer of security.

Environment configuration is another critical aspect. Use environment variables for configuration settings and never commit sensitive information like API keys to your repository. Tools like dotenv make managing environment variables straightforward.

Performance monitoring should be implemented from the beginning. Use tools like PM2 for process management and consider implementing logging and monitoring solutions to track your application's health in production.

Finally, write comprehensive tests. Unit tests, integration tests, and end-to-end tests all serve different purposes and are essential for maintaining code quality as your application grows.`,
        author: createdUsers[2]._id,
        likesCount: 31,
        comments: [
          {
            user: createdUsers[3]._id,
            text: 'This is exactly what I needed! Thank you for the comprehensive guide.',
            createdAt: new Date('2024-01-10T11:20:00Z')
          },
          {
            user: createdUsers[4]._id,
            text: 'The security tips are particularly valuable. I\'ll be implementing these in my current project.',
            createdAt: new Date('2024-01-10T13:15:00Z')
          }
        ],
        createdAt: new Date('2024-01-09T10:15:00Z')
      },
      {
        title: 'CSS Grid vs Flexbox: When to Use Which',
        content: `One of the most common questions I receive from junior developers is about when to use CSS Grid versus Flexbox. Both are powerful layout systems, but they excel in different scenarios. Understanding their strengths and use cases will help you make better layout decisions.

Flexbox is perfect for one-dimensional layouts. Whether you're arranging items in a row or column, Flexbox provides excellent control over alignment, spacing, and flexibility. It's ideal for components like navigation bars, button groups, and centering content both horizontally and vertically.

CSS Grid, on the other hand, excels at two-dimensional layouts. When you need to control both rows and columns simultaneously, Grid is your best friend. It's perfect for page layouts, card grids, and complex interface designs where precise positioning is required.

In my experience, I often use both technologies together. For example, I might use CSS Grid to create the overall page layout and then use Flexbox within individual grid areas to arrange content. This combination provides maximum flexibility and control.

Browser support for both technologies is excellent now, so compatibility shouldn't be a concern for most projects. However, if you need to support very old browsers, Flexbox has slightly better support than Grid.

Remember, there's no one-size-fits-all solution. The key is understanding the problem you're trying to solve and choosing the tool that best fits your needs. Practice with both, and you'll develop an intuition for when to use each one.`,
        author: createdUsers[3]._id,
        likesCount: 15,
        comments: [
          {
            user: createdUsers[1]._id,
            text: 'This clarifies a lot of confusion I had about these two layout systems. Thanks!',
            createdAt: new Date('2024-01-08T09:30:00Z')
          }
        ],
        createdAt: new Date('2024-01-07T16:20:00Z')
      },
      {
        title: 'The Art of Code Reviews: Building Better Software Together',
        content: `Code reviews are one of the most valuable practices in software development, yet they're often done poorly or skipped entirely. Having participated in hundreds of code reviews, I've learned that effective code reviews can significantly improve code quality, share knowledge, and build stronger teams.

The first principle of good code reviews is to focus on the code, not the person. Provide constructive feedback that helps improve the code while being respectful and considerate. Remember that we're all learning and growing as developers.

Look for both technical and logical issues. Check for potential bugs, performance problems, security vulnerabilities, and adherence to coding standards. But also consider whether the solution makes sense from a business perspective and if there might be simpler approaches.

Don't just focus on problems – acknowledge good code when you see it. Positive feedback helps reinforce good practices and boosts morale. If someone has implemented an elegant solution or followed best practices particularly well, let them know!

Keep reviews small and focused. Large pull requests are difficult to review thoroughly and often lead to missed issues. Aim for changes that can be reviewed in 20-30 minutes. If a change is necessarily large, consider breaking it into smaller, logical commits.

Use code reviews as learning opportunities. Both reviewers and authors can learn from the process. Don't hesitate to ask questions if you don't understand something – it might reveal assumptions that need clarification.

Finally, automate what you can. Use linters, formatters, and automated tests to catch basic issues before the review process. This allows reviewers to focus on higher-level concerns like architecture and business logic.`,
        author: createdUsers[4]._id,
        likesCount: 27,
        comments: [
          {
            user: createdUsers[0]._id,
            text: 'These are excellent guidelines! Our team could definitely benefit from implementing some of these practices.',
            createdAt: new Date('2024-01-06T14:10:00Z')
          },
          {
            user: createdUsers[2]._id,
            text: 'The point about positive feedback is often overlooked but so important for team morale.',
            createdAt: new Date('2024-01-06T15:45:00Z')
          }
        ],
        createdAt: new Date('2024-01-05T12:45:00Z')
      },
      {
        title: 'Understanding TypeScript: Why Static Typing Matters',
        content: `TypeScript has gained tremendous popularity in recent years, and for good reason. As someone who initially resisted the transition from JavaScript, I can now confidently say that TypeScript has made me a more productive and confident developer.

The most obvious benefit of TypeScript is catching errors at compile time rather than runtime. This might seem trivial, but when you're working on large applications with multiple developers, these early error catches can save hours of debugging time. Type errors that would have crashed your application in production are now caught during development.

IDE support is another game-changer. With TypeScript, your IDE can provide much more accurate autocompletion, refactoring tools, and navigation features. This intelligence makes development faster and reduces the cognitive load of remembering API signatures and object structures.

Documentation through types is incredibly valuable. Instead of relying on external documentation that might be outdated, the types themselves serve as living documentation. When you see a function signature, you immediately understand what parameters it expects and what it returns.

However, TypeScript isn't without its challenges. There's definitely a learning curve, especially when dealing with advanced types and generics. The compilation step adds complexity to your build process, and you might encounter situations where TypeScript's type system feels restrictive.

My advice for teams considering TypeScript is to start gradually. You can adopt TypeScript incrementally in existing JavaScript projects, allowing your team to learn and adapt over time. Focus on typing your most critical code first, then expand coverage as you become more comfortable.

The investment in learning TypeScript pays dividends in the long run, especially for larger applications and teams. The increased development confidence and reduced debugging time make it worthwhile for most projects.`,
        author: createdUsers[0]._id,
        likesCount: 19,
        comments: [
          {
            user: createdUsers[3]._id,
            text: 'I\'ve been hesitant to adopt TypeScript, but this post has convinced me to give it a try!',
            createdAt: new Date('2024-01-04T10:20:00Z')
          }
        ],
        createdAt: new Date('2024-01-03T11:30:00Z')
      }
    ];

    await Post.insertMany(posts);
    console.log('📝 Created sample posts');

    console.log('✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`👥 Users created: ${users.length}`);
    console.log(`📝 Posts created: ${posts.length}`);
    console.log(`💬 Comments created: ${posts.reduce((acc, post) => acc + post.comments.length, 0)}`);
    console.log(`❤️ Total likes: ${posts.reduce((acc, post) => acc + post.likesCount, 0)}`);
    
    console.log('\n🔑 Login credentials (all passwords: password123):');
    users.forEach(user => {
      console.log(`📧 ${user.email}`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData(); 