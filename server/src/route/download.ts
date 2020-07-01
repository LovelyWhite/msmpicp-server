import express from "express";
import ContextDataModel from "../model/contextdata";
// import ModelModel from "../model/model";
import DeviceModel from "../model/device";
let router = express.Router();
router.post("/contextdata", async (req, res) => {
  try {
    let result = await ContextDataModel.find({});
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
