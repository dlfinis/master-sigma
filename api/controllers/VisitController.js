/**
 * VisitController
 *
 * @description :: Server-side logic for managing Visits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/*global Visit*/
module.exports = {

  create: function (req,res) {
    var userID = req.user.id;
    var articleID = req.param('articleID');
    var visitTime = req.param('visitTime');

    Visit.create({user: userID,article: articleID,time: visitTime})
       .exec(function createCB(err, created){
         if(err)
          return sails.log.warn(err);

         return res.ok(created);
       });
  }
};
