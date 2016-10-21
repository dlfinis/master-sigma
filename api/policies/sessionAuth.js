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

  if (req.isAuthenticated()) {
    if(!_.isUndefined(req.session.user)) 
    {
    	sails.log.debug('+ POLICIE USER LOGIN > ',req.session.user.uid);
    	//req.session._garbage = Date();
    	//req.session.touch();
	}
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  var redirect =
    ((req.url.indexOf('canvas') > -1) || (req.url.indexOf('facebook') > -1)) ? 'canvas/login' : '/';

  sails.log.debug('+ DONT USER LOGIN ' );
  sails.log.debug('+ URL ORIGIN ' ,req.url);
  sails.log.debug('+ REDIRECT POLICIE ',redirect);
  return res.redirect(303,redirect);
  // return res.forbidden();
  // return res.redirect('/login');
};
