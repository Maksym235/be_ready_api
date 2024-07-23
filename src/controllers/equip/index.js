const { controlWrapper } = require("../../helpers");
const getAll = require("./getAll");
const add = require("./add");
module.exports = {
  getAll: controlWrapper(getAll),
  add: controlWrapper(add),
};
