/**
 * LikeController
 *
 * @description :: Server-side logic for managing Likes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/*global Like UserService*/

var graph = require('fbgraph');

module.exports = {
  have : function(req,res){
    var articleID = req.param('articleID');
    var userID = UserService.me(req).id;

    Like.findOne({article:articleID,user:userID})
    .exec(function foundRecord(err, record) {
      if(err)
      {
        sails.log(err);
        return res.ok(false);
      }
      return res.ok(record);
    });
  },
  set : function (req,res) {
    var articleID = req.param('articleID');
    var articleURL = req.param('articleURL');
    var userID = UserService.me(req).id;

    sails.log.debug('+ LIKE init to add in DB ',articleID,articleURL,userID);
     if(!_.isUndefined(articleURL))
       graph.post('me/og.likes',
         {
           object : articleURL
         },
         function(err, response) {
           if(err){
             sails.log.debug('+ FB LIKE failed to add ',err);

             if(err && err.code === 3501 && err.message){
              var originalID = err.message.substring(err.message.indexOf('ID: ')+4,err.message.length);

              sails.log.error('Original Like Code:',originalID);

              if(originalID)
              Like.update({ article: articleID },{ sid:originalID})
              .exec(function(err,updated){
                console.log('LIKE updated',articleID,originalID);
                if(err){
                  sails.log.err('- Re-Set LIKE failed:',err);
                  return res.json(400,err);
                }
                if(updated){
                  sails.log.debug('+ Re-Set LIKE success:',updated);
                  return res.json(200,{updated : true,record : updated});
                }
              });
            }else{
              return res.json(400,err);
            }
           }
           if(response){
             Like.create({
               sid : response.id,
               article : articleID,
               user : userID
             })
               .then(function(created){
                sails.log.debug('+ LIKE success by adding at DB', created.sid);
                 return res.json(200,{created : true,record : created});
               })
               .catch(function(err){
                 sails.log.warn('- LIKE failed to create ',err);
                 return res.json(400,err);
               });
             }

         });
  },
  delete : function (req,res) {
    var sid = req.param('likeSid');
    sails.log.debug('+ LIKE init to delete',sid);
    if(!_.isUndefined(sid))
      graph.del(sid,
        function(err, response) {
          if(err){
            sails.log.debug('+ FB LIKE failed to delete ',err);
            return res.json(400,err);
          }
          if(response)
          {
            Like.destroy({
              sid : sid
            }).then(function deleteRecord(){
              sails.log.debug('+ LIKE success in delete');
              return res.json(200,{deleted : true});
            })
            .catch(function(err){
              sails.log.debug('+ LIKE failed to delete ',err);
              return res.json(400,err);
            });

          }
        });
  }
};
