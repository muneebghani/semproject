var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  image: String,
  instrument: String,
  price: String,
  rating: Number,
  quantity: Number,
  description: String,
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
