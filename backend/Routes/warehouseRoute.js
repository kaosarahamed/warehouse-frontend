const express  = require("express");
const router = express();
const {getUser, getSingleUser, createUser, loginUser, updateUser, deleteUser} = require("../controllers/warehouseContolller.js");


router.get("/", getUser);
router.post("/", createUser);
router.post("/login", loginUser);
router.get("/:id", getSingleUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);


module.exports = router;