/* jshint node: true */
'use strict';
var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var rename = require('broccoli-stew').rename;
var AMDDefineFilter = require('./lib/amd-filter');

module.exports = {
  name: 'ember-bugsnag',

  included: function(app) {
    this._super.included(app);
    app.import(path.join('vendor', 'bugsnag/bugsnag.js'));
  },

  isDevelopingAddon: function() { return true; },

  treeForVendor: function(tree) {
    var trees = [];

    if (tree) { trees.push(tree); }

    var packageBuildPath = path.join('src', 'bugsnag.js');
    var pathToSrc = require.resolve("bugsnag-js").replace(packageBuildPath, '');

    var bugsnagTree = new Funnel(pathToSrc, {
      include: [packageBuildPath],
      destDir: '/bugsnag/bugsnag.js',
      annotation: 'bugsnag.js'
    });

    bugsnagTree = new AMDDefineFilter(bugsnagTree, "bugsnag");
    trees.push(rename(bugsnagTree, function() {
      return '/bugsnag/bugsnag.js';
    }));
    return mergeTrees(trees);
  }
};
