const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.MONGODB_URL;


mongoose.connect(URL).then(() => {
    console.log("database is connected");
}).catch((err) => {
    console.log(err)
});