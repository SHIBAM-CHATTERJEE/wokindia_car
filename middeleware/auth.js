
const catchAsyncErrors = require("../utils/catchasyncerror");
const jwt = require("jsonwebtoken");
const db = require('../config/db');


const users = [] ;
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  db.query('SELECT * FROM users2 WHERE id = ?', [decodedData.id], (err, results) => {
    if (err) {
      return next(new ErrorHander("Database error", 500));
    }

    if (results.length === 0) {
      return next(new ErrorHander("User not found", 404));
    }
    req.user = results[0];

    users = results[0] ;
  next();
});
});



exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(users.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.users.role} is not allowed to access this resouce `,
          403
        )

      );
    }

    next();
  };
};