const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const PORT = 4000;
const db = process.env.DB_connect;

const app = express();

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