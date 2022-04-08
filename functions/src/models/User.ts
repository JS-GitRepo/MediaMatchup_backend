import { ObjectId } from "mongodb";

export default interface User {
  _id?: ObjectId;
  uid: string;
  name: string;
  email: string;
  friends?: [{}];
  favorites?: [{}];
}
