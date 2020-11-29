import mongoose, { Document, Schema, Types } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    image: String,
    role: {
      type: String,
      enum: ["admin", "normal"],
      default: "normal",
      required: true,
    },
    providers: [
      {
        provider: String,
        id: String,
      },
    ],
  },
  { timestamps: true }
);

export interface IUser extends Document {
  name: String;
  email: String;
  password: string;
  image?: String;
  role: String;
  providers: Types.Array<Object>;
}

export default mongoose.model<IUser>("User", UserSchema);
