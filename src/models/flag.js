const uuid = require("uuid/v4"); // ES5
("use strict");

// const bcrypt = require('bcrypt')
const logger = require("../../winston-config");

// Flag
module.exports = (sequelize, DataTypes) => {
  const Flag = sequelize.define("flag", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    coordinates: {
      type: DataTypes.GEOMETRY("POINT"),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phonenumber: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    minioimage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "APPROVED", "UNDER REVIEW", "REJECTED"),
      defaultValue: "PENDING",
      allowNull: false,
    },
    rejectionReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    assignedAdmin: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  });

  Flag.associate = (models) => {
    Flag.belongsTo(models.user);
    Flag.belongsTo(models.user, {
      foreignKey: { name: "assignedAdmin", allowNull: true },
    });
  };

  Flag.findOneFlag = function (id, cb) {
    this.findOne({ where: { id } })
      .then((flag) => {
        if (!flag) {
          return cb(null, null);
        }
        return cb(null, flag);
      })
      .catch((err) => {
        logger.error(`DB Error: ${err.message}`);
        return cb(err);
      });
  };

  return Flag;
};
