const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors = require('cors');
// const seedDB=require('./seed');
const userRoutes=require('./routes/UserRoutes');
const swiggyRoutes=require('./routes/SwiggyRoutes');
const dotenv=require('dotenv');

dotenv.config();
// seedDB();
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB connected")
})
.catch((err)=>{
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
