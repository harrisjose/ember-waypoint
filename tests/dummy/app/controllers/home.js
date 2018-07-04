/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
import Controller from '@ember/controller';
import { htmlSafe } from '@ember/string';
import { get, set } from '@ember/object';

export default Controller.extend({
  example1: {
    snippet: htmlSafe(`
      {{!-- Detect if element is inside or outside the viewport --}}

      {{#way-point
        onEnter=(action &quot;changeStatus&quot; true)
        onLeave=(action &quot;changeStatus&quot; false)
      }}
        &lt;div class=&quot;marker&quot;&gt;&lt;/div&gt;
      {{/way-point}}
    `),
    status: 'default',
    statusMsg: 'Scroll down to the marker to see it work'
  },

  example2: {
    snippet: htmlSafe(`
      {{!-- Very naive version of a lazy loaded image --}}

      {{#way-point onEnter=(action &quot;setProp&quot; &quot;canShowImage&quot; true)}}
        {{#if canShowImage}}
          &lt;img src=&quot;images/nyancat.svg&quot;/&gt;
        {{/if}}
      {{/way-point}}
    `),
    status: 'default',
    statusMsg: 'Scroll down to lazy load image',
    canShowImage: false
  },

  actions: {
    changeStatus(inViewPort) {
      let example = get(this, 'example1');

      if (inViewPort) {
        set(example, 'status', 'in');
        set(example, 'statusMsg', 'Marker in viewport');
      } else {
        set(example, 'status', 'out');
        set(example, 'statusMsg', 'Marker outside viewport');
      }
    },
    showImage() {
      this.setProperties({
        'example2.canShowImage': true,
        'example2.status': 'in',
        'example2.statusMsg': 'Image loaded'
      });
    },
  }
});