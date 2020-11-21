import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from "passport-jwt";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verify = (jwt_payload: Object, done: Function) => {
  return [jwt_payload, done];
};
const Strategy = new JwtStrategy(options, verify);

export default (passport: any) => {
  passport.use(Strategy);
};
