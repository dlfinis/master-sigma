/**
* Article_Related.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema:'true',
  autoUpdatedAt: false,
  // autoPK:false,
  attributes: {
    // Add a reference to Article
    main_article: {
      model: 'article',
      required: true
    },
    related_article: {
      model: 'article',
      required:true
    }
  }
};
