/**
 * CategoryController
 *
 * @description :: Server-side logic for managing your account
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

/*global Article Category*/

var Promise = require('bluebird');

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
    },
    getList: function (req,res) {

      sails.log.debug('+ Get a list of all categories');
      Category.find().then(function (categories) {
        categories = _.map(categories,function getName(cElem) {
            return cElem.name;
        });
        return res.json(200,{total: categories.length,results:categories});
      })
      .catch(function(err){
        sails.log.warn(err);
        return res.json(500,{total: 0,results:[]});
      });

    },
    setList: function (req,res) {
      sails.log.debug('+ Set categories listed ');
      var catList = req.param('list');
      var catIndexList = [];

      if(!_.isArray(catList))
        catList = [ catList ];

      Promise.each(catList, function(cElem) {
        cElem = String(cElem).replace(/[^\A-zÀ-ú\s]/gmi, '');
        return Category.findByName({'contains': cElem })
              .then(function (category) {
                if(_.isEmpty(category) | _.isUndefined(category))
                {
                  sails.log.debug('+ Create new category');
                  return Category.create({ name: cElem}).then(function (record) {
                    sails.log.debug(record);
                    catIndexList.push(record.id);
                  });
                }else {
                  catIndexList.push(category[0].id);
                }
              });
      }).then(function() {
        return res.json(200,{total: catIndexList.length, results: catIndexList});
      })
      .catch(function (err) {
        sails.log.warn(err);
        return res.json(400,{categories:[]});
      });

    }
};
