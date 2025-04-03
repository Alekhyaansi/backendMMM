const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const user = require("./userModel")

const Profile = sequelize.define("Profile", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM("Male", "Female"),
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING, // Store URL or file path
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,  // Ensure the profile belongs to a user
  },
}, { timestamps: true });

user.hasOne(Profile, { foreignKey: "userId" });  // A User has one Profile
Profile.belongsTo(user, { foreignKey: "id" }); // A Profile belongs to one User
 

module.exports = Profile;