const nlp = require('compromise');
const stringSimilarity = require('string-similarity');

function closestSubset(target, options) {
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

function extractKeywords(userString) {
    const doc = nlp(userString.toLowerCase());
    
    let locations = doc.places().out('array');

    const startContext = doc.match('(from|between) #Place').out('normal');
    const destinationContext = doc.match('(to|and) #Place').out('normal');

    locations = locations.map((place) => {
        return place.toLowerCase();
    });

    const startingLocation = closestSubset(startContext, locations);
    const endingLocation = closestSubset(destinationContext, locations);

    return {startingLocation, endingLocation, locations};
}

module.exports = {
    extractKeywords
}