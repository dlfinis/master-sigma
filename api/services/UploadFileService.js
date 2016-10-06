/**
 * UploadFileService
 *
 * @description :: Server-side logic for managing your account
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var dir_images = './assets/post/images/';
var Promise = require('bluebird');
module.exports = {
  /**
   * Upload an image file
   * @param  req
   * @param  res
   * @param  string field Name of field that contain in the request the image file
   */
  image: function(req,field) {
    return new Promise(function (resolve,reject){
      sails.log.debug('+ Upload image file');
      req.file(field).upload({
        dirname: dir_images,
        saveAs: function(_file,cb){
          /* optional. default file name */
          var oNameFile = _file.filename;
          var extFile = oNameFile.substr(oNameFile.lastIndexOf('.'),oNameFile.length);
          var fileName = require('randomstring').generate(7) + extFile;
          cb(null,fileName);
        },
        maxBytes: 3 * 1024 * 1024
      },function whenDone(err, file) {
        if (err)
          reject(err);

        // If no files were uploaded, respond with an error. BadRequest
        if (file.length === 0){
          reject('Image: No file was uploaded');
        }

        sails.log.debug('Image',file);
        resolve(file[0]);
      });
    });

  },
  images: function(req,res,field) {
    sails.log.debug('+ Upload images files');

    req.file(field).upload({
      dirname: dir_images,
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

      return _.map(files,function (element){
        return element.fd;
      });
    });
  }
};
