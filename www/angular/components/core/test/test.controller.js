(function() {
  'use strict';

  angular
        .module('app.core.test', [])
        .controller('testCtrl',testCtrl);

  function testCtrl(TestFactory){
    var sc = this;

    sc.ok = TestFactory.isOK();
          // BUTTONS ======================

          // define some random object
    sc.bigData = {};

    sc.bigData.breakfast = false;
    sc.bigData.lunch = false;
    sc.bigData.dinner = false;
    sc.bigData.test = true;

    sc.count = 0;
    sc.myFunction = function() {
      sc.count++;
    };

    var services = [
          { name:'Service A' },
          { name:'Service B', selected:true },
          { name:'Service C' },
          { name:'Service D', selected:true }
    ];

    sc.availability = { services:services };
    sc.singleModel = 1;

    sc.rate = 3;
    sc.max = 5;
    sc.isReadonly = false;

    sc.hoveringOver = function(value) {
      sc.overStar = value;
      sc.percent = 100 * (value / sc.max);
    };

    sc.ratingStates = [
            {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
            {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
            {stateOn: 'glyphicon-heart'},
            {stateOff: 'glyphicon-off'}
    ];
  }
})();
