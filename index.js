'use strict';

module.exports = {
  name: 'ember-waypoint',

  included: function() {
    this._super.included.apply(this, arguments);
    this.import('node_modules/intersection-observer/intersection-observer.js');
  }
};
