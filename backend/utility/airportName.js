const axios = require('axios');
require('dotenv').config();

async function getAirportNameFromIATA(iataCode) {
    const options = {
        method: 'GET',
        url: 'https://airport-info.p.rapidapi.com/airport',
        params: {iata: iataCode},
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'airport-info.p.rapidapi.com'
        }
    };

    const response = await axios.request(options);
    if(response.data)
        return response.data.name;

    return null;
}

module.exports = {getAirportNameFromIATA};