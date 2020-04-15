import express from "express";
import ContextDataModel from "../model/contextdata";
import ModelModel from "../model/model";
import DeviceModel from "../model/device";
let router = express.Router();
router.post("/contextdata", async (req, res) => {
    try {
        let result = await ContextDataModel.find({});
       if(result.length !==0){
        res.send({ code: 1, data: result, msg: "" });
       }
       else{
        res.send({ code: -1, data: {}, msg: "数据为空"});
       }
    }
    catch (e) {
        res.send({ code: -2, data: {}, msg: "" + e });
    }
});
export default router;
