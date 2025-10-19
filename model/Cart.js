const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true }, // from DummyJSON
  title: { type: String, required: true },
  thumbnail: { type: String },
  priceAtPurchase: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);

// const mongoose = require("mongoose");

// const cartItemSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Product", // this enables populate
//     required: true,
//   },
//   priceAtPurchase: { type: Number },
//   quantity: { type: Number, required: true, min: 1 },
// });

// const cartSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   items: [cartItemSchema],
// });

// module.exports = mongoose.model("Cart", cartSchema);
