const mongoose =  require("mongoose");
const productSchema = mongoose.Schema({
    item : {
        type : String,
    },
    sku : {
        type : String,
    },
    upc : {
        type : String,
    },
    length : {
        type : String,
    },
    width : {
        type : String,
    },
    height : {
        type : String,
    },
    weight : {
        type : String,
    },

}, {timestamps : true});

module.exports = mongoose.model("productSchema", productSchema);