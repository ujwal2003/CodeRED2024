const nlp = require('compromise');

function extractKeywords(userString) {
    const doc = nlp(userString);
    // const prepositions = doc.prepositions().out('array');
    
    // const startLocation = doc.match('from #Place').out('normal');
    // const destinationLocation = doc.match('to #Place').out('normal');

    const locations = doc.places().out('array');

    
    const fromMatch = userString.match(/from\s+([^\s]+)/i);
    const toMatch = userString.match(/to\s+([^\s]+)/i);
    
    const startLocation = fromMatch ? fromMatch[1] : null;
    const destinationLocation = toMatch ? toMatch[1] : null;
    
    const isLocation = nlp('test Houston ').places().text();
    // console.log(doc.match(destinationLocation).text());

    return {startLocation, destinationLocation, locations, isLocation};
}

module.exports = {
    extractKeywords
}