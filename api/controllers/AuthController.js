/**
 * AuthController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
/*global UserService*/
var passport = require('passport');
module.exports = {

    // Index page
  index: function (req, res) {
    return res.redirect('/auth/facebook');
  },
  // Facebook login screen
  facebook: function (req, res) {
    sails.log.debug('+ AUTH.FACEBOOK PROVIDER');
    passport.authenticate('facebook-canvas', {
      scope: sails.config.application_auth.facebookAppScope,
      failureRedirect: '/'
    })(req, res, req.next);
  },
  'facebook/callback' : function (req,res,next) {
    sails.log.debug('+ AUTH.FACEBOOK CALLBACK');
    passport.authenticate('facebook-canvas',{},
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
          req.logIn(user, function (err) {
            if (err) {
              //  return next(err);
              sails.log.error('Auth Error', err);
              return res.view('500');
            }

            sails.log.debug('+ User Login >',JSON.stringify(user));
            sails.log.debug('+ REDIRECT TO ','/#/wall');
            sails.log.debug('+ ORIGIN WEB');

            UserService.current(user,'web',req);

            return res.redirect('/#/wall');
          });
        }
      }
    )(req, res, next);
  },
  logout: function(req,res){
    sails.log.debug('+ AUTH.LOGOUT');
    req.session.destroy(function(err) {
      sails.log.debug('+ AUTH.SESSION.DESTROY');
      req.logOut();
      return res.redirect('/');
    });
  }
};
