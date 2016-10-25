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

    if(
     !_.isUndefined(request.session.user)
     && !_.isUndefined(request.session.user.token)
     && !require ('fbgraph').getAccessToken()){
      sails.log.debug('Set token of access');
      require ('fbgraph').setAccessToken(request.session.user.token);
    }

    if(request && origin && user && request.session){
      sails.log.debug('+ Get user',request
      .session.user);
      request.session.authenticated = true;
      request.session.origin = origin;
      request.session.user = user;
    }
  },
  me : function (req) {
    if(!req) return _user;

    sails.log.debug('+ Get user',req.session.user);
    if(
    !_.isUndefined(req.session.user)
    && !_.isUndefined(req.session.user.token)
    && !require ('fbgraph').getAccessToken()){
      sails.log.debug('Set token of access');
      require ('fbgraph').setAccessToken(req.session.user.token);
    }

    return req.session.user || req.user;
  }
};
