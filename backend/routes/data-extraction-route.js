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
    let nlpSucceeded = true;
    const doc = nlp(userPrompt.toLowerCase());

    // const startLocationContext = doc.match('(from|between) #Place').out('normal');
    // const destinationContext = doc.match('(to|and) #Place').out('normal');

    let startLocationContext = doc.match('(from|between) #Place').out('normal');
    let destinationContext = doc.match('(to|and) #Place').out('normal');

    // if(!startLocationContext || !destinationContext) {
    //     startLocationContext = doc.match('between #Place').out('normal');
    //     destinationContext = doc.match('and #Place').out('normal');
    // }

    // console.log(startLocationContext);
    // console.log(destinationContext);

    const locations = doc.places().out('array');

    // console.log(locations.includes(destinationContext.split(' ')[1]));
    
    if(!locations.includes(startLocationContext.split(' ')[1])) {
        startLocationContext = doc.match('(from|between) #Place #Place').out('normal');
    }

    if(!locations.includes(destinationContext.split(' ')[1])) {
        destinationContext = doc.match('(to|and) #Place #Place').out('normal');
    }


    if(locations.length < 2)
        nlpSucceeded = false;

    const startingLocation = closestSubsetStr(startLocationContext, locations);
    const destination = closestSubsetStr(destinationContext, locations);

    const dates = doc.dates().get();

    if(Object.keys(dates).length < 1)
        nlpSucceeded = false;

    const response = {
        "nlp_success": nlpSucceeded,
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