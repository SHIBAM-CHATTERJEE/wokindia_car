// Create Token and saving in cookie
const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
  

    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    };
    const user2 = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user2,
      token,
    });
  };
  
  module.exports = sendToken;
  