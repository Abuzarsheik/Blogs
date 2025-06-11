#!/usr/bin/env node

/**
 * 🔧 Environment Setup Helper
 * This script helps you configure environment variables for MongoDB Atlas + Render + Vercel
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 MERN Blog Deployment - Environment Setup Helper\n');

const config = {};

const questions = [
  {
    key: 'mongoUri',
    question: '🗄️  Enter your MongoDB Atlas connection string:\n   (mongodb+srv://username:password@cluster.mongodb.net/blog_db): ',
    example: 'mongodb+srv://blog_admin:BlogSecure2024!@blog-cluster.xxxxx.mongodb.net/blog_db?retryWrites=true&w=majority'
  },
  {
    key: 'jwtSecret',
    question: '🔐 Enter your JWT secret (minimum 32 characters):\n   (or press Enter to generate one): ',
    example: 'super-secret-jwt-key-2024-minimum-32-characters-long-for-security'
  },
  {
    key: 'renderBackendUrl',
    question: '🖥️  Enter your Render backend URL:\n   (https://your-service.onrender.com): ',
    example: 'https://blog-backend.onrender.com'
  },
  {
    key: 'vercelFrontendUrl',
    question: '🌐 Enter your Vercel frontend URL:\n   (https://your-app.vercel.app): ',
    example: 'https://your-blog.vercel.app'
  }
];

function askQuestion(index = 0) {
  if (index >= questions.length) {
    generateConfiguration();
    return;
  }

  const { key, question, example } = questions[index];
  
  rl.question(question, (answer) => {
    if (key === 'jwtSecret' && !answer.trim()) {
      // Generate JWT secret if not provided
      config[key] = generateJWTSecret();
    } else if (!answer.trim()) {
      console.log(`❌ ${key} is required. Using example value.`);
      config[key] = example;
    } else {
      config[key] = answer.trim();
    }
    
    askQuestion(index + 1);
  });
}

function generateJWTSecret() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let secret = '';
  for (let i = 0; i < 64; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return secret;
}

function generateConfiguration() {
  console.log('\n🎉 Configuration Generated!\n');
  
  console.log('📋 RENDER BACKEND ENVIRONMENT VARIABLES:');
  console.log('Copy these to your Render service environment variables:\n');
  console.log('NODE_ENV=production');
  console.log('PORT=10000');
  console.log(`MONGODB_URI=${config.mongoUri}`);
  console.log(`JWT_SECRET=${config.jwtSecret}`);
  console.log(`CLIENT_URL=${config.vercelFrontendUrl}`);
  
  console.log('\n📋 VERCEL FRONTEND ENVIRONMENT VARIABLES:');
  console.log('Copy these to your Vercel project environment variables:\n');
  console.log(`REACT_APP_API_URL=${config.renderBackendUrl}`);
  
  console.log('\n🔗 YOUR DEPLOYMENT URLS:');
  console.log(`Frontend: ${config.vercelFrontendUrl}`);
  console.log(`Backend:  ${config.renderBackendUrl}`);
  console.log(`API Health Check: ${config.renderBackendUrl}/api/health`);
  
  console.log('\n✅ NEXT STEPS:');
  console.log('1. Copy the environment variables to their respective platforms');
  console.log('2. Redeploy both services after adding variables');
  console.log('3. Test your complete application');
  console.log('4. Check COMPLETE-DEPLOYMENT-GUIDE.md for detailed instructions');
  
  console.log('\n🎯 Need help? Check the troubleshooting section in the guide!');
  
  rl.close();
}

// Start the setup process
askQuestion(); 