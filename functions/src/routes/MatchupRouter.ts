import express from "express";
import { getClient } from "../db";
import Matchup from "../models/Matchup";

const MatchupRouter = express.Router();
const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

MatchupRouter.get("/", async (req, res) => {
  try {
    const { uid } = req.query;
    const client = await getClient();
    const query: any = {
      ...(uid ? { uid: uid as string } : {}),
    };
    const results = await client
      .db()
      .collection<Matchup>("matchups")
      .find(query)
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

MatchupRouter.post("/", async (req, res) => {
  try {
    const newMatchup: Matchup = req.body;
    const client = await getClient();
    client.db().collection<Matchup>("matchups").insertOne(newMatchup);
    res.status(200).json(newMatchup);
  } catch (err) {
    errorResponse(err, res);
  }
});

// MatchupRouter.delete("/:id", async (req, res) => {
//   try {
//     const id: string = req.params.id;
//     const client = await getClient();
//     const result = await client
//       .db()
//       .collection<Matchup>("matchups")
//       .deleteOne({ id });
//     if (result.deletedCount) {
//       res.sendStatus(204);
//     } else {
//       res.status(404).send(`ID ${id} not found`);
//     }
//   } catch (err) {
//     errorResponse(err, res);
//   }
// });

export default MatchupRouter;
