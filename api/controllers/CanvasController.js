/**
 * CanvasController
 *
 * @description :: Server-side logic for managing canvas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var graph = require('fbgraph');
var passport = require('passport');
var FB = require('fb');
module.exports = {


    // Facebook login screen
    login: function (req, res) {
        sails.log("+ .CANVAS");

        if(req.user)
        {
          sails.log('+ REDIRECT ','/canvas/index');
          return res.redirect('/canvas/index');
        }

        passport.authenticate('facebook-canvas',
        {
            scope: [
            'publish_actions'
            ]
        },
        function (err, user)
        {
                sails.log("Facebook Auth Response error=", err, "user=", user);

                if (user) {
                    req.logIn(user, function (err) {

                        if (err) {
                            sails.log("Auth Error", err);
                            return res.view('500');
                        }
                        // sails.log('+ REDIRECT ','/canvas/index');
                        // return res.redirect('/canvas/index');
                        sails.log('+ REDIRECT ','/wall');
                        return res.redirect('/#/wall');

                    });
                } else {
                        return res.redirect('/canvas/autologin');
                        // return res.redirect('/auth/autologin');
                }

        }
        )(req, res);
    },
    autologin: function(req,res){
      sails.log('+ POPUP ','/auth/facebook/canvas');

      alfa= FB.getLoginUrl({
        display: 'popup',
          scope: 'publish_actions',
          client_id: sails.config.application_ClientID,
          redirect_uri: sails.config.application_AppURL
      });
      sails.log(alfa);

      var redirect_popup = ('<!DOCTYPE html>' +
                            '<body>'+
                            '<script type="text/javascript">'+
                            'top.location.href = "$alfa";'+
                            '</script>' +
                            '</body>' +
                            '</html>').replace('$alfa',alfa);
       return res.send(redirect_popup);
    },
    // Index page
    index: function (req, res) {

      sails.log("+ CANVAS.INDEX");

      // sails.log("+ Token ",graph.getAccessToken());


      // var wallPost = {
      //   message: "I'm gonna come at you like a spider monkey, chip!"
      // };

      // graph.post("/feed", wallPost, function(err, res) {
      //   // returns the post id
      //   sails.log(res); // { id: xxxxx}
      // });
        // sails.log(ArticleService. getArticles());
        // var articles = (ArticleService. getArticles(res));
        // res.view({ articles : articles});
    },
    test:function(req,res){
      return res.json("OK!");
    },
    testpage:function(req,res){
      return res.redirect('/#/delta');
    },
    wall:function(req,res){
      return res.redirect('/#/wall');
    }


};
