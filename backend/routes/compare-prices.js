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
                //'Content-Type' : 'application/json'
            }
        });

        //console.log("here")
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

        let itinerarySegments = flightOffersResponse.data.data[0].itineraries[0].segments;

        let iatasInOrder = [];
        itinerarySegments.map((segment) => {
            let prev = iatasInOrder[iatasInOrder.length-1];

            if(prev != segment.departure.iataCode)
                iatasInOrder.push(segment.departure.iataCode);

            if(prev != segment.arrival.iataCode)
                iatasInOrder.push(segment.arrival.iataCode);
        });

        let airportsInOrder = [];
        for(let i=0; i<iatasInOrder.length; i++) {
            let airport = await airportName.getAirportNameFromIATA(iatasInOrder[i]);
            airportsInOrder.push(airport);
        }

        let departureTime = itinerarySegments[0].departure.at;
        let arrivalTime = itinerarySegments[itinerarySegments.length-1].arrival.at;

        let filteredData = {
            "flight_data_success": true,
            "airportsInOrder": airportsInOrder,
            "departureTime": departureTime,
            "arrivalTime": arrivalTime,
            "price": flightOffersResponse.data.data[0].price.grandTotal
        }

        //res.set('content-type', 'application/json');
        res.json(filteredData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching flight offers');
    }
});

module.exports = router;