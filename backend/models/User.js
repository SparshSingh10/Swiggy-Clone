const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: { type: String, trim: true, minlength: 2, required: true },
    lastName: { type: String, trim: true, minlength: 2, required: true },
    email: { type: String, trim: true, required: true},
    password: { type: String, required: true },
    number: { type: String, trim: true },
    gender: { type: String, enum: ['male', 'female', 'nonbinary', 'asexual', 'transgender', 'pansexual', 'genderqueer'] } 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
