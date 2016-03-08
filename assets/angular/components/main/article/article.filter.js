;(function () {
  'use strict';

  function DateFormatFilter($filter)
  {
   return function(input)
   {
    if(input == null){ return ""; }
    var _date = $filter('date')(new Date(input), "EEEE,dd 'de' MMMM 'del' yyyy");
    return _date;
   }
 };

  angular.module('app.main.article')
         .filter('DateFormat',DateFormatFilter)

})()
