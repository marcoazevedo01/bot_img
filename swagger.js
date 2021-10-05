const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        version: "0.0.5",
        title: "API_FOTOS",
        description: "EL chupacabra"
    },
    host: "152.67.60.71:3002",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        apiKeyAuth: {
            type: "apiKey",
            in: "header",
            name: "X-API-KEY",
            description: "any description..."
        }
    },
    definitions: {
        image: {
            barCode: "98794657546",
            imgBuffer: "Binary('iVBORw0KGgoAAAANSUhEAWExMPDAwLCAj///8KAwL///7////+/v8EAgITEA/+...', 0)"
        },
    }

}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./app/routes/imageR.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js');
})