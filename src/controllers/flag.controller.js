const logger = require("../../winston-config");
const db = require("../models");
const sequelize = require("sequelize");

// get paginated version of all flags
// by default, will only send back 10
module.exports.getAllFlags = (req, res) => {
  const { offset, limit } = req.body;

  db.flag
    .findAll({
      limit: !limit ? 10 : limit,
      offset: !offset ? null : offset
    })
    .then((flags) => {
      res.status(200).json({
        status: true,
        data: flags,
      });
    })
    .catch(err => {
      res.status(500).send(err);
    })
};

// get flags within a radius
module.exports.getAllFlagsInRadius = async (req, res) => {
  const { radius, latitude, longitude } = req.body;

  const coordinates = sequelize.literal(
    `ST_GeomFromText('POINT(${longitude} ${latitude})')`
  );
  const distance = sequelize.fn(
    "ST_Distance_Sphere",
    sequelize.col("coordinates"),
    coordinates
  );
  db.flag
    .findAll({
      order: distance,
      where: sequelize.where(distance, { $lte: radius }),
      logging: console.log,
    })
    .then((inRadius) => {
      res.status(200).send(inRadius)
    })
    .catch(err => {
      res.status(500).send(err);
    })
};

// create new flag
module.exports.createFlag = (req, res) => {
  // for now, send from frontend
  // after this, take the ID from JWT
  const { latitude, longitude, description, userId } = req.body;

  const coordinates = {
    type: "Point",
    coordinates: [latitude, longitude],
  };
  db.flag
    .create({
      description: description,
      coordinates,
      userId: userId,
    })
    .then((newFlag) => res.status(201).send(newFlag))
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
  .then((stat) => res.status(204).send(stat))
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
