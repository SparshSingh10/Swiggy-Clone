const mongoose = require('mongoose');
const Dishes = require('./models/Dishes');

mongoose.connect('mongodb://localhost:27017/swiggy')
.then(()=>{
    console.log("DB connected")
})
.catch(()=>{
    console.log("Db Connection Error",err);
});

const dishesData = [
  { 
    img: 'image_url_1',
    dishName: 'Dish 1',
    time: 30, // time in minutes
    address: 'Address 1',
    dishOwner:'Rahul'
  },
  { 
    img: 'image_url_2',
    dishName: 'Dish 2',
    time: 45, // time in minutes
    address: 'Address 2',
    dishOwner:'Vijay'
  },
  // Add more dishes as needed
];

async function seedDB() {
  try {
    await Dishes.deleteMany(); // Clear existing data
    await Dishes.insertMany(dishesData); // Insert new data
    console.log("Data seeded");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

module.exports = seedDB; // Export the seed function
