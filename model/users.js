import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.USER_DATABASE,
  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

export const Users = sequelize.define("users", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  DOB: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    // set(value) {
    //   return value.toISOString().replace(/\..+/g, "");
    // },
    name: "createdAt",
    field: "createdAt",
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    // set(value) {
    //   return value.toISOString().replace(/\..+/g, "");
    // },
    field: "updatedAt",
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export const UserDetails = sequelize.define("user_details", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  user_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  gender: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  address_line1: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  address_line2: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phone_number: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    // set(value) {
    //   return value.toISOString().replace(/\..+/g, "");
    // },
    name: "createdAt",
    field: "createdAt",
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    // set(value) {
    //   return value.toISOString().replace(/\..+/g, "");
    // },
    field: "updatedAt",
  },
});

try {
  await sequelize.authenticate();
  console.log("user database connected successfully.");
} catch (error) {
  console.error("Unable to connect to the users database:", error);
}
