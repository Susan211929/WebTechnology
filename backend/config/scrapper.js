var cheerio = require('cheerio');
var request = require('request');

var scrapeModules = [];

scrapeModules.push(...require("../scrapper/sciencealert.js"));

module.exports = function (app, Post) {
    app.get('/scrape', function (req, res) {
        process.nextTick(function () {
            for(let index in scrapeModules)    {
                request(scrapeModules[index][0], function (error, response, html) {
                    if (!error) {
                        var $ = cheerio.load(html);

                        scrapeModules[index][1]($, Post);
                    }   
                });
            }
        });
        res.send("Scrapping");
    });


}