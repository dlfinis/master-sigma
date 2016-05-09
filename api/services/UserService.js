/**
 * UserService
 *
 * @description :: Server-side logic for managing your account
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _origin = 'web';
var _user = {};
var _req = null;
module.exports = {
  current: function(user,origin,request) {
    _user = user;
    if(origin) _origin = origin;
    if(request) _req = request;
  },
  origin: function(origin) {
     _origin = origin;
  },
  clean: function() {
     _origin = '';
     _user = {};
  },
  me : function () {
    return _user ? _user :_req.user;
  }
};
