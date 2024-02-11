const express = require('express');

//! TESTING
const cityloc = require('./apitests/citylocations');
const airprtName = require('./apitests/airportnames');

const app = express();
const port = 8080;

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Server is online.");
    airprtName.runTest();
});

// routes
const userPromptRouter = require('./routes/data-extraction-route');
app.use("/prompt", userPromptRouter);
const comparePriceRouter = require("./routes/compare-prices")
app.use("/prices", comparePriceRouter)

app.listen(port, () => {
    console.log(`Server running on prt ${port}`);
});