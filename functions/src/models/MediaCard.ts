import { ObjectId } from "mongodb";

export default interface MediaCard {
  _id?: ObjectId;
  title: string;
  artist: string;
  artImg: string;
  category: string;
}
