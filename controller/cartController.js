const Cart = require("../model/Cart");
const Product = require("../model/Product");
const { validationResult } = require("express-validator");

// Create or update cart
exports.createCart = async (req, res) => {
  try {
    // ✅ Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { product, quantity } = req.body;
    const userId = req.user.id;
 
 
    if (!product || !product.id || !product.title || !product.price) {
      return res.status(400).json({ message: "Invalid product data" });
    }

    // ✅ Find or create user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // ✅ Check if product already exists in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId === product.id
    );

    if (itemIndex > -1) {
      // Increase quantity if already exists
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.items.push({
        productId: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        priceAtPurchase: product.price,
        quantity,
      });
    }

    // ✅ Save and respond
    await cart.save();

    return res.status(200).json({
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Get current user's cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });

    return res.status(200).json(cart || { items: [] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Remove a product from cart
exports.removeCart = async (req, res) => {
  try {
    const productId = req.params.id; 
    console.log("Removing product with ID (controller):", productId);
    // note: string from URL
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Safer filter: string comparison
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    await cart.save();

    return res.status(200).json(cart); // return updated cart
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
