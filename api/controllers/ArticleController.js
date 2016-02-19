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

module.exports = {

   test: function (req, res) {
    return res.json({ status: 'OK' });
  },
  testID: function (req, res) {
    var nameID = req.param('name');
    console.log(req.param(nameID));
    return res.json({ status: 'OKID' });
  },
  setLike: function(req,res){

      console.log("+ Article.SETLIKE");
      var uid = (req.param('uid'));
      var idLike;

      console.log("+ Article.NOTLIKE.BEFORE");
      var stringGetUID = "me/master-sigma:recomienda?fields=data{uid}";
      var opt = false;
      graph.get(stringGetUID,
                  function(err, response) {
                    if(err)
                      {
                        console.log(err);
                      }
                        //console.log(ArticleService.isSetLike(uid));
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
                                      console.log("+ Article.SETLIKE");
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

      console.log("+ Article.DELLIKE");
      var uid = (req.param('uid'));

      console.log("+ Article.ISLIKE.BEFORE");
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
