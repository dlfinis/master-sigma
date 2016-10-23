(function () {
  angular.module('app.config',[])
      .constant(
        'INIT',{
          'debug' : true,
          'elementlimit' : 10,
          'elementpage' : 10,
          'development' :{ logging:'verbose', domain:'master.sigma' },
          'production' : { logging:'none', domain:'sigma.uta.edu.ec' }
        }
      )
      .constant(
        'AUTH_EVENTS',{
          loginSuccess: 'auth-login-success',
          loginFailed: 'auth-login-failed',
          logoutSuccess: 'auth-logout-success',
          sessionTimeout: 'auth-session-timeout',
          notAuthenticated: 'auth-not-authenticated',
          notAuthorized: 'auth-not-authorized'
        }
      )
      .constant(
        'FB',{
          'clientID' : 1545700372110630,
          'permissions': 'email,user_birthday,user_friends,publish_actions'
        }
      )
      .constant(
        'partial',{
          'main' : {
            'origin' : 'angular/components/main/',
            'article' : 'angular/components/main/article/',
            'home' : 'angular/components/main/home/',
            'wall' : 'angular/components/main/wall/',
            'rcontent' : 'angular/components/main/registry/rcontent/',
            'rcategory' : 'angular/components/main/registry/rcategory/'
          },
          'core' : {
            'origin' : 'angular/components/core/',
            'page' : 'angular/components/core/page/',
            'legal' : 'angular/components/core/legal/',
            'test' : 'angular/components/core/test/',
            'testpage' : 'angular/components/core/testpage/'
          }
        }
       );
})();
