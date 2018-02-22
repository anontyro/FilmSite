const request = require('request');
const apiKey = require('../config/env').MovieDbKeyV3;

const buildRequestOptions = (url, page, key, query) => {
    const options = {
        method: 'GET',
        url: url,
        qs: {page: page, language: 'en-us', api_key: apiKey},
        body: '{}' };
    
    if(query){
        options.qs.query = query;
    }
    return options;
}

module.exports ={
    /**
     * Requires no params returns the top twenty tv shows that will be airing today in JSON format
     */
    getAiringToday: (callback) =>{
        const options = buildRequestOptions('https://api.themoviedb.org/3/tv/airing_today', 1, apiKey);

        request(options, (err, res, body) => {
            if(err){
                console.log(err);
            }
            if(!err && res.statusCode === 200){
                callback(body);
            }
        });
    },
    getShowDetails: (id, callback) =>{
        const options = buildRequestOptions('https://api.themoviedb.org/3/tv/'+id, 1, apiKey);

        request( options, (err, res, body) =>{
            if(err){
                console.log(err);
            }
            if(!err && res.statusCode === 200){
                callback(body);
            }
        });
    },
}
