import mongoose from "mongoose";
export async function openMongoose() {
  try {
    //   "mongodb://39.105.171.169:27017/msmpicp"
    await mongoose.connect("mongodb://39.105.171.169:27017/msmpicp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return "database start success";
  } catch (e) {
    return "" + e;
  }
}
export async function closeMongoose() {
  try {
    await mongoose.disconnect();
    return "database stop success";
  } catch (e) {
    return "" + e;
  }
}
