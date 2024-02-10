const express = require('express');

const app = express();
const port = 8080;

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Server is online.");
});

// routes
const userPromptRouter = require('./routes/data-extraction-route');
app.use("/prompt", userPromptRouter);

app.listen(port, () => {
    console.log(`Server running on prt ${port}`);
});