const express = require('express');
const chalk = require('chalk');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`
    ${chalk.green('Dev server running at')}
        > Local: ${chalk.blue(`http://localhost:${PORT}`)}
        > Network: ${chalk.blue(`Not Enabled Yet.`)}
`));