(function () {
  'use strict';
  function FBLoaderFactory ($rootScope,$log) {
    return {
      setScript: function()
      {
        // If we've already installed the SDK, we're done
        if (document.getElementById('facebook-jssdk')) {return;}

        // Get the first script element, which we'll use to find the parent node
        var firstScriptElement = document.getElementsByTagName('script')[0];
        //  document.getElementsByTagName('head')[0].appendChild(script);
        // Create a new script element and set its id
        var facebookJS = document.createElement('script');
        facebookJS.id = 'facebook-jssdk';

        // Set the new script's source to the source of the Facebook JS SDK
        facebookJS.src = '//connect.facebook.net/es_LA/sdk.js';
        // Debug script
        // facebookJS.src = '//connect.facebook.net/es_LA/sdk/debug.js';

        // Insert the Facebook JS SDK into the DOM
        firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
        // firstScriptElement.insertBefore(facebookJS, firstScriptElement);
        //  document.getElementsByTagName('head')[0].appendChild(facebookJS);

        $log.debug('- Init FB');
        // (function(d, s, id){
        //   var js, fjs = d.getElementsByTagName(s)[0];
        //   if (d.getElementById(id)) {return;}
        //   js = d.createElement(s); js.id = id;
        //   js.src = '//connect.facebook.net/en_US/all.js';
        //   fjs.parentNode.insertBefore(js, fjs);
        // }(document, 'script', 'facebook-jssdk'));
      }
    };
  }
  angular.module('app.core.fb', [])
         .factory('FBLoader',FBLoaderFactory);
})();
