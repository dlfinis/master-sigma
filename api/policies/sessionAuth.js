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
        return next();
    }

    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    var redirect =
    ((req.url.indexOf('canvas') > -1) || (req.url.indexOf('facebook') > -1)) ? '/canvas/login' : '/';

    console.log((req.url.indexOf('canvas') > -1) || (req.url.indexOf('facebook')));
    console.log(req.url);

    sails.log('+ REDIRECT POLICIE',redirect);
    return res.redirect(redirect);
    // return res.forbidden();
    // return res.redirect('/login');
};
