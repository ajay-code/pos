import { object, string } from "yup";

const registerSchema = object({
  name: string().min(4).required(),
  email: string().email().required(),
  password: string().min(6).required(),
  confirmPassword: string()
    .required()
    .test("password-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

export default registerSchema;
