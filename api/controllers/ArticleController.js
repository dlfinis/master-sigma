/**
 * ArticleController
 *
 * @description :: Server-side logic for managing article
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Promise = require('bluebird');

module.exports = {

  findRawAll: function(req,res){
    var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
    var articleQuery = Article.find()
                              .where( actionUtil.parseCriteria(req) )
                              .limit( actionUtil.parseLimit(req) )
                              .skip( actionUtil.parseSkip(req) )
                              .sort( actionUtil.parseSort(req) )
                              .populate('creator')
                              .populate('categories');

                              // .populate('likes')
                              // .populate('shares')
                              // .populate('visits');

                        var articleList = [];

                        articleQuery.then(function (response){
                            Promise.map(response, function(article) {
                                return article;
                            })
                            .then(function(allItems) {
                                sails.log.debug("Total Elements:",allItems.length);
                                return res.ok(allItems);
                            });

                          })
                          .catch(function(err){
                            sails.log.warn(err);
                            return res.serverError(err);
                        });
  },
  findAll:function(req,res){
    var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
    var kindList = req.param('kind');
    var creator = req.param('creator');
    var category = req.param('category');

    ArticleService.setUser(req.user);
    ArticleService.setLimit(req.param('limit'));
    ArticleService.setTotalSize();

    var articleQuery = Article.find()
                              .limit( actionUtil.parseLimit(req) )
                              .skip( actionUtil.parseSkip(req) )
                              .populate('creator')
                              .populate('categories')
                              .populate('likes')
                              .populate('shares')
                              .populate('visits');

    if(creator)
      kindList = 'creator';

    if(category)
      kindList = 'category';

    switch (kindList) {
      case 'normal': {
            ArticleService.getArticleListNormal(articleQuery).then(function (response){
            return res.ok(response);
            });
          break;
      }

      case 'recommend': {
            ArticleService.getArticleListRecommend(articleQuery).then(function (response){
              return res.ok(response);
            });
        break;
      }

      case 'creator': {
            ArticleService.getArticleListByCreator(articleQuery,creator).then(function (response){
              return res.ok(response);
            });
        break;
      }

      case 'category': {
            ArticleService.getArticleListByCategory(articleQuery,category).then(function (response){
              return res.ok(response);
            });
            break;
      }
      default:{
            ArticleService.getArticleListNormal(articleQuery).then(function (response){
              return res.ok(response);
            });
        }
    }

  },
  stats: function (req,res) {
    var URI = req.param('uri');
    ArticleService.getStats(URI).then(function (response) {
      return res.ok(response);
    })
    .catch(function (err) {
        sails.log.error(err);
        return res.negotiate(err);
    });
  },
  isAlive : function (req,res) {
    var articleID = req.param('articleID');
    Article.findOne({id:articleID}).then(function foundRecord(article){
        if(!article)
          return res.notFound();

        article.isAlive()
                .then(function(alive){
                  return res.ok(alive);
                });

    })
    .catch(function(err){
      return res.serverError(err);
    });

  },
  isSecure : function (req,res) {
    var articleID = req.param('articleID');
    Article.findOne({id:articleID}).then(function foundRecord(article){
        if(!article)
          return res.notFound();

        article.isSecure()
                .then(function(secure){
                  return res.ok(secure);
                });

    })
    .catch(function(err){
      return res.serverError(err);
    });

  },
  havelike : function(req,res){
    var articleID = req.param('articleID');
    var userID = req.user.id;

    Like.findOne({article:articleID,user:userID}).exec(function foundRecord(err, record) {
      if(err)
      {
        sails.log(error);
        return res.ok(false);
      }

      return res.ok(record);

    });
  },
  setshare : function(req,res){
    var shareSID = req.param('shareSID');
    var articleID = req.param('articleID');
    var messageShare = req.param('messageShare');
    var userID = ArticleService._user.id || req.user.id ;

    if(shareSID && articleID)
              Share.create({
                            sid : shareSID,
                            article : articleID,
                            user : userID,
                            message : messageShare
                          }).exec(function createRecord(err, created){
                              if(err)
                              {
                                sails.log.warn(err);
                                return res.ok(false);
                              }
                              sails.log.debug('Set share :'+JSON.stringify(created));
                              return res.ok(true);
                          });

  },
  setlike : function(req,res){
    var articleID = req.param('articleID');
    var articleURL = req.param('articleURL');
    var userID = req.user.id;

        ArticleService.setArticleLike(articleURL)
                      .then(function(response){
                          Like.create({
                            sid : response.id,
                            article : articleID,
                            user : userID
                          }).exec(function createRecord(err, created){
                              sails.log.debug('Set like :'+created.sid);
                              return res.ok(created.sid);
                          });
                      })
                      .catch(function(err){
                        if(err)
                        {
                          sails.log.warn(err);
                          return res.ok(false);
                        }
                      });
  },
  deleteLike : function(req,res){
    var sid = req.param('articleSid');
    ArticleService.deleteArticleLike(sid)
                  .then(function(response){
                        Like.destroy({
                          sid : sid
                        }).exec(function deleteRecord(err,deleted){
                            sails.log.debug('+Deleted like :'+deleted);
                            return res.ok(true);
                        });
                  })
                  .catch(function(err){
                    sails.log.warn(err);
                    return res.ok(false);
                  });
  },
  filetype : function (req,res) {
    var mime = require('mime-types');
    var reqfast = require('req-fast');
    var URI = encodeURI(req.param('uri'));

    var mimetype = mime.lookup(URI);
    if(mimetype == "application/x-msdownload" && URI.indexOf(".com") )
      mimetype = false;

    if(!mimetype)
    {
      reqfast(URI, function(err, resp){
        if(err){
          return res.serverError(err);
        }
        if(resp && resp.statusCode == 200)
          {
            return res.json({
                type:'text/html'
            });
          }
      });
    }
      else {
        return res.json({
            type:mimetype
        });
      }
  },
  reading: function (req, res) {
    var URI = encodeURI(req.param('uri'));
      ArticleService.getReadingTime(URI)
        .then(function(response){
          if(response)
          return res.json({reading:response});
          else
          return res.notFound();
        })
        .catch(function(err){
           if(err.errno !== 'ENOTFOUND') sails.log(err);
           return res.serverError('URL broke:'+req.param('uri'));
        });
  },
  test: function (req, res) {
    return res.json({ status: 'OK' });
  },
  testID: function (req, res) {
    var nameID = req.param('name');
    sails.log(req.param(nameID));
    return res.json({ status: 'OKID' });
  },
};
