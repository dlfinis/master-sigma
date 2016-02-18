/**
 * ArticleService
 *
 * @description :: Server-side logic for managing your account
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var graph = require('fbgraph');
var dateFormat = require('dateformat');
module.exports = {

  createArticles:function(){
      // var options = {
      //     timeout:  3000
      //   , pool:     { maxSockets:  Infinity }
      //   , headers:  { connection:  "keep-alive" }
      // };

/*      Article.find().exec(function (err,articles){
          if(err){
            console.log(err);
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
                console.log(JSON.stringify(articleObj));

                 // graph.post("me/objects/article", {object:JSON.stringify(articleObj)}, function(err, res) {
                 //    console.log(res);
                 // });
                 graph.post("me/og.likes", {object:JSON.stringify(articleObj)}, function(err, res) {
                    console.log(res);
                 });
                    // returns the post id
                    //console.log(graph.post()); // { id: xxxxx}
                    // console.log(Object.keys(graph.post()); // { id: xxxxx}
              });

      });*/


            // var wallPost = {
      //   message: "I'm gonna come at you like a spider monkey, chip!"
      // };

      // graph.post("/feed", wallPost, function(err, res) {
      //   // returns the post id
      //   console.log(res); // { id: xxxxx}
  },
  getArticles: function(res){
      Article.find(function articleFounded(err,articles){
        if(err){
          console.log(err);
          return next(err);
        }
        console.log(_.each(articles,function(){}));
        _.each( articles, function(article,index){
          // articles[index].updateAt = new Date().toISOString().slice(0, 10);
          articles[index].updateAt = dateFormat(obj.updateAt, "dddd, mmmm dS, yyyy");
          console.log( "TEst",dateFormat(obj.updateAt, "dddd, mmmm dS, yyyy"));
        });

        //console.log(articles);
        res.view({articles:articles});
      });
  }

};
