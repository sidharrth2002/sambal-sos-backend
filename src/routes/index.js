const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./users.routes");
const flagRoutes = require("./flag.routes");
const uploadRoutes = require("./upload.routes");

// Auth routes
router.use("/auth", authRoutes);
// User routes
router.use("/user", userRoutes);

router.use("/flag", flagRoutes);

router.use("/upload", uploadRoutes);

module.exports = router;
