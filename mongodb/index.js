import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

let isConnected = false;

const cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}
export const connectToDB = async (MONGODB_URL) => {
  // mongoose.set("strictQuery", true);

  // if (isConnected) {
  //   console.log("MongoDB is already connected");
  //   return;
  // }

  // try {
  //   await mongoose.connect(process.env.MONGODB_URL, {
  //     dbName: "HaloChat",

  //   });

  //   isConnected = true;

  //   console.log("MongoDB is connected successfully");
  // } catch (error) {
  //   console.log(error);
  // }


  if (MONGODB_URL === undefined) {
    MONGODB_URI = process.env.MONGODB_URL;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URL) {
    throw new Error('MONGODB_URI is missing');
  }

  cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
    dbName: "HaloChat",
  });
  cached.conn = await cached.promise;

  return cached.conn;
};


/*
import mongoose from 'mongoose'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongoose || { conn: null, promise: null }

export const connectToDatabase = async (
  MONGODB_URI = process.env.MONGODB_URI
) => {
  if (cached.conn) return cached.conn

  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing')

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI)

  cached.conn = await cached.promise

  return cached.conn
}

const mongoose = require('mongoose');

const cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
}

async function connectToDatabase(MONGODB_URI) {
    if (MONGODB_URI === undefined) {
        MONGODB_URI = process.env.MONGODB_URI;
    }
    
    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI is missing');
    }

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI);
    cached.conn = await cached.promise;
    
    return cached.conn;
}

module.exports = { connectToDatabase };
*/