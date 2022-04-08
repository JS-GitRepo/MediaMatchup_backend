import { ObjectId } from "mongodb";
import Matchup from "./Matchup";

export default interface DailyMatchupCollection {
  _id: ObjectId;
  date: Date;
  matchups: Matchup[];
}
