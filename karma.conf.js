// Karma configuration
module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    basePath: '',
    files: [ //ordering of files matters apparently. spent like an hour wondering why everything was broken
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-route/angular-route.min.js',
      'node_modules/angular-ui-bootstrap/dist/*',
      'app/controllers/Checkers.js',
      'app/controllers/*',
      'app/services/*',
      'tests/*',
    ],
    frameworks: ['mocha'],

    // list of files to exclude
    exclude: [
      'app/board'
    ],

    singleRun: true,
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    }
  });
};