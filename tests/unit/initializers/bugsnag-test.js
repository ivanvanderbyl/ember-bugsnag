import Ember from 'ember';
import { initialize } from '../../../initializers/bugsnag';
import { module, test } from 'qunit';

var container, application;

module('BugsnagInitializer', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
      initialize(container, application);
    });
  }
});

test('it registers with the container', function(assert) {
  assert.ok(!!container.lookup('bugsnag:main'), 'bugsnag is in the container');
});

test('it has configured API Key', function(assert) {
  assert.equal(container.lookup('bugsnag:main').apiKey, 'SUPER_SECRET', 'has config from app');
});

test('it sets the releaseStage', function(assert) {
  assert.equal(container.lookup('bugsnag:main').releaseStage, 'test', 'has releaseStage from app');
});
