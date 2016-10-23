
var passport = require('passport'),
  // LocalStrategy = require('passport-local').Strategy,
  // TwitterStrategy = require('passport-twitter').Strategy,
  FacebookStrategy = require('passport-facebook-canvas').Strategy;
  // FacebookStrategy = require('passport-facebook').Strategy;

/**
 * Configure advanced options for the Express server inside of Sails.
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#documentation
 */
/*global User*/

module.exports.http = {

  customMiddleware: function (app) {
    sails.log.debug('+ Init Express Midleware');

    var express = require('../node_modules/sails/node_modules/express');
    var path = require('path');


    app.set('tz', 'UTC-5');
    app.use('/website/static', express.static(path.resolve(__dirname, '../web-scraper/public')));
    app.use('/content/image', express.static(path.resolve(__dirname, '../content/image')));

    passport.use(new FacebookStrategy({
      clientID: sails.config.application_auth.facebookClientID,
      clientSecret: sails.config.application_auth.facebookClientSecret,
      callbackURL: sails.config.application_auth.facebookCallbackURL,
      profileFields: [  'id',
                        'displayName',
                        'name',
                        'gender',
                        'emails',
                        'birthday',
                        'about',
                        'profileUrl'],
      enableProof: true
    }, verifyHandler));

    app.use(passport.initialize());
    app.use(passport.session());
  }
};

passport.serializeUser(function (user, done) {
  // sails.log.debug("serializeUser:", user);
  done(null, user.uid);
});

passport.deserializeUser(function (uid, done) {
  // sails.log.debug("deserializeUser:", uid);
  User.findOne({uid: uid}, function (err, user) {
    if(!err && user)
      done(err, user);
    else {
      sails.log.warn('Invalid deserializeUser');
      done(err,null);
    }
  });
});

var verifyHandler = function (token, tokenSecret, profile, done) {
  process.nextTick(function () {
    // Check handler
    // sails.log.debug('=> verifyHandler with ', token, tokenSecret);

    // Debug of information returned by Facebook
    sails.log.debug('+ Profile Facebook >',profile);

    User.findOne({ uid: profile.id }, function (err, user) {

      try{
      if (user) {
        // sails.log.debug(user);
        user.token = token;
        return done(null, user);
      } else {
        var data = {
          provider: profile.provider || 'facebook',
          uid: profile.id,
          name: profile.displayName || profile.name
        };

        if ( profile._json || profile.email || profile.emails[0]) {
          data.email =  profile.email || profile.emails[0].value || profile._json.email;
        }

        if (profile.name && (profile.name.givenName || profile.first_name)) {
          data.firstname = (profile.name.givenName || profile.first_name);
        }
        if (profile.name && (profile.name.familyName || profile.last_name)) {
          data.lastname = profile.name.familyName || profile.last_name;
        }

        if(_.isUndefined(data.name) || _.isEmpty(data.name)){
          data.name = data.firstname+' '+ (profile.middle_name || '')+ data.lastname;
        }

        if (profile.gender) {
          data.gender = profile.gender;
        }
        if (profile.birthday || profile._json) {
          data.birthday = profile.birthday || profile._json.birthday;
        }
        if (profile.profileUrl || profile.link  ) {
          data.profileUrl = profile.profileUrl || profile.link;
        }

        User.create(data, function (err, user) {
          sails.log.debug('+ User create',JSON.stringify(user));
          return done(err, user);
        });

      }
    }
      catch(e){
        sails.log.warn('Passport Facebook',e);
      }
    });
  });
};
