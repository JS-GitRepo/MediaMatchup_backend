import express from "express";
import { getClient } from "../db";
import DailyMatchupCollection from "../models/DailyMatchupCollection";

const DailyMatchupRouter = express.Router();
const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

DailyMatchupRouter.get("/", async (req, res) => {
  try {
    const { date } = req.query;
    const client = await getClient();
    const query: any = {
      ...(date ? { simpleDate: parseInt(date as string) } : {}),
    };
    const result = await client
      .db()
      .collection<DailyMatchupCollection>("dailymatchups")
      .findOne(query);
    res.json(result);
  } catch (err) {
    errorResponse(err, res);
  }
});

DailyMatchupRouter.post("/", async (req, res) => {
  try {
    const newDailyCollection: DailyMatchupCollection = req.body;
    console.log(req.body);
    const client = await getClient();
    client
      .db()
      .collection<DailyMatchupCollection>("dailymatchups")
      .insertOne(newDailyCollection);
    res.status(200).json(newDailyCollection);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default DailyMatchupRouter;
