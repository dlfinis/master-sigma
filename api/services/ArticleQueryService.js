/**
 * ArticleFBService
 *
 * @description :: Server-side logic for managing your account
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 /*global Article User Like Share ArticleFBService ArticleQueryService ArticleService UserService*/
 /*eslint no-unused-vars: 0*/

var Promise = require('bluebird');

var _limit;
var _size;
var _skip;
var _successRate = 0.5;

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
    if (!str) { return ''; }

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
  _querySuccessRate : _successRate
  ,
  searchString : function (str,wstr){
    if(_.isArray(str)) str = JSON.stringify(str);
    return self._accentFold(str).search(new RegExp(self._accentFold(wstr), 'i')) > -1;
  },
  isSuccessfulQuery : function (arr,cnt){
    return !!(cnt >= (Math.round(_.size(arr)*self._querySuccessRate)));
  },
  matchWord : function (content,prms) {
    var success = 0;
    if(_.isArray(content)) content = JSON.stringify(content);
    if(_.isArray(prms)){
      _.each(prms,function(pElem){ if(self.searchString(content,pElem)) success = success +1;});
      if(self.isSuccessfulQuery(prms,success)) return success;
      else return 0;
    }
    else{
      return self.searchString(content,prms);
    }
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
    ArticleQueryService.setTotalSize(); // All size of articles in DB
    return Article.find()
                        .limit(ArticleQueryService.setLimit(req))
                        .skip(ArticleQueryService.setSkip(req))
                        .populate('creator')
                        .populate('categories')
                        .populate('likes')
                        .populate('shares')
                        .populate('visits');
  },
  setLimit: function (req) {
    var DEFAULT_LIMIT = sails.config.blueprints.defaultLimit || 10;
    var limit = req.param('limit') || (typeof req.options.limit !== 'undefined' ? req.options.limit : DEFAULT_LIMIT);
    if (limit) { limit = +limit; }
    ArticleService._limit = limit || sails.config.blueprints.defaultLimit || 10;
    return limit;
  },
  setSkip: function (req) {
    var DEFAULT_SKIP = 0;
    var skip = req.param('skip') || (typeof req.options.skip !== 'undefined' ? req.options.skip : DEFAULT_SKIP);
    if (skip) { skip = +skip; }
    ArticleService._skip = skip;
    return skip;
  },
  setTotalSize: function () {
    ArticleQueryService.getTotalSize().then(function countRecord(size) {
      ArticleQueryService._size = size;
    });
  },
  getTotalSize : function (){
    return new Promise(function (resolve){
      Article.count().exec(function countCB(err, found){
        if(err) sails.log.warn(err);
        resolve(found);
      });
    });
  },
  getArticleListByQuery : function (articleQuery,whereQuery){
    return new Promise(function(resolve){

      var articlesList = [];
      var blacklist = ['general', 'date'];

      delete articleQuery._criteria['limit'];
      articleQuery.sort('createdAt DESC');

      articleQuery.then(function (articles){

        articles = _.filter(articles,function(aElem){
          var success = 0;
          _.each(_.keys(whereQuery),function(wkElem){ //Parameters of query
            if(_.has(aElem,wkElem))
            {
              var matches = self.matchWord(aElem[wkElem],whereQuery[wkElem]);
              if(matches > 0) success = success + matches;
            }
          });
          aElem.success = success;
          return self.isSuccessfulQuery(whereQuery,success);
        });

        sails.log.debug('After Query');
        _.each(articles,function (el) {
          sails.log.debug(el.id,'>:',el.title,'sc:',el.success);
        });

        sails.log.debug('Sorting');
        articles.sort(function(a, b) {
          return b.success - a.success;
        });

        _.each(articles,function (el) {
          sails.log.debug('ID:',el.id,'+SCQuery',el.success);
        });

        articles.some(function (article,index){
          if(article.state !== 'disable')
            articlesList.push(ArticleService.getArticleStructure(article));
          return articlesList.length >= (ArticleService._limit - 1);
        });

        resolve({
          size:ArticleQueryService._size,
          total:articlesList.length,
          results:articlesList
        });
      });
    });
  },
  getArticleListNormal : function (articleQuery){
    return new Promise(function(resolve){
      var articlesList = [];
      var totalSize = 0;
      articleQuery.sort('updatedAt DESC');
      articleQuery.then(function (articles){

        articles.forEach(function (article){
          if(article.state !== 'disable')
            articlesList.push(ArticleService.getArticleStructure(article));
        });

        articlesList.sort(function(a, b) {
          return (b.date - a.date)+(b.id - a.id);
        });

        resolve (
          {
            size:ArticleQueryService._size, //Total Size of elements in Article
            total:articlesList.length, //Based respect the limit of the query
            results:articlesList //Articles List Data
          });

      });
    });
  },
  getArticleListRecommend : function (articleQuery){
    return new Promise(function(resolve){

      var articlesList = [];

          // articleQuery.limit(totalSize);
      delete articleQuery._criteria['limit'];
      articleQuery.sort('createdAt DESC');

      articleQuery.then(function (articles){
        articles.sort(function(a, b) {
          return ArticleService.getRecom(b.likes.length,b.shares.length,b.visits.length) -
                        ArticleService.getRecom(a.likes.length,a.shares.length,a.visits.length);
        });

            // _.each(articles, function (article){
            //      articlesList.push(ArticleService.getArticleStructure(article));
            // });
        articles.some(function (article,index){
          if(article.state !== 'disable')
            articlesList.push(ArticleService.getArticleStructure(article));
          return articlesList.length >= (ArticleService._limit - 1);
        });
            // articlesList.sort(function(a, b) {
            //     return b.date - a.date;
            // });
            //
            // articlesList.sort(function(a, b) {
            //     return a.recommend - b.recommend;
            // });
        resolve({
          size:ArticleQueryService._size,
          total:articlesList.length,
          results:articlesList
        }
            );
      });
    });
  },
  getArticleListByCreator : function (articleQuery,creator){
    return new Promise(function(resolve){
      var articlesList = [];
      var totalSize = 0;

      articleQuery.sort('createdAt DESC');

      delete articleQuery._criteria['limit'];


      User.findOne({name:creator}).then( function(creatorRecord){
        sails.log.debug('+ Creator >'+JSON.stringify(creatorRecord));
        articleQuery.where({'creator':creatorRecord.id});
        articleQuery
        .then(function (articles){
          articles.some(function (article,index){
            if(article.state !== 'disable')
              articlesList.push(ArticleService.getArticleStructure(article));
            return articlesList.length >= (ArticleService._limit - 1);
          });

          articlesList.sort(function(a, b) {
            return b.date - a.date;
          });

          resolve (
            {
              size:articles.length,
              total:articlesList.length,
              results:articlesList
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
      var articlesList = [];
      var totalSize = 0;
      articleQuery.sort('createdAt DESC');
      articleQuery.then(function (articles){


        articles.some(function (article,index){
          if(article.categories)
                          {
            if(article.state !== 'disable')
                            {
              var exist = _.find(article.categories, function(element) {
                return element.name == category;
              });

              if(exist)
                articlesList.push(ArticleService.getArticleStructure(article));
            }
          }
          return articlesList.length >= (ArticleService._limit - 1);
        });

        articlesList.sort(function(a, b) {
          return b.date - a.date;
        });

        resolve (
          {
            size:articles.length,
            total:articlesList.length,
            results:articlesList
          });


      });
    });
  }
};
