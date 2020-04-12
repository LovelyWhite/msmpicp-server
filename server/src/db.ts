import mongoose from "mongoose";
export async function openMongoose() {
  try {
    //   "mongodb://39.105.171.169:27017/msmpicp"
    await mongoose.connect("mongodb://localhost:27017/msmpicp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return "success";
  } catch (e) {
    return "" + e;
  }
}
export async function closeMongoose() {
  try {
    await mongoose.disconnect();
    return "success";
  } catch (e) {
    return "" + e;
  }
}
