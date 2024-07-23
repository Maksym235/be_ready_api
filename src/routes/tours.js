const express = require("express");
const router = express.Router();
const { validationBody, authenticate } = require("../middlewares");
const { Schema } = require("../models/tours");
const {
  addTour,
  addUserstoTour,
  getAllTours,
  deleteUser,
} = require("../controllers/tours");

router.get("/", authenticate, getAllTours);

router.post(
  "/add",
  authenticate,
  validationBody(Schema.addTourSchema),
  addTour
);

router.post(
  "/:id/addUser",
  authenticate,
  validationBody(Schema.addUserstoTourSchema),
  addUserstoTour
);

router.post(
  "/:id/deleteUser",
  authenticate,
  validationBody(Schema.addUserstoTourSchema),
  deleteUser
);
module.exports = router;
