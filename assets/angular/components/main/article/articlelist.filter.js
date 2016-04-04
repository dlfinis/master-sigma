(function () {
  'use strict';

  function StartFromFilter() {
    return function(input, start) {
        console.log(input);
        console.log(start);
        start = +start; //parse to int
        return input.slice(start);
    };
  }

  function DateFormatFilter($filter)
  {
   return function(input)
   {
    if(input == 'null'){ return ""; }
    var _date = $filter('date')(new Date(input), "EEEE,dd 'de' MMMM 'del' yyyy");
    return _date;
  };
 }

function PropsFormatFilter() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
            // console.log("Item:",item[prop]);

          var prop = keys[i];

          if(props[prop] === undefined ) {
            itemMatches = true;
            break;
          }

          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
}


  angular.module('app.main.article')
         .filter('StartFrom',StartFromFilter)
         .filter('PropsFormat',PropsFormatFilter)
         .filter('DateFormat',DateFormatFilter);

})();
