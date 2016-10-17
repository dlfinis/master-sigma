/**
 * UploadController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/*global UploadFileService*/
module.exports = {
  image: function (req,res) {
    return UploadFileService.image(req,'image').then(function (resImageUrl) {
      return res.ok(resImageUrl);
    })
    .catch(function (err) {
      return res.serverError(err);
    });
  }
};
