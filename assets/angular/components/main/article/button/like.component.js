;(function () {
  'use strict';

  function LikeCtrl($scope)
  {
    var $like = this;
    $like.count = 0;
    $like.state = false;
    $like.model = 0;
    $like.article_uid = "";
      $like.setLike = function() {
        $like.count++;
        $like.state = !$like.state;
      };
  };

  angular.module('app.main.article.like', [])
         .controller('LikeCtrl',LikeCtrl)
         .directive('like', function(partial){
           return {
               restrict: 'EA',
               scope: {
                 uid: "@",
                 state: "="
               },
               controller: 'LikeCtrl',
               controllerAs: '$like',
               template:
               `
               <button type="button"
                       class="btn btn-primary"
                       article-uid="delta"
                       ng-model="$like.state"
                       uib-btn-checkbox
                       btn-checkbox-true="true"
                       btn-checkbox-false="false">
                <img src="/icons/thumb.png" />
               </button>
               <p>{{$like.state}}</p>
               `,
           };
         });

})()
