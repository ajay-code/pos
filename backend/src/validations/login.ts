import { object, string } from "yup";

const loginSchema = object({
  email: string().email().required(),
  password: string().min(4).required(),
});

export default loginSchema;
