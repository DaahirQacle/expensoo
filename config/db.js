import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.URL);

  console.log(`connected succefully`);
};

export default connectDB;
