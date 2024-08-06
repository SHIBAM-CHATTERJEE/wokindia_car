CREATE TABLE user2(  
    id int NOT NULL AUTO_INCREMENT,  
    name varchar(45) NOT NULL,  
    email varchar(35) NOT NULL,  
    password varchar(35) NOT NULL,  
    role enum ('admin','user') ,
    PRIMARY KEY (id)  
);  


CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    number_plate VARCHAR(50) NOT NULL UNIQUE,
    current_city VARCHAR(255) NOT NULL,
    rent_per_hr DECIMAL(10, 2) NOT NULL,
    rent_history JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


