const Product = require("../models/Product");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    // 1. Destructure 'artisan' directly from the frontend request body form
    const { name, description, price, stock, category, imageUrl, artisan } =
      req.body;

    // 2. Safe fallback logic to prevent "Cannot read properties of undefined (reading '_id')"
    const artisanId = req.user
      ? req.user._id
      : artisan || "65f1a2b3c4d5e6f7a8b9c0d1";

    // 3. Instantiate the model with the safe ID reference
    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
      artisan: artisanId,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};
