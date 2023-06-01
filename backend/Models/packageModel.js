const mongoose =  require("mongoose");
const packageSchema = mongoose.Schema({
    tracking : {
        type : String,
    },
    rma : {
        type : String,
    },
    upc : {
        type : String,
    },
    sn : {
        type : String
    },
    quantity : {
        type : String,
    },
    snmatched : {
        type : String,
    },
    condition : {
        type : String,
    },
    note : {
        type : String,
    },
    item : {
        type : String,
    },
    sku : {
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
    processed : {
        type : String
    },
    csrnote : {
        type : String
    }
}, {timestamps : true});

module.exports = mongoose.model("packageSchema", packageSchema);