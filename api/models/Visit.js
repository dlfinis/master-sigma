/**
* Visit.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  autoUpdatedAt: false,
  attributes: {
    //Time in seg  
    time: {
      type:'FLOAT',
      defaultsTo:1,
      required:true
    },
    // Add a reference to Article
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

};
