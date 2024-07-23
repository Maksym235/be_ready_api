const { ToursModel } = require("../../models/tours");
const { HttpError } = require("../../helpers");
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { usersId } = req.body;
  const tour = await ToursModel.findById(id);
  console.log(tour);
  if (!tour.users.includes(usersId)) {
    throw HttpError(400, "User not found");
  }
  //   const index = tour.users.findIndex((user) => user === usersId);
  //   console.log(index);
  //   const updatedUsers = tour.users.splice(index, 1);
  //   console.log(updatedUsers);
  const resp = await ToursModel.findByIdAndUpdate(
    { _id: id },
    { $pull: { users: usersId } },
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

module.exports = deleteUser;
