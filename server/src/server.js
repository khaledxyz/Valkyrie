const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const colors = require('colors');
require("dotenv").config();

const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// * Middleware * //
app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

// * Connection * //
app.listen(PORT, () => {
    console.log('-------------------------------------')
    console.log(
        'Dev server running at  >'.green,
        `https://localhost:${PORT}`.blue
    )
    connectDB()
})

// * ROUTES * //
app.use('/api/users', require('./routes/usersRouter'));