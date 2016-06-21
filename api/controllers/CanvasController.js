/**
 * CanvasController
 *
 * @description :: Server-side logic for managing canvas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
/*global UserService */

var passport = require('passport');
var FB = require('fb');

module.exports = {
  // Facebook login screen
  login: function (req, res, next) {
    sails.log('+ .CANVAS');

    passport.authenticate('facebook-canvas',{
      scope: [
        'publish_actions',
        'user_about_me',
        'user_friends'
      ]
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
            sails.log('Auth Error', err);
            return res.view('500');
          }
          sails.log.debug('+ User Auth >',JSON.stringify(user));
          sails.log.debug('+ REDIRECT TO ','/#/wall');
          sails.log.debug('+ ORIGIN FB');
          UserService.current(user,'fb',req);
          return res.redirect('/#/wall');

        });
      } else {
        return res.redirect('/auth/canvas/autologin');
        // this.autologin(req,res);
      }
    }
  )(req, res, next);
  },
  autologin: function(req,res){
    sails.log.debug('+ POPUP ','/auth/facebook/canvas');

    var stringURL = FB.getLoginUrl({
      display: 'popup',
      scope: 'publish_actions,user_about_me,user_friends',
      client_id: sails.config.application_auth.facebookClientID,
      redirect_uri: sails.config.application_auth.facebookAppURL
    });
    sails.log.debug('+URL DIALOG FB ',stringURL);

    var redirect_popup = ('<!DOCTYPE html>' +
                          '<body>'+
                          '<script type="text/javascript">'+
                          'top.location.href = "$stringURL";'+
                          '</script>' +
                          '</body>' +
                          '</html>').replace('$stringURL',stringURL);
    return res.send(redirect_popup);
  },
  test:function(req,res){
    return res.json('OK!');
  }
};
