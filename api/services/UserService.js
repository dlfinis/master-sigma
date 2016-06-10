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
    if(request && origin && user){
      request.session.authenticated = true;
      request.session.origin = origin;
      request.session.user = user;
    }
  },
  me : function () {
    return _user;
  }
};
