'use strict';
const mockDBCalls = require('../database/index.js');

const getListOfAgesOfUsersWithHandler = async (request, response) => {
    try {
        const itemToLookup = request.query.i;
        const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
        response.status(200).send(JSON.stringify(data));
    } catch (e) {
        console.error('Error: ', e.message);
    }
};

module.exports = (app) => {
    app.get('/users/age', getListOfAgesOfUsersWithHandler);
};
