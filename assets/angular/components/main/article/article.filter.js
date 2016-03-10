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


function CategoryFormatFilter($filter){
 // return function(input, attribute) {
 //    if (!angular.isObject(input)) return input;
 //
 //    var array = [];
 //    for(var objectKey in input) {
 //        array.push(input[objectKey]);
 //    }
 //
 //    array.sort(function(a, b){
 //        a = parseInt(a[attribute]);
 //        b = parseInt(b[attribute]);
 //        return a - b;
 //    });
 //    return array;
 // }
 return function(){

 }
};

function PropsFormatFilter() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
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
  }
};

  angular.module('app.main.article')
         .filter('DateFormat',DateFormatFilter)
         .filter('CategoryFormat',CategoryFormatFilter)
         .filter('PropsFormat',PropsFormatFilter)
         .filter('propsFilter', function() {
            return function(items, props) {
              var out = [];

              if (angular.isArray(items)) {
                items.forEach(function(item) {
                  var itemMatches = false;

                  var keys = Object.keys(props);
                  for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
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
          }
})

})()
