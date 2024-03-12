DROP DATABASE IF EXISTS budget_db;
CREATE DATABASE budget_db;

USE budget_db;

-- Create the categories table with primary key categories_id
CREATE TABLE categories (
    categories_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    amount DECIMAL(10, 2)
);

-- Create the budget table referencing categories_id and weeks_id
CREATE TABLE budget (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    categories_id INT,
    FOREIGN KEY (categories_id) REFERENCES categories(categories_id),
    weeks_id INT,
    FOREIGN KEY (weeks_id) REFERENCES weeks(id)
);

-- Create the weeks table
CREATE TABLE weeks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    total DECIMAL(10, 2)
);

-- Create the goals table referencing categories_id and weeks_id
CREATE TABLE goals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    weekly_total DECIMAL(10, 2),
    category_amount DECIMAL(10, 2),
    categories_id INT,
    FOREIGN KEY (categories_id) REFERENCES categories(categories_id),
    weeks_id INT,
    FOREIGN KEY (weeks_id) REFERENCES weeks(id)
);