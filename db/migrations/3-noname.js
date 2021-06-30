'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "latitude" from table "flags"
 * removeColumn "longitude" from table "flags"
 * addColumn "coordinates" to table "flags"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2021-06-30T16:10:29.730Z",
    "comment": ""
};

var migrationCommands = [
    {
        fn: "removeColumn",
        params: ["flags", "latitude"]
    },
    {
        fn: "removeColumn",
        params: ["flags", "longitude"]
    },
    {
        fn: "addColumn",
        params: [
            "flags",
            "coordinates",
            {
                "type": Sequelize.GEOMETRY('POINT'),
                "field": "coordinates",
                "allowNull": false
            }
        ]
    }
];

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
