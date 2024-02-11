const express = require('express');
require('dotenv').config();
const router = express.Router();
const axios = require('axios');

const cityCode = require('../utility/cityCode');
const airportName = require('../utility/airportName');

// Route to fetch flight offers
router.post('/flight-offers', async (req, res) => {
    try {
        // let {startCode, endCode, date} = req.body;
        let {start, end, date} = req.body;

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
                originLocationCode: await cityCode.getCityLocationCode(start), // Example origin NYC
                destinationLocationCode: await cityCode.getCityLocationCode(end), // Example destination NYC
                departureDate: date, // Example date '2024-12-15'
                adults: '1',
                currencyCode: 'USD'
            }
        });

        // let filteredResponse = []
        // flightOffersResponse.data.data.map((dat) => {
        //     let filteredData = {
        //         "departureAirport": dat.itineraries[0].segments[0].departure.iataCode,
        //         "arrivalAirport": dat.itineraries[0].segments[0].arrival.iataCode,
        //         "departureTime": dat.itineraries[0].segments[0].departure.at,
        //         "arrivalTime": dat.itineraries[0].segments[0].arrival.at,
        //         "price": dat.price.grandTotal
        //     };
            
        //     filteredResponse.push(filteredData);
        // });

        if(!flightOffersResponse.data.data) {
            res.json({
                "flight_data_success": false
            });
            return;
        }

        let departureAirportIATA = flightOffersResponse.data.data[0].itineraries[0].segments[0].departure.iataCode
        let departureAirportName = await airportName.getAirportNameFromIATA(departureAirportIATA);

        let arrivalAirportIATA = flightOffersResponse.data.data[0].itineraries[0].segments[0].arrival.iataCode;
        let arrivalAirportName = await airportName.getAirportNameFromIATA(arrivalAirportIATA);

        let filteredData = {
            "flight_data_success": true,
            "departureAirport": departureAirportName,
            "arrivalAirport": arrivalAirportName,
            "departureTime": flightOffersResponse.data.data[0].itineraries[0].segments[0].departure.at,
            "arrivalTime": flightOffersResponse.data.data[0].itineraries[0].segments[0].arrival.at,
            "price": flightOffersResponse.data.data[0].price.grandTotal
        }

        res.json(filteredData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching flight offers');
    }
});

module.exports = router;