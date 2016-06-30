/**
 * Article.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Promise = require('bluebird');
var uuid = require('node-uuid');

module.exports = {
    schema: true,
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
          url: true,
          unique: true
        },
        image:{
          type: 'STRING',
          required: false,
          urlish: true
        },
        reading:{
          type: 'JSON'
        },
        // Add a reference to state
        state: {
          type: 'STRING',
          enum: ['create', 'edit','disable'],
          defaultsTo: 'create'
        },
        // Add a reference to lind of kind
        kind: {
          type: 'STRING',
          enum: ['article','document', 'image','video','sound'],
          defaultsTo: 'article'
        },
        // Add a reference to User
        creator: {
          model: 'user',
          required: true,
          index: true
        },
        // Add a reference to Article Related
        relateTo: {
          collection: 'article_related',
          via: 'main'
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
          via: 'article'
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
        },
        isAlive:function () {
          var _id = this.id;
          var _url = this.url;
          var _state = this.state;
          // select http or https module, depending on requested url
          var lib = _url.startsWith('https') ?
                    require('follow-redirects').https
                    : require('follow-redirects').http;
          return new Promise(function(resolve, reject){
              lib.get(_url, function(response) {
                if (response.statusCode < 200 || response.statusCode > 299) {
                    if(_state !== 'disable')
                      Article.update(_id,{ state: 'disable' }).exec(function afterwards(err, updated){
                        if (err) {
                          // handle error here- `res.serverError(err);`
                          return;
                        }
                      });
                    resolve(false);
                 }
                else {
                    resolve(true);
                }

              }).on('error',  function(err) {
                sails.log.error('* isAlive >');
                sails.log.error(err.reason);
                resolve(false);
              });
            });
        },
        isSecure: function () {
          var https = require('follow-redirects').https;
          var _url = String(this.url).replace('http://','https://');
          return new Promise(function(resolve, reject){
                https.get(_url, function(response) {
                   if(response.statusCode < 200 || response.statusCode > 299)
                      resolve(false);
                    else {
                      resolve(true);
                    }
                }).on('error',  function(err) {
                  sails.log.error('* isSecure >');
                  sails.log.error(err.reason);
                  resolve(false);
                });
            });
        },
        setDead : function () {
          var _state = this.state;
          if(_state !== 'disable')
            Article.update(_id,{ state: 'disable' }).exec(function afterwards(err, updated){
              if (err) {
                return;
              }
            });
        }
    },
    beforeUpdate : function(values, next){
          sails.log('+ Before Update'+JSON.stringify(values));
          // if((values.title || values.url || values.description || values.image || values.kind ) &&
          //     !(values.title && values.url && values.description && values.image && values.kind))
          //       values.state = 'edit';
          next();
    },
    toJSON : function(){
       var obj = this.Object();
       return obj;
    }
};
