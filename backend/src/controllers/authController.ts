import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { login } from "../services/auth";
import { extractYupErrors } from "../util/errors";
import { generateJwt } from "../util/jwt";
import registerSchema from "../validations/register";
import register from "./../services/auth/register";
import loginSchema from "./../validations/login";

interface UserRegisterData {
  name: String;
  email: String;
  password: string;
  confirmPassword: string;
}

interface UserLoginData {
  email: String;
  password: string;
}

interface Errors {
  [key: string]: String;
}

// login user and generate jwt
export const jwtLogin = async (req: Request, res: Response) => {
  let validatedData: UserLoginData | undefined;

  try {
    validatedData = await loginSchema.validate(req.body, {
      strict: true,
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    const errors: Errors = extractYupErrors(error);
    return res.status(401).json({ errors });
  }

  let user: IUser | null;
  // try to login the user
  try {
    user = await login(validatedData);
  } catch (error) {
    return res.status(401).json({
      email: "email or password is invalid",
    });
  }

  // if user exists generate and return jwt token
  if (user) {
    const tokenObject = generateJwt(user, "2d");
    return res.status(200).json(tokenObject);
  } else {
    return res.status(401).json({
      email: "email or password is invalid",
    });
  }
};

// register user and generate jwt
export const jwtRegister = async (req: Request, res: Response) => {
  let validatedData: UserRegisterData | undefined;
  // validate user data and return errors if any
  try {
    validatedData = await registerSchema.validate(req.body, {
      strict: true,
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    const errors: Errors = extractYupErrors(error);
    return res.status(401).json({
      errors,
    });
  }
  // check if user already exists in the database
  const user = await User.findOne({ email: validatedData?.email }).exec();

  if (!user) {
    // if user does not exist then create the user and generate jwt
    let user;
    // try registering user to database or send errors
    try {
      user = await register(validatedData);
    } catch (error) {
      return res.json({
        errors: error,
      });
    }

    const tokenObject = generateJwt(user, "1d");
    return res.status(200).json(tokenObject);
  } else {
    // if user already exists send error to use different email
    const errors: Errors = {
      email: "email already registered use different email address",
    };
    return res.status(409).json({
      errors,
    });
  }
};
