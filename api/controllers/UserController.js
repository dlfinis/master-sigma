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
            id:req.user.id,
            uid:req.user.uid,
            name:req.user.name,
            origin:req.session.origin
        }
        });
    }
};
