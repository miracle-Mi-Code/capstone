const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Product name is required'], trim: true },
  description: { type: String, required: [true, 'Description is required'] },
  price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price cannot be negative'] },
  stock: { type: Number, required: [true, 'Stock level is required'], min: [0, 'Stock cannot be negative'], default: 0 },
  category: { type: String, required: true, enum: ['Artisan', 'Textiles', 'Food', 'Jewelry'] },
  imageUrl: { type: String, default: '/placeholder-artisan.jpg' },
  artisan: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);