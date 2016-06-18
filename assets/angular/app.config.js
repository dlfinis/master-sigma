(function () {
  angular.module('app.config',[])
      .constant(
        'INIT',{
          'debug' : true,
          'elementlimit' : 10,
          'elementpage' : 10,
          'development' :{ logging:'verbose', domain:'master.sigma' },
          'production' : { logging:'verbose', domain:'mastersigma-jaggerfly' }
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
        'KEYS',{
          'fbClientID' : 1267766483237355
        }
      )
      .constant(
        'partial',{
          'main' : {
            'origin' : 'angular/components/main/',
            'article' : 'angular/components/main/article/',
            'home' : 'angular/components/main/home/',
            'wall' : 'angular/components/main/wall/',
            'rarticle' : 'angular/components/main/registry/rarticle/',
            'rcategory' : 'angular/components/main/registry/rcategory/'
          },
          'core' : {
            'origin' : 'angular/components/core/',
            'page' : 'angular/components/core/page/',
            'test' : 'angular/components/core/test/',
            'testpage' : 'angular/components/core/testpage/'
          }
        }
       );
})();
