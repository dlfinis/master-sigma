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
        console.log("+ AUTH.FACEBOOK.CANVAS");
        passport.authenticate('facebook-canvas',
        {
            scope: [
            'user_about_me',
            'user_likes',
            'user_posts',
            'user_location',
            'publish_actions'
            ]
        },
        function (err, user)
        {
                console.log("Facebook Auth Response error=", err, "user=", user);

                if (user) {
                    req.logIn(user, function (err) {

                        if (err) {
                            console.log("Auth Error", err);
                            return res.view('500');
                        }
                            console.log('+ REDIRECT ','/canvas/index');
                        return res.redirect('/canvas/index');

                    });
                } else {
                        return res.redirect('/canvas/autologin');
                        // return res.redirect('/auth/autologin');
                }

        }
        )(req, res);
    },
    autologin: function(req,res){
      console.log('+ POPUP ','/auth/facebook/canvas');

      alfa= FB.getLoginUrl({
        display: 'popup',
          scope: 'email,publish_actions',
          client_id: sails.config.application_auth.facebookClientID,
          redirect_uri: sails.config.application_auth.facebookAppURL
      });
      console.log(alfa);

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

      console.log("+ CANVAS.INDEX");

      // console.log("+ Token ",graph.getAccessToken());


      // var wallPost = {
      //   message: "I'm gonna come at you like a spider monkey, chip!"
      // };

      // graph.post("/feed", wallPost, function(err, res) {
      //   // returns the post id
      //   console.log(res); // { id: xxxxx}
      // });
        // console.log(ArticleService. getArticles());
        var articles = (ArticleService. getArticles(res));
        // res.view({ articles : articles});
    },
    test:function(req,res){
      return res.view();
    }

};
