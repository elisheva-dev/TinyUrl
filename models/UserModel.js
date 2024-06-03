import mongoose from "mongoose";
import { LinkSchema } from "./LinkModel.js";

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    links: [LinkSchema]
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
