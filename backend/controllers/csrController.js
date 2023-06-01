require("dotenv").config();
const csrModel = require("../Models/csrModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.SECRET_KEY;

const createUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const existUser = await csrModel.findOne({ username : username });
    if(existUser){
        return res.status(400).json({ message : "user already exist" });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
        const newUser = new warehouseModel({
            username : username,
            password : hash
        });
        const token = jwt.sign({ id: newUser._id }, SECRET_KEY);
        await newUser.save();
        res.status(200).json({newUser : newUser, token : "Bearer " + token, message : "User create successful" });
    });

    } catch (error) {
       res.status(500).json({ message : "User Create Faild" }) 
    }
};
const getUser = async (req, res) => {
    try {
        const user = await csrModel.find();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
};
const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const oneUser = await csrModel.findOne({_id : id})
        res.status(200).json(oneUser)
    } catch (error) {
        res.status(500).json(error)
    }
};
const loginUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const existinguser = await csrModel.findOne({ username: username });
    if (!existinguser) {
      return res.status(404).json({ message: "user not found" });
    }
    const matchpassword = await bcrypt.compare(password, existinguser.password);
    if (!matchpassword) {
      return res.status(400).json({ message: "incorrect Password" });
    }

    const token = jwt.sign(
        { username: existinguser.username, id: existinguser._id },
        SECRET_KEY
      );
      res.status(201).json({ user: existinguser, token: token, message : "User login successful, Redirecting" });

    } catch (error) {
        res.status(500).json({ message: "User login faild" });
    }
};
const updateUser = async (req, res) => {
    const {username, password} = req.body;
    const id = req.params.id;
    try {
        bcrypt.hash(password, 10, async function (err, hash) {
            const newUser = {
                username : username,
                password : hash
            }
            await csrModel.findByIdAndUpdate(id, newUser, {new : true});
        res.status(200).json({ message : "User update successful"})
        })
        
    } catch (error) {
        res.status(500).json({message : "User update faild"})
    }
};
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
      const Users = await csrModel.findByIdAndRemove(id);
      res.status(200).json({ message: "User delete successful" });
    } catch (error) {
      res.status(500).json({ message: "User delete faild!" });
    }
};

module.exports = { getUser, getSingleUser, createUser, loginUser, updateUser, deleteUser }