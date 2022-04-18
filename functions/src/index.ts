import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import MatchupRouter from "./routes/MatchupRouter";
import UserRouter from "./routes/UserRouter";
import DailyMatchupRouter from "./routes/DailyMatchupRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/matchups", MatchupRouter);
app.use("/user", UserRouter);
app.use("/dailymatchups", DailyMatchupRouter);

export const api = functions.https.onRequest(app);
