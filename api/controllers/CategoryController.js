/**
 * CategoryController
 *
 * @description :: Server-side logic for managing your account
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function(req, res)
    {
      Category.find(function(err, categories)
      {
        res.send(categories);
      })
    }
}
