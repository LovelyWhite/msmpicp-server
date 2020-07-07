import express from "express";
import ContextDataModel from "../model/contextdata";
// import ModelModel from "../model/model";
import mongoose from "mongoose";
import DeviceModel from "../model/device";
const ObjectId = require("mongoose").Types.ObjectId;
let router = express.Router();
router.post("/contextdata", async (req, res) => {
  //   maxLat: 12
  // maxLng: 12
  // minLat: 12
  // minLng: 12
  // startTime: 1596556800000
  // stopTime: 1597248000000
  let data = req.body;
  console.log(data);
  try {
    let searchData = [];
    if (data.startTime != undefined && data.stopTime != undefined) {
      searchData.push({ "location.time": { $gt: data.startTime } });
      searchData.push({ "location.time": { $lt: data.stopTime } });
    }
    if (data.phoneModel) {
      let devices = await DeviceModel.find({
        modelId: data.phoneModel,
      });
      searchData.push({
        deviceId: {
          $in: devices.map((v) => {
            return new ObjectId(v._id);
          }),
        },
      });
    }
    if(data.minLat){
      searchData.push({ "location.latitude": { $gt: data.minLat } });
    }
    if(data.maxLat){
      searchData.push({ "location.latitude": { $lt: data.maxLat } });
    }
    if(data.minLng){
      searchData.push({ "location.longitude": { $gt: data.minLng } });
    }
    if(data.maxLng){
      searchData.push({ "location.longitude": { $lt: data.maxLng } });
    }
    let result = await ContextDataModel.find(
      JSON.stringify(data) == "{}"
        ? {}
        : {
            $and: searchData,
          }
    );
    if (result.length !== 0) {
      res.send({ code: 1, data: result, msg: "" });
    } else {
      res.send({ code: -1, data: {}, msg: "数据为空" });
    }
  } catch (e) {
    res.send({ code: -2, data: {}, msg: "" + e });
  }
});
router.post("/dailydata", async (req, res) => {
  try {
    let result = await ContextDataModel.aggregate([
      {
        $project: {
          time: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: { $add: [new Date(28800000), "$location.time"] },
            },
          },
          deviceId: 1,
        },
      },
      {
        $lookup: {
          from: "devices",
          localField: "deviceId",
          foreignField: "_id",
          as: "deviceId",
        },
      },
      {
        $group: {
          _id: "$time",
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    console.log(result);
    if (result.length !== 0) {
      res.send({ code: 1, data: result, msg: "" });
    } else {
      res.send({ code: -1, data: {}, msg: "数据为空" });
    }
  } catch (e) {
    res.send({ code: -2, data: {}, msg: "" + e });
  }
});
router.post("/todayData", async (req, res) => {
  let now = new Date(Date.now());
  now.setHours(0);
  now.setMinutes(0);
  let today = now.setSeconds(0);
  let tomm = now.setHours(24);
  try {
    let result = await ContextDataModel.find({
      "location.time": { $gt: today, $lt: tomm },
    });
    res.send({ code: 1, data: result.length, msg: "" });
  } catch (e) {
    res.send({ code: -1, data: "", msg: "" + e });
  }
});
router.post("/modeldata", async (req, res) => {
  try {
    let result = await DeviceModel.aggregate([
      {
        $group: {
          _id: "$modelId",
          total: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "models",
          localField: "_id",
          foreignField: "_id",
          as: "modelName",
        },
      },
    ]);
    result.forEach((e) => {
      let bName =
        e.modelName[0].brandName + " " + e.modelName[0].phoneModelName;
      delete e.modelName;
      e.modelName = bName;
    });
    if (result.length !== 0) {
      res.send({ code: 1, data: result, msg: "" });
    } else {
      res.send({ code: -1, data: {}, msg: "数据为空" });
    }
  } catch (e) {
    res.send({ code: -2, data: {}, msg: "" + e });
  }
});
export default router;
