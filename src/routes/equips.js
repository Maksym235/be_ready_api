const express = require("express");
const router = express.Router();
const { getAll, add } = require("../controllers/equip");
const { schema } = require("../models/equip");
const { validationBody, authenticate } = require("../middlewares");

router.get("/", authenticate, getAll);

router.post("/add", authenticate, validationBody(schema.addEquipSchema), add);

module.exports = router;
