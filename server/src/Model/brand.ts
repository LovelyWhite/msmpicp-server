import mongoose from "mongoose";
let BrandData = new mongoose.Schema({
  uniqueId:String,
  model:String,
  brand:String,
});
export default BrandData
