/**
* Visit.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var uuid = require('node-uuid');
module.exports = {
  schema: true,
  autoUpdatedAt: false,
  attributes: {
    // Add a reference to Article
    article: {
      model: 'article'
    },
    // Add a reference to User
    user: {
      model: 'user'
    }
  }

};
