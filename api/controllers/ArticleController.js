/**
 * ArticleController
 *
 * @description :: Server-side logic for managing article
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var graph = require('fbgraph');
var Promise = require('bluebird');

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

  function getDateDiff(){
    return {
        inDays: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2-t1)/(24*3600*1000));
        },
        inWeeks: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2-t1)/(24*3600*1000*7));
        },
        inMonths: function(d1, d2) {
            var d1Y = d1.getFullYear();
            var d2Y = d2.getFullYear();
            var d1M = d1.getMonth();
            var d2M = d2.getMonth();

            return (d2M+12*d2Y)-(d1M+12*d1Y);
        },
        inYears: function(d1, d2) {
            return d2.getFullYear()-d1.getFullYear();
        }
    };
  }

  function getReadingTime(url) {
        return new Promise(function(resolve,reject){
          var request = require('request');
          var cheerio = require('cheerio');
          var readingTime = require('reading-time');

          var URI = url;
          var info = {};

          request(
          {
            method: 'GET' ,
            uri: URI,
            gzip: true
          },
          function (error, response, html) {
            // body is the decompressed response body
            // console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
            var $ = cheerio.load(html);
            var content = $('p','body').text();

            if(error) reject(error);

            var stats =
            readingTime(
                content,
                {
                  label:'min de lectura',
                  wpm:300
                }
            );
              resolve({
                stats : stats
              });
          });

        });

  }

  function getArticleStructure(article){
    return getReadingTime(article.url).then(function (response){
      return {
        id: article.id,
        uid: article.uid,
        title: article.title,
        url: article.url,
        state: article.state,
        date: article.state === "edit" ?
              article.updatedAt : article.createdAt,
        time  : getDateDiff().inDays(new Date(article.createdAt),new Date()),
        reading : response.stats,
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
    });

  }

module.exports = {

  findAll:function(req,res){
    var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
    var isRecommendList = req.param('recommendList') || false;
    var articleQuery = Article.find()
                              // .where( actionUtil.parseCriteria(req) )
                              .limit( actionUtil.parseLimit(req) )
                              .skip( actionUtil.parseSkip(req) )
                              .sort( actionUtil.parseSort(req) )
                              .populate('creator')
                              .populate('categories')
                              .populate('likes')
                              .populate('shares')
                              .populate('visits');


      articleQuery.exec(function found(err,articles){
                  if (err) return res.serverError(err);
                  if(articles != 'undefined' )
                  {

                    var articlesList = [];

                    Promise.each(articles, function(article) {
                        // Promise.map awaits for returned promises as well.
                            return getArticleStructure(article).then(function(articleFormat){
                              articlesList.push(articleFormat);
                            });
                    }).then(function() {
                        sails.log("Done load of articles");
                        if(isRecommendList)
                        {
                          articlesList.sort(function(a, b) {
                              return b.recommend - a.recommend;
                          });
                        }

                        return res.ok({total:articlesList.length,results:articlesList});
                  });
                  }else{
                    res.serverError('Not rows');
                  }
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
  getSite: function (req, res) {
        var request = require('request');
        var cheerio = require('cheerio');
        var readingTime = require('reading-time');
        var URI = req.param('uri');
        console.log(URI);
        request(
        {
          method: 'GET' ,
          uri: URI,
          gzip: true
        },
        function (error, response, html) {
        // body is the decompressed response body
        console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
        var $ = cheerio.load(html);
        var body = $('p','body').text();
        var stats = readingTime(
            body,
            {
            label:'min de lectura',
            wpm:300
            }
          );
        console.log(stats);
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
