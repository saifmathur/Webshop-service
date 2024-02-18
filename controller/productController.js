import { Product, ProductDetails } from "../model/products.js";
import express, { Router } from "express";
const router = express.Router();

router.get("/products", async (req, res) => {
  const products = await Product.findAll();
  res.send(products);
});

router.delete("/products/:id", async (req, res) => {
  const products = await Product.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.sendStatus(200);
});

router.get("/products/:id", async (req, res) => {
  const products = await Product.findByPk(req.params.id);
  if (products.length > 0) {
    res.send(products);
  } else {
    res.sendStatus(404);
  }
});

router.post("/products", async (req, res) => {
  console.log(req.body);
  const {
    productName,
    imageUrl,
    description,
    price,
    remainingQty,
    altImageText,
  } = req.body;
  const product = await Product.create({
    product_name: productName,
  });
  res.sendStatus(201);
});

export { router };
