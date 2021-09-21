require('dotenv').config();
const express = require('express');
const jobService = require('../app/service/jobService');
const app = express();

app.use(
    express.json({
        type: 'application/json'
    }),
    express.urlencoded({
        extended: true
    }),
);

jobService();

const routs = require('../app/routes/index');
routs(app);

module.exports = app;