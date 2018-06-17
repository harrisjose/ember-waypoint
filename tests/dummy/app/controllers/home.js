/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
import Controller from '@ember/controller';
import { htmlSafe } from '@ember/string';
import { get, set } from '@ember/object';

export default Controller.extend({
  example1: {
    snippet: htmlSafe(`
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

  actions: {
    changeStatus(exampleName, inViewPort) {
      let example = get(this, exampleName);

      if (inViewPort) {
        set(example, 'status', 'in');
        set(example, 'statusMsg', 'Marker in viewport');
      } else {
        set(example, 'status', 'out');
        set(example, 'statusMsg', 'Marker outside viewport');
      }
    }
  }
});