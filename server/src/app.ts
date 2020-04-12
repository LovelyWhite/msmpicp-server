import express from "express";
import bodyParser from "body-parser";
import indexRouter from "./route/index";
import uploadRouter from "./route/upload";
import { openMongoose } from "./db";

const app = express();
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/upload", uploadRouter);

main();

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});

async function main() {
  try {
    console.log(await openMongoose());
  } catch (e) {
    console.log(e);
  }
}
