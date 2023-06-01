const mongoose =  require("mongoose");
const csrSchema = mongoose.Schema({
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

module.exports = mongoose.model("csrSchema", csrSchema);