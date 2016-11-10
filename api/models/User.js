/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var uuid = require('node-uuid');
module.exports = {
  schema: true,
  attributes: {
    provider: 'STRING',
    uid: {
      type: 'STRING',
      unique: true,
      index: true,
      defaultsTo: function (){ return uuid.v4(); }
    },
    name: 'STRING',
    email: 'STRING',
    status:{
      type: 'STRING',
      defaultsTo: 'consumer', //consumer/editor
      size: '15'
    },
    firstname: 'STRING',
    lastname: 'STRING',
    gender: 'STRING',
    birthday: {
      type: 'STRING',
      size: '10'
    },
    profileUrl: 'STRING',
    password: 'STRING',
    // Add a reference to Article
    articles: {
      collection: 'article',
      via: 'creator'
    },
    // Add a reference to Like
    likes: {
      collection: 'like',
      via: 'user'
    },
    // Add a reference to Like
    shares: {
      collection: 'share',
      via: 'user'
    }
  }
};
