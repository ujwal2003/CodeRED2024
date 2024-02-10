const express = require('express');
const test = require('./keywords');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send("Server is online.");
    console.log(test.extractKeywords("I want the flights from Houston to New York and also visit Washington DC"));
});

app.listen(port, () => {
    console.log(`Server running on prt ${port}`);
});