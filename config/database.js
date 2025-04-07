require("dotenv").config();
const { Sequelize } = require("sequelize");

// ✅ Check if DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  console.error("❌ Missing environment variable: DATABASE_URL");
  process.exit(1);
}

// ✅ Initialize Sequelize using the full DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql", // Use mysql for Railway
  logging: false,   // Optional: Disable SQL logging in console
});

// ✅ Test Database Connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected to Railway via DATABASE_URL"))
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

// ✅ Export sequelize BEFORE requiring models
module.exports = sequelize;

// ✅ Import models AFTER sequelize export
const Profile = require("../models/profileModel");
const Post = require("../models/postModel");

// ✅ Sync models with DB (apply any table changes)
sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ MySQL Tables synced"))
  .catch((err) => console.error("❌ Error syncing tables:", err));
