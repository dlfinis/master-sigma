angular.module("app.core.factories", [])

.factory("testFactory",function ($q, $rootScope, $location,$http) {
  return {
    isOK: function()
    {
        return "OK";
    }
  }
})

.factory("CheckRoutingFactory",function ($q, $rootScope, $location,$http) {
  return {
    isAuthenticated: function()
    {
        if ($rootScope.userProfile) {
            return true;
        } else {
            var deferred = $q.defer();
            $http.post("/getUser")
                .success(function (response) {
                    if(response.auth)
                      {
                          $rootScope.userProfile = response.user;
                          $location.path("/canvas");
                      }else {
                          $location.path("/home");
                      }
                    deferred.resolve(true);
                })
                .error(function (err) {
                    console.log(err);
                    deferred.reject();
                    $location.path("/home");
                 });
            return deferred.promise;
        }
    }
  }
})
