import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    triggerNotify: function() {
      throw new Error("Something is very broken here");
      // this.get('bugsnag').notify('Test Notification');
    }
  },
});
