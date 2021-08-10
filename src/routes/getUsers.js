'use strict';
const mockDBCalls = require('../database/index.js');

const getUsersHandler = async (request, response) => {
    try {
        const data = await mockDBCalls.getUsers();
        response.status(200).send(JSON.stringify(data));
    } catch (e) {
        console.error('Error: ', e.message);
    }
};

module.exports = (app) => {
    app.get('/users', getUsersHandler);
};
