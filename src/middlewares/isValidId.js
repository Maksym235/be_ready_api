const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  console.log(req.params.id);
  if (!isValidObjectId(req.params.id)) {
    next(HttpError(400, "Invalid id"));
  }
  next();
};

module.exports = isValidId;
