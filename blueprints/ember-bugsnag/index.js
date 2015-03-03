module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function(options) {
    return this.addBowerPackageToProject('bugsnag', '~2.4.7');
    return this.addBowerPackageToProject('ember-cli-bugsnag-shim');
  }
};
