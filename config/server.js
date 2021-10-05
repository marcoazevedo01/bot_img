require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output');

app.use(
    helmet({
        referrerPolicy: {
            policy: "strict-origin-when-cross-origin"
        },
        contentSecurityPolicy: false
    }),
    helmet.hsts({
        maxAge: 123456,
        preload: true,
    }),
    helmet.permittedCrossDomainPolicies({
        permittedPolicies: "none",
    }),
    cors({
        credentials: true,
    }),
    express.json({
        type: 'application/json'
    }),
    express.urlencoded({
        extended: true
    }),
);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const routs = require('../app/routes/index');
routs(app);

module.exports = app;