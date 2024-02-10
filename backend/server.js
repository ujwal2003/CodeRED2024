const express = require('express');
const test = require('./keywords');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send("Server is online.");
    // console.log(test.extractKeywords("Find me the lowest price flight option between Atlanta and New York between the dates of November 11th and 19th"));
    console.log(test.extractKeywords("Find me the cheapest flight from Houston to Seattle on tuesday"));
});

app.listen(port, () => {
    console.log(`Server running on prt ${port}`);
});