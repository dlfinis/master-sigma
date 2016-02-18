/**
 * Article.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var uuid = require('node-uuid');
var dateFormat = require('dateformat');
module.exports = {
    adapter: 'sigmaDv',
    attributes: {
        uid: {
        type: 'string',
        defaultsTo: function (){ return uuid.v4(); },
        unique: true,
        index: true,
        uuidv4: true
        },
        title: {
        type: 'string',
        required: true
        },
        description:{
          type: 'string',
          defaultsTo: ' '
        },
        url:{
          type: 'string',
          required: true
        },
        image:{
          type: 'string',
          required: false
        },
    },
    toJSON : function(){
       var obj = this.Object();
      obj.updateAt =  dateFormat(obj.updateAt, "dddd, mmmm dS, yyyy");
      console.log(obj.updateAt ,'-' ,dateFormat(obj.updateAt, "dddd, mmmm, yyyy"));
       return obj;
    }
};
