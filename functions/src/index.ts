import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import mediaMatchupRouter from "./routes/mediaMatchupRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/mediamatchup", mediaMatchupRouter);

export const api = functions.https.onRequest(app);
