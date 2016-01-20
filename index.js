/* jshint node: true */
'use strict';
var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-bugsnag',

  included: function(app) {
    this._super.included(app);

    app.import(path.join('vendor', 'bugsnag', 'bugsnag.js'));

    // app.import(app.bowerDirectory + '/bugsnag/src/bugsnag.js');
    // app.import(app.bowerDirectory + '/ember-cli-bugsnag-shim/index.js', {
    //   exports: {
    //     bugsnag: ['default']
    //   }
    // });
  },

  treeForVendor: function(tree) {
    var trees = [];

    if (tree) { trees.push(tree); }
    // let importFileBaseName = path.parse(require.resolve("bugsnag-js")).name;

    var packageBuildPath = path.join('src', 'bugsnag.js');
    var pathToSrc = require.resolve("bugsnag-js").replace(packageBuildPath, '');

    console.log(pathToSrc);

    var bugsnagTree = new Funnel(pathToSrc, {
      include: [packageBuildPath],
      destDir: '/bugsnag/bugsnag.js',
      annotation: 'bugsnag.js'
    });

    trees.push(bugsnagTree);

    // srcTree = new UMDToAMDRewriteFilter(tree, packageName);
    // trees.push(rename(srcTree, function() {
    //   return '/' + packageName + '/' + packageName + '.js';
    // }));
    return mergeTrees(trees);
  }
};
