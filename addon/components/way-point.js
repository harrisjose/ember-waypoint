import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);
    this.setupIntersectionObserver();
  },

  willDestroyElement() {
    this.removeIntersectionObserver();
  },

  setupIntersectionObserver() {
    let handler = (entries) => this.intersectionHandler(entries);
    let options = this.getOptions();

    let observer = new IntersectionObserver(handler, options);
    observer.observe(this.element);

    this.set('observer', observer);
  },

  removeIntersectionObserver() {
    this.get('observer').unobserve(this.element);
  },

  threshold: 0,
  rootElement: null,
  offsets: null,

  observer: null,
  hasEnteredViewPort: false,

  getOptions() {
    let options = {};

    let customRootElement = (
      this.get('rootElement')
        ? document.querySelector(this.get('rootElement'))
        : null
    );
    let threshold = this.get('threshold');
    let offsets = this.get('offset');

    if(customRootElement) {
      options['root'] = customRootElement;
    }
    if(threshold) {
      options['threshold'] = threshold;
    }
    if(offsets) {
      options['rootMargin'] = offsets;
    }

    return options;
  },

  intersectionHandler(entries) {
    let hasEnteredViewPort = this.get('hasEnteredViewPort');

    let inViewport = entries.reduce((result, { isIntersecting }) => {
      return result || isIntersecting;
    }, false);

    if (!hasEnteredViewPort && inViewport) {
      this.onEnterViewPort(entries);
    } else if (hasEnteredViewPort && !inViewport) {
      this.onLeaveViewPort(entries);
    }
  },

  onEnterViewPort(entries) {
    this.set('hasEnteredViewPort', true);
    if(this.onEnter) {
      this.onEnter(entries);
    }
  },

  onLeaveViewPort(entries) {
    this.set('hasEnteredViewPort', false);
    if(this.onLeave) {
      this.onLeave(entries);
    }
  },
  
});
