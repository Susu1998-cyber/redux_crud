import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
// import Payment from "../model/Payment.js";

export const createOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, // amount in smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    if (!order) return res.status(500).send("Error creating order");
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

 

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      amount,
    } = req.body;

    // Generate expected signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // ✅ Signature verified — save payment to DB
      const payment = await Payment.create({
        userId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        status: "success",
      });

      res.json({
        success: true,
        message: "Payment verified successfully",
        payment,
      });
    } else {
      // ❌ Invalid signature — mark as failed
      await Payment.create({
        userId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        status: "failed",
      });

      res.status(400).json({
        success: false,
        message: "Invalid signature sent!",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

