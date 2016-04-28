/**
 * AuthController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');
var fbgraph = require ('fbgraph');
module.exports = {

    // Index page
    index: function (req, res) {
        return res.redirect("/auth/facebook");
    },

    // Facebook login screen
    facebook: function (req, res) {
        sails.log.debug("+ AUTH.FACEBOOK");
        passport.authenticate('facebook-canvas',
        {
            scope: [
            'publish_actions'
            ],
            failureRedirect: '/#/'
        },
        function (err, user)
        {
                // sails.log.debug("Facebook Auth Response error=", err, "user=", user);
                if(err) {
                  sails.log.error(err);
                  return next(err);
                }
                if(!user){
                  return res.redirect('/');
                }
                if (user) {
                    sails.log.debug("+ Auth User :"+req.user);
                    req.logIn(user, function (err) {
                        if (err) {
                          //  return next(err);
                            sails.log.debug("Auth Error", err);
                            return res.view('500');
                        }
                        sails.log.debug(user);
                        return res.redirect('#/wall');
                    });
                }
        }
        )(req, res);
    },
    logout: function(req,res){
      req.logout();
      res.redirect('/');
    }
};
