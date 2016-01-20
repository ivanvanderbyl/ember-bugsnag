// import Ember from 'ember';
// import config from 'config/environment';
// import Bugsnag from 'bugsnag';

// function registerEmberOnError(notifyFn) {
//   let originalOnError = Ember.onerror || Ember.K;
//   Ember.onerror = function(err) {
//     originalOnError(err);
//     notifyFn(err);
//   };
// }

// function registerWindowOnError(notifyFn) {
//   window.onerror = function(message, file, line, column, error) {
//     if (message === 'Script error.') {
//       // Ignore.
//       return;
//     }

//     error = error || {error: {
//       message,
//       fileName:     file,
//       lineNumber:   line,
//       columnNumber: column || 0
//     }};

//     notifyFn(error);
//   };
// }

// export function initialize(appInstance) {
//   // appInstance.registry.injection('route', 'foo', 'service:foo');

//   appInstance.register('service:bugsnag', Bugsnag, {
//     singleton: true,
//     instantiate: false
//   });

//   appInstance.registry.injection('controller', 'bugsnag', 'service:bugsnag');
//   appInstance.registry.injection('route', 'bugsnag', 'service:bugsnag');

//   let notifyFn = (error) => {
//     let bugsnag = appInstance.lookup('service:bugsnag');
//     bugsnag.notifyException(error);
//   };

//   let bugsnagConfig = config.bugsnag || config.APP && config.APP.bugsnag;
//   if (bugsnagConfig) {
//     Object.keys(bugsnagConfig).forEach(function(key) {
//       Bugsnag[key] = bugsnagConfig[key];
//     });

//     let isReleaseStage = (Bugsnag.notifyReleaseStages || []).indexOf(Bugsnag.releaseStage || 'development');

//     if (!!bugsnagConfig && isReleaseStage) {
//       registerEmberOnError(notifyFn);
//       registerWindowOnError(notifyFn);
//     }
//   }else{
//     Ember.Logger.warn('[ember-bugsnag] bugsnag config missing.');
//   }
// }

// export default {
//   name: 'bugsnag',
//   initialize: initialize
// };
