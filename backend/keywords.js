const nlp = require('compromise');
nlp.extend(require('compromise-dates'));

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

function extractPlaces(userString) {
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

function extractDates(userString) {
    const doc = nlp(userString.toLowerCase());

    let dates = doc.dates().get();
    let formattedDates = doc.dates().format('{month} {date-ordinal}').out('array');
    return dates;
}

function extractKeywords(userString) {
    const places = extractPlaces(userString);
    const dates = extractDates(userString);

    return {places, dates};
}

module.exports = {
    extractKeywords
}