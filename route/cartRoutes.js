const express = require("express");
const cartController = require("../controller/cartController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, cartController.createCart);
router.get("/getcart", authMiddleware, cartController.getCart);
router.delete("/remove/:id", authMiddleware, cartController.removeCart);

module.exports = router;
