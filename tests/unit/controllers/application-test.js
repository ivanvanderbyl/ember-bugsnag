import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:application', {
  // Specify the other units that are required for this test.
  // needs: ['service:bugsnag']
});

test('it injects in to controllers', function(assert) {
  var controller = this.subject();
  console.log(controller.get('bugsnag'));
  assert.ok(!!controller.get('bugsnag'), 'bugsnag is in the controller');
});
