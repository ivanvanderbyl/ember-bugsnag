//
// **Bugsnag.js** is the official JavaScript notifier for
// [Bugsnag](https://bugsnag.com).
//
// Bugsnag gives you instant notification of errors and
// exceptions in your website's JavaScript code.
//
// Bugsnag.js is incredibly small, and has no external dependencies (not even
// jQuery!) so you can safely use it on any website.
//

// The `Bugsnag` object is the only globally exported variable
(function (window, old) {

  if (typeof define === "function" && define.amd) {
    // AMD
    define([], function () {
      return self;
    });
  } else if (typeof module === "object" && typeof module.exports === "object") {
    // CommonJS/Browserify
    module.exports = self;
  }
})(window, window.Bugsnag);
