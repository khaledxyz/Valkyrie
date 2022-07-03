const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const chalk = require('chalk');
require("dotenv").config();

const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// * Middleware * //
app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

// * Connection * //
app.listen(PORT, () => console.log(`
    ${chalk.green('Dev server running at')}
        > Local: ${chalk.blue(`http://localhost:${PORT}`)}
        > Network: ${chalk.blue(`Not Enabled Yet.`)}
`));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(chalk.green(`   MongoDB Connected`))) 
.catch(err => console.log(chalk.red(`${err})`)));
// * The space before "MongoDB" is intentional, it is to align it in the Console.

// * ROUTES * //
app.use('/api/users', require('./routes/usersRouter'));