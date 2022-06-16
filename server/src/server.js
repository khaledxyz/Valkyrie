const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const chalk = require('chalk');
require("dotenv").config();

// * App Settings * //
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

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


const authRouter = require('./routes/auth');
app.use('/', authRouter);