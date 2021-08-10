'use strict';
const express = require('express');
const app = express();
const registerRoutes = require('./routes');

// server config
const port = process.env.PORT || 3000;
__dirname = 'public';

// register routes
registerRoutes(app);

// create server start method
const start = () => {
    return new Promise((resolve, reject) => {
        // start the server
        app.listen(port, () => {
            console.log(`Connected to Port ${port}`);
            resolve()
        });
    }).catch((error) => {
        console.log(`failed to start server => ${error.message}`)
    });
}

app.get('/', (req, res) => {
    res.sendFile('/index.html', {root: __dirname})
})

app.use(express.static(__dirname));

module.exports = start;


