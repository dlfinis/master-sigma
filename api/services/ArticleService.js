/**
 * ArticleService
 *
 * @description :: Server-side logic for managing your account
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var graph = require('fbgraph');
var moment = require('moment');
module.exports = {

  getDate:function(date,format){
    sails.log("+ ARTICLE.GETDATE");
    var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    if(!format)
    {
    moment.locale('es');
    return moment(date).format('MMMM DD,YYYY');
    }else{
    return moment(date).format(format);
    }
  },
  createArticles:function(){
      // var options = {
      //     timeout:  3000
      //   , pool:     { maxSockets:  Infinity }
      //   , headers:  { connection:  "keep-alive" }
      // };

/*      Article.find().exec(function (err,articles){
          if(err){
            sails.log(err);
            return next(err);
          }


            _.each(articles, function (article) {

               var articleObj={
                  'og:url': article.url,
                  'og:title': article.title,
                  'og:type': 'article',
                  'og:image': article.image ? article.image : '/images/grass.png' ,
                  'og:description': article.description,
                  'fb:app_id': sails.config.application_auth.facebookClientID
                };
                sails.log(JSON.stringify(articleObj));

                 // graph.post("me/objects/article", {object:JSON.stringify(articleObj)}, function(err, res) {
                 //    sails.log(res);
                 // });
                 graph.post("me/og.likes", {object:JSON.stringify(articleObj)}, function(err, res) {
                    sails.log(res);
                 });
                    // returns the post id
                    //sails.log(graph.post()); // { id: xxxxx}
                    // sails.log(Object.keys(graph.post()); // { id: xxxxx}
              });

      });*/


            // var wallPost = {
      //   message: "I'm gonna come at you like a spider monkey, chip!"
      // };

      // graph.post("/feed", wallPost, function(err, res) {
      //   // returns the post id
      //   sails.log(res); // { id: xxxxx}
  },
  getArticles: function(res){

      sails.log("+ ARTICLE.GETARTICLES");
      Article.find(function articleFounded(err,articles){
        if(err){
          sails.log(err);
          return next(err);
        }

       // articles = articles.map(function(article) {
       //      return { // return what new object will look like
       //          // updatedAt: dateFormat(updatedAt, "dddd, mmmm dS, yyyy")
       //          url : article.url.replace(/^https?:\/\//,'')
       //      };
       //  });
        // sails.log(_.each(articles,function(){}));
        // _.each( articles, function(article,index){
        //   var obj=articles[index];
        //   // articles[index].updateAt = dateFormat(obj.updateAt, "yyyy-mm-dd");
        //   // sails.log( "TEst",dateFormat(obj.updateAt, "dddd, mmmm dS, yyyy"));
        //   // sails.log( "TEst",dateFormat(now, "yyyy, mmmm dS, dd"));
        //   articles[index].url="google.com";
        //   sails.log(article);
        // });
        //sails.log(articles);
        res.view({articles:articles});
      });
  },
  isUID: function (uid,data){
    return _.find(data, function(resp) {
          return resp.data.uid == uid
      }) ? true : false;
  },
  isSetLike: function(uid){
    var stringGetUID = "me/master-sigma:recomienda?fields=data{uid}";
  return graph.get(stringGetUID,
                  function(err, response) {
                    if(err)
                      {
                        sails.log(err);
                      }
                      return ArticleService.isUID(uid, response.data);
              });
  },
  test:function(){
    return 'delta';
  }

};
