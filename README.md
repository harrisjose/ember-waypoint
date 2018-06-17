ember-waypoint
==============================================================================

Execute a function whenever you scroll to an element. Uses the shiny new Intersection Observer API under the hood. Inspired by [Waypoints](https://github.com/imakewebthings/waypoints) and the excellent [React Waypoint](https://github.com/brigade/react-waypoint).

Ember Waypoint can be used to build things like lazy loading images, infinite scroll, scrollspies, or docking elements to the viewport on scroll. [View the demo.](harrisjose.github.io/ember-waypoint)


Installation
------------------------------------------------------------------------------

```
ember install ember-waypoint
```

Ember Waypoint includes [this polyfill](https://www.npmjs.com/package/intersection-observer) since the intersection observer is still a wip in [some browsers](https://caniuse.com/#feat=intersectionobserver). Further versions might exclude the polyfill as browser support improves.

Usage
------------------------------------------------------------------------------

Suppose we need to show a 'scroll to top' button by figuring out if the user has scrolled down to a certain part of the page. An easy way to do this would be adding,

```hbs
{{way-point onEnter=(action "showScrollUp") onLeave=(action "hideScrollUp")}}
```

In this case, you could think of the way-point as a line across the page.


To do stuff when certain elements enter the viewport, you can wrap them with the way-point component.

```hbs
{{#way-point
  onEnter=(action "isVisible" true)
  onLeave=(action "isVisible" false)
  rootElement="#container"
}}
  <div class="media">
    <img src="profile.jpg"/>
    <p>{{name}}</p>
  </div>
{{/way-point}}
``` 

Ember Waypoint supports the following actions and props,

### Actions

* onEnter - Called when any part of the child is visible in the viewport
* onLeave - Called when all of the child has exited the viewport.

> Keep in mind that an element outside the viewport can be on either side of it (top or bottom), so there are always two positions when the onLeave and onEnter callbacks will be called.

### Props

* rootElement - The element that is used as the viewport for checking visiblity. Defaults to the browser viewport if not specified.
* threshold - Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed.
* offsets - Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left).

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-waypoint`
* `npm install`

### Running tests

* `npm test` – Runs `ember try:each` to test your addon against multiple Ember versions

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
