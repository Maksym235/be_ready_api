const { ToursModel } = require("../../models/tours");
const { HttpError } = require("../../helpers");

const addUserstoTour = async (req, res) => {
  const { _id: ownerId } = req.user;
  const { usersId } = req.body;
  const { id } = req.params;
  const isUserOwner = await ToursModel.find({ _id: id });
  console.log(isUserOwner);
  if (String(isUserOwner[0].owner) !== String(ownerId)) {
    console.log(ownerId);
    console.log(isUserOwner[0].owner);
    throw HttpError(400, "You can`t add persons to tour");
  }

  //   const user = await ToursModel.findOne({});
  const users = await ToursModel.find({ _id: id });
  console.log(users);
  if (users[0].users.includes(usersId)) {
    throw HttpError(400, "user already exists");
  }
  const resp = await ToursModel.findByIdAndUpdate(
    { _id: id },
    { $push: { users: usersId } },
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
    resp,
  });
};

module.exports = addUserstoTour;
