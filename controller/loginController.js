import { UserDetails, Users } from "../model/users.js";
import express, { Router } from "express";
import { Sequelize, Op, DATE, DATEONLY } from "sequelize";
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

router.get("/allUsers", async (req, res) => {
  const users = await Users.findAll({
    attributes: [
      "id",
      "first_name",
      "last_name",
      "DOB",
      "username",
      "createdAt",
      "updatedAt",
      "active",
    ],
    where: { active: true },
  });
  let resArr = [];
  console.log(
    users.forEach((model) => {
      //console.log(model.dataValues);
      resArr.push(model.dataValues);
    })
  );
  res.send(resArr);
});

router.put("/update", async (req, res) => {
  const {
    id,
    username,
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
  console.log(Sequelize.literal("CURRENT_TIMESTAMP"));
  const user = await Users.findOne({ where: { id: id } });
  if (user) {
    await user
      .update(
        {
          first_name: first_name,
          last_name: last_name,
          username: username,
          DOB: DOB,
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          password: await bcrypt.hash(
            password,
            parseInt(process.env.SALT_ROUNDS)
          ),
        },
        { where: { username: username, id: id } }
      )
      .then(() => {
        user
          .save()
          .then(async () => {
            UserDetails.update(
              {
                gender: gender,
                phone_number: phone_number,
                email: email,
                updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
                address_line1: address_line1,
                address_line2: address_line2,
              },
              { where: { user_id: id } }
            );
          })
          .then(() => {
            res.sendStatus(201);
          });
      });
      
  }

});

router.delete("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await Users.findOne({
      where: { id: req.params.id, active: true },
      rejectOnEmpty: true,
    });
    if (user) {
      await user.setDataValue("active", false);
      await user.setDataValue("updatedAt", Sequelize.literal("CURRENT_TIMESTAMP"));
      user.save();
    }
    res.sendStatus(200);
  } catch (e) {
    console.log("USER NOT FOUND");
    res.sendStatus(404);
  }
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
        active: true,
      },
      rejectOnEmpty: true,
    });
    if (user && (await bcrypt.compare(password, await user.get("password")))) {
      const token = jwt.sign({ userId: user.id }, secretKey);
      res.send({ token: token, userId: await user.get("id") });
    } else {
      throw new Exception();
    }
  } catch (e) {
    console.log("USER NOT FOUND");
    res.sendStatus(404);
  }
});

export { router };
