/**
* Share.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var graph = require('fbgraph');
function completeSID(userID,shareSID){

  var userSID;
  var completeSID;
  return User.findOne({id:userID}).then(function(user){
    if(user)
    {
    userSID = user.uid;
    completeSID = userSID+"_"+shareSID;

    return completeSID;
  }else {
    return false;
  }
  });
}
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
    }
  }
  // afterCreate : function(record,next){
  //   completeSID(record.user,record.sid).then(function(_sid){
  //     if(record.sid && _sid )
  //     {
  //       graph.get(_sid+'?fields=message,likes,shares',
  //       function(err, response) {
  //         if(err) next(err);
  //         record.message = response.message;
  //         Share.update(record.id,{message:response.message}, function(err, updated){
  //             if(err) next(err);
  //             next();
  //         });
  //       }
  //     );
  //   }
  //   });
  // }
};
