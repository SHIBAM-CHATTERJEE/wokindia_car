const express = require("express") ;
const app = express() ;
app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;

const userroute = require("./routes/userroute") ;
const carrentroute = require("./routes/carrentroute") ;

app.use("/api/user",userroute) ;
app.use("/api/cars",carrentroute) ;


module.exports = app ;