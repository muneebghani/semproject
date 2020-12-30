var express = require("express");
var router = express.Router();
var Product = require("../../models/product");
var admin = require("../../middlewares/admin");

//get products
router.get("/", async (req, res) => {
  console.log(req.user);
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let products = await Product.find().skip(skipRecords).limit(perPage);
  return res.send(products);
});

//get top 5 selling products
router.get("/getTopProds", async (req, res) => {
  let products = await Product.find().limit(5);
  return res.send(products);
});

//get single product
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.status(400).send("Product With given ID is not present");
    return res.send(product);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
//update a record
router.put("/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.instrument = req.body.instrument;
  product.price = req.body.price;
  product.rating = req.body.rating;
  product.quantity = req.body.quantity;
  product.description = req.body.description;
  await product.save();
  return res.send(product);
});
//delete a record
router.delete("/:id", async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  return res.send(product);
});
//Insert a record
router.post("/", async (req, res) => {
  const { image, instrument, price, rating, quantity, description } = req.body;
  if (!image || !instrument || !price || !rating || !quantity || !description) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }
  const product = new Product({
    image,
    instrument,
    price,
    rating,
    quantity,
    description,
  });
  product
    .save()
    .then((result) => {
      res.json({ product: result });
    })
    .catch((err) => {
      console.log(err);
    });
  return res.send(product);
});

module.exports = router;
