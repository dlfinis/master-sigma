/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function (req, res, next) {

    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller
  if (req.isAuthenticated() || req.session.user) {
    sails.log.debug('+ LOGIN USER >',req.session.user);
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  var redirect =
    ((req.url.indexOf('canvas') > -1) || (req.url.indexOf('facebook') > -1)) ? '/canvas/login' : '/';

  sails.log.debug('+ DONT LOGIN ');
  sails.log.debug('+ REDIRECT POLICIE ',redirect);
  return res.redirect(redirect);
  // return res.forbidden();
  // return res.redirect('/login');
};
