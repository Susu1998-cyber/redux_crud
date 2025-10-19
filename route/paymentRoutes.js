const express = require("express");
const paymentController = require("../controller/paymentController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/order", authMiddleware, paymentController.createOrder);
router.post("/verify", authMiddleware, paymentController.verifyPayment);

module.exports = router;
 