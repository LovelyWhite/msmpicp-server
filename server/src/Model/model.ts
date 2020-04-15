import mongoose from "mongoose";
let ModelData = new mongoose.Schema({
  brandName: {
    type: String,
  },
  phoneModelName: {
    type: String,
  },
});
ModelData.index({ brandName: 1, phoneModelName: 1 }, { unique: true });
export default mongoose.model("model", ModelData);