const express = require('express');

const app = express();
const port = 8080;

let cors = require('cors');
app.use(cors());

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Server is online.");
});

// routes
const userPromptRouter = require('./routes/data-extraction-route');
app.use("/prompt", userPromptRouter);
const comparePriceRouter = require("./routes/compare-prices")
app.use("/prices", comparePriceRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});