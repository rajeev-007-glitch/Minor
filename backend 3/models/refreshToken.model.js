const { date } = require("joi")
const { v4: uuidv4 } = require("uuid")

module.exports = (sequelize, Sequelize) => {
  const RefreshToken = sequelize.define("refreshtoken", {
    token: {
      type: Sequelize.STRING,
    },
    expiryDate: {
      type: Sequelize.DATE,
    },
  })

  RefreshToken.createToken = async function (user) {
    let expiredAt = new Date()

    expiredAt.setSeconds(expiredAt.getSeconds() + process.env.JWT_SECRET)

    let _token = uuidv4()

    let refreshtoken = await this.createToken({
      token: _token,
      userId: user.id,
      expir: expiredAt.getTime(),
    })
    return refreshtoken.token
  }

  RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new date().getTime()
  }
  return RefreshToken
}
