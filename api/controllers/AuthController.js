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
      scope: sails.config.application_auth.facebookAppScope
    })(req, res, req.next);
  },
  'facebook/callback' : function (req,res,next) {
    //Review process . JWT
    sails.log.debug('+ AUTH.FACEBOOK CALLBACK');
    console.log(require('url').parse(req.url).pathname);
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
            sails.log.debug('+ REDIRECT TO ',process.env.SUB_HOSTNAME+'/#/wall');
            sails.log.debug('+ ORIGIN WEB');

            UserService.current(user,'web',req);
            return res.redirect(process.env.SUB_HOSTNAME+'/#/wall');
          });
        }
      }
    )(req, res, next);
  },
  logout: function(req,res){
    sails.log.debug('+ AUTH.LOGOUT');
    if(!_.isUndefined(req.session))
    req.session.destroy(function(err) {
      sails.log.debug('+ AUTH.SESSION.DESTROY');
      req.logOut();
      return res.redirect(process.env.SUB_HOSTNAME+'/');
    });
  }
};
