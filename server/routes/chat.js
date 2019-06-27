const express = require("express");
const controller = require("../controllers/chat");
const router = express.Router();

router.route("/").get(controller.obtener);

module.exports = router;