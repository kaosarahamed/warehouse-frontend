const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const warehouseRouter = require("../Routes/warehouseRoute.js");
const csrRouter = require("../Routes/csrRoute.js");
const packageModel = require("../Routes/packageRoute.js");
const productRoute = require("../Routes/productRoute.js");
require("../config/DBConnection.js");



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use("/warehouseuser", warehouseRouter);
app.use("/csruser", csrRouter);
app.use("/packages", packageModel);
app.use("/products", productRoute);
















// Home Route
app.get("/", (req, res)  => {
    res.send("home page")
});

// Route Not Found
app.use((req, res, next ) => {
    res.send("Route Not Found")
});

// Server Error
app.use((req, res, next, err) => {
    if(err){
        return err;
    }else{
        res.send("server Error")
    }
});








module.exports = app;