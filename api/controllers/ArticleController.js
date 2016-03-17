/**
 * ArticleController
 *
 * @description :: Server-side logic for managing article
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var graph = require('fbgraph');

  function isSetLike(uid,graphData) {
      return _.find(graphData, function(resp) {
          return resp.data.uid == uid
      }) ? true : false;
  };

  function getIDLike(uid,graphData) {
      return _.find(graphData, function(resp) {
          return resp.data.uid == uid
      }).id;
  };

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
  };

  function getLikes(article){
    var like = {};

    like = {
      count: article.likes.length
    };

    return like;
  };
  function getShares(article){
    var share = {};

    share = {
      count: article.shares.length
    };

    return share;
  };
  function getVisit(article){
    var visit = {};

    visit = {
      count: article.visit.length
    };

    return visit;
  };
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
  };

module.exports = {

  findAll:function(req,res){
    var articles_info = Article.find()
                               .populate('creator')
                               .populate('categories')
                               .populate('likes')
                               .populate('shares')
                               .populate('visits');

      articles_info.then(function(response){
                      if(response != undefined )
                      {
                        var articles = [];
                        response.forEach(function(article){
                            var articleObj = {};

                            articleObj = {
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
                              creator: getCreator(article),
                              categories: getCategories(article)
                            };

                            articles.push(articleObj);
                        });

                        return res.ok({total:articles.length,results:articles});

                      }else{
                        return res.send(404,{results:'Not found'});
                      }
                   })
                  .catch(function(err){
                            sails.log(err);
                            return res.serverError(err);
                  });
  },
  getInfo: function(req,res){
      var articleID = req.param('id');
      // console.log(articleID);

      var articles_info = Article.findOne({id:articleID})
                                 .populate('categories')
                                 .populate('creator');
          articles_info.then(function(response){
                        // console.log(response);
                        if(response != undefined )
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
                        }
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
}
