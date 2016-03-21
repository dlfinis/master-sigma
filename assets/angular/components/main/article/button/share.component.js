;(function () {
  'use strict';

  function ShareCtrl($scope)
  {
    var $share = this;
    $share.count = 0;
    $share.state = false;
    $share.model = 0;
    $share.article_uid = "";
      $share.setShare = function() {
        $share.count++;
        $share.state = !$share.state;
      };
  };

  angular.module('app.main.article.share', [])
         .controller('ShareCtrl',ShareCtrl)
         .directive('share', function(partial){
           return {
               restrict: 'EA',
               scope: {
                 uid: "@",
                 state: "="
               },
               controller: 'ShareCtrl',
               controllerAs: '$share',
               template:
               `
               <button type="button"
                       class="btn btn-primary"
                       article-uid="$share.uid"
                       ng-model="$share.state"
                       uib-btn-checkbox
                       btn-checkbox-true="true"
                       btn-checkbox-false="false">
                <img src="/icons/share.png" />
               </button>
              <!--<p>{{$share.state}}</p>-->
               `,
           };
         });

})()
