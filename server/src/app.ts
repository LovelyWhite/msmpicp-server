import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import ContextData from "./Model/ContextData";
const app = express();
app.use(bodyParser());

app.get("/", (req, res) => {
  res.send("MSMPICP 后台!");
});
app.post("/upload", async (req, res) => {
  let data = req.body;
  if(data)
  {
    mongoose.connect("mongose://39.105.171.169:27017/msmpicp",{
      useNewUrlParser:true
    })
    const contextData = mongoose.model('ContextData',ContextData)
    await contextData.insertMany(data);
    res.send("upload success");
  }
  else
  {
    res.send("nothing upload");
  }
  
});

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});
