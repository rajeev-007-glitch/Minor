const Sequelize = require("sequelize")
const sequelize = new Sequelize( ... )

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require("./User")(sequelize, Sequelize)
db.project = require("./project")(sequelize, Sequelize)
db.refreshToken = require("./refreshToken.model")(sequelize, Sequelize)

db.project.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
})

db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userid', targetKey: 'id'
})

db.user.hasOne(db.refreshToken,{
    foreignKey: 'userId', targetKey: 'id'
})

db.PROJECTS = ["user","admin","moderater"]

module.exports = db