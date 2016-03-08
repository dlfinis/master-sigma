/**
* Share.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    sid: {
      type: 'STRING',
      required: true,
      index:true
    },
    // Add a reference to User
    articles: {
      collection: 'article',
      via: 'shares'
    },
    // Add a reference to User
    user: {
      model: 'user'
    }
  }
};
