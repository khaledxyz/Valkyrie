const express = require('express');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is live on http://localhost:${PORT}`));