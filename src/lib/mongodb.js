// src/lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ MONGODB_URI is missing in .env.local");
}

const options = {};
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Reuse client during hot reloads in dev mode
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  // ✅ Choose the correct DB name (replace with yours if needed)
  const db = client.db("Cluster0"); 
  return { client, db };
}

export default clientPromise;
