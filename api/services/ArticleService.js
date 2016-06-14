/**
 * ArticleService
 *
 * @description :: Server-side logic for managing your account
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 /*global Article User Like Share ArticleService UserService*/
 /*eslint no-unused-vars: 0*/
var Promise = require('bluebird');
var moment = require('moment');
var _wpm = 250;

module.exports = {
  getDate:function(date,format){
    sails.log('+ ARTICLE.GETDATE');
    var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    if(!format)
    {
      moment.locale('es');
      return moment(date).format('MMMM DD,YYYY');
    }else{
      return moment(date).format(format);
    }
  },
  getArticleMeta : function(article){
    var objMeta = {
      'og:url' : article.url,
      'og:title' : article.title,
      'og:type' : 'article',
      'og:image' : article.image || '/images/submarine.png',
      'og:description' : article.description,
      'fb:app_id' : sails.config.application_auth.facebookClientID
    };
    return objMeta;
  },
  getCreator : function(article){
    var creator = {};
    if(article.creator && article.creator !== 'undefined')
    {
      creator = {
        id: article.creator.id,
        uid: article.creator.uid,
        name: article.creator.name
      };
    }
    return creator;
  },
  getOwnLike : function(likes){
    var like = _.find(
                      likes,function(element)
                              {
                        return element.user === UserService.me().id;
                      }
                  );

    return like;
  },
  getLikes : function(article){
    var like = {};
    like = {
      count: article.likes.length
    };
    return like;
  },
  getShares : function (article){
    var share = {};
    share = {
      count: article.shares.length
    };
    return share;
  },
  getVisit : function (article){
    var visit = {};
    visit = {
      count: article.visit.length
    };
    return visit;
  },
  getCategories : function (article){
    var categories = [];
    if(article != 'undefined' || article == [])
    {
      article.categories.forEach(function (category){
        var categoryList = {
          id: category.id,
          name: category.name
        };
        categories.push(categoryList);
      });
    }
    return categories;
  },
  //Like 0.2 Share 0.5 Visit 0.3
  getRecom : function (like,share,visit){
    return (like*0.2) +(share*0.5)+(visit*0.3);
  },
  getReadArtHtml : function (html) {
    var read = require('read-art');
    return new Promise(function(resolve,reject){
      read(html, function(err, art, options){
        if(err){
          reject(err);
        }
        resolve(art.content);
      });
    });
  },
  getReadingTime : function (_url,rawData) {
    var readingTime = require('reading-time');
    return new Promise(function(resolve,reject){
      Article.findOne()
           .where({ 'url': { contains : _url }})
           .exec(function (err, article){
             if (err)
               reject(err);

             if(article.reading)
               resolve(article.reading);

             if(!article.reading)
               ArticleService.getReadArtHtml(rawData)
                  .then(function(processedData){

                    if(processedData)
                      {

                      var reading = readingTime(
                                          processedData,{ label:' min de lectura',wpm:_wpm }
                                      );

                      if(article && reading)
                        Article.update({'url': _url},{'reading':reading})
                          .then(function (updated) {
                            sails.log.debug('+Set reading >'+JSON.stringify(updated[0].reading));
                          });

                      resolve(reading);
                    }



                  })
                  .catch(function (err) {
                    reject(err);
                  });
           });
    });
  },
  getStats: function(URI){

    return new Promise(function(resolve,reject){
      var reqfast = require('req-fast');
      var _URI_OLD = URI;
      URI = String(URI).indexOf('http') === 0 ? URI : 'http://'+URI;
      var _URI = String(URI).replace('http://','https://');

      var stats ={
        alive : false,
        secure : false,
        reading : {}
      };

      reqfast(_URI, function(err, resp) // Https request
        {

        if(err || resp.statusCode >= 400)
          {
          sails.log.warn(_URI);
          sails.log.warn(err.code || err);

          if(err.code !== 'ENOTFOUND' || err )
              {
            reqfast(URI, function(err, resp) // Http request
                 {
              if(err){
                sails.log.warn(err.reason || err);

                Article.update({'url': _URI_OLD},{'state':'disable'}) //Set Dead Article
                      .then(function (updated) {
                        sails.log.debug('+Set dead >'+updated[0].id+'>>'+updated[0].title);
                      });

                resolve(stats);
              }

              if(resp && resp.statusCode && !(resp.statusCode >= 200 && resp.statusCode <=208))
                resolve(stats); // Other Error Status Secure site

              if(resp && resp.statusCode && resp.statusCode >= 200 && resp.statusCode <=208)
                      {
                stats.alive = true;
                ArticleService.getReadingTime(URI,resp.body)
                          .then(function (reading) {
                            stats.reading = reading;
                            resolve(stats); // Alive site
                          })
                          .catch(function (err) {
                            reject(err);
                          });
              }
            });

          }else {
            Article.update({'url': _URI_OLD},{'state':'disable'})
                .then(function (updated) {
                  sails.log.debug('+Set dead >'+updated[0].id+'>>'+updated[0].title);
                });
            resolve(stats); // DEAD Site
          }
        }

        if(resp && resp.statusCode && resp.statusCode >= 200 && resp.statusCode <=208)
          {
          stats.alive = true;
          stats.secure = true;
          ArticleService.getReadingTime(URI,resp.body)
                .then(function (reading) {
                  stats.reading = reading;
                  resolve(stats); // Secure site
                });
        }

      });


    });

  },
  _getStats: function(URI){
    return new Promise(function(resolve,reject){
      var reqfast = require('req-fast');
      var _URI_OLD = URI;
      URI = String(URI).indexOf('http') === 0 ? URI : 'http://'+URI;
      var _URI = String(URI).replace('http://','https://');

      var stats ={
        alive : false,
        reading : {}
      };

      reqfast(URI, function(err, resp) // Http request
                   {
        if(err){
          sails.log.warn(err.reason || 'Error of access');

          Article.update({'url': _URI_OLD},{'state':'disable'}) //Set Dead Article
                        .then(function (updated) {
                          sails.log.debug('+Set dead >'+updated[0].id+'>>'+updated[0].title);
                        });

          resolve(stats);
        }

        if(resp && resp.statusCode && !(resp.statusCode >= 200 && resp.statusCode <=208))
          resolve(stats);

        if(resp && resp.statusCode && resp.statusCode >= 200 && resp.statusCode <=208)
                        {
          stats.alive = true;
          ArticleService.getReadingTime(URI,resp.body)
                            .then(function (reading) {
                              stats.reading = reading;
                              resolve(stats); // Alive site
                            })
                            .catch(function (err) {
                              reject(err);
                            });
        }
      });
    });
  },
  getArticleStructure : function (article){
    return {
      id: article.id,
      uid: article.uid,
      title: article.title,
      url: article.url,
      state: article.state,
      date: article.state === 'edit' ?
                        article.updatedAt : article.createdAt,
      description: article.description,
      image: article.image,
      ownlike: ArticleService.getOwnLike(article.likes) || false,
      likes : article.likes.length,
      shares : article.shares.length,
      visits : article.visits.length,
      recommend : ArticleService.getRecom(
                                article.likes.length,
                                article.shares.length,
                                article.visits.length
                              ),
      creator: ArticleService.getCreator(article),
      categories: ArticleService.getCategories(article)
    };
  }
};
