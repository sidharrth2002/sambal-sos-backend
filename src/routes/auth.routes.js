const express = require("express");
const router = express.Router();
const {
  login,
  googleLogin,
  validateRules,
} = require("../controllers/auth.controller");
const { validate } = require("../../utils/utils");

router.post("/google", googleLogin);

module.exports = router;
