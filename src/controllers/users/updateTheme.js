const { UserModel } = require("../../models/users");

const updateTheme = async (req, res) => {
  const { email, theme } = req.body;
  const resp = await UserModel.findOneAndUpdate(
    { email: email },
    { theme: theme },
    { new: true }
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  res.json({
    code: 200,
    theme: resp.theme,
  });
};

module.exports = updateTheme;
