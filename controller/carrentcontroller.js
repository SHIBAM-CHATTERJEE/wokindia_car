exports.createcar = async(req, res, next) => {
  const { category, model, number_plate, current_city, rent_per_hr } = req.body;


  if (!category || !model || !number_plate || !current_city || rent_per_hr === undefined) {
    return next('All fields are required', 400);
  }


  const rent_history = req.body.rent_history || [];

  const query = 'INSERT INTO cars (category, model, number_plate, current_city, rent_per_hr, rent_history) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [category, model, number_plate, current_city, rent_per_hr, JSON.stringify(rent_history)], (err, result) => {
    
    if (err) {
      console.error('Error inserting car:', err);
      return next('Internal server error', 500);
    }

    res.status(201).json({
      message: 'Car added successfully',
      car_id: result.insertId,
      status_code: 200
    });
  });
}



