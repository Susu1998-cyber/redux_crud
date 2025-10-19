const Product = require("../model/Product");
const { validationResult } = require("express-validator");

exports.createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, description, image, stock } = req.body;

    const product = new Product({ name, price, description, image, stock });
    await product.save();

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
