import mongoose from "mongoose";
let BrandData = new mongoose.Schema({
  uniqueId:String,
  model:String,
});
export default BrandData
