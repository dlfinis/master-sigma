/* global WebFont */
(function () {
  'use strict';

  function FontLoaderFactory () {
    return {
      setFonts : function () {
        WebFont.load({
          custom: {
            families: [ 'FontAwesome','Ubuntu','Oxygen','Open Sans' ],
            urls: [ '/fonts/base.css']
          }
        });
      }
    };
  }
  angular.module('app.core.fontloader', [])
         .factory('FontLoader',FontLoaderFactory);
})();
