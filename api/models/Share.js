/**
* Share.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,
  autoUpdatedAt: false,
  attributes: {
    sid: {
      type: 'STRING',
      required: true,
      index:true
    },
    // Add a reference to User
    article: {
      model: 'article'
    },
    // Add a reference to User
    user: {
      model: 'user'
    }
  }
};
