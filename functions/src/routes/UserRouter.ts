import express from "express";
import { getClient } from "../db";
import User from "../models/User";

const UserRouter = express.Router();
const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

UserRouter.get("/", async (req, res) => {
  try {
    const { uid } = req.query;
    const client = await getClient();
    const query: any = {
      ...(uid ? { uid: uid as string } : {}),
    };
    const results = await client
      .db()
      .collection<User>("users")
      .find(query)
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

UserRouter.post("/", async (req, res) => {
  try {
    const newUser: User = req.body;
    const client = await getClient();
    client.db().collection<User>("users").insertOne(newUser);
    res.status(200).json(newUser);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default UserRouter;
