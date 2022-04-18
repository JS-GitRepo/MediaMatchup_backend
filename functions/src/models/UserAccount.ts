import { ObjectId } from "mongodb";

export default interface UserAccount {
  _id?: ObjectId;
  uid: string;
  name: string;
  email: string;
  friends?: [{}];
  favorites?: [{}];
}
