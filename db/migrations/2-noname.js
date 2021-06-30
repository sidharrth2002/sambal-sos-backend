'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "flags", deps: [users]
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2021-06-30T15:34:37.454Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "flags",
        {
            "id": {
                "type": Sequelize.UUID,
                "field": "id",
                "primaryKey": true,
                "allowNull": false,
                "defaultValue": Sequelize.UUIDV4
            },
            "title": {
                "type": Sequelize.TEXT,
                "field": "title",
                "allowNull": true
            },
            "latitude": {
                "type": Sequelize.DECIMAL(10, 6),
                "field": "latitude",
                "allowNull": false
            },
            "longitude": {
                "type": Sequelize.DECIMAL(10, 6),
                "field": "longitude",
                "allowNull": false
            },
            "status": {
                "type": Sequelize.ENUM('Pending', 'In Progress', 'Completed', 'False Report'),
                "field": "status",
                "allowNull": true
            },
            "description": {
                "type": Sequelize.TEXT,
                "field": "description",
                "allowNull": true
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            },
            "userId": {
                "type": Sequelize.INTEGER,
                "field": "userId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "users",
                    "key": "id"
                },
                "allowNull": true
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
