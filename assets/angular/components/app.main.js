(function() {
  angular.module('app.main',[ 'app.main.article',
                              'app.main.article.like',
                              'app.main.article.share',
                              'app.main.article.reading',
                              'app.main.article.period',
                              'app.main.article.tdelta',
                              'app.main.registry',
                              'app.main.registry.rarticle',
                              'app.main.registry.rcategory',
                              'app.main.home',
                              'app.main.wall',
                              'simplePagination'
                            ]
  );
})();
