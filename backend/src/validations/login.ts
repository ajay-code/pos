import Joi, { object } from "joi";

const Schema = object({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/),
});

export default Schema;
