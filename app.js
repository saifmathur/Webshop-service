import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { getAllProducts, getProductById, createProduct, deleteProductById } from "./database.js";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/products", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

app.delete("/products/:id", async (req,res)=>{
    const products = await deleteProductById(req.params.id);
    res.sendStatus(200);
})

app.get("/products/:id", async (req, res) => {
  const products = await getProductById(req.params.id);
  if(products.length>0){
      res.send(products);
  }
  else{
    res.sendStatus(404)
  }
});

app.post("/products", async (req,res)=>{
    console.log(req.body);
    const { productName, imageUrl, description, price, remainingQty, altImageText } = req.body
    const product = await createProduct(productName,imageUrl,description,price,remainingQty,altImageText)
    res.sendStatus(201)
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("server running on 8080");
});
