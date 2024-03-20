
const sequelize = require('../config/connection');
const { Goals, Categories, Spends, User, Weeks } = require('../models');

const userData = [
    { name: 'Alex Johnson', email: 'alexj@example.com', password: 'ajEX9012' },
    { name: 'Samantha Ray', email: 'sraymagic@example.com', password: 'smRy2024' },
    { name: 'Jordan Kim', email: 'jkimboom@example.com', password: 'jk88Kim!' },
    { name: 'Luisa Gomez', email: 'luisa_g@example.com', password: 'Lg4mz678' },
    { name: 'Ethan Wright', email: 'wrighte@example.com', password: 'EtWg1234' },
];

const categoriesData = [
    { name: 'Rent', user_id: 1, weeks_id: 1 },
    { name: 'Food', user_id: 1, weeks_id: 1 },
    { name: 'Utilities', user_id: 1, weeks_id: 1 },
    { name: 'Entertainment', user_id: 1, weeks_id: 1 },
    { name: 'Transport', user_id: 1, weeks_id: 1 },

];
// const goalsData = [
//     { amount: 300, categories_id: 1 },
//     { amount: 225, categories_id: 2 },
//     { amount: 50, categories_id: 3 },
//     { amount: 100, categories_id: 4 },
//     { amount: 140, categories_id: 5 },
// ];

const spendsData = [
    { name: 'Uber Eats', amount: 35, categories_id: 2, weeks_id: 1 },
    { name: 'Weekly Rent', amount: 300, categories_id: 1, weeks_id: 1 },
    { name: 'Grocery Shopping', amount: 150, categories_id: 2, weeks_id: 1 },
    { name: 'Electricity Bill', amount: 60, categories_id: 3, weeks_id: 1 },
    { name: 'Streaming Service', amount: 15, categories_id: 4, weeks_id: 1 },
    { name: 'Gas for Car', amount: 40, categories_id: 5, weeks_id: 1 },
    { name: 'Water Bill', amount: 30, categories_id: 3, weeks_id: 1 },
    { name: 'Public Transport', amount: 25, categories_id: 5, weeks_id: 1 },
    { name: 'Dinner Out', amount: 50, categories_id: 2, weeks_id: 1 },
    { name: 'Movie Tickets', amount: 20, categories_id: 4, weeks_id: 1 },
    { name: 'Internet Bill', amount: 45, categories_id: 3, weeks_id: 1 },
];

const weeksData = [
    { name: 'My first week', start_date: '2024-03-18', user_id: 1 },
    { name: 'My second week', start_date: '2024-03-25', user_id: 1 },
];

//append the dummy data to relevant models
const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Sync models with the database

        await User.bulkCreate(userData);
        await Categories.bulkCreate(categoriesData);
        //await Goals.bulkCreate(goalsData);
        await Weeks.bulkCreate(weeksData);
        await Spends.bulkCreate(spendsData);

        console.log('Seed data inserted successfully');
    } catch (error) {
        console.error('Error inserting seed data:', error);
    }
};

seedDatabase();