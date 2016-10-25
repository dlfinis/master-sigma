(function() {
  angular.module('app.core',[
    'app.core.auth',
    'app.core.fontloader',
    'app.core.fb',
    'app.core.http.interceptor',
    'app.core.img.errSrc',
    'app.core.legal.policy',
    'app.core.legal.terms',
    'app.core.router.check',
    'app.core.router.loading',
    'app.core.page.header',
    'app.core.page.footer',
    'app.core.request.control.list',
    'app.core.test',
    'app.core.testpage'
  ]);
})();
