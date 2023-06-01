const mongoose =  require("mongoose");
const warehouseSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        uniq : true
    },
    password : {
        type : String,
        required : true,
        uniq : true

    }

}, {timestamps : true});

module.exports = mongoose.model("warehouseSchema", warehouseSchema);