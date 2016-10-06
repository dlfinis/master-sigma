/**
 * ArticleController
 *
 * @description :: Server-side logic for managing article
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
/*global Article Like ArticleService ArticleQueryService ArticleFBService UserService UploadFileService*/
var Promise = require('bluebird');


// Split string values in an array of specific key of object JSON
function dupJSONKeysBySpace(json) {
  if(!_.isEmpty(json) && _.isObject(json))
    _.each(json,function (element,index) {
      if(element instanceof String) json[index] = element.match(/[A-zÀ-ÿ0-9]+/ig);
    });
  return json;
}

module.exports = {
  /**
   * A search articles without refinement
   */
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
            Article.count().exec(function (err, size){
              return res.json(200,{size:size,total:allItems.length,results:allItems});
            });
          });
      })
      .catch(function(err){
        sails.log.warn(err);
        return res.serverError(err);
      });
  },
  /**
   * Selective search of articles
   */
  findElems : function(req,res){
    sails.log.debug('+ Find Dark of Elems');


    var where = req.params.all().query;
    sails.log.debug('+ Where Raw > ',where);


    try{
      if (_.isString(where)) {
        where = JSON.parse(where);
      }
      else{
        return res.json(400,{ error: 'Badly structured query' });
      }
    }
    catch(e){
      return res.json(400,{ error: 'Badly structured query' });
    }

    // Omit any params w/ undefined values
    where = _.omit(where, function (p){ if (_.isUndefined(p)) return true; });

    // In a value of json key with space convert these in elements
    where = dupJSONKeysBySpace(where);
    sails.log.debug('+ Where Process > ',where);

    ArticleQueryService.getArticleListByQuery(ArticleQueryService._baseQuery(req),where)
    .then(function(response){
      return res.json(response);
    })
    .catch(function(err){
      sails.log.warn(err);
      return res.json(500,{ error: 'Not Data' });
    });

  },
  /**
   * A complete search of all articles in the database
   */
  findAll:function(req,res){
    var kindList = req.param('kind') || 'normal';

    var creator = req.param('creator');
    var category = req.param('category');

    var articleQuery = ArticleQueryService._baseQuery(req);

    sails.log('+ Find All Elements. Kind of List:',kindList);

    if(creator)
      kindList = 'creator';

    if(category)
      kindList = 'category';

    switch (kindList) {
    case 'normal': {
      ArticleQueryService.getArticleListNormal(articleQuery).then(function (response){
        return res.json(200,response);
      });
      break;
    }

    case 'recommend': {
      ArticleQueryService.getArticleListRecommend(articleQuery).then(function (response){
        return res.json(200,response);
      });
      break;
    }

    case 'creator': {
      ArticleQueryService.getArticleListByCreator(articleQuery,creator).then(function (response){
        return res.json(200,response);
      });
      break;
    }

    case 'category': {
      ArticleQueryService.getArticleListByCategory(articleQuery,category).then(function (response){
        return res.json(200,response);
      });
      break;
    }

    case 'liked': {
      ArticleQueryService.getArticleListMostLiked(articleQuery).then(function (response){
        return res.json(200,response);
      });
      break;
    }

    case 'shared': {
      ArticleQueryService.getArticleListMostShared(articleQuery).then(function (response){
        return res.json(200,response);
      });
      break;
    }

    default:{
      sails.log('-Default List');
      ArticleQueryService.getArticleListNormal(articleQuery).then(function (response){
        return res.json(200,response);
      });
    }
    }

  },
  findOne: function (req, res) {

    var articleQuery = ArticleQueryService._baseOneQuery(req);

    sails.log('+ Find an specific Element');
    ArticleQueryService.getArticleByField(articleQuery).then(function (response){
        return res.json(200,response);
    })
    .catch(function (err) {
        return res.json(400,err);
    });

  },
  /**
   * Info of an article
   */
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
  /**
   * Check if an article have connectivity
   */
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
  /**
   * Check if an article have https connectivity.
   */
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
    var userID = UserService.me(req).id;

    Like.findOne({article:articleID,user:userID})
    .exec(function foundRecord(err, record) {
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
    var userID = UserService.me(req).id;

    if(!shareSID || !articleID)
      return res.badRequest();

    sails.log.debug('+ SHARE init to add in DB');

    if(shareSID && articleID)
      ArticleFBService.share.set(shareSID,articleID,userID,messageShare)
      .then(function (response) {
        sails.log.debug('+ SHARE success by adding at DB');
        return res.json(200,response);
      })
      .catch(function (err) {
        sails.log.debug('+ SHARE failed to add ');
        return res.json(400,err);
      });
  },
  setlike : function(req,res){
    var articleID = req.param('articleID');
    var articleURL = req.param('articleURL');
    var userID = UserService.me(req).id;

    sails.log.debug('+ LIKE init to add in DB ',articleID,articleURL,userID);
    ArticleFBService.like.set(articleID,articleURL,userID)
    .then(function (response) {
      if(response.created) sails.log.debug('+ LIKE success by adding at DB');
      return res.json(response);
    })
    .catch(function (err) {
      sails.log.debug('+ LIKE failed to add ');
      return res.json(400,err);
    });

  },
  deletelike : function(req,res){
    var sid = req.param('articleSid');
    sails.log.debug('+ LIKE init to delete');
    ArticleFBService.like.delete(sid)
    .then(function (response) {
      sails.log.debug('+ LIKE success in delete');
      return res.json(response);
    })
    .catch(function (err) {
      sails.log.debug('+ LIKE failed to delete ');
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
  create: function (req,res){
    var article = {};
    try{
      article = {
        title : req.param('title'),
        description : req.param('description'),
        url : req.param('url'),
        image : req.param('image'),
        creator : req.param('creator'),
        categories : req.param('categories')
      };
    }catch(err){
      sails.log.warn(err);
      return res.serverError(err);
    }

    sails.log.debug(article);

    if(article.creator && article.image && article.categories && article.image)
      Article.create(article).exec(function (err, record) {
        if(err) {
          sails.log.warn(err.code,err.details);
          if(err.code === 'E_VALIDATION')
            return res.badRequest({attributes:err.invalidAttributes});
          return res.serverError(err);
        }
        sails.log.debug('+ Article create:', record);
        return res.ok('id:', record);
      });
    else{
      return res.badRequest({err:'invalidAttributes'});
    }

  }
};
