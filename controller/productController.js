import { Product, ProductDetails } from "../model/products.js";
import express, { Router } from "express";
const router = express.Router();

router.get("/getAllProducts", async (req, res) => {
  const products = await Product.findAll();
  res.send(products);
});

router.delete("/deleteProduct/:id", async (req, res) => {
  const products = await Product.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.sendStatus(200);
});

router.get("/getProduct/:id", async (req, res) => {
  const products = await Product.findByPk(req.params.id);
  const productDetails = await ProductDetails.findOne({
    attributes: [
      "id",
      "description",
      "banner_image",
      "image1_url",
      "image2_url",
      "image3_url",
      "review_count",
      "product_type",
    ],
    where: { product_id: await products.get("product_id") },
  });
  if (products && productDetails) {
    res.send({ product: products, details: productDetails});
  } else {
    res.sendStatus(404);
  }
});

router.post("/addProduct", async (req, res) => {
  console.log(req.body);
  const {
    product_name,
    imageUrl,
    description,
    price,
    remainingQty,
    altImageText,
    banner_image,
    image1_url,
    image2_url,
    image3_url,
    review_count,
    product_type,
  } = req.body;
  const product = await Product.create({
    product_name: product_name,
    image_url: imageUrl,
    price: price,
    remainingQty: remainingQty,
    alt_image_text: altImageText,
  });
  const productDetails = ProductDetails.create({
    product_id: product.get("product_id"),
    description: description,
    banner_image: banner_image ? banner_image : product.get("image_url"),
    image1_url: image1_url,
    image2_url: image2_url,
    image3_url: image3_url,
    review_count: review_count,
    product_type: product_type,
  });
  res.sendStatus(201);
});

export { router };
