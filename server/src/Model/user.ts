import mongoose from "mongoose";
let UserData = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});
export default mongoose.model("user", UserData);
