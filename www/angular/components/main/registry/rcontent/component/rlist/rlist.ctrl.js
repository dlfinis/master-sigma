(function (module) {

  function RListCtrl($location, $log, $element, $timeout, AuthFactory){

    var $rlist = this;

    $rlist.back = function () {
      $rlist.return = true;
      window.history.back();
    };

    $rlist.creator = function () {
      AuthFactory.isAuthenticated().then(function (response) {
        $log.debug('+ IS AUTH',response);
        return response;
      });
    };

    $rlist.rowColl = [
       {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
       {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
       {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
   ];
          var nameList = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'];
          var familyName = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];

          $rlist.isLoading = false;
          $rlist.rowCollection = [];


          function createRandomItem() {
              var
                  firstName = nameList[Math.floor(Math.random() * 4)],
                  lastName = familyName[Math.floor(Math.random() * 4)],
                  age = Math.floor(Math.random() * 100),
                  email = firstName + lastName + '@whatever.com',
                  balance = Math.random() * 3000;

              return {
                  firstName: firstName,
                  lastName: lastName,
                  age: age,
                  email: email,
                  balance: balance
              };
          }

          function getAPage() {
              var data = [];
              for (var j = 0; j < 20; j++) {
                  data.push(createRandomItem());
              }
              return data;
          }

          var lastStart = 0;
          var maxNodes = 40;

          $rlist.callServer = function getData(tableState) {

              //here you could create a query string from tableState
              //fake ajax call
              $rlist.isLoading = true;

              $timeout(function () {

                  //if we reset (like after a search or an order)
                  if (tableState.pagination.start === 0) {
                      $rlist.rowCollection = getAPage();
                  } else {
                      //we load more
                      $rlist.rowCollection = $rlist.rowCollection.concat(getAPage());

                      //remove first nodes if needed
                      if (lastStart < tableState.pagination.start && $rlist.rowCollection.length > maxNodes) {
                          //remove the first nodes
                          $rlist.rowCollection.splice(0, 20);
                      }
                  }

                  lastStart = tableState.pagination.start;

                  $rlist.isLoading = false;
              }, 1000);

          };

          $rlist.rowCollection = getAPage();

  }

  module.controller('RListCtrl',RListCtrl);

})(angular.module('app.main.registry.rcontent.rlist'));
