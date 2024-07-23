const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares");
const {
  createList,
  addDefaultList,
  getList,
} = require("../controllers/equipList");
router.get("/", authenticate, getList);

router.post("/create", authenticate, createList);

router.post("/default", authenticate, addDefaultList);

module.exports = router;
