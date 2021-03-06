/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
    schema: true,
    attributes: {
        name: {
        type: 'string',
        required: true,
        unique: true,
        index:true
        },
        description:{
          type: 'string',
          required: false,
          defaultsTo: ''
        },
        // Add a reference to Article
        articles: {
          collection: 'article',
          via: 'categories'
        }
    }
  };
