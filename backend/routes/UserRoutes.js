const express=require('express');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('./../models/User');
const tokenMaker=require('./jsonwebtoken');
const router=express.Router()


router.post("/register", async (req, res) => {
    try {
        const { email, password, firstName, lastName, address, number, gender } = req.body;
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User Already Exist");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({email,password: hashedPassword,firstName,lastName,address,number,gender
        });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send("Internal server error");
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid Email" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ success: false, message: "Invalid Password" });
        }
        const token = tokenMaker(user);
        res.status(200).json({ success: true, token, user, message: "Login successful" });
    } catch (error) { // Add 'error' parameter here
        console.log("Login Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.get("/profile/:id", async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).json(user);
});

router.patch("/profile/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
     await User.findByIdAndUpdate(id, updatedData, { new: true });
});




module.exports = router;