import Joi, { object } from "joi";

const Schema = object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/),
  confirmed_password: Joi.ref("password"),
});

export default Schema;
