const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) { next(error); }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;
    const product = new Product({ name, description, price, stock, category, imageUrl, artisan: req.user._id });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) { next(error); }
};