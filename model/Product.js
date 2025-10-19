const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String },
  date: { type: Date, default: Date.now },
  reviewerName: { type: String },
  reviewerEmail: { type: String },
});

const dimensionSchema = new mongoose.Schema({
  width: { type: Number },
  height: { type: Number },
  depth: { type: Number },
});

const metaSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  barcode: { type: String },
  qrCode: { type: String },
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true }, // instead of "name"
  description: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  discountPercentage: { type: Number },
  rating: { type: Number },
  stock: { type: Number },
  tags: [{ type: String }],
  brand: { type: String },
  sku: { type: String },
  weight: { type: Number },
  dimensions: dimensionSchema,
  warrantyInformation: { type: String },
  shippingInformation: { type: String },
  availabilityStatus: { type: String },
  reviews: [reviewSchema],
  returnPolicy: { type: String },
  minimumOrderQuantity: { type: Number },
  meta: metaSchema,
  images: [{ type: String }],
  thumbnail: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
