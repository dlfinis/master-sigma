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
    setOldLike : function(articleID,likeID){
      return new Promise(
        function (resolve,reject){
          Like.update({article: articleID},{sid: likeID})
          .exec(function(err,updated){
            if(err) reject(err);
            resolve(updated);
          });
        });
    },
    checkFBLike : function(likeSID){
      return new Promise(
          function (resolve,reject){
            graph.get(likeSID,
              function(err, response) {
                if(err) reject(err);
                resolve(response);
              });
          });
    },
    checkDBLike : function(articleID){
      return Like.findOne({article: articleID}).then(function exist(like) {
        if(like.sid)
        {
          return true;
        }
        else {
          return false;
        }
      });
    },
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
     check: function(articleID){
       return self.checkDBLike(articleID).then(function (exist){
         return exist;
       });
     },
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
             sails.log.warn(err.message);
             if(err && err.code === 3501 && err.message)
             {
               var originalID = err.message.substring(err.message.indexOf('ID: ')+4,err.message.length);
               sails.log.error('Original Code',originalID);
               self.setOldLike(articleID,originalID).then(function (updated){
                 sails.log.debug('+ Re-Set like :',updated);
                 return ({updated : true,record : updated});
               });
             }
             sails.log.debug(err);
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
