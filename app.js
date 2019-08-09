
const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");


app.use(express.static(`${__dirname}/public`));

const expressSwagger = require('express-swagger-generator')(app);

let options = {
    swaggerDefinition: {
        info: {
            description: 'A tour web application',
            title: 'Natours',
            version: '1.0.0',
        },
        host: 'localhost:7000',
        basePath: '/api/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//MIDDLEWARES
app.use(express.json());









app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users',userRouter); 


//SERVER
module.exports = app;