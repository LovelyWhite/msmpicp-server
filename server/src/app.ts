import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import ContextData from "./model/contextdata";
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("MSMPICP 后台!");
});
app.post("/upload", async (req, res) => {
  let data = req.body;

  if (data) {
    try{
      await mongoose.connect("mongodb://39.105.171.169:27017/msmpicp", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      const contextData = mongoose.model('ContextData', ContextData)
      await contextData.insertMany(data)
      res.send("upload success");
    }
    catch(e)
    {
      console.log(e)
      res.send(""+e);
    }
  }
  else {
    res.send("nothing upload");
  }

});

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});
