import mongoose, { Collection } from "mongoose";
let ModelData = new mongoose.Schema({
  brandName: {
    type: String,
    // unique:true
  },
  phoneModelName: {
    type: String,
    // unique:true
  },
});
ModelData.index({ brandName: 1, phoneModelName: 1 }, { unique: true });
export default mongoose.model("model", ModelData);

export function findModel(brandName: string, phoneModelName: string) {}
