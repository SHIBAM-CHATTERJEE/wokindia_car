const bcrypt = require('bcrypt');
const db = require('../config/db.js');
const catchAsync = require('../utils/catchasyncerror.js');
const sendToken = require('../utils/jwttoken.js');




exports.register = catchAsync(async(req,res)=>{
    const { name, email, password } = req.body;
  
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).send('All fields are required.');
    }
     
      const hashedPassword = await bcrypt.hash(password, 10);
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

              
              const result2 = {
                name: name,
                email: email,
              };

              sendToken(result2, 201, res);
              
            });
        }
      });
      
    
} 
);


exports.login = catchAsync(async(req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('All fields are required.');
    }
  

      const query = 'SELECT * FROM users WHERE email = ?';
      db.query(query, [email], async(err, result) => {
        if (err) {
          console.error('Error checking for user:', err);
          return res.status(500).send('Internal server error.');
        }
        if (result.length == 0) {
          return res.status(400).send('Invalid credentials.');
        }
        if (await bcrypt.compare(password, result[0].password)) {
          
             console.log(result[0]) ;
            sendToken(result[0], 200, res);


          



        } else {
          res.status(400).send('Invalid credentials.');
        }
      });
   
}) ;