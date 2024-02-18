import express, { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { router as loginRoutes } from "./controller/loginController.js";
import { router as productRoutes } from "./controller/productController.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:4200", // replace with your allowed origin(s)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // enable credentials (cookies, HTTP authentication) cross-origin
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/user", loginRoutes);
app.use("/product", productRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("server running on 8080");
});
