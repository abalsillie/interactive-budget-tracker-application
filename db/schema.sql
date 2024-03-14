DROP DATABASE IF EXISTS budget_db;
CREATE DATABASE budget_db;

USE budget_db;

-- Create the department table with primary key department_id
CREATE TABLE categories (
    categories_id INT AUTO_INCREMENT PRIMARY KEY ,
    title  VARCHAR(30) NOT NULL,
    amount DECIMAL(10, 2),
);


-- Create the role table reference department id
CREATE TABLE spends (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    
    categories VARCHAR (30),
    FOREIGN KEY (categories_id) 
    REFERENCES categories(id), 
    
    weeks VARCHAR(30) NOT NULL,
    FOREIGN KEY (weeks_id)
    REFERENCES weeks(id),

    ON DELETE SET NULL, 
);


-- Create the employee table and the interconnection to role id
CREATE TABLE weeks (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    total DECIMAL (10, 2) ,
   
);

-- Create the manager table and connect the reference to employee id
CREATE TABLE goals (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    weekly_total DECIMAL (10, 2),
    category_amount DECIMAL (10, 2),


    category VARCHAR(30) 
    FOREIGN KEY (categories_id)
    REFERENCES categories(id),
    ON DELETE SET NULL

    weeks VARCHAR(30)
    FOREIGN KEY (weeks_id)
    REFERENCES week(id),
);