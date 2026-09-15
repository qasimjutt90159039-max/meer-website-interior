import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedDatabase } from './utils/seedData.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Lazy DB initialization for serverless platforms like Vercel
let isInitialized = false;
const initDatabase = async () => {
  if (!isInitialized) {
    await connectDB();
    await seedDatabase();
    isInitialized = true;
  }
};

app.use(async (req, res, next) => {
  try {
    await initDatabase();
  } catch (err) {
    console.warn('[Database Init Warning]', err.message);
  }
  next();
});

// Request logging in development
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.url}`);
    next();
  });
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: "Meer's Interior API",
  });
});

// Authentic Business Information Endpoint (strictly only provided information)
app.get('/api/business-info', (req, res) => {
  res.json({
    name: "Meer's Interior",
    category: "Office Furniture Store",
    phone: "+92 300 9490734",
    address: "4 Mission Rd, Anarkali Bazaar Lahore, 54000, Pakistan",
    facebook: "http://www.facebook.com/MeersInterior",
    themeColor: "#95B2B8",
  });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/auth', authRoutes);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

// Start server if not running in serverless environment (e.g., Vercel)
const startServer = async () => {
  try {
    await initDatabase();

    app.listen(PORT, () => {
      console.log(`=========================================`);
      console.log(`  Meer's Interior Backend Server Active  `);
      console.log(`  Port: ${PORT}                          `);
      console.log(`  Mode: ${process.env.NODE_ENV || 'development'}`);
      console.log(`=========================================`);
    });
  } catch (err) {
    console.error('Failed to launch server:', err);
    process.exit(1);
  }
};

if (!process.env.VERCEL) {
  startServer();
}

export default app;
