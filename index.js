const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const PORT = 4000;
const db = process.env.DB_connect;
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Login',
            version: '1.0.0',
            description: "A Simple register and login API"
            },
    
        servers: [
            {
                url:"http://localhost:4000"
            }
        ],
    },
    apis: ['./routes/auth.js'],
};

const openapiSpecification = swaggerJsdoc(options);

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
//routes
const authRoute = require('./routes/auth');

//connect to db
mongoose.connect(db, 
                { useNewUrlParser: true },
                () => console.log('connect to db')
                );  

//middleware
app.use(express.json());

//route middleware
app.use('/api/user', authRoute);

//open application
app.listen(PORT);