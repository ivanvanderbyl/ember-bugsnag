import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    triggerNotify: function() {
      this.get('bugsnag').notify('Test Notification');
    }
  },
});
