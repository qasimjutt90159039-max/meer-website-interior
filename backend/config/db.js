import mongoose from 'mongoose';
import { memoryStore } from './store.js';

let isMongooseConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/meers_interior';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 1500,
    });
    isMongooseConnected = true;
    console.log(`[Database] Connected to external MongoDB at: ${uri}`);
    return true;
  } catch (error) {
    isMongooseConnected = false;
    console.log(`[Database] External MongoDB not active (${error.message}). Activated high-performance In-Memory Database store with initial catalog preloaded.`);
    return false;
  }
};

export const getDbStatus = () => ({
  isMongooseConnected,
  mode: isMongooseConnected ? 'MongoDB Server' : 'In-Memory Store',
});

export const getModel = (name, mongooseModel) => {
  if (isMongooseConnected) {
    return mongooseModel;
  }
  const key = name.toLowerCase();
  return memoryStore[key] || mongooseModel;
};

export const disconnectDB = async () => {
  if (isMongooseConnected) {
    await mongoose.disconnect();
  }
};
