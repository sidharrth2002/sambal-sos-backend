const JWT = require("jsonwebtoken");
const { body } = require("express-validator");
const logger = require("../../winston-config");
const db = require("../models");

module.exports.updateFlagApprovalStatus = (req, res) => {
  db.flag.findOneFlag(req.body.flagId, (err, flag) => {
    if (err) {
      logger.error(`DB Error: ${err.message}`);
      res.status(500).json({
        status: false,
        message: "some error occured",
        error: err,
      });
    }
    if (data) {
      db.user
        .update(req.body)
        .then((updateFlag) => {
          res.status(201).json({ status: true, updateFlag });
        })
        .catch((er) => {
          logger.error(`DB Error: ${er.message}`);
          return res.status(500).json({
            status: false,
            message: "Error update flags",
            error: er,
          });
        });
    } else {
      logger.error(`DB Error: ${er.message}`);
      return res.status(500).json({
        status: false,
        message: "Error update flags",
        error: er,
      });
    }
  });
};
