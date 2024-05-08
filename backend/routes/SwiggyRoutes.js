const express = require('express');
const router = express.Router();
const Dishes = require('../models/Dishes');

router.get('/home', async (req, res) => {
    try {
        let alldishes = await Dishes.find();
        // console.log(alldishes);
        return res.status(200).json(alldishes);
    } catch (error) {
        console.error("Error fetching dishes:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/home', async (req, res) => {
    try {
        const {img,dishName,time,address,dishOwner}=req.body;
        await Dishes.create({img,dishName,time,address,dishOwner});
        res.status(201);
    } catch (error) {
        console.error("Error fetching dishes:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete('/home/:id',async(req,res)=>{
    const {id}=req.params;
    await Dishes.findByIdAndDelete(id);
});

router.get('/home/:id', async (req, res) => {
    try{
    const { id } = req.params;
    const dish = await Dishes.findById(id);
    // console.log(dish);
    if (!dish) {
        return res.status(404).json({ message: "Location not found" });
    }
    return res.json(dish);
    }
    catch(error){
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
