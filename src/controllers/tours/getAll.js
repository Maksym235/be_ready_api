const { ToursModel } = require("../../models/tours");
const { HttpError } = require("../../helpers");
const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const personal = await ToursModel.find({ owner });
  const connected = await ToursModel.find({users: {$in: owner}, owner: {$ne: owner}})
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
    personal,
    connected
  });
};

module.exports = getAll;
