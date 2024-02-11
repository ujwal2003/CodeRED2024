const axios = require('axios');
require('dotenv').config();

const options = {
    method: 'GET',
    url: 'https://airport-info.p.rapidapi.com/airport',
    params: {iata: 'EWR'},
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'airport-info.p.rapidapi.com'
    }
};

async function runTest() {
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    runTest
};