const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

var app = express();

app.get('/',(req,res) => {
    var url = 'https://www.imdb.com/title/tt5463162/';

    axios.get(url).then((response) => {
        var $ = cheerio.load(response.data);
        
        var title, release, rating;
        var json = { title : "",genre : "", rating : ""};

        json.title = $('.title_wrapper h1').children().end().text();
        json.genre = $('.subtext .itemprop').text();
        json.rating = $('.ratingValue strong span').text();

        res.render('index.hbs',{
            title : json.title,
            genre : json.genre,
            rating : json.rating

        });
     
    }).catch((e) => {
        console.log('Unable to connect to website');
    });
});
app.listen('3000',() => {
    console.log('starting the app on port 3000');
});

module.exports = {app};