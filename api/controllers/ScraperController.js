/**
 * ScraperController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var reqfast = require('req-fast');

module.exports = {
    sites: function (req,res) {
        sails.log('+ SITES SCRAPED');
        var _path_scraper = '/sites';
        var _URI = sails.config.scraper.url+_path_scraper;
        console.log(_URI);
        return res.redirect(_URI);
    },
    /**
     * API Request return JSON Data about the path of the directory of scraped site
     * JSON: [directory : "", previewPath : "",downloadPath: ""]
     */
    site: function (req,res) {
        sails.log('+ SCRAPER');

        var _url = req.param('url');
        var _path_scraper = '/sites/get/?url=';
        var URI = sails.config.scraper.url+_path_scraper+_url;
        var _URI = sails.config.scraper.url;

        reqfast(URI, function(err, resp) // Https request
        {
          if(err || !resp.body.previewPath || !(resp.statusCode >= 200 && resp.statusCode <=208))
          {
            sails.log.warn(err || resp );
            return res.serverError();
          }
            return res.redirect(_URI+resp.body.previewPath);
        });



    }
};
