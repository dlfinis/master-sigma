(function () {
  'use strict';

  var DateDiff = {
      inMinutes: function(d1, d2) {
          var t2 = d2.getTime();
          var t1 = d1.getTime();
          return parseInt((t2-t1)/(60*1000));
      },
      inHours: function(d1, d2) {
          var t2 = d2.getTime();
          var t1 = d1.getTime();
          return parseInt((t2-t1)/(3600*1000));
      },
      inDays: function(d1, d2) {
          var t2 = d2.getTime();
          var t1 = d1.getTime();
          return parseInt((t2-t1)/(24*3600*1000));
      },
      inWeeks: function(d1, d2) {
          var t2 = d2.getTime();
          var t1 = d1.getTime();
          return parseInt((t2-t1)/(24*3600*1000*7));
      },
      inMonths: function(d1, d2) {
          var d1Y = d1.getFullYear();
          var d2Y = d2.getFullYear();
          var d1M = d1.getMonth();
          var d2M = d2.getMonth();
          return (d2M+12*d2Y)-(d1M+12*d1Y);
      },
      inYears: function(d1, d2) {
          return d2.getFullYear()-d1.getFullYear();
      }
  };
  var DateLabel = {
      main : 'Hace',
      now: 'Hace poco',
      yesterday: 'Ayer',
      min: 'min',
      hour: 'hr',
      day: 'día',
      month: 'mes',
      year: 'año'
  };

  function getTimePublished(datePost){
    moment.locale('es');

    var d1 = new Date(datePost);
    var d2 = new Date();

    var dayPublished = (moment(d1).format('MMM DD,YYYY'));
    dayPublished = dayPublished.charAt(0).toUpperCase() +
                    dayPublished.substr(1).toLowerCase();
    var dayMonthPublished = (moment(d1).format('MMM DD'));
    dayMonthPublished = dayMonthPublished.charAt(0).toUpperCase() +
                          dayMonthPublished.substr(1).toLowerCase();

    var dateDiff = DateLabel.main;

    var minsDiff = DateDiff.inMinutes(d1,d2);
    var hoursDiff = DateDiff.inHours(d1,d2);
    var daysDiff = DateDiff.inDays(d1,d2);
    var monthsDiff = DateDiff.inMonths(d1,d2);
    var yearsDiff = DateDiff.inYears(d1,d2);


    if(minsDiff < 5)
      dateDiff = DateLabel.now;

    if(minsDiff >= 5  && minsDiff < 60 )
      dateDiff = DateLabel.main+' ' + minsDiff +' '+DateLabel.min+(minsDiff == 1 ? '':'s');

    if(hoursDiff > 0 && hoursDiff < 24 )
      dateDiff = DateLabel.main+' ' + hoursDiff +' '+DateLabel.hour+(hoursDiff == 1 ? '':'s');

    if(hoursDiff > 23 && hoursDiff < 48 )
      dateDiff = DateLabel.yesterday;

    if(daysDiff > 0 && daysDiff < 4 )
        dateDiff = DateLabel.main+' ' + daysDiff +' '+DateLabel.day+(daysDiff == 1 ? '':'s');

    if(daysDiff >= 4 && monthsDiff <= 12)
        dateDiff = dayMonthPublished;

    if(monthsDiff == 1)
        dateDiff = DateLabel.main+' ' + monthsDiff +' '+ DateLabel.month;

    if(monthsDiff >= 1 && monthsDiff <= 12)
        dateDiff = dayMonthPublished;

    if(yearsDiff == 1 && monthsDiff <= 13 )
        dateDiff = DateLabel.main+' ' + yearsDiff +' '+ DateLabel.year;

    if(monthsDiff > 13 )
        dateDiff = dayPublished;

  return dateDiff;

  }

  function PeriodCtrl($scope)
  {
    var $period = this;
    $period.getPeriodInfo = function(date){
        return getTimePublished(date);
    };
  }

  angular.module('app.main.article.period',['app.config'])
         .controller('PeriodCtrl',PeriodCtrl)
         .directive('period', function(partial,$q){
           return {
               restrict: 'EA',
               scope: {
                 data: "@"
               },
               controller: 'PeriodCtrl',
               controllerAs: '$period',
               template: '<div ng-bind="period"></div>',
               link: function(scope, element, attrs,controller){
                  scope.period = controller.getPeriodInfo(scope.data);
              }
           };
         });

})();
