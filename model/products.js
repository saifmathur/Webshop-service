import mysql from "mysql2";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.PRODUCT_DATABASE,
  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});


export const Product = sequelize.define("products", {
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  product_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  remainingQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

export const ProductDetails = sequelize.define("product_details", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  banner_image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image1_url: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image2_url: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image3_url: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  review_count: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  product_type: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});


export const Users = sequelize.define("user_details", {
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
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: sequelize.NOW,
    set(value) {
      return value.toISOString().replace(/\..+/g, "");
    },
    name: "createdAt",
    field: "created_at",
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: sequelize.NOW,
    set(value) {
      return value.toISOString().replace(/\..+/g, "");
    },
    field: "updated_at",
  },
});



try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}


