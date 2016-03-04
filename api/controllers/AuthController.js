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

        console.log("+ AUTH.FACEBOOK");
        passport.authenticate('facebook-canvas',
        {
            scope: [
            'email',
            'publish_actions'
            ],
            failureRedirect: '/'
        },
        function (err, user)
        {
                console.log("Facebook Auth Response error=", err, "user=", user);

                if (user) {
                    req.logIn(user, function (err) {

                        if (err) {
                            console.log("Auth Error", err);
                            return res.view('500');
                        }

                        return res.redirect('#/canvas');

                    });
                } else {
                    return res.redirect('/');
                }

        }
        )(req, res);
    },
    logout: function(req,res){
      req.logout();
      res.redirect('/');
    }
};
