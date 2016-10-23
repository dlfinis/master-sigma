/**
 * ShareController
 *
 * @description :: Server-side logic for managing Shares
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/*global UserService Share*/
module.exports = {
  setWithMessage: function(req,res){
    var shareSID = req.param('shareSID');
    var articleID = req.param('articleID');
    var messageShare = req.param('messageShare');
    var userID = UserService.me(req).id;

    if(!shareSID || !articleID)
      return res.json(400,{});

    sails.log.debug('+ SHARE init to add in DB',articleID,shareSID);

    if(shareSID && articleID)
      Share.create({
        sid : shareSID,
        article : articleID,
        user : userID,
        message : messageShare
      }).then(function createRecord(created){
        sails.log.debug('+ SHARE success by adding at DB');
        sails.log.debug('+ Set share :',created);
        return res.json(200,{created : true,record : created});
      })
      .catch(function (err) {
        sails.log.warn('+ SHARE failed to add ',err);
        return res.json(500,err);
      });
  },
  set: function (req, res){
    var shareSID = req.param('shareSID');
    var articleID = req.param('articleID');
    var user = UserService.me(req);

    var completeSID = user.uid+'_'+shareSID;

    if(!shareSID || !articleID)
      return res.json(400,{});

    sails.log.debug('+ SHARE init to add in DB',articleID,shareSID);

    require('fbgraph').get(completeSID,function(err,response){
        if(err){
          sails.log.warn('+ SHARE failed to get info ',err);
          return res.json(500,err);
        }

        if(res){
          Share.create({
            sid : shareSID,
            article : articleID,
            user : user.id,
            message : response.message
          }).then(function createRecord(created){
            sails.log.debug('+ SHARE success by adding at DB');
            sails.log.debug('+ Set share :',created);
            return res.json(200,{ created : true,record : created });
          })
          .catch(function (err) {
            sails.log.warn('+ SHARE failed to add ',err);
            return res.json(500,err);
          });
        }else {
          Share.create({
            sid : shareSID,
            article : articleID,
            user : user.id
          }).then(function createRecord(created){
            sails.log.debug('+ SHARE success by adding at DB without message');
            sails.log.debug('+ Set share :',created);
            return res.json(200,{created : true,record : created});
          })
          .catch(function (err) {
            sails.log.warn('+ SHARE failed to add ',err);
            return res.json(500,err);
          });
        }

    });
  }
};
