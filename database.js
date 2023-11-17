import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();

  
export async function getAllProducts(){
  const result = await pool.query("select * from products");
  return result
}

export async function getProductById(id) {
  const [rows] = await pool.query(
    `select * from products where product_id = ?`,
    [id]
  );
  return rows;
}

export async function createProduct(product_name,  image_url,  description,  price,  remainingQty,  alt_image_text) {
  const result = await pool.query(
    `INSERT INTO webshop.products
    (product_name, image_url, description, price, remainingQty, alt_image_text)
    VALUES(?,?,?,?,?,?);
    `,
    [product_name, image_url, description, price, remainingQty, alt_image_text]
  );
  return result
}

export async function deleteProductById(id) {
  const result = await pool.query(
    `DELETE FROM webshop.products WHERE product_id= ?`,[id]);
  return result;
}
