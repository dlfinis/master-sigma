(function () {
  angular.module('app.config',[])
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
                        'test' : 'angular/components/core/test/',
              }
          }
       );
})();
