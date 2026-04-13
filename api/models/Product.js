const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true, default: 'Generic' },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  description: { type: String },
  imgUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
