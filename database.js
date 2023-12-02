import mysql from "mysql2";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DATABASE,
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





try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}


