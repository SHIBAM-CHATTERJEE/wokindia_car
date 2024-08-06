const mysql = require("mysql") ;
const dotenv = require("dotenv") ;
dotenv.config({path: "config/config.env"}) ;




     const db = mysql.createConnection({
        host :"localhost",
        user :process.env.DB_USER,
        password :process.env.DB_PASS,
        database :"practise"
    })

    db.connect((err)=>{
        if(err){
            console.log(err) ;
        }else{
            console.log("Database connected") ;
        }
    })



module.exports = db;
