(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReactLightningRendererDemo"] = factory();
	else
		root["ReactLightningRendererDemo"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(33);
} else {
  module.exports = __webpack_require__(34);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _renderer = __webpack_require__(63);

Object.defineProperty(exports, 'render', {
  enumerable: true,
  get: function get() {
    return _renderer.render;
  }
});
Object.defineProperty(exports, 'handleEvent', {
  enumerable: true,
  get: function get() {
    return _renderer.handleEvent;
  }
});
Object.defineProperty(exports, 'mapAttrToProps', {
  enumerable: true,
  get: function get() {
    return _renderer.mapAttrToProps;
  }
});

var _components = __webpack_require__(76);

Object.keys(_components).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _components[key];
    }
  });
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setObservableConfig = exports.createEventHandlerWithConfig = exports.createEventHandler = exports.mapPropsStreamWithConfig = exports.mapPropsStream = exports.componentFromStreamWithConfig = exports.componentFromStream = exports.hoistStatics = exports.nest = exports.componentFromProp = exports.createSink = exports.isClassComponent = exports.shallowEqual = exports.wrapDisplayName = exports.getDisplayName = exports.compose = exports.setDisplayName = exports.setPropTypes = exports.setStatic = exports.toClass = exports.lifecycle = exports.getContext = exports.withContext = exports.onlyUpdateForPropTypes = exports.onlyUpdateForKeys = exports.pure = exports.shouldUpdate = exports.renderNothing = exports.renderComponent = exports.branch = exports.withReducer = exports.withStateHandlers = exports.withState = exports.flattenProp = exports.renameProps = exports.renameProp = exports.defaultProps = exports.withHandlers = exports.withPropsOnChange = exports.withProps = exports.mapProps = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _shallowEqual = __webpack_require__(13);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _hoistNonReactStatics = __webpack_require__(25);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _changeEmitter = __webpack_require__(62);

var _symbolObservable = __webpack_require__(18);

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setStatic = function setStatic(key, value) {
  return function (BaseComponent) {
    /* eslint-disable no-param-reassign */
    BaseComponent[key] = value;
    /* eslint-enable no-param-reassign */
    return BaseComponent;
  };
};

var setDisplayName = function setDisplayName(displayName) {
  return setStatic('displayName', displayName);
};

var getDisplayName = function getDisplayName(Component$$1) {
  if (typeof Component$$1 === 'string') {
    return Component$$1;
  }

  if (!Component$$1) {
    return undefined;
  }

  return Component$$1.displayName || Component$$1.name || 'Component';
};

var wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
  return hocName + '(' + getDisplayName(BaseComponent) + ')';
};

var mapProps = function mapProps(propsMapper) {
  return function (BaseComponent) {
    var factory = (0, _react.createFactory)(BaseComponent);
    var MapProps = function MapProps(props) {
      return factory(propsMapper(props));
    };
    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'mapProps'))(MapProps);
    }
    return MapProps;
  };
};

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
};

var withProps = function withProps(input) {
  var hoc = mapProps(function (props) {
    return _extends({}, props, typeof input === 'function' ? input(props) : input);
  });
  if (process.env.NODE_ENV !== 'production') {
    return function (BaseComponent) {
      return setDisplayName(wrapDisplayName(BaseComponent, 'withProps'))(hoc(BaseComponent));
    };
  }
  return hoc;
};

var pick = function pick(obj, keys) {
  var result = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }
  return result;
};

var withPropsOnChange = function withPropsOnChange(shouldMapOrKeys, propsMapper) {
  return function (BaseComponent) {
    var factory = (0, _react.createFactory)(BaseComponent);
    var shouldMap = typeof shouldMapOrKeys === 'function' ? shouldMapOrKeys : function (props, nextProps) {
      return !(0, _shallowEqual2.default)(pick(props, shouldMapOrKeys), pick(nextProps, shouldMapOrKeys));
    };

    var WithPropsOnChange = function (_Component) {
      inherits(WithPropsOnChange, _Component);

      function WithPropsOnChange() {
        var _temp, _this, _ret;

        classCallCheck(this, WithPropsOnChange);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.computedProps = propsMapper(_this.props), _temp), possibleConstructorReturn(_this, _ret);
      }

      WithPropsOnChange.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (shouldMap(this.props, nextProps)) {
          this.computedProps = propsMapper(nextProps);
        }
      };

      WithPropsOnChange.prototype.render = function render() {
        return factory(_extends({}, this.props, this.computedProps));
      };

      return WithPropsOnChange;
    }(_react.Component);

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'withPropsOnChange'))(WithPropsOnChange);
    }
    return WithPropsOnChange;
  };
};

var mapValues = function mapValues(obj, func) {
  var result = {};
  /* eslint-disable no-restricted-syntax */
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = func(obj[key], key);
    }
  }
  /* eslint-enable no-restricted-syntax */
  return result;
};

/* eslint-disable no-console */
var withHandlers = function withHandlers(handlers) {
  return function (BaseComponent) {
    var factory = (0, _react.createFactory)(BaseComponent);

    var WithHandlers = function (_Component) {
      inherits(WithHandlers, _Component);

      function WithHandlers() {
        var _temp, _this, _ret;

        classCallCheck(this, WithHandlers);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), possibleConstructorReturn(_this, _ret);
      }

      WithHandlers.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
        this.cachedHandlers = {};
      };

      WithHandlers.prototype.render = function render() {
        return factory(_extends({}, this.props, this.handlers));
      };

      return WithHandlers;
    }(_react.Component);

    var _initialiseProps = function _initialiseProps() {
      var _this2 = this;

      this.cachedHandlers = {};
      this.handlers = mapValues(typeof handlers === 'function' ? handlers(this.props) : handlers, function (createHandler, handlerName) {
        return function () {
          var cachedHandler = _this2.cachedHandlers[handlerName];
          if (cachedHandler) {
            return cachedHandler.apply(undefined, arguments);
          }

          var handler = createHandler(_this2.props);
          _this2.cachedHandlers[handlerName] = handler;

          if (process.env.NODE_ENV !== 'production' && typeof handler !== 'function') {
            console.error(
            // eslint-disable-line no-console
            'withHandlers(): Expected a map of higher-order functions. ' + 'Refer to the docs for more info.');
          }

          return handler.apply(undefined, arguments);
        };
      });
    };

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'withHandlers'))(WithHandlers);
    }
    return WithHandlers;
  };
};

var defaultProps = function defaultProps(props) {
  return function (BaseComponent) {
    var factory = (0, _react.createFactory)(BaseComponent);
    var DefaultProps = function DefaultProps(ownerProps) {
      return factory(ownerProps);
    };
    DefaultProps.defaultProps = props;
    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'defaultProps'))(DefaultProps);
    }
    return DefaultProps;
  };
};

var omit = function omit(obj, keys) {
  var rest = objectWithoutProperties(obj, []);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (rest.hasOwnProperty(key)) {
      delete rest[key];
    }
  }
  return rest;
};

var renameProp = function renameProp(oldName, newName) {
  var hoc = mapProps(function (props) {
    var _babelHelpers$extends;

    return _extends({}, omit(props, [oldName]), (_babelHelpers$extends = {}, _babelHelpers$extends[newName] = props[oldName], _babelHelpers$extends));
  });
  if (process.env.NODE_ENV !== 'production') {
    return function (BaseComponent) {
      return setDisplayName(wrapDisplayName(BaseComponent, 'renameProp'))(hoc(BaseComponent));
    };
  }
  return hoc;
};

var keys = Object.keys;

var mapKeys = function mapKeys(obj, func) {
  return keys(obj).reduce(function (result, key) {
    var val = obj[key];
    /* eslint-disable no-param-reassign */
    result[func(val, key)] = val;
    /* eslint-enable no-param-reassign */
    return result;
  }, {});
};

var renameProps = function renameProps(nameMap) {
  var hoc = mapProps(function (props) {
    return _extends({}, omit(props, keys(nameMap)), mapKeys(pick(props, keys(nameMap)), function (_, oldName) {
      return nameMap[oldName];
    }));
  });
  if (process.env.NODE_ENV !== 'production') {
    return function (BaseComponent) {
      return setDisplayName(wrapDisplayName(BaseComponent, 'renameProps'))(hoc(BaseComponent));
    };
  }
  return hoc;
};

var flattenProp = function flattenProp(propName) {
  return function (BaseComponent) {
    var factory = (0, _react.createFactory)(BaseComponent);
    var FlattenProp = function FlattenProp(props) {
      return factory(_extends({}, props, props[propName]));
    };

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'flattenProp'))(FlattenProp);
    }
    return FlattenProp;
  };
};

var withState = function withState(stateName, stateUpdaterName, initialState) {
  return function (BaseComponent) {
    var factory = (0, _react.createFactory)(BaseComponent);

    var WithState = function (_Component) {
      inherits(WithState, _Component);

      function WithState() {
        var _temp, _this, _ret;

        classCallCheck(this, WithState);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
          stateValue: typeof initialState === 'function' ? initialState(_this.props) : initialState
        }, _this.updateStateValue = function (updateFn, callback) {
          return _this.setState(function (_ref) {
            var stateValue = _ref.stateValue;
            return {
              stateValue: typeof updateFn === 'function' ? updateFn(stateValue) : updateFn
            };
          }, callback);
        }, _temp), possibleConstructorReturn(_this, _ret);
      }

      WithState.prototype.render = function render() {
        var _babelHelpers$extends;

        return factory(_extends({}, this.props, (_babelHelpers$extends = {}, _babelHelpers$extends[stateName] = this.state.stateValue, _babelHelpers$extends[stateUpdaterName] = this.updateStateValue, _babelHelpers$extends)));
      };

      return WithState;
    }(_react.Component);

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'withState'))(WithState);
    }
    return WithState;
  };
};

var withStateHandlers = function withStateHandlers(initialState, stateUpdaters) {
  return function (BaseComponent) {
    var factory = (0, _react.createFactory)(BaseComponent);

    var WithStateHandlers = function (_Component) {
      inherits(WithStateHandlers, _Component);

      function WithStateHandlers() {
        var _temp, _this, _ret;

        classCallCheck(this, WithStateHandlers);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), possibleConstructorReturn(_this, _ret);
      }

      WithStateHandlers.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
        var propsChanged = nextProps !== this.props;
        // the idea is to skip render if stateUpdater handler return undefined
        // this allows to create no state update handlers with access to state and props
        var stateChanged = !(0, _shallowEqual2.default)(nextState, this.state);
        return propsChanged || stateChanged;
      };

      WithStateHandlers.prototype.render = function render() {
        return factory(_extends({}, this.props, this.state, this.stateUpdaters));
      };

      return WithStateHandlers;
    }(_react.Component);

    var _initialiseProps = function _initialiseProps() {
      var _this2 = this;

      this.state = typeof initialState === 'function' ? initialState(this.props) : initialState;
      this.stateUpdaters = mapValues(stateUpdaters, function (handler) {
        return function (mayBeEvent) {
          for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          // Having that functional form of setState can be called async
          // we need to persist SyntheticEvent
          if (mayBeEvent && typeof mayBeEvent.persist === 'function') {
            mayBeEvent.persist();
          }

          _this2.setState(function (state, props) {
            return handler(state, props).apply(undefined, [mayBeEvent].concat(args));
          });
        };
      });
    };

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'withStateHandlers'))(WithStateHandlers);
    }
    return WithStateHandlers;
  };
};

var withReducer = function withReducer(stateName, dispatchName, reducer, initialState) {
  return function (BaseComponent) {
    var factory = (0, _react.createFactory)(BaseComponent);

    var WithReducer = function (_Component) {
      inherits(WithReducer, _Component);

      function WithReducer() {
        var _temp, _this, _ret;

        classCallCheck(this, WithReducer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
          stateValue: _this.initializeStateValue()
        }, _this.dispatch = function (action) {
          return _this.setState(function (_ref) {
            var stateValue = _ref.stateValue;
            return {
              stateValue: reducer(stateValue, action)
            };
          });
        }, _temp), possibleConstructorReturn(_this, _ret);
      }

      WithReducer.prototype.initializeStateValue = function initializeStateValue() {
        if (initialState !== undefined) {
          return typeof initialState === 'function' ? initialState(this.props) : initialState;
        }
        return reducer(undefined, { type: '@@recompose/INIT' });
      };

      WithReducer.prototype.render = function render() {
        var _babelHelpers$extends;

        return factory(_extends({}, this.props, (_babelHelpers$extends = {}, _babelHelpers$extends[stateName] = this.state.stateValue, _babelHelpers$extends[dispatchName] = this.dispatch, _babelHelpers$extends)));
      };

      return WithReducer;
    }(_react.Component);

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'withReducer'))(WithReducer);
    }
    return WithReducer;
  };
};

var identity = function identity(Component$$1) {
  return Component$$1;
};

var branch = function branch(test, left) {
  var right = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : identity;
  return function (BaseComponent) {
    var leftFactory = void 0;
    var rightFactory = void 0;
    var Branch = function Branch(props) {
      if (test(props)) {
        leftFactory = leftFactory || (0, _react.createFactory)(left(BaseComponent));
        return leftFactory(props);
      }
      rightFactory = rightFactory || (0, _react.createFactory)(right(BaseComponent));
      return rightFactory(props);
    };

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'branch'))(Branch);
    }
    return Branch;
  };
};

var renderComponent = function renderComponent(Component$$1) {
  return function (_) {
    var factory = (0, _react.createFactory)(Component$$1);
    var RenderComponent = function RenderComponent(props) {
      return factory(props);
    };
    if (process.env.NODE_ENV !== 'production') {
      RenderComponent.displayName = wrapDisplayName(Component$$1, 'renderComponent');
    }
    return RenderComponent;
  };
};

var Nothing = function (_Component) {
  inherits(Nothing, _Component);

  function Nothing() {
    classCallCheck(this, Nothing);
    return possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Nothing.prototype.render = function render() {
    return null;
  };

  return Nothing;
}(_react.Component);

var renderNothing = function renderNothing(_) {
  return Nothing;
};

var shouldUpdate = function shouldUpdate(test) {
  return function (BaseComponent) {
    var factory = (0, _react.createFactory)(BaseComponent);

    var ShouldUpdate = function (_Component) {
      inherits(ShouldUpdate, _Component);

      function ShouldUpdate() {
        classCallCheck(this, ShouldUpdate);
        return possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      ShouldUpdate.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return test(this.props, nextProps);
      };

      ShouldUpdate.prototype.render = function render() {
        return factory(this.props);
      };

      return ShouldUpdate;
    }(_react.Component);

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'shouldUpdate'))(ShouldUpdate);
    }
    return ShouldUpdate;
  };
};

var pure = function pure(BaseComponent) {
  var hoc = shouldUpdate(function (props, nextProps) {
    return !(0, _shallowEqual2.default)(props, nextProps);
  });

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'pure'))(hoc(BaseComponent));
  }

  return hoc(BaseComponent);
};

var onlyUpdateForKeys = function onlyUpdateForKeys(propKeys) {
  var hoc = shouldUpdate(function (props, nextProps) {
    return !(0, _shallowEqual2.default)(pick(nextProps, propKeys), pick(props, propKeys));
  });

  if (process.env.NODE_ENV !== 'production') {
    return function (BaseComponent) {
      return setDisplayName(wrapDisplayName(BaseComponent, 'onlyUpdateForKeys'))(hoc(BaseComponent));
    };
  }
  return hoc;
};

var onlyUpdateForPropTypes = function onlyUpdateForPropTypes(BaseComponent) {
  var propTypes = BaseComponent.propTypes;

  if (process.env.NODE_ENV !== 'production') {
    if (!propTypes) {
      /* eslint-disable */
      console.error('A component without any `propTypes` was passed to ' + '`onlyUpdateForPropTypes()`. Check the implementation of the ' + ('component with display name "' + getDisplayName(BaseComponent) + '".'));
      /* eslint-enable */
    }
  }

  var propKeys = Object.keys(propTypes || {});
  var OnlyUpdateForPropTypes = onlyUpdateForKeys(propKeys)(BaseComponent);

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'onlyUpdateForPropTypes'))(OnlyUpdateForPropTypes);
  }
  return OnlyUpdateForPropTypes;
};

var withContext = function withContext(childContextTypes, getChildContext) {
  return function (BaseComponent) {
    var factory = (0, _react.createFactory)(BaseComponent);

    var WithContext = function (_Component) {
      inherits(WithContext, _Component);

      function WithContext() {
        var _temp, _this, _ret;

        classCallCheck(this, WithContext);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getChildContext = function () {
          return getChildContext(_this.props);
        }, _temp), possibleConstructorReturn(_this, _ret);
      }

      WithContext.prototype.render = function render() {
        return factory(this.props);
      };

      return WithContext;
    }(_react.Component);

    WithContext.childContextTypes = childContextTypes;

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'withContext'))(WithContext);
    }
    return WithContext;
  };
};

var getContext = function getContext(contextTypes) {
  return function (BaseComponent) {
    var factory = (0, _react.createFactory)(BaseComponent);
    var GetContext = function GetContext(ownerProps, context) {
      return factory(_extends({}, ownerProps, context));
    };

    GetContext.contextTypes = contextTypes;

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'getContext'))(GetContext);
    }
    return GetContext;
  };
};

/* eslint-disable no-console */
var lifecycle = function lifecycle(spec) {
  return function (BaseComponent) {
    var factory = (0, _react.createFactory)(BaseComponent);

    if (process.env.NODE_ENV !== 'production' && spec.hasOwnProperty('render')) {
      console.error('lifecycle() does not support the render method; its behavior is to ' + 'pass all props and state to the base component.');
    }

    var Lifecycle = function (_Component) {
      inherits(Lifecycle, _Component);

      function Lifecycle() {
        classCallCheck(this, Lifecycle);
        return possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      Lifecycle.prototype.render = function render() {
        return factory(_extends({}, this.props, this.state));
      };

      return Lifecycle;
    }(_react.Component);

    Object.keys(spec).forEach(function (hook) {
      return Lifecycle.prototype[hook] = spec[hook];
    });

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'lifecycle'))(Lifecycle);
    }
    return Lifecycle;
  };
};

var isClassComponent = function isClassComponent(Component$$1) {
  return Boolean(Component$$1 && Component$$1.prototype && typeof Component$$1.prototype.render === 'function');
};

var toClass = function toClass(baseComponent) {
  if (isClassComponent(baseComponent)) {
    return baseComponent;
  }

  var ToClass = function (_Component) {
    inherits(ToClass, _Component);

    function ToClass() {
      classCallCheck(this, ToClass);
      return possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    ToClass.prototype.render = function render() {
      if (typeof baseComponent === 'string') {
        return _react2.default.createElement(baseComponent, this.props);
      }
      return baseComponent(this.props, this.context);
    };

    return ToClass;
  }(_react.Component);

  ToClass.displayName = getDisplayName(baseComponent);
  ToClass.propTypes = baseComponent.propTypes;
  ToClass.contextTypes = baseComponent.contextTypes;
  ToClass.defaultProps = baseComponent.defaultProps;

  return ToClass;
};

var setPropTypes = function setPropTypes(propTypes) {
  return setStatic('propTypes', propTypes);
};

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

var createSink = function createSink(callback) {
  return function (_Component) {
    inherits(Sink, _Component);

    function Sink() {
      classCallCheck(this, Sink);
      return possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Sink.prototype.componentWillMount = function componentWillMount() {
      callback(this.props);
    };

    Sink.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      callback(nextProps);
    };

    Sink.prototype.render = function render() {
      return null;
    };

    return Sink;
  }(_react.Component);
};

var componentFromProp = function componentFromProp(propName) {
  var Component$$1 = function Component$$1(props) {
    return (0, _react.createElement)(props[propName], omit(props, [propName]));
  };
  Component$$1.displayName = 'componentFromProp(' + propName + ')';
  return Component$$1;
};

var nest = function nest() {
  for (var _len = arguments.length, Components = Array(_len), _key = 0; _key < _len; _key++) {
    Components[_key] = arguments[_key];
  }

  var factories = Components.map(_react.createFactory);
  var Nest = function Nest(_ref) {
    var props = objectWithoutProperties(_ref, []),
        children = _ref.children;
    return factories.reduceRight(function (child, factory) {
      return factory(props, child);
    }, children);
  };

  if (process.env.NODE_ENV !== 'production') {
    var displayNames = Components.map(getDisplayName);
    Nest.displayName = 'nest(' + displayNames.join(', ') + ')';
  }

  return Nest;
};

var hoistStatics = function hoistStatics(higherOrderComponent) {
  return function (BaseComponent) {
    var NewComponent = higherOrderComponent(BaseComponent);
    (0, _hoistNonReactStatics2.default)(NewComponent, BaseComponent);
    return NewComponent;
  };
};

var _config = {
  fromESObservable: null,
  toESObservable: null
};

var configureObservable = function configureObservable(c) {
  _config = c;
};

var config = {
  fromESObservable: function fromESObservable(observable) {
    return typeof _config.fromESObservable === 'function' ? _config.fromESObservable(observable) : observable;
  },
  toESObservable: function toESObservable(stream) {
    return typeof _config.toESObservable === 'function' ? _config.toESObservable(stream) : stream;
  }
};

var componentFromStreamWithConfig = function componentFromStreamWithConfig(config$$1) {
  return function (propsToVdom) {
    return function (_Component) {
      inherits(ComponentFromStream, _Component);

      function ComponentFromStream() {
        var _config$fromESObserva;

        var _temp, _this, _ret;

        classCallCheck(this, ComponentFromStream);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = { vdom: null }, _this.propsEmitter = (0, _changeEmitter.createChangeEmitter)(), _this.props$ = config$$1.fromESObservable((_config$fromESObserva = {
          subscribe: function subscribe(observer) {
            var unsubscribe = _this.propsEmitter.listen(function (props) {
              if (props) {
                observer.next(props);
              } else {
                observer.complete();
              }
            });
            return { unsubscribe: unsubscribe };
          }
        }, _config$fromESObserva[_symbolObservable2.default] = function () {
          return this;
        }, _config$fromESObserva)), _this.vdom$ = config$$1.toESObservable(propsToVdom(_this.props$)), _temp), possibleConstructorReturn(_this, _ret);
      }

      // Stream of props


      // Stream of vdom


      ComponentFromStream.prototype.componentWillMount = function componentWillMount() {
        var _this2 = this;

        // Subscribe to child prop changes so we know when to re-render
        this.subscription = this.vdom$.subscribe({
          next: function next(vdom) {
            _this2.setState({ vdom: vdom });
          }
        });
        this.propsEmitter.emit(this.props);
      };

      ComponentFromStream.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        // Receive new props from the owner
        this.propsEmitter.emit(nextProps);
      };

      ComponentFromStream.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
        return nextState.vdom !== this.state.vdom;
      };

      ComponentFromStream.prototype.componentWillUnmount = function componentWillUnmount() {
        // Call without arguments to complete stream
        this.propsEmitter.emit();

        // Clean-up subscription before un-mounting
        this.subscription.unsubscribe();
      };

      ComponentFromStream.prototype.render = function render() {
        return this.state.vdom;
      };

      return ComponentFromStream;
    }(_react.Component);
  };
};

var componentFromStream = function componentFromStream(propsToVdom) {
  return componentFromStreamWithConfig(config)(propsToVdom);
};

var identity$1 = function identity(t) {
  return t;
};

var mapPropsStreamWithConfig = function mapPropsStreamWithConfig(config$$1) {
  var componentFromStream = componentFromStreamWithConfig({
    fromESObservable: identity$1,
    toESObservable: identity$1
  });
  return function (transform) {
    return function (BaseComponent) {
      var factory = (0, _react.createFactory)(BaseComponent);
      var fromESObservable = config$$1.fromESObservable,
          toESObservable = config$$1.toESObservable;

      return componentFromStream(function (props$) {
        var _ref;

        return _ref = {
          subscribe: function subscribe(observer) {
            var subscription = toESObservable(transform(fromESObservable(props$))).subscribe({
              next: function next(childProps) {
                return observer.next(factory(childProps));
              }
            });
            return {
              unsubscribe: function unsubscribe() {
                return subscription.unsubscribe();
              }
            };
          }
        }, _ref[_symbolObservable2.default] = function () {
          return this;
        }, _ref;
      });
    };
  };
};

var mapPropsStream = function mapPropsStream(transform) {
  var hoc = mapPropsStreamWithConfig(config)(transform);

  if (process.env.NODE_ENV !== 'production') {
    return function (BaseComponent) {
      return setDisplayName(wrapDisplayName(BaseComponent, 'mapPropsStream'))(hoc(BaseComponent));
    };
  }
  return hoc;
};

var createEventHandlerWithConfig = function createEventHandlerWithConfig(config$$1) {
  return function () {
    var _config$fromESObserva;

    var emitter = (0, _changeEmitter.createChangeEmitter)();
    var stream = config$$1.fromESObservable((_config$fromESObserva = {
      subscribe: function subscribe(observer) {
        var unsubscribe = emitter.listen(function (value) {
          return observer.next(value);
        });
        return { unsubscribe: unsubscribe };
      }
    }, _config$fromESObserva[_symbolObservable2.default] = function () {
      return this;
    }, _config$fromESObserva));
    return {
      handler: emitter.emit,
      stream: stream
    };
  };
};

var createEventHandler = createEventHandlerWithConfig(config);

// Higher-order component helpers

exports.mapProps = mapProps;
exports.withProps = withProps;
exports.withPropsOnChange = withPropsOnChange;
exports.withHandlers = withHandlers;
exports.defaultProps = defaultProps;
exports.renameProp = renameProp;
exports.renameProps = renameProps;
exports.flattenProp = flattenProp;
exports.withState = withState;
exports.withStateHandlers = withStateHandlers;
exports.withReducer = withReducer;
exports.branch = branch;
exports.renderComponent = renderComponent;
exports.renderNothing = renderNothing;
exports.shouldUpdate = shouldUpdate;
exports.pure = pure;
exports.onlyUpdateForKeys = onlyUpdateForKeys;
exports.onlyUpdateForPropTypes = onlyUpdateForPropTypes;
exports.withContext = withContext;
exports.getContext = getContext;
exports.lifecycle = lifecycle;
exports.toClass = toClass;
exports.setStatic = setStatic;
exports.setPropTypes = setPropTypes;
exports.setDisplayName = setDisplayName;
exports.compose = compose;
exports.getDisplayName = getDisplayName;
exports.wrapDisplayName = wrapDisplayName;
exports.shallowEqual = _shallowEqual2.default;
exports.isClassComponent = isClassComponent;
exports.createSink = createSink;
exports.componentFromProp = componentFromProp;
exports.nest = nest;
exports.hoistStatics = hoistStatics;
exports.componentFromStream = componentFromStream;
exports.componentFromStreamWithConfig = componentFromStreamWithConfig;
exports.mapPropsStream = mapPropsStream;
exports.mapPropsStreamWithConfig = mapPropsStreamWithConfig;
exports.createEventHandler = createEventHandler;
exports.createEventHandlerWithConfig = createEventHandlerWithConfig;
exports.setObservableConfig = configureObservable;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(6);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(7);
  var warning = __webpack_require__(8);
  var ReactPropTypesSecret = __webpack_require__(10);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, _typeof(typeSpecs[typeSpecName]));
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseGetTag = __webpack_require__(35);

var _baseGetTag2 = _interopRequireDefault(_baseGetTag);

var _getPrototype = __webpack_require__(40);

var _getPrototype2 = _interopRequireDefault(_getPrototype);

var _isObjectLike = __webpack_require__(42);

var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!(0, _isObjectLike2.default)(value) || (0, _baseGetTag2.default)(value) != objectTag) {
    return false;
  }
  var proto = (0, _getPrototype2.default)(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

exports.default = isPlainObject;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

var _createStore = __webpack_require__(15);

var _createStore2 = _interopRequireDefault(_createStore);

var _combineReducers = __webpack_require__(44);

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _bindActionCreators = __webpack_require__(45);

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _applyMiddleware = __webpack_require__(46);

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _compose = __webpack_require__(21);

var _compose2 = _interopRequireDefault(_compose);

var _warning = __webpack_require__(20);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  (0, _warning2.default)('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = _createStore2.default;
exports.combineReducers = _combineReducers2.default;
exports.bindActionCreators = _bindActionCreators2.default;
exports.applyMiddleware = _applyMiddleware2.default;
exports.compose = _compose2.default;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionTypes = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = createStore;

var _isPlainObject = __webpack_require__(11);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = __webpack_require__(18);

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = exports.ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!(0, _isPlainObject2.default)(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if ((typeof observer === 'undefined' ? 'undefined' : _typeof(observer)) !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[_symbolObservable2.default] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable2.default] = observable, _ref2;
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _root = __webpack_require__(36);

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Built-in value references. */
var _Symbol = _root2.default.Symbol;

exports.default = _Symbol;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(43);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2.default)(root);
exports.default = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17), __webpack_require__(19)(module)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function isValidElement(object) {
    return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(49)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(50)();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeShape = exports.subscriptionShape = undefined;

var _propTypes = __webpack_require__(22);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subscriptionShape = exports.subscriptionShape = _propTypes2.default.shape({
  trySubscribe: _propTypes2.default.func.isRequired,
  tryUnsubscribe: _propTypes2.default.func.isRequired,
  notifyNestedSubs: _propTypes2.default.func.isRequired,
  isSubscribed: _propTypes2.default.func.isRequired
});

var storeShape = exports.storeShape = _propTypes2.default.shape({
  subscribe: _propTypes2.default.func.isRequired,
  dispatch: _propTypes2.default.func.isRequired,
  getState: _propTypes2.default.func.isRequired
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = connectAdvanced;

var _hoistNonReactStatics = __webpack_require__(25);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _invariant = __webpack_require__(51);

var _invariant2 = _interopRequireDefault(_invariant);

var _react = __webpack_require__(1);

var _Subscription = __webpack_require__(52);

var _Subscription2 = _interopRequireDefault(_Subscription);

var _PropTypes = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

var hotReloadingVersion = 0;
var dummyState = {};
function noop() {}
function makeSelectorStateful(sourceSelector, store) {
  // wrap the selector in an object that tracks its results between runs.
  var selector = {
    run: function runComponentSelector(props) {
      try {
        var nextProps = sourceSelector(store.getState(), props);
        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    }
  };

  return selector;
}

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory) {
  var _contextTypes, _childContextTypes;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$getDisplayName = _ref.getDisplayName,
      getDisplayName = _ref$getDisplayName === undefined ? function (name) {
    return 'ConnectAdvanced(' + name + ')';
  } : _ref$getDisplayName,
      _ref$methodName = _ref.methodName,
      methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
      _ref$renderCountProp = _ref.renderCountProp,
      renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
      _ref$storeKey = _ref.storeKey,
      storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
      _ref$withRef = _ref.withRef,
      withRef = _ref$withRef === undefined ? false : _ref$withRef,
      connectOptions = _objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);

  var subscriptionKey = storeKey + 'Subscription';
  var version = hotReloadingVersion++;

  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = _PropTypes.storeShape, _contextTypes[subscriptionKey] = _PropTypes.subscriptionShape, _contextTypes);
  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = _PropTypes.subscriptionShape, _childContextTypes);

  return function wrapWithConnect(WrappedComponent) {
    (0, _invariant2.default)(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + (methodName + '. Instead received ' + JSON.stringify(WrappedComponent)));

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      withRef: withRef,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var Connect = function (_Component) {
      _inherits(Connect, _Component);

      function Connect(props, context) {
        _classCallCheck(this, Connect);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

        (0, _invariant2.default)(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));

        _this.initSelector();
        _this.initSubscription();
        return _this;
      }

      Connect.prototype.getChildContext = function getChildContext() {
        var _ref2;

        // If this component received store from props, its subscription should be transparent
        // to any descendants receiving store+subscription from context; it passes along
        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
        // Connect to control ordering of notifications to flow top-down.
        var subscription = this.propsMode ? null : this.subscription;
        return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return;

        // componentWillMount fires during server side rendering, but componentDidMount and
        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
        // To handle the case where a child component may have triggered a state change by
        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
        // re-render.
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      };

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        (0, _invariant2.default)(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
        return this.wrappedInstance;
      };

      Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      };

      Connect.prototype.initSelector = function initSelector() {
        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        this.selector.run(this.props);
      };

      Connect.prototype.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return;

        // parentSub's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new _Subscription2.default(this.store, parentSub, this.onStateChange.bind(this));

        // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
        // the middle of the notification loop, where `this.subscription` will then be null. An
        // extra null check every change can be avoided by copying the method onto `this` and then
        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
        // listeners logic is changed to not call listeners that have been unsubscribed in the
        // middle of the notification loop.
        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      Connect.prototype.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

      Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      };

      Connect.prototype.addExtraProps = function addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props;
        // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad
        var withExtras = _extends({}, props);
        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      };

      Connect.prototype.render = function render() {
        var selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return (0, _react.createElement)(WrappedComponent, this.addExtraProps(selector.props));
        }
      };

      return Connect;
    }(_react.Component);

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;
    Connect.propTypes = contextTypes;

    if (process.env.NODE_ENV !== 'production') {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        var _this2 = this;

        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector();

          // If any connected descendants don't hot reload (and resubscribe in the process), their
          // listeners will be lost when we unsubscribe. Unfortunately, by copying over all
          // listeners, this does mean that the old versions of connected descendants will still be
          // notified of state changes; however, their onStateChange function is a no-op so this
          // isn't a huge deal.
          var oldListeners = [];

          if (this.subscription) {
            oldListeners = this.subscription.listeners.get();
            this.subscription.tryUnsubscribe();
          }
          this.initSubscription();
          if (shouldHandleStateChanges) {
            this.subscription.trySubscribe();
            oldListeners.forEach(function (listener) {
              return _this2.subscription.listeners.subscribe(listener);
            });
          }
        }
      };
    }

    return (0, _hoistNonReactStatics2.default)(Connect, WrappedComponent);
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.hoistNonReactStatics = factory();
})(undefined, function () {
    'use strict';

    var REACT_STATICS = {
        childContextTypes: true,
        contextTypes: true,
        defaultProps: true,
        displayName: true,
        getDefaultProps: true,
        getDerivedStateFromProps: true,
        mixins: true,
        propTypes: true,
        type: true
    };

    var KNOWN_STATICS = {
        name: true,
        length: true,
        prototype: true,
        caller: true,
        callee: true,
        arguments: true,
        arity: true
    };

    var defineProperty = Object.defineProperty;
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var getPrototypeOf = Object.getPrototypeOf;
    var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

    return function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
        if (typeof sourceComponent !== 'string') {
            // don't hoist over string (html) components

            if (objectPrototype) {
                var inheritedComponent = getPrototypeOf(sourceComponent);
                if (inheritedComponent && inheritedComponent !== objectPrototype) {
                    hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
                }
            }

            var keys = getOwnPropertyNames(sourceComponent);

            if (getOwnPropertySymbols) {
                keys = keys.concat(getOwnPropertySymbols(sourceComponent));
            }

            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                    var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                    try {
                        // Avoid failures from read-only properties
                        defineProperty(targetComponent, key, descriptor);
                    } catch (e) {}
                }
            }

            return targetComponent;
        }

        return targetComponent;
    };
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapMapToPropsConstant = wrapMapToPropsConstant;
exports.getDependsOnOwnProps = getDependsOnOwnProps;
exports.wrapMapToPropsFunc = wrapMapToPropsFunc;

var _verifyPlainObject = __webpack_require__(27);

var _verifyPlainObject2 = _interopRequireDefault(_verifyPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}

// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    };

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      if (process.env.NODE_ENV !== 'production') (0, _verifyPlainObject2.default)(props, displayName, methodName);

      return props;
    };

    return proxy;
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = verifyPlainObject;

var _isPlainObject = __webpack_require__(11);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = __webpack_require__(12);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function verifyPlainObject(value, displayName, methodName) {
  if (!(0, _isPlainObject2.default)(value)) {
    (0, _warning2.default)(methodName + '() in ' + displayName + ' must return a plain object. Instead received ' + value + '.');
  }
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(66);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && msCrypto.getRandomValues.bind(msCrypto);
if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catalog = exports.simple = undefined;

var _catalog = __webpack_require__(32);

var catalog = _interopRequireWildcard(_catalog);

var _simple = __webpack_require__(85);

var simple = _interopRequireWildcard(_simple);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.simple = simple;
exports.catalog = catalog;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleEvent = exports.init = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(14);

var _reactRedux = __webpack_require__(47);

var _components = __webpack_require__(60);

var _reducer = __webpack_require__(84);

var _reducer2 = _interopRequireDefault(_reducer);

var _src = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducer2.default);
/**
 *
 */
function init(cmp) {
  (0, _src.render)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_components.CatalogApp, null)
  ), cmp);
}

exports.init = init;
exports.handleEvent = _src.handleEvent;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var m = __webpack_require__(4),
    n = __webpack_require__(5),
    p = __webpack_require__(6),
    q = "function" === typeof Symbol && Symbol["for"],
    r = q ? Symbol["for"]("react.element") : 60103,
    t = q ? Symbol["for"]("react.call") : 60104,
    u = q ? Symbol["for"]("react.return") : 60105,
    v = q ? Symbol["for"]("react.portal") : 60106,
    w = q ? Symbol["for"]("react.fragment") : 60107,
    x = "function" === typeof Symbol && Symbol.iterator;
function y(a) {
  for (var b = arguments.length - 1, e = "Minified React error #" + a + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d" + a, c = 0; c < b; c++) {
    e += "\x26args[]\x3d" + encodeURIComponent(arguments[c + 1]);
  }b = Error(e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name = "Invariant Violation";b.framesToPop = 1;throw b;
}
var z = { isMounted: function isMounted() {
    return !1;
  }, enqueueForceUpdate: function enqueueForceUpdate() {}, enqueueReplaceState: function enqueueReplaceState() {}, enqueueSetState: function enqueueSetState() {} };function A(a, b, e) {
  this.props = a;this.context = b;this.refs = n;this.updater = e || z;
}A.prototype.isReactComponent = {};A.prototype.setState = function (a, b) {
  "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a)) && "function" !== typeof a && null != a ? y("85") : void 0;this.updater.enqueueSetState(this, a, b, "setState");
};A.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function B(a, b, e) {
  this.props = a;this.context = b;this.refs = n;this.updater = e || z;
}function C() {}C.prototype = A.prototype;var D = B.prototype = new C();D.constructor = B;m(D, A.prototype);D.isPureReactComponent = !0;function E(a, b, e) {
  this.props = a;this.context = b;this.refs = n;this.updater = e || z;
}var F = E.prototype = new C();F.constructor = E;m(F, A.prototype);F.unstable_isAsyncReactComponent = !0;F.render = function () {
  return this.props.children;
};var G = { current: null },
    H = Object.prototype.hasOwnProperty,
    I = { key: !0, ref: !0, __self: !0, __source: !0 };
function J(a, b, e) {
  var c,
      d = {},
      g = null,
      k = null;if (null != b) for (c in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
    H.call(b, c) && !I.hasOwnProperty(c) && (d[c] = b[c]);
  }var f = arguments.length - 2;if (1 === f) d.children = e;else if (1 < f) {
    for (var h = Array(f), l = 0; l < f; l++) {
      h[l] = arguments[l + 2];
    }d.children = h;
  }if (a && a.defaultProps) for (c in f = a.defaultProps, f) {
    void 0 === d[c] && (d[c] = f[c]);
  }return { $$typeof: r, type: a, key: g, ref: k, props: d, _owner: G.current };
}function K(a) {
  return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && a.$$typeof === r;
}
function escape(a) {
  var b = { "\x3d": "\x3d0", ":": "\x3d2" };return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}var L = /\/+/g,
    M = [];function N(a, b, e, c) {
  if (M.length) {
    var d = M.pop();d.result = a;d.keyPrefix = b;d.func = e;d.context = c;d.count = 0;return d;
  }return { result: a, keyPrefix: b, func: e, context: c, count: 0 };
}function O(a) {
  a.result = null;a.keyPrefix = null;a.func = null;a.context = null;a.count = 0;10 > M.length && M.push(a);
}
function P(a, b, e, c) {
  var d = typeof a === "undefined" ? "undefined" : _typeof(a);if ("undefined" === d || "boolean" === d) a = null;var g = !1;if (null === a) g = !0;else switch (d) {case "string":case "number":
      g = !0;break;case "object":
      switch (a.$$typeof) {case r:case t:case u:case v:
          g = !0;}}if (g) return e(c, a, "" === b ? "." + Q(a, 0) : b), 1;g = 0;b = "" === b ? "." : b + ":";if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
    d = a[k];var f = b + Q(d, k);g += P(d, f, e, c);
  } else if (null === a || "undefined" === typeof a ? f = null : (f = x && a[x] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) {
    d = d.value, f = b + Q(d, k++), g += P(d, f, e, c);
  } else "object" === d && (e = "" + a, y("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));return g;
}function Q(a, b) {
  return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && null != a.key ? escape(a.key) : b.toString(36);
}function R(a, b) {
  a.func.call(a.context, b, a.count++);
}
function S(a, b, e) {
  var c = a.result,
      d = a.keyPrefix;a = a.func.call(a.context, b, a.count++);Array.isArray(a) ? T(a, c, e, p.thatReturnsArgument) : null != a && (K(a) && (b = d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(L, "$\x26/") + "/") + e, a = { $$typeof: r, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner }), c.push(a));
}function T(a, b, e, c, d) {
  var g = "";null != e && (g = ("" + e).replace(L, "$\x26/") + "/");b = N(b, g, c, d);null == a || P(a, "", S, b);O(b);
}
var U = { Children: { map: function map(a, b, e) {
      if (null == a) return a;var c = [];T(a, c, null, b, e);return c;
    }, forEach: function forEach(a, b, e) {
      if (null == a) return a;b = N(null, null, b, e);null == a || P(a, "", R, b);O(b);
    }, count: function count(a) {
      return null == a ? 0 : P(a, "", p.thatReturnsNull, null);
    }, toArray: function toArray(a) {
      var b = [];T(a, b, null, p.thatReturnsArgument);return b;
    }, only: function only(a) {
      K(a) ? void 0 : y("143");return a;
    } }, Component: A, PureComponent: B, unstable_AsyncComponent: E, Fragment: w, createElement: J, cloneElement: function cloneElement(a, b, e) {
    var c = m({}, a.props),
        d = a.key,
        g = a.ref,
        k = a._owner;if (null != b) {
      void 0 !== b.ref && (g = b.ref, k = G.current);void 0 !== b.key && (d = "" + b.key);if (a.type && a.type.defaultProps) var f = a.type.defaultProps;for (h in b) {
        H.call(b, h) && !I.hasOwnProperty(h) && (c[h] = void 0 === b[h] && void 0 !== f ? f[h] : b[h]);
      }
    }var h = arguments.length - 2;if (1 === h) c.children = e;else if (1 < h) {
      f = Array(h);for (var l = 0; l < h; l++) {
        f[l] = arguments[l + 2];
      }c.children = f;
    }return { $$typeof: r, type: a.type, key: d, ref: g, props: c, _owner: k };
  }, createFactory: function createFactory(a) {
    var b = J.bind(null, a);b.type = a;return b;
  },
  isValidElement: K, version: "16.2.0", __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { ReactCurrentOwner: G, assign: m } },
    V = Object.freeze({ default: U }),
    W = V && U || V;module.exports = W["default"] ? W["default"] : W;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.2.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (process.env.NODE_ENV !== "production") {
  (function () {
    'use strict';

    var _assign = __webpack_require__(4);
    var emptyObject = __webpack_require__(5);
    var invariant = __webpack_require__(7);
    var warning = __webpack_require__(8);
    var emptyFunction = __webpack_require__(6);
    var checkPropTypes = __webpack_require__(9);

    // TODO: this is special because it gets imported during build.

    var ReactVersion = '16.2.0';

    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
    var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
    var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;

    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable === 'undefined') {
        return null;
      }
      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }
      return null;
    }

    /**
     * WARNING: DO NOT manually require this module.
     * This is a replacement for `invariant(...)` used by the error code system
     * and will _only_ be required by the corresponding babel pass.
     * It always throws.
     */

    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var lowPriorityWarning = function lowPriorityWarning() {};

    {
      var printWarning = function printWarning(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        if (typeof console !== 'undefined') {
          console.warn(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      lowPriorityWarning = function lowPriorityWarning(condition, format) {
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }

    var lowPriorityWarning$1 = lowPriorityWarning;

    var didWarnStateUpdateForUnmountedComponent = {};

    function warnNoop(publicInstance, callerName) {
      {
        var constructor = publicInstance.constructor;
        var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
        var warningKey = componentName + '.' + callerName;
        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
          return;
        }
        warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
      }
    }

    /**
     * This is the abstract API for an update queue.
     */
    var ReactNoopUpdateQueue = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function isMounted(publicInstance) {
        return false;
      },

      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
        warnNoop(publicInstance, 'forceUpdate');
      },

      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
        warnNoop(publicInstance, 'replaceState');
      },

      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };

    /**
     * Base class helpers for the updating state of a component.
     */
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }

    Component.prototype.isReactComponent = {};

    /**
     * Sets a subset of the state. Always use this to mutate
     * state. You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * There is no guarantee that calls to `setState` will run synchronously,
     * as they may eventually be batched together.  You can provide an optional
     * callback that will be executed when the call to setState is actually
     * completed.
     *
     * When a function is provided to setState, it will be called at some point in
     * the future (not synchronously). It will be called with the up to date
     * component arguments (state, props, context). These values can be different
     * from this.* because your function may be called after receiveProps but before
     * shouldComponentUpdate, and this new state, props, and context will not yet be
     * assigned to this.
     *
     * @param {object|function} partialState Next partial state or function to
     *        produce next partial state to be merged with current state.
     * @param {?function} callback Called after state is updated.
     * @final
     * @protected
     */
    Component.prototype.setState = function (partialState, callback) {
      !((typeof partialState === 'undefined' ? 'undefined' : _typeof(partialState)) === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };

    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {?function} callback Called after update is complete.
     * @final
     * @protected
     */
    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };

    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */
    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };
      var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function get() {
            lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };
      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }

    /**
     * Base class helpers for the updating state of a component.
     */
    function PureComponent(props, context, updater) {
      // Duplicated from Component.
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }

    function ComponentDummy() {}
    ComponentDummy.prototype = Component.prototype;
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    // Avoid an extra prototype jump for these methods.
    _assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;

    function AsyncComponent(props, context, updater) {
      // Duplicated from Component.
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }

    var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
    asyncComponentPrototype.constructor = AsyncComponent;
    // Avoid an extra prototype jump for these methods.
    _assign(asyncComponentPrototype, Component.prototype);
    asyncComponentPrototype.unstable_isAsyncReactComponent = true;
    asyncComponentPrototype.render = function () {
      return this.props.children;
    };

    /**
     * Keeps track of the current owner.
     *
     * The current owner is the component who should own any components that are
     * currently being constructed.
     */
    var ReactCurrentOwner = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };

    var specialPropKeyWarningShown;
    var specialPropRefWarningShown;

    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }

    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }

    function defineKeyPropWarningGetter(props, displayName) {
      var warnAboutAccessingKey = function warnAboutAccessingKey() {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;
          warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }

    function defineRefPropWarningGetter(props, displayName) {
      var warnAboutAccessingRef = function warnAboutAccessingRef() {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;
          warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };
      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }

    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, no instanceof check
     * will work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} key
     * @param {string|object} ref
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @param {*} owner
     * @param {*} props
     * @internal
     */
    var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allow us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,

        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,

        // Record the component responsible for creating this element.
        _owner: owner
      };

      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {};

        // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.
        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        });
        // self and source are DEV only properties.
        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        });
        // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.
        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });
        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }

      return element;
    };

    /**
     * Create and return a new ReactElement of the given type.
     * See https://reactjs.org/docs/react-api.html#createelement
     */
    function createElement(type, config, children) {
      var propName;

      // Reserved names are extracted
      var props = {};

      var key = null;
      var ref = null;
      var self = null;
      var source = null;

      if (config != null) {
        if (hasValidRef(config)) {
          ref = config.ref;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source;
        // Remaining properties are added to a new props object
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      }

      // Resolve default props
      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;
        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }
      {
        if (key || ref) {
          if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
            var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }

    /**
     * Return a function that produces ReactElements of a given type.
     * See https://reactjs.org/docs/react-api.html#createfactory
     */

    function cloneAndReplaceKey(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

      return newElement;
    }

    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://reactjs.org/docs/react-api.html#cloneelement
     */
    function cloneElement(element, config, children) {
      var propName;

      // Original props are copied
      var props = _assign({}, element.props);

      // Reserved names are extracted
      var key = element.key;
      var ref = element.ref;
      // Self is preserved since the owner is preserved.
      var self = element._self;
      // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.
      var source = element._source;

      // Owner will be preserved, unless ref is overridden
      var owner = element._owner;

      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        // Remaining properties override existing props
        var defaultProps;
        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              // Resolve default props
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
      }

      return ReactElement(element.type, key, ref, self, source, owner, props);
    }

    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a valid component.
     * @final
     */
    function isValidElement(object) {
      return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    var ReactDebugCurrentFrame = {};

    {
      // Component that is being worked on
      ReactDebugCurrentFrame.getCurrentStack = null;

      ReactDebugCurrentFrame.getStackAddendum = function () {
        var impl = ReactDebugCurrentFrame.getCurrentStack;
        if (impl) {
          return impl();
        }
        return null;
      };
    }

    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';

    /**
     * Escape and wrap key so it is safe to use as a reactid
     *
     * @param {string} key to be escaped.
     * @return {string} the escaped key.
     */
    function escape(key) {
      var escapeRegex = /[=:]/g;
      var escaperLookup = {
        '=': '=0',
        ':': '=2'
      };
      var escapedString = ('' + key).replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });

      return '$' + escapedString;
    }

    /**
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */

    var didWarnAboutMaps = false;

    var userProvidedKeyEscapeRegex = /\/+/g;
    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }

    var POOL_SIZE = 10;
    var traverseContextPool = [];
    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
      if (traverseContextPool.length) {
        var traverseContext = traverseContextPool.pop();
        traverseContext.result = mapResult;
        traverseContext.keyPrefix = keyPrefix;
        traverseContext.func = mapFunction;
        traverseContext.context = mapContext;
        traverseContext.count = 0;
        return traverseContext;
      } else {
        return {
          result: mapResult,
          keyPrefix: keyPrefix,
          func: mapFunction,
          context: mapContext,
          count: 0
        };
      }
    }

    function releaseTraverseContext(traverseContext) {
      traverseContext.result = null;
      traverseContext.keyPrefix = null;
      traverseContext.func = null;
      traverseContext.context = null;
      traverseContext.count = 0;
      if (traverseContextPool.length < POOL_SIZE) {
        traverseContextPool.push(traverseContext);
      }
    }

    /**
     * @param {?*} children Children tree container.
     * @param {!string} nameSoFar Name of the key path so far.
     * @param {!function} callback Callback to invoke with each child found.
     * @param {?*} traverseContext Used to pass information throughout the traversal
     * process.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = typeof children === 'undefined' ? 'undefined' : _typeof(children);

      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }

      var invokeCallback = false;

      if (children === null) {
        invokeCallback = true;
      } else {
        switch (type) {
          case 'string':
          case 'number':
            invokeCallback = true;
            break;
          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_CALL_TYPE:
              case REACT_RETURN_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
            }
        }
      }

      if (invokeCallback) {
        callback(traverseContext, children,
        // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }

      var child;
      var nextName;
      var subtreeCount = 0; // Count of children found in the current subtree.
      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);
        if (typeof iteratorFn === 'function') {
          {
            // Warn about using Maps as children
            if (iteratorFn === children.entries) {
              warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
              didWarnAboutMaps = true;
            }
          }

          var iterator = iteratorFn.call(children);
          var step;
          var ii = 0;
          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getComponentKey(child, ii++);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else if (type === 'object') {
          var addendum = '';
          {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
          }
          var childrenString = '' + children;
          invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
        }
      }

      return subtreeCount;
    }

    /**
     * Traverses children that are typically specified as `props.children`, but
     * might also be specified through attributes:
     *
     * - `traverseAllChildren(this.props.children, ...)`
     * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
     *
     * The `traverseContext` is an optional argument that is passed through the
     * entire traversal. It can be used to store accumulations or anything else that
     * the callback might find relevant.
     *
     * @param {?*} children Children tree object.
     * @param {!function} callback To invoke upon traversing each child.
     * @param {?*} traverseContext Context for traversal.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }

      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }

    /**
     * Generate a key string that identifies a component within a set.
     *
     * @param {*} component A component that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */
    function getComponentKey(component, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if ((typeof component === 'undefined' ? 'undefined' : _typeof(component)) === 'object' && component !== null && component.key != null) {
        // Explicit key
        return escape(component.key);
      }
      // Implicit key determined by the index in the set
      return index.toString(36);
    }

    function forEachSingleChild(bookKeeping, child, name) {
      var func = bookKeeping.func,
          context = bookKeeping.context;

      func.call(context, child, bookKeeping.count++);
    }

    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.foreach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */
    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }
      var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
      var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context;

      var mappedChild = func.call(context, child, bookKeeping.count++);
      if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(mappedChild,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
        }
        result.push(mappedChild);
      }
    }

    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
      var escapedPrefix = '';
      if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + '/';
      }
      var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.map
     *
     * The provided mapFunction(child, key, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} func The map function.
     * @param {*} context Context for mapFunction.
     * @return {object} Object containing the ordered map of results.
     */
    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, func, context);
      return result;
    }

    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.count
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */
    function countChildren(children, context) {
      return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
    }

    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.toarray
     */
    function toArray(children) {
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
      return result;
    }

    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.only
     *
     * The current implementation of this function assumes that a single child gets
     * passed without a wrapper, but the purpose of this helper function is to
     * abstract away the particular structure of children.
     *
     * @param {?object} children Child collection structure.
     * @return {ReactElement} The first and only `ReactElement` contained in the
     * structure.
     */
    function onlyChild(children) {
      !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
      return children;
    }

    var describeComponentFrame = function describeComponentFrame(name, source, ownerName) {
      return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
    };

    function getComponentName(fiber) {
      var type = fiber.type;

      if (typeof type === 'string') {
        return type;
      }
      if (typeof type === 'function') {
        return type.displayName || type.name;
      }
      return null;
    }

    /**
     * ReactElementValidator provides a wrapper around a element factory
     * which validates the props passed to the element. This is intended to be
     * used only in DEV and could be replaced by a static type checker for languages
     * that support it.
     */

    {
      var currentlyValidatingElement = null;

      var propTypesMisspellWarningShown = false;

      var getDisplayName = function getDisplayName(element) {
        if (element == null) {
          return '#empty';
        } else if (typeof element === 'string' || typeof element === 'number') {
          return '#text';
        } else if (typeof element.type === 'string') {
          return element.type;
        } else if (element.type === REACT_FRAGMENT_TYPE) {
          return 'React.Fragment';
        } else {
          return element.type.displayName || element.type.name || 'Unknown';
        }
      };

      var getStackAddendum = function getStackAddendum() {
        var stack = '';
        if (currentlyValidatingElement) {
          var name = getDisplayName(currentlyValidatingElement);
          var owner = currentlyValidatingElement._owner;
          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
        }
        stack += ReactDebugCurrentFrame.getStackAddendum() || '';
        return stack;
      };

      var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
    }

    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = getComponentName(ReactCurrentOwner.current);
        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }
      return '';
    }

    function getSourceInfoErrorAddendum(elementProps) {
      if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
        var source = elementProps.__source;
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }
      return '';
    }

    /**
     * Warn if there's no key explicitly set on dynamic arrays of children or
     * object keys are not valid. This allows us to keep track of children between
     * updates.
     */
    var ownerHasKeyUseWarning = {};

    function getCurrentComponentErrorInfo(parentType) {
      var info = getDeclarationErrorAddendum();

      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
        if (parentName) {
          info = '\n\nCheck the top-level render call using <' + parentName + '>.';
        }
      }
      return info;
    }

    /**
     * Warn if the element doesn't have an explicit key assigned to it.
     * This element is in an array. The array could grow and shrink or be
     * reordered. All children that haven't already been validated are required to
     * have a "key" property assigned to it. Error statuses are cached so a warning
     * will only be shown once.
     *
     * @internal
     * @param {ReactElement} element Element that requires a key.
     * @param {*} parentType element's parent's type.
     */
    function validateExplicitKey(element, parentType) {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }
      element._store.validated = true;

      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }
      ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

      // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.
      var childOwner = '';
      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        // Give the component that originally created this child.
        childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
      }

      currentlyValidatingElement = element;
      {
        warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
      }
      currentlyValidatingElement = null;
    }

    /**
     * Ensure that every element either is passed in a static location, in an
     * array with an explicit keys property defined, or in an object literal
     * with valid key property.
     *
     * @internal
     * @param {ReactNode} node Statically passed child of any type.
     * @param {*} parentType node's parent's type.
     */
    function validateChildKeys(node, parentType) {
      if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object') {
        return;
      }
      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];
          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);
        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step;
            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }

    /**
     * Given an element, validate that its props follow the propTypes definition,
     * provided by the type.
     *
     * @param {ReactElement} element
     */
    function validatePropTypes(element) {
      var componentClass = element.type;
      if (typeof componentClass !== 'function') {
        return;
      }
      var name = componentClass.displayName || componentClass.name;
      var propTypes = componentClass.propTypes;
      if (propTypes) {
        currentlyValidatingElement = element;
        checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
        currentlyValidatingElement = null;
      } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true;
        warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
      }
      if (typeof componentClass.getDefaultProps === 'function') {
        warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
      }
    }

    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */
    function validateFragmentProps(fragment) {
      currentlyValidatingElement = fragment;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (!VALID_FRAGMENT_PROPS.has(key)) {
            warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (fragment.ref !== null) {
        warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
      }

      currentlyValidatingElement = null;
    }

    function createElementWithValidation(type, props, children) {
      var validType = typeof type === 'string' || typeof type === 'function' || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'symbol' || typeof type === 'number';
      // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.
      if (!validType) {
        var info = '';
        if (type === undefined || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);
        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += getStackAddendum() || '';

        warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type === 'undefined' ? 'undefined' : _typeof(type), info);
      }

      var element = createElement.apply(this, arguments);

      // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.
      if (element == null) {
        return element;
      }

      // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)
      if (validType) {
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
      }

      if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'symbol' && type === REACT_FRAGMENT_TYPE) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }

    function createFactoryWithValidation(type) {
      var validatedFactory = createElementWithValidation.bind(null, type);
      // Legacy hook TODO: Warn if this is accessed
      validatedFactory.type = type;

      {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function get() {
            lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }

      return validatedFactory;
    }

    function cloneElementWithValidation(element, props, children) {
      var newElement = cloneElement.apply(this, arguments);
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }
      validatePropTypes(newElement);
      return newElement;
    }

    var React = {
      Children: {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray: toArray,
        only: onlyChild
      },

      Component: Component,
      PureComponent: PureComponent,
      unstable_AsyncComponent: AsyncComponent,

      Fragment: REACT_FRAGMENT_TYPE,

      createElement: createElementWithValidation,
      cloneElement: cloneElementWithValidation,
      createFactory: createFactoryWithValidation,
      isValidElement: isValidElement,

      version: ReactVersion,

      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        ReactCurrentOwner: ReactCurrentOwner,
        // Used by renderers to avoid bundling object-assign twice in UMD bundles:
        assign: _assign
      }
    };

    {
      _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
        // These should not be included in production.
        ReactDebugCurrentFrame: ReactDebugCurrentFrame,
        // Shim for React DOM 16.0.0 which still destructured (but not used) this.
        // TODO: remove in React 17.0.
        ReactComponentTreeHook: {}
      });
    }

    var React$2 = Object.freeze({
      default: React
    });

    var React$3 = React$2 && React || React$2;

    // TODO: decide on the top-level export form.
    // This is hacky but makes it work with both Rollup and Jest.
    var react = React$3['default'] ? React$3['default'] : React$3;

    module.exports = react;
  })();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Symbol2 = __webpack_require__(16);

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _getRawTag = __webpack_require__(38);

var _getRawTag2 = _interopRequireDefault(_getRawTag);

var _objectToString = __webpack_require__(39);

var _objectToString2 = _interopRequireDefault(_objectToString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol3.default ? _Symbol3.default.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? (0, _getRawTag2.default)(value) : (0, _objectToString2.default)(value);
}

exports.default = baseGetTag;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _freeGlobal = __webpack_require__(37);

var _freeGlobal2 = _interopRequireDefault(_freeGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal2.default || freeSelf || Function('return this')();

exports.default = root;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

exports.default = freeGlobal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Symbol2 = __webpack_require__(16);

var _Symbol3 = _interopRequireDefault(_Symbol2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol3.default ? _Symbol3.default.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

exports.default = getRawTag;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

exports.default = objectToString;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _overArg = __webpack_require__(41);

var _overArg2 = _interopRequireDefault(_overArg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Built-in value references. */
var getPrototype = (0, _overArg2.default)(Object.getPrototypeOf, Object);

exports.default = getPrototype;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

exports.default = overArg;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

exports.default = isObjectLike;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineReducers;

var _createStore = __webpack_require__(15);

var _isPlainObject = __webpack_require__(11);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = __webpack_require__(20);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2.default)(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        (0, _warning2.default)('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        (0, _warning2.default)(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if ((typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyMiddleware;

var _compose = __webpack_require__(21);

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2.default.apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = exports.connectAdvanced = exports.createProvider = exports.Provider = undefined;

var _Provider = __webpack_require__(48);

var _Provider2 = _interopRequireDefault(_Provider);

var _connectAdvanced = __webpack_require__(24);

var _connectAdvanced2 = _interopRequireDefault(_connectAdvanced);

var _connect = __webpack_require__(53);

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Provider = _Provider2.default;
exports.createProvider = _Provider.createProvider;
exports.connectAdvanced = _connectAdvanced2.default;
exports.connect = _connect2.default;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.createProvider = createProvider;

var _react = __webpack_require__(1);

var _propTypes = __webpack_require__(22);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PropTypes = __webpack_require__(23);

var _warning = __webpack_require__(12);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  (0, _warning2.default)('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

function createProvider() {
  var _Provider$childContex;

  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  var subKey = arguments[1];

  var subscriptionKey = subKey || storeKey + 'Subscription';

  var Provider = function (_Component) {
    _inherits(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
    };

    function Provider(props, context) {
      _classCallCheck(this, Provider);

      var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

      _this[storeKey] = props.store;
      return _this;
    }

    Provider.prototype.render = function render() {
      return _react.Children.only(this.props.children);
    };

    return Provider;
  }(_react.Component);

  if (process.env.NODE_ENV !== 'production') {
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
      if (this[storeKey] !== nextProps.store) {
        warnAboutReceivingStore();
      }
    };
  }

  Provider.propTypes = {
    store: _PropTypes.storeShape.isRequired,
    children: _propTypes2.default.element.isRequired
  };
  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = _PropTypes.storeShape.isRequired, _Provider$childContex[subscriptionKey] = _PropTypes.subscriptionShape, _Provider$childContex);

  return Provider;
}

exports.default = createProvider();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var emptyFunction = __webpack_require__(6);
var invariant = __webpack_require__(7);
var warning = __webpack_require__(8);
var assign = __webpack_require__(4);

var ReactPropTypesSecret = __webpack_require__(10);
var checkPropTypes = __webpack_require__(9);

module.exports = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey] &&
          // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName);
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(false, 'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received %s at index %s.', getPostfixForTypeWarning(checker), i);
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(6);
var invariant = __webpack_require__(7);
var ReactPropTypesSecret = __webpack_require__(10);

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function invariant(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];

  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    get: function get() {
      return next;
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;

        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription = function () {
  function Subscription(store, parentSub, onStateChange) {
    _classCallCheck(this, Subscription);

    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  Subscription.prototype.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  Subscription.prototype.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);

      this.listeners = createListenerCollection();
    }
  };

  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();

exports.default = Subscription;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.createConnect = createConnect;

var _connectAdvanced = __webpack_require__(24);

var _connectAdvanced2 = _interopRequireDefault(_connectAdvanced);

var _shallowEqual = __webpack_require__(54);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _mapDispatchToProps = __webpack_require__(55);

var _mapDispatchToProps2 = _interopRequireDefault(_mapDispatchToProps);

var _mapStateToProps = __webpack_require__(56);

var _mapStateToProps2 = _interopRequireDefault(_mapStateToProps);

var _mergeProps = __webpack_require__(57);

var _mergeProps2 = _interopRequireDefault(_mergeProps);

var _selectorFactory = __webpack_require__(58);

var _selectorFactory2 = _interopRequireDefault(_selectorFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error('Invalid value of type ' + (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
  };
}

function strictEqual(a, b) {
  return a === b;
}

// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
function createConnect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === undefined ? _connectAdvanced2.default : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? _mapStateToProps2.default : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? _mapDispatchToProps2.default : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === undefined ? _mergeProps2.default : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === undefined ? _selectorFactory2.default : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref2$pure = _ref2.pure,
        pure = _ref2$pure === undefined ? true : _ref2$pure,
        _ref2$areStatesEqual = _ref2.areStatesEqual,
        areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
        areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? _shallowEqual2.default : _ref2$areOwnPropsEqua,
        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
        areStatePropsEqual = _ref2$areStatePropsEq === undefined ? _shallowEqual2.default : _ref2$areStatePropsEq,
        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
        areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? _shallowEqual2.default : _ref2$areMergedPropsE,
        extraOptions = _objectWithoutProperties(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

    return connectHOC(selectorFactory, _extends({
      // used in error messages
      methodName: 'connect',

      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return 'Connect(' + name + ')';
      },

      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),

      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual

    }, extraOptions));
  };
}

exports.default = createConnect();

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = shallowEqual;
var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.whenMapDispatchToPropsIsFunction = whenMapDispatchToPropsIsFunction;
exports.whenMapDispatchToPropsIsMissing = whenMapDispatchToPropsIsMissing;
exports.whenMapDispatchToPropsIsObject = whenMapDispatchToPropsIsObject;

var _redux = __webpack_require__(14);

var _wrapMapToProps = __webpack_require__(26);

function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? (0, _wrapMapToProps.wrapMapToPropsFunc)(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}

function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? (0, _wrapMapToProps.wrapMapToPropsConstant)(function (dispatch) {
    return { dispatch: dispatch };
  }) : undefined;
}

function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && (typeof mapDispatchToProps === 'undefined' ? 'undefined' : _typeof(mapDispatchToProps)) === 'object' ? (0, _wrapMapToProps.wrapMapToPropsConstant)(function (dispatch) {
    return (0, _redux.bindActionCreators)(mapDispatchToProps, dispatch);
  }) : undefined;
}

exports.default = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whenMapStateToPropsIsFunction = whenMapStateToPropsIsFunction;
exports.whenMapStateToPropsIsMissing = whenMapStateToPropsIsMissing;

var _wrapMapToProps = __webpack_require__(26);

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? (0, _wrapMapToProps.wrapMapToPropsFunc)(mapStateToProps, 'mapStateToProps') : undefined;
}

function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? (0, _wrapMapToProps.wrapMapToPropsConstant)(function () {
    return {};
  }) : undefined;
}

exports.default = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultMergeProps = defaultMergeProps;
exports.wrapMergePropsFunc = wrapMergePropsFunc;
exports.whenMergePropsIsFunction = whenMergePropsIsFunction;
exports.whenMergePropsIsOmitted = whenMergePropsIsOmitted;

var _verifyPlainObject = __webpack_require__(27);

var _verifyPlainObject2 = _interopRequireDefault(_verifyPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends({}, ownProps, stateProps, dispatchProps);
}

function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;

    var hasRunOnce = false;
    var mergedProps = void 0;

    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;

        if (process.env.NODE_ENV !== 'production') (0, _verifyPlainObject2.default)(mergedProps, displayName, 'mergeProps');
      }

      return mergedProps;
    };
  };
}

function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}

function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}

exports.default = [whenMergePropsIsFunction, whenMergePropsIsOmitted];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.impureFinalPropsSelectorFactory = impureFinalPropsSelectorFactory;
exports.pureFinalPropsSelectorFactory = pureFinalPropsSelectorFactory;
exports.default = finalPropsSelectorFactory;

var _verifySubselectors = __webpack_require__(59);

var _verifySubselectors2 = _interopRequireDefault(_verifySubselectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}

function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;

  var hasRunAtLeastOnce = false;
  var state = void 0;
  var ownProps = void 0;
  var stateProps = void 0;
  var dispatchProps = void 0;
  var mergedProps = void 0;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;

    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);

    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;

    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}

// TODO: Add more comments

// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = _objectWithoutProperties(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  if (process.env.NODE_ENV !== 'production') {
    (0, _verifySubselectors2.default)(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
  }

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;

  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = verifySubselectors;

var _warning = __webpack_require__(12);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error('Unexpected value for ' + methodName + ' in ' + displayName + '.');
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
      (0, _warning2.default)('The selector for ' + methodName + ' of ' + displayName + ' did not specify a value for dependsOnOwnProps.');
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CatalogApp = undefined;

var _CatalogApp = __webpack_require__(61);

var _CatalogApp2 = _interopRequireDefault(_CatalogApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.CatalogApp = _CatalogApp2.default;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _recompose = __webpack_require__(3);

var _src = __webpack_require__(2);

var _ButtonExample = __webpack_require__(78);

var _ButtonExample2 = _interopRequireDefault(_ButtonExample);

var _LayoutExample = __webpack_require__(79);

var _LayoutExample2 = _interopRequireDefault(_LayoutExample);

var _RecordEditFormExample = __webpack_require__(80);

var _RecordEditFormExample2 = _interopRequireDefault(_RecordEditFormExample);

var _ChatterExample = __webpack_require__(81);

var _ChatterExample2 = _interopRequireDefault(_ChatterExample);

var _CustomComponentExample = __webpack_require__(83);

var _CustomComponentExample2 = _interopRequireDefault(_CustomComponentExample);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EXAMPLES = [{ label: 'Button', name: 'button' }, { label: 'Chatter', name: 'chatter' }, { label: 'Layout', name: 'layout' }, { label: 'RecordEditForm', name: 'recordEditForm' }, { label: 'Custom Component', name: 'customComponent' }];

var enhancer = (0, _recompose.compose)((0, _recompose.withStateHandlers)({
  selected: 'button',
  rendered: { button: true }
}, {
  onChangeSelected: function onChangeSelected(_ref) {
    var selected = _ref.selected,
        rendered = _ref.rendered;
    return function (e) {
      var selected = e.getParam('name');
      return {
        selected: selected,
        rendered: _extends({}, rendered, _defineProperty({}, selected, true))
      };
    };
  }
}));

var showOn = function showOn(bool) {
  return bool ? 'slds-show' : 'slds-hide';
};

var CatalogApp = enhancer(function (props) {
  var selected = props.selected,
      rendered = props.rendered,
      onChangeSelected = props.onChangeSelected;

  return _react2.default.createElement(
    _src.Layout,
    { horizontalAlign: 'spread' },
    _react2.default.createElement(
      _src.LayoutItem,
      { size: '3', className: 'slds-p-right--x-small' },
      _react2.default.createElement(
        _src.VerticalNavigation,
        { selectedItem: selected, onselect: onChangeSelected },
        _react2.default.createElement(
          _src.VerticalNavigationSection,
          { label: 'Examples' },
          EXAMPLES.map(function (_ref2) {
            var label = _ref2.label,
                name = _ref2.name;
            return _react2.default.createElement(_src.VerticalNavigationItem, { key: name, label: label, name: name });
          })
        )
      )
    ),
    _react2.default.createElement(
      _src.LayoutItem,
      { size: '9', className: 'slds-p-left--x-small' },
      rendered.button ? _react2.default.createElement(_ButtonExample2.default, { className: showOn(selected === 'button') }) : undefined,
      rendered.chatter ? _react2.default.createElement(_ChatterExample2.default, { className: showOn(selected === 'chatter') }) : undefined,
      rendered.layout ? _react2.default.createElement(_LayoutExample2.default, { className: showOn(selected === 'layout') }) : undefined,
      rendered.recordEditForm ? _react2.default.createElement(_RecordEditFormExample2.default, { className: showOn(selected === 'recordEditForm') }) : undefined,
      _react2.default.createElement(_CustomComponentExample2.default, { className: showOn(selected === 'customComponent') })
    )
  );
});

exports.default = CatalogApp;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var createChangeEmitter = exports.createChangeEmitter = function createChangeEmitter() {
  var currentListeners = [];
  var nextListeners = currentListeners;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  function listen(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function () {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  function emit() {
    currentListeners = nextListeners;
    var listeners = currentListeners;
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(listeners, arguments);
    }
  }

  return {
    listen: listen,
    emit: emit
  };
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.handleEvent = handleEvent;
exports.render = render;
exports.mapAttrToProps = mapAttrToProps;

var _events = __webpack_require__(64);

var _events2 = _interopRequireDefault(_events);

var _LightningRenderer = __webpack_require__(65);

var _LightningRenderer2 = _interopRequireDefault(_LightningRenderer);

var _recompose = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 */
function findInstance(inst, id) {
  if (!inst) {
    return null;
  }
  if (inst.id === id) {
    return inst;
  }
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = inst.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var cinst = _step.value;

      if (typeof cinst !== 'string') {
        var ret = findInstance(cinst, id);
        if (ret) {
          return ret;
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return null;
}

function findHandlerFunc(inst, eventName) {
  var propName = void 0;
  if (inst.type === 'lightning:input') {
    if (eventName === 'input' || inst.props.type === 'checkbox' && eventName === 'click') {
      propName = 'onchange';
    }
  } else {
    propName = 'on' + eventName;
  }
  return inst.props[propName];
}

function createEventHandler(container) {
  return function (cmp, event) {
    var srcCmp = event.getSource();
    var eventName = event.getName();
    console.log('handleEvent', srcCmp, eventName);
    var inst = findInstance(container.root, srcCmp.getLocalId());
    if (!inst) {
      return;
    }
    var fn = findHandlerFunc(inst, eventName);
    if (!fn) {
      return;
    }
    fn(event);
  };
}

var _eventHandlers = {};

function createContainer(cmp) {
  var container = {
    cmp: cmp,
    auraRun: $A.getCallback(function (fn) {
      if (cmp.isValid()) fn();
    })
  };
  var gid = cmp.getGlobalId();
  _eventHandlers[gid] = createEventHandler(container);
  return container;
};

function handleEvent(component, event) {
  var gid = component.getGlobalId();
  var handler = _eventHandlers[gid];
  handler(component, event);
}

function render(element, component) {
  // Create root container instance
  var container = createContainer(component);
  var node = _LightningRenderer2.default.createContainer(container);
  _LightningRenderer2.default.updateContainer(element, node, null);
}

function mapAttrToProps(component, attrNames) {
  function getAttrValues() {
    var attrs = attrNames.reduce(function (props, attrName) {
      return _extends({}, props, _defineProperty({}, attrName, component.get('v.' + attrName)));
    }, {});
    return attrs;
  };
  var initAttrValues = getAttrValues();
  var attrEvent = new _events2.default();
  var update = function update() {
    var attrValues = getAttrValues();
    attrEvent.emit('change', attrValues);
  };
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = attrNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var attrName = _step2.value;

      component.addValueHandler({
        event: 'change',
        value: 'v.' + attrName,
        method: update
      });
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return (0, _recompose.compose)((0, _recompose.withStateHandlers)(initAttrValues, {
    onChangeAttributeValues: function onChangeAttributeValues() {
      return function (attrValues) {
        return attrValues;
      };
    }
  }), (0, _recompose.lifecycle)({
    componentDidMount: function componentDidMount() {
      var onChangeAttributeValues = this.props.onChangeAttributeValues;

      attrEvent.on('change', onChangeAttributeValues);
    },
    componentWillUnmount: function componentWillUnmount() {
      var onChangeAttributeValues = this.props.onChangeAttributeValues;

      attrEvent.removeListener('change', onChangeAttributeValues);
    }
  }));
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function (n) {
  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function (type) {
  var er, handler, len, args, i, listeners;

  if (!this._events) this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler)) return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++) {
      listeners[i].apply(this, args);
    }
  }

  return true;
};

EventEmitter.prototype.addListener = function (type, listener) {
  var m;

  if (!isFunction(listener)) throw TypeError('listener must be a function');

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function (type, listener) {
  if (!isFunction(listener)) throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function (type, listener) {
  var list, position, length, i;

  if (!isFunction(listener)) throw TypeError('listener must be a function');

  if (!this._events || !this._events[type]) return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener || isFunction(list.listener) && list.listener === listener) {
    delete this._events[type];
    if (this._events.removeListener) this.emit('removeListener', type, listener);
  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
        position = i;
        break;
      }
    }

    if (position < 0) return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener) this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function (type) {
  var key, listeners;

  if (!this._events) return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length) {
      this.removeListener(type, listeners[listeners.length - 1]);
    }
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function (type) {
  var ret;
  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function (type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function (emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(28);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var createComponents = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(componentDefs) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              $A.createComponents(componentDefs, function (components, status, errMessages) {
                if (status === 'SUCCESS') {
                  resolve(components);
                } else {
                  var message = errMessages && errMessages.filter(function (err) {
                    return err.status !== 'SUCCESS';
                  }).map(function (err) {
                    return err.message;
                  }).join('\n');
                  reject(new Error(message));
                }
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createComponents(_x) {
    return _ref.apply(this, arguments);
  };
}();

var registerComponentRoot = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(container) {
    var root;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (container.root) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt('return');

          case 2:
            root = container.root;
            _context2.next = 5;
            return syncComponentTree(container.root);

          case 5:
            container.auraRun(function () {
              container.cmp.set('v.body', root.cmp);
            });

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function registerComponentRoot(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var syncComponentTree = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(inst) {
    var cmpInsts, cmpMap, initInsts, initCompDefs, components, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref4, _ref5, index, cmp_, _cmp2, i, initInst;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('syncComponentTree', inst);
            cmpInsts = flattenToInstanceArray(inst);
            cmpMap = {};
            initInsts = cmpInsts.filter(function (cmpInst) {
              return !cmpInst.cmp;
            });
            initCompDefs = initInsts.map(convertToComponentDefs);

            console.log('compDefs=>', initCompDefs);

            if (!(initCompDefs.length > 0)) {
              _context3.next = 29;
              break;
            }

            _context3.next = 9;
            return createComponents(initCompDefs);

          case 9:
            components = _context3.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 13;

            for (_iterator = Object.entries(components)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _ref4 = _step.value;
              _ref5 = _slicedToArray(_ref4, 2);
              index = _ref5[0];
              cmp_ = _ref5[1];
              _cmp2 = cmp_;
              i = parseInt(index, 10);
              initInst = initInsts[i];
              // assignFunctionProps(cmp, initInst.props);

              initInst.cmp = _cmp2;
            }
            _context3.next = 21;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3['catch'](13);
            _didIteratorError = true;
            _iteratorError = _context3.t0;

          case 21:
            _context3.prev = 21;
            _context3.prev = 22;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 24:
            _context3.prev = 24;

            if (!_didIteratorError) {
              _context3.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context3.finish(24);

          case 28:
            return _context3.finish(21);

          case 29:
            reflectComponentTree(inst);
            // const missingCompDefs = instances.map(convertToComponentDefs);

          case 30:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[13, 17, 21, 29], [22,, 24, 28]]);
  }));

  return function syncComponentTree(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var _uuid = __webpack_require__(68);

var _uuid2 = _interopRequireDefault(_uuid);

var _reactReconciler = __webpack_require__(71);

var _reactReconciler2 = _interopRequireDefault(_reactReconciler);

var _emptyObject = __webpack_require__(5);

var _emptyObject2 = _interopRequireDefault(_emptyObject);

var _hyphenateStyleName = __webpack_require__(74);

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 *
 */


/**
 *
 */


/**
 *
 */
function randId() {
  return Math.random().toString(16).substring(2);
}

function unregisterComponentRoot(container) {
  container.auraRun(function () {
    container.cmp.set('v.body', []);
  });
}

function destroyInstance(instance) {
  if (instance.cmp) {
    var _cmp = instance.cmp;
    instance.cmp = null;
    instance.container.auraRun(function () {
      return _cmp.destroy();
    });
  }
}

function _reflectComponentTree(inst) {
  var cmp = inst.cmp;
  if (!cmp) {
    return null;
  }
  if (inst.type === 'TEXT') {
    return cmp;
  }
  var body = inst.children.map(function (cinst) {
    return _reflectComponentTree(cinst);
  }).filter(function (cmp) {
    return cmp;
  });
  if (body.length > 0) {
    try {
      cmp.set('v.body', body);
    } catch (e) {
      console.error(e);
      inst.cmp = null;
      cmp.destroy();
      return null;
    }
  }
  return cmp;
}

function reflectComponentTree(inst) {
  var auraRun = inst.container.auraRun;
  auraRun(function () {
    _reflectComponentTree(inst);
  });
}

function isHtmlInstance(inst) {
  return !/^[\w\-]+:|^TEXT$/.test(inst.type);
}

function toHtmlAttr(prop) {
  return prop === 'className' ? 'class' : prop === 'htmlFor' ? 'for' : prop;
}

var UNITLESS_NUMBER = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

function toStyleAttrValue(styles) {
  return Object.keys(styles).map(function (name) {
    var val = styles[name];
    var unit = typeof val === 'number' && val !== 0 && !UNITLESS_NUMBER[name] ? 'px' : '';
    var styleName = name === 'cssFloat' ? 'float' : (0, _hyphenateStyleName2.default)(name);
    return styleName + ':' + val + unit + ';';
  }).join(' ');
}

function toAuraAttr(prop) {
  return prop === 'className' ? 'class' : prop;
}

function _updateComponentProps(inst, updatePayload) {
  var cmp = inst.cmp;
  if (!cmp) {
    return;
  }
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = updatePayload[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _ref6 = _step2.value;
      var _prop = _ref6.prop;
      var _value = _ref6.value;

      if (typeof _value !== 'function') {
        if (isHtmlInstance(inst)) {
          var attr = toHtmlAttr(_prop);
          var attrs = cmp.get('v.HTMLAttributes');
          var val = attr === 'style' ? toStyleAttrValue(_value) : _value;
          attrs[attr] = val;
          cmp.set('v.HTMLAttributes', attrs);
        } else {
          var _attr = toAuraAttr(_prop);
          cmp.set('v.' + _attr, _value);
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function updateComponentProps(inst, updatePayload) {
  var auraRun = inst.container.auraRun;
  auraRun(function () {
    _updateComponentProps(inst, updatePayload);
  });
}

function convertToHtmlAttrs(props) {
  return Object.keys(props).reduce(function (attrs, prop) {
    var value = props[prop];
    var attr = toHtmlAttr(prop);
    var val = attr === 'style' ? toStyleAttrValue(value) : value;
    return _extends({}, attrs, _defineProperty({}, attr, val));
  }, {});
}

function convertToComponentDefs(inst) {
  var container = inst.container || inst;
  var containerCmp = container.cmp;
  if (!containerCmp) {
    throw new Error('no container cmp defined');
  }
  var cmpAttrs = Object.keys(inst.props).reduce(function (props, prop) {
    if (prop === 'children') {
      return props;
    }
    var value = inst.props[prop];
    if (typeof value === 'function') {
      value = containerCmp.getReference('c.handleEvent');
    }
    var attr = toAuraAttr(prop);
    return _extends({}, props, _defineProperty({}, attr, value));
  }, {});
  if (/^[\w\-]+:/.test(inst.type)) {
    return [inst.type, _extends({}, cmpAttrs, { 'aura:id': inst.id })];
  }
  if (inst.type === 'TEXT') {
    return ['aura:text', {
      'aura:id': inst.id,
      value: inst.props.value
    }];
  }
  return ['aura:html', {
    tag: inst.type,
    'aura:id': inst.id,
    HTMLAttributes: convertToHtmlAttrs(cmpAttrs)
  }];
}

function flattenToInstanceArray(inst) {
  return [inst].concat(_toConsumableArray(inst.children.map(function (cinst) {
    return flattenToInstanceArray(cinst);
  }).reduce(function (ret, arr) {
    return [].concat(_toConsumableArray(ret), _toConsumableArray(arr));
  }, [])));
}

/**
 *
 */
function diffProps(oldProps, newProps) {
  var updatePayload = [];
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = Object.keys(oldProps)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var key = _step3.value;

      if (key === 'children') {
        continue;
      }
      var oldValue = oldProps[key];
      var newValue = newProps[key];
      if (oldValue !== newValue) {
        updatePayload.push({ prop: key, value: newValue });
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return updatePayload.length > 0 ? updatePayload : null;
}

/**
 *
 */
var LightningRenderer = (0, _reactReconciler2.default)({
  appendInitialChild: function appendInitialChild(parentInstance, child) {
    parentInstance.children.push(child);
  },
  createInstance: function createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    var id = randId();
    return { id: id, type: type, props: props, children: [], container: rootContainerInstance };
  },
  createTextInstance: function createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    // console.log('#createTextInstance()', text);
    var id = randId();
    var type = 'TEXT';
    var props = { value: text };
    return { id: id, type: type, props: props, children: [], container: rootContainerInstance };
  },
  finalizeInitialChildren: function finalizeInitialChildren(element, type, props) {
    // console.log('#finalizeInitialChildren()');
    return false;
  },
  getPublicInstance: function getPublicInstance(inst) {
    // console.log('#getPublicInstance()', inst);
    return inst;
  },
  prepareForCommit: function prepareForCommit() {
    // console.log('#prepareForCommit()', ...args);
    // noop
  },
  prepareUpdate: function prepareUpdate(element, type, oldProps, newProps) {
    // console.log('#prepareUpdate()');
    return diffProps(oldProps, newProps);
  },
  resetAfterCommit: function resetAfterCommit() {
    // console.log('#resetAfterCommit()', ...args);
    // noop
  },
  resetTextContent: function resetTextContent(element) {
    // console.log('#resetTextContent()', element);
    // noop
  },
  getRootHostContext: function getRootHostContext(rootInstance) {
    // console.log('#getRootHostContext()');
    // You can use this 'rootInstance' to pass data from the roots.
  },
  getChildHostContext: function getChildHostContext() {
    // console.log('#getChildHostContext()');
    return _emptyObject2.default;
  },
  shouldSetTextContent: function shouldSetTextContent(type, props) {
    // console.log('#shouldSetTextContent()');
    return false;
  },


  now: process.hrtime ? function () {
    return process.hrtime();
  } : typeof performance !== null ? function () {
    return performance.now();
  } : function () {
    return Date.now();
  },

  useSyncScheduling: true,

  mutation: {
    appendChild: function appendChild(parentInstance, child) {
      // console.log('mutation#appendChild()')
      parentInstance.children.push(child);
      syncComponentTree(parentInstance);
    },
    appendChildToContainer: function appendChildToContainer(container, child) {
      // console.log('mutation#appendChildToContainer()', container, child)
      container.root = child;
      registerComponentRoot(container);
    },
    removeChild: function removeChild(parentInstance, child) {
      var _this = this;

      // console.log('mutation#removeChild()')
      var index = parentInstance.children.indexOf(child);
      if (index >= 0) {
        parentInstance.children.splice(index, 1);
      }
      _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return syncComponentTree(parentInstance);

              case 2:
                destroyInstance(child);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this);
      }))();
    },
    removeChildFromContainer: function removeChildFromContainer(container, child) {
      // console.log('mutation#removeChildFromContainer()')
      if (container.root === child) {
        container.root = undefined;
      }
      unregisterComponentRoot(container);
      destroyInstance(child);
    },
    insertBefore: function insertBefore(parentInstance, child, beforeChild) {
      // console.log('mutation#insertBefore()')
      var index = parentInstance.children.indexOf(beforeChild);
      if (index >= 0) {
        parentInstance.children.splice(index, 0, child);
      }
      syncComponentTree(parentInstance);
    },
    commitUpdate: function commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      // console.log('mutation#commitUpdate()', instance, updatePayload, type, oldProps, newProps);
      instance.props = newProps;
      updateComponentProps(instance, updatePayload);
      // noop
    },
    commitMount: function commitMount(instance, updatePayload, type, oldProps, newProps) {
      // console.log('mutation#commitMount()')
      // noop
    },
    commitTextUpdate: function commitTextUpdate(textInstance, oldText, newText) {
      // console.log('mutation#commitTextUpdate()')
      textInstance.props.value = newText;
      updateComponentProps(textInstance, [{ prop: 'value', value: newText }]);
    }
  }
});

exports.default = LightningRenderer;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = function () {
  return this;
}() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(67);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch (e) {
    g.regeneratorRuntime = undefined;
  }
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!function (global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = ( false ? "undefined" : _typeof(module)) === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function (arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
}(
// In sloppy mode, unbound `this` refers to the global object, fallback to
// Function constructor if we're in global strict mode. That is sadly a form
// of indirect eval which violates Content Security Policy.
function () {
  return this;
}() || Function("return this")());
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)(module)))

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var v1 = __webpack_require__(69);
var v4 = __webpack_require__(70);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rng = __webpack_require__(29);
var bytesToUuid = __webpack_require__(30);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rng = __webpack_require__(29);
var bytesToUuid = __webpack_require__(30);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof options == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(72);
} else {
  module.exports = __webpack_require__(73);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** @license React v16.2.0
 * react-reconciler.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $$$reconciler;
module.exports = function (config) {
  'use strict';
  var ca = __webpack_require__(4),
      ea = __webpack_require__(1),
      n = __webpack_require__(5),
      fa = __webpack_require__(13);
  function F(b) {
    for (var a = arguments.length - 1, d = "Minified React error #" + b + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d" + b, e = 0; e < a; e++) {
      d += "\x26args[]\x3d" + encodeURIComponent(arguments[e + 1]);
    }a = Error(d + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");a.name = "Invariant Violation";a.framesToPop = 1;throw a;
  }var ha = ea.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
  function ia(b) {
    b = b.type;return "string" === typeof b ? b : "function" === typeof b ? b.displayName || b.name : null;
  }function ja(b) {
    var a = b;if (b.alternate) for (; a["return"];) {
      a = a["return"];
    } else {
      if (0 !== (a.effectTag & 2)) return 1;for (; a["return"];) {
        if (a = a["return"], 0 !== (a.effectTag & 2)) return 1;
      }
    }return 3 === a.tag ? 2 : 3;
  }function ka(b) {
    return (b = b._reactInternalFiber) ? 2 === ja(b) : !1;
  }function la(b) {
    2 !== ja(b) ? F("188") : void 0;
  }
  function ma(b) {
    var a = b.alternate;if (!a) return a = ja(b), 3 === a ? F("188") : void 0, 1 === a ? null : b;for (var d = b, e = a;;) {
      var f = d["return"],
          r = f ? f.alternate : null;if (!f || !r) break;if (f.child === r.child) {
        for (var k = f.child; k;) {
          if (k === d) return la(f), b;if (k === e) return la(f), a;k = k.sibling;
        }F("188");
      }if (d["return"] !== e["return"]) d = f, e = r;else {
        k = !1;for (var h = f.child; h;) {
          if (h === d) {
            k = !0;d = f;e = r;break;
          }if (h === e) {
            k = !0;e = f;d = r;break;
          }h = h.sibling;
        }if (!k) {
          for (h = r.child; h;) {
            if (h === d) {
              k = !0;d = r;e = f;break;
            }if (h === e) {
              k = !0;e = r;d = f;break;
            }h = h.sibling;
          }k ? void 0 : F("189");
        }
      }d.alternate !== e ? F("190") : void 0;
    }3 !== d.tag ? F("188") : void 0;return d.stateNode.current === d ? b : a;
  }function na(b) {
    b = ma(b);if (!b) return null;for (var a = b;;) {
      if (5 === a.tag || 6 === a.tag) return a;if (a.child) a.child["return"] = a, a = a.child;else {
        if (a === b) break;for (; !a.sibling;) {
          if (!a["return"] || a["return"] === b) return null;a = a["return"];
        }a.sibling["return"] = a["return"];a = a.sibling;
      }
    }return null;
  }
  function ra(b) {
    b = ma(b);if (!b) return null;for (var a = b;;) {
      if (5 === a.tag || 6 === a.tag) return a;if (a.child && 4 !== a.tag) a.child["return"] = a, a = a.child;else {
        if (a === b) break;for (; !a.sibling;) {
          if (!a["return"] || a["return"] === b) return null;a = a["return"];
        }a.sibling["return"] = a["return"];a = a.sibling;
      }
    }return null;
  }var sa = [],
      K = -1;function L(b) {
    0 > K || (b.current = sa[K], sa[K] = null, K--);
  }function M(b, a) {
    K++;sa[K] = b.current;b.current = a;
  }new Set();var O = { current: n },
      P = { current: !1 },
      ta = n;function ua(b) {
    return va(b) ? ta : O.current;
  }
  function wa(b, a) {
    var d = b.type.contextTypes;if (!d) return n;var e = b.stateNode;if (e && e.__reactInternalMemoizedUnmaskedChildContext === a) return e.__reactInternalMemoizedMaskedChildContext;var f = {},
        r;for (r in d) {
      f[r] = a[r];
    }e && (b = b.stateNode, b.__reactInternalMemoizedUnmaskedChildContext = a, b.__reactInternalMemoizedMaskedChildContext = f);return f;
  }function va(b) {
    return 2 === b.tag && null != b.type.childContextTypes;
  }function xa(b) {
    va(b) && (L(P, b), L(O, b));
  }
  function ya(b, a, d) {
    null != O.cursor ? F("168") : void 0;M(O, a, b);M(P, d, b);
  }function za(b, a) {
    var d = b.stateNode,
        e = b.type.childContextTypes;if ("function" !== typeof d.getChildContext) return a;d = d.getChildContext();for (var f in d) {
      f in e ? void 0 : F("108", ia(b) || "Unknown", f);
    }return ca({}, a, d);
  }function Aa(b) {
    if (!va(b)) return !1;var a = b.stateNode;a = a && a.__reactInternalMemoizedMergedChildContext || n;ta = O.current;M(O, a, b);M(P, P.current, b);return !0;
  }
  function Ba(b, a) {
    var d = b.stateNode;d ? void 0 : F("169");if (a) {
      var e = za(b, ta);d.__reactInternalMemoizedMergedChildContext = e;L(P, b);L(O, b);M(O, e, b);
    } else L(P, b);M(P, a, b);
  }
  function R(b, a, d) {
    this.tag = b;this.key = a;this.stateNode = this.type = null;this.sibling = this.child = this["return"] = null;this.index = 0;this.memoizedState = this.updateQueue = this.memoizedProps = this.pendingProps = this.ref = null;this.internalContextTag = d;this.effectTag = 0;this.lastEffect = this.firstEffect = this.nextEffect = null;this.expirationTime = 0;this.alternate = null;
  }
  function Ca(b, a, d) {
    var e = b.alternate;null === e ? (e = new R(b.tag, b.key, b.internalContextTag), e.type = b.type, e.stateNode = b.stateNode, e.alternate = b, b.alternate = e) : (e.effectTag = 0, e.nextEffect = null, e.firstEffect = null, e.lastEffect = null);e.expirationTime = d;e.pendingProps = a;e.child = b.child;e.memoizedProps = b.memoizedProps;e.memoizedState = b.memoizedState;e.updateQueue = b.updateQueue;e.sibling = b.sibling;e.index = b.index;e.ref = b.ref;return e;
  }
  function Da(b, a, d) {
    var e = void 0,
        f = b.type,
        r = b.key;"function" === typeof f ? (e = f.prototype && f.prototype.isReactComponent ? new R(2, r, a) : new R(0, r, a), e.type = f, e.pendingProps = b.props) : "string" === typeof f ? (e = new R(5, r, a), e.type = f, e.pendingProps = b.props) : "object" === (typeof f === "undefined" ? "undefined" : _typeof(f)) && null !== f && "number" === typeof f.tag ? (e = f, e.pendingProps = b.props) : F("130", null == f ? f : typeof f === "undefined" ? "undefined" : _typeof(f), "");e.expirationTime = d;return e;
  }function Ea(b, a, d, e) {
    a = new R(10, e, a);a.pendingProps = b;a.expirationTime = d;return a;
  }
  function Fa(b, a, d) {
    a = new R(6, null, a);a.pendingProps = b;a.expirationTime = d;return a;
  }function Ha(b, a, d) {
    a = new R(7, b.key, a);a.type = b.handler;a.pendingProps = b;a.expirationTime = d;return a;
  }function Na(b, a, d) {
    b = new R(9, null, a);b.expirationTime = d;return b;
  }function Oa(b, a, d) {
    a = new R(4, b.key, a);a.pendingProps = b.children || [];a.expirationTime = d;a.stateNode = { containerInfo: b.containerInfo, pendingChildren: null, implementation: b.implementation };return a;
  }var Pa = null,
      Qa = null;
  function Ra(b) {
    return function (a) {
      try {
        return b(a);
      } catch (d) {}
    };
  }function Sa(b) {
    if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;var a = __REACT_DEVTOOLS_GLOBAL_HOOK__;if (a.isDisabled || !a.supportsFiber) return !0;try {
      var d = a.inject(b);Pa = Ra(function (b) {
        return a.onCommitFiberRoot(d, b);
      });Qa = Ra(function (b) {
        return a.onCommitFiberUnmount(d, b);
      });
    } catch (e) {}return !0;
  }function Ta(b) {
    "function" === typeof Pa && Pa(b);
  }function Ua(b) {
    "function" === typeof Qa && Qa(b);
  }
  function db(b) {
    return { baseState: b, expirationTime: 0, first: null, last: null, callbackList: null, hasForceUpdate: !1, isInitialized: !1 };
  }function eb(b, a) {
    null === b.last ? b.first = b.last = a : (b.last.next = a, b.last = a);if (0 === b.expirationTime || b.expirationTime > a.expirationTime) b.expirationTime = a.expirationTime;
  }
  function fb(b, a) {
    var d = b.alternate,
        e = b.updateQueue;null === e && (e = b.updateQueue = db(null));null !== d ? (b = d.updateQueue, null === b && (b = d.updateQueue = db(null))) : b = null;b = b !== e ? b : null;null === b ? eb(e, a) : null === e.last || null === b.last ? (eb(e, a), eb(b, a)) : (eb(e, a), b.last = a);
  }function gb(b, a, d, e) {
    b = b.partialState;return "function" === typeof b ? b.call(a, d, e) : b;
  }
  function hb(b, a, d, e, f, r) {
    null !== b && b.updateQueue === d && (d = a.updateQueue = { baseState: d.baseState, expirationTime: d.expirationTime, first: d.first, last: d.last, isInitialized: d.isInitialized, callbackList: null, hasForceUpdate: !1 });d.expirationTime = 0;d.isInitialized ? b = d.baseState : (b = d.baseState = a.memoizedState, d.isInitialized = !0);for (var k = !0, h = d.first, p = !1; null !== h;) {
      var v = h.expirationTime;if (v > r) {
        var B = d.expirationTime;if (0 === B || B > v) d.expirationTime = v;p || (p = !0, d.baseState = b);
      } else {
        p || (d.first = h.next, null === d.first && (d.last = null));if (h.isReplace) b = gb(h, e, b, f), k = !0;else if (v = gb(h, e, b, f)) b = k ? ca({}, b, v) : ca(b, v), k = !1;h.isForced && (d.hasForceUpdate = !0);null !== h.callback && (v = d.callbackList, null === v && (v = d.callbackList = []), v.push(h));
      }h = h.next;
    }null !== d.callbackList ? a.effectTag |= 32 : null !== d.first || d.hasForceUpdate || (a.updateQueue = null);p || (d.baseState = b);return b;
  }
  function ib(b, a) {
    var d = b.callbackList;if (null !== d) for (b.callbackList = null, b = 0; b < d.length; b++) {
      var e = d[b],
          f = e.callback;e.callback = null;"function" !== typeof f ? F("191", f) : void 0;f.call(a);
    }
  }
  function jb(b, a, d, e) {
    function f(b, a) {
      a.updater = r;b.stateNode = a;a._reactInternalFiber = b;
    }var r = { isMounted: ka, enqueueSetState: function enqueueSetState(d, h, e) {
        d = d._reactInternalFiber;e = void 0 === e ? null : e;var k = a(d);fb(d, { expirationTime: k, partialState: h, callback: e, isReplace: !1, isForced: !1, nextCallback: null, next: null });b(d, k);
      }, enqueueReplaceState: function enqueueReplaceState(d, h, e) {
        d = d._reactInternalFiber;e = void 0 === e ? null : e;var k = a(d);fb(d, { expirationTime: k, partialState: h, callback: e, isReplace: !0, isForced: !1, nextCallback: null, next: null });
        b(d, k);
      }, enqueueForceUpdate: function enqueueForceUpdate(d, h) {
        d = d._reactInternalFiber;h = void 0 === h ? null : h;var e = a(d);fb(d, { expirationTime: e, partialState: null, callback: h, isReplace: !1, isForced: !0, nextCallback: null, next: null });b(d, e);
      } };return { adoptClassInstance: f, constructClassInstance: function constructClassInstance(b, a) {
        var d = b.type,
            e = ua(b),
            h = 2 === b.tag && null != b.type.contextTypes,
            k = h ? wa(b, e) : n;a = new d(a, k);f(b, a);h && (b = b.stateNode, b.__reactInternalMemoizedUnmaskedChildContext = e, b.__reactInternalMemoizedMaskedChildContext = k);return a;
      }, mountClassInstance: function mountClassInstance(b, a) {
        var d = b.alternate,
            e = b.stateNode,
            h = e.state || null,
            k = b.pendingProps;k ? void 0 : F("158");var f = ua(b);e.props = k;e.state = b.memoizedState = h;e.refs = n;e.context = wa(b, f);null != b.type && null != b.type.prototype && !0 === b.type.prototype.unstable_isAsyncReactComponent && (b.internalContextTag |= 1);"function" === typeof e.componentWillMount && (h = e.state, e.componentWillMount(), h !== e.state && r.enqueueReplaceState(e, e.state, null), h = b.updateQueue, null !== h && (e.state = hb(d, b, h, e, k, a)));"function" === typeof e.componentDidMount && (b.effectTag |= 4);
      }, updateClassInstance: function updateClassInstance(b, a, f) {
        var h = a.stateNode;h.props = a.memoizedProps;h.state = a.memoizedState;var k = a.memoizedProps,
            p = a.pendingProps;p || (p = k, null == p ? F("159") : void 0);var x = h.context,
            y = ua(a);y = wa(a, y);"function" !== typeof h.componentWillReceiveProps || k === p && x === y || (x = h.state, h.componentWillReceiveProps(p, y), h.state !== x && r.enqueueReplaceState(h, h.state, null));x = a.memoizedState;f = null !== a.updateQueue ? hb(b, a, a.updateQueue, h, p, f) : x;if (!(k !== p || x !== f || P.current || null !== a.updateQueue && a.updateQueue.hasForceUpdate)) return "function" !== typeof h.componentDidUpdate || k === b.memoizedProps && x === b.memoizedState || (a.effectTag |= 4), !1;var C = p;if (null === k || null !== a.updateQueue && a.updateQueue.hasForceUpdate) C = !0;else {
          var E = a.stateNode,
              G = a.type;C = "function" === typeof E.shouldComponentUpdate ? E.shouldComponentUpdate(C, f, y) : G.prototype && G.prototype.isPureReactComponent ? !fa(k, C) || !fa(x, f) : !0;
        }C ? ("function" === typeof h.componentWillUpdate && h.componentWillUpdate(p, f, y), "function" === typeof h.componentDidUpdate && (a.effectTag |= 4)) : ("function" !== typeof h.componentDidUpdate || k === b.memoizedProps && x === b.memoizedState || (a.effectTag |= 4), d(a, p), e(a, f));h.props = p;h.state = f;h.context = y;return C;
      } };
  }var kb = "function" === typeof Symbol && Symbol["for"],
      lb = kb ? Symbol["for"]("react.element") : 60103,
      mb = kb ? Symbol["for"]("react.call") : 60104,
      nb = kb ? Symbol["for"]("react.return") : 60105,
      ob = kb ? Symbol["for"]("react.portal") : 60106,
      Y = kb ? Symbol["for"]("react.fragment") : 60107,
      pb = "function" === typeof Symbol && Symbol.iterator;
  function qb(b) {
    if (null === b || "undefined" === typeof b) return null;b = pb && b[pb] || b["@@iterator"];return "function" === typeof b ? b : null;
  }var rb = Array.isArray;
  function sb(b, a) {
    var d = a.ref;if (null !== d && "function" !== typeof d) {
      if (a._owner) {
        a = a._owner;var e = void 0;a && (2 !== a.tag ? F("110") : void 0, e = a.stateNode);e ? void 0 : F("147", d);var f = "" + d;if (null !== b && null !== b.ref && b.ref._stringRef === f) return b.ref;b = function b(_b) {
          var a = e.refs === n ? e.refs = {} : e.refs;null === _b ? delete a[f] : a[f] = _b;
        };b._stringRef = f;return b;
      }"string" !== typeof d ? F("148") : void 0;a._owner ? void 0 : F("149", d);
    }return d;
  }
  function xb(b, a) {
    "textarea" !== b.type && F("31", "[object Object]" === Object.prototype.toString.call(a) ? "object with keys {" + Object.keys(a).join(", ") + "}" : a, "");
  }
  function yb(b) {
    function a(a, c) {
      if (b) {
        var g = a.lastEffect;null !== g ? (g.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;c.nextEffect = null;c.effectTag = 8;
      }
    }function d(N, c) {
      if (!b) return null;for (; null !== c;) {
        a(N, c), c = c.sibling;
      }return null;
    }function e(b, c) {
      for (b = new Map(); null !== c;) {
        null !== c.key ? b.set(c.key, c) : b.set(c.index, c), c = c.sibling;
      }return b;
    }function f(b, c, g) {
      b = Ca(b, c, g);b.index = 0;b.sibling = null;return b;
    }function r(a, c, g) {
      a.index = g;if (!b) return c;g = a.alternate;if (null !== g) return g = g.index, g < c ? (a.effectTag = 2, c) : g;a.effectTag = 2;return c;
    }function k(a) {
      b && null === a.alternate && (a.effectTag = 2);return a;
    }function h(b, c, g, a) {
      if (null === c || 6 !== c.tag) return c = Fa(g, b.internalContextTag, a), c["return"] = b, c;c = f(c, g, a);c["return"] = b;return c;
    }function p(b, c, g, a) {
      if (null !== c && c.type === g.type) return a = f(c, g.props, a), a.ref = sb(c, g), a["return"] = b, a;a = Da(g, b.internalContextTag, a);a.ref = sb(c, g);a["return"] = b;return a;
    }function v(b, c, g, a) {
      if (null === c || 7 !== c.tag) return c = Ha(g, b.internalContextTag, a), c["return"] = b, c;c = f(c, g, a);
      c["return"] = b;return c;
    }function B(b, c, g, a) {
      if (null === c || 9 !== c.tag) return c = Na(g, b.internalContextTag, a), c.type = g.value, c["return"] = b, c;c = f(c, null, a);c.type = g.value;c["return"] = b;return c;
    }function z(b, c, a, l) {
      if (null === c || 4 !== c.tag || c.stateNode.containerInfo !== a.containerInfo || c.stateNode.implementation !== a.implementation) return c = Oa(a, b.internalContextTag, l), c["return"] = b, c;c = f(c, a.children || [], l);c["return"] = b;return c;
    }function x(b, c, a, l, d) {
      if (null === c || 10 !== c.tag) return c = Ea(a, b.internalContextTag, l, d), c["return"] = b, c;c = f(c, a, l);c["return"] = b;return c;
    }function y(b, c, a) {
      if ("string" === typeof c || "number" === typeof c) return c = Fa("" + c, b.internalContextTag, a), c["return"] = b, c;if ("object" === (typeof c === "undefined" ? "undefined" : _typeof(c)) && null !== c) {
        switch (c.$$typeof) {case lb:
            if (c.type === Y) return c = Ea(c.props.children, b.internalContextTag, a, c.key), c["return"] = b, c;a = Da(c, b.internalContextTag, a);a.ref = sb(null, c);a["return"] = b;return a;case mb:
            return c = Ha(c, b.internalContextTag, a), c["return"] = b, c;case nb:
            return a = Na(c, b.internalContextTag, a), a.type = c.value, a["return"] = b, a;case ob:
            return c = Oa(c, b.internalContextTag, a), c["return"] = b, c;}if (rb(c) || qb(c)) return c = Ea(c, b.internalContextTag, a, null), c["return"] = b, c;xb(b, c);
      }return null;
    }function C(b, c, a, l) {
      var g = null !== c ? c.key : null;if ("string" === typeof a || "number" === typeof a) return null !== g ? null : h(b, c, "" + a, l);if ("object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a) {
        switch (a.$$typeof) {case lb:
            return a.key === g ? a.type === Y ? x(b, c, a.props.children, l, g) : p(b, c, a, l) : null;case mb:
            return a.key === g ? v(b, c, a, l) : null;case nb:
            return null === g ? B(b, c, a, l) : null;case ob:
            return a.key === g ? z(b, c, a, l) : null;}if (rb(a) || qb(a)) return null !== g ? null : x(b, c, a, l, null);xb(b, a);
      }return null;
    }function E(b, a, g, l, d) {
      if ("string" === typeof l || "number" === typeof l) return b = b.get(g) || null, h(a, b, "" + l, d);if ("object" === (typeof l === "undefined" ? "undefined" : _typeof(l)) && null !== l) {
        switch (l.$$typeof) {case lb:
            return b = b.get(null === l.key ? g : l.key) || null, l.type === Y ? x(a, b, l.props.children, d, l.key) : p(a, b, l, d);case mb:
            return b = b.get(null === l.key ? g : l.key) || null, v(a, b, l, d);case nb:
            return b = b.get(g) || null, B(a, b, l, d);case ob:
            return b = b.get(null === l.key ? g : l.key) || null, z(a, b, l, d);}if (rb(l) || qb(l)) return b = b.get(g) || null, x(a, b, l, d, null);xb(a, l);
      }return null;
    }function G(h, c, g, l) {
      for (var f = null, t = null, q = c, m = c = 0, k = null; null !== q && m < g.length; m++) {
        q.index > m ? (k = q, q = null) : k = q.sibling;var w = C(h, q, g[m], l);if (null === w) {
          null === q && (q = k);break;
        }b && q && null === w.alternate && a(h, q);c = r(w, c, m);null === t ? f = w : t.sibling = w;t = w;q = k;
      }if (m === g.length) return d(h, q), f;if (null === q) {
        for (; m < g.length; m++) {
          if (q = y(h, g[m], l)) c = r(q, c, m), null === t ? f = q : t.sibling = q, t = q;
        }return f;
      }for (q = e(h, q); m < g.length; m++) {
        if (k = E(q, h, m, g[m], l)) {
          if (b && null !== k.alternate) q["delete"](null === k.key ? m : k.key);c = r(k, c, m);null === t ? f = k : t.sibling = k;t = k;
        }
      }b && q.forEach(function (b) {
        return a(h, b);
      });return f;
    }function H(h, c, g, l) {
      var k = qb(g);"function" !== typeof k ? F("150") : void 0;g = k.call(g);null == g ? F("151") : void 0;for (var t = k = null, q = c, m = c = 0, f = null, w = g.next(); null !== q && !w.done; m++, w = g.next()) {
        q.index > m ? (f = q, q = null) : f = q.sibling;var p = C(h, q, w.value, l);if (null === p) {
          q || (q = f);break;
        }b && q && null === p.alternate && a(h, q);c = r(p, c, m);null === t ? k = p : t.sibling = p;t = p;q = f;
      }if (w.done) return d(h, q), k;if (null === q) {
        for (; !w.done; m++, w = g.next()) {
          w = y(h, w.value, l), null !== w && (c = r(w, c, m), null === t ? k = w : t.sibling = w, t = w);
        }return k;
      }for (q = e(h, q); !w.done; m++, w = g.next()) {
        if (w = E(q, h, m, w.value, l), null !== w) {
          if (b && null !== w.alternate) q["delete"](null === w.key ? m : w.key);c = r(w, c, m);null === t ? k = w : t.sibling = w;t = w;
        }
      }b && q.forEach(function (b) {
        return a(h, b);
      });return k;
    }return function (b, c, g, l) {
      "object" === (typeof g === "undefined" ? "undefined" : _typeof(g)) && null !== g && g.type === Y && null === g.key && (g = g.props.children);
      var e = "object" === (typeof g === "undefined" ? "undefined" : _typeof(g)) && null !== g;if (e) switch (g.$$typeof) {case lb:
          a: {
            var t = g.key;for (e = c; null !== e;) {
              if (e.key === t) {
                if (10 === e.tag ? g.type === Y : e.type === g.type) {
                  d(b, e.sibling);c = f(e, g.type === Y ? g.props.children : g.props, l);c.ref = sb(e, g);c["return"] = b;b = c;break a;
                } else {
                  d(b, e);break;
                }
              } else a(b, e);e = e.sibling;
            }g.type === Y ? (c = Ea(g.props.children, b.internalContextTag, l, g.key), c["return"] = b, b = c) : (l = Da(g, b.internalContextTag, l), l.ref = sb(c, g), l["return"] = b, b = l);
          }return k(b);case mb:
          a: {
            for (e = g.key; null !== c;) {
              if (c.key === e) {
                if (7 === c.tag) {
                  d(b, c.sibling);c = f(c, g, l);c["return"] = b;b = c;break a;
                } else {
                  d(b, c);break;
                }
              } else a(b, c);c = c.sibling;
            }c = Ha(g, b.internalContextTag, l);c["return"] = b;b = c;
          }return k(b);case nb:
          a: {
            if (null !== c) if (9 === c.tag) {
              d(b, c.sibling);c = f(c, null, l);c.type = g.value;c["return"] = b;b = c;break a;
            } else d(b, c);c = Na(g, b.internalContextTag, l);c.type = g.value;c["return"] = b;b = c;
          }return k(b);case ob:
          a: {
            for (e = g.key; null !== c;) {
              if (c.key === e) {
                if (4 === c.tag && c.stateNode.containerInfo === g.containerInfo && c.stateNode.implementation === g.implementation) {
                  d(b, c.sibling);c = f(c, g.children || [], l);c["return"] = b;b = c;break a;
                } else {
                  d(b, c);break;
                }
              } else a(b, c);c = c.sibling;
            }c = Oa(g, b.internalContextTag, l);c["return"] = b;b = c;
          }return k(b);}if ("string" === typeof g || "number" === typeof g) return g = "" + g, null !== c && 6 === c.tag ? (d(b, c.sibling), c = f(c, g, l)) : (d(b, c), c = Fa(g, b.internalContextTag, l)), c["return"] = b, b = c, k(b);if (rb(g)) return G(b, c, g, l);if (qb(g)) return H(b, c, g, l);e && xb(b, g);if ("undefined" === typeof g) switch (b.tag) {case 2:case 1:
          l = b.type, F("152", l.displayName || l.name || "Component");}return d(b, c);
    };
  }var zb = yb(!0),
      Ab = yb(!1);
  function Bb(b, a, d, e, f) {
    function r(b, a, c) {
      var q = a.expirationTime;a.child = null === b ? Ab(a, null, c, q) : zb(a, b.child, c, q);
    }function k(b, a) {
      var c = a.ref;null === c || b && b.ref === c || (a.effectTag |= 128);
    }function h(b, a, c, g) {
      k(b, a);if (!c) return g && Ba(a, !1), v(b, a);c = a.stateNode;ha.current = a;var q = c.render();a.effectTag |= 1;r(b, a, q);a.memoizedState = c.state;a.memoizedProps = c.props;g && Ba(a, !0);return a.child;
    }function p(b) {
      var a = b.stateNode;a.pendingContext ? ya(b, a.pendingContext, a.pendingContext !== a.context) : a.context && ya(b, a.context, !1);E(b, a.containerInfo);
    }function v(b, a) {
      null !== b && a.child !== b.child ? F("153") : void 0;if (null !== a.child) {
        b = a.child;var c = Ca(b, b.pendingProps, b.expirationTime);a.child = c;for (c["return"] = a; null !== b.sibling;) {
          b = b.sibling, c = c.sibling = Ca(b, b.pendingProps, b.expirationTime), c["return"] = a;
        }c.sibling = null;
      }return a.child;
    }function B(b, a) {
      switch (a.tag) {case 3:
          p(a);break;case 2:
          Aa(a);break;case 4:
          E(a, a.stateNode.containerInfo);}return null;
    }var z = b.shouldSetTextContent,
        x = b.useSyncScheduling,
        y = b.shouldDeprioritizeSubtree,
        C = a.pushHostContext,
        E = a.pushHostContainer,
        G = d.enterHydrationState,
        H = d.resetHydrationState,
        N = d.tryToClaimNextHydratableInstance;b = jb(e, f, function (b, a) {
      b.memoizedProps = a;
    }, function (b, a) {
      b.memoizedState = a;
    });var c = b.adoptClassInstance,
        g = b.constructClassInstance,
        l = b.mountClassInstance,
        Ga = b.updateClassInstance;return { beginWork: function beginWork(b, a, d) {
        if (0 === a.expirationTime || a.expirationTime > d) return B(b, a);switch (a.tag) {case 0:
            null !== b ? F("155") : void 0;var e = a.type,
                f = a.pendingProps,
                t = ua(a);t = wa(a, t);e = e(f, t);a.effectTag |= 1;"object" === (typeof e === "undefined" ? "undefined" : _typeof(e)) && null !== e && "function" === typeof e.render ? (a.tag = 2, f = Aa(a), c(a, e), l(a, d), a = h(b, a, !0, f)) : (a.tag = 1, r(b, a, e), a.memoizedProps = f, a = a.child);return a;case 1:
            a: {
              f = a.type;d = a.pendingProps;e = a.memoizedProps;if (P.current) null === d && (d = e);else if (null === d || e === d) {
                a = v(b, a);break a;
              }e = ua(a);e = wa(a, e);f = f(d, e);a.effectTag |= 1;r(b, a, f);a.memoizedProps = d;a = a.child;
            }return a;case 2:
            return f = Aa(a), e = void 0, null === b ? a.stateNode ? F("153") : (g(a, a.pendingProps), l(a, d), e = !0) : e = Ga(b, a, d), h(b, a, e, f);case 3:
            return p(a), f = a.updateQueue, null !== f ? (e = a.memoizedState, f = hb(b, a, f, null, null, d), e === f ? (H(), a = v(b, a)) : (e = f.element, t = a.stateNode, (null === b || null === b.child) && t.hydrate && G(a) ? (a.effectTag |= 2, a.child = Ab(a, null, e, d)) : (H(), r(b, a, e)), a.memoizedState = f, a = a.child)) : (H(), a = v(b, a)), a;case 5:
            C(a);null === b && N(a);f = a.type;var q = a.memoizedProps;e = a.pendingProps;null === e && (e = q, null === e ? F("154") : void 0);t = null !== b ? b.memoizedProps : null;P.current || null !== e && q !== e ? (q = e.children, z(f, e) ? q = null : t && z(f, t) && (a.effectTag |= 16), k(b, a), 2147483647 !== d && !x && y(f, e) ? (a.expirationTime = 2147483647, a = null) : (r(b, a, q), a.memoizedProps = e, a = a.child)) : a = v(b, a);return a;case 6:
            return null === b && N(a), b = a.pendingProps, null === b && (b = a.memoizedProps), a.memoizedProps = b, null;case 8:
            a.tag = 7;case 7:
            f = a.pendingProps;if (P.current) null === f && (f = b && b.memoizedProps, null === f ? F("154") : void 0);else if (null === f || a.memoizedProps === f) f = a.memoizedProps;e = f.children;a.stateNode = null === b ? Ab(a, a.stateNode, e, d) : zb(a, a.stateNode, e, d);a.memoizedProps = f;return a.stateNode;
          case 9:
            return null;case 4:
            a: {
              E(a, a.stateNode.containerInfo);f = a.pendingProps;if (P.current) null === f && (f = b && b.memoizedProps, null == f ? F("154") : void 0);else if (null === f || a.memoizedProps === f) {
                a = v(b, a);break a;
              }null === b ? a.child = zb(a, null, f, d) : r(b, a, f);a.memoizedProps = f;a = a.child;
            }return a;case 10:
            a: {
              d = a.pendingProps;if (P.current) null === d && (d = a.memoizedProps);else if (null === d || a.memoizedProps === d) {
                a = v(b, a);break a;
              }r(b, a, d);a.memoizedProps = d;a = a.child;
            }return a;default:
            F("156");}
      }, beginFailedWork: function beginFailedWork(b, a, c) {
        switch (a.tag) {case 2:
            Aa(a);break;case 3:
            p(a);break;default:
            F("157");}a.effectTag |= 64;null === b ? a.child = null : a.child !== b.child && (a.child = b.child);if (0 === a.expirationTime || a.expirationTime > c) return B(b, a);a.firstEffect = null;a.lastEffect = null;a.child = null === b ? Ab(a, null, null, c) : zb(a, b.child, null, c);2 === a.tag && (b = a.stateNode, a.memoizedProps = b.props, a.memoizedState = b.state);return a.child;
      } };
  }
  function Cb(b, a, d) {
    function e(b) {
      b.effectTag |= 4;
    }var f = b.createInstance,
        r = b.createTextInstance,
        k = b.appendInitialChild,
        h = b.finalizeInitialChildren,
        p = b.prepareUpdate,
        v = b.persistence,
        B = a.getRootHostContainer,
        z = a.popHostContext,
        x = a.getHostContext,
        y = a.popHostContainer,
        C = d.prepareToHydrateHostInstance,
        E = d.prepareToHydrateHostTextInstance,
        G = d.popHydrationState,
        H = void 0,
        N = void 0,
        c = void 0;b.mutation ? (H = function H() {}, N = function N(b, a, c) {
      (a.updateQueue = c) && e(a);
    }, c = function c(b, a, _c, d) {
      _c !== d && e(a);
    }) : v ? F("235") : F("236");
    return { completeWork: function completeWork(b, a, d) {
        var g = a.pendingProps;if (null === g) g = a.memoizedProps;else if (2147483647 !== a.expirationTime || 2147483647 === d) a.pendingProps = null;switch (a.tag) {case 1:
            return null;case 2:
            return xa(a), null;case 3:
            y(a);L(P, a);L(O, a);g = a.stateNode;g.pendingContext && (g.context = g.pendingContext, g.pendingContext = null);if (null === b || null === b.child) G(a), a.effectTag &= -3;H(a);return null;case 5:
            z(a);d = B();var l = a.type;if (null !== b && null != a.stateNode) {
              var m = b.memoizedProps,
                  v = a.stateNode,
                  w = x();v = p(v, l, m, g, d, w);N(b, a, v, l, m, g, d);b.ref !== a.ref && (a.effectTag |= 128);
            } else {
              if (!g) return null === a.stateNode ? F("166") : void 0, null;b = x();if (G(a)) C(a, d, b) && e(a);else {
                b = f(l, g, d, b, a);a: for (m = a.child; null !== m;) {
                  if (5 === m.tag || 6 === m.tag) k(b, m.stateNode);else if (4 !== m.tag && null !== m.child) {
                    m.child["return"] = m;m = m.child;continue;
                  }if (m === a) break;for (; null === m.sibling;) {
                    if (null === m["return"] || m["return"] === a) break a;m = m["return"];
                  }m.sibling["return"] = m["return"];m = m.sibling;
                }h(b, l, g, d) && e(a);a.stateNode = b;
              }null !== a.ref && (a.effectTag |= 128);
            }return null;case 6:
            if (b && null != a.stateNode) c(b, a, b.memoizedProps, g);else {
              if ("string" !== typeof g) return null === a.stateNode ? F("166") : void 0, null;b = B();d = x();G(a) ? E(a) && e(a) : a.stateNode = r(g, b, d, a);
            }return null;case 7:
            (g = a.memoizedProps) ? void 0 : F("165");a.tag = 8;l = [];a: for ((m = a.stateNode) && (m["return"] = a); null !== m;) {
              if (5 === m.tag || 6 === m.tag || 4 === m.tag) F("247");else if (9 === m.tag) l.push(m.type);else if (null !== m.child) {
                m.child["return"] = m;m = m.child;continue;
              }for (; null === m.sibling;) {
                if (null === m["return"] || m["return"] === a) break a;m = m["return"];
              }m.sibling["return"] = m["return"];m = m.sibling;
            }m = g.handler;g = m(g.props, l);a.child = zb(a, null !== b ? b.child : null, g, d);return a.child;case 8:
            return a.tag = 7, null;case 9:
            return null;case 10:
            return null;case 4:
            return y(a), H(a), null;case 0:
            F("167");default:
            F("156");}
      } };
  }
  function Db(b, a) {
    function d(b) {
      var c = b.ref;if (null !== c) try {
        c(null);
      } catch (l) {
        a(b, l);
      }
    }function e(b) {
      "function" === typeof Ua && Ua(b);switch (b.tag) {case 2:
          d(b);var c = b.stateNode;if ("function" === typeof c.componentWillUnmount) try {
            c.props = b.memoizedProps, c.state = b.memoizedState, c.componentWillUnmount();
          } catch (l) {
            a(b, l);
          }break;case 5:
          d(b);break;case 7:
          f(b.stateNode);break;case 4:
          p && k(b);}
    }function f(a) {
      for (var b = a;;) {
        if (e(b), null === b.child || p && 4 === b.tag) {
          if (b === a) break;for (; null === b.sibling;) {
            if (null === b["return"] || b["return"] === a) return;b = b["return"];
          }b.sibling["return"] = b["return"];b = b.sibling;
        } else b.child["return"] = b, b = b.child;
      }
    }function r(b) {
      return 5 === b.tag || 3 === b.tag || 4 === b.tag;
    }function k(b) {
      for (var a = b, c = !1, d = void 0, h = void 0;;) {
        if (!c) {
          c = a["return"];a: for (;;) {
            null === c ? F("160") : void 0;switch (c.tag) {case 5:
                d = c.stateNode;h = !1;break a;case 3:
                d = c.stateNode.containerInfo;h = !0;break a;case 4:
                d = c.stateNode.containerInfo;h = !0;break a;}c = c["return"];
          }c = !0;
        }if (5 === a.tag || 6 === a.tag) f(a), h ? N(d, a.stateNode) : H(d, a.stateNode);else if (4 === a.tag ? d = a.stateNode.containerInfo : e(a), null !== a.child) {
          a.child["return"] = a;a = a.child;continue;
        }if (a === b) break;for (; null === a.sibling;) {
          if (null === a["return"] || a["return"] === b) return;a = a["return"];4 === a.tag && (c = !1);
        }a.sibling["return"] = a["return"];a = a.sibling;
      }
    }var h = b.getPublicInstance,
        p = b.mutation;b = b.persistence;p || (b ? F("235") : F("236"));var v = p.commitMount,
        B = p.commitUpdate,
        z = p.resetTextContent,
        x = p.commitTextUpdate,
        y = p.appendChild,
        C = p.appendChildToContainer,
        E = p.insertBefore,
        G = p.insertInContainerBefore,
        H = p.removeChild,
        N = p.removeChildFromContainer;return { commitResetTextContent: function commitResetTextContent(a) {
        z(a.stateNode);
      }, commitPlacement: function commitPlacement(a) {
        a: {
          for (var b = a["return"]; null !== b;) {
            if (r(b)) {
              var c = b;break a;
            }b = b["return"];
          }F("160");c = void 0;
        }var d = b = void 0;switch (c.tag) {case 5:
            b = c.stateNode;d = !1;break;case 3:
            b = c.stateNode.containerInfo;d = !0;break;case 4:
            b = c.stateNode.containerInfo;d = !0;break;default:
            F("161");}c.effectTag & 16 && (z(b), c.effectTag &= -17);a: b: for (c = a;;) {
          for (; null === c.sibling;) {
            if (null === c["return"] || r(c["return"])) {
              c = null;break a;
            }c = c["return"];
          }c.sibling["return"] = c["return"];for (c = c.sibling; 5 !== c.tag && 6 !== c.tag;) {
            if (c.effectTag & 2) continue b;if (null === c.child || 4 === c.tag) continue b;else c.child["return"] = c, c = c.child;
          }if (!(c.effectTag & 2)) {
            c = c.stateNode;break a;
          }
        }for (var e = a;;) {
          if (5 === e.tag || 6 === e.tag) c ? d ? G(b, e.stateNode, c) : E(b, e.stateNode, c) : d ? C(b, e.stateNode) : y(b, e.stateNode);else if (4 !== e.tag && null !== e.child) {
            e.child["return"] = e;e = e.child;continue;
          }if (e === a) break;for (; null === e.sibling;) {
            if (null === e["return"] || e["return"] === a) return;e = e["return"];
          }e.sibling["return"] = e["return"];e = e.sibling;
        }
      }, commitDeletion: function commitDeletion(b) {
        k(b);b["return"] = null;b.child = null;b.alternate && (b.alternate.child = null, b.alternate["return"] = null);
      }, commitWork: function commitWork(b, a) {
        switch (a.tag) {case 2:
            break;case 5:
            var c = a.stateNode;if (null != c) {
              var e = a.memoizedProps;b = null !== b ? b.memoizedProps : e;var d = a.type,
                  g = a.updateQueue;a.updateQueue = null;null !== g && B(c, g, d, b, e, a);
            }break;case 6:
            null === a.stateNode ? F("162") : void 0;c = a.memoizedProps;x(a.stateNode, null !== b ? b.memoizedProps : c, c);break;case 3:
            break;default:
            F("163");}
      }, commitLifeCycles: function commitLifeCycles(b, a) {
        switch (a.tag) {case 2:
            var c = a.stateNode;if (a.effectTag & 4) if (null === b) c.props = a.memoizedProps, c.state = a.memoizedState, c.componentDidMount();else {
              var e = b.memoizedProps;b = b.memoizedState;c.props = a.memoizedProps;c.state = a.memoizedState;c.componentDidUpdate(e, b);
            }a = a.updateQueue;null !== a && ib(a, c);break;case 3:
            c = a.updateQueue;null !== c && ib(c, null !== a.child ? a.child.stateNode : null);break;case 5:
            c = a.stateNode;null === b && a.effectTag & 4 && v(c, a.type, a.memoizedProps, a);break;case 6:
            break;case 4:
            break;default:
            F("163");}
      }, commitAttachRef: function commitAttachRef(a) {
        var b = a.ref;if (null !== b) {
          var c = a.stateNode;switch (a.tag) {case 5:
              b(h(c));break;default:
              b(c);}
        }
      }, commitDetachRef: function commitDetachRef(a) {
        a = a.ref;null !== a && a(null);
      } };
  }var Eb = {};
  function Hb(b) {
    function a(a) {
      a === Eb ? F("174") : void 0;return a;
    }var d = b.getChildHostContext,
        e = b.getRootHostContext,
        f = { current: Eb },
        r = { current: Eb },
        k = { current: Eb };return { getHostContext: function getHostContext() {
        return a(f.current);
      }, getRootHostContainer: function getRootHostContainer() {
        return a(k.current);
      }, popHostContainer: function popHostContainer(a) {
        L(f, a);L(r, a);L(k, a);
      }, popHostContext: function popHostContext(a) {
        r.current === a && (L(f, a), L(r, a));
      }, pushHostContainer: function pushHostContainer(a, b) {
        M(k, b, a);b = e(b);M(r, a, a);M(f, b, a);
      }, pushHostContext: function pushHostContext(b) {
        var e = a(k.current),
            h = a(f.current);
        e = d(h, b.type, e);h !== e && (M(r, b, b), M(f, e, b));
      }, resetHostContainer: function resetHostContainer() {
        f.current = Eb;k.current = Eb;
      } };
  }
  function Ib(b) {
    function a(a, b) {
      var e = new R(5, null, 0);e.type = "DELETED";e.stateNode = b;e["return"] = a;e.effectTag = 8;null !== a.lastEffect ? (a.lastEffect.nextEffect = e, a.lastEffect = e) : a.firstEffect = a.lastEffect = e;
    }function d(a, b) {
      switch (a.tag) {case 5:
          return b = r(b, a.type, a.pendingProps), null !== b ? (a.stateNode = b, !0) : !1;case 6:
          return b = k(b, a.pendingProps), null !== b ? (a.stateNode = b, !0) : !1;default:
          return !1;}
    }function e(a) {
      for (a = a["return"]; null !== a && 5 !== a.tag && 3 !== a.tag;) {
        a = a["return"];
      }z = a;
    }var f = b.shouldSetTextContent;
    b = b.hydration;if (!b) return { enterHydrationState: function enterHydrationState() {
        return !1;
      }, resetHydrationState: function resetHydrationState() {}, tryToClaimNextHydratableInstance: function tryToClaimNextHydratableInstance() {}, prepareToHydrateHostInstance: function prepareToHydrateHostInstance() {
        F("175");
      }, prepareToHydrateHostTextInstance: function prepareToHydrateHostTextInstance() {
        F("176");
      }, popHydrationState: function popHydrationState() {
        return !1;
      } };var r = b.canHydrateInstance,
        k = b.canHydrateTextInstance,
        h = b.getNextHydratableSibling,
        p = b.getFirstHydratableChild,
        v = b.hydrateInstance,
        B = b.hydrateTextInstance,
        z = null,
        x = null,
        y = !1;return { enterHydrationState: function enterHydrationState(a) {
        x = p(a.stateNode.containerInfo);z = a;return y = !0;
      }, resetHydrationState: function resetHydrationState() {
        x = z = null;y = !1;
      }, tryToClaimNextHydratableInstance: function tryToClaimNextHydratableInstance(b) {
        if (y) {
          var e = x;if (e) {
            if (!d(b, e)) {
              e = h(e);if (!e || !d(b, e)) {
                b.effectTag |= 2;y = !1;z = b;return;
              }a(z, x);
            }z = b;x = p(e);
          } else b.effectTag |= 2, y = !1, z = b;
        }
      }, prepareToHydrateHostInstance: function prepareToHydrateHostInstance(a, b, e) {
        b = v(a.stateNode, a.type, a.memoizedProps, b, e, a);a.updateQueue = b;return null !== b ? !0 : !1;
      }, prepareToHydrateHostTextInstance: function prepareToHydrateHostTextInstance(a) {
        return B(a.stateNode, a.memoizedProps, a);
      }, popHydrationState: function popHydrationState(b) {
        if (b !== z) return !1;if (!y) return e(b), y = !0, !1;var d = b.type;if (5 !== b.tag || "head" !== d && "body" !== d && !f(d, b.memoizedProps)) for (d = x; d;) {
          a(b, d), d = h(d);
        }e(b);x = z ? h(b.stateNode) : null;return !0;
      } };
  }
  function Jb(b) {
    function a(a) {
      Ia = T = !0;var b = a.stateNode;b.current === a ? F("177") : void 0;b.isReadyForCommit = !1;ha.current = null;if (1 < a.effectTag) {
        if (null !== a.lastEffect) {
          a.lastEffect.nextEffect = a;var c = a.firstEffect;
        } else c = a;
      } else c = a.firstEffect;Nb();for (u = c; null !== u;) {
        var e = !1,
            d = void 0;try {
          for (; null !== u;) {
            var f = u.effectTag;f & 16 && Ob(u);if (f & 128) {
              var g = u.alternate;null !== g && Pb(g);
            }switch (f & -242) {case 2:
                ub(u);u.effectTag &= -3;break;case 6:
                ub(u);u.effectTag &= -3;vb(u.alternate, u);break;case 4:
                vb(u.alternate, u);break;case 8:
                Wa = !0, Qb(u), Wa = !1;}u = u.nextEffect;
          }
        } catch (Xa) {
          e = !0, d = Xa;
        }e && (null === u ? F("178") : void 0, h(u, d), null !== u && (u = u.nextEffect));
      }Rb();b.current = a;for (u = c; null !== u;) {
        c = !1;e = void 0;try {
          for (; null !== u;) {
            var k = u.effectTag;k & 36 && Sb(u.alternate, u);k & 128 && Tb(u);if (k & 64) switch (d = u, f = void 0, null !== J && (f = J.get(d), J["delete"](d), null == f && null !== d.alternate && (d = d.alternate, f = J.get(d), J["delete"](d))), null == f ? F("184") : void 0, d.tag) {case 2:
                d.stateNode.componentDidCatch(f.error, { componentStack: f.componentStack });
                break;case 3:
                null === Q && (Q = f.error);break;default:
                F("157");}var oa = u.nextEffect;u.nextEffect = null;u = oa;
          }
        } catch (Xa) {
          c = !0, e = Xa;
        }c && (null === u ? F("178") : void 0, h(u, e), null !== u && (u = u.nextEffect));
      }T = Ia = !1;"function" === typeof Ta && Ta(a.stateNode);S && (S.forEach(C), S = null);null !== Q && (a = Q, Q = null, Ga(a));b = b.current.expirationTime;0 === b && (Z = J = null);return b;
    }function d(a) {
      for (;;) {
        var b = Ub(a.alternate, a, D),
            c = a["return"],
            e = a.sibling;var d = a;if (2147483647 === D || 2147483647 !== d.expirationTime) {
          if (2 !== d.tag && 3 !== d.tag) var f = 0;else f = d.updateQueue, f = null === f ? 0 : f.expirationTime;for (var g = d.child; null !== g;) {
            0 !== g.expirationTime && (0 === f || f > g.expirationTime) && (f = g.expirationTime), g = g.sibling;
          }d.expirationTime = f;
        }if (null !== b) return b;null !== c && (null === c.firstEffect && (c.firstEffect = a.firstEffect), null !== a.lastEffect && (null !== c.lastEffect && (c.lastEffect.nextEffect = a.firstEffect), c.lastEffect = a.lastEffect), 1 < a.effectTag && (null !== c.lastEffect ? c.lastEffect.nextEffect = a : c.firstEffect = a, c.lastEffect = a));if (null !== e) return e;if (null !== c) a = c;else {
          a.stateNode.isReadyForCommit = !0;break;
        }
      }return null;
    }function e(a) {
      var b = Gb(a.alternate, a, D);null === b && (b = d(a));ha.current = null;return b;
    }function f(a) {
      var b = Vb(a.alternate, a, D);null === b && (b = d(a));ha.current = null;return b;
    }function r(a) {
      if (null !== J) {
        if (!(0 === D || D > a)) if (D <= Ya) for (; null !== A;) {
          A = p(A) ? f(A) : e(A);
        } else for (; null !== A && !l();) {
          A = p(A) ? f(A) : e(A);
        }
      } else if (!(0 === D || D > a)) if (D <= Ya) for (; null !== A;) {
        A = e(A);
      } else for (; null !== A && !l();) {
        A = e(A);
      }
    }function k(a, b) {
      T ? F("243") : void 0;T = !0;a.isReadyForCommit = !1;if (a !== aa || b !== D || null === A) {
        for (; -1 < K;) {
          sa[K] = null, K--;
        }ta = n;O.current = n;P.current = !1;w();aa = a;D = b;A = Ca(aa.current, null, b);
      }var c = !1,
          e = null;try {
        r(b);
      } catch (Va) {
        c = !0, e = Va;
      }for (; c;) {
        if (pa) {
          Q = e;break;
        }var d = A;if (null === d) pa = !0;else {
          var g = h(d, e);null === g ? F("183") : void 0;if (!pa) {
            try {
              c = g;e = b;for (g = c; null !== d;) {
                switch (d.tag) {case 2:
                    xa(d);break;case 5:
                    Fb(d);break;case 3:
                    m(d);break;case 4:
                    m(d);}if (d === g || d.alternate === g) break;d = d["return"];
              }A = f(c);r(e);
            } catch (Va) {
              c = !0;e = Va;continue;
            }break;
          }
        }
      }b = Q;pa = T = !1;Q = null;null !== b && Ga(b);return a.isReadyForCommit ? a.current.alternate : null;
    }function h(a, b) {
      var c = ha.current = null,
          e = !1,
          d = !1,
          f = null;if (3 === a.tag) c = a, v(a) && (pa = !0);else for (var g = a["return"]; null !== g && null === c;) {
        2 === g.tag ? "function" === typeof g.stateNode.componentDidCatch && (e = !0, f = ia(g), c = g, d = !0) : 3 === g.tag && (c = g);if (v(g)) {
          if (Wa || null !== S && (S.has(g) || null !== g.alternate && S.has(g.alternate))) return null;c = null;d = !1;
        }g = g["return"];
      }if (null !== c) {
        null === Z && (Z = new Set());Z.add(c);var k = "";g = a;do {
          a: switch (g.tag) {case 0:case 1:case 2:case 5:
              var h = g._debugOwner,
                  l = g._debugSource;var m = ia(g);var p = null;h && (p = ia(h));h = l;m = "\n    in " + (m || "Unknown") + (h ? " (at " + h.fileName.replace(/^.*[\\\/]/, "") + ":" + h.lineNumber + ")" : p ? " (created by " + p + ")" : "");break a;default:
              m = "";}k += m;g = g["return"];
        } while (g);g = k;a = ia(a);null === J && (J = new Map());b = { componentName: a, componentStack: g, error: b, errorBoundary: e ? c.stateNode : null, errorBoundaryFound: e, errorBoundaryName: f, willRetry: d };J.set(c, b);try {
          var oa = b.error;oa && oa.suppressReactErrorLogging || console.error(oa);
        } catch (Za) {
          Za && Za.suppressReactErrorLogging || console.error(Za);
        }Ia ? (null === S && (S = new Set()), S.add(c)) : C(c);return c;
      }null === Q && (Q = b);return null;
    }function p(a) {
      return null !== J && (J.has(a) || null !== a.alternate && J.has(a.alternate));
    }function v(a) {
      return null !== Z && (Z.has(a) || null !== a.alternate && Z.has(a.alternate));
    }function B() {
      return 20 * (((E() + 100) / 20 | 0) + 1);
    }function z(a) {
      return 0 !== U ? U : T ? Ia ? 1 : D : !Wb || a.internalContextTag & 1 ? B() : 1;
    }function x(a, b) {
      return y(a, b, !1);
    }function y(a, b) {
      for (; null !== a;) {
        if (0 === a.expirationTime || a.expirationTime > b) a.expirationTime = b;null !== a.alternate && (0 === a.alternate.expirationTime || a.alternate.expirationTime > b) && (a.alternate.expirationTime = b);if (null === a["return"]) if (3 === a.tag) {
          var e = a.stateNode;!T && e === aa && b < D && (A = aa = null, D = 0);var d = e,
              f = b;Ja > Xb && F("185");if (null === d.nextScheduledRoot) d.remainingExpirationTime = f, null === I ? (ba = I = d, d.nextScheduledRoot = d) : (I = I.nextScheduledRoot = d, I.nextScheduledRoot = ba);else {
            var h = d.remainingExpirationTime;if (0 === h || f < h) d.remainingExpirationTime = f;
          }da || (V ? Ka && (W = d, X = 1, g(W, X)) : 1 === f ? c(1, null) : G(f));!T && e === aa && b < D && (A = aa = null, D = 0);
        } else break;a = a["return"];
      }
    }function C(a) {
      y(a, 1, !0);
    }function E() {
      return Ya = (($a() - wb) / 10 | 0) + 2;
    }function G(a) {
      if (0 !== La) {
        if (a > La) return;Yb(ab);
      }var b = $a() - wb;La = a;ab = Zb(N, { timeout: 10 * (a - 2) - b });
    }function H() {
      var a = 0,
          b = null;if (null !== I) for (var c = I, d = ba; null !== d;) {
        var e = d.remainingExpirationTime;if (0 === e) {
          null === c || null === I ? F("244") : void 0;if (d === d.nextScheduledRoot) {
            ba = I = d.nextScheduledRoot = null;break;
          } else if (d === ba) ba = e = d.nextScheduledRoot, I.nextScheduledRoot = e, d.nextScheduledRoot = null;else if (d === I) {
            I = c;I.nextScheduledRoot = ba;d.nextScheduledRoot = null;break;
          } else c.nextScheduledRoot = d.nextScheduledRoot, d.nextScheduledRoot = null;d = c.nextScheduledRoot;
        } else {
          if (0 === a || e < a) a = e, b = d;if (d === I) break;c = d;d = d.nextScheduledRoot;
        }
      }c = W;null !== c && c === b ? Ja++ : Ja = 0;W = b;X = a;
    }function N(a) {
      c(0, a);
    }function c(a, b) {
      qa = b;for (H(); null !== W && 0 !== X && (0 === a || X <= a) && !bb;) {
        g(W, X), H();
      }null !== qa && (La = 0, ab = -1);0 !== X && G(X);qa = null;bb = !1;Ja = 0;if (Ma) throw a = cb, cb = null, Ma = !1, a;
    }function g(b, c) {
      da ? F("245") : void 0;da = !0;if (c <= E()) {
        var d = b.finishedWork;null !== d ? (b.finishedWork = null, b.remainingExpirationTime = a(d)) : (b.finishedWork = null, d = k(b, c), null !== d && (b.remainingExpirationTime = a(d)));
      } else d = b.finishedWork, null !== d ? (b.finishedWork = null, b.remainingExpirationTime = a(d)) : (b.finishedWork = null, d = k(b, c), null !== d && (l() ? b.finishedWork = d : b.remainingExpirationTime = a(d)));da = !1;
    }function l() {
      return null === qa || qa.timeRemaining() > $b ? !1 : bb = !0;
    }function Ga(a) {
      null === W ? F("246") : void 0;W.remainingExpirationTime = 0;Ma || (Ma = !0, cb = a);
    }var t = Hb(b),
        q = Ib(b),
        m = t.popHostContainer,
        Fb = t.popHostContext,
        w = t.resetHostContainer,
        tb = Bb(b, t, q, x, z),
        Gb = tb.beginWork,
        Vb = tb.beginFailedWork,
        Ub = Cb(b, t, q).completeWork;t = Db(b, h);var Ob = t.commitResetTextContent,
        ub = t.commitPlacement,
        Qb = t.commitDeletion,
        vb = t.commitWork,
        Sb = t.commitLifeCycles,
        Tb = t.commitAttachRef,
        Pb = t.commitDetachRef,
        $a = b.now,
        Zb = b.scheduleDeferredCallback,
        Yb = b.cancelDeferredCallback,
        Wb = b.useSyncScheduling,
        Nb = b.prepareForCommit,
        Rb = b.resetAfterCommit,
        wb = $a(),
        Ya = 2,
        U = 0,
        T = !1,
        A = null,
        aa = null,
        D = 0,
        u = null,
        J = null,
        Z = null,
        S = null,
        Q = null,
        pa = !1,
        Ia = !1,
        Wa = !1,
        ba = null,
        I = null,
        La = 0,
        ab = -1,
        da = !1,
        W = null,
        X = 0,
        bb = !1,
        Ma = !1,
        cb = null,
        qa = null,
        V = !1,
        Ka = !1,
        Xb = 1E3,
        Ja = 0,
        $b = 1;return { computeAsyncExpiration: B, computeExpirationForFiber: z, scheduleWork: x, batchedUpdates: function batchedUpdates(a, b) {
        var d = V;V = !0;try {
          return a(b);
        } finally {
          (V = d) || da || c(1, null);
        }
      }, unbatchedUpdates: function unbatchedUpdates(a) {
        if (V && !Ka) {
          Ka = !0;try {
            return a();
          } finally {
            Ka = !1;
          }
        }return a();
      }, flushSync: function flushSync(a) {
        var b = V;V = !0;try {
          a: {
            var d = U;U = 1;try {
              var e = a();break a;
            } finally {
              U = d;
            }e = void 0;
          }return e;
        } finally {
          V = b, da ? F("187") : void 0, c(1, null);
        }
      }, deferredUpdates: function deferredUpdates(a) {
        var b = U;U = B();try {
          return a();
        } finally {
          U = b;
        }
      } };
  }
  function Kb(b) {
    function a(a) {
      a = na(a);return null === a ? null : a.stateNode;
    }var d = b.getPublicInstance;b = Jb(b);var e = b.computeAsyncExpiration,
        f = b.computeExpirationForFiber,
        r = b.scheduleWork;return { createContainer: function createContainer(a, b) {
        var d = new R(3, null, 0);a = { current: d, containerInfo: a, pendingChildren: null, remainingExpirationTime: 0, isReadyForCommit: !1, finishedWork: null, context: null, pendingContext: null, hydrate: b, nextScheduledRoot: null };return d.stateNode = a;
      }, updateContainer: function updateContainer(a, b, d, v) {
        var h = b.current;if (d) {
          d = d._reactInternalFiber;var k;b: {
            2 === ja(d) && 2 === d.tag ? void 0 : F("170");for (k = d; 3 !== k.tag;) {
              if (va(k)) {
                k = k.stateNode.__reactInternalMemoizedMergedChildContext;break b;
              }(k = k["return"]) ? void 0 : F("171");
            }k = k.stateNode.context;
          }d = va(d) ? za(d, k) : k;
        } else d = n;null === b.context ? b.context = d : b.pendingContext = d;b = v;b = void 0 === b ? null : b;v = null != a && null != a.type && null != a.type.prototype && !0 === a.type.prototype.unstable_isAsyncReactComponent ? e() : f(h);fb(h, { expirationTime: v, partialState: { element: a }, callback: b, isReplace: !1, isForced: !1,
          nextCallback: null, next: null });r(h, v);
      }, batchedUpdates: b.batchedUpdates, unbatchedUpdates: b.unbatchedUpdates, deferredUpdates: b.deferredUpdates, flushSync: b.flushSync, getPublicRootInstance: function getPublicRootInstance(a) {
        a = a.current;if (!a.child) return null;switch (a.child.tag) {case 5:
            return d(a.child.stateNode);default:
            return a.child.stateNode;}
      }, findHostInstance: a, findHostInstanceWithNoPortals: function findHostInstanceWithNoPortals(a) {
        a = ra(a);return null === a ? null : a.stateNode;
      }, injectIntoDevTools: function injectIntoDevTools(b) {
        var d = b.findFiberByHostInstance;return Sa(ca({}, b, { findHostInstanceByFiber: function findHostInstanceByFiber(b) {
            return a(b);
          }, findFiberByHostInstance: function findFiberByHostInstance(a) {
            return d ? d(a) : null;
          } }));
      } };
  }var Lb = Object.freeze({ default: Kb }),
      Mb = Lb && Kb || Lb;module.exports = Mb["default"] ? Mb["default"] : Mb;
  return ($$$reconciler || ($$$reconciler = module.exports))(config);
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.2.0
 * react-reconciler.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (process.env.NODE_ENV !== "production") {
  // This is a hacky way to ensure third party renderers don't share
  // top-level module state inside the reconciler. Ideally we should
  // remove this hack by putting all top-level state into the closures
  // and then forbidding adding more of it in the reconciler.
  var $$$reconciler;
  module.exports = function (config) {
    'use strict';

    var _assign = __webpack_require__(4);
    var invariant = __webpack_require__(7);
    var warning = __webpack_require__(8);
    var React = __webpack_require__(1);
    var emptyObject = __webpack_require__(5);
    var checkPropTypes = __webpack_require__(9);
    var shallowEqual = __webpack_require__(13);

    /**
     * WARNING: DO NOT manually require this module.
     * This is a replacement for `invariant(...)` used by the error code system
     * and will _only_ be required by the corresponding babel pass.
     * It always throws.
     */

    var enableAsyncSubtreeAPI = true;

    // Exports ReactDOM.createRoot

    var enableUserTimingAPI = true;

    // Mutating mode (React DOM, React ART, React Native):
    var enableMutatingReconciler = true;
    // Experimental noop mode (currently unused):
    var enableNoopReconciler = false;
    // Experimental persistent mode (CS):
    var enablePersistentReconciler = false;

    // Helps identify side effects in begin-phase lifecycle hooks and setState reducers:
    var debugRenderPhaseSideEffects = false;

    // Only used in www builds.

    /**
     * `ReactInstanceMap` maintains a mapping from a public facing stateful
     * instance (key) and the internal representation (value). This allows public
     * methods to accept the user facing instance as an argument and map them back
     * to internal methods.
     *
     * Note that this module is currently shared and assumed to be stateless.
     * If this becomes an actual Map, that will break.
     */

    /**
     * This API should be called `delete` but we'd have to make sure to always
     * transform these to strings for IE support. When this transform is fully
     * supported we can rename it.
     */

    function get(key) {
      return key._reactInternalFiber;
    }

    function set(key, value) {
      key._reactInternalFiber = value;
    }

    var ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

    var ReactCurrentOwner = ReactInternals.ReactCurrentOwner;
    var ReactDebugCurrentFrame = ReactInternals.ReactDebugCurrentFrame;

    function getComponentName(fiber) {
      var type = fiber.type;

      if (typeof type === 'string') {
        return type;
      }
      if (typeof type === 'function') {
        return type.displayName || type.name;
      }
      return null;
    }

    var IndeterminateComponent = 0; // Before we know whether it is functional or class
    var FunctionalComponent = 1;
    var ClassComponent = 2;
    var HostRoot = 3; // Root of a host tree. Could be nested inside another node.
    var HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
    var HostComponent = 5;
    var HostText = 6;
    var CallComponent = 7;
    var CallHandlerPhase = 8;
    var ReturnComponent = 9;
    var Fragment = 10;

    // Don't change these two values:
    var NoEffect = 0; //           0b00000000
    var PerformedWork = 1; //      0b00000001

    // You can change the rest (and add more).
    var Placement = 2; //          0b00000010
    var Update = 4; //             0b00000100
    var PlacementAndUpdate = 6; // 0b00000110
    var Deletion = 8; //           0b00001000
    var ContentReset = 16; //      0b00010000
    var Callback = 32; //          0b00100000
    var Err = 64; //               0b01000000
    var Ref = 128; //              0b10000000

    var MOUNTING = 1;
    var MOUNTED = 2;
    var UNMOUNTED = 3;

    function isFiberMountedImpl(fiber) {
      var node = fiber;
      if (!fiber.alternate) {
        // If there is no alternate, this might be a new tree that isn't inserted
        // yet. If it is, then it will have a pending insertion effect on it.
        if ((node.effectTag & Placement) !== NoEffect) {
          return MOUNTING;
        }
        while (node['return']) {
          node = node['return'];
          if ((node.effectTag & Placement) !== NoEffect) {
            return MOUNTING;
          }
        }
      } else {
        while (node['return']) {
          node = node['return'];
        }
      }
      if (node.tag === HostRoot) {
        // TODO: Check if this was a nested HostRoot when used with
        // renderContainerIntoSubtree.
        return MOUNTED;
      }
      // If we didn't hit the root, that means that we're in an disconnected tree
      // that has been unmounted.
      return UNMOUNTED;
    }

    function isFiberMounted(fiber) {
      return isFiberMountedImpl(fiber) === MOUNTED;
    }

    function isMounted(component) {
      {
        var owner = ReactCurrentOwner.current;
        if (owner !== null && owner.tag === ClassComponent) {
          var ownerFiber = owner;
          var instance = ownerFiber.stateNode;
          warning(instance._warnedAboutRefsInRender, '%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', getComponentName(ownerFiber) || 'A component');
          instance._warnedAboutRefsInRender = true;
        }
      }

      var fiber = get(component);
      if (!fiber) {
        return false;
      }
      return isFiberMountedImpl(fiber) === MOUNTED;
    }

    function assertIsMounted(fiber) {
      !(isFiberMountedImpl(fiber) === MOUNTED) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
    }

    function findCurrentFiberUsingSlowPath(fiber) {
      var alternate = fiber.alternate;
      if (!alternate) {
        // If there is no alternate, then we only need to check if it is mounted.
        var state = isFiberMountedImpl(fiber);
        !(state !== UNMOUNTED) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
        if (state === MOUNTING) {
          return null;
        }
        return fiber;
      }
      // If we have two possible branches, we'll walk backwards up to the root
      // to see what path the root points to. On the way we may hit one of the
      // special cases and we'll deal with them.
      var a = fiber;
      var b = alternate;
      while (true) {
        var parentA = a['return'];
        var parentB = parentA ? parentA.alternate : null;
        if (!parentA || !parentB) {
          // We're at the root.
          break;
        }

        // If both copies of the parent fiber point to the same child, we can
        // assume that the child is current. This happens when we bailout on low
        // priority: the bailed out fiber's child reuses the current child.
        if (parentA.child === parentB.child) {
          var child = parentA.child;
          while (child) {
            if (child === a) {
              // We've determined that A is the current branch.
              assertIsMounted(parentA);
              return fiber;
            }
            if (child === b) {
              // We've determined that B is the current branch.
              assertIsMounted(parentA);
              return alternate;
            }
            child = child.sibling;
          }
          // We should never have an alternate for any mounting node. So the only
          // way this could possibly happen is if this was unmounted, if at all.
          invariant(false, 'Unable to find node on an unmounted component.');
        }

        if (a['return'] !== b['return']) {
          // The return pointer of A and the return pointer of B point to different
          // fibers. We assume that return pointers never criss-cross, so A must
          // belong to the child set of A.return, and B must belong to the child
          // set of B.return.
          a = parentA;
          b = parentB;
        } else {
          // The return pointers point to the same fiber. We'll have to use the
          // default, slow path: scan the child sets of each parent alternate to see
          // which child belongs to which set.
          //
          // Search parent A's child set
          var didFindChild = false;
          var _child = parentA.child;
          while (_child) {
            if (_child === a) {
              didFindChild = true;
              a = parentA;
              b = parentB;
              break;
            }
            if (_child === b) {
              didFindChild = true;
              b = parentA;
              a = parentB;
              break;
            }
            _child = _child.sibling;
          }
          if (!didFindChild) {
            // Search parent B's child set
            _child = parentB.child;
            while (_child) {
              if (_child === a) {
                didFindChild = true;
                a = parentB;
                b = parentA;
                break;
              }
              if (_child === b) {
                didFindChild = true;
                b = parentB;
                a = parentA;
                break;
              }
              _child = _child.sibling;
            }
            !didFindChild ? invariant(false, 'Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.') : void 0;
          }
        }

        !(a.alternate === b) ? invariant(false, 'Return fibers should always be each others\' alternates. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      }
      // If the root is not a host container, we're in a disconnected tree. I.e.
      // unmounted.
      !(a.tag === HostRoot) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
      if (a.stateNode.current === a) {
        // We've determined that A is the current branch.
        return fiber;
      }
      // Otherwise B has to be current branch.
      return alternate;
    }

    function findCurrentHostFiber(parent) {
      var currentParent = findCurrentFiberUsingSlowPath(parent);
      if (!currentParent) {
        return null;
      }

      // Next we'll drill down this component to find the first HostComponent/Text.
      var node = currentParent;
      while (true) {
        if (node.tag === HostComponent || node.tag === HostText) {
          return node;
        } else if (node.child) {
          node.child['return'] = node;
          node = node.child;
          continue;
        }
        if (node === currentParent) {
          return null;
        }
        while (!node.sibling) {
          if (!node['return'] || node['return'] === currentParent) {
            return null;
          }
          node = node['return'];
        }
        node.sibling['return'] = node['return'];
        node = node.sibling;
      }
      // Flow needs the return null here, but ESLint complains about it.
      // eslint-disable-next-line no-unreachable
      return null;
    }

    function findCurrentHostFiberWithNoPortals(parent) {
      var currentParent = findCurrentFiberUsingSlowPath(parent);
      if (!currentParent) {
        return null;
      }

      // Next we'll drill down this component to find the first HostComponent/Text.
      var node = currentParent;
      while (true) {
        if (node.tag === HostComponent || node.tag === HostText) {
          return node;
        } else if (node.child && node.tag !== HostPortal) {
          node.child['return'] = node;
          node = node.child;
          continue;
        }
        if (node === currentParent) {
          return null;
        }
        while (!node.sibling) {
          if (!node['return'] || node['return'] === currentParent) {
            return null;
          }
          node = node['return'];
        }
        node.sibling['return'] = node['return'];
        node = node.sibling;
      }
      // Flow needs the return null here, but ESLint complains about it.
      // eslint-disable-next-line no-unreachable
      return null;
    }

    var valueStack = [];

    {
      var fiberStack = [];
    }

    var index = -1;

    function createCursor(defaultValue) {
      return {
        current: defaultValue
      };
    }

    function pop(cursor, fiber) {
      if (index < 0) {
        {
          warning(false, 'Unexpected pop.');
        }
        return;
      }

      {
        if (fiber !== fiberStack[index]) {
          warning(false, 'Unexpected Fiber popped.');
        }
      }

      cursor.current = valueStack[index];

      valueStack[index] = null;

      {
        fiberStack[index] = null;
      }

      index--;
    }

    function push(cursor, value, fiber) {
      index++;

      valueStack[index] = cursor.current;

      {
        fiberStack[index] = fiber;
      }

      cursor.current = value;
    }

    function reset() {
      while (index > -1) {
        valueStack[index] = null;

        {
          fiberStack[index] = null;
        }

        index--;
      }
    }

    var describeComponentFrame = function describeComponentFrame(name, source, ownerName) {
      return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
    };

    function describeFiber(fiber) {
      switch (fiber.tag) {
        case IndeterminateComponent:
        case FunctionalComponent:
        case ClassComponent:
        case HostComponent:
          var owner = fiber._debugOwner;
          var source = fiber._debugSource;
          var name = getComponentName(fiber);
          var ownerName = null;
          if (owner) {
            ownerName = getComponentName(owner);
          }
          return describeComponentFrame(name, source, ownerName);
        default:
          return '';
      }
    }

    // This function can only be called with a work-in-progress fiber and
    // only during begin or complete phase. Do not call it under any other
    // circumstances.
    function getStackAddendumByWorkInProgressFiber(workInProgress) {
      var info = '';
      var node = workInProgress;
      do {
        info += describeFiber(node);
        // Otherwise this return pointer might point to the wrong tree:
        node = node['return'];
      } while (node);
      return info;
    }

    function getCurrentFiberOwnerName() {
      {
        var fiber = ReactDebugCurrentFiber.current;
        if (fiber === null) {
          return null;
        }
        var owner = fiber._debugOwner;
        if (owner !== null && typeof owner !== 'undefined') {
          return getComponentName(owner);
        }
      }
      return null;
    }

    function getCurrentFiberStackAddendum() {
      {
        var fiber = ReactDebugCurrentFiber.current;
        if (fiber === null) {
          return null;
        }
        // Safe because if current fiber exists, we are reconciling,
        // and it is guaranteed to be the work-in-progress version.
        return getStackAddendumByWorkInProgressFiber(fiber);
      }
      return null;
    }

    function resetCurrentFiber() {
      ReactDebugCurrentFrame.getCurrentStack = null;
      ReactDebugCurrentFiber.current = null;
      ReactDebugCurrentFiber.phase = null;
    }

    function setCurrentFiber(fiber) {
      ReactDebugCurrentFrame.getCurrentStack = getCurrentFiberStackAddendum;
      ReactDebugCurrentFiber.current = fiber;
      ReactDebugCurrentFiber.phase = null;
    }

    function setCurrentPhase(phase) {
      ReactDebugCurrentFiber.phase = phase;
    }

    var ReactDebugCurrentFiber = {
      current: null,
      phase: null,
      resetCurrentFiber: resetCurrentFiber,
      setCurrentFiber: setCurrentFiber,
      setCurrentPhase: setCurrentPhase,
      getCurrentFiberOwnerName: getCurrentFiberOwnerName,
      getCurrentFiberStackAddendum: getCurrentFiberStackAddendum
    };

    // Prefix measurements so that it's possible to filter them.
    // Longer prefixes are hard to read in DevTools.
    var reactEmoji = '\u269B';
    var warningEmoji = '\u26D4';
    var supportsUserTiming = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

    // Keep track of current fiber so that we know the path to unwind on pause.
    // TODO: this looks the same as nextUnitOfWork in scheduler. Can we unify them?
    var currentFiber = null;
    // If we're in the middle of user code, which fiber and method is it?
    // Reusing `currentFiber` would be confusing for this because user code fiber
    // can change during commit phase too, but we don't need to unwind it (since
    // lifecycles in the commit phase don't resemble a tree).
    var currentPhase = null;
    var currentPhaseFiber = null;
    // Did lifecycle hook schedule an update? This is often a performance problem,
    // so we will keep track of it, and include it in the report.
    // Track commits caused by cascading updates.
    var isCommitting = false;
    var hasScheduledUpdateInCurrentCommit = false;
    var hasScheduledUpdateInCurrentPhase = false;
    var commitCountInCurrentWorkLoop = 0;
    var effectCountInCurrentCommit = 0;
    var isWaitingForCallback = false;
    // During commits, we only show a measurement once per method name
    // to avoid stretch the commit phase with measurement overhead.
    var labelsInCurrentCommit = new Set();

    var formatMarkName = function formatMarkName(markName) {
      return reactEmoji + ' ' + markName;
    };

    var formatLabel = function formatLabel(label, warning$$1) {
      var prefix = warning$$1 ? warningEmoji + ' ' : reactEmoji + ' ';
      var suffix = warning$$1 ? ' Warning: ' + warning$$1 : '';
      return '' + prefix + label + suffix;
    };

    var beginMark = function beginMark(markName) {
      performance.mark(formatMarkName(markName));
    };

    var clearMark = function clearMark(markName) {
      performance.clearMarks(formatMarkName(markName));
    };

    var endMark = function endMark(label, markName, warning$$1) {
      var formattedMarkName = formatMarkName(markName);
      var formattedLabel = formatLabel(label, warning$$1);
      try {
        performance.measure(formattedLabel, formattedMarkName);
      } catch (err) {}
      // If previous mark was missing for some reason, this will throw.
      // This could only happen if React crashed in an unexpected place earlier.
      // Don't pile on with more errors.

      // Clear marks immediately to avoid growing buffer.
      performance.clearMarks(formattedMarkName);
      performance.clearMeasures(formattedLabel);
    };

    var getFiberMarkName = function getFiberMarkName(label, debugID) {
      return label + ' (#' + debugID + ')';
    };

    var getFiberLabel = function getFiberLabel(componentName, isMounted, phase) {
      if (phase === null) {
        // These are composite component total time measurements.
        return componentName + ' [' + (isMounted ? 'update' : 'mount') + ']';
      } else {
        // Composite component methods.
        return componentName + '.' + phase;
      }
    };

    var beginFiberMark = function beginFiberMark(fiber, phase) {
      var componentName = getComponentName(fiber) || 'Unknown';
      var debugID = fiber._debugID;
      var isMounted = fiber.alternate !== null;
      var label = getFiberLabel(componentName, isMounted, phase);

      if (isCommitting && labelsInCurrentCommit.has(label)) {
        // During the commit phase, we don't show duplicate labels because
        // there is a fixed overhead for every measurement, and we don't
        // want to stretch the commit phase beyond necessary.
        return false;
      }
      labelsInCurrentCommit.add(label);

      var markName = getFiberMarkName(label, debugID);
      beginMark(markName);
      return true;
    };

    var clearFiberMark = function clearFiberMark(fiber, phase) {
      var componentName = getComponentName(fiber) || 'Unknown';
      var debugID = fiber._debugID;
      var isMounted = fiber.alternate !== null;
      var label = getFiberLabel(componentName, isMounted, phase);
      var markName = getFiberMarkName(label, debugID);
      clearMark(markName);
    };

    var endFiberMark = function endFiberMark(fiber, phase, warning$$1) {
      var componentName = getComponentName(fiber) || 'Unknown';
      var debugID = fiber._debugID;
      var isMounted = fiber.alternate !== null;
      var label = getFiberLabel(componentName, isMounted, phase);
      var markName = getFiberMarkName(label, debugID);
      endMark(label, markName, warning$$1);
    };

    var shouldIgnoreFiber = function shouldIgnoreFiber(fiber) {
      // Host components should be skipped in the timeline.
      // We could check typeof fiber.type, but does this work with RN?
      switch (fiber.tag) {
        case HostRoot:
        case HostComponent:
        case HostText:
        case HostPortal:
        case ReturnComponent:
        case Fragment:
          return true;
        default:
          return false;
      }
    };

    var clearPendingPhaseMeasurement = function clearPendingPhaseMeasurement() {
      if (currentPhase !== null && currentPhaseFiber !== null) {
        clearFiberMark(currentPhaseFiber, currentPhase);
      }
      currentPhaseFiber = null;
      currentPhase = null;
      hasScheduledUpdateInCurrentPhase = false;
    };

    var pauseTimers = function pauseTimers() {
      // Stops all currently active measurements so that they can be resumed
      // if we continue in a later deferred loop from the same unit of work.
      var fiber = currentFiber;
      while (fiber) {
        if (fiber._debugIsCurrentlyTiming) {
          endFiberMark(fiber, null, null);
        }
        fiber = fiber['return'];
      }
    };

    var resumeTimersRecursively = function resumeTimersRecursively(fiber) {
      if (fiber['return'] !== null) {
        resumeTimersRecursively(fiber['return']);
      }
      if (fiber._debugIsCurrentlyTiming) {
        beginFiberMark(fiber, null);
      }
    };

    var resumeTimers = function resumeTimers() {
      // Resumes all measurements that were active during the last deferred loop.
      if (currentFiber !== null) {
        resumeTimersRecursively(currentFiber);
      }
    };

    function recordEffect() {
      if (enableUserTimingAPI) {
        effectCountInCurrentCommit++;
      }
    }

    function recordScheduleUpdate() {
      if (enableUserTimingAPI) {
        if (isCommitting) {
          hasScheduledUpdateInCurrentCommit = true;
        }
        if (currentPhase !== null && currentPhase !== 'componentWillMount' && currentPhase !== 'componentWillReceiveProps') {
          hasScheduledUpdateInCurrentPhase = true;
        }
      }
    }

    function startRequestCallbackTimer() {
      if (enableUserTimingAPI) {
        if (supportsUserTiming && !isWaitingForCallback) {
          isWaitingForCallback = true;
          beginMark('(Waiting for async callback...)');
        }
      }
    }

    function stopRequestCallbackTimer(didExpire) {
      if (enableUserTimingAPI) {
        if (supportsUserTiming) {
          isWaitingForCallback = false;
          var warning$$1 = didExpire ? 'React was blocked by main thread' : null;
          endMark('(Waiting for async callback...)', '(Waiting for async callback...)', warning$$1);
        }
      }
    }

    function startWorkTimer(fiber) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
          return;
        }
        // If we pause, this is the fiber to unwind from.
        currentFiber = fiber;
        if (!beginFiberMark(fiber, null)) {
          return;
        }
        fiber._debugIsCurrentlyTiming = true;
      }
    }

    function cancelWorkTimer(fiber) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
          return;
        }
        // Remember we shouldn't complete measurement for this fiber.
        // Otherwise flamechart will be deep even for small updates.
        fiber._debugIsCurrentlyTiming = false;
        clearFiberMark(fiber, null);
      }
    }

    function stopWorkTimer(fiber) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
          return;
        }
        // If we pause, its parent is the fiber to unwind from.
        currentFiber = fiber['return'];
        if (!fiber._debugIsCurrentlyTiming) {
          return;
        }
        fiber._debugIsCurrentlyTiming = false;
        endFiberMark(fiber, null, null);
      }
    }

    function stopFailedWorkTimer(fiber) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
          return;
        }
        // If we pause, its parent is the fiber to unwind from.
        currentFiber = fiber['return'];
        if (!fiber._debugIsCurrentlyTiming) {
          return;
        }
        fiber._debugIsCurrentlyTiming = false;
        var warning$$1 = 'An error was thrown inside this error boundary';
        endFiberMark(fiber, null, warning$$1);
      }
    }

    function startPhaseTimer(fiber, phase) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        clearPendingPhaseMeasurement();
        if (!beginFiberMark(fiber, phase)) {
          return;
        }
        currentPhaseFiber = fiber;
        currentPhase = phase;
      }
    }

    function stopPhaseTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        if (currentPhase !== null && currentPhaseFiber !== null) {
          var warning$$1 = hasScheduledUpdateInCurrentPhase ? 'Scheduled a cascading update' : null;
          endFiberMark(currentPhaseFiber, currentPhase, warning$$1);
        }
        currentPhase = null;
        currentPhaseFiber = null;
      }
    }

    function startWorkLoopTimer(nextUnitOfWork) {
      if (enableUserTimingAPI) {
        currentFiber = nextUnitOfWork;
        if (!supportsUserTiming) {
          return;
        }
        commitCountInCurrentWorkLoop = 0;
        // This is top level call.
        // Any other measurements are performed within.
        beginMark('(React Tree Reconciliation)');
        // Resume any measurements that were in progress during the last loop.
        resumeTimers();
      }
    }

    function stopWorkLoopTimer(interruptedBy) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        var warning$$1 = null;
        if (interruptedBy !== null) {
          if (interruptedBy.tag === HostRoot) {
            warning$$1 = 'A top-level update interrupted the previous render';
          } else {
            var componentName = getComponentName(interruptedBy) || 'Unknown';
            warning$$1 = 'An update to ' + componentName + ' interrupted the previous render';
          }
        } else if (commitCountInCurrentWorkLoop > 1) {
          warning$$1 = 'There were cascading updates';
        }
        commitCountInCurrentWorkLoop = 0;
        // Pause any measurements until the next loop.
        pauseTimers();
        endMark('(React Tree Reconciliation)', '(React Tree Reconciliation)', warning$$1);
      }
    }

    function startCommitTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        isCommitting = true;
        hasScheduledUpdateInCurrentCommit = false;
        labelsInCurrentCommit.clear();
        beginMark('(Committing Changes)');
      }
    }

    function stopCommitTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }

        var warning$$1 = null;
        if (hasScheduledUpdateInCurrentCommit) {
          warning$$1 = 'Lifecycle hook scheduled a cascading update';
        } else if (commitCountInCurrentWorkLoop > 0) {
          warning$$1 = 'Caused by a cascading update in earlier commit';
        }
        hasScheduledUpdateInCurrentCommit = false;
        commitCountInCurrentWorkLoop++;
        isCommitting = false;
        labelsInCurrentCommit.clear();

        endMark('(Committing Changes)', '(Committing Changes)', warning$$1);
      }
    }

    function startCommitHostEffectsTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        effectCountInCurrentCommit = 0;
        beginMark('(Committing Host Effects)');
      }
    }

    function stopCommitHostEffectsTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        var count = effectCountInCurrentCommit;
        effectCountInCurrentCommit = 0;
        endMark('(Committing Host Effects: ' + count + ' Total)', '(Committing Host Effects)', null);
      }
    }

    function startCommitLifeCyclesTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        effectCountInCurrentCommit = 0;
        beginMark('(Calling Lifecycle Methods)');
      }
    }

    function stopCommitLifeCyclesTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        var count = effectCountInCurrentCommit;
        effectCountInCurrentCommit = 0;
        endMark('(Calling Lifecycle Methods: ' + count + ' Total)', '(Calling Lifecycle Methods)', null);
      }
    }

    {
      var warnedAboutMissingGetChildContext = {};
    }

    // A cursor to the current merged context object on the stack.
    var contextStackCursor = createCursor(emptyObject);
    // A cursor to a boolean indicating whether the context has changed.
    var didPerformWorkStackCursor = createCursor(false);
    // Keep track of the previous context object that was on the stack.
    // We use this to get access to the parent context after we have already
    // pushed the next context provider, and now need to merge their contexts.
    var previousContext = emptyObject;

    function getUnmaskedContext(workInProgress) {
      var hasOwnContext = isContextProvider(workInProgress);
      if (hasOwnContext) {
        // If the fiber is a context provider itself, when we read its context
        // we have already pushed its own child context on the stack. A context
        // provider should not "see" its own child context. Therefore we read the
        // previous (parent) context instead for a context provider.
        return previousContext;
      }
      return contextStackCursor.current;
    }

    function cacheContext(workInProgress, unmaskedContext, maskedContext) {
      var instance = workInProgress.stateNode;
      instance.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext;
      instance.__reactInternalMemoizedMaskedChildContext = maskedContext;
    }

    function getMaskedContext(workInProgress, unmaskedContext) {
      var type = workInProgress.type;
      var contextTypes = type.contextTypes;
      if (!contextTypes) {
        return emptyObject;
      }

      // Avoid recreating masked context unless unmasked context has changed.
      // Failing to do this will result in unnecessary calls to componentWillReceiveProps.
      // This may trigger infinite loops if componentWillReceiveProps calls setState.
      var instance = workInProgress.stateNode;
      if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) {
        return instance.__reactInternalMemoizedMaskedChildContext;
      }

      var context = {};
      for (var key in contextTypes) {
        context[key] = unmaskedContext[key];
      }

      {
        var name = getComponentName(workInProgress) || 'Unknown';
        checkPropTypes(contextTypes, context, 'context', name, ReactDebugCurrentFiber.getCurrentFiberStackAddendum);
      }

      // Cache unmasked context so we can avoid recreating masked context unless necessary.
      // Context is created before the class component is instantiated so check for instance.
      if (instance) {
        cacheContext(workInProgress, unmaskedContext, context);
      }

      return context;
    }

    function hasContextChanged() {
      return didPerformWorkStackCursor.current;
    }

    function isContextConsumer(fiber) {
      return fiber.tag === ClassComponent && fiber.type.contextTypes != null;
    }

    function isContextProvider(fiber) {
      return fiber.tag === ClassComponent && fiber.type.childContextTypes != null;
    }

    function popContextProvider(fiber) {
      if (!isContextProvider(fiber)) {
        return;
      }

      pop(didPerformWorkStackCursor, fiber);
      pop(contextStackCursor, fiber);
    }

    function popTopLevelContextObject(fiber) {
      pop(didPerformWorkStackCursor, fiber);
      pop(contextStackCursor, fiber);
    }

    function pushTopLevelContextObject(fiber, context, didChange) {
      !(contextStackCursor.cursor == null) ? invariant(false, 'Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.') : void 0;

      push(contextStackCursor, context, fiber);
      push(didPerformWorkStackCursor, didChange, fiber);
    }

    function processChildContext(fiber, parentContext) {
      var instance = fiber.stateNode;
      var childContextTypes = fiber.type.childContextTypes;

      // TODO (bvaughn) Replace this behavior with an invariant() in the future.
      // It has only been added in Fiber to match the (unintentional) behavior in Stack.
      if (typeof instance.getChildContext !== 'function') {
        {
          var componentName = getComponentName(fiber) || 'Unknown';

          if (!warnedAboutMissingGetChildContext[componentName]) {
            warnedAboutMissingGetChildContext[componentName] = true;
            warning(false, '%s.childContextTypes is specified but there is no getChildContext() method ' + 'on the instance. You can either define getChildContext() on %s or remove ' + 'childContextTypes from it.', componentName, componentName);
          }
        }
        return parentContext;
      }

      var childContext = void 0;
      {
        ReactDebugCurrentFiber.setCurrentPhase('getChildContext');
      }
      startPhaseTimer(fiber, 'getChildContext');
      childContext = instance.getChildContext();
      stopPhaseTimer();
      {
        ReactDebugCurrentFiber.setCurrentPhase(null);
      }
      for (var contextKey in childContext) {
        !(contextKey in childContextTypes) ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', getComponentName(fiber) || 'Unknown', contextKey) : void 0;
      }
      {
        var name = getComponentName(fiber) || 'Unknown';
        checkPropTypes(childContextTypes, childContext, 'child context', name,
        // In practice, there is one case in which we won't get a stack. It's when
        // somebody calls unstable_renderSubtreeIntoContainer() and we process
        // context from the parent component instance. The stack will be missing
        // because it's outside of the reconciliation, and so the pointer has not
        // been set. This is rare and doesn't matter. We'll also remove that API.
        ReactDebugCurrentFiber.getCurrentFiberStackAddendum);
      }

      return _assign({}, parentContext, childContext);
    }

    function pushContextProvider(workInProgress) {
      if (!isContextProvider(workInProgress)) {
        return false;
      }

      var instance = workInProgress.stateNode;
      // We push the context as early as possible to ensure stack integrity.
      // If the instance does not exist yet, we will push null at first,
      // and replace it on the stack later when invalidating the context.
      var memoizedMergedChildContext = instance && instance.__reactInternalMemoizedMergedChildContext || emptyObject;

      // Remember the parent context so we can merge with it later.
      // Inherit the parent's did-perform-work value to avoid inadvertently blocking updates.
      previousContext = contextStackCursor.current;
      push(contextStackCursor, memoizedMergedChildContext, workInProgress);
      push(didPerformWorkStackCursor, didPerformWorkStackCursor.current, workInProgress);

      return true;
    }

    function invalidateContextProvider(workInProgress, didChange) {
      var instance = workInProgress.stateNode;
      !instance ? invariant(false, 'Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.') : void 0;

      if (didChange) {
        // Merge parent and own context.
        // Skip this if we're not updating due to sCU.
        // This avoids unnecessarily recomputing memoized values.
        var mergedContext = processChildContext(workInProgress, previousContext);
        instance.__reactInternalMemoizedMergedChildContext = mergedContext;

        // Replace the old (or empty) context with the new one.
        // It is important to unwind the context in the reverse order.
        pop(didPerformWorkStackCursor, workInProgress);
        pop(contextStackCursor, workInProgress);
        // Now push the new context and mark that it has changed.
        push(contextStackCursor, mergedContext, workInProgress);
        push(didPerformWorkStackCursor, didChange, workInProgress);
      } else {
        pop(didPerformWorkStackCursor, workInProgress);
        push(didPerformWorkStackCursor, didChange, workInProgress);
      }
    }

    function resetContext() {
      previousContext = emptyObject;
      contextStackCursor.current = emptyObject;
      didPerformWorkStackCursor.current = false;
    }

    function findCurrentUnmaskedContext(fiber) {
      // Currently this is only used with renderSubtreeIntoContainer; not sure if it
      // makes sense elsewhere
      !(isFiberMounted(fiber) && fiber.tag === ClassComponent) ? invariant(false, 'Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.') : void 0;

      var node = fiber;
      while (node.tag !== HostRoot) {
        if (isContextProvider(node)) {
          return node.stateNode.__reactInternalMemoizedMergedChildContext;
        }
        var parent = node['return'];
        !parent ? invariant(false, 'Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        node = parent;
      }
      return node.stateNode.context;
    }

    var NoWork = 0; // TODO: Use an opaque type once ESLint et al support the syntax

    var Sync = 1;
    var Never = 2147483647; // Max int32: Math.pow(2, 31) - 1

    var UNIT_SIZE = 10;
    var MAGIC_NUMBER_OFFSET = 2;

    // 1 unit of expiration time represents 10ms.
    function msToExpirationTime(ms) {
      // Always add an offset so that we don't clash with the magic number for NoWork.
      return (ms / UNIT_SIZE | 0) + MAGIC_NUMBER_OFFSET;
    }

    function expirationTimeToMs(expirationTime) {
      return (expirationTime - MAGIC_NUMBER_OFFSET) * UNIT_SIZE;
    }

    function ceiling(num, precision) {
      return ((num / precision | 0) + 1) * precision;
    }

    function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
      return ceiling(currentTime + expirationInMs / UNIT_SIZE, bucketSizeMs / UNIT_SIZE);
    }

    var NoContext = 0;
    var AsyncUpdates = 1;

    {
      var hasBadMapPolyfill = false;
      try {
        var nonExtensibleObject = Object.preventExtensions({});
        /* eslint-disable no-new */

        /* eslint-enable no-new */
      } catch (e) {
        // TODO: Consider warning about bad polyfills
        hasBadMapPolyfill = true;
      }
    }

    // A Fiber is work on a Component that needs to be done or was done. There can
    // be more than one per component.


    {
      var debugCounter = 1;
    }

    function FiberNode(tag, key, internalContextTag) {
      // Instance
      this.tag = tag;
      this.key = key;
      this.type = null;
      this.stateNode = null;

      // Fiber
      this['return'] = null;
      this.child = null;
      this.sibling = null;
      this.index = 0;

      this.ref = null;

      this.pendingProps = null;
      this.memoizedProps = null;
      this.updateQueue = null;
      this.memoizedState = null;

      this.internalContextTag = internalContextTag;

      // Effects
      this.effectTag = NoEffect;
      this.nextEffect = null;

      this.firstEffect = null;
      this.lastEffect = null;

      this.expirationTime = NoWork;

      this.alternate = null;

      {
        this._debugID = debugCounter++;
        this._debugSource = null;
        this._debugOwner = null;
        this._debugIsCurrentlyTiming = false;
        if (!hasBadMapPolyfill && typeof Object.preventExtensions === 'function') {
          Object.preventExtensions(this);
        }
      }
    }

    // This is a constructor function, rather than a POJO constructor, still
    // please ensure we do the following:
    // 1) Nobody should add any instance methods on this. Instance methods can be
    //    more difficult to predict when they get optimized and they are almost
    //    never inlined properly in static compilers.
    // 2) Nobody should rely on `instanceof Fiber` for type testing. We should
    //    always know when it is a fiber.
    // 3) We might want to experiment with using numeric keys since they are easier
    //    to optimize in a non-JIT environment.
    // 4) We can easily go from a constructor to a createFiber object literal if that
    //    is faster.
    // 5) It should be easy to port this to a C struct and keep a C implementation
    //    compatible.
    var createFiber = function createFiber(tag, key, internalContextTag) {
      // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
      return new FiberNode(tag, key, internalContextTag);
    };

    function shouldConstruct(Component) {
      return !!(Component.prototype && Component.prototype.isReactComponent);
    }

    // This is used to create an alternate fiber to do work on.
    function createWorkInProgress(current, pendingProps, expirationTime) {
      var workInProgress = current.alternate;
      if (workInProgress === null) {
        // We use a double buffering pooling technique because we know that we'll
        // only ever need at most two versions of a tree. We pool the "other" unused
        // node that we're free to reuse. This is lazily created to avoid allocating
        // extra objects for things that are never updated. It also allow us to
        // reclaim the extra memory if needed.
        workInProgress = createFiber(current.tag, current.key, current.internalContextTag);
        workInProgress.type = current.type;
        workInProgress.stateNode = current.stateNode;

        {
          // DEV-only fields
          workInProgress._debugID = current._debugID;
          workInProgress._debugSource = current._debugSource;
          workInProgress._debugOwner = current._debugOwner;
        }

        workInProgress.alternate = current;
        current.alternate = workInProgress;
      } else {
        // We already have an alternate.
        // Reset the effect tag.
        workInProgress.effectTag = NoEffect;

        // The effect list is no longer valid.
        workInProgress.nextEffect = null;
        workInProgress.firstEffect = null;
        workInProgress.lastEffect = null;
      }

      workInProgress.expirationTime = expirationTime;
      workInProgress.pendingProps = pendingProps;

      workInProgress.child = current.child;
      workInProgress.memoizedProps = current.memoizedProps;
      workInProgress.memoizedState = current.memoizedState;
      workInProgress.updateQueue = current.updateQueue;

      // These will be overridden during the parent's reconciliation
      workInProgress.sibling = current.sibling;
      workInProgress.index = current.index;
      workInProgress.ref = current.ref;

      return workInProgress;
    }

    function createHostRootFiber() {
      var fiber = createFiber(HostRoot, null, NoContext);
      return fiber;
    }

    function createFiberFromElement(element, internalContextTag, expirationTime) {
      var owner = null;
      {
        owner = element._owner;
      }

      var fiber = void 0;
      var type = element.type,
          key = element.key;

      if (typeof type === 'function') {
        fiber = shouldConstruct(type) ? createFiber(ClassComponent, key, internalContextTag) : createFiber(IndeterminateComponent, key, internalContextTag);
        fiber.type = type;
        fiber.pendingProps = element.props;
      } else if (typeof type === 'string') {
        fiber = createFiber(HostComponent, key, internalContextTag);
        fiber.type = type;
        fiber.pendingProps = element.props;
      } else if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && typeof type.tag === 'number') {
        // Currently assumed to be a continuation and therefore is a fiber already.
        // TODO: The yield system is currently broken for updates in some cases.
        // The reified yield stores a fiber, but we don't know which fiber that is;
        // the current or a workInProgress? When the continuation gets rendered here
        // we don't know if we can reuse that fiber or if we need to clone it.
        // There is probably a clever way to restructure this.
        fiber = type;
        fiber.pendingProps = element.props;
      } else {
        var info = '';
        {
          if (type === undefined || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && Object.keys(type).length === 0) {
            info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
          }
          var ownerName = owner ? getComponentName(owner) : null;
          if (ownerName) {
            info += '\n\nCheck the render method of `' + ownerName + '`.';
          }
        }
        invariant(false, 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s', type == null ? type : typeof type === 'undefined' ? 'undefined' : _typeof(type), info);
      }

      {
        fiber._debugSource = element._source;
        fiber._debugOwner = element._owner;
      }

      fiber.expirationTime = expirationTime;

      return fiber;
    }

    function createFiberFromFragment(elements, internalContextTag, expirationTime, key) {
      var fiber = createFiber(Fragment, key, internalContextTag);
      fiber.pendingProps = elements;
      fiber.expirationTime = expirationTime;
      return fiber;
    }

    function createFiberFromText(content, internalContextTag, expirationTime) {
      var fiber = createFiber(HostText, null, internalContextTag);
      fiber.pendingProps = content;
      fiber.expirationTime = expirationTime;
      return fiber;
    }

    function createFiberFromHostInstanceForDeletion() {
      var fiber = createFiber(HostComponent, null, NoContext);
      fiber.type = 'DELETED';
      return fiber;
    }

    function createFiberFromCall(call, internalContextTag, expirationTime) {
      var fiber = createFiber(CallComponent, call.key, internalContextTag);
      fiber.type = call.handler;
      fiber.pendingProps = call;
      fiber.expirationTime = expirationTime;
      return fiber;
    }

    function createFiberFromReturn(returnNode, internalContextTag, expirationTime) {
      var fiber = createFiber(ReturnComponent, null, internalContextTag);
      fiber.expirationTime = expirationTime;
      return fiber;
    }

    function createFiberFromPortal(portal, internalContextTag, expirationTime) {
      var fiber = createFiber(HostPortal, portal.key, internalContextTag);
      fiber.pendingProps = portal.children || [];
      fiber.expirationTime = expirationTime;
      fiber.stateNode = {
        containerInfo: portal.containerInfo,
        pendingChildren: null, // Used by persistent updates
        implementation: portal.implementation
      };
      return fiber;
    }

    function createFiberRoot(containerInfo, hydrate) {
      // Cyclic construction. This cheats the type system right now because
      // stateNode is any.
      var uninitializedFiber = createHostRootFiber();
      var root = {
        current: uninitializedFiber,
        containerInfo: containerInfo,
        pendingChildren: null,
        remainingExpirationTime: NoWork,
        isReadyForCommit: false,
        finishedWork: null,
        context: null,
        pendingContext: null,
        hydrate: hydrate,
        nextScheduledRoot: null
      };
      uninitializedFiber.stateNode = root;
      return root;
    }

    var onCommitFiberRoot = null;
    var onCommitFiberUnmount = null;
    var hasLoggedError = false;

    function catchErrors(fn) {
      return function (arg) {
        try {
          return fn(arg);
        } catch (err) {
          if (true && !hasLoggedError) {
            hasLoggedError = true;
            warning(false, 'React DevTools encountered an error: %s', err);
          }
        }
      };
    }

    function injectInternals(internals) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
        // No DevTools
        return false;
      }
      var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (hook.isDisabled) {
        // This isn't a real property on the hook, but it can be set to opt out
        // of DevTools integration and associated warnings and logs.
        // https://github.com/facebook/react/issues/3877
        return true;
      }
      if (!hook.supportsFiber) {
        {
          warning(false, 'The installed version of React DevTools is too old and will not work ' + 'with the current version of React. Please update React DevTools. ' + 'https://fb.me/react-devtools');
        }
        // DevTools exists, even though it doesn't support Fiber.
        return true;
      }
      try {
        var rendererID = hook.inject(internals);
        // We have successfully injected, so now it is safe to set up hooks.
        onCommitFiberRoot = catchErrors(function (root) {
          return hook.onCommitFiberRoot(rendererID, root);
        });
        onCommitFiberUnmount = catchErrors(function (fiber) {
          return hook.onCommitFiberUnmount(rendererID, fiber);
        });
      } catch (err) {
        // Catch all errors because it is unsafe to throw during initialization.
        {
          warning(false, 'React DevTools encountered an error: %s.', err);
        }
      }
      // DevTools exists
      return true;
    }

    function onCommitRoot(root) {
      if (typeof onCommitFiberRoot === 'function') {
        onCommitFiberRoot(root);
      }
    }

    function onCommitUnmount(fiber) {
      if (typeof onCommitFiberUnmount === 'function') {
        onCommitFiberUnmount(fiber);
      }
    }

    var ReactErrorUtils = {
      // Used by Fiber to simulate a try-catch.
      _caughtError: null,
      _hasCaughtError: false,

      // Used by event system to capture/rethrow the first error.
      _rethrowError: null,
      _hasRethrowError: false,

      injection: {
        injectErrorUtils: function injectErrorUtils(injectedErrorUtils) {
          !(typeof injectedErrorUtils.invokeGuardedCallback === 'function') ? invariant(false, 'Injected invokeGuardedCallback() must be a function.') : void 0;
          invokeGuardedCallback$1 = injectedErrorUtils.invokeGuardedCallback;
        }
      },

      /**
       * Call a function while guarding against errors that happens within it.
       * Returns an error if it throws, otherwise null.
       *
       * In production, this is implemented using a try-catch. The reason we don't
       * use a try-catch directly is so that we can swap out a different
       * implementation in DEV mode.
       *
       * @param {String} name of the guard to use for logging or debugging
       * @param {Function} func The function to invoke
       * @param {*} context The context to use when calling the function
       * @param {...*} args Arguments for function
       */
      invokeGuardedCallback: function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
        invokeGuardedCallback$1.apply(ReactErrorUtils, arguments);
      },

      /**
       * Same as invokeGuardedCallback, but instead of returning an error, it stores
       * it in a global so it can be rethrown by `rethrowCaughtError` later.
       * TODO: See if _caughtError and _rethrowError can be unified.
       *
       * @param {String} name of the guard to use for logging or debugging
       * @param {Function} func The function to invoke
       * @param {*} context The context to use when calling the function
       * @param {...*} args Arguments for function
       */
      invokeGuardedCallbackAndCatchFirstError: function invokeGuardedCallbackAndCatchFirstError(name, func, context, a, b, c, d, e, f) {
        ReactErrorUtils.invokeGuardedCallback.apply(this, arguments);
        if (ReactErrorUtils.hasCaughtError()) {
          var error = ReactErrorUtils.clearCaughtError();
          if (!ReactErrorUtils._hasRethrowError) {
            ReactErrorUtils._hasRethrowError = true;
            ReactErrorUtils._rethrowError = error;
          }
        }
      },

      /**
       * During execution of guarded functions we will capture the first error which
       * we will rethrow to be handled by the top level error handler.
       */
      rethrowCaughtError: function rethrowCaughtError() {
        return _rethrowCaughtError.apply(ReactErrorUtils, arguments);
      },

      hasCaughtError: function hasCaughtError() {
        return ReactErrorUtils._hasCaughtError;
      },

      clearCaughtError: function clearCaughtError() {
        if (ReactErrorUtils._hasCaughtError) {
          var error = ReactErrorUtils._caughtError;
          ReactErrorUtils._caughtError = null;
          ReactErrorUtils._hasCaughtError = false;
          return error;
        } else {
          invariant(false, 'clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.');
        }
      }
    };

    var invokeGuardedCallback$1 = function invokeGuardedCallback$1(name, func, context, a, b, c, d, e, f) {
      ReactErrorUtils._hasCaughtError = false;
      ReactErrorUtils._caughtError = null;
      var funcArgs = Array.prototype.slice.call(arguments, 3);
      try {
        func.apply(context, funcArgs);
      } catch (error) {
        ReactErrorUtils._caughtError = error;
        ReactErrorUtils._hasCaughtError = true;
      }
    };

    {
      // In DEV mode, we swap out invokeGuardedCallback for a special version
      // that plays more nicely with the browser's DevTools. The idea is to preserve
      // "Pause on exceptions" behavior. Because React wraps all user-provided
      // functions in invokeGuardedCallback, and the production version of
      // invokeGuardedCallback uses a try-catch, all user exceptions are treated
      // like caught exceptions, and the DevTools won't pause unless the developer
      // takes the extra step of enabling pause on caught exceptions. This is
      // untintuitive, though, because even though React has caught the error, from
      // the developer's perspective, the error is uncaught.
      //
      // To preserve the expected "Pause on exceptions" behavior, we don't use a
      // try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
      // DOM node, and call the user-provided callback from inside an event handler
      // for that fake event. If the callback throws, the error is "captured" using
      // a global event handler. But because the error happens in a different
      // event loop context, it does not interrupt the normal program flow.
      // Effectively, this gives us try-catch behavior without actually using
      // try-catch. Neat!

      // Check that the browser supports the APIs we need to implement our special
      // DEV version of invokeGuardedCallback
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
        var fakeNode = document.createElement('react');

        var invokeGuardedCallbackDev = function invokeGuardedCallbackDev(name, func, context, a, b, c, d, e, f) {
          // Keeps track of whether the user-provided callback threw an error. We
          // set this to true at the beginning, then set it to false right after
          // calling the function. If the function errors, `didError` will never be
          // set to false. This strategy works even if the browser is flaky and
          // fails to call our global error handler, because it doesn't rely on
          // the error event at all.
          var didError = true;

          // Create an event handler for our fake event. We will synchronously
          // dispatch our fake event using `dispatchEvent`. Inside the handler, we
          // call the user-provided callback.
          var funcArgs = Array.prototype.slice.call(arguments, 3);
          function callCallback() {
            // We immediately remove the callback from event listeners so that
            // nested `invokeGuardedCallback` calls do not clash. Otherwise, a
            // nested call would trigger the fake event handlers of any call higher
            // in the stack.
            fakeNode.removeEventListener(evtType, callCallback, false);
            func.apply(context, funcArgs);
            didError = false;
          }

          // Create a global error event handler. We use this to capture the value
          // that was thrown. It's possible that this error handler will fire more
          // than once; for example, if non-React code also calls `dispatchEvent`
          // and a handler for that event throws. We should be resilient to most of
          // those cases. Even if our error event handler fires more than once, the
          // last error event is always used. If the callback actually does error,
          // we know that the last error event is the correct one, because it's not
          // possible for anything else to have happened in between our callback
          // erroring and the code that follows the `dispatchEvent` call below. If
          // the callback doesn't error, but the error event was fired, we know to
          // ignore it because `didError` will be false, as described above.
          var error = void 0;
          // Use this to track whether the error event is ever called.
          var didSetError = false;
          var isCrossOriginError = false;

          function onError(event) {
            error = event.error;
            didSetError = true;
            if (error === null && event.colno === 0 && event.lineno === 0) {
              isCrossOriginError = true;
            }
          }

          // Create a fake event type.
          var evtType = 'react-' + (name ? name : 'invokeguardedcallback');

          // Attach our event handlers
          window.addEventListener('error', onError);
          fakeNode.addEventListener(evtType, callCallback, false);

          // Synchronously dispatch our fake event. If the user-provided function
          // errors, it will trigger our global error handler.
          var evt = document.createEvent('Event');
          evt.initEvent(evtType, false, false);
          fakeNode.dispatchEvent(evt);

          if (didError) {
            if (!didSetError) {
              // The callback errored, but the error event never fired.
              error = new Error('An error was thrown inside one of your components, but React ' + "doesn't know what it was. This is likely due to browser " + 'flakiness. React does its best to preserve the "Pause on ' + 'exceptions" behavior of the DevTools, which requires some ' + "DEV-mode only tricks. It's possible that these don't work in " + 'your browser. Try triggering the error in production mode, ' + 'or switching to a modern browser. If you suspect that this is ' + 'actually an issue with React, please file an issue.');
            } else if (isCrossOriginError) {
              error = new Error("A cross-origin error was thrown. React doesn't have access to " + 'the actual error object in development. ' + 'See https://fb.me/react-crossorigin-error for more information.');
            }
            ReactErrorUtils._hasCaughtError = true;
            ReactErrorUtils._caughtError = error;
          } else {
            ReactErrorUtils._hasCaughtError = false;
            ReactErrorUtils._caughtError = null;
          }

          // Remove our event listeners
          window.removeEventListener('error', onError);
        };

        invokeGuardedCallback$1 = invokeGuardedCallbackDev;
      }
    }

    var _rethrowCaughtError = function _rethrowCaughtError() {
      if (ReactErrorUtils._hasRethrowError) {
        var error = ReactErrorUtils._rethrowError;
        ReactErrorUtils._rethrowError = null;
        ReactErrorUtils._hasRethrowError = false;
        throw error;
      }
    };

    {
      var didWarnUpdateInsideUpdate = false;
    }

    // Callbacks are not validated until invocation


    // Singly linked-list of updates. When an update is scheduled, it is added to
    // the queue of the current fiber and the work-in-progress fiber. The two queues
    // are separate but they share a persistent structure.
    //
    // During reconciliation, updates are removed from the work-in-progress fiber,
    // but they remain on the current fiber. That ensures that if a work-in-progress
    // is aborted, the aborted updates are recovered by cloning from current.
    //
    // The work-in-progress queue is always a subset of the current queue.
    //
    // When the tree is committed, the work-in-progress becomes the current.


    function createUpdateQueue(baseState) {
      var queue = {
        baseState: baseState,
        expirationTime: NoWork,
        first: null,
        last: null,
        callbackList: null,
        hasForceUpdate: false,
        isInitialized: false
      };
      {
        queue.isProcessing = false;
      }
      return queue;
    }

    function insertUpdateIntoQueue(queue, update) {
      // Append the update to the end of the list.
      if (queue.last === null) {
        // Queue is empty
        queue.first = queue.last = update;
      } else {
        queue.last.next = update;
        queue.last = update;
      }
      if (queue.expirationTime === NoWork || queue.expirationTime > update.expirationTime) {
        queue.expirationTime = update.expirationTime;
      }
    }

    function insertUpdateIntoFiber(fiber, update) {
      // We'll have at least one and at most two distinct update queues.
      var alternateFiber = fiber.alternate;
      var queue1 = fiber.updateQueue;
      if (queue1 === null) {
        // TODO: We don't know what the base state will be until we begin work.
        // It depends on which fiber is the next current. Initialize with an empty
        // base state, then set to the memoizedState when rendering. Not super
        // happy with this approach.
        queue1 = fiber.updateQueue = createUpdateQueue(null);
      }

      var queue2 = void 0;
      if (alternateFiber !== null) {
        queue2 = alternateFiber.updateQueue;
        if (queue2 === null) {
          queue2 = alternateFiber.updateQueue = createUpdateQueue(null);
        }
      } else {
        queue2 = null;
      }
      queue2 = queue2 !== queue1 ? queue2 : null;

      // Warn if an update is scheduled from inside an updater function.
      {
        if ((queue1.isProcessing || queue2 !== null && queue2.isProcessing) && !didWarnUpdateInsideUpdate) {
          warning(false, 'An update (setState, replaceState, or forceUpdate) was scheduled ' + 'from inside an update function. Update functions should be pure, ' + 'with zero side-effects. Consider using componentDidUpdate or a ' + 'callback.');
          didWarnUpdateInsideUpdate = true;
        }
      }

      // If there's only one queue, add the update to that queue and exit.
      if (queue2 === null) {
        insertUpdateIntoQueue(queue1, update);
        return;
      }

      // If either queue is empty, we need to add to both queues.
      if (queue1.last === null || queue2.last === null) {
        insertUpdateIntoQueue(queue1, update);
        insertUpdateIntoQueue(queue2, update);
        return;
      }

      // If both lists are not empty, the last update is the same for both lists
      // because of structural sharing. So, we should only append to one of
      // the lists.
      insertUpdateIntoQueue(queue1, update);
      // But we still need to update the `last` pointer of queue2.
      queue2.last = update;
    }

    function getUpdateExpirationTime(fiber) {
      if (fiber.tag !== ClassComponent && fiber.tag !== HostRoot) {
        return NoWork;
      }
      var updateQueue = fiber.updateQueue;
      if (updateQueue === null) {
        return NoWork;
      }
      return updateQueue.expirationTime;
    }

    function getStateFromUpdate(update, instance, prevState, props) {
      var partialState = update.partialState;
      if (typeof partialState === 'function') {
        var updateFn = partialState;

        // Invoke setState callback an extra time to help detect side-effects.
        if (debugRenderPhaseSideEffects) {
          updateFn.call(instance, prevState, props);
        }

        return updateFn.call(instance, prevState, props);
      } else {
        return partialState;
      }
    }

    function processUpdateQueue(current, workInProgress, queue, instance, props, renderExpirationTime) {
      if (current !== null && current.updateQueue === queue) {
        // We need to create a work-in-progress queue, by cloning the current queue.
        var currentQueue = queue;
        queue = workInProgress.updateQueue = {
          baseState: currentQueue.baseState,
          expirationTime: currentQueue.expirationTime,
          first: currentQueue.first,
          last: currentQueue.last,
          isInitialized: currentQueue.isInitialized,
          // These fields are no longer valid because they were already committed.
          // Reset them.
          callbackList: null,
          hasForceUpdate: false
        };
      }

      {
        // Set this flag so we can warn if setState is called inside the update
        // function of another setState.
        queue.isProcessing = true;
      }

      // Reset the remaining expiration time. If we skip over any updates, we'll
      // increase this accordingly.
      queue.expirationTime = NoWork;

      // TODO: We don't know what the base state will be until we begin work.
      // It depends on which fiber is the next current. Initialize with an empty
      // base state, then set to the memoizedState when rendering. Not super
      // happy with this approach.
      var state = void 0;
      if (queue.isInitialized) {
        state = queue.baseState;
      } else {
        state = queue.baseState = workInProgress.memoizedState;
        queue.isInitialized = true;
      }
      var dontMutatePrevState = true;
      var update = queue.first;
      var didSkip = false;
      while (update !== null) {
        var updateExpirationTime = update.expirationTime;
        if (updateExpirationTime > renderExpirationTime) {
          // This update does not have sufficient priority. Skip it.
          var remainingExpirationTime = queue.expirationTime;
          if (remainingExpirationTime === NoWork || remainingExpirationTime > updateExpirationTime) {
            // Update the remaining expiration time.
            queue.expirationTime = updateExpirationTime;
          }
          if (!didSkip) {
            didSkip = true;
            queue.baseState = state;
          }
          // Continue to the next update.
          update = update.next;
          continue;
        }

        // This update does have sufficient priority.

        // If no previous updates were skipped, drop this update from the queue by
        // advancing the head of the list.
        if (!didSkip) {
          queue.first = update.next;
          if (queue.first === null) {
            queue.last = null;
          }
        }

        // Process the update
        var _partialState = void 0;
        if (update.isReplace) {
          state = getStateFromUpdate(update, instance, state, props);
          dontMutatePrevState = true;
        } else {
          _partialState = getStateFromUpdate(update, instance, state, props);
          if (_partialState) {
            if (dontMutatePrevState) {
              // $FlowFixMe: Idk how to type this properly.
              state = _assign({}, state, _partialState);
            } else {
              state = _assign(state, _partialState);
            }
            dontMutatePrevState = false;
          }
        }
        if (update.isForced) {
          queue.hasForceUpdate = true;
        }
        if (update.callback !== null) {
          // Append to list of callbacks.
          var _callbackList = queue.callbackList;
          if (_callbackList === null) {
            _callbackList = queue.callbackList = [];
          }
          _callbackList.push(update);
        }
        update = update.next;
      }

      if (queue.callbackList !== null) {
        workInProgress.effectTag |= Callback;
      } else if (queue.first === null && !queue.hasForceUpdate) {
        // The queue is empty. We can reset it.
        workInProgress.updateQueue = null;
      }

      if (!didSkip) {
        didSkip = true;
        queue.baseState = state;
      }

      {
        // No longer processing.
        queue.isProcessing = false;
      }

      return state;
    }

    function commitCallbacks(queue, context) {
      var callbackList = queue.callbackList;
      if (callbackList === null) {
        return;
      }
      // Set the list to null to make sure they don't get called more than once.
      queue.callbackList = null;
      for (var i = 0; i < callbackList.length; i++) {
        var update = callbackList[i];
        var _callback = update.callback;
        // This update might be processed again. Clear the callback so it's only
        // called once.
        update.callback = null;
        !(typeof _callback === 'function') ? invariant(false, 'Invalid argument passed as callback. Expected a function. Instead received: %s', _callback) : void 0;
        _callback.call(context);
      }
    }

    var fakeInternalInstance = {};
    var isArray = Array.isArray;

    {
      var didWarnAboutStateAssignmentForComponent = {};

      var warnOnInvalidCallback = function warnOnInvalidCallback(callback, callerName) {
        warning(callback === null || typeof callback === 'function', '%s(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callerName, callback);
      };

      // This is so gross but it's at least non-critical and can be removed if
      // it causes problems. This is meant to give a nicer error message for
      // ReactDOM15.unstable_renderSubtreeIntoContainer(reactDOM16Component,
      // ...)) which otherwise throws a "_processChildContext is not a function"
      // exception.
      Object.defineProperty(fakeInternalInstance, '_processChildContext', {
        enumerable: false,
        value: function value() {
          invariant(false, '_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn\'t supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).');
        }
      });
      Object.freeze(fakeInternalInstance);
    }

    var ReactFiberClassComponent = function ReactFiberClassComponent(scheduleWork, computeExpirationForFiber, memoizeProps, memoizeState) {
      // Class component state updater
      var updater = {
        isMounted: isMounted,
        enqueueSetState: function enqueueSetState(instance, partialState, callback) {
          var fiber = get(instance);
          callback = callback === undefined ? null : callback;
          {
            warnOnInvalidCallback(callback, 'setState');
          }
          var expirationTime = computeExpirationForFiber(fiber);
          var update = {
            expirationTime: expirationTime,
            partialState: partialState,
            callback: callback,
            isReplace: false,
            isForced: false,
            nextCallback: null,
            next: null
          };
          insertUpdateIntoFiber(fiber, update);
          scheduleWork(fiber, expirationTime);
        },
        enqueueReplaceState: function enqueueReplaceState(instance, state, callback) {
          var fiber = get(instance);
          callback = callback === undefined ? null : callback;
          {
            warnOnInvalidCallback(callback, 'replaceState');
          }
          var expirationTime = computeExpirationForFiber(fiber);
          var update = {
            expirationTime: expirationTime,
            partialState: state,
            callback: callback,
            isReplace: true,
            isForced: false,
            nextCallback: null,
            next: null
          };
          insertUpdateIntoFiber(fiber, update);
          scheduleWork(fiber, expirationTime);
        },
        enqueueForceUpdate: function enqueueForceUpdate(instance, callback) {
          var fiber = get(instance);
          callback = callback === undefined ? null : callback;
          {
            warnOnInvalidCallback(callback, 'forceUpdate');
          }
          var expirationTime = computeExpirationForFiber(fiber);
          var update = {
            expirationTime: expirationTime,
            partialState: null,
            callback: callback,
            isReplace: false,
            isForced: true,
            nextCallback: null,
            next: null
          };
          insertUpdateIntoFiber(fiber, update);
          scheduleWork(fiber, expirationTime);
        }
      };

      function checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext) {
        if (oldProps === null || workInProgress.updateQueue !== null && workInProgress.updateQueue.hasForceUpdate) {
          // If the workInProgress already has an Update effect, return true
          return true;
        }

        var instance = workInProgress.stateNode;
        var type = workInProgress.type;
        if (typeof instance.shouldComponentUpdate === 'function') {
          startPhaseTimer(workInProgress, 'shouldComponentUpdate');
          var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, newContext);
          stopPhaseTimer();

          // Simulate an async bailout/interruption by invoking lifecycle twice.
          if (debugRenderPhaseSideEffects) {
            instance.shouldComponentUpdate(newProps, newState, newContext);
          }

          {
            warning(shouldUpdate !== undefined, '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', getComponentName(workInProgress) || 'Unknown');
          }

          return shouldUpdate;
        }

        if (type.prototype && type.prototype.isPureReactComponent) {
          return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
        }

        return true;
      }

      function checkClassInstance(workInProgress) {
        var instance = workInProgress.stateNode;
        var type = workInProgress.type;
        {
          var name = getComponentName(workInProgress);
          var renderPresent = instance.render;

          if (!renderPresent) {
            if (type.prototype && typeof type.prototype.render === 'function') {
              warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: did you accidentally return an object from the constructor?', name);
            } else {
              warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`.', name);
            }
          }

          var noGetInitialStateOnES6 = !instance.getInitialState || instance.getInitialState.isReactClassApproved || instance.state;
          warning(noGetInitialStateOnES6, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', name);
          var noGetDefaultPropsOnES6 = !instance.getDefaultProps || instance.getDefaultProps.isReactClassApproved;
          warning(noGetDefaultPropsOnES6, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', name);
          var noInstancePropTypes = !instance.propTypes;
          warning(noInstancePropTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', name);
          var noInstanceContextTypes = !instance.contextTypes;
          warning(noInstanceContextTypes, 'contextTypes was defined as an instance property on %s. Use a static ' + 'property to define contextTypes instead.', name);
          var noComponentShouldUpdate = typeof instance.componentShouldUpdate !== 'function';
          warning(noComponentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', name);
          if (type.prototype && type.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== 'undefined') {
            warning(false, '%s has a method called shouldComponentUpdate(). ' + 'shouldComponentUpdate should not be used when extending React.PureComponent. ' + 'Please extend React.Component if shouldComponentUpdate is used.', getComponentName(workInProgress) || 'A pure component');
          }
          var noComponentDidUnmount = typeof instance.componentDidUnmount !== 'function';
          warning(noComponentDidUnmount, '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', name);
          var noComponentDidReceiveProps = typeof instance.componentDidReceiveProps !== 'function';
          warning(noComponentDidReceiveProps, '%s has a method called ' + 'componentDidReceiveProps(). But there is no such lifecycle method. ' + 'If you meant to update the state in response to changing props, ' + 'use componentWillReceiveProps(). If you meant to fetch data or ' + 'run side-effects or mutations after React has updated the UI, use componentDidUpdate().', name);
          var noComponentWillRecieveProps = typeof instance.componentWillRecieveProps !== 'function';
          warning(noComponentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', name);
          var hasMutatedProps = instance.props !== workInProgress.pendingProps;
          warning(instance.props === undefined || !hasMutatedProps, '%s(...): When calling super() in `%s`, make sure to pass ' + "up the same props that your component's constructor was passed.", name, name);
          var noInstanceDefaultProps = !instance.defaultProps;
          warning(noInstanceDefaultProps, 'Setting defaultProps as an instance property on %s is not supported and will be ignored.' + ' Instead, define defaultProps as a static property on %s.', name, name);
        }

        var state = instance.state;
        if (state && ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) !== 'object' || isArray(state))) {
          warning(false, '%s.state: must be set to an object or null', getComponentName(workInProgress));
        }
        if (typeof instance.getChildContext === 'function') {
          warning(_typeof(workInProgress.type.childContextTypes) === 'object', '%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', getComponentName(workInProgress));
        }
      }

      function resetInputPointers(workInProgress, instance) {
        instance.props = workInProgress.memoizedProps;
        instance.state = workInProgress.memoizedState;
      }

      function adoptClassInstance(workInProgress, instance) {
        instance.updater = updater;
        workInProgress.stateNode = instance;
        // The instance needs access to the fiber so that it can schedule updates
        set(instance, workInProgress);
        {
          instance._reactInternalInstance = fakeInternalInstance;
        }
      }

      function constructClassInstance(workInProgress, props) {
        var ctor = workInProgress.type;
        var unmaskedContext = getUnmaskedContext(workInProgress);
        var needsContext = isContextConsumer(workInProgress);
        var context = needsContext ? getMaskedContext(workInProgress, unmaskedContext) : emptyObject;
        var instance = new ctor(props, context);
        adoptClassInstance(workInProgress, instance);

        // Cache unmasked context so we can avoid recreating masked context unless necessary.
        // ReactFiberContext usually updates this cache but can't for newly-created instances.
        if (needsContext) {
          cacheContext(workInProgress, unmaskedContext, context);
        }

        return instance;
      }

      function callComponentWillMount(workInProgress, instance) {
        startPhaseTimer(workInProgress, 'componentWillMount');
        var oldState = instance.state;
        instance.componentWillMount();
        stopPhaseTimer();

        // Simulate an async bailout/interruption by invoking lifecycle twice.
        if (debugRenderPhaseSideEffects) {
          instance.componentWillMount();
        }

        if (oldState !== instance.state) {
          {
            warning(false, '%s.componentWillMount(): Assigning directly to this.state is ' + "deprecated (except inside a component's " + 'constructor). Use setState instead.', getComponentName(workInProgress));
          }
          updater.enqueueReplaceState(instance, instance.state, null);
        }
      }

      function callComponentWillReceiveProps(workInProgress, instance, newProps, newContext) {
        startPhaseTimer(workInProgress, 'componentWillReceiveProps');
        var oldState = instance.state;
        instance.componentWillReceiveProps(newProps, newContext);
        stopPhaseTimer();

        // Simulate an async bailout/interruption by invoking lifecycle twice.
        if (debugRenderPhaseSideEffects) {
          instance.componentWillReceiveProps(newProps, newContext);
        }

        if (instance.state !== oldState) {
          {
            var componentName = getComponentName(workInProgress) || 'Component';
            if (!didWarnAboutStateAssignmentForComponent[componentName]) {
              warning(false, '%s.componentWillReceiveProps(): Assigning directly to ' + "this.state is deprecated (except inside a component's " + 'constructor). Use setState instead.', componentName);
              didWarnAboutStateAssignmentForComponent[componentName] = true;
            }
          }
          updater.enqueueReplaceState(instance, instance.state, null);
        }
      }

      // Invokes the mount life-cycles on a previously never rendered instance.
      function mountClassInstance(workInProgress, renderExpirationTime) {
        var current = workInProgress.alternate;

        {
          checkClassInstance(workInProgress);
        }

        var instance = workInProgress.stateNode;
        var state = instance.state || null;

        var props = workInProgress.pendingProps;
        !props ? invariant(false, 'There must be pending props for an initial mount. This error is likely caused by a bug in React. Please file an issue.') : void 0;

        var unmaskedContext = getUnmaskedContext(workInProgress);

        instance.props = props;
        instance.state = workInProgress.memoizedState = state;
        instance.refs = emptyObject;
        instance.context = getMaskedContext(workInProgress, unmaskedContext);

        if (enableAsyncSubtreeAPI && workInProgress.type != null && workInProgress.type.prototype != null && workInProgress.type.prototype.unstable_isAsyncReactComponent === true) {
          workInProgress.internalContextTag |= AsyncUpdates;
        }

        if (typeof instance.componentWillMount === 'function') {
          callComponentWillMount(workInProgress, instance);
          // If we had additional state updates during this life-cycle, let's
          // process them now.
          var updateQueue = workInProgress.updateQueue;
          if (updateQueue !== null) {
            instance.state = processUpdateQueue(current, workInProgress, updateQueue, instance, props, renderExpirationTime);
          }
        }
        if (typeof instance.componentDidMount === 'function') {
          workInProgress.effectTag |= Update;
        }
      }

      // Called on a preexisting class instance. Returns false if a resumed render
      // could be reused.
      // function resumeMountClassInstance(
      //   workInProgress: Fiber,
      //   priorityLevel: PriorityLevel,
      // ): boolean {
      //   const instance = workInProgress.stateNode;
      //   resetInputPointers(workInProgress, instance);

      //   let newState = workInProgress.memoizedState;
      //   let newProps = workInProgress.pendingProps;
      //   if (!newProps) {
      //     // If there isn't any new props, then we'll reuse the memoized props.
      //     // This could be from already completed work.
      //     newProps = workInProgress.memoizedProps;
      //     invariant(
      //       newProps != null,
      //       'There should always be pending or memoized props. This error is ' +
      //         'likely caused by a bug in React. Please file an issue.',
      //     );
      //   }
      //   const newUnmaskedContext = getUnmaskedContext(workInProgress);
      //   const newContext = getMaskedContext(workInProgress, newUnmaskedContext);

      //   const oldContext = instance.context;
      //   const oldProps = workInProgress.memoizedProps;

      //   if (
      //     typeof instance.componentWillReceiveProps === 'function' &&
      //     (oldProps !== newProps || oldContext !== newContext)
      //   ) {
      //     callComponentWillReceiveProps(
      //       workInProgress,
      //       instance,
      //       newProps,
      //       newContext,
      //     );
      //   }

      //   // Process the update queue before calling shouldComponentUpdate
      //   const updateQueue = workInProgress.updateQueue;
      //   if (updateQueue !== null) {
      //     newState = processUpdateQueue(
      //       workInProgress,
      //       updateQueue,
      //       instance,
      //       newState,
      //       newProps,
      //       priorityLevel,
      //     );
      //   }

      //   // TODO: Should we deal with a setState that happened after the last
      //   // componentWillMount and before this componentWillMount? Probably
      //   // unsupported anyway.

      //   if (
      //     !checkShouldComponentUpdate(
      //       workInProgress,
      //       workInProgress.memoizedProps,
      //       newProps,
      //       workInProgress.memoizedState,
      //       newState,
      //       newContext,
      //     )
      //   ) {
      //     // Update the existing instance's state, props, and context pointers even
      //     // though we're bailing out.
      //     instance.props = newProps;
      //     instance.state = newState;
      //     instance.context = newContext;
      //     return false;
      //   }

      //   // Update the input pointers now so that they are correct when we call
      //   // componentWillMount
      //   instance.props = newProps;
      //   instance.state = newState;
      //   instance.context = newContext;

      //   if (typeof instance.componentWillMount === 'function') {
      //     callComponentWillMount(workInProgress, instance);
      //     // componentWillMount may have called setState. Process the update queue.
      //     const newUpdateQueue = workInProgress.updateQueue;
      //     if (newUpdateQueue !== null) {
      //       newState = processUpdateQueue(
      //         workInProgress,
      //         newUpdateQueue,
      //         instance,
      //         newState,
      //         newProps,
      //         priorityLevel,
      //       );
      //     }
      //   }

      //   if (typeof instance.componentDidMount === 'function') {
      //     workInProgress.effectTag |= Update;
      //   }

      //   instance.state = newState;

      //   return true;
      // }

      // Invokes the update life-cycles and returns false if it shouldn't rerender.
      function updateClassInstance(current, workInProgress, renderExpirationTime) {
        var instance = workInProgress.stateNode;
        resetInputPointers(workInProgress, instance);

        var oldProps = workInProgress.memoizedProps;
        var newProps = workInProgress.pendingProps;
        if (!newProps) {
          // If there aren't any new props, then we'll reuse the memoized props.
          // This could be from already completed work.
          newProps = oldProps;
          !(newProps != null) ? invariant(false, 'There should always be pending or memoized props. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        }
        var oldContext = instance.context;
        var newUnmaskedContext = getUnmaskedContext(workInProgress);
        var newContext = getMaskedContext(workInProgress, newUnmaskedContext);

        // Note: During these life-cycles, instance.props/instance.state are what
        // ever the previously attempted to render - not the "current". However,
        // during componentDidUpdate we pass the "current" props.

        if (typeof instance.componentWillReceiveProps === 'function' && (oldProps !== newProps || oldContext !== newContext)) {
          callComponentWillReceiveProps(workInProgress, instance, newProps, newContext);
        }

        // Compute the next state using the memoized state and the update queue.
        var oldState = workInProgress.memoizedState;
        // TODO: Previous state can be null.
        var newState = void 0;
        if (workInProgress.updateQueue !== null) {
          newState = processUpdateQueue(current, workInProgress, workInProgress.updateQueue, instance, newProps, renderExpirationTime);
        } else {
          newState = oldState;
        }

        if (oldProps === newProps && oldState === newState && !hasContextChanged() && !(workInProgress.updateQueue !== null && workInProgress.updateQueue.hasForceUpdate)) {
          // If an update was already in progress, we should schedule an Update
          // effect even though we're bailing out, so that cWU/cDU are called.
          if (typeof instance.componentDidUpdate === 'function') {
            if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
              workInProgress.effectTag |= Update;
            }
          }
          return false;
        }

        var shouldUpdate = checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext);

        if (shouldUpdate) {
          if (typeof instance.componentWillUpdate === 'function') {
            startPhaseTimer(workInProgress, 'componentWillUpdate');
            instance.componentWillUpdate(newProps, newState, newContext);
            stopPhaseTimer();

            // Simulate an async bailout/interruption by invoking lifecycle twice.
            if (debugRenderPhaseSideEffects) {
              instance.componentWillUpdate(newProps, newState, newContext);
            }
          }
          if (typeof instance.componentDidUpdate === 'function') {
            workInProgress.effectTag |= Update;
          }
        } else {
          // If an update was already in progress, we should schedule an Update
          // effect even though we're bailing out, so that cWU/cDU are called.
          if (typeof instance.componentDidUpdate === 'function') {
            if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
              workInProgress.effectTag |= Update;
            }
          }

          // If shouldComponentUpdate returned false, we should still update the
          // memoized props/state to indicate that this work can be reused.
          memoizeProps(workInProgress, newProps);
          memoizeState(workInProgress, newState);
        }

        // Update the existing instance's state, props, and context pointers even
        // if shouldComponentUpdate returns false.
        instance.props = newProps;
        instance.state = newState;
        instance.context = newContext;

        return shouldUpdate;
      }

      return {
        adoptClassInstance: adoptClassInstance,
        constructClassInstance: constructClassInstance,
        mountClassInstance: mountClassInstance,
        // resumeMountClassInstance,
        updateClassInstance: updateClassInstance
      };
    };

    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
    var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
    var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;

    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable === 'undefined') {
        return null;
      }
      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }
      return null;
    }

    var getCurrentFiberStackAddendum$1 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

    {
      var didWarnAboutMaps = false;
      /**
       * Warn if there's no key explicitly set on dynamic arrays of children or
       * object keys are not valid. This allows us to keep track of children between
       * updates.
       */
      var ownerHasKeyUseWarning = {};
      var ownerHasFunctionTypeWarning = {};

      var warnForMissingKey = function warnForMissingKey(child) {
        if (child === null || (typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object') {
          return;
        }
        if (!child._store || child._store.validated || child.key != null) {
          return;
        }
        !(_typeof(child._store) === 'object') ? invariant(false, 'React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        child._store.validated = true;

        var currentComponentErrorInfo = 'Each child in an array or iterator should have a unique ' + '"key" prop. See https://fb.me/react-warning-keys for ' + 'more information.' + (getCurrentFiberStackAddendum$1() || '');
        if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
          return;
        }
        ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

        warning(false, 'Each child in an array or iterator should have a unique ' + '"key" prop. See https://fb.me/react-warning-keys for ' + 'more information.%s', getCurrentFiberStackAddendum$1());
      };
    }

    var isArray$1 = Array.isArray;

    function coerceRef(current, element) {
      var mixedRef = element.ref;
      if (mixedRef !== null && typeof mixedRef !== 'function') {
        if (element._owner) {
          var owner = element._owner;
          var inst = void 0;
          if (owner) {
            var ownerFiber = owner;
            !(ownerFiber.tag === ClassComponent) ? invariant(false, 'Stateless function components cannot have refs.') : void 0;
            inst = ownerFiber.stateNode;
          }
          !inst ? invariant(false, 'Missing owner for string ref %s. This error is likely caused by a bug in React. Please file an issue.', mixedRef) : void 0;
          var stringRef = '' + mixedRef;
          // Check if previous string ref matches new string ref
          if (current !== null && current.ref !== null && current.ref._stringRef === stringRef) {
            return current.ref;
          }
          var ref = function ref(value) {
            var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
            if (value === null) {
              delete refs[stringRef];
            } else {
              refs[stringRef] = value;
            }
          };
          ref._stringRef = stringRef;
          return ref;
        } else {
          !(typeof mixedRef === 'string') ? invariant(false, 'Expected ref to be a function or a string.') : void 0;
          !element._owner ? invariant(false, 'Element ref was specified as a string (%s) but no owner was set. You may have multiple copies of React loaded. (details: https://fb.me/react-refs-must-have-owner).', mixedRef) : void 0;
        }
      }
      return mixedRef;
    }

    function throwOnInvalidObjectType(returnFiber, newChild) {
      if (returnFiber.type !== 'textarea') {
        var addendum = '';
        {
          addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + (getCurrentFiberStackAddendum$1() || '');
        }
        invariant(false, 'Objects are not valid as a React child (found: %s).%s', Object.prototype.toString.call(newChild) === '[object Object]' ? 'object with keys {' + Object.keys(newChild).join(', ') + '}' : newChild, addendum);
      }
    }

    function warnOnFunctionType() {
      var currentComponentErrorInfo = 'Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.' + (getCurrentFiberStackAddendum$1() || '');

      if (ownerHasFunctionTypeWarning[currentComponentErrorInfo]) {
        return;
      }
      ownerHasFunctionTypeWarning[currentComponentErrorInfo] = true;

      warning(false, 'Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.%s', getCurrentFiberStackAddendum$1() || '');
    }

    // This wrapper function exists because I expect to clone the code in each path
    // to be able to optimize each path individually by branching early. This needs
    // a compiler or we can do it manually. Helpers that don't need this branching
    // live outside of this function.
    function ChildReconciler(shouldTrackSideEffects) {
      function deleteChild(returnFiber, childToDelete) {
        if (!shouldTrackSideEffects) {
          // Noop.
          return;
        }
        // Deletions are added in reversed order so we add it to the front.
        // At this point, the return fiber's effect list is empty except for
        // deletions, so we can just append the deletion to the list. The remaining
        // effects aren't added until the complete phase. Once we implement
        // resuming, this may not be true.
        var last = returnFiber.lastEffect;
        if (last !== null) {
          last.nextEffect = childToDelete;
          returnFiber.lastEffect = childToDelete;
        } else {
          returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
        }
        childToDelete.nextEffect = null;
        childToDelete.effectTag = Deletion;
      }

      function deleteRemainingChildren(returnFiber, currentFirstChild) {
        if (!shouldTrackSideEffects) {
          // Noop.
          return null;
        }

        // TODO: For the shouldClone case, this could be micro-optimized a bit by
        // assuming that after the first child we've already added everything.
        var childToDelete = currentFirstChild;
        while (childToDelete !== null) {
          deleteChild(returnFiber, childToDelete);
          childToDelete = childToDelete.sibling;
        }
        return null;
      }

      function mapRemainingChildren(returnFiber, currentFirstChild) {
        // Add the remaining children to a temporary map so that we can find them by
        // keys quickly. Implicit (null) keys get added to this set with their index
        var existingChildren = new Map();

        var existingChild = currentFirstChild;
        while (existingChild !== null) {
          if (existingChild.key !== null) {
            existingChildren.set(existingChild.key, existingChild);
          } else {
            existingChildren.set(existingChild.index, existingChild);
          }
          existingChild = existingChild.sibling;
        }
        return existingChildren;
      }

      function useFiber(fiber, pendingProps, expirationTime) {
        // We currently set sibling to null and index to 0 here because it is easy
        // to forget to do before returning it. E.g. for the single child case.
        var clone = createWorkInProgress(fiber, pendingProps, expirationTime);
        clone.index = 0;
        clone.sibling = null;
        return clone;
      }

      function placeChild(newFiber, lastPlacedIndex, newIndex) {
        newFiber.index = newIndex;
        if (!shouldTrackSideEffects) {
          // Noop.
          return lastPlacedIndex;
        }
        var current = newFiber.alternate;
        if (current !== null) {
          var oldIndex = current.index;
          if (oldIndex < lastPlacedIndex) {
            // This is a move.
            newFiber.effectTag = Placement;
            return lastPlacedIndex;
          } else {
            // This item can stay in place.
            return oldIndex;
          }
        } else {
          // This is an insertion.
          newFiber.effectTag = Placement;
          return lastPlacedIndex;
        }
      }

      function placeSingleChild(newFiber) {
        // This is simpler for the single child case. We only need to do a
        // placement for inserting new children.
        if (shouldTrackSideEffects && newFiber.alternate === null) {
          newFiber.effectTag = Placement;
        }
        return newFiber;
      }

      function updateTextNode(returnFiber, current, textContent, expirationTime) {
        if (current === null || current.tag !== HostText) {
          // Insert
          var created = createFiberFromText(textContent, returnFiber.internalContextTag, expirationTime);
          created['return'] = returnFiber;
          return created;
        } else {
          // Update
          var existing = useFiber(current, textContent, expirationTime);
          existing['return'] = returnFiber;
          return existing;
        }
      }

      function updateElement(returnFiber, current, element, expirationTime) {
        if (current !== null && current.type === element.type) {
          // Move based on index
          var existing = useFiber(current, element.props, expirationTime);
          existing.ref = coerceRef(current, element);
          existing['return'] = returnFiber;
          {
            existing._debugSource = element._source;
            existing._debugOwner = element._owner;
          }
          return existing;
        } else {
          // Insert
          var created = createFiberFromElement(element, returnFiber.internalContextTag, expirationTime);
          created.ref = coerceRef(current, element);
          created['return'] = returnFiber;
          return created;
        }
      }

      function updateCall(returnFiber, current, call, expirationTime) {
        // TODO: Should this also compare handler to determine whether to reuse?
        if (current === null || current.tag !== CallComponent) {
          // Insert
          var created = createFiberFromCall(call, returnFiber.internalContextTag, expirationTime);
          created['return'] = returnFiber;
          return created;
        } else {
          // Move based on index
          var existing = useFiber(current, call, expirationTime);
          existing['return'] = returnFiber;
          return existing;
        }
      }

      function updateReturn(returnFiber, current, returnNode, expirationTime) {
        if (current === null || current.tag !== ReturnComponent) {
          // Insert
          var created = createFiberFromReturn(returnNode, returnFiber.internalContextTag, expirationTime);
          created.type = returnNode.value;
          created['return'] = returnFiber;
          return created;
        } else {
          // Move based on index
          var existing = useFiber(current, null, expirationTime);
          existing.type = returnNode.value;
          existing['return'] = returnFiber;
          return existing;
        }
      }

      function updatePortal(returnFiber, current, portal, expirationTime) {
        if (current === null || current.tag !== HostPortal || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) {
          // Insert
          var created = createFiberFromPortal(portal, returnFiber.internalContextTag, expirationTime);
          created['return'] = returnFiber;
          return created;
        } else {
          // Update
          var existing = useFiber(current, portal.children || [], expirationTime);
          existing['return'] = returnFiber;
          return existing;
        }
      }

      function updateFragment(returnFiber, current, fragment, expirationTime, key) {
        if (current === null || current.tag !== Fragment) {
          // Insert
          var created = createFiberFromFragment(fragment, returnFiber.internalContextTag, expirationTime, key);
          created['return'] = returnFiber;
          return created;
        } else {
          // Update
          var existing = useFiber(current, fragment, expirationTime);
          existing['return'] = returnFiber;
          return existing;
        }
      }

      function createChild(returnFiber, newChild, expirationTime) {
        if (typeof newChild === 'string' || typeof newChild === 'number') {
          // Text nodes don't have keys. If the previous node is implicitly keyed
          // we can continue to replace it without aborting even if it is not a text
          // node.
          var created = createFiberFromText('' + newChild, returnFiber.internalContextTag, expirationTime);
          created['return'] = returnFiber;
          return created;
        }

        if ((typeof newChild === 'undefined' ? 'undefined' : _typeof(newChild)) === 'object' && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              {
                if (newChild.type === REACT_FRAGMENT_TYPE) {
                  var _created = createFiberFromFragment(newChild.props.children, returnFiber.internalContextTag, expirationTime, newChild.key);
                  _created['return'] = returnFiber;
                  return _created;
                } else {
                  var _created2 = createFiberFromElement(newChild, returnFiber.internalContextTag, expirationTime);
                  _created2.ref = coerceRef(null, newChild);
                  _created2['return'] = returnFiber;
                  return _created2;
                }
              }

            case REACT_CALL_TYPE:
              {
                var _created3 = createFiberFromCall(newChild, returnFiber.internalContextTag, expirationTime);
                _created3['return'] = returnFiber;
                return _created3;
              }

            case REACT_RETURN_TYPE:
              {
                var _created4 = createFiberFromReturn(newChild, returnFiber.internalContextTag, expirationTime);
                _created4.type = newChild.value;
                _created4['return'] = returnFiber;
                return _created4;
              }

            case REACT_PORTAL_TYPE:
              {
                var _created5 = createFiberFromPortal(newChild, returnFiber.internalContextTag, expirationTime);
                _created5['return'] = returnFiber;
                return _created5;
              }
          }

          if (isArray$1(newChild) || getIteratorFn(newChild)) {
            var _created6 = createFiberFromFragment(newChild, returnFiber.internalContextTag, expirationTime, null);
            _created6['return'] = returnFiber;
            return _created6;
          }

          throwOnInvalidObjectType(returnFiber, newChild);
        }

        {
          if (typeof newChild === 'function') {
            warnOnFunctionType();
          }
        }

        return null;
      }

      function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
        // Update the fiber if the keys match, otherwise return null.

        var key = oldFiber !== null ? oldFiber.key : null;

        if (typeof newChild === 'string' || typeof newChild === 'number') {
          // Text nodes don't have keys. If the previous node is implicitly keyed
          // we can continue to replace it without aborting even if it is not a text
          // node.
          if (key !== null) {
            return null;
          }
          return updateTextNode(returnFiber, oldFiber, '' + newChild, expirationTime);
        }

        if ((typeof newChild === 'undefined' ? 'undefined' : _typeof(newChild)) === 'object' && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              {
                if (newChild.key === key) {
                  if (newChild.type === REACT_FRAGMENT_TYPE) {
                    return updateFragment(returnFiber, oldFiber, newChild.props.children, expirationTime, key);
                  }
                  return updateElement(returnFiber, oldFiber, newChild, expirationTime);
                } else {
                  return null;
                }
              }

            case REACT_CALL_TYPE:
              {
                if (newChild.key === key) {
                  return updateCall(returnFiber, oldFiber, newChild, expirationTime);
                } else {
                  return null;
                }
              }

            case REACT_RETURN_TYPE:
              {
                // Returns don't have keys. If the previous node is implicitly keyed
                // we can continue to replace it without aborting even if it is not a
                // yield.
                if (key === null) {
                  return updateReturn(returnFiber, oldFiber, newChild, expirationTime);
                } else {
                  return null;
                }
              }

            case REACT_PORTAL_TYPE:
              {
                if (newChild.key === key) {
                  return updatePortal(returnFiber, oldFiber, newChild, expirationTime);
                } else {
                  return null;
                }
              }
          }

          if (isArray$1(newChild) || getIteratorFn(newChild)) {
            if (key !== null) {
              return null;
            }

            return updateFragment(returnFiber, oldFiber, newChild, expirationTime, null);
          }

          throwOnInvalidObjectType(returnFiber, newChild);
        }

        {
          if (typeof newChild === 'function') {
            warnOnFunctionType();
          }
        }

        return null;
      }

      function updateFromMap(existingChildren, returnFiber, newIdx, newChild, expirationTime) {
        if (typeof newChild === 'string' || typeof newChild === 'number') {
          // Text nodes don't have keys, so we neither have to check the old nor
          // new node for the key. If both are text nodes, they match.
          var matchedFiber = existingChildren.get(newIdx) || null;
          return updateTextNode(returnFiber, matchedFiber, '' + newChild, expirationTime);
        }

        if ((typeof newChild === 'undefined' ? 'undefined' : _typeof(newChild)) === 'object' && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              {
                var _matchedFiber = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
                if (newChild.type === REACT_FRAGMENT_TYPE) {
                  return updateFragment(returnFiber, _matchedFiber, newChild.props.children, expirationTime, newChild.key);
                }
                return updateElement(returnFiber, _matchedFiber, newChild, expirationTime);
              }

            case REACT_CALL_TYPE:
              {
                var _matchedFiber2 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
                return updateCall(returnFiber, _matchedFiber2, newChild, expirationTime);
              }

            case REACT_RETURN_TYPE:
              {
                // Returns don't have keys, so we neither have to check the old nor
                // new node for the key. If both are returns, they match.
                var _matchedFiber3 = existingChildren.get(newIdx) || null;
                return updateReturn(returnFiber, _matchedFiber3, newChild, expirationTime);
              }

            case REACT_PORTAL_TYPE:
              {
                var _matchedFiber4 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
                return updatePortal(returnFiber, _matchedFiber4, newChild, expirationTime);
              }
          }

          if (isArray$1(newChild) || getIteratorFn(newChild)) {
            var _matchedFiber5 = existingChildren.get(newIdx) || null;
            return updateFragment(returnFiber, _matchedFiber5, newChild, expirationTime, null);
          }

          throwOnInvalidObjectType(returnFiber, newChild);
        }

        {
          if (typeof newChild === 'function') {
            warnOnFunctionType();
          }
        }

        return null;
      }

      /**
       * Warns if there is a duplicate or missing key
       */
      function warnOnInvalidKey(child, knownKeys) {
        {
          if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object' || child === null) {
            return knownKeys;
          }
          switch (child.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_CALL_TYPE:
            case REACT_PORTAL_TYPE:
              warnForMissingKey(child);
              var key = child.key;
              if (typeof key !== 'string') {
                break;
              }
              if (knownKeys === null) {
                knownKeys = new Set();
                knownKeys.add(key);
                break;
              }
              if (!knownKeys.has(key)) {
                knownKeys.add(key);
                break;
              }
              warning(false, 'Encountered two children with the same key, `%s`. ' + 'Keys should be unique so that components maintain their identity ' + 'across updates. Non-unique keys may cause children to be ' + 'duplicated and/or omitted — the behavior is unsupported and ' + 'could change in a future version.%s', key, getCurrentFiberStackAddendum$1());
              break;
            default:
              break;
          }
        }
        return knownKeys;
      }

      function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, expirationTime) {
        // This algorithm can't optimize by searching from boths ends since we
        // don't have backpointers on fibers. I'm trying to see how far we can get
        // with that model. If it ends up not being worth the tradeoffs, we can
        // add it later.

        // Even with a two ended optimization, we'd want to optimize for the case
        // where there are few changes and brute force the comparison instead of
        // going for the Map. It'd like to explore hitting that path first in
        // forward-only mode and only go for the Map once we notice that we need
        // lots of look ahead. This doesn't handle reversal as well as two ended
        // search but that's unusual. Besides, for the two ended optimization to
        // work on Iterables, we'd need to copy the whole set.

        // In this first iteration, we'll just live with hitting the bad case
        // (adding everything to a Map) in for every insert/move.

        // If you change this code, also update reconcileChildrenIterator() which
        // uses the same algorithm.

        {
          // First, validate keys.
          var knownKeys = null;
          for (var i = 0; i < newChildren.length; i++) {
            var child = newChildren[i];
            knownKeys = warnOnInvalidKey(child, knownKeys);
          }
        }

        var resultingFirstChild = null;
        var previousNewFiber = null;

        var oldFiber = currentFirstChild;
        var lastPlacedIndex = 0;
        var newIdx = 0;
        var nextOldFiber = null;
        for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
          if (oldFiber.index > newIdx) {
            nextOldFiber = oldFiber;
            oldFiber = null;
          } else {
            nextOldFiber = oldFiber.sibling;
          }
          var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);
          if (newFiber === null) {
            // TODO: This breaks on empty slots like null children. That's
            // unfortunate because it triggers the slow path all the time. We need
            // a better way to communicate whether this was a miss or null,
            // boolean, undefined, etc.
            if (oldFiber === null) {
              oldFiber = nextOldFiber;
            }
            break;
          }
          if (shouldTrackSideEffects) {
            if (oldFiber && newFiber.alternate === null) {
              // We matched the slot, but we didn't reuse the existing fiber, so we
              // need to delete the existing child.
              deleteChild(returnFiber, oldFiber);
            }
          }
          lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
          if (previousNewFiber === null) {
            // TODO: Move out of the loop. This only happens for the first run.
            resultingFirstChild = newFiber;
          } else {
            // TODO: Defer siblings if we're not at the right index for this slot.
            // I.e. if we had null values before, then we want to defer this
            // for each null value. However, we also don't want to call updateSlot
            // with the previous one.
            previousNewFiber.sibling = newFiber;
          }
          previousNewFiber = newFiber;
          oldFiber = nextOldFiber;
        }

        if (newIdx === newChildren.length) {
          // We've reached the end of the new children. We can delete the rest.
          deleteRemainingChildren(returnFiber, oldFiber);
          return resultingFirstChild;
        }

        if (oldFiber === null) {
          // If we don't have any more existing children we can choose a fast path
          // since the rest will all be insertions.
          for (; newIdx < newChildren.length; newIdx++) {
            var _newFiber = createChild(returnFiber, newChildren[newIdx], expirationTime);
            if (!_newFiber) {
              continue;
            }
            lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);
            if (previousNewFiber === null) {
              // TODO: Move out of the loop. This only happens for the first run.
              resultingFirstChild = _newFiber;
            } else {
              previousNewFiber.sibling = _newFiber;
            }
            previousNewFiber = _newFiber;
          }
          return resultingFirstChild;
        }

        // Add all children to a key map for quick lookups.
        var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

        // Keep scanning and use the map to restore deleted items as moves.
        for (; newIdx < newChildren.length; newIdx++) {
          var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], expirationTime);
          if (_newFiber2) {
            if (shouldTrackSideEffects) {
              if (_newFiber2.alternate !== null) {
                // The new fiber is a work in progress, but if there exists a
                // current, that means that we reused the fiber. We need to delete
                // it from the child list so that we don't add it to the deletion
                // list.
                existingChildren['delete'](_newFiber2.key === null ? newIdx : _newFiber2.key);
              }
            }
            lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);
            if (previousNewFiber === null) {
              resultingFirstChild = _newFiber2;
            } else {
              previousNewFiber.sibling = _newFiber2;
            }
            previousNewFiber = _newFiber2;
          }
        }

        if (shouldTrackSideEffects) {
          // Any existing children that weren't consumed above were deleted. We need
          // to add them to the deletion list.
          existingChildren.forEach(function (child) {
            return deleteChild(returnFiber, child);
          });
        }

        return resultingFirstChild;
      }

      function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, expirationTime) {
        // This is the same implementation as reconcileChildrenArray(),
        // but using the iterator instead.

        var iteratorFn = getIteratorFn(newChildrenIterable);
        !(typeof iteratorFn === 'function') ? invariant(false, 'An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.') : void 0;

        {
          // Warn about using Maps as children
          if (typeof newChildrenIterable.entries === 'function') {
            var possibleMap = newChildrenIterable;
            if (possibleMap.entries === iteratorFn) {
              warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', getCurrentFiberStackAddendum$1());
              didWarnAboutMaps = true;
            }
          }

          // First, validate keys.
          // We'll get a different iterator later for the main pass.
          var _newChildren = iteratorFn.call(newChildrenIterable);
          if (_newChildren) {
            var knownKeys = null;
            var _step = _newChildren.next();
            for (; !_step.done; _step = _newChildren.next()) {
              var child = _step.value;
              knownKeys = warnOnInvalidKey(child, knownKeys);
            }
          }
        }

        var newChildren = iteratorFn.call(newChildrenIterable);
        !(newChildren != null) ? invariant(false, 'An iterable object provided no iterator.') : void 0;

        var resultingFirstChild = null;
        var previousNewFiber = null;

        var oldFiber = currentFirstChild;
        var lastPlacedIndex = 0;
        var newIdx = 0;
        var nextOldFiber = null;

        var step = newChildren.next();
        for (; oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
          if (oldFiber.index > newIdx) {
            nextOldFiber = oldFiber;
            oldFiber = null;
          } else {
            nextOldFiber = oldFiber.sibling;
          }
          var newFiber = updateSlot(returnFiber, oldFiber, step.value, expirationTime);
          if (newFiber === null) {
            // TODO: This breaks on empty slots like null children. That's
            // unfortunate because it triggers the slow path all the time. We need
            // a better way to communicate whether this was a miss or null,
            // boolean, undefined, etc.
            if (!oldFiber) {
              oldFiber = nextOldFiber;
            }
            break;
          }
          if (shouldTrackSideEffects) {
            if (oldFiber && newFiber.alternate === null) {
              // We matched the slot, but we didn't reuse the existing fiber, so we
              // need to delete the existing child.
              deleteChild(returnFiber, oldFiber);
            }
          }
          lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
          if (previousNewFiber === null) {
            // TODO: Move out of the loop. This only happens for the first run.
            resultingFirstChild = newFiber;
          } else {
            // TODO: Defer siblings if we're not at the right index for this slot.
            // I.e. if we had null values before, then we want to defer this
            // for each null value. However, we also don't want to call updateSlot
            // with the previous one.
            previousNewFiber.sibling = newFiber;
          }
          previousNewFiber = newFiber;
          oldFiber = nextOldFiber;
        }

        if (step.done) {
          // We've reached the end of the new children. We can delete the rest.
          deleteRemainingChildren(returnFiber, oldFiber);
          return resultingFirstChild;
        }

        if (oldFiber === null) {
          // If we don't have any more existing children we can choose a fast path
          // since the rest will all be insertions.
          for (; !step.done; newIdx++, step = newChildren.next()) {
            var _newFiber3 = createChild(returnFiber, step.value, expirationTime);
            if (_newFiber3 === null) {
              continue;
            }
            lastPlacedIndex = placeChild(_newFiber3, lastPlacedIndex, newIdx);
            if (previousNewFiber === null) {
              // TODO: Move out of the loop. This only happens for the first run.
              resultingFirstChild = _newFiber3;
            } else {
              previousNewFiber.sibling = _newFiber3;
            }
            previousNewFiber = _newFiber3;
          }
          return resultingFirstChild;
        }

        // Add all children to a key map for quick lookups.
        var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

        // Keep scanning and use the map to restore deleted items as moves.
        for (; !step.done; newIdx++, step = newChildren.next()) {
          var _newFiber4 = updateFromMap(existingChildren, returnFiber, newIdx, step.value, expirationTime);
          if (_newFiber4 !== null) {
            if (shouldTrackSideEffects) {
              if (_newFiber4.alternate !== null) {
                // The new fiber is a work in progress, but if there exists a
                // current, that means that we reused the fiber. We need to delete
                // it from the child list so that we don't add it to the deletion
                // list.
                existingChildren['delete'](_newFiber4.key === null ? newIdx : _newFiber4.key);
              }
            }
            lastPlacedIndex = placeChild(_newFiber4, lastPlacedIndex, newIdx);
            if (previousNewFiber === null) {
              resultingFirstChild = _newFiber4;
            } else {
              previousNewFiber.sibling = _newFiber4;
            }
            previousNewFiber = _newFiber4;
          }
        }

        if (shouldTrackSideEffects) {
          // Any existing children that weren't consumed above were deleted. We need
          // to add them to the deletion list.
          existingChildren.forEach(function (child) {
            return deleteChild(returnFiber, child);
          });
        }

        return resultingFirstChild;
      }

      function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, expirationTime) {
        // There's no need to check for keys on text nodes since we don't have a
        // way to define them.
        if (currentFirstChild !== null && currentFirstChild.tag === HostText) {
          // We already have an existing node so let's just update it and delete
          // the rest.
          deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
          var existing = useFiber(currentFirstChild, textContent, expirationTime);
          existing['return'] = returnFiber;
          return existing;
        }
        // The existing first child is not a text node so we need to create one
        // and delete the existing ones.
        deleteRemainingChildren(returnFiber, currentFirstChild);
        var created = createFiberFromText(textContent, returnFiber.internalContextTag, expirationTime);
        created['return'] = returnFiber;
        return created;
      }

      function reconcileSingleElement(returnFiber, currentFirstChild, element, expirationTime) {
        var key = element.key;
        var child = currentFirstChild;
        while (child !== null) {
          // TODO: If key === null and child.key === null, then this only applies to
          // the first item in the list.
          if (child.key === key) {
            if (child.tag === Fragment ? element.type === REACT_FRAGMENT_TYPE : child.type === element.type) {
              deleteRemainingChildren(returnFiber, child.sibling);
              var existing = useFiber(child, element.type === REACT_FRAGMENT_TYPE ? element.props.children : element.props, expirationTime);
              existing.ref = coerceRef(child, element);
              existing['return'] = returnFiber;
              {
                existing._debugSource = element._source;
                existing._debugOwner = element._owner;
              }
              return existing;
            } else {
              deleteRemainingChildren(returnFiber, child);
              break;
            }
          } else {
            deleteChild(returnFiber, child);
          }
          child = child.sibling;
        }

        if (element.type === REACT_FRAGMENT_TYPE) {
          var created = createFiberFromFragment(element.props.children, returnFiber.internalContextTag, expirationTime, element.key);
          created['return'] = returnFiber;
          return created;
        } else {
          var _created7 = createFiberFromElement(element, returnFiber.internalContextTag, expirationTime);
          _created7.ref = coerceRef(currentFirstChild, element);
          _created7['return'] = returnFiber;
          return _created7;
        }
      }

      function reconcileSingleCall(returnFiber, currentFirstChild, call, expirationTime) {
        var key = call.key;
        var child = currentFirstChild;
        while (child !== null) {
          // TODO: If key === null and child.key === null, then this only applies to
          // the first item in the list.
          if (child.key === key) {
            if (child.tag === CallComponent) {
              deleteRemainingChildren(returnFiber, child.sibling);
              var existing = useFiber(child, call, expirationTime);
              existing['return'] = returnFiber;
              return existing;
            } else {
              deleteRemainingChildren(returnFiber, child);
              break;
            }
          } else {
            deleteChild(returnFiber, child);
          }
          child = child.sibling;
        }

        var created = createFiberFromCall(call, returnFiber.internalContextTag, expirationTime);
        created['return'] = returnFiber;
        return created;
      }

      function reconcileSingleReturn(returnFiber, currentFirstChild, returnNode, expirationTime) {
        // There's no need to check for keys on yields since they're stateless.
        var child = currentFirstChild;
        if (child !== null) {
          if (child.tag === ReturnComponent) {
            deleteRemainingChildren(returnFiber, child.sibling);
            var existing = useFiber(child, null, expirationTime);
            existing.type = returnNode.value;
            existing['return'] = returnFiber;
            return existing;
          } else {
            deleteRemainingChildren(returnFiber, child);
          }
        }

        var created = createFiberFromReturn(returnNode, returnFiber.internalContextTag, expirationTime);
        created.type = returnNode.value;
        created['return'] = returnFiber;
        return created;
      }

      function reconcileSinglePortal(returnFiber, currentFirstChild, portal, expirationTime) {
        var key = portal.key;
        var child = currentFirstChild;
        while (child !== null) {
          // TODO: If key === null and child.key === null, then this only applies to
          // the first item in the list.
          if (child.key === key) {
            if (child.tag === HostPortal && child.stateNode.containerInfo === portal.containerInfo && child.stateNode.implementation === portal.implementation) {
              deleteRemainingChildren(returnFiber, child.sibling);
              var existing = useFiber(child, portal.children || [], expirationTime);
              existing['return'] = returnFiber;
              return existing;
            } else {
              deleteRemainingChildren(returnFiber, child);
              break;
            }
          } else {
            deleteChild(returnFiber, child);
          }
          child = child.sibling;
        }

        var created = createFiberFromPortal(portal, returnFiber.internalContextTag, expirationTime);
        created['return'] = returnFiber;
        return created;
      }

      // This API will tag the children with the side-effect of the reconciliation
      // itself. They will be added to the side-effect list as we pass through the
      // children and the parent.
      function reconcileChildFibers(returnFiber, currentFirstChild, newChild, expirationTime) {
        // This function is not recursive.
        // If the top level item is an array, we treat it as a set of children,
        // not as a fragment. Nested arrays on the other hand will be treated as
        // fragment nodes. Recursion happens at the normal flow.

        // Handle top level unkeyed fragments as if they were arrays.
        // This leads to an ambiguity between <>{[...]}</> and <>...</>.
        // We treat the ambiguous cases above the same.
        if ((typeof newChild === 'undefined' ? 'undefined' : _typeof(newChild)) === 'object' && newChild !== null && newChild.type === REACT_FRAGMENT_TYPE && newChild.key === null) {
          newChild = newChild.props.children;
        }

        // Handle object types
        var isObject = (typeof newChild === 'undefined' ? 'undefined' : _typeof(newChild)) === 'object' && newChild !== null;

        if (isObject) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, expirationTime));

            case REACT_CALL_TYPE:
              return placeSingleChild(reconcileSingleCall(returnFiber, currentFirstChild, newChild, expirationTime));
            case REACT_RETURN_TYPE:
              return placeSingleChild(reconcileSingleReturn(returnFiber, currentFirstChild, newChild, expirationTime));
            case REACT_PORTAL_TYPE:
              return placeSingleChild(reconcileSinglePortal(returnFiber, currentFirstChild, newChild, expirationTime));
          }
        }

        if (typeof newChild === 'string' || typeof newChild === 'number') {
          return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, '' + newChild, expirationTime));
        }

        if (isArray$1(newChild)) {
          return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, expirationTime);
        }

        if (getIteratorFn(newChild)) {
          return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, expirationTime);
        }

        if (isObject) {
          throwOnInvalidObjectType(returnFiber, newChild);
        }

        {
          if (typeof newChild === 'function') {
            warnOnFunctionType();
          }
        }
        if (typeof newChild === 'undefined') {
          // If the new child is undefined, and the return fiber is a composite
          // component, throw an error. If Fiber return types are disabled,
          // we already threw above.
          switch (returnFiber.tag) {
            case ClassComponent:
              {
                {
                  var instance = returnFiber.stateNode;
                  if (instance.render._isMockFunction) {
                    // We allow auto-mocks to proceed as if they're returning null.
                    break;
                  }
                }
              }
            // Intentionally fall through to the next case, which handles both
            // functions and classes
            // eslint-disable-next-lined no-fallthrough
            case FunctionalComponent:
              {
                var Component = returnFiber.type;
                invariant(false, '%s(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.', Component.displayName || Component.name || 'Component');
              }
          }
        }

        // Remaining cases are all treated as empty.
        return deleteRemainingChildren(returnFiber, currentFirstChild);
      }

      return reconcileChildFibers;
    }

    var reconcileChildFibers = ChildReconciler(true);
    var mountChildFibers = ChildReconciler(false);

    function cloneChildFibers(current, workInProgress) {
      !(current === null || workInProgress.child === current.child) ? invariant(false, 'Resuming work not yet implemented.') : void 0;

      if (workInProgress.child === null) {
        return;
      }

      var currentChild = workInProgress.child;
      var newChild = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
      workInProgress.child = newChild;

      newChild['return'] = workInProgress;
      while (currentChild.sibling !== null) {
        currentChild = currentChild.sibling;
        newChild = newChild.sibling = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
        newChild['return'] = workInProgress;
      }
      newChild.sibling = null;
    }

    {
      var warnedAboutStatelessRefs = {};
    }

    var ReactFiberBeginWork = function ReactFiberBeginWork(config, hostContext, hydrationContext, scheduleWork, computeExpirationForFiber) {
      var shouldSetTextContent = config.shouldSetTextContent,
          useSyncScheduling = config.useSyncScheduling,
          shouldDeprioritizeSubtree = config.shouldDeprioritizeSubtree;
      var pushHostContext = hostContext.pushHostContext,
          pushHostContainer = hostContext.pushHostContainer;
      var enterHydrationState = hydrationContext.enterHydrationState,
          resetHydrationState = hydrationContext.resetHydrationState,
          tryToClaimNextHydratableInstance = hydrationContext.tryToClaimNextHydratableInstance;

      var _ReactFiberClassCompo = ReactFiberClassComponent(scheduleWork, computeExpirationForFiber, memoizeProps, memoizeState),
          adoptClassInstance = _ReactFiberClassCompo.adoptClassInstance,
          constructClassInstance = _ReactFiberClassCompo.constructClassInstance,
          mountClassInstance = _ReactFiberClassCompo.mountClassInstance,
          updateClassInstance = _ReactFiberClassCompo.updateClassInstance;

      // TODO: Remove this and use reconcileChildrenAtExpirationTime directly.


      function reconcileChildren(current, workInProgress, nextChildren) {
        reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, workInProgress.expirationTime);
      }

      function reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, renderExpirationTime) {
        if (current === null) {
          // If this is a fresh new component that hasn't been rendered yet, we
          // won't update its child set by applying minimal side-effects. Instead,
          // we will add them all to the child before it gets rendered. That means
          // we can optimize this reconciliation pass by not tracking side-effects.
          workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
        } else {
          // If the current child is the same as the work in progress, it means that
          // we haven't yet started any work on these children. Therefore, we use
          // the clone algorithm to create a copy of all the current children.

          // If we had any progressed work already, that is invalid at this point so
          // let's throw it out.
          workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderExpirationTime);
        }
      }

      function updateFragment(current, workInProgress) {
        var nextChildren = workInProgress.pendingProps;
        if (hasContextChanged()) {
          // Normally we can bail out on props equality but if context has changed
          // we don't do the bailout and we have to reuse existing props instead.
          if (nextChildren === null) {
            nextChildren = workInProgress.memoizedProps;
          }
        } else if (nextChildren === null || workInProgress.memoizedProps === nextChildren) {
          return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }
        reconcileChildren(current, workInProgress, nextChildren);
        memoizeProps(workInProgress, nextChildren);
        return workInProgress.child;
      }

      function markRef(current, workInProgress) {
        var ref = workInProgress.ref;
        if (ref !== null && (!current || current.ref !== ref)) {
          // Schedule a Ref effect
          workInProgress.effectTag |= Ref;
        }
      }

      function updateFunctionalComponent(current, workInProgress) {
        var fn = workInProgress.type;
        var nextProps = workInProgress.pendingProps;

        var memoizedProps = workInProgress.memoizedProps;
        if (hasContextChanged()) {
          // Normally we can bail out on props equality but if context has changed
          // we don't do the bailout and we have to reuse existing props instead.
          if (nextProps === null) {
            nextProps = memoizedProps;
          }
        } else {
          if (nextProps === null || memoizedProps === nextProps) {
            return bailoutOnAlreadyFinishedWork(current, workInProgress);
          }
          // TODO: consider bringing fn.shouldComponentUpdate() back.
          // It used to be here.
        }

        var unmaskedContext = getUnmaskedContext(workInProgress);
        var context = getMaskedContext(workInProgress, unmaskedContext);

        var nextChildren;

        {
          ReactCurrentOwner.current = workInProgress;
          ReactDebugCurrentFiber.setCurrentPhase('render');
          nextChildren = fn(nextProps, context);
          ReactDebugCurrentFiber.setCurrentPhase(null);
        }
        // React DevTools reads this flag.
        workInProgress.effectTag |= PerformedWork;
        reconcileChildren(current, workInProgress, nextChildren);
        memoizeProps(workInProgress, nextProps);
        return workInProgress.child;
      }

      function updateClassComponent(current, workInProgress, renderExpirationTime) {
        // Push context providers early to prevent context stack mismatches.
        // During mounting we don't know the child context yet as the instance doesn't exist.
        // We will invalidate the child context in finishClassComponent() right after rendering.
        var hasContext = pushContextProvider(workInProgress);

        var shouldUpdate = void 0;
        if (current === null) {
          if (!workInProgress.stateNode) {
            // In the initial pass we might need to construct the instance.
            constructClassInstance(workInProgress, workInProgress.pendingProps);
            mountClassInstance(workInProgress, renderExpirationTime);
            shouldUpdate = true;
          } else {
            invariant(false, 'Resuming work not yet implemented.');
            // In a resume, we'll already have an instance we can reuse.
            // shouldUpdate = resumeMountClassInstance(workInProgress, renderExpirationTime);
          }
        } else {
          shouldUpdate = updateClassInstance(current, workInProgress, renderExpirationTime);
        }
        return finishClassComponent(current, workInProgress, shouldUpdate, hasContext);
      }

      function finishClassComponent(current, workInProgress, shouldUpdate, hasContext) {
        // Refs should update even if shouldComponentUpdate returns false
        markRef(current, workInProgress);

        if (!shouldUpdate) {
          // Context providers should defer to sCU for rendering
          if (hasContext) {
            invalidateContextProvider(workInProgress, false);
          }

          return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }

        var instance = workInProgress.stateNode;

        // Rerender
        ReactCurrentOwner.current = workInProgress;
        var nextChildren = void 0;
        {
          ReactDebugCurrentFiber.setCurrentPhase('render');
          nextChildren = instance.render();
          if (debugRenderPhaseSideEffects) {
            instance.render();
          }
          ReactDebugCurrentFiber.setCurrentPhase(null);
        }
        // React DevTools reads this flag.
        workInProgress.effectTag |= PerformedWork;
        reconcileChildren(current, workInProgress, nextChildren);
        // Memoize props and state using the values we just used to render.
        // TODO: Restructure so we never read values from the instance.
        memoizeState(workInProgress, instance.state);
        memoizeProps(workInProgress, instance.props);

        // The context might have changed so we need to recalculate it.
        if (hasContext) {
          invalidateContextProvider(workInProgress, true);
        }

        return workInProgress.child;
      }

      function pushHostRootContext(workInProgress) {
        var root = workInProgress.stateNode;
        if (root.pendingContext) {
          pushTopLevelContextObject(workInProgress, root.pendingContext, root.pendingContext !== root.context);
        } else if (root.context) {
          // Should always be set
          pushTopLevelContextObject(workInProgress, root.context, false);
        }
        pushHostContainer(workInProgress, root.containerInfo);
      }

      function updateHostRoot(current, workInProgress, renderExpirationTime) {
        pushHostRootContext(workInProgress);
        var updateQueue = workInProgress.updateQueue;
        if (updateQueue !== null) {
          var prevState = workInProgress.memoizedState;
          var state = processUpdateQueue(current, workInProgress, updateQueue, null, null, renderExpirationTime);
          if (prevState === state) {
            // If the state is the same as before, that's a bailout because we had
            // no work that expires at this time.
            resetHydrationState();
            return bailoutOnAlreadyFinishedWork(current, workInProgress);
          }
          var element = state.element;
          var root = workInProgress.stateNode;
          if ((current === null || current.child === null) && root.hydrate && enterHydrationState(workInProgress)) {
            // If we don't have any current children this might be the first pass.
            // We always try to hydrate. If this isn't a hydration pass there won't
            // be any children to hydrate which is effectively the same thing as
            // not hydrating.

            // This is a bit of a hack. We track the host root as a placement to
            // know that we're currently in a mounting state. That way isMounted
            // works as expected. We must reset this before committing.
            // TODO: Delete this when we delete isMounted and findDOMNode.
            workInProgress.effectTag |= Placement;

            // Ensure that children mount into this root without tracking
            // side-effects. This ensures that we don't store Placement effects on
            // nodes that will be hydrated.
            workInProgress.child = mountChildFibers(workInProgress, null, element, renderExpirationTime);
          } else {
            // Otherwise reset hydration state in case we aborted and resumed another
            // root.
            resetHydrationState();
            reconcileChildren(current, workInProgress, element);
          }
          memoizeState(workInProgress, state);
          return workInProgress.child;
        }
        resetHydrationState();
        // If there is no update queue, that's a bailout because the root has no props.
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }

      function updateHostComponent(current, workInProgress, renderExpirationTime) {
        pushHostContext(workInProgress);

        if (current === null) {
          tryToClaimNextHydratableInstance(workInProgress);
        }

        var type = workInProgress.type;
        var memoizedProps = workInProgress.memoizedProps;
        var nextProps = workInProgress.pendingProps;
        if (nextProps === null) {
          nextProps = memoizedProps;
          !(nextProps !== null) ? invariant(false, 'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        }
        var prevProps = current !== null ? current.memoizedProps : null;

        if (hasContextChanged()) {
          // Normally we can bail out on props equality but if context has changed
          // we don't do the bailout and we have to reuse existing props instead.
        } else if (nextProps === null || memoizedProps === nextProps) {
          return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }

        var nextChildren = nextProps.children;
        var isDirectTextChild = shouldSetTextContent(type, nextProps);

        if (isDirectTextChild) {
          // We special case a direct text child of a host node. This is a common
          // case. We won't handle it as a reified child. We will instead handle
          // this in the host environment that also have access to this prop. That
          // avoids allocating another HostText fiber and traversing it.
          nextChildren = null;
        } else if (prevProps && shouldSetTextContent(type, prevProps)) {
          // If we're switching from a direct text child to a normal child, or to
          // empty, we need to schedule the text content to be reset.
          workInProgress.effectTag |= ContentReset;
        }

        markRef(current, workInProgress);

        // Check the host config to see if the children are offscreen/hidden.
        if (renderExpirationTime !== Never && !useSyncScheduling && shouldDeprioritizeSubtree(type, nextProps)) {
          // Down-prioritize the children.
          workInProgress.expirationTime = Never;
          // Bailout and come back to this fiber later.
          return null;
        }

        reconcileChildren(current, workInProgress, nextChildren);
        memoizeProps(workInProgress, nextProps);
        return workInProgress.child;
      }

      function updateHostText(current, workInProgress) {
        if (current === null) {
          tryToClaimNextHydratableInstance(workInProgress);
        }
        var nextProps = workInProgress.pendingProps;
        if (nextProps === null) {
          nextProps = workInProgress.memoizedProps;
        }
        memoizeProps(workInProgress, nextProps);
        // Nothing to do here. This is terminal. We'll do the completion step
        // immediately after.
        return null;
      }

      function mountIndeterminateComponent(current, workInProgress, renderExpirationTime) {
        !(current === null) ? invariant(false, 'An indeterminate component should never have mounted. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        var fn = workInProgress.type;
        var props = workInProgress.pendingProps;
        var unmaskedContext = getUnmaskedContext(workInProgress);
        var context = getMaskedContext(workInProgress, unmaskedContext);

        var value;

        {
          if (fn.prototype && typeof fn.prototype.render === 'function') {
            var componentName = getComponentName(workInProgress);
            warning(false, "The <%s /> component appears to have a render method, but doesn't extend React.Component. " + 'This is likely to cause errors. Change %s to extend React.Component instead.', componentName, componentName);
          }
          ReactCurrentOwner.current = workInProgress;
          value = fn(props, context);
        }
        // React DevTools reads this flag.
        workInProgress.effectTag |= PerformedWork;

        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null && typeof value.render === 'function') {
          // Proceed under the assumption that this is a class instance
          workInProgress.tag = ClassComponent;

          // Push context providers early to prevent context stack mismatches.
          // During mounting we don't know the child context yet as the instance doesn't exist.
          // We will invalidate the child context in finishClassComponent() right after rendering.
          var hasContext = pushContextProvider(workInProgress);
          adoptClassInstance(workInProgress, value);
          mountClassInstance(workInProgress, renderExpirationTime);
          return finishClassComponent(current, workInProgress, true, hasContext);
        } else {
          // Proceed under the assumption that this is a functional component
          workInProgress.tag = FunctionalComponent;
          {
            var Component = workInProgress.type;

            if (Component) {
              warning(!Component.childContextTypes, '%s(...): childContextTypes cannot be defined on a functional component.', Component.displayName || Component.name || 'Component');
            }
            if (workInProgress.ref !== null) {
              var info = '';
              var ownerName = ReactDebugCurrentFiber.getCurrentFiberOwnerName();
              if (ownerName) {
                info += '\n\nCheck the render method of `' + ownerName + '`.';
              }

              var warningKey = ownerName || workInProgress._debugID || '';
              var debugSource = workInProgress._debugSource;
              if (debugSource) {
                warningKey = debugSource.fileName + ':' + debugSource.lineNumber;
              }
              if (!warnedAboutStatelessRefs[warningKey]) {
                warnedAboutStatelessRefs[warningKey] = true;
                warning(false, 'Stateless function components cannot be given refs. ' + 'Attempts to access this ref will fail.%s%s', info, ReactDebugCurrentFiber.getCurrentFiberStackAddendum());
              }
            }
          }
          reconcileChildren(current, workInProgress, value);
          memoizeProps(workInProgress, props);
          return workInProgress.child;
        }
      }

      function updateCallComponent(current, workInProgress, renderExpirationTime) {
        var nextCall = workInProgress.pendingProps;
        if (hasContextChanged()) {
          // Normally we can bail out on props equality but if context has changed
          // we don't do the bailout and we have to reuse existing props instead.
          if (nextCall === null) {
            nextCall = current && current.memoizedProps;
            !(nextCall !== null) ? invariant(false, 'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          }
        } else if (nextCall === null || workInProgress.memoizedProps === nextCall) {
          nextCall = workInProgress.memoizedProps;
          // TODO: When bailing out, we might need to return the stateNode instead
          // of the child. To check it for work.
          // return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }

        var nextChildren = nextCall.children;

        // The following is a fork of reconcileChildrenAtExpirationTime but using
        // stateNode to store the child.
        if (current === null) {
          workInProgress.stateNode = mountChildFibers(workInProgress, workInProgress.stateNode, nextChildren, renderExpirationTime);
        } else {
          workInProgress.stateNode = reconcileChildFibers(workInProgress, workInProgress.stateNode, nextChildren, renderExpirationTime);
        }

        memoizeProps(workInProgress, nextCall);
        // This doesn't take arbitrary time so we could synchronously just begin
        // eagerly do the work of workInProgress.child as an optimization.
        return workInProgress.stateNode;
      }

      function updatePortalComponent(current, workInProgress, renderExpirationTime) {
        pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
        var nextChildren = workInProgress.pendingProps;
        if (hasContextChanged()) {
          // Normally we can bail out on props equality but if context has changed
          // we don't do the bailout and we have to reuse existing props instead.
          if (nextChildren === null) {
            nextChildren = current && current.memoizedProps;
            !(nextChildren != null) ? invariant(false, 'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          }
        } else if (nextChildren === null || workInProgress.memoizedProps === nextChildren) {
          return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }

        if (current === null) {
          // Portals are special because we don't append the children during mount
          // but at commit. Therefore we need to track insertions which the normal
          // flow doesn't do during mount. This doesn't happen at the root because
          // the root always starts with a "current" with a null child.
          // TODO: Consider unifying this with how the root works.
          workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
          memoizeProps(workInProgress, nextChildren);
        } else {
          reconcileChildren(current, workInProgress, nextChildren);
          memoizeProps(workInProgress, nextChildren);
        }
        return workInProgress.child;
      }

      /*
      function reuseChildrenEffects(returnFiber : Fiber, firstChild : Fiber) {
        let child = firstChild;
        do {
          // Ensure that the first and last effect of the parent corresponds
          // to the children's first and last effect.
          if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = child.firstEffect;
          }
          if (child.lastEffect) {
            if (returnFiber.lastEffect) {
              returnFiber.lastEffect.nextEffect = child.firstEffect;
            }
            returnFiber.lastEffect = child.lastEffect;
          }
        } while (child = child.sibling);
      }
      */

      function bailoutOnAlreadyFinishedWork(current, workInProgress) {
        cancelWorkTimer(workInProgress);

        // TODO: We should ideally be able to bail out early if the children have no
        // more work to do. However, since we don't have a separation of this
        // Fiber's priority and its children yet - we don't know without doing lots
        // of the same work we do anyway. Once we have that separation we can just
        // bail out here if the children has no more work at this priority level.
        // if (workInProgress.priorityOfChildren <= priorityLevel) {
        //   // If there are side-effects in these children that have not yet been
        //   // committed we need to ensure that they get properly transferred up.
        //   if (current && current.child !== workInProgress.child) {
        //     reuseChildrenEffects(workInProgress, child);
        //   }
        //   return null;
        // }

        cloneChildFibers(current, workInProgress);
        return workInProgress.child;
      }

      function bailoutOnLowPriority(current, workInProgress) {
        cancelWorkTimer(workInProgress);

        // TODO: Handle HostComponent tags here as well and call pushHostContext()?
        // See PR 8590 discussion for context
        switch (workInProgress.tag) {
          case HostRoot:
            pushHostRootContext(workInProgress);
            break;
          case ClassComponent:
            pushContextProvider(workInProgress);
            break;
          case HostPortal:
            pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
            break;
        }
        // TODO: What if this is currently in progress?
        // How can that happen? How is this not being cloned?
        return null;
      }

      // TODO: Delete memoizeProps/State and move to reconcile/bailout instead
      function memoizeProps(workInProgress, nextProps) {
        workInProgress.memoizedProps = nextProps;
      }

      function memoizeState(workInProgress, nextState) {
        workInProgress.memoizedState = nextState;
        // Don't reset the updateQueue, in case there are pending updates. Resetting
        // is handled by processUpdateQueue.
      }

      function beginWork(current, workInProgress, renderExpirationTime) {
        if (workInProgress.expirationTime === NoWork || workInProgress.expirationTime > renderExpirationTime) {
          return bailoutOnLowPriority(current, workInProgress);
        }

        switch (workInProgress.tag) {
          case IndeterminateComponent:
            return mountIndeterminateComponent(current, workInProgress, renderExpirationTime);
          case FunctionalComponent:
            return updateFunctionalComponent(current, workInProgress);
          case ClassComponent:
            return updateClassComponent(current, workInProgress, renderExpirationTime);
          case HostRoot:
            return updateHostRoot(current, workInProgress, renderExpirationTime);
          case HostComponent:
            return updateHostComponent(current, workInProgress, renderExpirationTime);
          case HostText:
            return updateHostText(current, workInProgress);
          case CallHandlerPhase:
            // This is a restart. Reset the tag to the initial phase.
            workInProgress.tag = CallComponent;
          // Intentionally fall through since this is now the same.
          case CallComponent:
            return updateCallComponent(current, workInProgress, renderExpirationTime);
          case ReturnComponent:
            // A return component is just a placeholder, we can just run through the
            // next one immediately.
            return null;
          case HostPortal:
            return updatePortalComponent(current, workInProgress, renderExpirationTime);
          case Fragment:
            return updateFragment(current, workInProgress);
          default:
            invariant(false, 'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');
        }
      }

      function beginFailedWork(current, workInProgress, renderExpirationTime) {
        // Push context providers here to avoid a push/pop context mismatch.
        switch (workInProgress.tag) {
          case ClassComponent:
            pushContextProvider(workInProgress);
            break;
          case HostRoot:
            pushHostRootContext(workInProgress);
            break;
          default:
            invariant(false, 'Invalid type of work. This error is likely caused by a bug in React. Please file an issue.');
        }

        // Add an error effect so we can handle the error during the commit phase
        workInProgress.effectTag |= Err;

        // This is a weird case where we do "resume" work — work that failed on
        // our first attempt. Because we no longer have a notion of "progressed
        // deletions," reset the child to the current child to make sure we delete
        // it again. TODO: Find a better way to handle this, perhaps during a more
        // general overhaul of error handling.
        if (current === null) {
          workInProgress.child = null;
        } else if (workInProgress.child !== current.child) {
          workInProgress.child = current.child;
        }

        if (workInProgress.expirationTime === NoWork || workInProgress.expirationTime > renderExpirationTime) {
          return bailoutOnLowPriority(current, workInProgress);
        }

        // If we don't bail out, we're going be recomputing our children so we need
        // to drop our effect list.
        workInProgress.firstEffect = null;
        workInProgress.lastEffect = null;

        // Unmount the current children as if the component rendered null
        var nextChildren = null;
        reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, renderExpirationTime);

        if (workInProgress.tag === ClassComponent) {
          var instance = workInProgress.stateNode;
          workInProgress.memoizedProps = instance.props;
          workInProgress.memoizedState = instance.state;
        }

        return workInProgress.child;
      }

      return {
        beginWork: beginWork,
        beginFailedWork: beginFailedWork
      };
    };

    var ReactFiberCompleteWork = function ReactFiberCompleteWork(config, hostContext, hydrationContext) {
      var createInstance = config.createInstance,
          createTextInstance = config.createTextInstance,
          appendInitialChild = config.appendInitialChild,
          finalizeInitialChildren = config.finalizeInitialChildren,
          prepareUpdate = config.prepareUpdate,
          mutation = config.mutation,
          persistence = config.persistence;
      var getRootHostContainer = hostContext.getRootHostContainer,
          popHostContext = hostContext.popHostContext,
          getHostContext = hostContext.getHostContext,
          popHostContainer = hostContext.popHostContainer;
      var prepareToHydrateHostInstance = hydrationContext.prepareToHydrateHostInstance,
          prepareToHydrateHostTextInstance = hydrationContext.prepareToHydrateHostTextInstance,
          popHydrationState = hydrationContext.popHydrationState;

      function markUpdate(workInProgress) {
        // Tag the fiber with an update effect. This turns a Placement into
        // an UpdateAndPlacement.
        workInProgress.effectTag |= Update;
      }

      function markRef(workInProgress) {
        workInProgress.effectTag |= Ref;
      }

      function appendAllReturns(returns, workInProgress) {
        var node = workInProgress.stateNode;
        if (node) {
          node['return'] = workInProgress;
        }
        while (node !== null) {
          if (node.tag === HostComponent || node.tag === HostText || node.tag === HostPortal) {
            invariant(false, 'A call cannot have host component children.');
          } else if (node.tag === ReturnComponent) {
            returns.push(node.type);
          } else if (node.child !== null) {
            node.child['return'] = node;
            node = node.child;
            continue;
          }
          while (node.sibling === null) {
            if (node['return'] === null || node['return'] === workInProgress) {
              return;
            }
            node = node['return'];
          }
          node.sibling['return'] = node['return'];
          node = node.sibling;
        }
      }

      function moveCallToHandlerPhase(current, workInProgress, renderExpirationTime) {
        var call = workInProgress.memoizedProps;
        !call ? invariant(false, 'Should be resolved by now. This error is likely caused by a bug in React. Please file an issue.') : void 0;

        // First step of the call has completed. Now we need to do the second.
        // TODO: It would be nice to have a multi stage call represented by a
        // single component, or at least tail call optimize nested ones. Currently
        // that requires additional fields that we don't want to add to the fiber.
        // So this requires nested handlers.
        // Note: This doesn't mutate the alternate node. I don't think it needs to
        // since this stage is reset for every pass.
        workInProgress.tag = CallHandlerPhase;

        // Build up the returns.
        // TODO: Compare this to a generator or opaque helpers like Children.
        var returns = [];
        appendAllReturns(returns, workInProgress);
        var fn = call.handler;
        var props = call.props;
        var nextChildren = fn(props, returns);

        var currentFirstChild = current !== null ? current.child : null;
        workInProgress.child = reconcileChildFibers(workInProgress, currentFirstChild, nextChildren, renderExpirationTime);
        return workInProgress.child;
      }

      function appendAllChildren(parent, workInProgress) {
        // We only have the top Fiber that was created but we need recurse down its
        // children to find all the terminal nodes.
        var node = workInProgress.child;
        while (node !== null) {
          if (node.tag === HostComponent || node.tag === HostText) {
            appendInitialChild(parent, node.stateNode);
          } else if (node.tag === HostPortal) {
            // If we have a portal child, then we don't want to traverse
            // down its children. Instead, we'll get insertions from each child in
            // the portal directly.
          } else if (node.child !== null) {
            node.child['return'] = node;
            node = node.child;
            continue;
          }
          if (node === workInProgress) {
            return;
          }
          while (node.sibling === null) {
            if (node['return'] === null || node['return'] === workInProgress) {
              return;
            }
            node = node['return'];
          }
          node.sibling['return'] = node['return'];
          node = node.sibling;
        }
      }

      var updateHostContainer = void 0;
      var updateHostComponent = void 0;
      var updateHostText = void 0;
      if (mutation) {
        if (enableMutatingReconciler) {
          // Mutation mode
          updateHostContainer = function updateHostContainer(workInProgress) {
            // Noop
          };
          updateHostComponent = function updateHostComponent(current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance) {
            // TODO: Type this specific to this type of component.
            workInProgress.updateQueue = updatePayload;
            // If the update payload indicates that there is a change or if there
            // is a new ref we mark this as an update. All the work is done in commitWork.
            if (updatePayload) {
              markUpdate(workInProgress);
            }
          };
          updateHostText = function updateHostText(current, workInProgress, oldText, newText) {
            // If the text differs, mark it as an update. All the work in done in commitWork.
            if (oldText !== newText) {
              markUpdate(workInProgress);
            }
          };
        } else {
          invariant(false, 'Mutating reconciler is disabled.');
        }
      } else if (persistence) {
        if (enablePersistentReconciler) {
          // Persistent host tree mode
          var cloneInstance = persistence.cloneInstance,
              createContainerChildSet = persistence.createContainerChildSet,
              appendChildToContainerChildSet = persistence.appendChildToContainerChildSet,
              finalizeContainerChildren = persistence.finalizeContainerChildren;

          // An unfortunate fork of appendAllChildren because we have two different parent types.

          var appendAllChildrenToContainer = function appendAllChildrenToContainer(containerChildSet, workInProgress) {
            // We only have the top Fiber that was created but we need recurse down its
            // children to find all the terminal nodes.
            var node = workInProgress.child;
            while (node !== null) {
              if (node.tag === HostComponent || node.tag === HostText) {
                appendChildToContainerChildSet(containerChildSet, node.stateNode);
              } else if (node.tag === HostPortal) {
                // If we have a portal child, then we don't want to traverse
                // down its children. Instead, we'll get insertions from each child in
                // the portal directly.
              } else if (node.child !== null) {
                node.child['return'] = node;
                node = node.child;
                continue;
              }
              if (node === workInProgress) {
                return;
              }
              while (node.sibling === null) {
                if (node['return'] === null || node['return'] === workInProgress) {
                  return;
                }
                node = node['return'];
              }
              node.sibling['return'] = node['return'];
              node = node.sibling;
            }
          };
          updateHostContainer = function updateHostContainer(workInProgress) {
            var portalOrRoot = workInProgress.stateNode;
            var childrenUnchanged = workInProgress.firstEffect === null;
            if (childrenUnchanged) {
              // No changes, just reuse the existing instance.
            } else {
              var container = portalOrRoot.containerInfo;
              var newChildSet = createContainerChildSet(container);
              if (finalizeContainerChildren(container, newChildSet)) {
                markUpdate(workInProgress);
              }
              portalOrRoot.pendingChildren = newChildSet;
              // If children might have changed, we have to add them all to the set.
              appendAllChildrenToContainer(newChildSet, workInProgress);
              // Schedule an update on the container to swap out the container.
              markUpdate(workInProgress);
            }
          };
          updateHostComponent = function updateHostComponent(current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance) {
            // If there are no effects associated with this node, then none of our children had any updates.
            // This guarantees that we can reuse all of them.
            var childrenUnchanged = workInProgress.firstEffect === null;
            var currentInstance = current.stateNode;
            if (childrenUnchanged && updatePayload === null) {
              // No changes, just reuse the existing instance.
              // Note that this might release a previous clone.
              workInProgress.stateNode = currentInstance;
            } else {
              var recyclableInstance = workInProgress.stateNode;
              var newInstance = cloneInstance(currentInstance, updatePayload, type, oldProps, newProps, workInProgress, childrenUnchanged, recyclableInstance);
              if (finalizeInitialChildren(newInstance, type, newProps, rootContainerInstance)) {
                markUpdate(workInProgress);
              }
              workInProgress.stateNode = newInstance;
              if (childrenUnchanged) {
                // If there are no other effects in this tree, we need to flag this node as having one.
                // Even though we're not going to use it for anything.
                // Otherwise parents won't know that there are new children to propagate upwards.
                markUpdate(workInProgress);
              } else {
                // If children might have changed, we have to add them all to the set.
                appendAllChildren(newInstance, workInProgress);
              }
            }
          };
          updateHostText = function updateHostText(current, workInProgress, oldText, newText) {
            if (oldText !== newText) {
              // If the text content differs, we'll create a new text instance for it.
              var rootContainerInstance = getRootHostContainer();
              var currentHostContext = getHostContext();
              workInProgress.stateNode = createTextInstance(newText, rootContainerInstance, currentHostContext, workInProgress);
              // We'll have to mark it as having an effect, even though we won't use the effect for anything.
              // This lets the parents know that at least one of their children has changed.
              markUpdate(workInProgress);
            }
          };
        } else {
          invariant(false, 'Persistent reconciler is disabled.');
        }
      } else {
        if (enableNoopReconciler) {
          // No host operations
          updateHostContainer = function updateHostContainer(workInProgress) {
            // Noop
          };
          updateHostComponent = function updateHostComponent(current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance) {
            // Noop
          };
          updateHostText = function updateHostText(current, workInProgress, oldText, newText) {
            // Noop
          };
        } else {
          invariant(false, 'Noop reconciler is disabled.');
        }
      }

      function completeWork(current, workInProgress, renderExpirationTime) {
        // Get the latest props.
        var newProps = workInProgress.pendingProps;
        if (newProps === null) {
          newProps = workInProgress.memoizedProps;
        } else if (workInProgress.expirationTime !== Never || renderExpirationTime === Never) {
          // Reset the pending props, unless this was a down-prioritization.
          workInProgress.pendingProps = null;
        }

        switch (workInProgress.tag) {
          case FunctionalComponent:
            return null;
          case ClassComponent:
            {
              // We are leaving this subtree, so pop context if any.
              popContextProvider(workInProgress);
              return null;
            }
          case HostRoot:
            {
              popHostContainer(workInProgress);
              popTopLevelContextObject(workInProgress);
              var fiberRoot = workInProgress.stateNode;
              if (fiberRoot.pendingContext) {
                fiberRoot.context = fiberRoot.pendingContext;
                fiberRoot.pendingContext = null;
              }

              if (current === null || current.child === null) {
                // If we hydrated, pop so that we can delete any remaining children
                // that weren't hydrated.
                popHydrationState(workInProgress);
                // This resets the hacky state to fix isMounted before committing.
                // TODO: Delete this when we delete isMounted and findDOMNode.
                workInProgress.effectTag &= ~Placement;
              }
              updateHostContainer(workInProgress);
              return null;
            }
          case HostComponent:
            {
              popHostContext(workInProgress);
              var rootContainerInstance = getRootHostContainer();
              var type = workInProgress.type;
              if (current !== null && workInProgress.stateNode != null) {
                // If we have an alternate, that means this is an update and we need to
                // schedule a side-effect to do the updates.
                var oldProps = current.memoizedProps;
                // If we get updated because one of our children updated, we don't
                // have newProps so we'll have to reuse them.
                // TODO: Split the update API as separate for the props vs. children.
                // Even better would be if children weren't special cased at all tho.
                var instance = workInProgress.stateNode;
                var currentHostContext = getHostContext();
                var updatePayload = prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext);

                updateHostComponent(current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance);

                if (current.ref !== workInProgress.ref) {
                  markRef(workInProgress);
                }
              } else {
                if (!newProps) {
                  !(workInProgress.stateNode !== null) ? invariant(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
                  // This can happen when we abort work.
                  return null;
                }

                var _currentHostContext = getHostContext();
                // TODO: Move createInstance to beginWork and keep it on a context
                // "stack" as the parent. Then append children as we go in beginWork
                // or completeWork depending on we want to add then top->down or
                // bottom->up. Top->down is faster in IE11.
                var wasHydrated = popHydrationState(workInProgress);
                if (wasHydrated) {
                  // TODO: Move this and createInstance step into the beginPhase
                  // to consolidate.
                  if (prepareToHydrateHostInstance(workInProgress, rootContainerInstance, _currentHostContext)) {
                    // If changes to the hydrated node needs to be applied at the
                    // commit-phase we mark this as such.
                    markUpdate(workInProgress);
                  }
                } else {
                  var _instance = createInstance(type, newProps, rootContainerInstance, _currentHostContext, workInProgress);

                  appendAllChildren(_instance, workInProgress);

                  // Certain renderers require commit-time effects for initial mount.
                  // (eg DOM renderer supports auto-focus for certain elements).
                  // Make sure such renderers get scheduled for later work.
                  if (finalizeInitialChildren(_instance, type, newProps, rootContainerInstance)) {
                    markUpdate(workInProgress);
                  }
                  workInProgress.stateNode = _instance;
                }

                if (workInProgress.ref !== null) {
                  // If there is a ref on a host node we need to schedule a callback
                  markRef(workInProgress);
                }
              }
              return null;
            }
          case HostText:
            {
              var newText = newProps;
              if (current && workInProgress.stateNode != null) {
                var oldText = current.memoizedProps;
                // If we have an alternate, that means this is an update and we need
                // to schedule a side-effect to do the updates.
                updateHostText(current, workInProgress, oldText, newText);
              } else {
                if (typeof newText !== 'string') {
                  !(workInProgress.stateNode !== null) ? invariant(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
                  // This can happen when we abort work.
                  return null;
                }
                var _rootContainerInstance = getRootHostContainer();
                var _currentHostContext2 = getHostContext();
                var _wasHydrated = popHydrationState(workInProgress);
                if (_wasHydrated) {
                  if (prepareToHydrateHostTextInstance(workInProgress)) {
                    markUpdate(workInProgress);
                  }
                } else {
                  workInProgress.stateNode = createTextInstance(newText, _rootContainerInstance, _currentHostContext2, workInProgress);
                }
              }
              return null;
            }
          case CallComponent:
            return moveCallToHandlerPhase(current, workInProgress, renderExpirationTime);
          case CallHandlerPhase:
            // Reset the tag to now be a first phase call.
            workInProgress.tag = CallComponent;
            return null;
          case ReturnComponent:
            // Does nothing.
            return null;
          case Fragment:
            return null;
          case HostPortal:
            popHostContainer(workInProgress);
            updateHostContainer(workInProgress);
            return null;
          // Error cases
          case IndeterminateComponent:
            invariant(false, 'An indeterminate component should have become determinate before completing. This error is likely caused by a bug in React. Please file an issue.');
          // eslint-disable-next-line no-fallthrough
          default:
            invariant(false, 'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');
        }
      }

      return {
        completeWork: completeWork
      };
    };

    var invokeGuardedCallback$2 = ReactErrorUtils.invokeGuardedCallback;
    var hasCaughtError$1 = ReactErrorUtils.hasCaughtError;
    var clearCaughtError$1 = ReactErrorUtils.clearCaughtError;

    var ReactFiberCommitWork = function ReactFiberCommitWork(config, captureError) {
      var getPublicInstance = config.getPublicInstance,
          mutation = config.mutation,
          persistence = config.persistence;

      var callComponentWillUnmountWithTimer = function callComponentWillUnmountWithTimer(current, instance) {
        startPhaseTimer(current, 'componentWillUnmount');
        instance.props = current.memoizedProps;
        instance.state = current.memoizedState;
        instance.componentWillUnmount();
        stopPhaseTimer();
      };

      // Capture errors so they don't interrupt unmounting.
      function safelyCallComponentWillUnmount(current, instance) {
        {
          invokeGuardedCallback$2(null, callComponentWillUnmountWithTimer, null, current, instance);
          if (hasCaughtError$1()) {
            var unmountError = clearCaughtError$1();
            captureError(current, unmountError);
          }
        }
      }

      function safelyDetachRef(current) {
        var ref = current.ref;
        if (ref !== null) {
          {
            invokeGuardedCallback$2(null, ref, null, null);
            if (hasCaughtError$1()) {
              var refError = clearCaughtError$1();
              captureError(current, refError);
            }
          }
        }
      }

      function commitLifeCycles(current, finishedWork) {
        switch (finishedWork.tag) {
          case ClassComponent:
            {
              var instance = finishedWork.stateNode;
              if (finishedWork.effectTag & Update) {
                if (current === null) {
                  startPhaseTimer(finishedWork, 'componentDidMount');
                  instance.props = finishedWork.memoizedProps;
                  instance.state = finishedWork.memoizedState;
                  instance.componentDidMount();
                  stopPhaseTimer();
                } else {
                  var prevProps = current.memoizedProps;
                  var prevState = current.memoizedState;
                  startPhaseTimer(finishedWork, 'componentDidUpdate');
                  instance.props = finishedWork.memoizedProps;
                  instance.state = finishedWork.memoizedState;
                  instance.componentDidUpdate(prevProps, prevState);
                  stopPhaseTimer();
                }
              }
              var updateQueue = finishedWork.updateQueue;
              if (updateQueue !== null) {
                commitCallbacks(updateQueue, instance);
              }
              return;
            }
          case HostRoot:
            {
              var _updateQueue = finishedWork.updateQueue;
              if (_updateQueue !== null) {
                var _instance = finishedWork.child !== null ? finishedWork.child.stateNode : null;
                commitCallbacks(_updateQueue, _instance);
              }
              return;
            }
          case HostComponent:
            {
              var _instance2 = finishedWork.stateNode;

              // Renderers may schedule work to be done after host components are mounted
              // (eg DOM renderer may schedule auto-focus for inputs and form controls).
              // These effects should only be committed when components are first mounted,
              // aka when there is no current/alternate.
              if (current === null && finishedWork.effectTag & Update) {
                var type = finishedWork.type;
                var props = finishedWork.memoizedProps;
                commitMount(_instance2, type, props, finishedWork);
              }

              return;
            }
          case HostText:
            {
              // We have no life-cycles associated with text.
              return;
            }
          case HostPortal:
            {
              // We have no life-cycles associated with portals.
              return;
            }
          default:
            {
              invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
            }
        }
      }

      function commitAttachRef(finishedWork) {
        var ref = finishedWork.ref;
        if (ref !== null) {
          var instance = finishedWork.stateNode;
          switch (finishedWork.tag) {
            case HostComponent:
              ref(getPublicInstance(instance));
              break;
            default:
              ref(instance);
          }
        }
      }

      function commitDetachRef(current) {
        var currentRef = current.ref;
        if (currentRef !== null) {
          currentRef(null);
        }
      }

      // User-originating errors (lifecycles and refs) should not interrupt
      // deletion, so don't let them throw. Host-originating errors should
      // interrupt deletion, so it's okay
      function commitUnmount(current) {
        if (typeof onCommitUnmount === 'function') {
          onCommitUnmount(current);
        }

        switch (current.tag) {
          case ClassComponent:
            {
              safelyDetachRef(current);
              var instance = current.stateNode;
              if (typeof instance.componentWillUnmount === 'function') {
                safelyCallComponentWillUnmount(current, instance);
              }
              return;
            }
          case HostComponent:
            {
              safelyDetachRef(current);
              return;
            }
          case CallComponent:
            {
              commitNestedUnmounts(current.stateNode);
              return;
            }
          case HostPortal:
            {
              // TODO: this is recursive.
              // We are also not using this parent because
              // the portal will get pushed immediately.
              if (enableMutatingReconciler && mutation) {
                unmountHostComponents(current);
              } else if (enablePersistentReconciler && persistence) {
                emptyPortalContainer(current);
              }
              return;
            }
        }
      }

      function commitNestedUnmounts(root) {
        // While we're inside a removed host node we don't want to call
        // removeChild on the inner nodes because they're removed by the top
        // call anyway. We also want to call componentWillUnmount on all
        // composites before this host node is removed from the tree. Therefore
        var node = root;
        while (true) {
          commitUnmount(node);
          // Visit children because they may contain more composite or host nodes.
          // Skip portals because commitUnmount() currently visits them recursively.
          if (node.child !== null && (
          // If we use mutation we drill down into portals using commitUnmount above.
          // If we don't use mutation we drill down into portals here instead.
          !mutation || node.tag !== HostPortal)) {
            node.child['return'] = node;
            node = node.child;
            continue;
          }
          if (node === root) {
            return;
          }
          while (node.sibling === null) {
            if (node['return'] === null || node['return'] === root) {
              return;
            }
            node = node['return'];
          }
          node.sibling['return'] = node['return'];
          node = node.sibling;
        }
      }

      function detachFiber(current) {
        // Cut off the return pointers to disconnect it from the tree. Ideally, we
        // should clear the child pointer of the parent alternate to let this
        // get GC:ed but we don't know which for sure which parent is the current
        // one so we'll settle for GC:ing the subtree of this child. This child
        // itself will be GC:ed when the parent updates the next time.
        current['return'] = null;
        current.child = null;
        if (current.alternate) {
          current.alternate.child = null;
          current.alternate['return'] = null;
        }
      }

      if (!mutation) {
        var commitContainer = void 0;
        if (persistence) {
          var replaceContainerChildren = persistence.replaceContainerChildren,
              createContainerChildSet = persistence.createContainerChildSet;

          var emptyPortalContainer = function emptyPortalContainer(current) {
            var portal = current.stateNode;
            var containerInfo = portal.containerInfo;

            var emptyChildSet = createContainerChildSet(containerInfo);
            replaceContainerChildren(containerInfo, emptyChildSet);
          };
          commitContainer = function commitContainer(finishedWork) {
            switch (finishedWork.tag) {
              case ClassComponent:
                {
                  return;
                }
              case HostComponent:
                {
                  return;
                }
              case HostText:
                {
                  return;
                }
              case HostRoot:
              case HostPortal:
                {
                  var portalOrRoot = finishedWork.stateNode;
                  var containerInfo = portalOrRoot.containerInfo,
                      _pendingChildren = portalOrRoot.pendingChildren;

                  replaceContainerChildren(containerInfo, _pendingChildren);
                  return;
                }
              default:
                {
                  invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
                }
            }
          };
        } else {
          commitContainer = function commitContainer(finishedWork) {
            // Noop
          };
        }
        if (enablePersistentReconciler || enableNoopReconciler) {
          return {
            commitResetTextContent: function commitResetTextContent(finishedWork) {},
            commitPlacement: function commitPlacement(finishedWork) {},
            commitDeletion: function commitDeletion(current) {
              // Detach refs and call componentWillUnmount() on the whole subtree.
              commitNestedUnmounts(current);
              detachFiber(current);
            },
            commitWork: function commitWork(current, finishedWork) {
              commitContainer(finishedWork);
            },

            commitLifeCycles: commitLifeCycles,
            commitAttachRef: commitAttachRef,
            commitDetachRef: commitDetachRef
          };
        } else if (persistence) {
          invariant(false, 'Persistent reconciler is disabled.');
        } else {
          invariant(false, 'Noop reconciler is disabled.');
        }
      }
      var commitMount = mutation.commitMount,
          commitUpdate = mutation.commitUpdate,
          resetTextContent = mutation.resetTextContent,
          commitTextUpdate = mutation.commitTextUpdate,
          appendChild = mutation.appendChild,
          appendChildToContainer = mutation.appendChildToContainer,
          insertBefore = mutation.insertBefore,
          insertInContainerBefore = mutation.insertInContainerBefore,
          removeChild = mutation.removeChild,
          removeChildFromContainer = mutation.removeChildFromContainer;

      function getHostParentFiber(fiber) {
        var parent = fiber['return'];
        while (parent !== null) {
          if (isHostParent(parent)) {
            return parent;
          }
          parent = parent['return'];
        }
        invariant(false, 'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.');
      }

      function isHostParent(fiber) {
        return fiber.tag === HostComponent || fiber.tag === HostRoot || fiber.tag === HostPortal;
      }

      function getHostSibling(fiber) {
        // We're going to search forward into the tree until we find a sibling host
        // node. Unfortunately, if multiple insertions are done in a row we have to
        // search past them. This leads to exponential search for the next sibling.
        var node = fiber;
        siblings: while (true) {
          // If we didn't find anything, let's try the next sibling.
          while (node.sibling === null) {
            if (node['return'] === null || isHostParent(node['return'])) {
              // If we pop out of the root or hit the parent the fiber we are the
              // last sibling.
              return null;
            }
            node = node['return'];
          }
          node.sibling['return'] = node['return'];
          node = node.sibling;
          while (node.tag !== HostComponent && node.tag !== HostText) {
            // If it is not host node and, we might have a host node inside it.
            // Try to search down until we find one.
            if (node.effectTag & Placement) {
              // If we don't have a child, try the siblings instead.
              continue siblings;
            }
            // If we don't have a child, try the siblings instead.
            // We also skip portals because they are not part of this host tree.
            if (node.child === null || node.tag === HostPortal) {
              continue siblings;
            } else {
              node.child['return'] = node;
              node = node.child;
            }
          }
          // Check if this host node is stable or about to be placed.
          if (!(node.effectTag & Placement)) {
            // Found it!
            return node.stateNode;
          }
        }
      }

      function commitPlacement(finishedWork) {
        // Recursively insert all host nodes into the parent.
        var parentFiber = getHostParentFiber(finishedWork);
        var parent = void 0;
        var isContainer = void 0;
        switch (parentFiber.tag) {
          case HostComponent:
            parent = parentFiber.stateNode;
            isContainer = false;
            break;
          case HostRoot:
            parent = parentFiber.stateNode.containerInfo;
            isContainer = true;
            break;
          case HostPortal:
            parent = parentFiber.stateNode.containerInfo;
            isContainer = true;
            break;
          default:
            invariant(false, 'Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.');
        }
        if (parentFiber.effectTag & ContentReset) {
          // Reset the text content of the parent before doing any insertions
          resetTextContent(parent);
          // Clear ContentReset from the effect tag
          parentFiber.effectTag &= ~ContentReset;
        }

        var before = getHostSibling(finishedWork);
        // We only have the top Fiber that was inserted but we need recurse down its
        // children to find all the terminal nodes.
        var node = finishedWork;
        while (true) {
          if (node.tag === HostComponent || node.tag === HostText) {
            if (before) {
              if (isContainer) {
                insertInContainerBefore(parent, node.stateNode, before);
              } else {
                insertBefore(parent, node.stateNode, before);
              }
            } else {
              if (isContainer) {
                appendChildToContainer(parent, node.stateNode);
              } else {
                appendChild(parent, node.stateNode);
              }
            }
          } else if (node.tag === HostPortal) {
            // If the insertion itself is a portal, then we don't want to traverse
            // down its children. Instead, we'll get insertions from each child in
            // the portal directly.
          } else if (node.child !== null) {
            node.child['return'] = node;
            node = node.child;
            continue;
          }
          if (node === finishedWork) {
            return;
          }
          while (node.sibling === null) {
            if (node['return'] === null || node['return'] === finishedWork) {
              return;
            }
            node = node['return'];
          }
          node.sibling['return'] = node['return'];
          node = node.sibling;
        }
      }

      function unmountHostComponents(current) {
        // We only have the top Fiber that was inserted but we need recurse down its
        var node = current;

        // Each iteration, currentParent is populated with node's host parent if not
        // currentParentIsValid.
        var currentParentIsValid = false;
        var currentParent = void 0;
        var currentParentIsContainer = void 0;

        while (true) {
          if (!currentParentIsValid) {
            var parent = node['return'];
            findParent: while (true) {
              !(parent !== null) ? invariant(false, 'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.') : void 0;
              switch (parent.tag) {
                case HostComponent:
                  currentParent = parent.stateNode;
                  currentParentIsContainer = false;
                  break findParent;
                case HostRoot:
                  currentParent = parent.stateNode.containerInfo;
                  currentParentIsContainer = true;
                  break findParent;
                case HostPortal:
                  currentParent = parent.stateNode.containerInfo;
                  currentParentIsContainer = true;
                  break findParent;
              }
              parent = parent['return'];
            }
            currentParentIsValid = true;
          }

          if (node.tag === HostComponent || node.tag === HostText) {
            commitNestedUnmounts(node);
            // After all the children have unmounted, it is now safe to remove the
            // node from the tree.
            if (currentParentIsContainer) {
              removeChildFromContainer(currentParent, node.stateNode);
            } else {
              removeChild(currentParent, node.stateNode);
            }
            // Don't visit children because we already visited them.
          } else if (node.tag === HostPortal) {
            // When we go into a portal, it becomes the parent to remove from.
            // We will reassign it back when we pop the portal on the way up.
            currentParent = node.stateNode.containerInfo;
            // Visit children because portals might contain host components.
            if (node.child !== null) {
              node.child['return'] = node;
              node = node.child;
              continue;
            }
          } else {
            commitUnmount(node);
            // Visit children because we may find more host components below.
            if (node.child !== null) {
              node.child['return'] = node;
              node = node.child;
              continue;
            }
          }
          if (node === current) {
            return;
          }
          while (node.sibling === null) {
            if (node['return'] === null || node['return'] === current) {
              return;
            }
            node = node['return'];
            if (node.tag === HostPortal) {
              // When we go out of the portal, we need to restore the parent.
              // Since we don't keep a stack of them, we will search for it.
              currentParentIsValid = false;
            }
          }
          node.sibling['return'] = node['return'];
          node = node.sibling;
        }
      }

      function commitDeletion(current) {
        // Recursively delete all host nodes from the parent.
        // Detach refs and call componentWillUnmount() on the whole subtree.
        unmountHostComponents(current);
        detachFiber(current);
      }

      function commitWork(current, finishedWork) {
        switch (finishedWork.tag) {
          case ClassComponent:
            {
              return;
            }
          case HostComponent:
            {
              var instance = finishedWork.stateNode;
              if (instance != null) {
                // Commit the work prepared earlier.
                var newProps = finishedWork.memoizedProps;
                // For hydration we reuse the update path but we treat the oldProps
                // as the newProps. The updatePayload will contain the real change in
                // this case.
                var oldProps = current !== null ? current.memoizedProps : newProps;
                var type = finishedWork.type;
                // TODO: Type the updateQueue to be specific to host components.
                var updatePayload = finishedWork.updateQueue;
                finishedWork.updateQueue = null;
                if (updatePayload !== null) {
                  commitUpdate(instance, updatePayload, type, oldProps, newProps, finishedWork);
                }
              }
              return;
            }
          case HostText:
            {
              !(finishedWork.stateNode !== null) ? invariant(false, 'This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.') : void 0;
              var textInstance = finishedWork.stateNode;
              var newText = finishedWork.memoizedProps;
              // For hydration we reuse the update path but we treat the oldProps
              // as the newProps. The updatePayload will contain the real change in
              // this case.
              var oldText = current !== null ? current.memoizedProps : newText;
              commitTextUpdate(textInstance, oldText, newText);
              return;
            }
          case HostRoot:
            {
              return;
            }
          default:
            {
              invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
            }
        }
      }

      function commitResetTextContent(current) {
        resetTextContent(current.stateNode);
      }

      if (enableMutatingReconciler) {
        return {
          commitResetTextContent: commitResetTextContent,
          commitPlacement: commitPlacement,
          commitDeletion: commitDeletion,
          commitWork: commitWork,
          commitLifeCycles: commitLifeCycles,
          commitAttachRef: commitAttachRef,
          commitDetachRef: commitDetachRef
        };
      } else {
        invariant(false, 'Mutating reconciler is disabled.');
      }
    };

    var NO_CONTEXT = {};

    var ReactFiberHostContext = function ReactFiberHostContext(config) {
      var getChildHostContext = config.getChildHostContext,
          getRootHostContext = config.getRootHostContext;

      var contextStackCursor = createCursor(NO_CONTEXT);
      var contextFiberStackCursor = createCursor(NO_CONTEXT);
      var rootInstanceStackCursor = createCursor(NO_CONTEXT);

      function requiredContext(c) {
        !(c !== NO_CONTEXT) ? invariant(false, 'Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        return c;
      }

      function getRootHostContainer() {
        var rootInstance = requiredContext(rootInstanceStackCursor.current);
        return rootInstance;
      }

      function pushHostContainer(fiber, nextRootInstance) {
        // Push current root instance onto the stack;
        // This allows us to reset root when portals are popped.
        push(rootInstanceStackCursor, nextRootInstance, fiber);

        var nextRootContext = getRootHostContext(nextRootInstance);

        // Track the context and the Fiber that provided it.
        // This enables us to pop only Fibers that provide unique contexts.
        push(contextFiberStackCursor, fiber, fiber);
        push(contextStackCursor, nextRootContext, fiber);
      }

      function popHostContainer(fiber) {
        pop(contextStackCursor, fiber);
        pop(contextFiberStackCursor, fiber);
        pop(rootInstanceStackCursor, fiber);
      }

      function getHostContext() {
        var context = requiredContext(contextStackCursor.current);
        return context;
      }

      function pushHostContext(fiber) {
        var rootInstance = requiredContext(rootInstanceStackCursor.current);
        var context = requiredContext(contextStackCursor.current);
        var nextContext = getChildHostContext(context, fiber.type, rootInstance);

        // Don't push this Fiber's context unless it's unique.
        if (context === nextContext) {
          return;
        }

        // Track the context and the Fiber that provided it.
        // This enables us to pop only Fibers that provide unique contexts.
        push(contextFiberStackCursor, fiber, fiber);
        push(contextStackCursor, nextContext, fiber);
      }

      function popHostContext(fiber) {
        // Do not pop unless this Fiber provided the current context.
        // pushHostContext() only pushes Fibers that provide unique contexts.
        if (contextFiberStackCursor.current !== fiber) {
          return;
        }

        pop(contextStackCursor, fiber);
        pop(contextFiberStackCursor, fiber);
      }

      function resetHostContainer() {
        contextStackCursor.current = NO_CONTEXT;
        rootInstanceStackCursor.current = NO_CONTEXT;
      }

      return {
        getHostContext: getHostContext,
        getRootHostContainer: getRootHostContainer,
        popHostContainer: popHostContainer,
        popHostContext: popHostContext,
        pushHostContainer: pushHostContainer,
        pushHostContext: pushHostContext,
        resetHostContainer: resetHostContainer
      };
    };

    var ReactFiberHydrationContext = function ReactFiberHydrationContext(config) {
      var shouldSetTextContent = config.shouldSetTextContent,
          hydration = config.hydration;

      // If this doesn't have hydration mode.

      if (!hydration) {
        return {
          enterHydrationState: function enterHydrationState() {
            return false;
          },
          resetHydrationState: function resetHydrationState() {},
          tryToClaimNextHydratableInstance: function tryToClaimNextHydratableInstance() {},
          prepareToHydrateHostInstance: function prepareToHydrateHostInstance() {
            invariant(false, 'Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
          },
          prepareToHydrateHostTextInstance: function prepareToHydrateHostTextInstance() {
            invariant(false, 'Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
          },
          popHydrationState: function popHydrationState(fiber) {
            return false;
          }
        };
      }

      var canHydrateInstance = hydration.canHydrateInstance,
          canHydrateTextInstance = hydration.canHydrateTextInstance,
          getNextHydratableSibling = hydration.getNextHydratableSibling,
          getFirstHydratableChild = hydration.getFirstHydratableChild,
          hydrateInstance = hydration.hydrateInstance,
          hydrateTextInstance = hydration.hydrateTextInstance,
          didNotMatchHydratedContainerTextInstance = hydration.didNotMatchHydratedContainerTextInstance,
          didNotMatchHydratedTextInstance = hydration.didNotMatchHydratedTextInstance,
          didNotHydrateContainerInstance = hydration.didNotHydrateContainerInstance,
          didNotHydrateInstance = hydration.didNotHydrateInstance,
          didNotFindHydratableContainerInstance = hydration.didNotFindHydratableContainerInstance,
          didNotFindHydratableContainerTextInstance = hydration.didNotFindHydratableContainerTextInstance,
          didNotFindHydratableInstance = hydration.didNotFindHydratableInstance,
          didNotFindHydratableTextInstance = hydration.didNotFindHydratableTextInstance;

      // The deepest Fiber on the stack involved in a hydration context.
      // This may have been an insertion or a hydration.

      var hydrationParentFiber = null;
      var nextHydratableInstance = null;
      var isHydrating = false;

      function enterHydrationState(fiber) {
        var parentInstance = fiber.stateNode.containerInfo;
        nextHydratableInstance = getFirstHydratableChild(parentInstance);
        hydrationParentFiber = fiber;
        isHydrating = true;
        return true;
      }

      function deleteHydratableInstance(returnFiber, instance) {
        {
          switch (returnFiber.tag) {
            case HostRoot:
              didNotHydrateContainerInstance(returnFiber.stateNode.containerInfo, instance);
              break;
            case HostComponent:
              didNotHydrateInstance(returnFiber.type, returnFiber.memoizedProps, returnFiber.stateNode, instance);
              break;
          }
        }

        var childToDelete = createFiberFromHostInstanceForDeletion();
        childToDelete.stateNode = instance;
        childToDelete['return'] = returnFiber;
        childToDelete.effectTag = Deletion;

        // This might seem like it belongs on progressedFirstDeletion. However,
        // these children are not part of the reconciliation list of children.
        // Even if we abort and rereconcile the children, that will try to hydrate
        // again and the nodes are still in the host tree so these will be
        // recreated.
        if (returnFiber.lastEffect !== null) {
          returnFiber.lastEffect.nextEffect = childToDelete;
          returnFiber.lastEffect = childToDelete;
        } else {
          returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
        }
      }

      function insertNonHydratedInstance(returnFiber, fiber) {
        fiber.effectTag |= Placement;
        {
          switch (returnFiber.tag) {
            case HostRoot:
              {
                var parentContainer = returnFiber.stateNode.containerInfo;
                switch (fiber.tag) {
                  case HostComponent:
                    var type = fiber.type;
                    var props = fiber.pendingProps;
                    didNotFindHydratableContainerInstance(parentContainer, type, props);
                    break;
                  case HostText:
                    var text = fiber.pendingProps;
                    didNotFindHydratableContainerTextInstance(parentContainer, text);
                    break;
                }
                break;
              }
            case HostComponent:
              {
                var parentType = returnFiber.type;
                var parentProps = returnFiber.memoizedProps;
                var parentInstance = returnFiber.stateNode;
                switch (fiber.tag) {
                  case HostComponent:
                    var _type = fiber.type;
                    var _props = fiber.pendingProps;
                    didNotFindHydratableInstance(parentType, parentProps, parentInstance, _type, _props);
                    break;
                  case HostText:
                    var _text = fiber.pendingProps;
                    didNotFindHydratableTextInstance(parentType, parentProps, parentInstance, _text);
                    break;
                }
                break;
              }
            default:
              return;
          }
        }
      }

      function tryHydrate(fiber, nextInstance) {
        switch (fiber.tag) {
          case HostComponent:
            {
              var type = fiber.type;
              var props = fiber.pendingProps;
              var instance = canHydrateInstance(nextInstance, type, props);
              if (instance !== null) {
                fiber.stateNode = instance;
                return true;
              }
              return false;
            }
          case HostText:
            {
              var text = fiber.pendingProps;
              var textInstance = canHydrateTextInstance(nextInstance, text);
              if (textInstance !== null) {
                fiber.stateNode = textInstance;
                return true;
              }
              return false;
            }
          default:
            return false;
        }
      }

      function tryToClaimNextHydratableInstance(fiber) {
        if (!isHydrating) {
          return;
        }
        var nextInstance = nextHydratableInstance;
        if (!nextInstance) {
          // Nothing to hydrate. Make it an insertion.
          insertNonHydratedInstance(hydrationParentFiber, fiber);
          isHydrating = false;
          hydrationParentFiber = fiber;
          return;
        }
        if (!tryHydrate(fiber, nextInstance)) {
          // If we can't hydrate this instance let's try the next one.
          // We use this as a heuristic. It's based on intuition and not data so it
          // might be flawed or unnecessary.
          nextInstance = getNextHydratableSibling(nextInstance);
          if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
            // Nothing to hydrate. Make it an insertion.
            insertNonHydratedInstance(hydrationParentFiber, fiber);
            isHydrating = false;
            hydrationParentFiber = fiber;
            return;
          }
          // We matched the next one, we'll now assume that the first one was
          // superfluous and we'll delete it. Since we can't eagerly delete it
          // we'll have to schedule a deletion. To do that, this node needs a dummy
          // fiber associated with it.
          deleteHydratableInstance(hydrationParentFiber, nextHydratableInstance);
        }
        hydrationParentFiber = fiber;
        nextHydratableInstance = getFirstHydratableChild(nextInstance);
      }

      function prepareToHydrateHostInstance(fiber, rootContainerInstance, hostContext) {
        var instance = fiber.stateNode;
        var updatePayload = hydrateInstance(instance, fiber.type, fiber.memoizedProps, rootContainerInstance, hostContext, fiber);
        // TODO: Type this specific to this type of component.
        fiber.updateQueue = updatePayload;
        // If the update payload indicates that there is a change or if there
        // is a new ref we mark this as an update.
        if (updatePayload !== null) {
          return true;
        }
        return false;
      }

      function prepareToHydrateHostTextInstance(fiber) {
        var textInstance = fiber.stateNode;
        var textContent = fiber.memoizedProps;
        var shouldUpdate = hydrateTextInstance(textInstance, textContent, fiber);
        {
          if (shouldUpdate) {
            // We assume that prepareToHydrateHostTextInstance is called in a context where the
            // hydration parent is the parent host component of this host text.
            var returnFiber = hydrationParentFiber;
            if (returnFiber !== null) {
              switch (returnFiber.tag) {
                case HostRoot:
                  {
                    var parentContainer = returnFiber.stateNode.containerInfo;
                    didNotMatchHydratedContainerTextInstance(parentContainer, textInstance, textContent);
                    break;
                  }
                case HostComponent:
                  {
                    var parentType = returnFiber.type;
                    var parentProps = returnFiber.memoizedProps;
                    var parentInstance = returnFiber.stateNode;
                    didNotMatchHydratedTextInstance(parentType, parentProps, parentInstance, textInstance, textContent);
                    break;
                  }
              }
            }
          }
        }
        return shouldUpdate;
      }

      function popToNextHostParent(fiber) {
        var parent = fiber['return'];
        while (parent !== null && parent.tag !== HostComponent && parent.tag !== HostRoot) {
          parent = parent['return'];
        }
        hydrationParentFiber = parent;
      }

      function popHydrationState(fiber) {
        if (fiber !== hydrationParentFiber) {
          // We're deeper than the current hydration context, inside an inserted
          // tree.
          return false;
        }
        if (!isHydrating) {
          // If we're not currently hydrating but we're in a hydration context, then
          // we were an insertion and now need to pop up reenter hydration of our
          // siblings.
          popToNextHostParent(fiber);
          isHydrating = true;
          return false;
        }

        var type = fiber.type;

        // If we have any remaining hydratable nodes, we need to delete them now.
        // We only do this deeper than head and body since they tend to have random
        // other nodes in them. We also ignore components with pure text content in
        // side of them.
        // TODO: Better heuristic.
        if (fiber.tag !== HostComponent || type !== 'head' && type !== 'body' && !shouldSetTextContent(type, fiber.memoizedProps)) {
          var nextInstance = nextHydratableInstance;
          while (nextInstance) {
            deleteHydratableInstance(fiber, nextInstance);
            nextInstance = getNextHydratableSibling(nextInstance);
          }
        }

        popToNextHostParent(fiber);
        nextHydratableInstance = hydrationParentFiber ? getNextHydratableSibling(fiber.stateNode) : null;
        return true;
      }

      function resetHydrationState() {
        hydrationParentFiber = null;
        nextHydratableInstance = null;
        isHydrating = false;
      }

      return {
        enterHydrationState: enterHydrationState,
        resetHydrationState: resetHydrationState,
        tryToClaimNextHydratableInstance: tryToClaimNextHydratableInstance,
        prepareToHydrateHostInstance: prepareToHydrateHostInstance,
        prepareToHydrateHostTextInstance: prepareToHydrateHostTextInstance,
        popHydrationState: popHydrationState
      };
    };

    // This lets us hook into Fiber to debug what it's doing.
    // See https://github.com/facebook/react/pull/8033.
    // This is not part of the public API, not even for React DevTools.
    // You may only inject a debugTool if you work on React Fiber itself.
    var ReactFiberInstrumentation = {
      debugTool: null
    };

    var ReactFiberInstrumentation_1 = ReactFiberInstrumentation;

    var defaultShowDialog = function defaultShowDialog(capturedError) {
      return true;
    };

    var showDialog = defaultShowDialog;

    function logCapturedError(capturedError) {
      var logError = showDialog(capturedError);

      // Allow injected showDialog() to prevent default console.error logging.
      // This enables renderers like ReactNative to better manage redbox behavior.
      if (logError === false) {
        return;
      }

      var error = capturedError.error;
      var suppressLogging = error && error.suppressReactErrorLogging;
      if (suppressLogging) {
        return;
      }

      {
        var componentName = capturedError.componentName,
            componentStack = capturedError.componentStack,
            errorBoundaryName = capturedError.errorBoundaryName,
            errorBoundaryFound = capturedError.errorBoundaryFound,
            willRetry = capturedError.willRetry;

        var componentNameMessage = componentName ? 'The above error occurred in the <' + componentName + '> component:' : 'The above error occurred in one of your React components:';

        var errorBoundaryMessage = void 0;
        // errorBoundaryFound check is sufficient; errorBoundaryName check is to satisfy Flow.
        if (errorBoundaryFound && errorBoundaryName) {
          if (willRetry) {
            errorBoundaryMessage = 'React will try to recreate this component tree from scratch ' + ('using the error boundary you provided, ' + errorBoundaryName + '.');
          } else {
            errorBoundaryMessage = 'This error was initially handled by the error boundary ' + errorBoundaryName + '.\n' + 'Recreating the tree from scratch failed so React will unmount the tree.';
          }
        } else {
          errorBoundaryMessage = 'Consider adding an error boundary to your tree to customize error handling behavior.\n' + 'Visit https://fb.me/react-error-boundaries to learn more about error boundaries.';
        }
        var combinedMessage = '' + componentNameMessage + componentStack + '\n\n' + ('' + errorBoundaryMessage);

        // In development, we provide our own message with just the component stack.
        // We don't include the original error message and JS stack because the browser
        // has already printed it. Even if the application swallows the error, it is still
        // displayed by the browser thanks to the DEV-only fake event trick in ReactErrorUtils.
        console.error(combinedMessage);
      }
    }

    var invokeGuardedCallback = ReactErrorUtils.invokeGuardedCallback;
    var hasCaughtError = ReactErrorUtils.hasCaughtError;
    var clearCaughtError = ReactErrorUtils.clearCaughtError;

    {
      var didWarnAboutStateTransition = false;
      var didWarnSetStateChildContext = false;
      var didWarnStateUpdateForUnmountedComponent = {};

      var warnAboutUpdateOnUnmounted = function warnAboutUpdateOnUnmounted(fiber) {
        var componentName = getComponentName(fiber) || 'ReactClass';
        if (didWarnStateUpdateForUnmountedComponent[componentName]) {
          return;
        }
        warning(false, 'Can only update a mounted or mounting ' + 'component. This usually means you called setState, replaceState, ' + 'or forceUpdate on an unmounted component. This is a no-op.\n\nPlease ' + 'check the code for the %s component.', componentName);
        didWarnStateUpdateForUnmountedComponent[componentName] = true;
      };

      var warnAboutInvalidUpdates = function warnAboutInvalidUpdates(instance) {
        switch (ReactDebugCurrentFiber.phase) {
          case 'getChildContext':
            if (didWarnSetStateChildContext) {
              return;
            }
            warning(false, 'setState(...): Cannot call setState() inside getChildContext()');
            didWarnSetStateChildContext = true;
            break;
          case 'render':
            if (didWarnAboutStateTransition) {
              return;
            }
            warning(false, 'Cannot update during an existing state transition (such as within ' + "`render` or another component's constructor). Render methods should " + 'be a pure function of props and state; constructor side-effects are ' + 'an anti-pattern, but can be moved to `componentWillMount`.');
            didWarnAboutStateTransition = true;
            break;
        }
      };
    }

    var ReactFiberScheduler = function ReactFiberScheduler(config) {
      var hostContext = ReactFiberHostContext(config);
      var hydrationContext = ReactFiberHydrationContext(config);
      var popHostContainer = hostContext.popHostContainer,
          popHostContext = hostContext.popHostContext,
          resetHostContainer = hostContext.resetHostContainer;

      var _ReactFiberBeginWork = ReactFiberBeginWork(config, hostContext, hydrationContext, scheduleWork, computeExpirationForFiber),
          beginWork = _ReactFiberBeginWork.beginWork,
          beginFailedWork = _ReactFiberBeginWork.beginFailedWork;

      var _ReactFiberCompleteWo = ReactFiberCompleteWork(config, hostContext, hydrationContext),
          completeWork = _ReactFiberCompleteWo.completeWork;

      var _ReactFiberCommitWork = ReactFiberCommitWork(config, captureError),
          commitResetTextContent = _ReactFiberCommitWork.commitResetTextContent,
          commitPlacement = _ReactFiberCommitWork.commitPlacement,
          commitDeletion = _ReactFiberCommitWork.commitDeletion,
          commitWork = _ReactFiberCommitWork.commitWork,
          commitLifeCycles = _ReactFiberCommitWork.commitLifeCycles,
          commitAttachRef = _ReactFiberCommitWork.commitAttachRef,
          commitDetachRef = _ReactFiberCommitWork.commitDetachRef;

      var now = config.now,
          scheduleDeferredCallback = config.scheduleDeferredCallback,
          cancelDeferredCallback = config.cancelDeferredCallback,
          useSyncScheduling = config.useSyncScheduling,
          prepareForCommit = config.prepareForCommit,
          resetAfterCommit = config.resetAfterCommit;

      // Represents the current time in ms.

      var startTime = now();
      var mostRecentCurrentTime = msToExpirationTime(0);

      // Represents the expiration time that incoming updates should use. (If this
      // is NoWork, use the default strategy: async updates in async mode, sync
      // updates in sync mode.)
      var expirationContext = NoWork;

      var isWorking = false;

      // The next work in progress fiber that we're currently working on.
      var nextUnitOfWork = null;
      var nextRoot = null;
      // The time at which we're currently rendering work.
      var nextRenderExpirationTime = NoWork;

      // The next fiber with an effect that we're currently committing.
      var nextEffect = null;

      // Keep track of which fibers have captured an error that need to be handled.
      // Work is removed from this collection after componentDidCatch is called.
      var capturedErrors = null;
      // Keep track of which fibers have failed during the current batch of work.
      // This is a different set than capturedErrors, because it is not reset until
      // the end of the batch. This is needed to propagate errors correctly if a
      // subtree fails more than once.
      var failedBoundaries = null;
      // Error boundaries that captured an error during the current commit.
      var commitPhaseBoundaries = null;
      var firstUncaughtError = null;
      var didFatal = false;

      var isCommitting = false;
      var isUnmounting = false;

      // Used for performance tracking.
      var interruptedBy = null;

      function resetContextStack() {
        // Reset the stack
        reset();
        // Reset the cursors
        resetContext();
        resetHostContainer();
      }

      function commitAllHostEffects() {
        while (nextEffect !== null) {
          {
            ReactDebugCurrentFiber.setCurrentFiber(nextEffect);
          }
          recordEffect();

          var effectTag = nextEffect.effectTag;
          if (effectTag & ContentReset) {
            commitResetTextContent(nextEffect);
          }

          if (effectTag & Ref) {
            var current = nextEffect.alternate;
            if (current !== null) {
              commitDetachRef(current);
            }
          }

          // The following switch statement is only concerned about placement,
          // updates, and deletions. To avoid needing to add a case for every
          // possible bitmap value, we remove the secondary effects from the
          // effect tag and switch on that value.
          var primaryEffectTag = effectTag & ~(Callback | Err | ContentReset | Ref | PerformedWork);
          switch (primaryEffectTag) {
            case Placement:
              {
                commitPlacement(nextEffect);
                // Clear the "placement" from effect tag so that we know that this is inserted, before
                // any life-cycles like componentDidMount gets called.
                // TODO: findDOMNode doesn't rely on this any more but isMounted
                // does and isMounted is deprecated anyway so we should be able
                // to kill this.
                nextEffect.effectTag &= ~Placement;
                break;
              }
            case PlacementAndUpdate:
              {
                // Placement
                commitPlacement(nextEffect);
                // Clear the "placement" from effect tag so that we know that this is inserted, before
                // any life-cycles like componentDidMount gets called.
                nextEffect.effectTag &= ~Placement;

                // Update
                var _current = nextEffect.alternate;
                commitWork(_current, nextEffect);
                break;
              }
            case Update:
              {
                var _current2 = nextEffect.alternate;
                commitWork(_current2, nextEffect);
                break;
              }
            case Deletion:
              {
                isUnmounting = true;
                commitDeletion(nextEffect);
                isUnmounting = false;
                break;
              }
          }
          nextEffect = nextEffect.nextEffect;
        }

        {
          ReactDebugCurrentFiber.resetCurrentFiber();
        }
      }

      function commitAllLifeCycles() {
        while (nextEffect !== null) {
          var effectTag = nextEffect.effectTag;

          if (effectTag & (Update | Callback)) {
            recordEffect();
            var current = nextEffect.alternate;
            commitLifeCycles(current, nextEffect);
          }

          if (effectTag & Ref) {
            recordEffect();
            commitAttachRef(nextEffect);
          }

          if (effectTag & Err) {
            recordEffect();
            commitErrorHandling(nextEffect);
          }

          var next = nextEffect.nextEffect;
          // Ensure that we clean these up so that we don't accidentally keep them.
          // I'm not actually sure this matters because we can't reset firstEffect
          // and lastEffect since they're on every node, not just the effectful
          // ones. So we have to clean everything as we reuse nodes anyway.
          nextEffect.nextEffect = null;
          // Ensure that we reset the effectTag here so that we can rely on effect
          // tags to reason about the current life-cycle.
          nextEffect = next;
        }
      }

      function commitRoot(finishedWork) {
        // We keep track of this so that captureError can collect any boundaries
        // that capture an error during the commit phase. The reason these aren't
        // local to this function is because errors that occur during cWU are
        // captured elsewhere, to prevent the unmount from being interrupted.
        isWorking = true;
        isCommitting = true;
        startCommitTimer();

        var root = finishedWork.stateNode;
        !(root.current !== finishedWork) ? invariant(false, 'Cannot commit the same tree as before. This is probably a bug related to the return field. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        root.isReadyForCommit = false;

        // Reset this to null before calling lifecycles
        ReactCurrentOwner.current = null;

        var firstEffect = void 0;
        if (finishedWork.effectTag > PerformedWork) {
          // A fiber's effect list consists only of its children, not itself. So if
          // the root has an effect, we need to add it to the end of the list. The
          // resulting list is the set that would belong to the root's parent, if
          // it had one; that is, all the effects in the tree including the root.
          if (finishedWork.lastEffect !== null) {
            finishedWork.lastEffect.nextEffect = finishedWork;
            firstEffect = finishedWork.firstEffect;
          } else {
            firstEffect = finishedWork;
          }
        } else {
          // There is no effect on the root.
          firstEffect = finishedWork.firstEffect;
        }

        prepareForCommit();

        // Commit all the side-effects within a tree. We'll do this in two passes.
        // The first pass performs all the host insertions, updates, deletions and
        // ref unmounts.
        nextEffect = firstEffect;
        startCommitHostEffectsTimer();
        while (nextEffect !== null) {
          var didError = false;
          var _error = void 0;
          {
            invokeGuardedCallback(null, commitAllHostEffects, null);
            if (hasCaughtError()) {
              didError = true;
              _error = clearCaughtError();
            }
          }
          if (didError) {
            !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
            captureError(nextEffect, _error);
            // Clean-up
            if (nextEffect !== null) {
              nextEffect = nextEffect.nextEffect;
            }
          }
        }
        stopCommitHostEffectsTimer();

        resetAfterCommit();

        // The work-in-progress tree is now the current tree. This must come after
        // the first pass of the commit phase, so that the previous tree is still
        // current during componentWillUnmount, but before the second pass, so that
        // the finished work is current during componentDidMount/Update.
        root.current = finishedWork;

        // In the second pass we'll perform all life-cycles and ref callbacks.
        // Life-cycles happen as a separate pass so that all placements, updates,
        // and deletions in the entire tree have already been invoked.
        // This pass also triggers any renderer-specific initial effects.
        nextEffect = firstEffect;
        startCommitLifeCyclesTimer();
        while (nextEffect !== null) {
          var _didError = false;
          var _error2 = void 0;
          {
            invokeGuardedCallback(null, commitAllLifeCycles, null);
            if (hasCaughtError()) {
              _didError = true;
              _error2 = clearCaughtError();
            }
          }
          if (_didError) {
            !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
            captureError(nextEffect, _error2);
            if (nextEffect !== null) {
              nextEffect = nextEffect.nextEffect;
            }
          }
        }

        isCommitting = false;
        isWorking = false;
        stopCommitLifeCyclesTimer();
        stopCommitTimer();
        if (typeof onCommitRoot === 'function') {
          onCommitRoot(finishedWork.stateNode);
        }
        if (true && ReactFiberInstrumentation_1.debugTool) {
          ReactFiberInstrumentation_1.debugTool.onCommitWork(finishedWork);
        }

        // If we caught any errors during this commit, schedule their boundaries
        // to update.
        if (commitPhaseBoundaries) {
          commitPhaseBoundaries.forEach(scheduleErrorRecovery);
          commitPhaseBoundaries = null;
        }

        if (firstUncaughtError !== null) {
          var _error3 = firstUncaughtError;
          firstUncaughtError = null;
          onUncaughtError(_error3);
        }

        var remainingTime = root.current.expirationTime;

        if (remainingTime === NoWork) {
          capturedErrors = null;
          failedBoundaries = null;
        }

        return remainingTime;
      }

      function resetExpirationTime(workInProgress, renderTime) {
        if (renderTime !== Never && workInProgress.expirationTime === Never) {
          // The children of this component are hidden. Don't bubble their
          // expiration times.
          return;
        }

        // Check for pending updates.
        var newExpirationTime = getUpdateExpirationTime(workInProgress);

        // TODO: Calls need to visit stateNode

        // Bubble up the earliest expiration time.
        var child = workInProgress.child;
        while (child !== null) {
          if (child.expirationTime !== NoWork && (newExpirationTime === NoWork || newExpirationTime > child.expirationTime)) {
            newExpirationTime = child.expirationTime;
          }
          child = child.sibling;
        }
        workInProgress.expirationTime = newExpirationTime;
      }

      function completeUnitOfWork(workInProgress) {
        while (true) {
          // The current, flushed, state of this fiber is the alternate.
          // Ideally nothing should rely on this, but relying on it here
          // means that we don't need an additional field on the work in
          // progress.
          var current = workInProgress.alternate;
          {
            ReactDebugCurrentFiber.setCurrentFiber(workInProgress);
          }
          var next = completeWork(current, workInProgress, nextRenderExpirationTime);
          {
            ReactDebugCurrentFiber.resetCurrentFiber();
          }

          var returnFiber = workInProgress['return'];
          var siblingFiber = workInProgress.sibling;

          resetExpirationTime(workInProgress, nextRenderExpirationTime);

          if (next !== null) {
            stopWorkTimer(workInProgress);
            if (true && ReactFiberInstrumentation_1.debugTool) {
              ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
            }
            // If completing this work spawned new work, do that next. We'll come
            // back here again.
            return next;
          }

          if (returnFiber !== null) {
            // Append all the effects of the subtree and this fiber onto the effect
            // list of the parent. The completion order of the children affects the
            // side-effect order.
            if (returnFiber.firstEffect === null) {
              returnFiber.firstEffect = workInProgress.firstEffect;
            }
            if (workInProgress.lastEffect !== null) {
              if (returnFiber.lastEffect !== null) {
                returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
              }
              returnFiber.lastEffect = workInProgress.lastEffect;
            }

            // If this fiber had side-effects, we append it AFTER the children's
            // side-effects. We can perform certain side-effects earlier if
            // needed, by doing multiple passes over the effect list. We don't want
            // to schedule our own side-effect on our own list because if end up
            // reusing children we'll schedule this effect onto itself since we're
            // at the end.
            var effectTag = workInProgress.effectTag;
            // Skip both NoWork and PerformedWork tags when creating the effect list.
            // PerformedWork effect is read by React DevTools but shouldn't be committed.
            if (effectTag > PerformedWork) {
              if (returnFiber.lastEffect !== null) {
                returnFiber.lastEffect.nextEffect = workInProgress;
              } else {
                returnFiber.firstEffect = workInProgress;
              }
              returnFiber.lastEffect = workInProgress;
            }
          }

          stopWorkTimer(workInProgress);
          if (true && ReactFiberInstrumentation_1.debugTool) {
            ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
          }

          if (siblingFiber !== null) {
            // If there is more work to do in this returnFiber, do that next.
            return siblingFiber;
          } else if (returnFiber !== null) {
            // If there's no more work in this returnFiber. Complete the returnFiber.
            workInProgress = returnFiber;
            continue;
          } else {
            // We've reached the root.
            var root = workInProgress.stateNode;
            root.isReadyForCommit = true;
            return null;
          }
        }

        // Without this explicit null return Flow complains of invalid return type
        // TODO Remove the above while(true) loop
        // eslint-disable-next-line no-unreachable
        return null;
      }

      function performUnitOfWork(workInProgress) {
        // The current, flushed, state of this fiber is the alternate.
        // Ideally nothing should rely on this, but relying on it here
        // means that we don't need an additional field on the work in
        // progress.
        var current = workInProgress.alternate;

        // See if beginning this work spawns more work.
        startWorkTimer(workInProgress);
        {
          ReactDebugCurrentFiber.setCurrentFiber(workInProgress);
        }

        var next = beginWork(current, workInProgress, nextRenderExpirationTime);
        {
          ReactDebugCurrentFiber.resetCurrentFiber();
        }
        if (true && ReactFiberInstrumentation_1.debugTool) {
          ReactFiberInstrumentation_1.debugTool.onBeginWork(workInProgress);
        }

        if (next === null) {
          // If this doesn't spawn new work, complete the current work.
          next = completeUnitOfWork(workInProgress);
        }

        ReactCurrentOwner.current = null;

        return next;
      }

      function performFailedUnitOfWork(workInProgress) {
        // The current, flushed, state of this fiber is the alternate.
        // Ideally nothing should rely on this, but relying on it here
        // means that we don't need an additional field on the work in
        // progress.
        var current = workInProgress.alternate;

        // See if beginning this work spawns more work.
        startWorkTimer(workInProgress);
        {
          ReactDebugCurrentFiber.setCurrentFiber(workInProgress);
        }
        var next = beginFailedWork(current, workInProgress, nextRenderExpirationTime);
        {
          ReactDebugCurrentFiber.resetCurrentFiber();
        }
        if (true && ReactFiberInstrumentation_1.debugTool) {
          ReactFiberInstrumentation_1.debugTool.onBeginWork(workInProgress);
        }

        if (next === null) {
          // If this doesn't spawn new work, complete the current work.
          next = completeUnitOfWork(workInProgress);
        }

        ReactCurrentOwner.current = null;

        return next;
      }

      function workLoop(expirationTime) {
        if (capturedErrors !== null) {
          // If there are unhandled errors, switch to the slow work loop.
          // TODO: How to avoid this check in the fast path? Maybe the renderer
          // could keep track of which roots have unhandled errors and call a
          // forked version of renderRoot.
          slowWorkLoopThatChecksForFailedWork(expirationTime);
          return;
        }
        if (nextRenderExpirationTime === NoWork || nextRenderExpirationTime > expirationTime) {
          return;
        }

        if (nextRenderExpirationTime <= mostRecentCurrentTime) {
          // Flush all expired work.
          while (nextUnitOfWork !== null) {
            nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
          }
        } else {
          // Flush asynchronous work until the deadline runs out of time.
          while (nextUnitOfWork !== null && !shouldYield()) {
            nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
          }
        }
      }

      function slowWorkLoopThatChecksForFailedWork(expirationTime) {
        if (nextRenderExpirationTime === NoWork || nextRenderExpirationTime > expirationTime) {
          return;
        }

        if (nextRenderExpirationTime <= mostRecentCurrentTime) {
          // Flush all expired work.
          while (nextUnitOfWork !== null) {
            if (hasCapturedError(nextUnitOfWork)) {
              // Use a forked version of performUnitOfWork
              nextUnitOfWork = performFailedUnitOfWork(nextUnitOfWork);
            } else {
              nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
            }
          }
        } else {
          // Flush asynchronous work until the deadline runs out of time.
          while (nextUnitOfWork !== null && !shouldYield()) {
            if (hasCapturedError(nextUnitOfWork)) {
              // Use a forked version of performUnitOfWork
              nextUnitOfWork = performFailedUnitOfWork(nextUnitOfWork);
            } else {
              nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
            }
          }
        }
      }

      function renderRootCatchBlock(root, failedWork, boundary, expirationTime) {
        // We're going to restart the error boundary that captured the error.
        // Conceptually, we're unwinding the stack. We need to unwind the
        // context stack, too.
        unwindContexts(failedWork, boundary);

        // Restart the error boundary using a forked version of
        // performUnitOfWork that deletes the boundary's children. The entire
        // failed subree will be unmounted. During the commit phase, a special
        // lifecycle method is called on the error boundary, which triggers
        // a re-render.
        nextUnitOfWork = performFailedUnitOfWork(boundary);

        // Continue working.
        workLoop(expirationTime);
      }

      function renderRoot(root, expirationTime) {
        !!isWorking ? invariant(false, 'renderRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        isWorking = true;

        // We're about to mutate the work-in-progress tree. If the root was pending
        // commit, it no longer is: we'll need to complete it again.
        root.isReadyForCommit = false;

        // Check if we're starting from a fresh stack, or if we're resuming from
        // previously yielded work.
        if (root !== nextRoot || expirationTime !== nextRenderExpirationTime || nextUnitOfWork === null) {
          // Reset the stack and start working from the root.
          resetContextStack();
          nextRoot = root;
          nextRenderExpirationTime = expirationTime;
          nextUnitOfWork = createWorkInProgress(nextRoot.current, null, expirationTime);
        }

        startWorkLoopTimer(nextUnitOfWork);

        var didError = false;
        var error = null;
        {
          invokeGuardedCallback(null, workLoop, null, expirationTime);
          if (hasCaughtError()) {
            didError = true;
            error = clearCaughtError();
          }
        }

        // An error was thrown during the render phase.
        while (didError) {
          if (didFatal) {
            // This was a fatal error. Don't attempt to recover from it.
            firstUncaughtError = error;
            break;
          }

          var failedWork = nextUnitOfWork;
          if (failedWork === null) {
            // An error was thrown but there's no current unit of work. This can
            // happen during the commit phase if there's a bug in the renderer.
            didFatal = true;
            continue;
          }

          // "Capture" the error by finding the nearest boundary. If there is no
          // error boundary, we use the root.
          var boundary = captureError(failedWork, error);
          !(boundary !== null) ? invariant(false, 'Should have found an error boundary. This error is likely caused by a bug in React. Please file an issue.') : void 0;

          if (didFatal) {
            // The error we just captured was a fatal error. This happens
            // when the error propagates to the root more than once.
            continue;
          }

          didError = false;
          error = null;
          {
            invokeGuardedCallback(null, renderRootCatchBlock, null, root, failedWork, boundary, expirationTime);
            if (hasCaughtError()) {
              didError = true;
              error = clearCaughtError();
              continue;
            }
          }
          // We're finished working. Exit the error loop.
          break;
        }

        var uncaughtError = firstUncaughtError;

        // We're done performing work. Time to clean up.
        stopWorkLoopTimer(interruptedBy);
        interruptedBy = null;
        isWorking = false;
        didFatal = false;
        firstUncaughtError = null;

        if (uncaughtError !== null) {
          onUncaughtError(uncaughtError);
        }

        return root.isReadyForCommit ? root.current.alternate : null;
      }

      // Returns the boundary that captured the error, or null if the error is ignored
      function captureError(failedWork, error) {
        // It is no longer valid because we exited the user code.
        ReactCurrentOwner.current = null;
        {
          ReactDebugCurrentFiber.resetCurrentFiber();
        }

        // Search for the nearest error boundary.
        var boundary = null;

        // Passed to logCapturedError()
        var errorBoundaryFound = false;
        var willRetry = false;
        var errorBoundaryName = null;

        // Host containers are a special case. If the failed work itself is a host
        // container, then it acts as its own boundary. In all other cases, we
        // ignore the work itself and only search through the parents.
        if (failedWork.tag === HostRoot) {
          boundary = failedWork;

          if (isFailedBoundary(failedWork)) {
            // If this root already failed, there must have been an error when
            // attempting to unmount it. This is a worst-case scenario and
            // should only be possible if there's a bug in the renderer.
            didFatal = true;
          }
        } else {
          var node = failedWork['return'];
          while (node !== null && boundary === null) {
            if (node.tag === ClassComponent) {
              var instance = node.stateNode;
              if (typeof instance.componentDidCatch === 'function') {
                errorBoundaryFound = true;
                errorBoundaryName = getComponentName(node);

                // Found an error boundary!
                boundary = node;
                willRetry = true;
              }
            } else if (node.tag === HostRoot) {
              // Treat the root like a no-op error boundary
              boundary = node;
            }

            if (isFailedBoundary(node)) {
              // This boundary is already in a failed state.

              // If we're currently unmounting, that means this error was
              // thrown while unmounting a failed subtree. We should ignore
              // the error.
              if (isUnmounting) {
                return null;
              }

              // If we're in the commit phase, we should check to see if
              // this boundary already captured an error during this commit.
              // This case exists because multiple errors can be thrown during
              // a single commit without interruption.
              if (commitPhaseBoundaries !== null && (commitPhaseBoundaries.has(node) || node.alternate !== null && commitPhaseBoundaries.has(node.alternate))) {
                // If so, we should ignore this error.
                return null;
              }

              // The error should propagate to the next boundary -— we keep looking.
              boundary = null;
              willRetry = false;
            }

            node = node['return'];
          }
        }

        if (boundary !== null) {
          // Add to the collection of failed boundaries. This lets us know that
          // subsequent errors in this subtree should propagate to the next boundary.
          if (failedBoundaries === null) {
            failedBoundaries = new Set();
          }
          failedBoundaries.add(boundary);

          // This method is unsafe outside of the begin and complete phases.
          // We might be in the commit phase when an error is captured.
          // The risk is that the return path from this Fiber may not be accurate.
          // That risk is acceptable given the benefit of providing users more context.
          var _componentStack = getStackAddendumByWorkInProgressFiber(failedWork);
          var _componentName = getComponentName(failedWork);

          // Add to the collection of captured errors. This is stored as a global
          // map of errors and their component stack location keyed by the boundaries
          // that capture them. We mostly use this Map as a Set; it's a Map only to
          // avoid adding a field to Fiber to store the error.
          if (capturedErrors === null) {
            capturedErrors = new Map();
          }

          var capturedError = {
            componentName: _componentName,
            componentStack: _componentStack,
            error: error,
            errorBoundary: errorBoundaryFound ? boundary.stateNode : null,
            errorBoundaryFound: errorBoundaryFound,
            errorBoundaryName: errorBoundaryName,
            willRetry: willRetry
          };

          capturedErrors.set(boundary, capturedError);

          try {
            logCapturedError(capturedError);
          } catch (e) {
            // Prevent cycle if logCapturedError() throws.
            // A cycle may still occur if logCapturedError renders a component that throws.
            var suppressLogging = e && e.suppressReactErrorLogging;
            if (!suppressLogging) {
              console.error(e);
            }
          }

          // If we're in the commit phase, defer scheduling an update on the
          // boundary until after the commit is complete
          if (isCommitting) {
            if (commitPhaseBoundaries === null) {
              commitPhaseBoundaries = new Set();
            }
            commitPhaseBoundaries.add(boundary);
          } else {
            // Otherwise, schedule an update now.
            // TODO: Is this actually necessary during the render phase? Is it
            // possible to unwind and continue rendering at the same priority,
            // without corrupting internal state?
            scheduleErrorRecovery(boundary);
          }
          return boundary;
        } else if (firstUncaughtError === null) {
          // If no boundary is found, we'll need to throw the error
          firstUncaughtError = error;
        }
        return null;
      }

      function hasCapturedError(fiber) {
        // TODO: capturedErrors should store the boundary instance, to avoid needing
        // to check the alternate.
        return capturedErrors !== null && (capturedErrors.has(fiber) || fiber.alternate !== null && capturedErrors.has(fiber.alternate));
      }

      function isFailedBoundary(fiber) {
        // TODO: failedBoundaries should store the boundary instance, to avoid
        // needing to check the alternate.
        return failedBoundaries !== null && (failedBoundaries.has(fiber) || fiber.alternate !== null && failedBoundaries.has(fiber.alternate));
      }

      function commitErrorHandling(effectfulFiber) {
        var capturedError = void 0;
        if (capturedErrors !== null) {
          capturedError = capturedErrors.get(effectfulFiber);
          capturedErrors['delete'](effectfulFiber);
          if (capturedError == null) {
            if (effectfulFiber.alternate !== null) {
              effectfulFiber = effectfulFiber.alternate;
              capturedError = capturedErrors.get(effectfulFiber);
              capturedErrors['delete'](effectfulFiber);
            }
          }
        }

        !(capturedError != null) ? invariant(false, 'No error for given unit of work. This error is likely caused by a bug in React. Please file an issue.') : void 0;

        switch (effectfulFiber.tag) {
          case ClassComponent:
            var instance = effectfulFiber.stateNode;

            var info = {
              componentStack: capturedError.componentStack
            };

            // Allow the boundary to handle the error, usually by scheduling
            // an update to itself
            instance.componentDidCatch(capturedError.error, info);
            return;
          case HostRoot:
            if (firstUncaughtError === null) {
              firstUncaughtError = capturedError.error;
            }
            return;
          default:
            invariant(false, 'Invalid type of work. This error is likely caused by a bug in React. Please file an issue.');
        }
      }

      function unwindContexts(from, to) {
        var node = from;
        while (node !== null) {
          switch (node.tag) {
            case ClassComponent:
              popContextProvider(node);
              break;
            case HostComponent:
              popHostContext(node);
              break;
            case HostRoot:
              popHostContainer(node);
              break;
            case HostPortal:
              popHostContainer(node);
              break;
          }
          if (node === to || node.alternate === to) {
            stopFailedWorkTimer(node);
            break;
          } else {
            stopWorkTimer(node);
          }
          node = node['return'];
        }
      }

      function computeAsyncExpiration() {
        // Given the current clock time, returns an expiration time. We use rounding
        // to batch like updates together.
        // Should complete within ~1000ms. 1200ms max.
        var currentTime = recalculateCurrentTime();
        var expirationMs = 1000;
        var bucketSizeMs = 200;
        return computeExpirationBucket(currentTime, expirationMs, bucketSizeMs);
      }

      function computeExpirationForFiber(fiber) {
        var expirationTime = void 0;
        if (expirationContext !== NoWork) {
          // An explicit expiration context was set;
          expirationTime = expirationContext;
        } else if (isWorking) {
          if (isCommitting) {
            // Updates that occur during the commit phase should have sync priority
            // by default.
            expirationTime = Sync;
          } else {
            // Updates during the render phase should expire at the same time as
            // the work that is being rendered.
            expirationTime = nextRenderExpirationTime;
          }
        } else {
          // No explicit expiration context was set, and we're not currently
          // performing work. Calculate a new expiration time.
          if (useSyncScheduling && !(fiber.internalContextTag & AsyncUpdates)) {
            // This is a sync update
            expirationTime = Sync;
          } else {
            // This is an async update
            expirationTime = computeAsyncExpiration();
          }
        }
        return expirationTime;
      }

      function scheduleWork(fiber, expirationTime) {
        return scheduleWorkImpl(fiber, expirationTime, false);
      }

      function checkRootNeedsClearing(root, fiber, expirationTime) {
        if (!isWorking && root === nextRoot && expirationTime < nextRenderExpirationTime) {
          // Restart the root from the top.
          if (nextUnitOfWork !== null) {
            // This is an interruption. (Used for performance tracking.)
            interruptedBy = fiber;
          }
          nextRoot = null;
          nextUnitOfWork = null;
          nextRenderExpirationTime = NoWork;
        }
      }

      function scheduleWorkImpl(fiber, expirationTime, isErrorRecovery) {
        recordScheduleUpdate();

        {
          if (!isErrorRecovery && fiber.tag === ClassComponent) {
            var instance = fiber.stateNode;
            warnAboutInvalidUpdates(instance);
          }
        }

        var node = fiber;
        while (node !== null) {
          // Walk the parent path to the root and update each node's
          // expiration time.
          if (node.expirationTime === NoWork || node.expirationTime > expirationTime) {
            node.expirationTime = expirationTime;
          }
          if (node.alternate !== null) {
            if (node.alternate.expirationTime === NoWork || node.alternate.expirationTime > expirationTime) {
              node.alternate.expirationTime = expirationTime;
            }
          }
          if (node['return'] === null) {
            if (node.tag === HostRoot) {
              var root = node.stateNode;

              checkRootNeedsClearing(root, fiber, expirationTime);
              requestWork(root, expirationTime);
              checkRootNeedsClearing(root, fiber, expirationTime);
            } else {
              {
                if (!isErrorRecovery && fiber.tag === ClassComponent) {
                  warnAboutUpdateOnUnmounted(fiber);
                }
              }
              return;
            }
          }
          node = node['return'];
        }
      }

      function scheduleErrorRecovery(fiber) {
        scheduleWorkImpl(fiber, Sync, true);
      }

      function recalculateCurrentTime() {
        // Subtract initial time so it fits inside 32bits
        var ms = now() - startTime;
        mostRecentCurrentTime = msToExpirationTime(ms);
        return mostRecentCurrentTime;
      }

      function deferredUpdates(fn) {
        var previousExpirationContext = expirationContext;
        expirationContext = computeAsyncExpiration();
        try {
          return fn();
        } finally {
          expirationContext = previousExpirationContext;
        }
      }

      function syncUpdates(fn) {
        var previousExpirationContext = expirationContext;
        expirationContext = Sync;
        try {
          return fn();
        } finally {
          expirationContext = previousExpirationContext;
        }
      }

      // TODO: Everything below this is written as if it has been lifted to the
      // renderers. I'll do this in a follow-up.

      // Linked-list of roots
      var firstScheduledRoot = null;
      var lastScheduledRoot = null;

      var callbackExpirationTime = NoWork;
      var callbackID = -1;
      var isRendering = false;
      var nextFlushedRoot = null;
      var nextFlushedExpirationTime = NoWork;
      var deadlineDidExpire = false;
      var hasUnhandledError = false;
      var unhandledError = null;
      var deadline = null;

      var isBatchingUpdates = false;
      var isUnbatchingUpdates = false;

      // Use these to prevent an infinite loop of nested updates
      var NESTED_UPDATE_LIMIT = 1000;
      var nestedUpdateCount = 0;

      var timeHeuristicForUnitOfWork = 1;

      function scheduleCallbackWithExpiration(expirationTime) {
        if (callbackExpirationTime !== NoWork) {
          // A callback is already scheduled. Check its expiration time (timeout).
          if (expirationTime > callbackExpirationTime) {
            // Existing callback has sufficient timeout. Exit.
            return;
          } else {
            // Existing callback has insufficient timeout. Cancel and schedule a
            // new one.
            cancelDeferredCallback(callbackID);
          }
          // The request callback timer is already running. Don't start a new one.
        } else {
          startRequestCallbackTimer();
        }

        // Compute a timeout for the given expiration time.
        var currentMs = now() - startTime;
        var expirationMs = expirationTimeToMs(expirationTime);
        var timeout = expirationMs - currentMs;

        callbackExpirationTime = expirationTime;
        callbackID = scheduleDeferredCallback(performAsyncWork, { timeout: timeout });
      }

      // requestWork is called by the scheduler whenever a root receives an update.
      // It's up to the renderer to call renderRoot at some point in the future.
      function requestWork(root, expirationTime) {
        if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
          invariant(false, 'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.');
        }

        // Add the root to the schedule.
        // Check if this root is already part of the schedule.
        if (root.nextScheduledRoot === null) {
          // This root is not already scheduled. Add it.
          root.remainingExpirationTime = expirationTime;
          if (lastScheduledRoot === null) {
            firstScheduledRoot = lastScheduledRoot = root;
            root.nextScheduledRoot = root;
          } else {
            lastScheduledRoot.nextScheduledRoot = root;
            lastScheduledRoot = root;
            lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
          }
        } else {
          // This root is already scheduled, but its priority may have increased.
          var remainingExpirationTime = root.remainingExpirationTime;
          if (remainingExpirationTime === NoWork || expirationTime < remainingExpirationTime) {
            // Update the priority.
            root.remainingExpirationTime = expirationTime;
          }
        }

        if (isRendering) {
          // Prevent reentrancy. Remaining work will be scheduled at the end of
          // the currently rendering batch.
          return;
        }

        if (isBatchingUpdates) {
          // Flush work at the end of the batch.
          if (isUnbatchingUpdates) {
            // ...unless we're inside unbatchedUpdates, in which case we should
            // flush it now.
            nextFlushedRoot = root;
            nextFlushedExpirationTime = Sync;
            performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime);
          }
          return;
        }

        // TODO: Get rid of Sync and use current time?
        if (expirationTime === Sync) {
          performWork(Sync, null);
        } else {
          scheduleCallbackWithExpiration(expirationTime);
        }
      }

      function findHighestPriorityRoot() {
        var highestPriorityWork = NoWork;
        var highestPriorityRoot = null;

        if (lastScheduledRoot !== null) {
          var previousScheduledRoot = lastScheduledRoot;
          var root = firstScheduledRoot;
          while (root !== null) {
            var remainingExpirationTime = root.remainingExpirationTime;
            if (remainingExpirationTime === NoWork) {
              // This root no longer has work. Remove it from the scheduler.

              // TODO: This check is redudant, but Flow is confused by the branch
              // below where we set lastScheduledRoot to null, even though we break
              // from the loop right after.
              !(previousScheduledRoot !== null && lastScheduledRoot !== null) ? invariant(false, 'Should have a previous and last root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
              if (root === root.nextScheduledRoot) {
                // This is the only root in the list.
                root.nextScheduledRoot = null;
                firstScheduledRoot = lastScheduledRoot = null;
                break;
              } else if (root === firstScheduledRoot) {
                // This is the first root in the list.
                var next = root.nextScheduledRoot;
                firstScheduledRoot = next;
                lastScheduledRoot.nextScheduledRoot = next;
                root.nextScheduledRoot = null;
              } else if (root === lastScheduledRoot) {
                // This is the last root in the list.
                lastScheduledRoot = previousScheduledRoot;
                lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
                root.nextScheduledRoot = null;
                break;
              } else {
                previousScheduledRoot.nextScheduledRoot = root.nextScheduledRoot;
                root.nextScheduledRoot = null;
              }
              root = previousScheduledRoot.nextScheduledRoot;
            } else {
              if (highestPriorityWork === NoWork || remainingExpirationTime < highestPriorityWork) {
                // Update the priority, if it's higher
                highestPriorityWork = remainingExpirationTime;
                highestPriorityRoot = root;
              }
              if (root === lastScheduledRoot) {
                break;
              }
              previousScheduledRoot = root;
              root = root.nextScheduledRoot;
            }
          }
        }

        // If the next root is the same as the previous root, this is a nested
        // update. To prevent an infinite loop, increment the nested update count.
        var previousFlushedRoot = nextFlushedRoot;
        if (previousFlushedRoot !== null && previousFlushedRoot === highestPriorityRoot) {
          nestedUpdateCount++;
        } else {
          // Reset whenever we switch roots.
          nestedUpdateCount = 0;
        }
        nextFlushedRoot = highestPriorityRoot;
        nextFlushedExpirationTime = highestPriorityWork;
      }

      function performAsyncWork(dl) {
        performWork(NoWork, dl);
      }

      function performWork(minExpirationTime, dl) {
        deadline = dl;

        // Keep working on roots until there's no more work, or until the we reach
        // the deadline.
        findHighestPriorityRoot();

        if (enableUserTimingAPI && deadline !== null) {
          var didExpire = nextFlushedExpirationTime < recalculateCurrentTime();
          stopRequestCallbackTimer(didExpire);
        }

        while (nextFlushedRoot !== null && nextFlushedExpirationTime !== NoWork && (minExpirationTime === NoWork || nextFlushedExpirationTime <= minExpirationTime) && !deadlineDidExpire) {
          performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime);
          // Find the next highest priority work.
          findHighestPriorityRoot();
        }

        // We're done flushing work. Either we ran out of time in this callback,
        // or there's no more work left with sufficient priority.

        // If we're inside a callback, set this to false since we just completed it.
        if (deadline !== null) {
          callbackExpirationTime = NoWork;
          callbackID = -1;
        }
        // If there's work left over, schedule a new callback.
        if (nextFlushedExpirationTime !== NoWork) {
          scheduleCallbackWithExpiration(nextFlushedExpirationTime);
        }

        // Clean-up.
        deadline = null;
        deadlineDidExpire = false;
        nestedUpdateCount = 0;

        if (hasUnhandledError) {
          var _error4 = unhandledError;
          unhandledError = null;
          hasUnhandledError = false;
          throw _error4;
        }
      }

      function performWorkOnRoot(root, expirationTime) {
        !!isRendering ? invariant(false, 'performWorkOnRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;

        isRendering = true;

        // Check if this is async work or sync/expired work.
        // TODO: Pass current time as argument to renderRoot, commitRoot
        if (expirationTime <= recalculateCurrentTime()) {
          // Flush sync work.
          var finishedWork = root.finishedWork;
          if (finishedWork !== null) {
            // This root is already complete. We can commit it.
            root.finishedWork = null;
            root.remainingExpirationTime = commitRoot(finishedWork);
          } else {
            root.finishedWork = null;
            finishedWork = renderRoot(root, expirationTime);
            if (finishedWork !== null) {
              // We've completed the root. Commit it.
              root.remainingExpirationTime = commitRoot(finishedWork);
            }
          }
        } else {
          // Flush async work.
          var _finishedWork = root.finishedWork;
          if (_finishedWork !== null) {
            // This root is already complete. We can commit it.
            root.finishedWork = null;
            root.remainingExpirationTime = commitRoot(_finishedWork);
          } else {
            root.finishedWork = null;
            _finishedWork = renderRoot(root, expirationTime);
            if (_finishedWork !== null) {
              // We've completed the root. Check the deadline one more time
              // before committing.
              if (!shouldYield()) {
                // Still time left. Commit the root.
                root.remainingExpirationTime = commitRoot(_finishedWork);
              } else {
                // There's no time left. Mark this root as complete. We'll come
                // back and commit it later.
                root.finishedWork = _finishedWork;
              }
            }
          }
        }

        isRendering = false;
      }

      // When working on async work, the reconciler asks the renderer if it should
      // yield execution. For DOM, we implement this with requestIdleCallback.
      function shouldYield() {
        if (deadline === null) {
          return false;
        }
        if (deadline.timeRemaining() > timeHeuristicForUnitOfWork) {
          // Disregard deadline.didTimeout. Only expired work should be flushed
          // during a timeout. This path is only hit for non-expired work.
          return false;
        }
        deadlineDidExpire = true;
        return true;
      }

      // TODO: Not happy about this hook. Conceptually, renderRoot should return a
      // tuple of (isReadyForCommit, didError, error)
      function onUncaughtError(error) {
        !(nextFlushedRoot !== null) ? invariant(false, 'Should be working on a root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        // Unschedule this root so we don't work on it again until there's
        // another update.
        nextFlushedRoot.remainingExpirationTime = NoWork;
        if (!hasUnhandledError) {
          hasUnhandledError = true;
          unhandledError = error;
        }
      }

      // TODO: Batching should be implemented at the renderer level, not inside
      // the reconciler.
      function batchedUpdates(fn, a) {
        var previousIsBatchingUpdates = isBatchingUpdates;
        isBatchingUpdates = true;
        try {
          return fn(a);
        } finally {
          isBatchingUpdates = previousIsBatchingUpdates;
          if (!isBatchingUpdates && !isRendering) {
            performWork(Sync, null);
          }
        }
      }

      // TODO: Batching should be implemented at the renderer level, not inside
      // the reconciler.
      function unbatchedUpdates(fn) {
        if (isBatchingUpdates && !isUnbatchingUpdates) {
          isUnbatchingUpdates = true;
          try {
            return fn();
          } finally {
            isUnbatchingUpdates = false;
          }
        }
        return fn();
      }

      // TODO: Batching should be implemented at the renderer level, not within
      // the reconciler.
      function flushSync(fn) {
        var previousIsBatchingUpdates = isBatchingUpdates;
        isBatchingUpdates = true;
        try {
          return syncUpdates(fn);
        } finally {
          isBatchingUpdates = previousIsBatchingUpdates;
          !!isRendering ? invariant(false, 'flushSync was called from inside a lifecycle method. It cannot be called when React is already rendering.') : void 0;
          performWork(Sync, null);
        }
      }

      return {
        computeAsyncExpiration: computeAsyncExpiration,
        computeExpirationForFiber: computeExpirationForFiber,
        scheduleWork: scheduleWork,
        batchedUpdates: batchedUpdates,
        unbatchedUpdates: unbatchedUpdates,
        flushSync: flushSync,
        deferredUpdates: deferredUpdates
      };
    };

    {
      var didWarnAboutNestedUpdates = false;
    }

    // 0 is PROD, 1 is DEV.
    // Might add PROFILE later.


    function getContextForSubtree(parentComponent) {
      if (!parentComponent) {
        return emptyObject;
      }

      var fiber = get(parentComponent);
      var parentContext = findCurrentUnmaskedContext(fiber);
      return isContextProvider(fiber) ? processChildContext(fiber, parentContext) : parentContext;
    }

    var ReactFiberReconciler = function ReactFiberReconciler(config) {
      var getPublicInstance = config.getPublicInstance;

      var _ReactFiberScheduler = ReactFiberScheduler(config),
          computeAsyncExpiration = _ReactFiberScheduler.computeAsyncExpiration,
          computeExpirationForFiber = _ReactFiberScheduler.computeExpirationForFiber,
          scheduleWork = _ReactFiberScheduler.scheduleWork,
          batchedUpdates = _ReactFiberScheduler.batchedUpdates,
          unbatchedUpdates = _ReactFiberScheduler.unbatchedUpdates,
          flushSync = _ReactFiberScheduler.flushSync,
          deferredUpdates = _ReactFiberScheduler.deferredUpdates;

      function scheduleTopLevelUpdate(current, element, callback) {
        {
          if (ReactDebugCurrentFiber.phase === 'render' && ReactDebugCurrentFiber.current !== null && !didWarnAboutNestedUpdates) {
            didWarnAboutNestedUpdates = true;
            warning(false, 'Render methods should be a pure function of props and state; ' + 'triggering nested component updates from render is not allowed. ' + 'If necessary, trigger nested updates in componentDidUpdate.\n\n' + 'Check the render method of %s.', getComponentName(ReactDebugCurrentFiber.current) || 'Unknown');
          }
        }

        callback = callback === undefined ? null : callback;
        {
          warning(callback === null || typeof callback === 'function', 'render(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callback);
        }

        var expirationTime = void 0;
        // Check if the top-level element is an async wrapper component. If so,
        // treat updates to the root as async. This is a bit weird but lets us
        // avoid a separate `renderAsync` API.
        if (enableAsyncSubtreeAPI && element != null && element.type != null && element.type.prototype != null && element.type.prototype.unstable_isAsyncReactComponent === true) {
          expirationTime = computeAsyncExpiration();
        } else {
          expirationTime = computeExpirationForFiber(current);
        }

        var update = {
          expirationTime: expirationTime,
          partialState: { element: element },
          callback: callback,
          isReplace: false,
          isForced: false,
          nextCallback: null,
          next: null
        };
        insertUpdateIntoFiber(current, update);
        scheduleWork(current, expirationTime);
      }

      function findHostInstance(fiber) {
        var hostFiber = findCurrentHostFiber(fiber);
        if (hostFiber === null) {
          return null;
        }
        return hostFiber.stateNode;
      }

      return {
        createContainer: function createContainer(containerInfo, hydrate) {
          return createFiberRoot(containerInfo, hydrate);
        },
        updateContainer: function updateContainer(element, container, parentComponent, callback) {
          // TODO: If this is a nested container, this won't be the root.
          var current = container.current;

          {
            if (ReactFiberInstrumentation_1.debugTool) {
              if (current.alternate === null) {
                ReactFiberInstrumentation_1.debugTool.onMountContainer(container);
              } else if (element === null) {
                ReactFiberInstrumentation_1.debugTool.onUnmountContainer(container);
              } else {
                ReactFiberInstrumentation_1.debugTool.onUpdateContainer(container);
              }
            }
          }

          var context = getContextForSubtree(parentComponent);
          if (container.context === null) {
            container.context = context;
          } else {
            container.pendingContext = context;
          }

          scheduleTopLevelUpdate(current, element, callback);
        },

        batchedUpdates: batchedUpdates,

        unbatchedUpdates: unbatchedUpdates,

        deferredUpdates: deferredUpdates,

        flushSync: flushSync,

        getPublicRootInstance: function getPublicRootInstance(container) {
          var containerFiber = container.current;
          if (!containerFiber.child) {
            return null;
          }
          switch (containerFiber.child.tag) {
            case HostComponent:
              return getPublicInstance(containerFiber.child.stateNode);
            default:
              return containerFiber.child.stateNode;
          }
        },

        findHostInstance: findHostInstance,

        findHostInstanceWithNoPortals: function findHostInstanceWithNoPortals(fiber) {
          var hostFiber = findCurrentHostFiberWithNoPortals(fiber);
          if (hostFiber === null) {
            return null;
          }
          return hostFiber.stateNode;
        },
        injectIntoDevTools: function injectIntoDevTools(devToolsConfig) {
          var _findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;

          return injectInternals(_assign({}, devToolsConfig, {
            findHostInstanceByFiber: function findHostInstanceByFiber(fiber) {
              return findHostInstance(fiber);
            },
            findFiberByHostInstance: function findFiberByHostInstance(instance) {
              if (!_findFiberByHostInstance) {
                // Might not be implemented by the renderer.
                return null;
              }
              return _findFiberByHostInstance(instance);
            }
          }));
        }
      };
    };

    var ReactFiberReconciler$1 = Object.freeze({
      default: ReactFiberReconciler
    });

    var ReactFiberReconciler$2 = ReactFiberReconciler$1 && ReactFiberReconciler || ReactFiberReconciler$1;

    // TODO: bundle Flow types with the package.


    // TODO: decide on the top-level export form.
    // This is hacky but makes it work with both Rollup and Jest.
    var reactReconciler = ReactFiberReconciler$2['default'] ? ReactFiberReconciler$2['default'] : ReactFiberReconciler$2;

    module.exports = reactReconciler;
    return ($$$reconciler || ($$$reconciler = module.exports))(config);
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var hyphenate = __webpack_require__(75);

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomComponent = undefined;

var _lightning = __webpack_require__(77);

Object.keys(_lightning).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _lightning[key];
    }
  });
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 *
 */
var CustomComponent = function CustomComponent(props) {
  var CustomComp = props.componentName,
      rprops = _objectWithoutProperties(props, ['componentName']);

  return _react2.default.createElement(CustomComp, rprops);
};
exports.CustomComponent = CustomComponent;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 *
 */
var Accordion = exports.Accordion = 'lightning:accordion';
var AccordionSection = exports.AccordionSection = 'lightning:accordionSection';
var Avatar = exports.Avatar = 'lightning:avatar';
var Badge = exports.Badge = 'lightning:badge';
var Breadcrumb = exports.Breadcrumb = 'lightning:breadcrumb';
var Breadcrumbs = exports.Breadcrumbs = 'lightning:breadcrumbs';
var Button = exports.Button = 'lightning:button';
var ButtonGroup = exports.ButtonGroup = 'lightning:buttonGroup';
var ButtonIcon = exports.ButtonIcon = 'lightning:buttonIcon';
var ButtonIconStateful = exports.ButtonIconStateful = 'lightning:buttonIconStateful';
var ButtonMenu = exports.ButtonMenu = 'lightning:buttonMenu';
var ButtonStateful = exports.ButtonStateful = 'lightning:buttonStateful';
var Card = exports.Card = 'lightning:card';
var Carousel = exports.Carousel = 'lightning:carousel';
var CheckboxGroup = exports.CheckboxGroup = 'lightning:checkboxGroup';
var ClickToDial = exports.ClickToDial = 'lightning:clickToDial';
var Combobox = exports.Combobox = 'lightning:combobox';
var Container = exports.Container = 'lightning:container';
var Datatable = exports.Datatable = 'lightning:datatable';
var DualListbox = exports.DualListbox = 'lightning:dualListbox';
var DynamicIcon = exports.DynamicIcon = 'lightning:dynamicIcon';
var FileCard = exports.FileCard = 'lightning:fileCard';
var FileUpload = exports.FileUpload = 'lightning:fileUpload';
var FlexipageRegionInfo = exports.FlexipageRegionInfo = 'lightning:flexipageRegionInfo';
var Flow = exports.Flow = 'lightning:flow';
var FormattedAddress = exports.FormattedAddress = 'lightning:formattedAddress';
var FormattedDateTime = exports.FormattedDateTime = 'lightning:formattedDateTime';
var FormattedEmail = exports.FormattedEmail = 'lightning:formattedEmail';
var FormattedLocation = exports.FormattedLocation = 'lightning:formattedLocation';
var FormattedName = exports.FormattedName = 'lightning:formattedName';
var FormattedNumber = exports.FormattedNumber = 'lightning:formattedNumber';
var FormattedPhone = exports.FormattedPhone = 'lightning:formattedPhone';
var FormattedRichText = exports.FormattedRichText = 'lightning:formattedRichText';
var FormattedText = exports.FormattedText = 'lightning:formattedText';
var FormattedTime = exports.FormattedTime = 'lightning:formattedTime';
var FormattedUrl = exports.FormattedUrl = 'lightning:formattedUrl';
var Helptext = exports.Helptext = 'lightning:helptext';
var Icon = exports.Icon = 'lightning:icon';
var Input = exports.Input = 'lightning:input';
var InputAddress = exports.InputAddress = 'lightning:inputAddress';
var InputField = exports.InputField = 'lightning:inputField';
var InputLocation = exports.InputLocation = 'lightning:inputLocation';
var InputName = exports.InputName = 'lightning:inputName';
var InputRichText = exports.InputRichText = 'lightning:inputRichText';
var Layout = exports.Layout = 'lightning:layout';
var LayoutItem = exports.LayoutItem = 'lightning:layoutItem';
var ListView = exports.ListView = 'lightning:listView';
var MenuItem = exports.MenuItem = 'lightning:menuItem';
var OmniToolkitAPI = exports.OmniToolkitAPI = 'lightning:omniToolkitAPI';
var OutputField = exports.OutputField = 'lightning:outputField';
var Path = exports.Path = 'lightning:path';
var PicklistPath = exports.PicklistPath = 'lightning:picklistPath';
var Pill = exports.Pill = 'lightning:pill';
var PillContainer = exports.PillContainer = 'lightning:pillContainer';
var ProgressBar = exports.ProgressBar = 'lightning:progressBar';
var ProgressIndicator = exports.ProgressIndicator = 'lightning:progressIndicator';
var RadioGroup = exports.RadioGroup = 'lightning:radioGroup';
var RecordEditForm = exports.RecordEditForm = 'lightning:recordEditForm';
var RecordViewForm = exports.RecordViewForm = 'lightning:recordViewForm';
var RelativeDateTime = exports.RelativeDateTime = 'lightning:relativeDateTime';
var Select = exports.Select = 'lightning:select';
var Slider = exports.Slider = 'lightning:slider';
var Spinner = exports.Spinner = 'lightning:spinner';
var Tab = exports.Tab = 'lightning:tab';
var Tabset = exports.Tabset = 'lightning:tabset';
var Textarea = exports.Textarea = 'lightning:textarea';
var Tile = exports.Tile = 'lightning:tile';
var Tree = exports.Tree = 'lightning:tree';
var TreeGrid = exports.TreeGrid = 'lightning:treeGrid';
var UtilityBarAPI = exports.UtilityBarAPI = 'lightning:utilityBarAPI';
var VerticalNavigation = exports.VerticalNavigation = 'lightning:verticalNavigation';
var VerticalNavigationItem = exports.VerticalNavigationItem = 'lightning:verticalNavigationItem';
var VerticalNavigationItemBadge = exports.VerticalNavigationItemBadge = 'lightning:verticalNavigationItemBadge';
var VerticalNavigationItemIcon = exports.VerticalNavigationItemIcon = 'lightning:verticalNavigationItemIcon';
var VerticalNavigationOverflow = exports.VerticalNavigationOverflow = 'lightning:verticalNavigationOverflow';
var VerticalNavigationSection = exports.VerticalNavigationSection = 'lightning:verticalNavigationSection';
var WorkspaceAPI = exports.WorkspaceAPI = 'lightning:workspaceAPI';

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(28);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _recompose = __webpack_require__(3);

var _src = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function delay(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function genid() {
  return Math.random().toString(16).substring(2);
}

var enhancer = (0, _recompose.compose)((0, _recompose.withStateHandlers)({
  follow: false,
  liked: false,
  messages: []
}, {
  onToggleFollow: function onToggleFollow(_ref) {
    var follow = _ref.follow;
    return function () {
      return {
        follow: !follow
      };
    };
  },
  onToggleLiked: function onToggleLiked(_ref2) {
    var liked = _ref2.liked;
    return function () {
      return {
        liked: !liked
      };
    };
  },
  onAddMessage: function onAddMessage(_ref3) {
    var messages = _ref3.messages;
    return function (id, message) {
      return {
        messages: [].concat(_toConsumableArray(messages), [{ id: id, message: message }])
      };
    };
  },
  onDismissMessage: function onDismissMessage(_ref4) {
    var messages = _ref4.messages;
    return function (id) {
      return {
        messages: messages.map(function (msg) {
          return msg.id === id ? Object.assign({}, msg, { dismiss: true }) : msg;
        })
      };
    };
  },
  onRemoveMessage: function onRemoveMessage(_ref5) {
    var messages = _ref5.messages;
    return function (id) {
      return {
        messages: messages.filter(function (msg) {
          return msg.id !== id;
        })
      };
    };
  }
}), (0, _recompose.withHandlers)({
  showMessage: function showMessage(_ref6) {
    var onAddMessage = _ref6.onAddMessage,
        onDismissMessage = _ref6.onDismissMessage,
        onRemoveMessage = _ref6.onRemoveMessage;
    return function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(message) {
        var id;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = genid();

                onAddMessage(id, message);
                _context.next = 4;
                return delay(2000);

              case 4:
                onDismissMessage(id);
                _context.next = 7;
                return delay(1000);

              case 7:
                onRemoveMessage(id);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function (_x) {
        return _ref7.apply(this, arguments);
      };
    }();
  }
}));

var ButtonExample = enhancer(function (props) {
  var className = props.className,
      follow = props.follow,
      liked = props.liked,
      messages = props.messages,
      onToggleFollow = props.onToggleFollow,
      onToggleLiked = props.onToggleLiked,
      showMessage = props.showMessage;

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      'div',
      { className: 'slds-p-vertical--small' },
      _react2.default.createElement(
        'h3',
        null,
        'Buttons'
      ),
      _react2.default.createElement(_src.Button, { label: 'Base', variant: 'base', onclick: function onclick() {
          return showMessage('Base Clicked');
        } }),
      _react2.default.createElement(_src.Button, { label: 'Neutral', variant: 'neutral', onclick: function onclick() {
          return showMessage('Neutral Clicked');
        } }),
      _react2.default.createElement(_src.Button, { label: 'Brand', variant: 'brand', onclick: function onclick() {
          return showMessage('Brand Clicked');
        } }),
      _react2.default.createElement(_src.Button, { label: 'Destructive', variant: 'destructive', onclick: function onclick() {
          return showMessage('Destructive Clicked');
        } })
    ),
    _react2.default.createElement(
      'div',
      { className: 'slds-p-vertical--small' },
      _react2.default.createElement(
        'h3',
        null,
        'Button Icons'
      ),
      _react2.default.createElement(_src.ButtonIcon, { iconName: 'utility:settings', variant: 'bare', onclick: function onclick() {
          return showMessage('Icon Bare Clicked');
        } }),
      _react2.default.createElement(_src.ButtonIcon, { iconName: 'utility:settings', variant: 'container', onclick: function onclick() {
          return showMessage('Icon Container Clicked');
        } }),
      _react2.default.createElement(_src.ButtonIcon, { iconName: 'utility:settings', variant: 'border', onclick: function onclick() {
          return showMessage('Icon Border Clicked');
        } }),
      _react2.default.createElement(_src.ButtonIcon, { iconName: 'utility:settings', variant: 'border-filled', onclick: function onclick() {
          return showMessage('Icon Border-Filled Clicked');
        } })
    ),
    _react2.default.createElement(
      'div',
      { className: 'slds-p-vertical--small' },
      _react2.default.createElement(
        'h3',
        null,
        'Buttons (inverse)'
      ),
      _react2.default.createElement(
        'div',
        { className: 'slds-p-around--xx-small', style: { backgroundColor: '#224' } },
        _react2.default.createElement(_src.Button, { label: 'Inverse', variant: 'inverse', onclick: function onclick() {
            return showMessage('Inverse Clicked');
          } }),
        _react2.default.createElement(_src.ButtonIcon, { iconName: 'utility:settings', variant: 'bare-inverse', onclick: function onclick() {
            return showMessage('Icon Bare Inverse Clicked');
          } }),
        _react2.default.createElement(_src.ButtonIcon, { iconName: 'utility:settings', variant: 'border-inverse', onclick: function onclick() {
            return showMessage('Icon Border Inverse Clicked');
          } })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'slds-p-vertical--small' },
      _react2.default.createElement(
        'h3',
        null,
        'Stateful Buttons'
      ),
      _react2.default.createElement(_src.ButtonStateful, {
        labelWhenOff: 'Follow',
        labelWhenOn: 'Following',
        labelWhenHover: 'Unfollow',
        iconNameWhenOff: 'utility:add',
        iconNameWhenOn: 'utility:check',
        iconNameWhenHover: 'utility:close',
        state: follow,
        onclick: onToggleFollow
      })
    ),
    _react2.default.createElement(
      'div',
      { className: 'slds-p-vertical--small' },
      _react2.default.createElement(
        'h3',
        null,
        'Button Group'
      ),
      _react2.default.createElement(
        _src.ButtonGroup,
        null,
        _react2.default.createElement(_src.Button, { label: 'Refresh', onclick: function onclick() {
            return showMessage('Refresh clicked');
          } }),
        _react2.default.createElement(_src.Button, { label: 'Edit', onclick: function onclick() {
            return showMessage('Edit clicked');
          } }),
        _react2.default.createElement(_src.Button, { label: 'Save', onclick: function onclick() {
            return showMessage('Save clicked');
          } })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'slds-p-top--large' },
      messages.map(function (msg) {
        return _react2.default.createElement(
          'p',
          { key: msg.id, style: msg.dismiss ? { opacity: .1, transition: 'opacity 1s' } : {} },
          msg.message
        );
      })
    )
  );
});

exports.default = ButtonExample;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _recompose = __webpack_require__(3);

var _src = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enhancer = (0, _recompose.compose)((0, _recompose.withStateHandlers)({
  horizontalAlign: 'space',
  verticalAlign: 'start',
  pullToBoundary: undefined,
  multipleRows: false
}, {
  onChangeHorizontalAlign: function onChangeHorizontalAlign(_ref) {
    var horizontalAlign = _ref.horizontalAlign;
    return function (e) {
      return {
        horizontalAlign: e.getSource().get('v.value')
      };
    };
  },
  onChangeVerticalAlign: function onChangeVerticalAlign(_ref2) {
    var verticalAlign = _ref2.verticalAlign;
    return function (e) {
      return {
        verticalAlign: e.getSource().get('v.value')
      };
    };
  },
  onChangePullToBoundary: function onChangePullToBoundary(_ref3) {
    var pullToBoundary = _ref3.pullToBoundary;
    return function (e) {
      return {
        pullToBoundary: e.getSource().get('v.value')
      };
    };
  },
  onChangeMultipleRows: function onChangeMultipleRows(_ref4) {
    var multipleRows = _ref4.multipleRows;
    return function (e) {
      return {
        multipleRows: !multipleRows
      };
    };
  }
}));


var HORIZONTAL_ALIGNS = ['space', 'center', 'spread', 'end'];
var VERTICAL_ALIGNS = ['start', 'center', 'end', 'stretch'];
var PULL_TO_BOUNDARIES = ['small', 'medium', 'large'];

var LayoutExample = enhancer(function (props) {
  var className = props.className,
      horizontalAlign = props.horizontalAlign,
      verticalAlign = props.verticalAlign,
      pullToBoundary = props.pullToBoundary,
      multipleRows = props.multipleRows,
      onChangeHorizontalAlign = props.onChangeHorizontalAlign,
      onChangeVerticalAlign = props.onChangeVerticalAlign,
      onChangePullToBoundary = props.onChangePullToBoundary,
      onChangeMultipleRows = props.onChangeMultipleRows;

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      _src.Select,
      { label: 'Horizontal Align', onchange: onChangeHorizontalAlign, value: horizontalAlign },
      HORIZONTAL_ALIGNS.map(function (v) {
        return _react2.default.createElement(
          'option',
          { key: v, value: v },
          v
        );
      })
    ),
    _react2.default.createElement(
      _src.Select,
      { label: 'Vertical Align', onchange: onChangeVerticalAlign, value: verticalAlign },
      VERTICAL_ALIGNS.map(function (v) {
        return _react2.default.createElement(
          'option',
          { key: v, value: v },
          v
        );
      })
    ),
    _react2.default.createElement(
      _src.Select,
      { label: 'Pull to Boundary', onchange: onChangePullToBoundary, value: pullToBoundary },
      PULL_TO_BOUNDARIES.map(function (v) {
        return _react2.default.createElement(
          'option',
          { key: v, value: v },
          v
        );
      })
    ),
    _react2.default.createElement(_src.Input, { label: 'Multiple Rows', type: 'checkbox', checked: multipleRows, onchange: onChangeMultipleRows }),
    _react2.default.createElement('hr', null),
    _react2.default.createElement(
      _src.Layout,
      {
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        pullToBoundary: pullToBoundary,
        multipleRows: multipleRows
      },
      _react2.default.createElement(
        _src.LayoutItem,
        { flexibility: 'auto', padding: 'around-small' },
        _react2.default.createElement(
          'div',
          { style: { width: 150, height: '100%', border: '1px dotted #999' } },
          'Lorem ipsum dolor sit amet, habeo fabellas cum an, habeo graeco tamquam usu no, pro omnes electram id. Eos cu quidam delicata, eum ne summo offendit. Ut est eius perpetua, pri cu dictas oblique.'
        )
      ),
      _react2.default.createElement(
        _src.LayoutItem,
        { flexibility: 'auto', padding: 'around-small' },
        _react2.default.createElement(
          'div',
          { style: { width: 200, height: '100%', border: '1px dotted #999' } },
          _react2.default.createElement(
            'p',
            null,
            'Meliore adolescens definitiones an mei, at postea assentior duo. Quo ex simul laboramus instructior, eros illum per at, soluta dolorem incorrupte ad mea.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Est ei solet meliore, sit scripta incorrupte cu. Id errem exerci praesent sed, nam ad odio iisque. At dicit mucius duo, mucius menandri sadipscing ad ius.'
          )
        )
      ),
      _react2.default.createElement(
        _src.LayoutItem,
        { flexibility: 'auto', padding: 'around-small' },
        _react2.default.createElement(
          'div',
          { style: { width: 100, height: '100%', border: '1px dotted #999' } },
          'Est ei solet meliore, sit scripta incorrupte cu. Id errem exerci praesent sed, nam ad odio iisque. At dicit mucius duo, mucius menandri sadipscing ad ius.'
        )
      )
    )
  );
});

exports.default = LayoutExample;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _src = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecordEditFormExample = function RecordEditFormExample(props) {
  var className = props.className;

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      'div',
      { className: 'slds-p-vertical--small' },
      _react2.default.createElement(
        'h3',
        null,
        'Record Edit Form (Create new Opportunity record)'
      ),
      _react2.default.createElement(
        _src.RecordEditForm,
        { objectApiName: 'Opportunity' },
        _react2.default.createElement(_src.InputField, { fieldName: 'Name' }),
        _react2.default.createElement(_src.InputField, { fieldName: 'AccountId' }),
        _react2.default.createElement(_src.InputField, { fieldName: 'Type' }),
        _react2.default.createElement(_src.InputField, { fieldName: 'Amount' }),
        _react2.default.createElement(_src.InputField, { fieldName: 'CloseDate' }),
        _react2.default.createElement('div', { className: 'slds-p-vertical--small' }),
        _react2.default.createElement(
          _src.Button,
          { type: 'submit', variant: 'brand' },
          'Create'
        )
      )
    )
  );
};

exports.default = RecordEditFormExample;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _recompose = __webpack_require__(3);

var _src = __webpack_require__(2);

var _chatter = __webpack_require__(82);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FEED_TYPES = ['Bookmarks', 'Company', 'DirectMessages', 'Feeds', 'Files', 'Filter', 'Groups', 'Home', 'Moderation', 'Mute', 'News', 'PendingReview', 'Record', 'Streams', 'To', 'Topics', 'UserProfile'];

var FEED_DESIGNS = ['DEFAULT', 'BROWSE'];

var enhancer = (0, _recompose.compose)((0, _recompose.withStateHandlers)({
  feedType: 'News',
  feedDesign: 'DEFAULT'
}, {
  onChangeFeedType: function onChangeFeedType() {
    return function (e) {
      return {
        feedType: e.getSource().get('v.value')
      };
    };
  },
  onChangeFeedDesign: function onChangeFeedDesign() {
    return function (e) {
      return {
        feedDesign: e.getSource().get('v.value')
      };
    };
  }
}));

var ChatterExample = enhancer(function (props) {
  var className = props.className,
      feedType = props.feedType,
      feedDesign = props.feedDesign,
      onChangeFeedType = props.onChangeFeedType,
      onChangeFeedDesign = props.onChangeFeedDesign;

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      'div',
      { className: 'slds-p-vertical--small' },
      _react2.default.createElement(
        'h3',
        null,
        'Publisher'
      ),
      _react2.default.createElement(_chatter.Publisher, { context: 'GLOBAL' })
    ),
    _react2.default.createElement(
      'div',
      { className: 'slds-p-vertical--small' },
      _react2.default.createElement(
        'h3',
        null,
        'Feed'
      ),
      _react2.default.createElement(
        _src.Select,
        { label: 'Feed Type', value: feedType, onchange: onChangeFeedType },
        FEED_TYPES.map(function (v) {
          return _react2.default.createElement(
            'option',
            { key: v, value: v },
            v
          );
        })
      ),
      _react2.default.createElement(
        _src.Select,
        { label: 'Feed Design', value: feedDesign, onchange: onChangeFeedDesign },
        FEED_DESIGNS.map(function (v) {
          return _react2.default.createElement(
            'option',
            { key: v, value: v },
            v
          );
        })
      ),
      _react2.default.createElement(
        'div',
        { className: 'slds-p-top--medium' },
        _react2.default.createElement(_chatter.Feed, { key: feedType + ':' + feedDesign, type: feedType, feedDesign: feedDesign })
      )
    )
  );
});

exports.default = ChatterExample;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 *
 */
var Feed = exports.Feed = 'forceChatter:feed';
var FullFeed = exports.FullFeed = 'forceChatter:fullFeed';
var Publisher = exports.Publisher = 'forceChatter:publisher';

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _recompose = __webpack_require__(3);

var _src = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enhancer = (0, _recompose.compose)((0, _recompose.withStateHandlers)({
  incValue: "1"
}, {
  onChangeIncValue: function onChangeIncValue() {
    return function (e) {
      return {
        incValue: e.getSource().get('v.value')
      };
    };
  }
}), (0, _recompose.withProps)(function (_ref) {
  var incValue = _ref.incValue;
  return { incNum: Number(incValue) };
}));


var CustomComponentExample = enhancer(function (props) {
  var className = props.className,
      incValue = props.incValue,
      incNum = props.incNum,
      onChangeIncValue = props.onChangeIncValue;

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      'div',
      { className: 'slds-p-vertical--small' },
      _react2.default.createElement(
        'h3',
        null,
        'Custom Component'
      ),
      _react2.default.createElement(_src.Input, { type: 'number', label: 'Increment Num', value: incValue, onchange: onChangeIncValue }),
      _react2.default.createElement(
        'div',
        { className: 'slds-box slds-m-top--medium' },
        _react2.default.createElement(_src.CustomComponent, { componentName: 'c:ReactLightningRendererDemoSimple', incNum: incNum })
      )
    )
  );
});

exports.default = CustomComponentExample;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var genid = function genid() {
  return Math.random().toString(16).substring(2);
};


var initState = {
  values: Array.from({ length: 0 }).map(function () {
    return {
      id: genid(),
      value: ''
    };
  })
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
  var action = arguments[1];
  var values = state.values;

  switch (action.type) {
    case 'CHANGE_VALUE':
      return {
        values: [].concat(_toConsumableArray(values.slice(0, action.payload.index)), [Object.assign({}, values[action.payload.index], { value: action.payload.value })], _toConsumableArray(values.slice(action.payload.index + 1)))
      };
    case 'ADD_INPUT':
      var _action$payload$index = action.payload.index,
          index = _action$payload$index === undefined ? values.length : _action$payload$index;

      return {
        values: [].concat(_toConsumableArray(values.slice(0, index)), [{ id: genid(), value: action.payload.value }], _toConsumableArray(values.slice(index)))
      };
    case 'REMOVE_INPUT':
      return {
        values: [].concat(_toConsumableArray(values.slice(0, action.payload.index)), _toConsumableArray(values.slice(action.payload.index + 1)))
      };
    default:
      break;
  }
  return state;
};

exports.default = reducer;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleEvent = exports.init = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _src = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CounterApp = function (_React$Component) {
  _inherits(CounterApp, _React$Component);

  function CounterApp() {
    _classCallCheck(this, CounterApp);

    var _this = _possibleConstructorReturn(this, (CounterApp.__proto__ || Object.getPrototypeOf(CounterApp)).call(this));

    _this.state = { count: 0 };
    return _this;
  }

  _createClass(CounterApp, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      console.log('CounterApp.render()', this.props);
      var incNum = this.props.incNum;
      var count = this.state.count;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'p',
          null,
          'Count: ',
          count
        ),
        _react2.default.createElement(_src.Button, {
          iconName: 'utility:volume_high',
          label: '+ ' + incNum,
          onclick: function onclick() {
            return _this2.setState({ count: count + incNum });
          }
        }),
        _react2.default.createElement(_src.Button, {
          iconName: 'utility:volume_low',
          label: '- ' + incNum,
          onclick: function onclick() {
            return _this2.setState({ count: count - incNum });
          }
        })
      );
    }
  }]);

  return CounterApp;
}(_react2.default.Component);

function init(cmp) {
  var enhancer = (0, _src.mapAttrToProps)(cmp, ['incNum']);
  var App = enhancer(CounterApp);
  (0, _src.render)(_react2.default.createElement(App, null), cmp);
}

exports.init = init;
exports.handleEvent = _src.handleEvent;

/***/ })
/******/ ]);
});