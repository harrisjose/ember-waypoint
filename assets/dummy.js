"use strict";



define('dummy/app', ['exports', 'dummy/resolver', 'ember-load-initializers', 'dummy/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('dummy/components/code-block', ['exports', 'ember-prism/components/code-block'], function (exports, _codeBlock) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _codeBlock.default;
});
define('dummy/components/code-inline', ['exports', 'ember-prism/components/code-inline'], function (exports, _codeInline) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _codeInline.default;
});
define('dummy/components/way-point', ['exports', 'ember-waypoint/components/way-point'], function (exports, _wayPoint) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _wayPoint.default;
});
define('dummy/controllers/home', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    example1: {
      snippet: Ember.String.htmlSafe(`
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
      snippet: Ember.String.htmlSafe(`
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
        let example = Ember.get(this, 'example1');

        if (inViewPort) {
          Ember.set(example, 'status', 'in');
          Ember.set(example, 'statusMsg', 'Marker in viewport');
        } else {
          Ember.set(example, 'status', 'out');
          Ember.set(example, 'statusMsg', 'Marker outside viewport');
        }
      },
      showImage() {
        this.setProperties({
          'example2.canShowImage': true,
          'example2.status': 'in',
          'example2.statusMsg': 'Image loaded'
        });
      }
    }
  });
});
define('dummy/ember-waypoint/tests/addon.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | addon');

  QUnit.test('addon/components/way-point.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/components/way-point.js should pass ESLint\n\n');
  });
});
define('dummy/ember-waypoint/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app/components/way-point.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app/components/way-point.js should pass ESLint\n\n');
  });
});
define('dummy/helpers/inline-svg', ['exports', 'ember-inline-svg/helpers/inline-svg', 'dummy/svgs'], function (exports, _inlineSvg, _svgs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let helper;

  if (Ember.Helper && Ember.Helper.helper) {
    helper = Ember.Helper.helper(function ([path], options) {
      return (0, _inlineSvg.inlineSvg)(_svgs.default, path, options);
    });
  } else {
    helper = Ember.Handlebars.makeBoundHelper(function (path, options) {
      return (0, _inlineSvg.inlineSvg)(_svgs.default, path, options.hash || {});
    });
  }

  exports.default = helper;
});
define('dummy/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('dummy/initializers/export-application-global', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('dummy/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('dummy/router', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('home', { path: '/' });
    this.route('demo');
  });

  exports.default = Router;
});
define('dummy/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("dummy/svgs", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    "ember-logo": "<svg viewBox=\"0 0 259 100\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"#E04E39\" fill-rule=\"evenodd\"><path d=\"M253.8 68.6s-6.3 4.9-11.8 4.3c-5.5-.5-3.8-12.9-3.8-12.9s1.2-11.3-2-12.2c-3.3-1-7.3 3-7.3 3s-5 5.4-7.4 12.5l-.6.2s.7-12.3-.1-15.2c-.7-1.4-6.6-1.3-7.6 1.2s-5.8 19.9-6 27.1c0 0-9.4 8-17.5 9.2-8.2 1.3-10.1-3.8-10.1-3.8s22.1-6.1 21.3-23.8c-.7-17.7-17.8-11.1-19.7-9.7-1.9 1.4-11.9 7.4-14.8 24.1l-.2 3s-8.6 5.8-13.4 7.3c0 0 13.4-22.4-2.9-32.6-4.6-2.8-8.5-.2-11 2-1.4 1.5 19.8-21.6 14.9-42.3-2.3-10-7.2-11-11.8-9.3a20.5 20.5 0 0 0-9.4 6.7s-9 12.9-11 32c-2 19.2-5 42.4-5 42.4s-4.3 4.1-8.2 4.4c-3.9.2-2.2-11.6-2.2-11.6s3-18 2.9-21c-.3-3.1-.5-4.7-4-5.8-3.6-1-7.5 3.5-7.5 3.5s-10.3 15.6-11.2 18l-.5 1-.6-.7s7.3-21.3.3-21.6c-6.9-.3-11.4 7.6-11.4 7.6s-8 13.2-8.3 14.7l-.5-.6s3.2-15.4 2.6-19.2c-.7-3.8-4.2-3-4.2-3s-4.6-.6-5.8 2.4c-1.2 2.9-5.5 22.3-6 28.5 0 0-11.4 8-19 8.2-7.4 0-6.6-4.8-6.6-4.8s27.4-9.3 20-27.9c-3.4-4.7-7.3-6.2-12.9-6.1-5.5 0-12.4 3.5-16.8 13.4A44.2 44.2 0 0 0 13.4 74S8.6 75 6 72.8c-2.6-2.1-4 0-4 0s-4.4 5.7 0 7.4a57 57 0 0 0 11.4 2.6c.6 3 2.5 8.2 7.9 12.3 8.1 6.2 23.7-.6 23.7-.6l6.4-3.6s.2 5.9 4.9 6.8c4.6.8 6.6 0 14.7-19.8 4.8-10 5.1-9.5 5.1-9.5.5-.1-3.1 19.2-1.7 24.4 1.4 5.2 7.6 4.6 7.6 4.6s3.3.7 6-8.9c2.7-9.5 8-20 8-20 .6 0-1.7 19.7 1.8 26 3.4 6.3 12.4 2.1 12.4 2.1s6.3-3.2 7.3-4.1c0 0 7.5 6.3 18 5.2 23.5-4.7 31.9-11 31.9-11s4 10.3 16.5 11.3c14.3 1 22.1-8 22.1-8s0 5.9 5 8c4.9 2 8.2-9.6 8.2-9.6l8.4-23c.8 0 1.2 15 9.4 17.4 8.3 2.4 19-5.6 19-5.6s2.6-1.4 2.2-5.8c-.5-4.3-4.4-2.7-4.4-2.7zm-217-10.8c2.9 2.8 1.8 8.8-3.7 12.6-5.5 3.8-8 3-8 3 .3-12.8 8.8-18.5 11.7-15.6zm107.8-44.6C146.4 23 128.4 52 128.4 52c.3-6.5 6.7-28.5 6.7-28.5s7.6-20 9.5-10.3zm-17.8 74s-1.4-4.7 2.6-18c4-13.4 13.5-8.2 13.5-8.2s6.5 5 1.4 18.3c-5.1 13.4-17.5 8-17.5 8zm54.8-26c4.5-8.2 8-3.8 8-3.8s3.8 4.2-.6 10.3c-4.3 6.2-10.6 5.8-10.6 5.8s-1.2-4.3 3.2-12.4z\"/><path d=\"M226 94v-1.5h1.8l.3.3.1.4c0 .4-.1.6-.3.7l-.9.1h-1zm-1.2-2.5v6h1.2v-2.6h.7l1.5 2.6h1.2l-1.6-2.6c.2 0 .4 0 .6-.2l.5-.2.4-.5v-.7c0-.6-.1-1.1-.5-1.4-.4-.2-1-.4-1.7-.4h-2.3zm-1.9 3c0-.6.1-1.1.4-1.7a4 4 0 0 1 2-2.1 4 4 0 0 1 1.6-.3 3.9 3.9 0 0 1 2.8 1.1 4.2 4.2 0 0 1 1.2 3 4.4 4.4 0 0 1-1.2 3 3.8 3.8 0 0 1-2.8 1.2 4 4 0 0 1-2.8-1.2 4.1 4.1 0 0 1-1.2-3zm-1.4 0a5.2 5.2 0 0 0 1.6 3.9c.5.4 1.1.8 1.8 1a5.8 5.8 0 0 0 5.8-1 5.2 5.2 0 0 0 1.2-6 5.1 5.1 0 0 0-3-2.8 5.7 5.7 0 0 0-4 0 5.3 5.3 0 0 0-3 2.7c-.3.7-.4 1.4-.4 2.2z\"/></g></svg>",
    "nyancat": "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"451\" width=\"451\" viewBox=\"0 0 100 100\"><path d=\"M62.153 37.323h2.813v3.246h-2.813zm2.705 3.246h2.813v3.246h-2.813zm2.814 3.245h11.9v3.246h-11.9zm11.9-19.365h2.813v19.365h-2.813zm2.814 12.874h3.244v3.246h-3.244zm3.244-3.191h5.627v3.246H85.63zm5.627 3.191h2.92v12.95h-2.92zm2.92 12.951h2.922V66.21h-2.922zM91.29 66.372h2.887v3.245H91.29zm-2.889 3.245h2.889v3.246h-2.889zm-61.089 3.246h61.003v3.245H27.312zm46.31 3.245h2.889v3.246h-2.889zm8.941 0h2.888v3.246h-2.888zm-6.052 3.246h6.053v3.245h-6.053zm-14.57 0h8.895v3.245h-8.895zm6.006-3.246h2.889v3.246h-2.889zm-8.626 0h2.888v3.246h-2.888zM27.312 17.917h49.387v3.246H27.312zm49.387 3.245h2.873v3.287h-2.873zm-20.327 12.97h5.781v3.191h-5.781zm-2.924 3.191h2.924v12.951h-2.924zm-2.96 12.951h2.96v16.049h-2.96zm2.96 16.049h2.924v3.257h-2.924zm2.924 3.257h2.949v3.283h-2.949zm8.697-6.367h2.878v6.367h-2.878zm2.878 3.184h17.504v3.22H67.947z\"/><path d=\"M82.563 63.213h2.888v3.185h-2.888zm-8.762 0h2.898v3.185h-2.898zm2.898-6.439h2.873v3.145h-2.873zm5.864 0h2.888v3.145h-2.888zm2.888-3.33h2.864v3.33h-2.864z\"/><path d=\"M85.451 56.774h2.864v3.145h-2.864zm-20.382-3.33h2.878v3.33h-2.878zm0 3.33h2.878v3.145h-2.878zm-2.86 0h2.86v3.145h-2.86zm-40.7-32.447h2.813v45.169h-2.813zm2.814-3.165h2.99v3.165h-2.99zm-5.761 48.334h8.75v3.367h-8.75zm-2.906 3.367h2.906v9.591h-2.906zm2.906 6.438h8.75v3.153h-8.75zm5.761-3.193h5.743V79.3h-5.743zm8.813 0h2.824v6.346h-2.824zm2.824 3.173h5.813v3.173H35.96zm5.814-3.173h2.864v3.173h-2.864zM3.948 40.569h11.708v3.229H3.948zm0 3.245h2.921v6.459H3.948zm2.921 3.246h2.934v6.384H6.869zm2.934 3.214h2.909v6.5H9.803z\"/><path d=\"M12.711 53.444h2.945v6.475h-2.945zm2.945 3.33h5.853v3.145h-5.853z\"/><path d=\"M18.583 59.919h2.926v3.294h-2.926zm0-12.875h2.926v6.4h-2.926zm-5.872-3.23h5.872v3.229h-5.872zm2.936 3.23h2.936v3.2h-2.936z\"/><path fill=\"none\" d=\"M47.439 50.274h3.049v3.17h-3.049z\"/><path d=\"M73.801 30.94v-3.138h-2.965v-3.354l-37.7-.122v3.151h-3.07v3.462l-2.753-.108-.118 32.381h2.871v3.185h3.07v-3.185h2.824v3.185h-2.824v3.099l20.312.084v-3.257h-2.96V50.274h2.96V37.323h2.924v-3.191h5.781v3.191h2.813l-.108 3.246h2.813v3.246h9.027V30.94h-2.897zM33.136 56.682h-3.07v-3.158h3.07v3.158zm2.824-22.55h-2.824v-3.084h2.824v3.084zm2.907 12.928h2.907v3.184h-2.907V47.06zm5.771 16.153h-2.864v-3.294h2.864v3.294zm2.801-19.399h-2.801v-3.246h2.801v3.246zm6.009-12.766h-2.96v-3.354h2.96v3.354zm8.705 0h-2.832v-3.354h2.832v3.354zm8.683 6.275h-2.889v-3.191h2.889v3.191z\"/></svg>"
  };
});
define("dummy/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "qh5iey7x", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"mt-extra\"],[7],[0,\"\\n  \"],[6,\"h1\"],[9,\"id\",\"title\"],[9,\"class\",\"text-center text-italic\"],[7],[0,\"\\n    \"],[1,[25,\"inline-svg\",[\"ember-logo\"],[[\"width\",\"height\"],[\"100px\",\"35px\"]]],false],[0,\"\\n    \"],[6,\"span\"],[9,\"class\",\"text-shimmer\"],[7],[0,\"Waypoint\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"social-links\"],[7],[0,\"\\n\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"app-container\"],[7],[0,\"\\n  \"],[1,[18,\"outlet\"],false],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "dummy/templates/application.hbs" } });
});
define("dummy/templates/components/code-block", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "7hTcwWv6", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"code\"],[10,\"class\",[18,\"languageClass\"],null],[7],[11,1],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "dummy/templates/components/code-block.hbs" } });
});
define("dummy/templates/home", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "svYR4ltt", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"app-hero\"],[7],[0,\"\\n  \"],[6,\"p\"],[9,\"class\",\"hero-header\"],[7],[0,\"\\n    Execute a function whenever you scroll to an element.\\n    Build things like lazy loading images, infinite scroll and scrollspies.\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"hero-cta\"],[7],[0,\"ember install ember-waypoint\"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"style\",\"margin-top: 100px;\"],[7],[8],[0,\"\\n\\n\"],[4,\"code-block\",null,[[\"language\",\"class\"],[\"handlebars\",\"snippet\"]],{\"statements\":[[0,\"    \"],[1,[20,[\"example1\",\"snippet\"]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[6,\"div\"],[10,\"class\",[26,[\"snippet-status \",[20,[\"example1\",\"status\"]]]]],[7],[0,\"\\n    \"],[1,[20,[\"example1\",\"statusMsg\"]],false],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"style\",\"margin-top: 170px;\"],[7],[8],[0,\"\\n\\n\"],[4,\"way-point\",null,[[\"onEnter\",\"onLeave\"],[[25,\"action\",[[19,0,[]],\"changeStatus\",true],null],[25,\"action\",[[19,0,[]],\"changeStatus\",false],null]]],{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"marker\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n  \"],[6,\"div\"],[9,\"style\",\"margin-top: 150px;\"],[7],[8],[0,\"\\n\\n\"],[4,\"code-block\",null,[[\"language\",\"class\"],[\"handlebars\",\"snippet\"]],{\"statements\":[[0,\"    \"],[1,[20,[\"example2\",\"snippet\"]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[6,\"div\"],[10,\"class\",[26,[\"snippet-status \",[20,[\"example2\",\"status\"]]]]],[7],[0,\"\\n    \"],[1,[20,[\"example2\",\"statusMsg\"]],false],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"style\",\"margin-top: 120px;\"],[7],[8],[0,\"\\n\\n\"],[4,\"way-point\",null,[[\"onEnter\",\"threshold\"],[[25,\"action\",[[19,0,[]],\"showImage\"],null],\"0.5\"]],{\"statements\":[[4,\"if\",[[20,[\"example2\",\"canShowImage\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[9,\"style\",\"min-height: 250px;\"],[7],[6,\"img\"],[9,\"src\",\"images/nyancat.svg\"],[9,\"width\",\"300px\"],[7],[8],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n  \"],[6,\"div\"],[9,\"style\",\"margin-top: 50px;\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"footer\"],[7],[0,\"\\n    \"],[6,\"a\"],[9,\"href\",\"https://github.com/harrisjose\"],[7],[0,\"Made by @harrisjose\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "dummy/templates/home.hbs" } });
});


define('dummy/config/environment', [], function() {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("dummy/app")["default"].create({});
}
//# sourceMappingURL=dummy.map
