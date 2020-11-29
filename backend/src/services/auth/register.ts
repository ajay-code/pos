import User from "../../models/User";
import { genPassword } from "../../util/password";

interface UserFormData {
  name: String;
  email: String;
  password: string;
}
const register = async (userFormData: UserFormData | undefined) => {
  if (!userFormData) {
    throw Error("No data provided");
  }

  const password = await genPassword(userFormData.password);
  const user = new User({
    name: userFormData.name,
    email: userFormData.email,
    password,
  });

  return user.save();
};

export default register;
