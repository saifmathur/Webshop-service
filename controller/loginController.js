import { UserDetails, Users } from "../model/users.js";
import express, { Router } from "express";
import { Sequelize, Op } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY_WEBSHOP;
router.post("/register", async (req, res) => {
  const {
    first_name,
    last_name,
    DOB,
    gender,
    phone_number,
    email,
    address_line1,
    address_line2,
    password,
  } = req.body;
  const user = Users.create({
    first_name: first_name,
    last_name: last_name,
    username: first_name + last_name.substring(0, 1),
    DOB: DOB,
    password: await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS)),
  });
  const userDetails = UserDetails.create({
    user_id: (await user).get("id"),
    gender: gender,
    phone_number: phone_number,
    email: email,
    address_line1: address_line1,
    address_line2: address_line2,
  });
  res.sendStatus(201);
});



router.get("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({
      where: {
        username: Sequelize.where(
          Sequelize.fn("BINARY", Sequelize.col("username")),
          username
        ),
        // password: bcrypt.compare(
        //   password,
        //   await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
        // ),
        active: true,
      },
      rejectOnEmpty: true,
    });
    if(user && await bcrypt.compare(password, await user.get("password"))
    ) {
      const token = jwt.sign({ userId: user.id }, secretKey);
      res.send(token);
    }
    else{
      throw new Exception() 
    }
  } catch (e) {
    console.log("USER NOT FOUND");
    res.sendStatus(404);
  }
});

export { router };
