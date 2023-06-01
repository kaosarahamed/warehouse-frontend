const productSchema = require("../Models/ProductModel.js");
const csv = require("csvtojson")

const getProduct = async (req, res) => {        

    try {
        const products = await productSchema.find();
        res.status(200).json({products : products})
    } catch (error) {
        res.status(500).json(error)
    }
}

const createProduct = async (req, res) => {
    try {
        if(req.file?.filename === null || req.fle?.filename === "undefined"){
            res.status(400).json("no file")
        }else{
            const jsonArray= await csv().fromFile(req.file.path);
            productSchema.insertMany(jsonArray).then(function () {
                res.status(200).json({message : "product upload sucessful"})
              }).catch(function (err) {
                res.status(500).json(err)
            });
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { getProduct,createProduct}