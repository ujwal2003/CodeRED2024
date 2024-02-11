const express = require('express');
require('dotenv').config();
const router = express.Router();
const axios = require('axios');

// Route to fetch flight offers
router.post('/flight-offers', async (req, res) => {
    try {
        let {startCode, endCode, date} = req.body;
        // Authenticate with the Amadeus API
        const authResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', `grant_type=client_credentials&client_id=${process.env.AMADEUS_CLIENT_ID}&client_secret=${process.env.AMADEUS_CLIENT_SECRET}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = authResponse.data.access_token;

        // Make a request to the Flight Offers Search API
        const flightOffersResponse = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                originLocationCode: startCode, // Example origin NYC
                destinationLocationCode: endCode, // Example destination NYC
                departureDate: date, // Example date '2024-12-15'
                adults: '1',
                currencyCode: 'USD'
            }
        });

        res.json(flightOffersResponse.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching flight offers');
    }
});

module.exports = router;