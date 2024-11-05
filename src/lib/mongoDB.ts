import mongoose from "mongoose";

interface ConnectionStatus {
  isConnected: boolean;
}

const connection: ConnectionStatus = { isConnected: false };

if (!process.env.MONGODB_URL) {
  console.error("Error: MONGODB_URL environment variable is not set.");
}
const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    return; // No need to reconnect if already connected
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL!, {
      // No need for useNewUrlParser and useUnifiedTopology in Mongoose >= 6
    });
    console.log(`Connected to MongoDB: ${db.connection.name}`);
    connection.isConnected = true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
export default dbConnect;
