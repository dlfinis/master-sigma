/**
 * ArticleController
 *
 * @description :: Server-side logic for managing article
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var graph = require('fbgraph');
var Promise = require('bluebird');
var request = require('request');
var cheerio = require('cheerio');

  function isSetLike(uid,graphData) {
      return _.find(graphData, function(resp) {
          return resp.data.uid == uid
      }) ? true : false ;
  }

  function getIDLike(uid,graphData) {
      return _.find(graphData, function(resp) {
          return resp.data.uid == uid
      }).id;
  }

  function getCreator(article){
    var creator = {};

    if(article.creator != 'undefined' || article.creator == [])
    {
        creator = {
          id: article.creator.id,
          uid: article.creator.uid,
          name: article.creator.name
        };
    }

    return creator;
  }

  function getLikes(article){
    var like = {};

    like = {
      count: article.likes.length
    };

    return like;
  }

  function getShares(article){
    var share = {};

    share = {
      count: article.shares.length
    };

    return share;
  }

  function getVisit(article){
    var visit = {};

    visit = {
      count: article.visit.length
    };

    return visit;
  }

  function getCategories(article){
    var categories = [];
    if(article != 'undefined' || article == [])
    {
      article.categories.forEach(function (category){
        var categoryList = {
            id: category.id,
            name: category.name,
        };
        categories.push(categoryList);
      });
    }

    return categories;
  }

  /*
  Like 0.2 Share 0.6 Visit 0.3
  */
  function getRecom(like,share,visit){
    return (like*0.2) +(share*0.6)+(visit*0.3);
  }

  function getTotalSize(){
      return new Promise(function (resolve){
        Article.count().exec(function countCB(err, found){
          if(err) return next(err);
          resolve(found);
      });
    });
  }

  function getReadingTime(url) {
      var readingTime = require('reading-time');
      var URI = encodeURI(url);
      return new Promise(function(resolve,reject){
        request(
        {
          accept:'text/html',
          method: 'GET' ,
          uri: URI,
          gzip: true,
        },
        function (error, response, html) {
        // body is the decompressed response body
        // console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
          if(error){
              reject(error);
          }
          if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var content = '';

            if($('p','body').text().length)
              content = $('p','body').text();
            else
              content = $('[class*=content]','body').text();

            var stats = {};
            if(content.length > 0)
             stats = readingTime(
                content,
                {
                  label:' min de lectura',
                  wpm:300
                }
              );
            else
              stats = {
                      'duration': '5 min de lectura',
                      'minutes': 5,
                      'time': 500000,
                      'words': 100
                    };

            resolve(stats);
          }

      });
    });
  }

  function getArticleStructure(article){
      return {
        id: article.id,
        uid: article.uid,
        title: article.title,
        url: article.url,
        state: article.state,
        date: article.state === "edit" ?
              article.updatedAt : article.createdAt,
        description: article.description,
        image: article.image,
        likes : article.likes.length,
        shares : article.shares.length,
        visits : article.visits.length,
        recommend : getRecom(
                      article.likes.length,
                      article.shares.length,
                      article.visits.length
                    ),
        creator: getCreator(article),
        categories: getCategories(article)
      };
  }

  function getArticleListNormal (articleQuery){
    return new Promise(function(resolve){
      var articlesList = [];
      var totalSize = 0;
      articleQuery.then(function (articles){

                    articles.forEach(function (article){
                            articlesList.push(getArticleStructure(article));
                    });

                      articlesList.sort(function(a, b) {
                          return b.date - a.date;
                      });

                      getTotalSize().then(function (totalSize) {
                        resolve (
                          {
                            size:totalSize,
                            total:articlesList.length,
                            results:articlesList
                          });
                      });
                    });
      });
    }

  function getArticleListRecommend (articleQuery){
    return new Promise(function(resolve){
      getTotalSize().then(function (totalSize) {

          var limit = articleQuery._criteria.limit;
          var articlesList = [];

          articleQuery.limit(totalSize);

          articleQuery.then(function (articles){
            articles.some(function (article,index){
                    articlesList.push(getArticleStructure(article));
                    return index >= (limit - 1);
            });

            articlesList.sort(function(a, b) {
                return b.date - a.date;
            });

            articlesList.sort(function(a, b) {
                return b.recommend - a.recommend;
            });

            resolve({
                size:totalSize,
                total:articlesList.length,
                results:articlesList
              }
            );
          });
      });
    });
  }

module.exports = {

  findAll:function(req,res){
    var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
    var kindList = req.param('kind');

    var articleQuery = Article.find()
                              .limit( actionUtil.parseLimit(req) )
                              .skip( actionUtil.parseSkip(req) )
                              .populate('creator')
                              .populate('categories')
                              .populate('likes')
                              .populate('shares')
                              .populate('visits');

    if( kindList == 'recommend')
      getArticleListRecommend(articleQuery).then(function (response){
        return res.ok(response);
      });

    if( kindList == 'normal')
      getArticleListNormal(articleQuery).then(function (response){
        return res.ok(response);
    });

  },
  getInfo: function(req,res){
      var articleID = req.param('id');
      // console.log(articleID);

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
  htmldata:function(req,res){
    var URI = encodeURI(req.param('uri'));

    request(
    {
      accept:'text/html',
      method: 'GET' ,
      uri: URI,
      gzip: true,
      headers: {
          'Access-Control-Allow-Origin': '*',
          'User-Agent': 'request'
        }
    },
    function (error, response, html) {
      if(error){
          sails.log(error);
          return res.serverError(error);
      }
      return res.ok(html);
    }
    );
  },
  reading: function (req, res) {
      getReadingTime(req.param('uri'))
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
  setLike: function(req,res){

      sails.log("+ Article.SETLIKE");
      var uid = (req.param('uid'));
      var idLike;

      sails.log("+ Article.NOTLIKE.BEFORE");
      var stringGetUID = "me/master-sigma:recomienda?fields=data{uid}";
      var opt = false;
      graph.get(stringGetUID,
                  function(err, response) {
                    if(err)
                      {
                        sails.log(err);
                      }
                        //sails.log(ArticleService.isSetLike(uid));
                        if(!isSetLike(uid, response.data))
                        {

                          Article.findOne({ uid:uid })
                          .exec(function userFounded (err, article){
                              if (err) {
                                sails.log(err);
                                return next(err);
                              }
                              if (!article) {
                                sails.log('Could not find article, sorry.');
                                return res.json("err:notFind");
                              }

                              var articleObj= {
                                      'og:url': article.url,
                                      'og:title': article.title,
                                      'og:type': 'master-sigma:articulo',
                                      'og:image': article.image ,
                                      'og:description': article.description,
                                      'master-sigma:description': article.description,
                                      'og:created_time': article.createdAt,
                                      'og:updated_time': article.updatedAt,
                                      'fb:app_id': sails.config.application_auth.facebookClientID
                                    };
                                      sails.log("+ Article.SETLIKE");
                                      graph.post("me/master-sigma:recomienda",
                                      {
                                          uid:article.uid,
                                          articulo:JSON.stringify(articleObj)
                                      },
                                        function(err, response) {
                                            if(err)
                                              {
                                                sails.log(err);
                                                //next(err);
                                              }
                                              sails.log("Like",response);
                                              return res.json("setLike");
                                        }
                                      );
                          });
                        }
                        else
                        {
                         return res.json("doLike");
                        }
                 }
          );
  },
  delLike: function(req,res){

      sails.log("+ Article.DELLIKE");
      var uid = (req.param('uid'));

      sails.log("+ Article.ISLIKE.BEFORE");
      var stringGetUID = "me/master-sigma:recomienda?fields=data{uid}";

      graph.get(stringGetUID,
                  function(err, response) {
                    if(err)
                      {
                        sails.log(err);
                      }

                      if(isSetLike(uid, response.data))
                      {
                        var idLike = getIDLike(uid, response.data);
                        if(idLike)
                        {
                          graph.del(idLike,
                            function(err, response) {
                                if(err)
                                  {
                                    sails.log(err);
                                  }
                                  sails.log("DisLike",response);
                                  return res.json("delLike");
                            }
                          );
                        }
                      }
                      else
                      {
                       return res.json("notLike");
                      }
                 }
          );
  }
};
