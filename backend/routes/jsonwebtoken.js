const jwt=require("jsonwebtoken");
let tokenMaker=function(data){
    let findData=JSON.stringify(data);
    let token=jwt.sign(findData,"samarthvohra");
    return token;
};
module.exports=tokenMaker;