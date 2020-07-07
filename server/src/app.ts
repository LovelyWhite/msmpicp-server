import express from "express";
import bodyParser from "body-parser";
import indexRouter from "./route/index";
import cors from "cors";
import jwt from "jsonwebtoken";
import uploadRouter from "./route/upload";
import { openMongoose } from "./db";
import verifyRouter from "./route/verify";
import downloadRouter from "./route/download";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  let authorization = req.get("Authorization");
  if (req.path === "/verify/login") {
    next();
  } else if (req.path === "/verify/sign") {
    next();
  } else {
    jwt.verify(authorization?.toString()+"", "Mishiweilai123", function (err, decode) {
      if (err) {
        res.send({ code: -1, data: undefined, msg: "Token失效请重新登陆" });
      } else {
        next();
      }
    });
  }
});
app.use("/", indexRouter);
app.use("/upload", uploadRouter);
app.use("/verify", verifyRouter);
app.use("/download", downloadRouter);

main();
app.listen(3001, () => {
  console.log("msmpicp server listening on port 3001!");
});

async function main() {
  try {
    console.log(await openMongoose());
  } catch (e) {
    console.log(e);
  }
}
