(function () {
  'use strict';

  function ShareFactory($window)
  {
    return {
			init: function(fbId) {
				if (fbId) {
					this.fbId = fbId;
					$window.fbAsyncInit = function() {
						FB.init({
							appId: fbId,
							channelUrl: 'app/channel.html',
							status: true,
							xfbml: true
						});
					};
					(function(d) {
						var js,
							id = 'facebook-jssdk',
							ref = d.getElementsByTagName('script')[0];
						if (d.getElementById(id)) {
							return;
						}

						js = d.createElement('script');
						js.id = id;
						js.async = true;
						js.src = "//connect.facebook.net/en_US/all.js";

						ref.parentNode.insertBefore(js, ref);

					}(document));
				} else {
					throw ("FB App Id Cannot be blank");
				}
			}
		};
  }

  function ShareCtrl($scope)
  {
    var $share = this;
    $share.count = 0;
    $share.state = false;
    $share.model = 0;
    $share.stats = 0;
    $share.article_uid = "";
      $share.setShare = function() {
        $share.count++;
        $share.state = !$share.state;
      };


  }

  angular.module('app.main.article.share', [])
         .factory('ShareFactory',ShareFactory)
         .controller('ShareCtrl',ShareCtrl)
         .directive('share', function($q,$log,partial){
           return {
               restrict: 'EA',
               scope: {
                 stats: "=",
                 source: "="
               },
               transclude: true,
               controller: 'ShareCtrl',
               controllerAs: '$share',
               templateUrl: partial.main.article+'tpl/share.cmp.html',
               link: function(scope, element, attr) {
        					element.unbind();
        					element.bind('click', function(e) {
        						FB.ui({
        							method: 'share',
        							href: scope.source.url
        						}, function(response){
                      $log.debug(response);
                      attr.stats = attr.stats+1;
        						});
        						e.preventDefault();
        					});

          			}
            };

         });
})();
