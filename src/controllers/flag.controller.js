const logger = require("../../winston-config");
const db = require("../models");
const sequelize = require("sequelize");

// get paginated version of all flags
module.exports.getAllFlags = (req, res) => {
  const { offset, limit } = req.body;

  db.flag
    .findAll({
      limit: !limit ? null : limit,
      offset: !offset ? null : offset
    })
    .then((flags) => {
      res.status(200).json(flags);
    })
    .catch(err => {
      res.status(500).send(err);
    })
};

// get flags within a radius
module.exports.getAllFlagsInRadius = async (req, res) => {
  const { radius, latitude, longitude } = req.body;

  db.flag.findAll({
    attributes: [[sequelize.literal("6371 * acos(cos(radians("+latitude+")) * cos(radians(ST_X(coordinates))) * cos(radians("+longitude+") - radians(ST_Y(coordinates))) + sin(radians("+latitude+")) * sin(radians(ST_X(coordinates))))"),'distance']],
    order: sequelize.col('distance'),
    limit: 10,
  })
  .then(inRadius => {
    console.log(inRadius);
    res.status(200).send(inRadius);
  })

};

// create new flag
module.exports.createFlag = (req, res) => {
  // for now, send from frontend
  // after this, take the ID from JWT
  const { latitude, longitude, description, image } = req.body;

  const userId = req.decoded.data;

  const coordinates = {
    type: "Point",
    coordinates: [latitude, longitude],
  };
  db.flag
    .create({
      description: description,
      coordinates,
      userId,
      image,
      status: 'APPROVED'
    })
    .then((newFlag) => res.status(200).send(newFlag))
    .catch(err => {
      res.status(500).send(err);
    })
};

// delete a flag
// only admins can delete
module.exports.deleteFlag = (req, res) => {
  const { id } = req.body;

  db.flag.destroy({
    where: {
      id
    }
  })
  .then((stat) => res.sendStatus(200))
  .catch(err => {
    res.status(500).send(err);
  })
}

module.exports.getApprovedFlags = (req, res) => {
  const { offset, limit } = req.body;

  db.flag
    .findAll({
      limit: !limit ? null : limit,
      offset: !offset ? null : offset,
      where: {
        status: "APPROVED"
      }
    })
    .then((flags) => {
      res.status(200).send(flags);
    })
    .catch(err => {
      res.status(500).send(err);
    })
}

// Delete this soon
// module.exports.createTestFlag = (req, res) => {
//   let point = { type: "Point", coordinates: [39.807222, -76.984722] };
//   db.flag
//     .create({
//       coordinates: point,
//       description: "Test Description",
//       userId: "",
//     })
//     .then((newFlag) => res.status(200).send(newFlag))
//     .catch(err => {
//       res.status(500).send(err);
//     })
// };
