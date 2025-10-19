const express = require("express")
const productController = require('../controller/productController')
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")

router.post("/createproduct",authMiddleware.productController)
router.get("/getproduct",authMiddleware.productController)

module.exports = router