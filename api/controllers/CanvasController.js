/**
 * CanvasController
 *
 * @description :: Server-side logic for managing canvas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
/*global UserService */

var passport = require('passport');
var graph = require('fbgraph');

module.exports = {
  // Facebook login screen
  login: function (req, res, next) {
    sails.log('+ .CANVAS');

    if(req.session && req.session.user && req.session.user.token){
      sails.log('+ .CANVAS TOKEN PRESENT');
      UserService.current(req.session.user,'fb',req);
      return res.redirect(process.env.SUB_HOSTNAME+'/#/wall');
    }

    if(req.query && req.query.code){
      sails.log('+ Exist FB Code');
      passport.authenticate('facebook-canvas',{ failureRedirect:'/',sucessRedirect:process.env.SUB_HOSTNAME+'/#/wall'});
    }

    passport.authenticate('facebook-canvas',{
      scope: sails.config.application_auth.facebookAppScope
    },
    function (err, user)
    {
      if(err)
      {
        sails.log.error('- Facebook Auth Response error=', err, 'user=', user);
        return next(err);
      }

      sails.log('+ CANVAS LOGIN ');
      if (user) {
        req.logIn(user, function (err) {
          if (err)
          {
            sails.log('- Auth Error', err);
            return res.serverError();
          }

          sails.log.debug('+ User Login >',user);
          sails.log.debug('+ REDIRECT TO ','/#/wall');
          sails.log.debug('+ ORIGIN FB');

          UserService.current(user,'fb',req);
          return res.redirect(process.env.SUB_HOSTNAME+'/#/wall');

        });
      } else {
        //return res.redirect('/auth/canvas/autologin');
        return res.redirect(process.env.SUB_HOSTNAME+'/auth/canvas/autologin');
      }
    }
    )(req, res, next);

  },
  autologin: function(req,res){
    sails.log.debug('+ POPUP ','/auth/facebook/canvas');

    var authUrl = graph.getOauthUrl({
      'client_id':      sails.config.application_auth.facebookClientID
    , 'redirect_uri':   sails.config.application_auth.facebookAppURL
    , 'client_secret':  sails.config.application_auth.facebookClientSecret
    , 'scope':         sails.config.application_auth.facebookAppScopeString
    });

    sails.log('- URL Dialog',authUrl,req.protocol);

    var redirect_popup = ('<!DOCTYPE html>' +
                          '<body>'+
                          '<script type="text/javascript">'+
                          'top.location.href = "$authUrl";'+
                          // 'top.location.replace("$authUrl");'+
                          //  'top.location.replace("/auth/facebook");' +
                          '</script>' +
                          '</body>' +
                          '</html>').replace('$authUrl',authUrl);

    return res.send(redirect_popup);

  },
  test:function(req,res){
    return res.json('OK!');
  }
};
