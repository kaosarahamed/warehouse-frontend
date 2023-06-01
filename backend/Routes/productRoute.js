const express  = require("express");
const router = express();
const {createProduct, getProduct} = require("../controllers/peoductController.js");
const productData = require("../Middlewares/productData.js"); 

router.get("/", getProduct);
router.post("/", productData, createProduct);


module.exports = router;