(function(){
  'use strict';

  angular.module('app.core.testpage', ['app.config'])
  .factory('TestPageFactory',TestPageFactory)
  .controller('TestPageCtrl',TestPageCtrl)
  .directive('testpage',function (partial) {
    return {
      restricti:'EA',
      scope: {
        data : '=',
        datad : "@",
        dg : "=",
      },
      controller: function($scope) {
           // I want `data` to be injected from the resolve...
           // as it would if this was a "standalone" controller
           console.log('$scope.data: '+ $scope.data);
         },
      template:
                '<h2>TEST PAGE</h2>'+
                '<pre>{{ok}}</pre>'+
                '</br>'+
                '<h4>{{datat}</h4>'+
                '<h4>{{sc}</h4>'
     };
  });


  function TestPageFactory ($q, $timeout,$rootScope, $location,$http) {
    return {
      isOK: function()
      {
          return 'OK';
      },
      getSlowData: function () {
        console.log(" + Get Data");
        return $timeout(function(){
          console.log("Slow Data");
          return "Slow Data";
        }, 5000);
      }
    };
  }

  function TestPageCtrl(TestPageFactory,$scope,$sce, $element, $attrs){
    var sc = $scope;
    sc.ok = TestPageFactory.isOK();
    sc.datat = sc.data;
    console.log(sc.datat);
    console.log(sc.datad);
    console.log(sc.dg);
    console.log(sc);
    var tc = {};
  tc.rurl = $sce.trustAsResourceUrl("http://i.blogs.es/28348d/captura-de-pantalla-619-/650_1200.jpg");
  // tc.turl = $sce.getTrustedUrl("http://i.blogs.es/28348d/captura-de-pantalla-619-/650_1200.jpg");
  // tc.url = $sce.trustAsUrl("http://i.blogs.es/28348d/captura-de-pantalla-619-/650_1200.jpg");
  // tc.rjs = $sce.trustAsResourceUrl("http://html5shim.googlecode.com/svn/trunk/html5.js");
  // tc.tjs = $sce.getTrustedUrl("http://html5shim.googlecode.com/svn/trunk/html5.js");
  // tc.js = $sce.trustAsJs("http://html5shim.googlecode.com/svn/trunk/html5.js");
  // tc.rcss = $sce.trustAsResourceUrl("http://img.weblogssl.com/css/genbeta/v7/ie7.css");
  // tc.tcss = $sce.getTrustedCss("http://img.weblogssl.com/css/genbeta/v7/ie7.css");
  // tc.css = $sce.trustAsCss("http://img.weblogssl.com/css/genbeta/v7/ie7.css");
    // console.log(tc);
    // console.log(tc.rurl.toString());
  }

  // TestPageCtrl.$inject

})();
