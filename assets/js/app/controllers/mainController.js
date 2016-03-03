angular.module("app.controllers", ["app.factories"])

.controller("homeCtrl", function($scope, PostsFactory)
{
    PostsFactory.get().
    success(function(res)
    {
        $scope.posts = res;
    })
    .error(function(error)
    {
        console.log(error)
    })
})

.controller("profileCtrl", function($scope)
{

})

.controller("testCtrl", function($scope)
{
  // BUTTONS ======================

  // define some random object
  $scope.bigData = {};

  $scope.bigData.breakfast = false;
  $scope.bigData.lunch = false;
  $scope.bigData.dinner = false;
  $scope.bigData.test = true;

  $scope.count = 0;
  $scope.myFunction = function() {
    $scope.count++;
  }

  var services = [
  { name:'Service A' },
  { name:'Service B', selected:true },
  { name:'Service C' },
  { name:'Service D', selected:true }
];

$scope.availability = { services:services };
  $scope.singleModel = 1;
  
$scope.rate = 3;
  $scope.max = 5;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];

})
