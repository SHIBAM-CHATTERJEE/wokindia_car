# Car Rental System

This project is a car rental system similar to Zoomcar, where users can browse different cars and rent a specific car. The system supports role-based access with two types of users: Admin and Login users. Admins can perform all operations like adding cars for renting, updating existing car details, etc. Login users can check all available cars as per their requirement and make reservations.

## Tech Stack

- Backend: Node.js, Express.js
- Database: MySQL

## Features

1. **User Registration**
   - Endpoint: `[POST] /api/signup`
   - Request Data: 
     ```json
     {
       "username": "example_user",
       "password": "example_password",
       "email": "user@example.com"
     }
     ```
   - Response Data:
     ```json
     {
       "status": "Account successfully created",
       "status_code": 200,
       "user_id": "123445"
     }
     ```

2. **User Login**
   - Endpoint: `[POST] /api/login`
   - Request Data:
     ```json
     {
       "username": "example_user",
       "password": "example_password"
     }
     ```
   - Response Data (Success):
     ```json
     {
       "status": "Login successful",
       "status_code": 200,
       "user_id": "12345",
       "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
     }
     ```
   - Response Data (Failure):
     ```json
     {
       "status": "Incorrect username/password provided. Please retry",
       "status_code": 401
     }
     ```

3. **Add a New Car for Renting (Admin)**
   - Endpoint: `[POST] /api/car/create`
   - Request Data:
     ```json
     {
       "category": "SUV",
       "model": "BMW Q3",
       "number_plate": "KA1234",
       "current_city": "bangalore",
       "rent_per_hr": 100,
       "rent_history": []
     }
     ```
   - Response Data:
     ```json
     {
       "message": "Car added successfully",
       "car_id": "12345",
       "status_code": 200
     }
     ```

4. **Get Available Rides and Total Amount**
   - Endpoint: `[GET] /api/car/get-rides`
   - Query Parameters:
     - `origin`
     - `destination`
     - `category`
     - `required_hours`
   - Response Data:
     ```json
     [
       {
         "car_id": "1234",
         "category": "SUV",
         "model": "BMW Q3",
         "number_plate": "KA1234",
         "current_city": "bangalore",
         "rent_per_hr": 100,
         "rent_history": [
           {
             "origin": "bangalore",
             "destination": "mumbai",
             "amount": 10000
           }
         ],
         "total_payable_amt": 1000
       },
       ...
     ]
     ```

5. **Rent a Car**
   - Endpoint: `[POST] /api/car/rent`
   - Headers: `{ "Authorization": "Bearer {token}" }`
   - Request Data:
     ```json
     {
       "car_id": "12345",
       "origin": "mumbai",
       "destination": "bangalore",
       "hours_requirement": 10
     }
     ```
   - Response Data (Success):
     ```json
     {
       "status": "Car rented successfully",
       "status_code": 200,
       "rent_id": "54321",
       "total_payable_amt": 1000
     }
     ```
   - Response Data (Failure):
     ```json
     {
       "status": "No car is available at the moment",
       "status_code": 400
     }
     ```

6. **Update Rent History (Admin)**
   - Endpoint: `[POST] /api/car/update-rent-history`
   - Headers: `{ "Authorization": "Bearer {token}" }`
   - Request Data:
     ```json
     {
       "car_id": "12345",
       "ride_details": {
         "origin": "mumbai",
         "destination": "bangalore",
         "hours_requirement": 10
       }
     }
     ```
   - Response Data:
     ```json
     {
       "status": "Car's rent history updated successfully",
       "status_code": 200
     }
     ```

## Setup and Installation

### Prerequisites

- Node.js and npm installed on your machine.
- MySQL database.
- Free MySQL database hosting (e.g., [FreeMySQLHosting](https://www.freemysqlhosting.net/)).

### Steps

 Clone the repository:
   ```sh
   git clone https://github.com/your-username/car-rental-system.git
   cd car-rental-system
