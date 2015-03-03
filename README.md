# ember-bugsnag

Adds the [Bugsnag.js](https://github.com/bugsnag/bugsnag-js) library to your Ember CLI app, and configures it to handle errors from Ember.

## Installation

* `ember install:addon ember-bugsnag`

## Configuration

`ember-bugsnag` will look for configuration options in your app's environment under the `bugsnag` key. This means you can access any of the public API configuration options accepted by Bugsnag.js.

**Example:**
```js
  // config/environment.js

  ENV['bugsnag'] = {
    apiKey: 'SUPER_SECRET',
  };
```

`ember-bugsnag` will automatically set `Bugsnag.releaseStage` to match the environment in which your app is running.

For all the available configuration options, see [Bugsnag.js Readme](https://github.com/bugsnag/bugsnag-js/blob/master/README.md).

## Usage

Bugsnag is available within your controllers and routes, allowing you to customise the behaviour of Bugsnag and send custom notifications. For example, you might want to set the current user's details once they log in:

```js
// routes/application.js
// Example using simple-auth.

sessionAuthenticationSucceeded: function(){
  this._super();
  var user = this.get('currentUser');
  this.get('bugsnag').user = user.getProperties('id', 'email');
}
...

```

## Running in development

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
