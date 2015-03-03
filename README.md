# ember-bugsnag

Adds the [Bugsnag.js](https://github.com/bugsnag/bugsnag-js) library to your Ember CLI app, and configures it to handle errors from Ember.

## Installation

* `ember install:addon ember-bugsnag`

## Configuration

`ember-bugsnag` will look for configuration options in your apps environment under the `bugsnag` key. This means you can access any of the public API configuration options accepted by Bugsnag.js.

**Example:**
```js
  // config/environment.js

  ENV['bugsnag'] = {
    apiKey: 'SUPER_SECRET',
  };
```

`ember-bugsnag` will automatically set `Bugsnag.releaseStage` to match the environment in which your app is running.

## Running in development

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
