
import { UserDetails, Users } from "../model/users.js";
import express, { Router } from "express";
const router = express.Router();

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
  } = req.body;
  const user = Users.create({
    first_name: first_name,
    last_name: last_name,
    username: first_name + last_name.substring(0, 1),
    DOB: DOB,
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

export { router };
