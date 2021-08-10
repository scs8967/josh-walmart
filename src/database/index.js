'use strict';
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
        }, 500);
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo)
    return mockDBCall(dataAccessMethod);
};

const getUserItems = () => {
    const dataAccessMethod = () => {
        const itemsList = [];
        _.map(db.itemsOfUserByUsername, items => {
            for (let item of items) {
                if (itemsList.indexOf(item) === -1) {
                    itemsList.push(item)
                }
            }
        })
        return itemsList;
    }
    return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
    const dataAccessMethod = () => {
        const data = [];
        const ages = [];
        _.map(db.itemsOfUserByUsername, (items, key) => {
            if (items.indexOf(item) !== -1) {
                data.push(key);
            }
        });

        _.map(db.usersById, ageDemographic => {
            if (data.indexOf(ageDemographic.username) !== -1) {
                ages.push(ageDemographic.age);
            }
        });

        const map = {};

        for (let item of ages) {
            if (!map[item]) {
                map[item] = 0;
            }
            map[item] += 1;
        }

        return map;
    }
    return mockDBCall(dataAccessMethod);
}

module.exports = {
    getUsers,
    getUserItems,
    getListOfAgesOfUsersWith
};
