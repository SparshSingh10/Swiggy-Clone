const mongoose = require('mongoose');

let dishesSchema = mongoose.Schema({
    img: { type: String, required: true, trim: true },
    dishName: { type: String, required: true, trim: true },
    time: { type: Number, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    dishOwner: { type: String, required: true, trim: true }
});

let Dishes=mongoose.model('Dishes',dishesSchema);
module.exports=Dishes
