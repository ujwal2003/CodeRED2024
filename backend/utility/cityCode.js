const axios = require('axios');
require('dotenv').config();

async function getAccessToken(clientId, clientSecret) {
    const authResponse = await axios.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token', 
        `grant_type=client_credentials&client_id=${process.env.AMADEUS_CLIENT_ID}&client_secret=${process.env.AMADEUS_CLIENT_SECRET}`, 
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

    const accessToken = authResponse.data.access_token;

    return accessToken;
}

async function requestCityLocationCodeAPI(cityName, countryCode = 'US', accessToken) {
    const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${cityName}&countryCode=${countryCode}`;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const data = response.data;
        if(data.data && data.data.length > 0)
            return data.data[0].iataCode;
        else
            return null;

    } catch (error) {
        console.error('Error fetching location code:', error.message);
        return null;
    }
}

async function getCityLocationCode(cityName) {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    let accessToken = await getAccessToken(clientId, clientSecret);

    let locationCode = await requestCityLocationCodeAPI(cityName, 'US', accessToken);
    return locationCode;
}

module.exports = { getCityLocationCode };