require('dotenv').config();
const express = require('express');
const job = require('../app/service/job');
const app = express();

app.use(
    express.json({
        type: 'application/json'
    }),
    express.urlencoded({
        extended: true
    }),
);

job();

const routs = require('../app/routs/index');
routs(app);

module.exports = app;