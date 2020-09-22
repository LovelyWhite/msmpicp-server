import mongoose from "mongoose";
let ModelData = new mongoose.Schema({
  brandName: {
    type: String,
  },
  phoneModelName: {
    type: String,
  },
  sensorInfo:{
    type:Array
  }
});
ModelData.index({ brandName: 1, phoneModelName: 1 }, { unique: true });
export default mongoose.model("model", ModelData);