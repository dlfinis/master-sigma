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
      "description"   : { "type" : "string" },
      "title"  : { "type" : "string" },
      "date"  : { "type" : "string" },
      "editor"  : { "type" : "string" }
    }
  };

  function AdvancedSearchFactory ($http,$q,$log) {
    return {
      find : function (query) {
        return $http.get('/api/article/findElems',
          {
            params : {query:query}
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


    $element.querySelectorAll('#btn-search').bind('click', function (event) {
      var vstr = $element.querySelectorAll('#txt-search').val();
      $search.getArticlesElems(vstr);
    });

    $element.querySelectorAll('#txt-search').bind('keydown', function(event) {
      if(event.which === 13 ) {
        var vstr = $element.querySelectorAll('#txt-search').val();
        $search.getArticlesElems(vstr);
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

    $search.getArticlesElems = function (vstr){
      $search.query = vstr;
      if(!vstr) {
        $articlelist.setNormalList();
      }

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
              source: '=',
              query: '='
            },
            bindToController: true,
            controller: 'AdvancedSearchCtrl',
            controllerAs: '$search',
            require: '^articlelist',
            templateUrl: partial.main.article+'tpl/advancedSearch.cmp.html'
            // link : function(scope, $element, attrs, controller) {
            //   // $log.debug(element.children());
            //   // $log.debug(element.querySelectorAll('#options'));
            //   // $log.debug(element.querySelectorAll('.input-group'));
            //   //
            //   // element.parent().bind('mouseenter', function() {
            //   //   // element.show();
            //   //   console.log('MEnter');
            //   // });
            //   // element.parent().bind('mouseleave', function() {
            //   //   // element.hide();
            //   //   console.log('MLeave');
            //   // });
            //   // element.querySelectorAll('#options').bind('mouseenter', function (e) {
            //   //     console.log('+ Options');
            //   //     console.log(e);
            //   // });
            //   // element.querySelectorAll('#options').bind('click', function (e) {
            //   //     console.log(e);
            //   // });
            //
            //   // element.querySelectorAll('#search-icon').bind('click', function(event) {
            //   //   console.log(event);
            //   //   // angular.element(this).addClass('hidden');
            //   //   element.querySelectorAll('#collection').toggleClass('hidden');
            //   // });
            //   // element.querySelectorAll('#options').bind('click', function(event) {
            //   //   console.log('Options');
            //   // });
            //   // element.querySelectorAll('#btn-search').bind('click', function(event) {
            //   //   console.log('Options');
            //   // });
            //   // element.bind('mouseleave', function() {
            //   //   // element.hide();
            //   //   console.log('MLeave');
            //   //   $timeout(function () {
            //   //
            //   //     console.log('Hidd Search');
            //   //     element.querySelectorAll('#collection').toggleClass('hidden');
            //   //   }, 5000);
            //   // });
            //
            //   function getArticlesElems(){
            //     var vstr = element.querySelectorAll('#txt-search').val();
            //
            //     if(!vstr) return false;
            //
            //     console.log(scope);
            //     console.log(controller);
            //     $log.debug('+ is JSON search ',controller.isValidJSON(vstr));
            //     if(controller.isValidJSON(vstr))
            //     {
            //       $log.debug('+ Send json search string ',vstr);
            //       controller.getArticlesList(vstr);
            //     }
            //   }
            //
            //   element.querySelectorAll('#btn-search').bind('click', function (e) {
            //       console.log('+ Bind');
            //       getArticlesElems();
            //   });
            //
            //   element.querySelectorAll('#txt-search').bind('keydown', function(event) {
            //
            //     if(event.which === 13 ) {
            //       getArticlesElems();
            //       event.preventDefault();
            //     }
            //   });
            // }
          };
        });

})(angular.module('app.main.article.advancedSearch',['app.config']));
