ember-waypoint
==============================================================================

> I'm very open to feedback on this addon. I made this because I was using intersection observers for a couple of different things and thought it'd be cool to have an easier way to use them. If you have a cool idea or suggestion to make this better, please let me know :)

Execute a function whenever you scroll to an element. Uses the shiny new Intersection Observer API under the hood. Inspired by [Waypoints](https://github.com/imakewebthings/waypoints) and the excellent [React Waypoint](https://github.com/brigade/react-waypoint).

Ember Waypoint can be used to build things like lazy loading images, infinite scroll, scrollspies, or docking elements to the viewport on scroll.

[View the demo.](https://harrisjose.github.io/ember-waypoint)

Installation
------------------------------------------------------------------------------

```
ember install ember-waypoint
```

Ember Waypoint includes [this polyfill](https://www.npmjs.com/package/intersection-observer) since the intersection observer is still a wip in [some browsers](https://caniuse.com/#feat=intersectionobserver). Further versions might exclude the polyfill as browser support improves.

Usage
------------------------------------------------------------------------------

Suppose we need to show a 'scroll to top' button by figuring out if the user has scrolled down to a certain part of the page. An easy way to do this would be,

```hbs
{{way-point onEnter=(action "showScrollUp") onLeave=(action "hideScrollUp")}}
```

In this case, you could think of the way-point as a line across the page. To do stuff when certain elements enter the viewport, you can wrap them with the way-point component.

```hbs
{{#way-point onEnter=(action "toggleVisibility" true)}}
  <div class="media">
    {{#if isVisible}}
      <img src="profile.jpg"/>
    {{else}}
      <img src="placeholder.jpg"/>
    {{/if}}
    <p>{{name}}</p>
  </div>
{{/way-point}}
``` 

### Callbacks

Ember-Waypoint accepts closure actions for it's callbacks. 

* onEnter - Called when any part of the child is visible in the viewport
* onLeave - Called when all of the child has exited the viewport.

An element outside the viewport can be on either at the top or at the bottom, so there are always two positions when the onLeave and onEnter callbacks will be called.

All callbacks receive an array of [intersection observer entries](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) as it's final argument.

### Props

* **rootElement** - The element that is used as the viewport for checking visiblity. Defaults to the browser viewport if not specified.
* **threshold** - Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. Interpolates to the threshold property in the Intersection Observer API.
* **offsets** - Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). Interpolates to the rootMargin property in the Intersection Observer API.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
