/**
 * UserController
 *
 * @description :: Server-side logic for managing Shares
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  me: function(req, res) {
    if ( !req.isAuthenticated() ) return res.json(403,{});
    else{

      if(!require ('fbgraph').getAccessToken() && !_.isUndefined(req.session.user.token)){
        sails.log.debug(' + Set token of access');
        require ('fbgraph').setAccessToken(req.session.user.token);
      }

      return res.json(200,{ user: {
        id: req.session.user.id,
        uid: req.session.user.uid,
        name: req.session.user.name,
        status: req.session.user.status,
        origin: req.session.origin
      }
      });
    }
  }
};
