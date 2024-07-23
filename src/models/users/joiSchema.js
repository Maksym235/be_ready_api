const Joi = require("joi");

const register = Joi.object({
  name: Joi.string().required().min(3).max(12),
  email: Joi.string().required(),
  password: Joi.string().required().min(6).max(22),
});

const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
});

const Schema = {
  register,
  login,
};

module.exports = Schema;
