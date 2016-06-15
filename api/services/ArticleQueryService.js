/**
 * ArticleFBService
 *
 * @description :: Server-side logic for managing your account
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 /*global Article User Like Share ArticleFBService ArticleQueryService ArticleService UserService*/
 /*eslint no-unused-vars: 0*/

var Promise = require('bluebird');

var config = {
  _limit : 0,
  _skipe : 0,
  _totalSize : 0,
  _setLimit : function setLimit(limit) {
    this._limit = limit;
  },
  _setSkip : function setSkip(skip) {
    this._skip = skip;
  },
  _setTotalSize : function setTotalSize(size) {
    this._totalSize = size;
  },
  _successRate : 0.5
};

var self = {
  _accentMap : function () {
    return {
      'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', // a
      'ç': 'c',                                                   // c
      'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',                     // e
      'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',                     // i
      'ñ': 'n',                                                   // n
      'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o', // o
      'ß': 's',                                                   // s
      'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',                     // u
      'ÿ': 'y'                                                    // y
    };
  },
  _accentFold : function (str) {
    if (_.isNull(str) || _.isUndefined(str)) { return ''; }

    var ret = '';
    for (var i = 0; i < str.length; i++) {
      if(self._accentMap[str.charAt(i)])
        ret += self._accentMap[str.charAt(i)];
      else
        if(self._accentMap[str.charAt(i).toLowerCase()] && self._accentMap[str.charAt(i).toLowerCase()].toUpperCase())
          ret += self._accentMap[str.charAt(i).toLowerCase()].toUpperCase();
        else
          ret += str.charAt(i);
    }
    return ret;
  },
  searchString : function (str,wstr){
    if (_.isNull(str) || _.isUndefined(str)) { return false; }

    if(_.isArray(str) || _.isObject(str)) str = JSON.stringify(str);
    str = JSON.stringify(str);
    // Convert accent of the string , and search by reg expression
    return self._accentFold(str).search(new RegExp(self._accentFold(wstr), 'i')) > -1;
  },
  isSuccessfulQuery : function (arr,cnt){
    return !!(cnt >= (Math.round(_.size(arr)*config._successRate)));
  },
  matchWord : function (content,prms) {
    var success = 0;
    if (_.isNull(content) || _.isUndefined(content)) { return 0; }

    if(_.isArray(content) || _.isObject(content)) content = JSON.stringify(content);

    if(_.isArray(prms)){
      _.each(prms,function(pElem){
        if(self.searchString(content,pElem)) success = success + 1;
      });
      if(self.isSuccessfulQuery(prms,success)) return success;
    }
    else{
      if(self.searchString(content,prms)) return 1;
    }

    return 0;
  },
  filterGeneral : function (arr,prms) {
    return _.filter(arr,function(aElem){
      var success = 0;
      _.each(prms,function(pElem){ //Parameters of query
        _.each(_.keys(aElem),function(akElem){
          var matches = self.matchWord(aElem[akElem],pElem);
          if(matches > 0) success = success + matches;
        });
      });
      aElem.success = success;
      return self.isSuccessfulQuery(prms,success);
    });
  },
  filterByParams : function (arr,prms) {
    return _.filter(arr,function(aElem){
      var success = 0;
      _.each(_.keys(prms),function(wkElem){ //Parameters of query
        if(_.has(aElem,wkElem))
        {
          var matches = self.matchWord(aElem[wkElem],prms[wkElem]);
          if(matches > 0) success = success + matches;
        }
      });
      aElem.success = success;
      return self.isSuccessfulQuery(prms,success);
    });
  }
};

module.exports = {

  _baseQuery :function (req) {
    UserService.current(req.user); // Set  current user

    ArticleQueryService.getTotalSize().then(function (size) {
      config._setTotalSize(size); // All size of articles in DB
    });
    config._setLimit(ArticleQueryService.getLimit(req));
    config._setSkip(ArticleQueryService.getSkip(req));
    var query = Article.find()
                        .limit(ArticleQueryService.getLimit(req))
                        .skip(ArticleQueryService.getSkip(req))
                        .sort('updatedAt DESC')
                        .populate('creator')
                        .populate('categories')
                        .populate('likes')
                        .populate('shares')
                        .populate('visits')
                        .where({state:['create', 'edit']});

    return query;
  },
  getTotalSize : function (){
    return new Promise(function (resolve){
      Article.count({state:['create', 'edit']}).exec(function countCB(err, found){
        if(err) sails.log.warn(err);
        resolve(found);
      });
    });
  },
  getLimit: function (req) {
    var DEFAULT_LIMIT = sails.config.blueprints.defaultLimit || 10;
    var limit = req.param('limit') || (typeof req.options.limit !== 'undefined' ? req.options.limit : DEFAULT_LIMIT);
    if (limit) { limit = +limit; }
    return limit;
  },
  getSkip: function (req) {
    var DEFAULT_SKIP = 0;
    var skip = req.param('skip') || (typeof req.options.skip !== 'undefined' ? req.options.skip : DEFAULT_SKIP);
    if (skip) { skip = +skip; }
    return skip;
  },
  getArticleListBase : function (articleListData){
    return new Promise(function(resolve){
      var articlesList = [];

      // sails.log.debug('-->Original Size of Elements:',articleListData.length);
      // articleListData = _.filter(articleListData,function (article,index) {
      //   if(article.state === 'disable')
      //     sails.log.debug('-Disable id:',article.id,'>:',article.success || article.title,'+:',article.updatedAt);
      //   return article.state !== 'disable';
      // });

      sails.log.debug('-->Total Original Size of Elements:',config._totalSize,'>',
      'Total Size of Elements Found:',articleListData.length);
      articleListData.some(function (article,index) {
        sails.log.debug('-i:',index+1,'id:',article.id,'>:',article.success || article.title,'+:',article.updatedAt);
        articlesList.push(ArticleService.getArticleStructure(article));
        return articlesList.length === config._limit;
      });

      resolve({
        size:articleListData.length, // Total Size of Elements
        total:articlesList.length, // Number Elements respect to limit & state
        results:articlesList //Elements
      });
    });
  },
  getArticleListByQuery : function (articleQuery,whereQuery){
    return new Promise(function(resolve){

      var blacklist = ['general', 'date'];
      var whereGeneral = [];
      var whereDate = [];

      delete articleQuery._criteria['limit'];

      articleQuery.then(function (articles){

        // Omit built-in runtime config (like query modifiers)
        whereGeneral = _.pick(whereQuery, 'general');
        whereDate = _.pick(whereQuery, 'date');
        whereQuery = _.omit(whereQuery, blacklist);


        if(!_.isEmpty(whereGeneral))
        {
          sails.log('->Query General');
          articles = self.filterGeneral(articles,whereGeneral);
        }

        if(!_.isEmpty(whereQuery) && !_.isNull(whereQuery))
        {
          sails.log('->Query By Params');
          articles = self.filterByParams(articles,whereQuery);
        }

        sails.log.debug('-->After of Query');
        _.each(articles,function (el) {
          sails.log.debug(el.id,'>:',el.title,'sc:',el.success);
        });

        articles.sort(function(a, b) {
          return b.success - a.success;
        });

        ArticleQueryService.getArticleListBase(articles)
        .then(function (response) {
          resolve(response);
        });
      });
    });
  },
  getArticleListNormal : function (articleQuery){
    return new Promise(function(resolve){
      articleQuery.then(function (articles){

        articles.sort(function(a, b) {
          return (b.date - a.date)+(b.id - a.id);
        });

        ArticleQueryService.getArticleListBase(articles)
        .then(function (response) {
          response.size = config._totalSize;
          resolve(response);
        });
      });
    });
  },
  getArticleListRecommend : function (articleQuery){
    return new Promise(function(resolve){

      delete articleQuery._criteria['limit'];

      articleQuery.then(function (articles){

        articles.sort(function(a, b) {
          return ArticleService.getRecom(b.likes.length,b.shares.length,b.visits.length) -
                        ArticleService.getRecom(a.likes.length,a.shares.length,a.visits.length);
        });

        ArticleQueryService.getArticleListBase(articles)
        .then(function (response) {
          resolve(response);
        });

      });
    });
  },
  getArticleListByCreator : function (articleQuery,creator){
    return new Promise(function(resolve){

      delete articleQuery._criteria['limit'];


      User.findOne({name:creator}).then( function(creatorRecord){

        sails.log.debug('+ Filter By Creator >'+JSON.stringify(creatorRecord));

        articleQuery.where({'creator':creatorRecord.id});

        articleQuery.then(function (articles){
          articles.sort(function(a, b) {
            return b.date - a.date;
          });

          ArticleQueryService.getArticleListBase(articles)
          .then(function (response) {
            resolve(response);
          });
        })
        .catch(function(err){
          sails.log.error(err);
        });

      });

    });
  },
  getArticleListByCategory : function (articleQuery,category){
    return new Promise(function(resolve){
      delete articleQuery._criteria['limit'];
      articleQuery.then(function (articles){

        articles = _.map(articles,function (article) {
          var exist = _.find(article.categories, function(acElem) {
            return acElem.name == category;
          });

          if(exist)
            return article;
        });


        articles.sort(function(a, b) {
          return b.date - a.date;
        });

        ArticleQueryService.getArticleListBase(articles)
        .then(function (response) {
          resolve(response);
        });

      });
    });
  }
};
