import mongoose from "mongoose";
export async function openMongoose() {
  try {
    //   "mongodb://localhost:27017/msmpicp"
    // mongodb://admin:Mishiweilai123@39.105.171.169:27017/msmpicp?authSource=admin&readPreference=primary&gssapiServiceName=mongodb&appname=MongoDB%20Compass&ssl=false
    await mongoose.connect(
      "mongodb://admin:Mishiweilai123@39.105.171.169:27017/msmpicp?authSource=admin&readPreference=primary&gssapiServiceName=mongodb&appname=MongoDB%20Compass&ssl=false",
    //  "mongodb://localhost:27017/msmpicp?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 10000000,
        socketTimeoutMS: 10000000,
        numberOfRetries:1
      }
    );
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
