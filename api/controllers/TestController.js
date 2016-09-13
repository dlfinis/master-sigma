/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/*global Test UploadFileService Article*/
module.exports = {


  index: function (req,res){
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="https://master.sigma/api/test/uploadTest" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="image" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
  },
  params: function(req,res){
    return res.ok(JSON.stringify(req.allParams()));
  },
  tcreate: function (req,res) {
    var article = {};
    try{
      article = {
        title : require('randomstring').generate(7),
        creator: require('randomstring').generate({
          length: 3,
          charset: 'numeric'
        }),
        url : req.param('url'),
        state : 'disable'
      };
    }catch(err){
      sails.log.warnig(err);
      return res.serverError(err);
    }

    Article.create(article).exec(function (err, record) {
      if(err) {

        sails.log.warnig(err.code,err.details);

        if(err.code === 'E_VALIDATION')
          return res.badRequest({attributes:err.invalidAttributes});

        return res.serverErro(err);
      }
      sails.log.debug('+ Article create : ',record);
    });
  },
  uploadTest: function (req,res){
    var file = UploadFileService.image(req,'image');
    return res.ok(JSON.stringify(file));
  },
  uploadImage: function  (req, res) {
    sails.log.debug('+ Upload image file');
    req.file('image').upload({
      dirname: './assets/post/images/',
      saveAs: function(_file,cb){
        /* optional. default file name */
        var oNameFile = _file.filename;
        var extFile = oNameFile.substr(oNameFile.lastIndexOf('.'),oNameFile.length);
        var fileName = require('randomstring').generate(7) + extFile;
        cb(null,fileName);
      },
      maxBytes: 15 * 1024 * 1024
    },function whenDone(err, files) {
      if (err)
        return res.serverError(err);

      // If no files were uploaded, respond with an error.
      if (files.length === 0){
        return res.badRequest('No file was uploaded');
      }

      var test = {
        user : require('randomstring').generate({
          length: 10,
          charset: 'numeric'
        }),
        image : _.map(files,function (element){
          return element.fd;
        })

      };

      Test.create(test).exec(function (err, record) {
        if(err) return res.serverError(err);
        console.log(record);
      });

      return res.ok('Images Files saved');
    });
  }
};
