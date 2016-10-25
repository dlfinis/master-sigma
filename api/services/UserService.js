/**
 * UserService
 *
 * @description :: Server-side logic for managing your account
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _user;
module.exports = {
  current: function(user,origin,request) {
    if(user) _user = user;

    if(request && origin && user ){
      sails.log.debug('+ Get user /current',request.session.user);
      sails.log.debug('+ Set token');
      require ('fbgraph').setAccessToken(user.token);
      request.session.authenticated = true;
      request.session.origin = origin;
      request.session.user = user;
    }
  },
  me : function (req) {
    if(!req) return _user;

    if(req.session && req.session.user && req.session.user.token){
      sails.log.debug('+ Get user /me',req.session.user);
      sails.log.debug('+ Set token');
      require ('fbgraph').setAccessToken(req.session.user.token || req.user.token);
    }

    return req.session.user || req.user;
  }
};
