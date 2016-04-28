/**
 * CanvasController
 *
 * @description :: Server-side logic for managing canvas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var graph = require('fbgraph');
var passport = require('passport');
var FB = require('fb');
module.exports = {
    // Facebook login screen
    login: function (req, res) {
        sails.log("+ .CANVAS");
        if(req.user)
        {
          sails.log('+ REDIRECT ','/#/wall');
          return res.redirect('/#/wall');
        }
        passport.authenticate('facebook-canvas',
        {
            scope: [
            'publish_actions'
            ]
        },
        function (err, user)
        {
                if(err)
                  return next(err);

                sails.log("Facebook Auth Response error=", err, "user=", user);
                sails.log('+ CANVAS LOGIN ');
                if (user) {
                    req.logIn(user, function (err) {

                        if (err) {
                            sails.log("Auth Error", err);
                            return res.view('500');
                        }
                        sails.log('+ REDIRECT ','/#/wall');
                        return res.redirect('/#/wall');

                    });
                } else {
                        return res.redirect('/canvas/autologin');
                }

        }
        )(req, res);
    },
    autologin: function(req,res){
      sails.log('+ POPUP ','/auth/facebook/canvas');

      stringURL = FB.getLoginUrl({
        display: 'popup',
          scope: 'publish_actions',
          client_id: sails.config.application_auth.facebookClientID,
          redirect_uri: sails.config.application_auth.facebookAppURL
      });
      sails.log("+URL DIALOG FB ",stringURL);

      var redirect_popup = ('<!DOCTYPE html>' +
                            '<body>'+
                            '<script type="text/javascript">'+
                            'top.location.href = "$stringURL";'+
                            '</script>' +
                            '</body>' +
                            '</html>').replace('$stringURL',stringURL);
       return res.send(redirect_popup);
    },
    // Index page
    index: function (req, res) {
      sails.log("+ CANVAS.INDEX");
    },
    test:function(req,res){
      return res.json("OK!");
    },
    testpage:function(req,res){
      return res.redirect('/#/delta');
    },
    wall:function(req,res){
      return res.redirect('/#/wall');
    }


};
