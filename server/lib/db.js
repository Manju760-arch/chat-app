import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "chatapp",
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error:", error.message);
  }
};
