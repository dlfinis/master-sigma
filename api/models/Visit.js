/**
* Visit.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var uuid = require('node-uuid');
module.exports = {
  autoUpdatedAt: false,
  attributes: {

    time: {
      type:'FLOAT',
      defaultsTo:0,
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
