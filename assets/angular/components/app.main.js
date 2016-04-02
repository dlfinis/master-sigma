(function() {
  angular.module('app.main',[ 'app.main.article',
                              'app.main.article.like',
                              'app.main.article.share',
                              'app.main.registry',
                              'app.main.registry.rarticle',
                              'app.main.registry.rcategory',
                              'app.main.home',
                              'app.main.wall']
  );
})();
