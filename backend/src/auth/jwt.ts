import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from "passport-jwt";
import { APP_SECRET } from "../config/env";
import User, { IUser } from "../models/User";

interface JwtPayload {
  id: String;
  iat: Number;
  exp: Number;
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: APP_SECRET,
};

const verify = (jwt_payload: JwtPayload, done: Function) => {
  User.findOne({ _id: jwt_payload.id })
    .then((user: IUser | null) => {
      return user ? done(null, user) : done(null, false);
    })
    .catch((err) => done(err, false));
};
const Strategy = new JwtStrategy(options, verify);

export default (passport: any) => {
  passport.use(Strategy);
};
