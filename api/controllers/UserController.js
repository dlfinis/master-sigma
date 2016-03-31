/**
 * UserController
 *
 * @description :: Server-side logic for managing Shares
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	 getUser:function(req,res){
		 sails.log(req.user);
      var user = {
                  user : req.user ,
                  auth : req.isAuthenticated()
                 };
      return res.send(user);
   },
   isAuthenticated: function(req,res){
     return res.send(req.isAuthenticated());
   },

};
