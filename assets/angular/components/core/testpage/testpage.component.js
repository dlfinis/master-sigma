(function(){
  'use strict';

  angular.module('app.core.testpage', ['app.config'])
  .factory('TestPageFactory',TestPageFactory)
  .controller('TestPageCtrl',TestPageCtrl)
  .directive('testpage',function (partial) {
    return {
      scope: {},
      controller: 'TestPageCtrl',
      controllerAs: 'sc',
      template:
                '<h4>TEST PAGE</h4>'+
                '<pre>{{sc.ok}}</pre>'
     };
  });

  function TestPageFactory ($q, $rootScope, $location,$http) {
    return {
      isOK: function()
      {
          return 'OK';
      }
    };
  }

  function TestPageCtrl(TestPageFactory,$sce){
    var sc = this;
    sc.ok = TestPageFactory.isOK();
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

})();
