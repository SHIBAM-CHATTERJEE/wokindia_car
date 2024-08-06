const app = require("./app") ;
const dotenv = require("dotenv") ;
const db = require("./config/db") ;
dotenv.config({path: "config/config.env"})
const bcrypt = require('bcrypt');








app.get("/",async(req,res)=>{
    const sql = "SELECT * FROM student " ;
    let user = [] ;
    await db.query(sql,(err,result)=>{
        if(err){
            console.log(err) ;
        }else{

           
            user = result ;
            console.log(user) ;
            res.send(user) ;
        }
    })
   
})
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).send('All fields are required.');
    }
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert user into the database
      const checkquery = 'SELECT * FROM users WHERE email = ?';
      
      db.query(checkquery, [email], (err, result) => {
        if (err) {
          console.error('Error checking for user:', err);
          return res.status(500).send('Internal server error.');
        }
        if (result.length > 0) {
          return res.status(400).send('User already exists.');
        }
        else if(result.length == 0){
            const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            db.query(query, [name, email, hashedPassword], (err, result) => {
              if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).send('Internal server error.');
              }
              res.status(201).send('User registered successfully.');
            });
        }
      });
      
    } catch (err) {
      console.error('Error hashing password:', err);
      res.status(500).send('Internal server error.');
    }
  });



app.listen(3000,()=>{
    console.log("Server is running on port 3000") ;
})