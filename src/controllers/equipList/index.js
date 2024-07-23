const { controlWrapper } = require("../../helpers");
const createList = require("./add");
const addDefaultList = require("./default");
const getList = require("./getAll");
module.exports = {
  createList: controlWrapper(createList),
  addDefaultList: controlWrapper(addDefaultList),
  getList: controlWrapper(getList),
};
