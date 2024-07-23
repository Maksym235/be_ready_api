const { controlWrapper } = require("../../helpers");
const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const updateLang = require("./updateLang");
const updateTheme = require("./updateTheme");
const ChangePassword = require("./changePassword");
const ResetPassword = require("./ResetPassword");
const newPassword = require("./newPassword");
module.exports = {
  register: controlWrapper(register),
  login: controlWrapper(login),
  logout: controlWrapper(logout),
  current: controlWrapper(current),
  updateLang: controlWrapper(updateLang),
  updateTheme: controlWrapper(updateTheme),
  resetPassword: controlWrapper(ResetPassword),
  changePassword: controlWrapper(ChangePassword),
  newPassword: controlWrapper(newPassword),
};
