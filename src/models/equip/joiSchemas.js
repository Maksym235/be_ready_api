const Joi = require("joi");

const addEquipSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  category: Joi.string().required(),
  person: Joi.array(),
});

const schema = {
  addEquipSchema,
};

module.exports = schema;
