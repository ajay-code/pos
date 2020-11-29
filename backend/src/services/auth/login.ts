import User, { IUser } from "../../models/User";
import { validPassword } from "../../util/password";
interface UserLoginData {
  email: String;
  password: string;
}
const login = async (userLoginData: UserLoginData | undefined) => {
  if (!userLoginData) {
    throw Error("No data provided");
  }
  const user: IUser | null = await User.findOne({
    email: userLoginData.email,
  });

  const isValid = await validPassword(
    userLoginData.password,
    user?.password || ""
  );

  // if password is not valid return null else return user
  if (!isValid) {
    return null;
  }
  return user;
};
export default login;
