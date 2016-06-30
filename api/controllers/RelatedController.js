/**
 * RelatedController
 *
 * @description :: Server-side logic for managing relateds
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/*global Article Article_Related ArticleService*/
var Promise = require('bluebird');

module.exports = {
  find : function (req,res) {
    var articleID = req.params.all().id || 0 ;
    sails.log.debug('+ Find Exist Articles related with an specif article:',articleID);

    Article_Related.find({main: articleID})
    .then(function (relatedArticles) {
      if(!_.isEmpty(relatedArticles) && _.size(relatedArticles) > 0 )
      {
        // Using Promise.map:
        Promise.map(relatedArticles, function(rElem) {
          // Promise.map awaits for returned promises as well.
          return Article.find()
          .populate('likes')
          .populate('shares')
          .populate('visits')
          .populate('categories')
          .where({id:rElem.related})
          .then(function (response) {
            rElem.related = ArticleService.getArticleStructure(response[0]);
            return rElem;
          });
        }).then(function(resp) {
          _.each(resp,function (rElem,rKey) {
            sails.log('-->Article:',rElem.id);
          });

          return res.json(200,{ total: resp.length, results: resp });
        });
      }
      else
        return res.json(404,{total: 0,results:[]});
    })
    .catch(function (err) {
      sails.log.warn(err);
      return res.json(500,{total: 0,results:[]});
    });
  }
};
