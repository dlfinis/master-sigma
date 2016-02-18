/**
 * CanvasController
 *
 * @description :: Server-side logic for managing canvas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var graph = require('fbgraph');
var passport = require('passport');
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
            ],
            failureRedirect: '/auth/facebook'
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
                        return res.redirect('/canvas');

                    });
                } else {
                  console.log('+ REDIRECT ','/auth/facebook');
                    return res.redirect('/auth/facebook');
                   // return res.send( '<!DOCTYPE html>' +
                   //                  '<body>' +
                   //                    '<script type="text/javascript">' +
                   //                      'top.location.href = "/auth/facebook";' +
                   //                    '</script>' +
                   //                  '</body>' +
                   //                '</html>'
                   //                );
                }

        }
        )(req, res);
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
