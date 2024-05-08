const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors = require('cors');
// const seedDB=require('./seed');
const userRoutes=require('./routes/UserRoutes');
const swiggyRoutes=require('./routes/SwiggyRoutes');

// seedDB();
mongoose.connect('mongodb://localhost:27017/swiggy')
.then(()=>{
    console.log("DB connected")
})
.catch(()=>{
    console.log("Db Connection Error",err);
})

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(swiggyRoutes);

const PORT=8080;
app.listen(PORT,function(){
    console.log(`Server Running at Port ${PORT}`);
})