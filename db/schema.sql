DROP DATABASE IF EXISTS budget_db;
CREATE DATABASE budget_db;

USE budget_db;

-- Create the department table with primary key department_id
CREATE TABLE categories (
    categories_id INT AUTO_INCREMENT,
    title  VARCHAR(30) NOT NULL,
    amount DECIMAL(10, 2),

    PRIMARY KEY (title)
);


-- Create the role table reference department id
CREATE TABLE budget (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    categories VARCHAR (30),
    weeks VARCHAR(30) NOT NULL, 

    PRIMARY KEY (id),
    
    FOREIGN KEY (categories) 
    REFERENCES categories(title) 
    
    FOREIGN KEY (weeks),
    REFERENCES weeks(name),

    ON DELETE SET NULL 
);


-- Create the employee table and the interconnection to role id
CREATE TABLE weeks (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    total DECIMAL (10, 2),
    
   PRIMARY KEY (name),
   
   ON DELETE SET NULL
);

-- Create the manager table and connect the reference to employee id
CREATE TABLE goals (
    id INT AUTO_INCREMENT
    weekly_total DECIMAL (10, 2),
    category VARCHAR(30),
    category_amount DECIMAL (10, 2),
    weeks VARCHAR(30),

    PRIMARY KEY (id),
       
    FOREIGN KEY (categories),
    REFERENCES categories(title),

    FOREIGN KEY (weeks),
    REFERENCES week(name),


    ON DELETE SET NULL
);