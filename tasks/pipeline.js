/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'bower_components/angular/*.css',
  'bower_components/angular-bootstrap/*.css',
  'bower_components/angular-loading-bar/build/loading-bar.css',
  'bower_components/bootstrap-css/**/bootstrap.css',
  'bower_components/bootstrap-css/**/bootstrap-theme.css',
  'bower_components/ui-select/**/select.css',
  'bower_components/ng-img-crop/compile/unminified/ng-img-crop.css',
  'styles/mustache.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

// Load sails.io before everything else
// 'js/dependencies/sails.io.js',

// Load Angular App
  'bower_components/moment/min/moment-with-locales.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-i18n/angular-locale_es.js',
  'bower_components/angular-animate/angular-animate.js',
  'bower_components/angular-local-storage/dist/angular-local-storage.js',
  'bower_components/webfontloader/webfontloader.js',
  'bower_components/angular-lazy-img/release/angular-lazy-img.js',
  'bower_components/angular-loading-bar/build/loading-bar.js',
  'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
  'bower_components/ui-select/dist/select.js',
  'bower_components/ng-onload/release/ng-onload.min.js',
  'bower_components/ng-facebook/ngFacebook.js',
  'bower_components/ng-file-upload/ng-file-upload-all.js',
  'bower_components/angular-smart-table/dist/smart-table.js',
  // 'bower_components/ng-img-crop/compile/unminified/ng-img-crop.js',
  'bower_components/ng-img-crop-full-extended/compile/unminified/ng-img-crop.js',
  'bower_components/angular-resource/angular-resource.js',
  'bower_components/angular-sanitize/angular-sanitize.js',
  'bower_components/angular-route/angular-route.js',
  'bower_components/tv4/tv4.js',

  //Load Angular app
  'angular/app.config.js',
  'angular/components/core/**/*.js',
  'angular/components/main/**/*.js',
  'angular/components/*.js',
  'angular/app.js',

  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/**/*.js',

// All of the rest of your client-side js files
// will be injected here in no particular order.
  'js/**/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
