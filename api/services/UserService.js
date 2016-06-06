/**
 * UserService
 *
 * @description :: Server-side logic for managing your account
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  current: function(user,origin,request) {
    if(request){
      request.session.authenticated = true;
      request.session.origin = origin;
      request.session.user = user;
    }
  },
  clean: function(req) {
    req.session = {};
  },
  me : function (req) {
    return req.session.user;
  }
};
