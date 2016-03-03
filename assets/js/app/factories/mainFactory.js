angular.module("app.factories", [])

.factory("PostsFactory", function($http)
{
    return {
        get: function()
        {
            return $http({
                url: "/post"
            });
        }
    }
});
