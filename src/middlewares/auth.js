const { HttpError } = require("../helpers");
const { JWT_SECRET } = process.env;
const { UserModel } = require("../models/users");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Invalid Bearer"));
  }
  try {
    console.log(token);
    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await UserModel.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "unauthorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

module.exports = authentication;
