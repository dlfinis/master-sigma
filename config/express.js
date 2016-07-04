var passport = require('passport'),
  // LocalStrategy = require('passport-local').Strategy,
  // TwitterStrategy = require('passport-twitter').Strategy,
  // FacebookStrategy = require('passport-facebook-canvas').Strategy;
  FacebookStrategy = require('passport-facebook').Strategy;

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

    app.use('/website/static', express.static(path.resolve(__dirname, '../web-scraper/public')));

    passport.use(new FacebookStrategy({
      clientID: sails.config.application_auth.facebookClientID,
      clientSecret: sails.config.application_auth.facebookClientSecret,
      callbackURL: sails.config.application_auth.facebookCallbackURL,
      profileFields: [  'id',
                        'displayName',
                        'name',
                        'gender',
                        'emails',
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
    if(!err)
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
    // sails.log.debug("=> verifyHandler with ", token, tokenSecret);

    //Debug of information returned by Facebook
    // sails.log.debug('+ Profile Facebook >');
    // sails.log.debug(JSON.stringify(profile));
    require ('fbgraph').setAccessToken(token);
    User.findOne({ uid: profile.id }, function (err, user) {
      if (user) {
        // sails.log.debug(user);
        return done(null, user);
      } else {
        var data = {
          provider: profile.provider,
          uid: profile.id,
          name: profile.displayName
        };
        if (profile.emails && profile.emails[0] && profile.emails[0].value) {
          data.email = profile.emails[0].value;
        }
        if (profile.name && profile.name.givenName) {
          data.firstname = profile.name.givenName;
        }
        if (profile.name && profile.name.familyName) {
          data.lastname = profile.name.familyName;
        }
        if (profile.gender) {
          data.gender = profile.gender;
        }
        if (profile.profileUrl) {
          data.profileUrl = profile.profileUrl;
        }

        User.create(data, function (err, user) {
          // sails.log(data);
          sails.log.debug('+ User create'+JSON.stringify(user));
          return done(err, user);
        });

      }
    });
  });
};
