const uuid = require('uuid/v4'); // ES5
'use strict';

// const bcrypt = require('bcrypt')
const logger = require('../../winston-config')

module.exports = (sequelize, DataTypes) => {
  const Flag = sequelize.define('flag', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(['Pending', 'In Progress', 'Completed', 'False Report']),
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
  })

  Flag.associate = models => {
    Flag.belongsTo(models.user);
  }

  return Flag
}
