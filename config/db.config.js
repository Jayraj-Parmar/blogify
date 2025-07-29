import mongoose from "mongoose";

const connectDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log(`MongoDB connect successfully !!! DB Host: ${url}`);
  } catch (error) {
    console.log({
      error: "MongoDB connection failed !",
      message: error.message,
    });
  }
};

export default connectDb;
