const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

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
