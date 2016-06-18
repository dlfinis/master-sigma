/*eslint quotes: [0, "single"]*/
/*global tv4 */
(function(module) {
  'use strict';

  var schemaT = {
    "type": "object",
    "properties": {
      "foo": {
        "properties": {
          "test": {
            "type": "string"
          }
        },
        "type": "object"
      }
    },
    "required": ["foo"]
  };

  var schema = {
    "type" : "object",
    "properties" : {
      "general"   : { "type" : "string" },
      "description"   : { "type" : "string" },
      "title"  : { "type" : "string" },
      "date"  : { "type" : "string" },
      "creator"  : { "type" : "string" }
    }
  };

  function AdvancedSearchFactory ($http,$log) {
    return {
      find : function (query) {
        return $http.get('/api/article/findElems',
          {
            params : { query : query }
          });
      },
      validateJSON : function (str) {
        try{
          //$log.error(JSON.stringify(tv4.error, null, 4));
          return tv4.validate(JSON.parse(str),schema);
        }
        catch (e){
          return false;
        }
      }
    };
  }

  function AdvancedSearchCtrl ($scope,$element,$attrs,$q,$log,AdvancedSearchFactory) {
    var $search = this;
    var $articlelist = $scope.$parent.$articlelist || undefined;
    var whitelist = ['title','description','creator','date','general'];

    $search.params = {};


    var click_options = false;
    $element.querySelectorAll('#options').bind('click', function (event) {

      click_options = !click_options;
      if(click_options)
      {
        $element.querySelectorAll('#search-box').css('display','block');
        var vstr = $element.querySelectorAll('#txt-search').val();
        var prms = $search.convertInParam(vstr);
        console.log(prms);
        $search.passParamsToModels(prms);
        console.log($search.params);
      }
      else
        $element.querySelectorAll('#search-box').css('display','none');

    });

    $element.querySelectorAll('#btn-txt-search').bind('click', function (event) {
        $search.getArticlesElems();
    });

    $element.querySelectorAll('#btn-search').bind('click', function (event) {
        // $search.getArticlesElems();
        var vstr = $element.querySelectorAll('#txt-search').val();
        var prms = $search.convertInParam(vstr);
        $search.passParamsToModels(prms);
        console.log($search.params);
    });

    $element.querySelectorAll('#txt-search').bind('keydown', function(event) {
      if(event.which === 13 ) {
        var vstr = $element.querySelectorAll('#txt-search').val();
        var prms = $search.convertInParam(vstr);
        $search.passParamsToModels(prms,$search.params);
        event.preventDefault();
      }
    });

    $element.querySelectorAll('#txt-title #txt-description #txt-creator #txt-general')
    .bind('keydown', function(event) {
      if(event.which === 13 ) {
        $search.getArticlesElems();
        event.preventDefault();
      }
    });

    $search.isValidJSON = function (str) {
      return AdvancedSearchFactory.validateJSON(str);
    };

    $search.getArticlesList = function (query) {
      AdvancedSearchFactory.find(query)
      .then(function (response) {
        if($articlelist)
        {

          $articlelist.setPagination(
            response.data.results,
            response.data.size,
            $articlelist.perPage
          );
        }
      })
      .catch( function(err){
        $log.error(err);
        $scope.source = [];
      });
    };

    $search.convertInParam = function (str) {
        var rprms = str.match(/[A-zÀ-ÿ0-9]+\:[A-zÀ-ÿ0-9]+|[A-zÀ-ÿ0-9]+/ig);
        var prms = {};

        angular.forEach(rprms,function (rpElem) {
          if(rpElem.indexOf(':') > -1)
          {
            var cstr = rpElem;
            var ckey = cstr.substring(0,cstr.indexOf(':')).toLowerCase();
              prms[ckey] = cstr.substring(cstr.indexOf(':')+1,cstr.length);
            // if(whitelist.hasOwnProperty(ckey))
            //   prms[ckey] = cstr.substring(cstr.indexOf(':')+1,cstr.length);
            // else
            //   prms.general = prms.general ? prms.general : '' + cstr;
          }
          else {
            prms.general = prms.general ? prms.general : '' + rpElem;
          }
        });

        return prms;
    };

    $search.passParamsToModels = function (oPrms) {
      angular.forEach(oPrms,function (opValue,opKey) {
        $search.params[opKey] = opValue;
      });
      $scope.$apply();
    };

    $search.getParam = function () {

      $search.txt = '';
      var prms = $search.params;
      angular.forEach(prms, function(value, key) {
        if(!angular.isUndefined(value) && value !== '')
        {
          $search.txt += key + ':' + value + ' ';
        }else {
          delete prms[key];
        }
      });

      $search.params = {};
      $element.querySelectorAll('#options').triggerHandler('click');

      return JSON.stringify(prms);
    };

    $search.getArticlesElems = function (str){
      var vstr = str || $search.getParam();

      if($search.query) $search.query = vstr;

      $log.debug('+ is JSON search ',$search.isValidJSON(vstr));

      if($search.isValidJSON(vstr))
      {
        $log.debug('+ Send json search string ',vstr);
        $search.getArticlesList(vstr);
      }
    };
  }

  module.factory('AdvancedSearchFactory',AdvancedSearchFactory)
        .controller('AdvancedSearchCtrl',AdvancedSearchCtrl)
        .directive('advancedSearch', function( partial,$log,$q,$timeout){
          return {
            restrict: 'EA',
            scope: {
              model: '=ngModel',
              source: '=',
              query: '='
            },
            bindToController: true,
            controller: 'AdvancedSearchCtrl',
            controllerAs: '$search',
            require: '^articlelist',
            templateUrl: partial.main.article+'tpl/advancedSearch.cmp.html'
          };
        });

})(angular.module('app.main.article.advancedSearch',['app.config']));
