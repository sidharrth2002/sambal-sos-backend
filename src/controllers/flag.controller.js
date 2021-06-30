const logger = require('../../winston-config')
const db = require('../models')
const _ = require("lodash")

module.exports.getFlags = (req, res) => {
    const { offset, limit } = req.body;

    db.flag.findAll({
        limit: (!limit ? null : limit),
        offset: (!offset ? null : offset),
        include: [{model: db.user, attributes: ['id', 'first_name', 'last_name', 'email']}],
    },)
    .then(flags => {
        res.status(200).json({
            status: true,
            data: flags
        })
    })
}

module.exports.createTestFlag = (req, res) => {
    let point = { type: 'Point', coordinates: [39.807222,-76.984722] };

    db.flag.create({
        title: "Testing",
        coordinates: point,
        status: "In Progress",
        description: "Test Description",
        userId: 9
    })
    .then(newFlag => res.status(200).send(newFlag))
}

module.exports.createFlag = (req, res) => {
  const coordinates = {
    type: "Point",
    coordinates: [_.get(req.body, "latitude", 0), _.get(req.body, "longitude", 0)]
  }

  db.flag.create({
    title: _.get(req.body, "title", null),
    status: _.get(req.body, "status", "Pending"),
    description: _.get(req.body, "description", null),
    coordinates,
    userId: _.get(req.body, "userId", 1)
  })
  .then(newFlag => res.status(200).send(newFlag))
}

module.exports.getAllUsers = (req, res) => {
  db.user.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(users => {
      res.status(200).json({ status: true, data: users })
    })
    .catch(err => {
      logger.error(`DB Error: ${err.message}`)
      res.status(500).json({
        status: false,
        message: 'some error occured',
        error: err
      })
    })
}



// Refer Here
// module.exports.getAllUsers = (req, res) => {
//   db.user.findAll({
//     attributes: { exclude: ['password'] }
//   })
//     .then(users => {
//       res.status(200).json({ status: true, data: users })
//     })
//     .catch(err => {
//       logger.error(`DB Error: ${err.message}`)
//       res.status(500).json({
//         status: false,
//         message: 'some error occured',
//         error: err
//       })
//     })
// }
