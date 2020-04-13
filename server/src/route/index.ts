import express from "express";
let router = express.Router();
router.get("/", (req, res) => {
  res.send(" this is msmpicp server!");
});
export default router;
