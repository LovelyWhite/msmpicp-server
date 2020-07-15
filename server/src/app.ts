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
  if (req.path.includes("/verify")) {
    next();
  } else if (req.path.includes("/upload")) {
    next();
  } else {
    jwt.verify(authorization?.toString() + "", "Mishiweilai123", function (
      err,
      decode
    ) {
      if (err) {
        res.send({ code: -1, data: undefined, msg: "Token失效请重新登陆" });
      } else {
        next();
      }
    });
  }
});
app.use("/server", indexRouter);
app.use("/server/upload", uploadRouter);
app.use("/server/verify", verifyRouter);
app.use("/server/download", downloadRouter);

main();
let server =  app.listen(3001, () => {
  console.log("msmpicp server listening on port 3001!");
});
server.setTimeout(600000000);

async function main() {
  try {
    console.log(await openMongoose());
  } catch (e) {
    console.log(e);
  }
}
