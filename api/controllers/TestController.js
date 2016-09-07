/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req,res){

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="https://master.sigma/api/test/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="image" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
  },

  uploadImage: function  (req, res) {

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
