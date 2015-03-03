/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-bugsnag',

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/bugsnag/src/bugsnag.js');
    app.import(app.bowerDirectory + '/ember-cli-bugsnag-shim/index.js', {
      exports: {
        bugsnag: ['default']
      }
    });
  },
};
