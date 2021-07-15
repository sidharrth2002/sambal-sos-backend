const bcrypt = require('bcrypt')

const logger = require('../../winston-config')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  })

  User.associate = models => {
    User.hasMany(models.flag);
  }

  /**
   * beforeCreate hook on User instance to hash the password
   */
  // User.addHook('beforeCreate', async (user, options) => {
  //   const salt = await bcrypt.genSalt(parseInt(process.env.SALT))
  //   user.password = await bcrypt.hash(user.password, salt)
  // })

  /**
   * User instanceMethod to Validate the password
   */
  // User.prototype.validPassword = function (password) {
  //   return bcrypt.compareSync(password, this.password)
  // }

  /**
   * Checks whether user with same unique field already exist or not
   * @returns User object on success and null if not found
   */
  User.findOneUser = function (email, cb) {
    this.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          return cb(null, null)
        }
        return cb(null, user)
      })
      .catch((err) => {
        logger.error(`DB Error: ${err.message}`)
        return cb(err)
      })
  }
  return User
}
