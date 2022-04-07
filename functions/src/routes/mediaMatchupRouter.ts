import express from "express";
import { getClient } from "../db";
import MediaMatchup from "../models/MediaMatchup";

const mediaMatchupRouter = express.Router();
const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};
mediaMatchupRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<MediaMatchup>("matchups")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});
export default mediaMatchupRouter;
