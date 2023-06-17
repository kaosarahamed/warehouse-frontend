const packageModel = require("../Models/packageModel.js");

const createPackage = async (req, res) => {
    try {
        req.body.forEach(element => {
            const newData = new packageModel({
                tracking: element.tracking, 
                rma : element.rma,
                upc : element.upc,
                sn : element.sn,
                quantity : element.quantity,
                snmatched : element.snmatched,
                condition : element.condition, 
                note : element.note, 
                item : element.item,
                sku : element.sku,
                length : element.length,
                width : element.width,
                height : element.height,
                weight : element.weight,
                processed : element.processed,
                csrnote : element.csrnote,
            });
            newData.save();
        });
        res.status(200).json({message : "data saved, Please wait" })
    } catch (error) {
       res.status(500).json({ message : "data saved faild" }) 
    }
};
const getPackage = async (req, res) => {
    try {
        const packages = await packageModel.find();
        res.status(200).json({packages : packages})
    } catch (error) {
        res.status(500).json(error)
    }
};

const updatePackage = async (req, res) => {
    try {
        const id = req.params.id;
        
        const updateData = {
            tracking: req.body.tracking, 
            rma : req.body.rma,
            upc : req.body.upc,
            sn : req.body.sn,
            quantity : req.body.quantity,
            snmatched : req.body.snmatched,
            condition : req.body.condition, 
            note : req.body.note, 
            item : req.body.item,
            sku : req.body.sku,
            length : req.body.length,
            width : req.body.width,
            height : req.body.height,
            weight : req.body.weight,
            processed : req.body.processed,
            csrnote : req.body.csrnote,
            date : new Date()
        }
        await packageModel.findByIdAndUpdate(id, updateData, {new : true})
        res.status(200).json({message : "data updated" , updateData : updateData})
    } catch (error) {
       res.status(500).json({ message : "data updated faild" }) 
    }
}


module.exports = { createPackage, getPackage, updatePackage }