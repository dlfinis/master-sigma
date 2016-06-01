/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var connect = require('connect-ensure-login');
var graph = require('fbgraph');

module.exports = {
    index: function (req, res) {

        sails.log('+ PROFILE.INDEX');
      // sails.log('+ PROFILE.INDEX token '+graph.getAccessToken());
      // sails.log(graph.getAccessToken());
      // sails.log('+ PROFILE.INDEX token ',JSON.stringify(req.token));
        var options = {
            timeout:  3000
        , pool:     { maxSockets:  Infinity }
        , headers:  { connection:  'keep-alive' }
        };

        graph
        .setOptions(options)
        .get('me?fields=likes,posts', function(err, res) {
            sails.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
        });


        return res.view({'user' : req.user });
            // function(req, res){
            //   res.render('profile', { user: req.user });
            // };
    }
};
