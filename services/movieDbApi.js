const request = require('request');
const apiKey = require('../config/env').MovieDbKeyV3;
module.exports ={

    getNowShowing: (callback) =>{
        request('https://api.themoviedb.org/3/movie/now_playing?' + apiKey, (err, res, body) => {
            if(!err && res.statusCode == 200) {
                callback(body);
            }
        })
    }
}