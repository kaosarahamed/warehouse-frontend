const express  = require("express");
const router = express();
const {createPackage, getPackage, updatePackage} = require("../controllers/packageController.js");


router.get("/", getPackage);
router.post("/", createPackage);
router.put("/:id", updatePackage);


module.exports = router;