/* jshint node: true */
'use strict';
var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var rename = require('broccoli-stew').rename;
var Filter = require('broccoli-filter');

/**
 * Loading an actual AMD package using Ember's loader.js
 * requires some hacks. Basically proper AMD packages check for define.amd, which
 * loader.js doesn't define (because reasons).
 *
 * To get around this we define our own definition in the same way each Ember
 * package does.
 */

function AMDDefineFilter(inputNode, packageName, options) {
  options = options || {};
  Filter.call(this, inputNode, {
    annotation: options.annotation || "Rewriting package: " + packageName,
  });
  this.packageName = packageName;
}

AMDDefineFilter.prototype = Object.create(Filter.prototype);
AMDDefineFilter.prototype.constructor = AMDDefineFilter;

AMDDefineFilter.prototype.processString = function(content) {
  var lines = content.split(/\n/);
  var linesLength = lines.length;

  var amdDefinition = "define(\"" + this.packageName + "\", [], function () { return self; });";

  var i = linesLength;
  var insertAt = null;

  /**
   * Loop backwards until we find the closing of the function wrapper.
   */
  while(--i >= 0) {
    if (/\(window\, window\.Bugsnag\)/.test(lines[i])) {
      insertAt = i;
      break;
    }
  }

  lines.splice(insertAt, 0, amdDefinition);
  return lines.join("\n");
};

module.exports = {
  name: 'ember-bugsnag',

  included: function(app) {
    this._super.included(app);
    app.import(path.join('vendor', 'bugsnag/bugsnag.js'));
  },

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
