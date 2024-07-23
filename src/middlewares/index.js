const auth = require("./auth");
const validationBody = require("./validationBody");
const isValidId = require("./isValidId");
module.exports = {
  authenticate: auth,
  validationBody,
  isValidId,
};
