import express from "express";
import bodyParser from "body-parser";
import indexRouter from "./route/index";
import cors from "cors";
import uploadRouter from "./route/upload";
import { openMongoose } from "./db";
import verifyRouter from "./route/verify";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/", indexRouter);
app.use("/upload", uploadRouter);
app.use("/verify", verifyRouter);

main();

app.listen(5000, () => {
  console.log("msmpicp server listening on port 5000!");
});

async function main() {
  try {
    console.log(await openMongoose());
  } catch (e) {
    console.log(e);
  }
}
