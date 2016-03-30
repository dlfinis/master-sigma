/**
 * Article.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var uuid = require('node-uuid');
module.exports = {

    attributes: {

        uid: {
        type: 'STRING',
        defaultsTo: function (){ return uuid.v4(); },
        unique: true,
        index: true,
        uuidv4: true
        },
        title: {
        type: 'STRING',
        required: true
        },
        description:{
          type: 'TEXT',
          defaultsTo: ' ',
          required: true
        },
        url:{
          type: 'STRING',
          required: true,
          urlish: true,
          unique: true
        },
        image:{
          type: 'STRING',
          required: false,
          urlish: true
        },
        // Add a reference to state
        state: {
          type: 'STRING',
          enum: ['create', 'edit'],
          defaultsTo: 'create'
        },
        // Add a reference to User
        creator: {
          model: 'user',
          required: true,
          index: true
        },
        // Add a reference to Categories
        categories: {
          collection: 'category',
          via: 'articles',
          dominant: true,
          required: true
        },
        // Add a reference to Like
        likes: {
          collection: 'like',
          via: 'article',
        },
        // Add a reference to Share
        shares: {
          collection: 'share',
          via: 'article'
        },
        // Add a reference to Visit
        visits: {
          collection: 'visit',
          via: 'article'
        }
    },
    afterUpdate : function(values, cb){
        Article.update(values.id,{ state: 'edit' },function(err){
          if(err) return cb(err, false);
        });
        cb();
    },
    toJSON : function(){
       var obj = this.Object();
       return obj;
    }
};
