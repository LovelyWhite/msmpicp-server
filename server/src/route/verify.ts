//这个文件用来做有关用户的操作

// import jwt from "express-jwt";
import UserModel from "../model/user";
import express from "express";
import { LoginData } from "../utils";
let router = express.Router();

router.post("/", (req, res) => {
  res.sendStatus(404);
});
router.post("/sign", async (req, res) => {
  let data: LoginData = req.body;
  console.log(data);
  try {
    if (!data.userName) {
      res.send({ code: -2, data: {}, msg: "账号为空" });
      return;
    }
    if (!data.password) {
      res.send({ code: -3, data: {}, msg: "密码为空" });
      return;
    }

    let userDoc = new UserModel(data);
    let result = await userDoc.save();
    res.send({ code: 1, data: {}, msg: "新账户创建成功" });
  } catch (e) {
    res.send({ code: -4, data: {}, msg: "" + e });
  }
});
router.post("/login", async (req, res) => {
  let data = req.body;
  try {
    if (!data.userName) {
      res.send({ code: -2, data: {}, msg: "账号为空" });
      return;
    }
    if (!data.password) {
      res.send({ code: -3, data: {}, msg: "密码为空" });
      return;
    }

    let result = await UserModel.findOne(data);
    if (result) {
      res.send({ code: 1, data: {}, msg: "验证成功" });
    } else {
      res.send({ code: -4, data: {}, msg: "账号或密码错误" });
    }
  } catch (e) {
    res.send({ code: -5, data: {}, msg: "" + e });
  }
});
export default router;
