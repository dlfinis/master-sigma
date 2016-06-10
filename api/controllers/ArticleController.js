/**
 * ArticleController
 *
 * @description :: Server-side logic for managing article
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 /*global Article User Like Share ArticleService UserService*/
var Promise = require('bluebird');

// TODO:
//
// Replace the following helper with the version in sails.util:

// Attempt to parse JSON
// If the parse fails, return the error object
// If JSON is falsey, return null
// (this is so that it will be ignored if not specified)
function tryToParseJSON (json) {
  if (!_.isString(json)) return null;
  try {
    return JSON.parse(json);
  }
  catch (e) { return e; }
}

// Duplicate specific key of object JSON
function dupJSONKeysBySpace(json) {
  _.each(json,function (element,index) {
    json[index] = element.match(/[A-zÀ-ÿ]+|\d+/ig);
  });
  return  json;
}

module.exports = {
  findRawAll: function(req,res){
    var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
    var articleQuery = Article.find()
                              .where( actionUtil.parseCriteria(req) )
                              .limit( actionUtil.parseLimit(req) )
                              .skip( actionUtil.parseSkip(req) )
                              .sort( actionUtil.parseSort(req) )
                              .populate('creator')
                              .populate('categories')
                              .populate('likes')
                              .populate('shares')
                              .populate('visits');

    articleQuery
      .then(function (response){
        Promise.map(response, function(article) {
          return article;
        })
          .then(function(allItems) {
            sails.log.debug('Total Elements:'+allItems.length);
            return res.ok(allItems);
          });
      })
      .catch(function(err){
        sails.log.warn(err);
        return res.serverError(err);
      });
  },
  findElems : function(req,res){
    sails.log.debug('+ Find Dark');


    var where= req.params.all().query;
    sails.log.debug('+ Where Raw > ',where);

    if (_.isString(where)) {
      where = tryToParseJSON(where);
    }else{
      return res.json(401,'Bad query');
    }

    // Omit any params w/ undefined values
    where = _.omit(where, function (p){ if (_.isUndefined(p)) return true; });

    // In a value of json key with space convert these in elements
    where = dupJSONKeysBySpace(where);
    sails.log.debug('+ Where > ',where);

    ArticleService.setLimit(req.param('limit'));
    ArticleService.setTotalSize(); // All size of articles in DB
    UserService.current(req.user); // Set  current user

    ArticleService.getArticleListBase(ArticleService._baseQuery(req),where)
    .then(function(response){
      return res.json(response);
    })
    .catch(function(err){
      sails.log.warn(err);
      return res.json(500,'Not Data');
    });

  },
  findAll:function(req,res){
    var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
    var kindList = req.param('kind');
    var creator = req.param('creator');
    var category = req.param('category');

    ArticleService.setLimit(req.param('limit'));
    ArticleService.setTotalSize(); // All size of articles in DB
    UserService.current(req.user); // Set  current user

    var articleQuery = Article.find()
                              .limit( actionUtil.parseLimit(req) )
                              .skip( actionUtil.parseSkip(req) )
                              .populate('creator')
                              .populate('categories')
                              .populate('likes')
                              .populate('shares')
                              .populate('visits');

    if(creator)
      kindList = 'creator';

    if(category)
      kindList = 'category';

    switch (kindList) {
    case 'normal': {
      ArticleService.getArticleListNormal(articleQuery).then(function (response){
        return res.ok(response);
      });
      break;
    }

    case 'recommend': {
      ArticleService.getArticleListRecommend(articleQuery).then(function (response){
        return res.ok(response);
      });
      break;
    }

    case 'creator': {
      ArticleService.getArticleListByCreator(articleQuery,creator).then(function (response){
        return res.ok(response);
      });
      break;
    }

    case 'category': {
      ArticleService.getArticleListByCategory(articleQuery,category).then(function (response){
        return res.ok(response);
      });
      break;
    }
    default:{
      ArticleService.getArticleListNormal(articleQuery).then(function (response){
        return res.ok(response);
      });
    }
    }

  },
  stats: function (req,res) {
    var URI = req.param('uri');
    ArticleService._getStats(URI).then(function (response) {
      return res.ok(response);
    })
    .catch(function (err) {
      sails.log.error(err);
      return res.badRequest(err);
    });
  },
  alive : function (req,res) {
    var articleID = req.param('articleID');
    Article.findOne({id:articleID}).then(function foundRecord(article){
      if(!article)
        return res.notFound();

      article.isAlive()
              .then(function(alive){
                return res.ok(alive);
              });

    })
    .catch(function(err){
      return res.serverError(err);
    });

  },
  secure : function (req,res) {
    var articleID = req.param('articleID');
    Article.findOne({id:articleID}).then(function foundRecord(article){
      if(!article)
        return res.notFound();

      article.isSecure()
              .then(function(secure){
                return res.ok(secure);
              });

    })
    .catch(function(err){
      return res.serverError(err);
    });

  },
  havelike : function(req,res){
    var articleID = req.param('articleID');
    var userID = req.user.id;

    Like.findOne({article:articleID,user:userID}).exec(function foundRecord(err, record) {
      if(err)
      {
        sails.log(err);
        return res.ok(false);
      }

      return res.ok(record);

    });
  },
  setshare : function(req,res){
    var shareSID = req.param('shareSID');
    var articleID = req.param('articleID');
    var messageShare = req.param('messageShare');
    var userID = UserService.me().id || req.user.id;

    if(!shareSID || !articleID)
      return res.badRequest();

    if(shareSID && articleID)
      ArticleService.share.set(shareSID,articleID,userID,messageShare)
      .then(function (response) {
        return res.json(200,response);
      })
      .catch(function (err) {
        return res.json(400,err);
      });
  },
  setlike : function(req,res){
    var articleID = req.param('articleID');
    var articleURL = req.param('articleURL');
    var userID = UserService.me().id || req.user.id;
    ArticleService.like.set(articleID,articleURL,userID)
    .then(function (response) {
      return res.json(response);
    })
    .catch(function (err) {
      return res.json(400,err);
    });
  },
  deletelike : function(req,res){
    var sid = req.param('articleSid');
    ArticleService.like.delete(sid)
    .then(function (response) {
      return res.json(response);
    })
    .catch(function (err) {
      return res.json(400,err);
    });
  },
  filetype : function (req,res) {
    var mime = require('mime-types');
    var reqfast = require('req-fast');
    var URI = encodeURI(req.param('uri'));

    var mimetype = mime.lookup(URI);
    if(mimetype == 'application/x-msdownload' && URI.indexOf('.com') )
      mimetype = false;

    if(!mimetype)
    {
      reqfast(URI, function(err, resp){
        if(err){
          return res.serverError(err);
        }
        if(resp && resp.statusCode == 200)
        {
          return res.json({
            type:'text/html'
          });
        }
      });
    }
    else {
      return res.json({
        type:mimetype
      });
    }
  },
  reading: function (req, res) {
    var URI = encodeURI(req.param('uri'));
    ArticleService.getReadingTime(URI)
    .then(function(response){
      if(response)
        return res.json({reading:response});
      else
        return res.notFound();
    })
    .catch(function(err){
      if(err.errno !== 'ENOTFOUND') sails.log(err);
      return res.serverError('URL broke:'+req.param('uri'));
    });
  },
  test: function (req, res) {
    return res.json({ status: 'OK' });
  },
  testID: function (req, res) {
    var nameID = req.param('name');
    sails.log(req.param(nameID));
    return res.json({ status: 'OKID' });
  }
};
