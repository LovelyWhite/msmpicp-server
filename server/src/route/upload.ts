import express from "express";
import ContextDataModel from "../model/contextdata";
import ModelModel from "../model/model";
import DeviceModel from "../model/device";
import { DeviceUploadData } from "../utils";
let router = express.Router();

router.post("/", async (req, res) => {
  let data: DeviceUploadData = req.body;
  if (data) {
    try {
      //找当前上传的机型
      let modelId: null | string = null;
      let modelResult = await ModelModel.findOne({
        brandName: data.brand,
        phoneModelName: data.model,
      });
      if (modelResult) {
        modelId = modelResult._id;
      } else {
        let modelDoc = new ModelModel({
          brandName: data.brand,
          phoneModelName: data.model,
        });
        let insertRs = await modelDoc.save();
        insertRs && (modelId = insertRs._id);
      }

      //上传当前设备
      //如果modelId = null 说明插入失败，会跳转到catch

      let deviceId: null | string = null;
      if (modelId) {
        let deviceResult = await DeviceModel.findOne({
          uniqueId: data.uniqueId,
        });
        if (deviceResult) {
          deviceId = deviceResult._id;
        } else {
          let deviceDoc = new DeviceModel({
            modelId,
            uniqueId: data.uniqueId,
          });
          let insertRs = await deviceDoc.save();
          insertRs && (deviceId = insertRs._id);
        }
      }
      if (deviceId) {
        let cData = data.data.map((v) => ((v["deviceId"] = deviceId), v));
        await ContextDataModel.insertMany(cData);
        res.send("上传成功");
      }
    } catch (e) {
      console.log(e);
      res.send("" + e);
    }
  } else {
    res.send("上传的数据为空");
  }
});
export default router;
