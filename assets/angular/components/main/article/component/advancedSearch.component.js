/*eslint quotes: [0, "single"]*/
/*global tv4 */
(function(module) {
  'use strict';

  // var schemaT = {
  //   "type": "object",
  //   "properties": {
  //     "foo": {
  //       "properties": {
  //         "test": {
  //           "type": "string"
  //         }
  //       },
  //       "type": "object"
  //     }
  //   },
  //   "required": ["foo"]
  // };

  var schema = {
    "type" : "object",
    "properties" : {
      "general"   : { "type" : "string" },
      "description"   : { "type" : "string" },
      "title"  : { "type" : "string" },
      "date"  : {
        "properties" :{
          "before"  : { "type" : "string" },
          "after"  : { "type" : "string" }
        }
      },
      "creator"  : { "type" : "string" },
      "not"  : { "type" : "string" }
    }
  };

  function AdvancedSearchFactory ($http) {
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

  function AdvancedSearchCtrl ($scope,$element,$attrs,$filter,$q,$log,AdvancedSearchFactory) {
    var $search = this;
    var $articlelist = $scope.$parent.$articlelist || undefined;

    $search.params = {};
    $search.dateformat = 'before';

    $search.dateOptions = {
      formatYear: 'yyyy',
      maxDate: new Date(),
      startingDay: 1,
      showWeeks: false
    };

    $search.datepopup = {
      open : function(event) {
        event.preventDefault();
        event.stopPropagation();
        $search.datepopup.opened = true;
      },
      opened : false
    };

    $search.dateformat = {
      set : function(event) {
        $search.dateformat.value = event.target.id === 'dt-before' ? 'before' : 'after' ;
      },
      value : 'before'
    };

    var wtxt_search = angular.element(document.getElementById('txt-search'))[0].clientWidth+2;
    if(wtxt_search > 2) angular.element(document.getElementById('search-box')).css('width',wtxt_search+'px');

    var click_options = false;
    $element.querySelectorAll('#options').bind('click', function (event) {

      click_options = !click_options;
      if(click_options) //Not visible
      {
        $element.querySelectorAll('#search-box').css('display','block');
        var vstr = $element.querySelectorAll('#txt-search').val();
        var prms = $search.convertInParam(vstr);
        $search.passParamsToModels(prms);
        angular.element(document.getElementById('txt-search'))[0].disabled = true;
      }
      else // Is visible
      {
        angular.element(document.getElementById('txt-search'))[0].disabled = false;
        $element.querySelectorAll('#search-box').css('display','none');
      }
    });

    $element.querySelectorAll('#btn-form-search').bind('click', function (event) {
      $search.getArticlesElems();
      $element.querySelectorAll('#options').triggerHandler('click');
    });

    $element.querySelectorAll('#btn-txt-search').bind('click', function (event) {
      // $search.getArticlesElems();
      var vstr = $element.querySelectorAll('#txt-search').val();
      if(!click_options)
      {
        var prms = $search.convertInParam(vstr);
        $search.passParamsToModels(prms);
        $search.getArticlesElems();
      }else{
        $search.getArticlesElems();
        $element.querySelectorAll('#options').triggerHandler('click');
      }
    });

    $element.querySelectorAll('#txt-search').bind('keydown', function(event) {
      if(event.which === 13 ) {
        var vstr = $element.querySelectorAll('#txt-search').val();
        var prms = $search.convertInParam(vstr);
        $search.passParamsToModels(prms);
        $search.getArticlesElems();
        event.preventDefault();
      }
    });

    $element.querySelectorAll('#search-box').find('input')
    .bind('keydown', function(event) {
      if(event.which === 13 ) {
        $search.getArticlesElems();
        $element.querySelectorAll('#options').triggerHandler('click');
        event.preventDefault();
      }
    });

    $search.clean = function () {
      $search.params = {};
      $search.dateformat.value = 'before';
      $scope.apply();
    };

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
      // var gprms = str.match(/\w+\:\(([^)]+)\)/gi);
      // var rprms = str.match(/[A-zÀ-ÿ0-9]+\:[A-zÀ-ÿ0-9]+|[A-zÀ-ÿ0-9]+/ig);
      // var rprms = str.match(/([A-zÀ-ÿ0-9]+\:[A-zÀ-ÿ0-9]+)|(\w+\:+\([^)]+\)+)|([A-zÀ-ÿ0-9])+/ig);

      var _rgw = /[A-zÀ-ÿ0-9]+/ig;
      var rprms = str.match(/([A-zÀ-ÿ0-9]+\:\d{4}-\d{2}-\d{2}|[A-zÀ-ÿ0-9]+\:\d{4}\/\d{2}\/\d{2})|([A-zÀ-ÿ0-9]+\:[A-zÀ-ÿ0-9]+)|(\w+\:+\([^)]+\)+)|([A-zÀ-ÿ0-9]+)/ig);
      var prms = {};

      angular.forEach(rprms,function (rpElem) {
        if(rpElem.indexOf(':') > -1)
        {
          var cstr = rpElem;
          var ckey = cstr.substring(0,cstr.indexOf(':')).toLowerCase();
          if(rpElem.indexOf(':(') === -1)
          {
            if(schema.properties.hasOwnProperty(ckey) > -1)
              prms[ckey] = cstr.substring(cstr.indexOf(':')+1,cstr.length);
            else
              prms.general = prms.general ? prms.general : '' + cstr.match(_rgw).join(' ');
          }
          else{
            var acstr = cstr.substring(cstr.indexOf(':')+1,cstr.length).match(_rgw);
            prms[ckey] = acstr.join(' ');
          }
        }
        else {
          prms.general = (prms.general || '') + ' ' + rpElem;
        }
      });

      return prms;
    };

    $search.passParamsToModels = function (oPrms) {
      angular.forEach(oPrms,function (opValue,opKey) {
        if(opKey === 'after' || opKey === 'before' || opKey === 'date')
        {
          $log.debug('Data Model');
          if(Date.parse(opValue))
          {
            $search.dateformat.value = opKey === 'after' ? 'after' : 'before';
            $search.params['date'] = new Date(opValue);
          }
        }
        else {
          $search.params[opKey] = opValue;
        }
      });

      $log.debug('> Params to Model');
      $log.debug($search.params);
      $scope.$apply();
      $search.txt = '';
    };

    $search.getParam = function () {

      $search.txt = '';
      var prms = $search.params;
      var prm_date = {};

      if(prms.hasOwnProperty('date'))
      {
        $search.txt += $search.dateformat.value + ':' + $filter('date')(prms['date'], "yyyy/MM/dd") + ' ';
        prm_date[$search.dateformat.value] = prms['date'];
        delete prms['date'];
      }

      angular.forEach(prms, function(value, key) {
        if(!angular.isUndefined(value) && value !== '' )
        {

          if(key === 'general')
          {
            $search.txt +=  value + ' ';
          }
          else if(value.match(/([A-zÀ-ÿ0-9])+/gi).length === 1) //Only One word prm
            $search.txt += key + ':' + value + ' ';
          else{
            $search.txt += key + ':(' + value + ') ';
          }

        }else {
          delete prms[key];
        }
      });

      if(Object.keys(prm_date).length > 0)
        prms.date = prm_date;


      $search.params = {};
      if($search.queryParams !== undefined) $search.queryParams = $search.txt;
      $scope.$apply();

      return JSON.stringify(prms);
    };

    $search.getArticlesElems = function (str){
      var vstr = str || $search.getParam();

      $log.debug('> is JSON search ',$search.isValidJSON(vstr));

      if($search.isValidJSON(vstr))
      {
        $log.debug('+ Send json search string ',vstr);
        if($articlelist) $search.getArticlesList(vstr);
      }
    };
  }

  module.factory('AdvancedSearchFactory',AdvancedSearchFactory)
        .controller('AdvancedSearchCtrl',AdvancedSearchCtrl)
        .directive('advancedSearch', function( partial){
          return {
            restrict: 'EA',
            scope: {
              model: '=ngModel',
              source: '=',
              queryParams: '='
            },
            bindToController: true,
            controller: 'AdvancedSearchCtrl',
            controllerAs: '$search',
            require: '^articlelist',
            templateUrl: partial.main.article+'tpl/advancedSearch.cmp.html'
          };
        });

})(angular.module('app.main.article.advancedSearch',['app.config']));
