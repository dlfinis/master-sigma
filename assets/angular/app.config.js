angular.module('app.config',[])
       .constant(
         'partial',{
              'main' : {
                        'origin' : 'angular/components/main/',
                        'article' : 'angular/components/main/article/',
                        'article-button' : 'angular/components/main/article/button',
                        'canvas' : 'angular/components/main/canvas/',
                        'home' : 'angular/components/main/home/',
                        'mtest' : 'angular/components/main/mtest/',
                        'test' : 'angular/components/main/test/',
                        'wall' : 'angular/components/main/wall/',
                        'zarticle' : 'angular/components/main/zarticle/',
              },
              'core' : {
                        'origin' : 'angular/components/core/',
                        'test' : 'angular/components/core/test/',
              }
          }
       );
