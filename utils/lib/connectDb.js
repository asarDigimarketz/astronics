import mongoose from "mongoose";

export async function connectDb() {
  // Connect to your MongoDB database here
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected");
}
