/**
 * RelatedController
 *
 * @description :: Server-side logic for managing relateds
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/*global Article */

module.exports = {
	find : function (req,res){
  var articleID = req.params.all().id || 0 ;
  sails.log.debug('+ Find Exist Articles related with an specif article ');
  Article.find({ state: { '!': 'disable' },id: articleID})
     .populate('relateTo')
     .then(function (articles) {
      return res.json(200,{total: articles.relatedTo.length,results:articles.relatedTo});
     })
   .catch(function (err) {
     sails.log.warn(err);
     return res.json(500,{total: 0,results:[]});
   });
   }
};
