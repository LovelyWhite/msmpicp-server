import express from "express";
import bodyParser from "body-parser";
import indexRouter from "./route/index";
import cors from "cors";
import jwt from "express-jwt";
import uploadRouter from "./route/upload";
import { openMongoose } from "./db";
import verifyRouter from "./route/verify";
import downloadRouter from "./route/download";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/", indexRouter);
app.use("/upload", uploadRouter);
app.use("/verify", verifyRouter);
app.use("/download", downloadRouter);
app.use(
  jwt({
    secret: "Mishiweilai123",
  }).unless({
    path: ["/verify/login", "/verify/sign"],
  })
);
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
