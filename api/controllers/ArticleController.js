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
                              // .where( actionUtil.parseCriteria(req) )
                              .limit( actionUtil.parseLimit(req) )
                              .skip( actionUtil.parseSkip(req) )
                              .sort( actionUtil.parseSort(req) )
                              .populate('creator')
                              .populate('categories');

                              // .populate('likes')
                              // .populate('shares')
                              // .populate('visits');
                            sails.log.debug("Object Keys\n",Object.keys(articleQuery._criteria));

                            delete articleQuery._criteria['limit'];
                            sails.log.debug("Object Keys\n",Object.keys(articleQuery._criteria));
                            // sails.log.debug("Object Keys\n",Object.keys(articleQuery._criteria.limit));
                            sails.log.debug("Limit to:",articleQuery._criteria.limit);
         articleQuery.then(function (response){
                          sails.log.debug("Total Elements:",response.length);
                          return res.ok(response);
                      })
                      .catch(function(err){
                        sails.log.warn(err);
                        return res.serverError(err);
                      });

  },
  findAll:function(req,res){
    var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
    var kindList = req.param('kind') || 'normal';
    var creator = req.param('creator');
    var category = req.param('category');

    ArticleService.setTotalSize();
    ArticleService.setUser(req.user);

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
      default:
            ArticleService.getArticleListNormal(articleQuery).then(function (response){
              return res.ok(response);
            });

    }

    // if(category)
    //   ArticleService.getArticleListByCategory(articleQuery,category).then(function (response){
    //     return res.ok(response);
    //   });
    //
    // if( kindList == 'recommend')
    //   ArticleService.getArticleListRecommend(articleQuery).then(function (response){
    //     return res.ok(response);
    //   });
    //
    // if( kindList == 'normal')
    //   ArticleService.getArticleListNormal(articleQuery).then(function (response){
    //     return res.ok(response);
    // });

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
  setlike : function(req,res){
    var uuid = require('node-uuid');
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
    sails.log(sid);
    // Like.destroy({
    //   sid : sid
    // }).exec(function deleteRecord(err,deleted){
    //   if (err) {
    //     sails.log(err);
    //     return res.serverError(err);
    //   }
    //   sails.log('Deleted like :'+JSON.stringify(deleted));
    //   return res.ok(true);
    // });
    ArticleService.deleteArticleLike(sid)
                  .then(function(response){
                        Like.destroy({
                          sid : sid
                        }).exec(function deleteRecord(err,deleted){
                            sails.log.debug('Deleted like :'+deleted);
                            return res.ok(true);
                        });
                  })
                  .catch(function(err){
                    sails.log.warn(err);
                    return res.ok(false);
                  });
  },
  getInfo : function(req,res){
      var articleID = req.param('id');
      var articleQuery = Article.findOne({id:articleID})
                                 .populate('categories')
                                 .populate('creator');
          articleQuery.then(function(response){
                        // console.log(response);
                        if(response != 'undefined' )
                        {
                          var article = {
                            results:[{
                                    id: response.id,
                                    uid: response.uid,
                                    createdAt: response.createdAt,
                                    updatedAt: response.updatedAt,
                                    categories: getCategories(response),
                                    creator: [{
                                      id:response.creator.id,
                                      name:response.creator.name,
                                    }]
                                }]
                          };
                          // console.log(response);
                          return res.ok(article);
                        }else{
                          return res.send(404,{results:'Not found'});
                        }
                        })
                       .catch(function(err){
                                  sails.log(err);
                                  return res.serverError(err);
                        });
  },
  wce : function (req,res) {
    var URI = encodeURI(req.param('uri'));
    var wce = require('wce');
    var extractors =['read-art','node-readability'];

    var options = {};
    var WCE = new wce(extractors, options);

    try {
      WCE.extract(URI)
        .on('success', function (result, errors) {
          if (errors && errors.length !== 0) {
            return res.badRequest('Extraction was successful, but there were some errors: '+error);
          }
            return res.ok(result.content);
        })
        .on('error', function (errors) {
          return res.serverError('Extraction failed with the following error(s): '+error);
        });
    } catch (error) {
        return res.serverError(error);
    }
  },
  readart: function (req,res) {
    var read = require('read-art');
    var URI = encodeURI(req.param('uri'));
    ArticleService.getReadArt(URI)
        .then(function (response){
            return res.ok(response);
        })
        .catch(function(err){
                       sails.log(err);
                       return res.serverError(err);
             });
  },
  extract : function(req,res){
    var time = new Date().getTime();
    var URI = encodeURI(req.param('uri'));
    var CONTENT = encodeURI(req.param('content'));

    ArticleService.unfluff(URI,CONTENT)
    .then(function(response){
        return res.ok(response);
    })
    .catch(function(err){
               sails.log(err);
               return res.serverError(err);
     });
     console.log(time+' = '+new Date().getTime());
     console.log((time - (new Date().getTime()))/1000);
  },
  summarize : function (req,res){
    var summarize = require('summarize');
    var superagent = require('superagent');
    var request = require('req-fast');
    var URI = encodeURI(req.param('uri'));

    superagent.get(URI, function(err, response){
      if (err) throw err;
      return res.ok(summarize(response.text));
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
  htmldata:function(req,res){
    var URI = encodeURI(req.param('uri'));
    var request = require('request');

    request(
    {
      accept:'text/html',
      // method: 'GET' ,
      uri: URI,
      // gzip: true,
      // headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'User-Agent': 'request',
      //     'Access-Control-Allow-Headers': 'X-Requested-With'
      //   }
      headers: {
      'accept':'*/*'
    }
    },
    function (error, response, html) {
      if(error){
          sails.log(error);
          return res.serverError(error);
      }
      // console.log(html);
      return res.ok(html);
    }
    );
  },
  reading: function (req, res) {
    var URI = encodeURI(req.param('uri'));
      ArticleService.getReadingTime(URI)
        .then(function(response){
          return res.json({reading:response});
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
