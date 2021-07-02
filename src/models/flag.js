const uuid = require('uuid/v4'); // ES5
'use strict';

// const bcrypt = require('bcrypt')
const logger = require('../../winston-config')

// Flag
module.exports = (sequelize, DataTypes) => {
  const Flag = sequelize.define('flag', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    coordinates: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    }
  })

  Flag.associate = models => {
    Flag.belongsTo(models.user);
  }

  return Flag
}
