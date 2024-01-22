import express from "express";
import mongoose, { connect, model } from "mongoose";
import cors from "cors"
const app = express();
const port = 4100;

app.use(cors());
app.use(express.json());
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    image: { type: String },
    title: { type: String },
    price: { type: Number },
  },
  { timestamps: true }
);

const Products = model("5saatliqtest9", productSchema);

app.get("/products", async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Products.findById(id);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Products.findByIdAndDelete(id);
    res.status(200).send("product Deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/products", async (req, res) => {
  try {
    const products = new Products(req.body);
    await products.save();
    res.status(200).send("product created");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

connect("mongodb+srv://Test:test123@cluster0.ghwwmer.mongodb.net/").catch(
  (err) => console.log("db not connected", err)
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
