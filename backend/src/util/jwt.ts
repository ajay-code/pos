import jwt from "jsonwebtoken";
import { APP_SECRET } from "../config/env";
import { IUser } from "../models/User";

export const generateJwt = (user: IUser, expiresIn: string | number) => {
  const payload: string | Object | Buffer = {
    id: user._id,
    iat: Date.now(),
  };
  const signedToken = jwt.sign(payload, APP_SECRET, { expiresIn });
  return {
    token: "Bearer " + signedToken,
    expiresIn,
  };
};

export default generateJwt;
