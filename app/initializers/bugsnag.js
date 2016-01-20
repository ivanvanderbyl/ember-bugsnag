import Bugsnag from 'bugsnag';
import ENV from '../config/environment';
import Ember from 'ember';

export function initialize(container, application) {
  application.register('bugsnag:main', Bugsnag, {
    singleton: true,
    instantiate: false
  });

  application.inject('controller', 'bugsnag', 'bugsnag:main');
  application.inject('route', 'bugsnag', 'bugsnag:main');

  var config = ENV['bugsnag'] || ENV.APP['bugsnag'] || {};

  Object.keys(config).forEach(function(key) {
    Bugsnag[key] = config[key];
  });

  var isReleaseStage = (Bugsnag.notifyReleaseStages || []).indexOf(Bugsnag.releaseStage || 'development');

  if (Bugsnag.apiKey) {
    if (isReleaseStage) {
      Ember.onerror = function (error) {
        Bugsnag.notifyException(error);
      };

      Ember.RSVP.on('error', function(error) {
        Bugsnag.notifyException(error);
      });

      Ember.Logger.error = function (message, cause, stack) {
        Bugsnag.notifyException(new Error(message), null, { cause: cause, stack: stack });
      };
    }
  }else{
    Ember.Logger.warn('[ember-bugsnag] Missing the apiKey configuration option');
  }
}

export default {
  name: 'bugsnag',
  initialize: initialize
};
