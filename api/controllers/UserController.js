/**
 * UserController
 *
 * @description :: Server-side logic for managing Shares
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  me: function(req, res) {
    if ( !req.isAuthenticated() ) return res.forbidden();
    return res.json({ user: {
      id: req.session.user.id,
      uid: req.session.user.uid,
      name: req.session.user.name,
      origin: req.session.origin
    }
    });
  }
};
