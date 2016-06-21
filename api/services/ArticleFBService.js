/**
 * ArticleFBService
 *
 * @description :: Server-side logic for managing your account
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 /*global Article User Like Share ArticleFBService ArticleService UserService*/
 /*eslint no-unused-vars: 0*/
 var Promise = require('bluebird');
 var moment = require('moment');
 var graph = require('fbgraph');

  var self ={
    setFBLike : function(articleURL){
      return new Promise(
          function (resolve,reject){
            graph.post('me/og.likes',
              {
                object:articleURL
              },
              function(err, response) {
                if(err) reject(err);
                resolve(response);
              });

          });
    },
    delFBLike : function(sid){
      return new Promise(
        function (resolve,reject){
          graph.del(sid,
            function(err, response) {
              if(err) reject(err);
              resolve(response);
            });
        });
    }
  };

 module.exports = {
   like : {
     set : function (articleID,articleURL,userID) {
       return self.setFBLike(articleURL)
           .then(function(reslike){ return [reslike]; })
           .spread(function (reslike) {
             return Like.create({
               sid : reslike.id,
               article : articleID,
               user : userID
             })
               .then(function(created){
                 sails.log.debug('+ Set like :'+created.sid);
                 return ({created : true,record : created});
               });
           })
           .catch(function(err){
             sails.log.warn(err);
             throw 'Like: Not set like err';
           });
     },
     delete : function (sid) {
       return self.delFBLike(sid)
            .then(function(resdel){ return [resdel]; })
            .spread(function (resdel) {
              return Like.destroy({
                sid : sid
              }).then(function deleteRecord(){
                sails.log.debug('+ Deleted like :'+sid);
                return ({deleted : true});
              })
                        .catch(function(err){
                          sails.log.warn(err);
                          return ({deleted:false,err : err});
                        });
            })
            .catch(function(err){
              sails.log.warn(err);
              throw 'Share: Not set share err';
            });

     }
   },
   share : {
     set : function (shareSID,articleID,userID,messageShare) {
       return Share.create({
         sid : shareSID,
         article : articleID,
         user : userID,
         message : messageShare
       }).then(function createRecord(created){
         sails.log.debug('+ Set share :'+JSON.stringify(created));
         return ({created : true,record : created});
       },
         function (err) {
           sails.log.warn(err);
           return ({created:false,err : err});
         }
       );
     }
   }
 };
