const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

exports.createOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { items } = req.body; // [{ product: id, quantity: number }]
    if (!items || items.length === 0) { res.status(400); throw new Error('No items in order'); }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      // Atomic inventory check and update via $gte and $inc inside the session transaction
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: item.product, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
        { session, new: true }
      );

      if (!updatedProduct) {
        res.status(400);
        throw new Error(`Item out of stock or structurally modified since cart addition.`);
      }

      const itemCost = updatedProduct.price * item.quantity;
      totalAmount += itemCost;
      orderItems.push({ product: item.product, quantity: item.quantity, priceAtPurchase: updatedProduct.price });
    }

    const order = new Order({ user: req.user._id, items: orderItems, totalAmount });
    const savedOrder = await order.save({ session });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json(savedOrder);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};