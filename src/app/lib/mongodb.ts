import { MongoClient, ServerApiVersion } from 'mongodb';

// Ensure MONGODB_URI is defined
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('❌ Missing environment variable: "MONGODB_URI"');
}

// MongoDB client options
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Extend globalThis for TypeScript global scope
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Handle MongoDB connection based on environment
if (process.env.NODE_ENV === 'development') {
  // Reuse connection in development to avoid multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Create new connection in production
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;