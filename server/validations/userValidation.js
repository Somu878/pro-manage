const Joi = require("@hapi/joi");

const registerValidation = Joi.object({
  name: Joi.string().required().label("Name"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().label("Password"),
});
const loginValidation = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().label("Password"),
});

module.exports = { registerValidation, loginValidation };
