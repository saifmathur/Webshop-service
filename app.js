import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { Product, ProductDetails } from "./database.js";


const app = express();

const corsOptions = {
  origin: "http://localhost:4200", // replace with your allowed origin(s)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // enable credentials (cookies, HTTP authentication) cross-origin
};

app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/products", async (req, res) => {
  const products = await Product.findAll();
  res.send(products);
});

app.delete("/products/:id", async (req,res)=>{
    const products = await Product.destroy({
      where: {
        id: req.params.id
      },
    });
    res.sendStatus(200);
})

app.get("/products/:id", async (req, res) => {
  const products = await Product.findByPk(req.params.id);
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
    const product = await Product.create({
      product_name: productName,
      
    });
    res.sendStatus(201)
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("server running on 8080");
});
