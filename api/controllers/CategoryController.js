/**
 * CategoryController
 *
 * @description :: Server-side logic for managing your account
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

/*global Article*/
module.exports = {
    findExist: function(req, res)
    {
      sails.log.debug('+ Find Exist Categories present in All Articles');
      Article.find({ state: { '!': 'disable' }})
      .limit(999)
      .populate('categories')
      .then(function (articles) {
        var categories = [];

        _.each(_.pluck(articles,'categories'),function (cElem) {
          _.each(_.omit(cElem,['add', 'remove']),function (cnElem) {
            var dupCat = _.some(categories,function (ctElem) {
              return ctElem.name === cnElem.name;
            });
            if(!dupCat) categories.push(cnElem);
          });

        });
        return res.json(200,{total: categories.length,results:categories});
      })
      .catch(function (err) {
        sails.log.warn(err);
        return res.json(500,{total: 0,results:[]});
      });
    }
};
