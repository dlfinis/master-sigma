/**
* Share.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var graph = require('fbgraph');
module.exports = {
  autoUpdatedAt: false,
  attributes: {
    sid: {
      type: 'STRING',
      required: true,
      index:true
    },
    message: {
      type: 'TEXT',
      defaultsTo: ''
    },
    // Add a reference to User
    article: {
      model: 'article',
      required: true
    },
    // Add a reference to User
    user: {
      model: 'user',
      required: true
    },
    completeSID : function(){
      var userID = this.user;
      var shareSID = this.sid;

      var userSID,completeSID;

      User.findOne({id:userID}).then(function(user){
        userSID = user.uid;
        completeSID = userSID+"_"+shareSID;

        return completeSID;
      });
    }
  },
  afterCreate : function(record,next){
    sails.log.debug("+ Share > "+JSON.stringify(record));
    // if(record.sid)
    // graph.get(record.completeSID+'?fields=message,likes,shares',
    //       function(err, response) {
    //         if(err) next(err);
    //         record.message = response.message;
    //         next();
    //       }
    //     );

  }
};
