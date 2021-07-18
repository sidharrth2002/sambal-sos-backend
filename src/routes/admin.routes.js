const express = require("express");
const router = express.Router();
const {
  login,
  updateFlagApprovalStatus,
} = require("../controllers/admin.controller");
const { validate, ValidateJWT } = require("../../utils/utils");

router.post(
  "/admin-update-flags",
  ValidateJWT("ADMIN"),
  updateFlagApprovalStatus
);

module.exports = router;
