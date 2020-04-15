import express from "express";
import ContextDataModel from "../model/contextdata";
import ModelModel from "../model/model";
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
              date: { $add: [new Date(0), "$location.time"] },
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
    if (result.length !== 0) {
      res.send({ code: 1, data: result, msg: "" });
    } else {
      res.send({ code: -1, data: {}, msg: "数据为空" });
    }
  } catch (e) {
    res.send({ code: -2, data: {}, msg: "" + e });
  }
});
router.post("/modeldata", async (req, res) => {
  try {
    let result = await ModelModel.aggregate([
      {
        $group: {
          _id: "$",
        },
      },
    ]);
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
