const express = require('express');
const router = express.Router();

const nlp = require('compromise');
nlp.extend(require('compromise-dates'));
const stringSimilarity = require('string-similarity');

function closestSubsetStr(target, options) {
    let closestOption = null;
    let highestSimilarity = -1;
    
    options.forEach(option => {
        const similarity = stringSimilarity.compareTwoStrings(target, option);
        if (similarity > highestSimilarity) {
            closestOption = option;
            highestSimilarity = similarity;
        }
    });

    return closestOption;
}

router.post('/get', (req, res) => {
    let { userPrompt } = req.body;
    const doc = nlp(userPrompt.toLowerCase());

    const startLocationContext = doc.match('(from|between) #Place').out('normal');
    const destinationContext = doc.match('(to|and) #Place').out('normal');
    const locations = doc.places().out('array');

    const startingLocation = closestSubsetStr(startLocationContext, locations);
    const destination = closestSubsetStr(destinationContext, locations);

    const dates = doc.dates().get();

    const response = {
        "locations": {
            "start": startingLocation,
            "dest": destination,
            "mentioned_places": locations
        },
        "datetimes": { dates }
    };

    res.status(200).json(response);
});

module.exports = router;