import mongoose from "mongoose";
let DeviceData = new mongoose.Schema({
  modelId: {
    type: mongoose.Types.ObjectId,
    ref: "model",
  },
  uniqueId: {
    type: String,
    unique: true,
  }, //设备唯一码
});
export default mongoose.model("device", DeviceData);
