/* */ 
"format global";
(function (global) {
  var babelHelpers = global.babelHelpers = {};

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
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

  babelHelpers.defaults = function (obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);

      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }

    return obj;
  };

  babelHelpers.createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  babelHelpers.createDecoratedClass = (function () {
    function defineProperties(target, descriptors, initializers) {
      for (var i = 0; i < descriptors.length; i++) {
        var descriptor = descriptors[i];
        var decorators = descriptor.decorators;
        var key = descriptor.key;
        delete descriptor.key;
        delete descriptor.decorators;
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

        if (decorators) {
          for (var f = 0; f < decorators.length; f++) {
            var decorator = decorators[f];

            if (typeof decorator === "function") {
              descriptor = decorator(target, key, descriptor) || descriptor;
            } else {
              throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
            }
          }

          if (descriptor.initializer !== undefined) {
            initializers[key] = descriptor;
            continue;
          }
        }

        Object.defineProperty(target, key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers);
      if (staticProps) defineProperties(Constructor, staticProps, staticInitializers);
      return Constructor;
    };
  })();

  babelHelpers.createDecoratedObject = function (descriptors) {
    var target = {};

    for (var i = 0; i < descriptors.length; i++) {
      var descriptor = descriptors[i];
      var decorators = descriptor.decorators;
      var key = descriptor.key;
      delete descriptor.key;
      delete descriptor.decorators;
      descriptor.enumerable = true;
      descriptor.configurable = true;
      if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

      if (decorators) {
        for (var f = 0; f < decorators.length; f++) {
          var decorator = decorators[f];

          if (typeof decorator === "function") {
            descriptor = decorator(target, key, descriptor) || descriptor;
          } else {
            throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
          }
        }
      }

      if (descriptor.initializer) {
        descriptor.value = descriptor.initializer.call(target);
      }

      Object.defineProperty(target, key, descriptor);
    }

    return target;
  };

  babelHelpers.defineDecoratedPropertyDescriptor = function (target, key, descriptors) {
    var _descriptor = descriptors[key];
    if (!_descriptor) return;
    var descriptor = {};

    for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];

    descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;
    Object.defineProperty(target, key, descriptor);
  };

  babelHelpers.taggedTemplateLiteral = function (strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  };

  babelHelpers.taggedTemplateLiteralLoose = function (strings, raw) {
    strings.raw = raw;
    return strings;
  };

  babelHelpers.toArray = function (arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  };

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers.slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  })();

  babelHelpers.slicedToArrayLoose = function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      var _arr = [];

      for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        _arr.push(_step.value);

        if (i && _arr.length === i) break;
      }

      return _arr;
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };

  babelHelpers.objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  babelHelpers.hasOwn = Object.prototype.hasOwnProperty;
  babelHelpers.slice = Array.prototype.slice;
  babelHelpers.bind = Function.prototype.bind;

  babelHelpers.defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  babelHelpers.asyncToGenerator = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        var callNext = step.bind(null, "next");
        var callThrow = step.bind(null, "throw");

        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            Promise.resolve(value).then(callNext, callThrow);
          }
        }

        callNext();
      });
    };
  };

  babelHelpers.interopExportWildcard = function (obj, defaults) {
    var newObj = defaults({}, obj);
    delete newObj["default"];
    return newObj;
  };

  babelHelpers.interopRequireWildcard = function (obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj["default"] = obj;
      return newObj;
    }
  };

  babelHelpers.interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  };

  babelHelpers._typeof = function (obj) {
    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers._extends = Object.assign || function (target) {
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

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  babelHelpers.newArrowCheck = function (innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.objectDestructuringEmpty = function (obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  };

  babelHelpers.temporalUndefined = {};

  babelHelpers.temporalAssertDefined = function (val, name, undef) {
    if (val === undef) {
      throw new ReferenceError(name + " is not defined - temporal dead zone");
    }

    return true;
  };

  babelHelpers.selfGlobal = typeof global === "undefined" ? self : global;
  babelHelpers.typeofReactElement = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 60103;

  babelHelpers.defaultProps = function (defaultProps, props) {
    if (defaultProps) {
      for (var propName in defaultProps) {
        if (typeof props[propName] === "undefined") {
          props[propName] = defaultProps[propName];
        }
      }
    }

    return props;
  };

  babelHelpers._instanceof = function (left, right) {
    if (right != null && right[Symbol.hasInstance]) {
      return right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  };

  babelHelpers.interopRequire = function (obj) {
    return obj && obj.__esModule ? obj["default"] : obj;
  };
})(typeof global === "undefined" ? self : global);

!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('2', ['3', '4'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var $ = $__require('3'),
        toIObject = $__require('4');
    module.exports = function (object, el) {
        var O = toIObject(object),
            keys = $.getKeys(O),
            length = keys.length,
            index = 0,
            key;
        while (length > index) if (O[key = keys[index++]] === el) return key;
    };
});
$__System.registerDynamic('5', ['4', '3'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var toIObject = $__require('4'),
      getNames = $__require('3').getNames,
      toString = {}.toString;
  var windowNames = typeof window == 'object' && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
  var getWindowNames = function (it) {
    try {
      return getNames(it);
    } catch (e) {
      return windowNames.slice();
    }
  };
  module.exports.get = function getOwnPropertyNames(it) {
    if (windowNames && toString.call(it) == '[object Window]') return getWindowNames(it);
    return getNames(toIObject(it));
  };
});
$__System.registerDynamic('6', ['3'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('3');
  module.exports = function (it) {
    var keys = $.getKeys(it),
        getSymbols = $.getSymbols;
    if (getSymbols) {
      var symbols = getSymbols(it),
          isEnum = $.isEnum,
          i = 0,
          key;
      while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) keys.push(key);
    }
    return keys;
  };
});
$__System.registerDynamic('7', ['8'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var cof = $__require('8');
  module.exports = Array.isArray || function (arg) {
    return cof(arg) == 'Array';
  };
});
$__System.registerDynamic('9', ['3', 'a', 'b', 'c', 'd', 'e', 'f', '10', '11', '12', '13', '2', '5', '6', '7', '14', '4', '15', '16'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var $ = $__require('3'),
      global = $__require('a'),
      has = $__require('b'),
      DESCRIPTORS = $__require('c'),
      $export = $__require('d'),
      redefine = $__require('e'),
      $fails = $__require('f'),
      shared = $__require('10'),
      setToStringTag = $__require('11'),
      uid = $__require('12'),
      wks = $__require('13'),
      keyOf = $__require('2'),
      $names = $__require('5'),
      enumKeys = $__require('6'),
      isArray = $__require('7'),
      anObject = $__require('14'),
      toIObject = $__require('4'),
      createDesc = $__require('15'),
      getDesc = $.getDesc,
      setDesc = $.setDesc,
      _create = $.create,
      getNames = $names.get,
      $Symbol = global.Symbol,
      $JSON = global.JSON,
      _stringify = $JSON && $JSON.stringify,
      setter = false,
      HIDDEN = wks('_hidden'),
      isEnum = $.isEnum,
      SymbolRegistry = shared('symbol-registry'),
      AllSymbols = shared('symbols'),
      useNative = typeof $Symbol == 'function',
      ObjectProto = Object.prototype;
  var setSymbolDesc = DESCRIPTORS && $fails(function () {
    return _create(setDesc({}, 'a', { get: function () {
        return setDesc(this, 'a', { value: 7 }).a;
      } })).a != 7;
  }) ? function (it, key, D) {
    var protoDesc = getDesc(ObjectProto, key);
    if (protoDesc) delete ObjectProto[key];
    setDesc(it, key, D);
    if (protoDesc && it !== ObjectProto) setDesc(ObjectProto, key, protoDesc);
  } : setDesc;
  var wrap = function (tag) {
    var sym = AllSymbols[tag] = _create($Symbol.prototype);
    sym._k = tag;
    DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
      configurable: true,
      set: function (value) {
        if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, createDesc(1, value));
      }
    });
    return sym;
  };
  var isSymbol = function (it) {
    return typeof it == 'symbol';
  };
  var $defineProperty = function defineProperty(it, key, D) {
    if (D && has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!has(it, HIDDEN)) setDesc(it, HIDDEN, createDesc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
        D = _create(D, { enumerable: createDesc(0, false) });
      }
      return setSymbolDesc(it, key, D);
    }
    return setDesc(it, key, D);
  };
  var $defineProperties = function defineProperties(it, P) {
    anObject(it);
    var keys = enumKeys(P = toIObject(P)),
        i = 0,
        l = keys.length,
        key;
    while (l > i) $defineProperty(it, key = keys[i++], P[key]);
    return it;
  };
  var $create = function create(it, P) {
    return P === undefined ? _create(it) : $defineProperties(_create(it), P);
  };
  var $propertyIsEnumerable = function propertyIsEnumerable(key) {
    var E = isEnum.call(this, key);
    return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  };
  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    var D = getDesc(it = toIObject(it), key);
    if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
    return D;
  };
  var $getOwnPropertyNames = function getOwnPropertyNames(it) {
    var names = getNames(toIObject(it)),
        result = [],
        i = 0,
        key;
    while (names.length > i) if (!has(AllSymbols, key = names[i++]) && key != HIDDEN) result.push(key);
    return result;
  };
  var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    var names = getNames(toIObject(it)),
        result = [],
        i = 0,
        key;
    while (names.length > i) if (has(AllSymbols, key = names[i++])) result.push(AllSymbols[key]);
    return result;
  };
  var $stringify = function stringify(it) {
    if (it === undefined || isSymbol(it)) return;
    var args = [it],
        i = 1,
        $$ = arguments,
        replacer,
        $replacer;
    while ($$.length > i) args.push($$[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  };
  var buggyJSON = $fails(function () {
    var S = $Symbol();
    return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
  });
  if (!useNative) {
    $Symbol = function Symbol() {
      if (isSymbol(this)) throw TypeError('Symbol is not a constructor');
      return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
    };
    redefine($Symbol.prototype, 'toString', function toString() {
      return this._k;
    });
    isSymbol = function (it) {
      return it instanceof $Symbol;
    };
    $.create = $create;
    $.isEnum = $propertyIsEnumerable;
    $.getDesc = $getOwnPropertyDescriptor;
    $.setDesc = $defineProperty;
    $.setDescs = $defineProperties;
    $.getNames = $names.get = $getOwnPropertyNames;
    $.getSymbols = $getOwnPropertySymbols;
    if (DESCRIPTORS && !$__require('16')) {
      redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }
  }
  var symbolStatics = {
    'for': function (key) {
      return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
    },
    keyFor: function keyFor(key) {
      return keyOf(SymbolRegistry, key);
    },
    useSetter: function () {
      setter = true;
    },
    useSimple: function () {
      setter = false;
    }
  };
  $.each.call(('hasInstance,isConcatSpreadable,iterator,match,replace,search,' + 'species,split,toPrimitive,toStringTag,unscopables').split(','), function (it) {
    var sym = wks(it);
    symbolStatics[it] = useNative ? sym : wrap(sym);
  });
  setter = true;
  $export($export.G + $export.W, { Symbol: $Symbol });
  $export($export.S, 'Symbol', symbolStatics);
  $export($export.S + $export.F * !useNative, 'Object', {
    create: $create,
    defineProperty: $defineProperty,
    defineProperties: $defineProperties,
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    getOwnPropertyNames: $getOwnPropertyNames,
    getOwnPropertySymbols: $getOwnPropertySymbols
  });
  $JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', { stringify: $stringify });
  setToStringTag($Symbol, 'Symbol');
  setToStringTag(Math, 'Math', true);
  setToStringTag(global.JSON, 'JSON', true);
});
$__System.registerDynamic('17', ['9', '18', '19'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  $__require('9');
  $__require('18');
  module.exports = $__require('19').Symbol;
});
$__System.registerDynamic('1a', ['17'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = $__require('17');
});
$__System.registerDynamic("1b", ["1a"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("1a"), __esModule: true };
});
$__System.registerDynamic('1c', ['3'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('3');
  module.exports = function create(P, D) {
    return $.create(P, D);
  };
});
$__System.registerDynamic("1d", ["1c"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("1c"), __esModule: true };
});
$__System.registerDynamic('1e', ['d', '1f'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $export = $__require('d');
  $export($export.S, 'Object', { setPrototypeOf: $__require('1f').set });
});
$__System.registerDynamic('20', ['1e', '19'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  $__require('1e');
  module.exports = $__require('19').Object.setPrototypeOf;
});
$__System.registerDynamic("21", ["20"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("20"), __esModule: true };
});
$__System.registerDynamic("18", [], true, function ($__require, exports, module) {
  /* */
  "format cjs";

  var global = this || self,
      GLOBAL = global;
});
$__System.registerDynamic("22", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function () {/* empty */};
});
$__System.registerDynamic("23", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (done, value) {
    return { value: value, done: !!done };
  };
});
$__System.registerDynamic('24', ['8'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var cof = $__require('8');
  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
});
$__System.registerDynamic('4', ['24', '25'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var IObject = $__require('24'),
      defined = $__require('25');
  module.exports = function (it) {
    return IObject(defined(it));
  };
});
$__System.registerDynamic('26', ['22', '23', '27', '4', '28'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var addToUnscopables = $__require('22'),
      step = $__require('23'),
      Iterators = $__require('27'),
      toIObject = $__require('4');
  module.exports = $__require('28')(Array, 'Array', function (iterated, kind) {
    this._t = toIObject(iterated);
    this._i = 0;
    this._k = kind;
  }, function () {
    var O = this._t,
        kind = this._k,
        index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return step(1);
    }
    if (kind == 'keys') return step(0, index);
    if (kind == 'values') return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');
  Iterators.Arguments = Iterators.Array;
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');
});
$__System.registerDynamic('29', ['26', '27'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  $__require('26');
  var Iterators = $__require('27');
  Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
});
$__System.registerDynamic("2a", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) throw TypeError(name + ": use the 'new' operator!");
    return it;
  };
});
$__System.registerDynamic('2b', ['2c', '2d', '2e', '14', '2f', '30'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var ctx = $__require('2c'),
      call = $__require('2d'),
      isArrayIter = $__require('2e'),
      anObject = $__require('14'),
      toLength = $__require('2f'),
      getIterFn = $__require('30');
  module.exports = function (iterable, entries, fn, that) {
    var iterFn = getIterFn(iterable),
        f = ctx(fn, that, entries ? 2 : 1),
        index = 0,
        length,
        step,
        iterator;
    if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
    if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
      entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
      call(iterator, f, step.value, entries);
    }
  };
});
$__System.registerDynamic('1f', ['3', '31', '14', '2c'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var getDesc = $__require('3').getDesc,
      isObject = $__require('31'),
      anObject = $__require('14');
  var check = function (O, proto) {
    anObject(O);
    if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  };
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function (test, buggy, set) {
      try {
        set = $__require('2c')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) {
        buggy = true;
      }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
    check: check
  };
});
$__System.registerDynamic("32", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  // 7.2.9 SameValue(x, y)
  module.exports = Object.is || function is(x, y) {
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };
});
$__System.registerDynamic('33', ['14', '34', '13'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var anObject = $__require('14'),
        aFunction = $__require('34'),
        SPECIES = $__require('13')('species');
    module.exports = function (O, D) {
        var C = anObject(O).constructor,
            S;
        return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
    };
});
$__System.registerDynamic("35", [], true, function ($__require, exports, module) {
                  var global = this || self,
                      GLOBAL = global;
                  // fast apply, http://jsperf.lnkit.com/fast-apply/5
                  module.exports = function (fn, args, that) {
                                    var un = that === undefined;
                                    switch (args.length) {
                                                      case 0:
                                                                        return un ? fn() : fn.call(that);
                                                      case 1:
                                                                        return un ? fn(args[0]) : fn.call(that, args[0]);
                                                      case 2:
                                                                        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
                                                      case 3:
                                                                        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
                                                      case 4:
                                                                        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
                                    }return fn.apply(that, args);
                  };
});
$__System.registerDynamic('36', ['a'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = $__require('a').document && document.documentElement;
});
$__System.registerDynamic('37', ['31', 'a'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var isObject = $__require('31'),
        document = $__require('a').document,
        is = isObject(document) && isObject(document.createElement);
    module.exports = function (it) {
        return is ? document.createElement(it) : {};
    };
});
$__System.registerDynamic('38', ['2c', '35', '36', '37', 'a', '8', '39'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    var ctx = $__require('2c'),
        invoke = $__require('35'),
        html = $__require('36'),
        cel = $__require('37'),
        global = $__require('a'),
        process = global.process,
        setTask = global.setImmediate,
        clearTask = global.clearImmediate,
        MessageChannel = global.MessageChannel,
        counter = 0,
        queue = {},
        ONREADYSTATECHANGE = 'onreadystatechange',
        defer,
        channel,
        port;
    var run = function () {
      var id = +this;
      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };
    var listner = function (event) {
      run.call(event.data);
    };
    if (!setTask || !clearTask) {
      setTask = function setImmediate(fn) {
        var args = [],
            i = 1;
        while (arguments.length > i) args.push(arguments[i++]);
        queue[++counter] = function () {
          invoke(typeof fn == 'function' ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
      };
      clearTask = function clearImmediate(id) {
        delete queue[id];
      };
      if ($__require('8')(process) == 'process') {
        defer = function (id) {
          process.nextTick(ctx(run, id, 1));
        };
      } else if (MessageChannel) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = listner;
        defer = ctx(port.postMessage, port, 1);
      } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
        defer = function (id) {
          global.postMessage(id + '', '*');
        };
        global.addEventListener('message', listner, false);
      } else if (ONREADYSTATECHANGE in cel('script')) {
        defer = function (id) {
          html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
            html.removeChild(this);
            run.call(id);
          };
        };
      } else {
        defer = function (id) {
          setTimeout(ctx(run, id, 1), 0);
        };
      }
    }
    module.exports = {
      set: setTask,
      clear: clearTask
    };
  })($__require('39'));
});
$__System.registerDynamic('3a', ['a', '38', '8', '39'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    var global = $__require('a'),
        macrotask = $__require('38').set,
        Observer = global.MutationObserver || global.WebKitMutationObserver,
        process = global.process,
        Promise = global.Promise,
        isNode = $__require('8')(process) == 'process',
        head,
        last,
        notify;
    var flush = function () {
      var parent, domain, fn;
      if (isNode && (parent = process.domain)) {
        process.domain = null;
        parent.exit();
      }
      while (head) {
        domain = head.domain;
        fn = head.fn;
        if (domain) domain.enter();
        fn();
        if (domain) domain.exit();
        head = head.next;
      }
      last = undefined;
      if (parent) parent.enter();
    };
    if (isNode) {
      notify = function () {
        process.nextTick(flush);
      };
    } else if (Observer) {
      var toggle = 1,
          node = document.createTextNode('');
      new Observer(flush).observe(node, { characterData: true });
      notify = function () {
        node.data = toggle = -toggle;
      };
    } else if (Promise && Promise.resolve) {
      notify = function () {
        Promise.resolve().then(flush);
      };
    } else {
      notify = function () {
        macrotask.call(global, flush);
      };
    }
    module.exports = function asap(fn) {
      var task = {
        fn: fn,
        next: undefined,
        domain: isNode && process.domain
      };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify();
      }
      last = task;
    };
  })($__require('39'));
});
$__System.registerDynamic('3b', ['e'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var redefine = $__require('e');
  module.exports = function (target, src) {
    for (var key in src) redefine(target, key, src[key]);
    return target;
  };
});
$__System.registerDynamic('3c', ['19', '3', 'c', '13'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var core = $__require('19'),
      $ = $__require('3'),
      DESCRIPTORS = $__require('c'),
      SPECIES = $__require('13')('species');
  module.exports = function (KEY) {
    var C = core[KEY];
    if (DESCRIPTORS && C && !C[SPECIES]) $.setDesc(C, SPECIES, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  };
});
$__System.registerDynamic('3d', ['3', '16', 'a', '2c', '3e', 'd', '31', '14', '34', '2a', '2b', '1f', '32', '13', '33', '3a', 'c', '3b', '11', '3c', '19', '3f', '39'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var $ = $__require('3'),
        LIBRARY = $__require('16'),
        global = $__require('a'),
        ctx = $__require('2c'),
        classof = $__require('3e'),
        $export = $__require('d'),
        isObject = $__require('31'),
        anObject = $__require('14'),
        aFunction = $__require('34'),
        strictNew = $__require('2a'),
        forOf = $__require('2b'),
        setProto = $__require('1f').set,
        same = $__require('32'),
        SPECIES = $__require('13')('species'),
        speciesConstructor = $__require('33'),
        asap = $__require('3a'),
        PROMISE = 'Promise',
        process = global.process,
        isNode = classof(process) == 'process',
        P = global[PROMISE],
        empty = function () {},
        Wrapper;
    var testResolve = function (sub) {
      var test = new P(empty),
          promise;
      if (sub) test.constructor = function (exec) {
        exec(empty, empty);
      };
      (promise = P.resolve(test))['catch'](empty);
      return promise === test;
    };
    var USE_NATIVE = function () {
      var works = false;
      function P2(x) {
        var self = new P(x);
        setProto(self, P2.prototype);
        return self;
      }
      try {
        works = P && P.resolve && testResolve();
        setProto(P2, P);
        P2.prototype = $.create(P.prototype, { constructor: { value: P2 } });
        if (!(P2.resolve(5).then(function () {}) instanceof P2)) {
          works = false;
        }
        if (works && $__require('c')) {
          var thenableThenGotten = false;
          P.resolve($.setDesc({}, 'then', { get: function () {
              thenableThenGotten = true;
            } }));
          works = thenableThenGotten;
        }
      } catch (e) {
        works = false;
      }
      return works;
    }();
    var sameConstructor = function (a, b) {
      if (LIBRARY && a === P && b === Wrapper) return true;
      return same(a, b);
    };
    var getConstructor = function (C) {
      var S = anObject(C)[SPECIES];
      return S != undefined ? S : C;
    };
    var isThenable = function (it) {
      var then;
      return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
    };
    var PromiseCapability = function (C) {
      var resolve, reject;
      this.promise = new C(function ($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
        resolve = $$resolve;
        reject = $$reject;
      });
      this.resolve = aFunction(resolve), this.reject = aFunction(reject);
    };
    var perform = function (exec) {
      try {
        exec();
      } catch (e) {
        return { error: e };
      }
    };
    var notify = function (record, isReject) {
      if (record.n) return;
      record.n = true;
      var chain = record.c;
      asap(function () {
        var value = record.v,
            ok = record.s == 1,
            i = 0;
        var run = function (reaction) {
          var handler = ok ? reaction.ok : reaction.fail,
              resolve = reaction.resolve,
              reject = reaction.reject,
              result,
              then;
          try {
            if (handler) {
              if (!ok) record.h = true;
              result = handler === true ? value : handler(value);
              if (result === reaction.promise) {
                reject(TypeError('Promise-chain cycle'));
              } else if (then = isThenable(result)) {
                then.call(result, resolve, reject);
              } else resolve(result);
            } else reject(value);
          } catch (e) {
            reject(e);
          }
        };
        while (chain.length > i) run(chain[i++]);
        chain.length = 0;
        record.n = false;
        if (isReject) setTimeout(function () {
          var promise = record.p,
              handler,
              console;
          if (isUnhandled(promise)) {
            if (isNode) {
              process.emit('unhandledRejection', value, promise);
            } else if (handler = global.onunhandledrejection) {
              handler({
                promise: promise,
                reason: value
              });
            } else if ((console = global.console) && console.error) {
              console.error('Unhandled promise rejection', value);
            }
          }
          record.a = undefined;
        }, 1);
      });
    };
    var isUnhandled = function (promise) {
      var record = promise._d,
          chain = record.a || record.c,
          i = 0,
          reaction;
      if (record.h) return false;
      while (chain.length > i) {
        reaction = chain[i++];
        if (reaction.fail || !isUnhandled(reaction.promise)) return false;
      }
      return true;
    };
    var $reject = function (value) {
      var record = this;
      if (record.d) return;
      record.d = true;
      record = record.r || record;
      record.v = value;
      record.s = 2;
      record.a = record.c.slice();
      notify(record, true);
    };
    var $resolve = function (value) {
      var record = this,
          then;
      if (record.d) return;
      record.d = true;
      record = record.r || record;
      try {
        if (record.p === value) throw TypeError("Promise can't be resolved itself");
        if (then = isThenable(value)) {
          asap(function () {
            var wrapper = {
              r: record,
              d: false
            };
            try {
              then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
            } catch (e) {
              $reject.call(wrapper, e);
            }
          });
        } else {
          record.v = value;
          record.s = 1;
          notify(record, false);
        }
      } catch (e) {
        $reject.call({
          r: record,
          d: false
        }, e);
      }
    };
    if (!USE_NATIVE) {
      P = function Promise(executor) {
        aFunction(executor);
        var record = this._d = {
          p: strictNew(this, P, PROMISE),
          c: [],
          a: undefined,
          s: 0,
          d: false,
          v: undefined,
          h: false,
          n: false
        };
        try {
          executor(ctx($resolve, record, 1), ctx($reject, record, 1));
        } catch (err) {
          $reject.call(record, err);
        }
      };
      $__require('3b')(P.prototype, {
        then: function then(onFulfilled, onRejected) {
          var reaction = new PromiseCapability(speciesConstructor(this, P)),
              promise = reaction.promise,
              record = this._d;
          reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
          reaction.fail = typeof onRejected == 'function' && onRejected;
          record.c.push(reaction);
          if (record.a) record.a.push(reaction);
          if (record.s) notify(record, false);
          return promise;
        },
        'catch': function (onRejected) {
          return this.then(undefined, onRejected);
        }
      });
    }
    $export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: P });
    $__require('11')(P, PROMISE);
    $__require('3c')(PROMISE);
    Wrapper = $__require('19')[PROMISE];
    $export($export.S + $export.F * !USE_NATIVE, PROMISE, { reject: function reject(r) {
        var capability = new PromiseCapability(this),
            $$reject = capability.reject;
        $$reject(r);
        return capability.promise;
      } });
    $export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, { resolve: function resolve(x) {
        if (x instanceof P && sameConstructor(x.constructor, this)) return x;
        var capability = new PromiseCapability(this),
            $$resolve = capability.resolve;
        $$resolve(x);
        return capability.promise;
      } });
    $export($export.S + $export.F * !(USE_NATIVE && $__require('3f')(function (iter) {
      P.all(iter)['catch'](function () {});
    })), PROMISE, {
      all: function all(iterable) {
        var C = getConstructor(this),
            capability = new PromiseCapability(C),
            resolve = capability.resolve,
            reject = capability.reject,
            values = [];
        var abrupt = perform(function () {
          forOf(iterable, false, values.push, values);
          var remaining = values.length,
              results = Array(remaining);
          if (remaining) $.each.call(values, function (promise, index) {
            var alreadyCalled = false;
            C.resolve(promise).then(function (value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              results[index] = value;
              --remaining || resolve(results);
            }, reject);
          });else resolve(results);
        });
        if (abrupt) reject(abrupt.error);
        return capability.promise;
      },
      race: function race(iterable) {
        var C = getConstructor(this),
            capability = new PromiseCapability(C),
            reject = capability.reject;
        var abrupt = perform(function () {
          forOf(iterable, false, function (promise) {
            C.resolve(promise).then(capability.resolve, reject);
          });
        });
        if (abrupt) reject(abrupt.error);
        return capability.promise;
      }
    });
  })($__require('39'));
});
$__System.registerDynamic('40', ['18', '41', '29', '3d', '19'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  $__require('18');
  $__require('41');
  $__require('29');
  $__require('3d');
  module.exports = $__require('19').Promise;
});
$__System.registerDynamic("42", ["40"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("40"), __esModule: true };
});
$__System.registerDynamic('43', [], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
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
});
$__System.registerDynamic("44", ["43"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("43");
});
$__System.registerDynamic('45', ['44'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__System._nodeRequire ? process : $__require('44');
});
$__System.registerDynamic("39", ["45"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("45");
});
$__System.registerDynamic("46", ["1b", "1d", "21", "42", "39"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    "use strict";

    var _Symbol = $__require("1b")["default"];
    var _Object$create = $__require("1d")["default"];
    var _Object$setPrototypeOf = $__require("21")["default"];
    var _Promise = $__require("42")["default"];
    !function (global) {
      "use strict";

      var hasOwn = Object.prototype.hasOwnProperty;
      var undefined;
      var $Symbol = typeof _Symbol === "function" ? _Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
      var inModule = typeof module === "object";
      var runtime = global.regeneratorRuntime;
      if (runtime) {
        if (inModule) {
          module.exports = runtime;
        }
        return;
      }
      runtime = global.regeneratorRuntime = inModule ? module.exports : {};
      function wrap(innerFn, outerFn, self, tryLocsList) {
        var generator = _Object$create((outerFn || Generator).prototype);
        var context = new Context(tryLocsList || []);
        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
      }
      runtime.wrap = wrap;
      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }
      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed";
      var ContinueSentinel = {};
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}
      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
          prototype[method] = function (arg) {
            return this._invoke(method, arg);
          };
        });
      }
      runtime.isGeneratorFunction = function (genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
      };
      runtime.mark = function (genFun) {
        if (_Object$setPrototypeOf) {
          _Object$setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          if (!(toStringTagSymbol in genFun)) {
            genFun[toStringTagSymbol] = "GeneratorFunction";
          }
        }
        genFun.prototype = _Object$create(Gp);
        return genFun;
      };
      runtime.awrap = function (arg) {
        return new AwaitArgument(arg);
      };
      function AwaitArgument(arg) {
        this.arg = arg;
      }
      function AsyncIterator(generator) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;
            if (value instanceof AwaitArgument) {
              return _Promise.resolve(value.arg).then(function (value) {
                invoke("next", value, resolve, reject);
              }, function (err) {
                invoke("throw", err, resolve, reject);
              });
            }
            return _Promise.resolve(value).then(function (unwrapped) {
              result.value = unwrapped;
              resolve(result);
            }, reject);
          }
        }
        if (typeof process === "object" && process.domain) {
          invoke = process.domain.bind(invoke);
        }
        var previousPromise;
        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new _Promise(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
        this._invoke = enqueue;
      }
      defineIteratorMethods(AsyncIterator.prototype);
      runtime.async = function (innerFn, outerFn, self, tryLocsList) {
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
        return runtime.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
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
            return doneResult();
          }
          while (true) {
            var delegate = context.delegate;
            if (delegate) {
              if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
                context.delegate = null;
                var returnMethod = delegate.iterator["return"];
                if (returnMethod) {
                  var record = tryCatch(returnMethod, delegate.iterator, arg);
                  if (record.type === "throw") {
                    method = "throw";
                    arg = record.arg;
                    continue;
                  }
                }
                if (method === "return") {
                  continue;
                }
              }
              var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);
              if (record.type === "throw") {
                context.delegate = null;
                method = "throw";
                arg = record.arg;
                continue;
              }
              method = "next";
              arg = undefined;
              var info = record.arg;
              if (info.done) {
                context[delegate.resultName] = info.value;
                context.next = delegate.nextLoc;
              } else {
                state = GenStateSuspendedYield;
                return info;
              }
              context.delegate = null;
            }
            if (method === "next") {
              if (state === GenStateSuspendedYield) {
                context.sent = arg;
              } else {
                context.sent = undefined;
              }
            } else if (method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw arg;
              }
              if (context.dispatchException(arg)) {
                method = "next";
                arg = undefined;
              }
            } else if (method === "return") {
              context.abrupt("return", arg);
            }
            state = GenStateExecuting;
            var record = tryCatch(innerFn, self, context);
            if (record.type === "normal") {
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;
              var info = {
                value: record.arg,
                done: context.done
              };
              if (record.arg === ContinueSentinel) {
                if (context.delegate && method === "next") {
                  arg = undefined;
                }
              } else {
                return info;
              }
            } else if (record.type === "throw") {
              state = GenStateCompleted;
              method = "throw";
              arg = record.arg;
            }
          }
        };
      }
      defineIteratorMethods(Gp);
      Gp[iteratorSymbol] = function () {
        return this;
      };
      Gp[toStringTagSymbol] = "Generator";
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
        return function next() {
          while (keys.length) {
            var key = keys.pop();
            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          }
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
        return { next: doneResult };
      }
      runtime.values = values;
      function doneResult() {
        return {
          value: undefined,
          done: true
        };
      }
      Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
          this.prev = 0;
          this.next = 0;
          this.sent = undefined;
          this.done = false;
          this.delegate = null;
          this.tryEntries.forEach(resetTryEntry);
          if (!skipTempReset) {
            for (var name in this) {
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
            return !!caught;
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;
            if (entry.tryLoc === "root") {
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
            finallyEntry = null;
          }
          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;
          if (finallyEntry) {
            this.next = finallyEntry.finallyLoc;
          } else {
            this.complete(record);
          }
          return ContinueSentinel;
        },
        complete: function complete(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }
          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = record.arg;
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }
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
          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          };
          return ContinueSentinel;
        }
      };
    }(typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : undefined);
  })($__require("39"));
});
$__System.registerDynamic("47", ["46"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var g = typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : this;
  var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
  var oldRuntime = hadRuntime && g.regeneratorRuntime;
  g.regeneratorRuntime = undefined;
  module.exports = $__require("46");
  if (hadRuntime) {
    g.regeneratorRuntime = oldRuntime;
  } else {
    try {
      delete g.regeneratorRuntime;
    } catch (e) {
      g.regeneratorRuntime = undefined;
    }
  }
  module.exports = {
    "default": module.exports,
    __esModule: true
  };
});
$__System.registerDynamic('48', ['47'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = $__require('47');
});
$__System.registerDynamic('49', ['4a', '25'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var toInteger = $__require('4a'),
      defined = $__require('25');
  module.exports = function (TO_STRING) {
    return function (that, pos) {
      var s = String(defined(that)),
          i = toInteger(pos),
          l = s.length,
          a,
          b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };
});
$__System.registerDynamic("16", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = true;
});
$__System.registerDynamic('e', ['4b'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = $__require('4b');
});
$__System.registerDynamic("15", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };
});
$__System.registerDynamic("f", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };
});
$__System.registerDynamic('c', ['f'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = !$__require('f')(function () {
    return Object.defineProperty({}, 'a', { get: function () {
        return 7;
      } }).a != 7;
  });
});
$__System.registerDynamic('4b', ['3', '15', 'c'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('3'),
      createDesc = $__require('15');
  module.exports = $__require('c') ? function (object, key, value) {
    return $.setDesc(object, key, createDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };
});
$__System.registerDynamic('4c', ['3', '15', '11', '4b', '13'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var $ = $__require('3'),
      descriptor = $__require('15'),
      setToStringTag = $__require('11'),
      IteratorPrototype = {};
  $__require('4b')(IteratorPrototype, $__require('13')('iterator'), function () {
    return this;
  });
  module.exports = function (Constructor, NAME, next) {
    Constructor.prototype = $.create(IteratorPrototype, { next: descriptor(1, next) });
    setToStringTag(Constructor, NAME + ' Iterator');
  };
});
$__System.registerDynamic("b", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var hasOwnProperty = {}.hasOwnProperty;
  module.exports = function (it, key) {
    return hasOwnProperty.call(it, key);
  };
});
$__System.registerDynamic('11', ['3', 'b', '13'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var def = $__require('3').setDesc,
      has = $__require('b'),
      TAG = $__require('13')('toStringTag');
  module.exports = function (it, tag, stat) {
    if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
      configurable: true,
      value: tag
    });
  };
});
$__System.registerDynamic('28', ['16', 'd', 'e', '4b', 'b', '27', '4c', '11', '3', '13'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var LIBRARY = $__require('16'),
      $export = $__require('d'),
      redefine = $__require('e'),
      hide = $__require('4b'),
      has = $__require('b'),
      Iterators = $__require('27'),
      $iterCreate = $__require('4c'),
      setToStringTag = $__require('11'),
      getProto = $__require('3').getProto,
      ITERATOR = $__require('13')('iterator'),
      BUGGY = !([].keys && 'next' in [].keys()),
      FF_ITERATOR = '@@iterator',
      KEYS = 'keys',
      VALUES = 'values';
  var returnThis = function () {
    return this;
  };
  module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    $iterCreate(Constructor, NAME, next);
    var getMethod = function (kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    var TAG = NAME + ' Iterator',
        DEF_VALUES = DEFAULT == VALUES,
        VALUES_BUG = false,
        proto = Base.prototype,
        $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
        $default = $native || getMethod(DEFAULT),
        methods,
        key;
    if ($native) {
      var IteratorPrototype = getProto($default.call(new Base()));
      setToStringTag(IteratorPrototype, TAG, true);
      if (!LIBRARY && has(proto, FF_ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
      if (DEF_VALUES && $native.name !== VALUES) {
        VALUES_BUG = true;
        $default = function values() {
          return $native.call(this);
        };
      }
    }
    if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      hide(proto, ITERATOR, $default);
    }
    Iterators[NAME] = $default;
    Iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: !DEF_VALUES ? $default : getMethod('entries')
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) redefine(proto, key, methods[key]);
      } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };
});
$__System.registerDynamic('41', ['49', '28'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var $at = $__require('49')(true);
  $__require('28')(String, 'String', function (iterated) {
    this._t = String(iterated);
    this._i = 0;
  }, function () {
    var O = this._t,
        index = this._i,
        point;
    if (index >= O.length) return {
      value: undefined,
      done: true
    };
    point = $at(O, index);
    this._i += point.length;
    return {
      value: point,
      done: false
    };
  });
});
$__System.registerDynamic('34', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };
});
$__System.registerDynamic('2c', ['34'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var aFunction = $__require('34');
  module.exports = function (fn, that, length) {
    aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1:
        return function (a) {
          return fn.call(that, a);
        };
      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function () {
      return fn.apply(that, arguments);
    };
  };
});
$__System.registerDynamic('d', ['a', '19', '2c'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var global = $__require('a'),
      core = $__require('19'),
      ctx = $__require('2c'),
      PROTOTYPE = 'prototype';
  var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F,
        IS_GLOBAL = type & $export.G,
        IS_STATIC = type & $export.S,
        IS_PROTO = type & $export.P,
        IS_BIND = type & $export.B,
        IS_WRAP = type & $export.W,
        exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
        target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
        key,
        own,
        out;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      own = !IS_FORCED && target && key in target;
      if (own && key in exports) continue;
      out = own ? target[key] : source[key];
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function (C) {
        var F = function (param) {
          return this instanceof C ? new C(param) : C(param);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
      if (IS_PROTO) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
    }
  };
  $export.F = 1;
  $export.G = 2;
  $export.S = 4;
  $export.P = 8;
  $export.B = 16;
  $export.W = 32;
  module.exports = $export;
});
$__System.registerDynamic("25", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  // 7.2.1 RequireObjectCoercible(argument)
  module.exports = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };
});
$__System.registerDynamic('4d', ['25'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var defined = $__require('25');
  module.exports = function (it) {
    return Object(defined(it));
  };
});
$__System.registerDynamic('31', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };
});
$__System.registerDynamic('14', ['31'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var isObject = $__require('31');
  module.exports = function (it) {
    if (!isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };
});
$__System.registerDynamic('2d', ['14'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var anObject = $__require('14');
  module.exports = function (iterator, fn, value, entries) {
    try {
      return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined) anObject(ret.call(iterator));
      throw e;
    }
  };
});
$__System.registerDynamic('2e', ['27', '13'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var Iterators = $__require('27'),
        ITERATOR = $__require('13')('iterator'),
        ArrayProto = Array.prototype;
    module.exports = function (it) {
        return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
    };
});
$__System.registerDynamic("4a", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  // 7.1.4 ToInteger
  var ceil = Math.ceil,
      floor = Math.floor;
  module.exports = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };
});
$__System.registerDynamic('2f', ['4a'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var toInteger = $__require('4a'),
      min = Math.min;
  module.exports = function (it) {
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
  };
});
$__System.registerDynamic("8", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var toString = {}.toString;

  module.exports = function (it) {
    return toString.call(it).slice(8, -1);
  };
});
$__System.registerDynamic('3e', ['8', '13'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var cof = $__require('8'),
        TAG = $__require('13')('toStringTag'),
        ARG = cof(function () {
        return arguments;
    }()) == 'Arguments';
    module.exports = function (it) {
        var O, T, B;
        return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : ARG ? cof(O) : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
    };
});
$__System.registerDynamic("27", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = {};
});
$__System.registerDynamic('30', ['3e', '13', '27', '19'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var classof = $__require('3e'),
        ITERATOR = $__require('13')('iterator'),
        Iterators = $__require('27');
    module.exports = $__require('19').getIteratorMethod = function (it) {
        if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
    };
});
$__System.registerDynamic('10', ['a'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var global = $__require('a'),
        SHARED = '__core-js_shared__',
        store = global[SHARED] || (global[SHARED] = {});
    module.exports = function (key) {
        return store[key] || (store[key] = {});
    };
});
$__System.registerDynamic('12', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var id = 0,
      px = Math.random();
  module.exports = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };
});
$__System.registerDynamic('a', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});
$__System.registerDynamic('13', ['10', '12', 'a'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var store = $__require('10')('wks'),
        uid = $__require('12'),
        Symbol = $__require('a').Symbol;
    module.exports = function (name) {
        return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
    };
});
$__System.registerDynamic('3f', ['13'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var ITERATOR = $__require('13')('iterator'),
      SAFE_CLOSING = false;
  try {
    var riter = [7][ITERATOR]();
    riter['return'] = function () {
      SAFE_CLOSING = true;
    };
    Array.from(riter, function () {
      throw 2;
    });
  } catch (e) {}
  module.exports = function (exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    var safe = false;
    try {
      var arr = [7],
          iter = arr[ITERATOR]();
      iter.next = function () {
        return { done: safe = true };
      };
      arr[ITERATOR] = function () {
        return iter;
      };
      exec(arr);
    } catch (e) {}
    return safe;
  };
});
$__System.registerDynamic('4e', ['2c', 'd', '4d', '2d', '2e', '2f', '30', '3f'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ctx = $__require('2c'),
      $export = $__require('d'),
      toObject = $__require('4d'),
      call = $__require('2d'),
      isArrayIter = $__require('2e'),
      toLength = $__require('2f'),
      getIterFn = $__require('30');
  $export($export.S + $export.F * !$__require('3f')(function (iter) {
    Array.from(iter);
  }), 'Array', { from: function from(arrayLike) {
      var O = toObject(arrayLike),
          C = typeof this == 'function' ? this : Array,
          $$ = arguments,
          $$len = $$.length,
          mapfn = $$len > 1 ? $$[1] : undefined,
          mapping = mapfn !== undefined,
          index = 0,
          iterFn = getIterFn(O),
          length,
          result,
          step,
          iterator;
      if (mapping) mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
      if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
        for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
          result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
        }
      } else {
        length = toLength(O.length);
        for (result = new C(length); length > index; index++) {
          result[index] = mapping ? mapfn(O[index], index) : O[index];
        }
      }
      result.length = index;
      return result;
    } });
});
$__System.registerDynamic('19', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var core = module.exports = { version: '1.2.6' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
$__System.registerDynamic('4f', ['41', '4e', '19'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  $__require('41');
  $__require('4e');
  module.exports = $__require('19').Array.from;
});
$__System.registerDynamic("50", ["4f"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("4f"), __esModule: true };
});
$__System.register('51', ['52', '53', '54'], function (_export) {
  var m, _createClass, _classCallCheck, Panel;

  return {
    setters: [function (_3) {
      m = _3['default'];
    }, function (_) {
      _createClass = _['default'];
    }, function (_2) {
      _classCallCheck = _2['default'];
    }],
    execute: function () {
      'use strict';

      Panel = (function () {
        function Panel() {
          _classCallCheck(this, Panel);
        }

        _createClass(Panel, [{
          key: 'onclick',
          value: function onclick() {
            console.log('clicked!');
          }
        }, {
          key: 'view',
          value: function view(vnode) {
            return m('div', {
              'class': 'panel',
              onclick: this.onclick
            }, vnode.attrs.idx);
          }
        }]);

        return Panel;
      })();

      _export('default', Panel);
    }
  };
});
$__System.register('55', ['52', '53', '54'], function (_export) {
  var m, _createClass, _classCallCheck, AddPanel;

  return {
    setters: [function (_3) {
      m = _3['default'];
    }, function (_) {
      _createClass = _['default'];
    }, function (_2) {
      _classCallCheck = _2['default'];
    }],
    execute: function () {
      'use strict';

      AddPanel = (function () {
        function AddPanel() {
          _classCallCheck(this, AddPanel);
        }

        _createClass(AddPanel, [{
          key: 'onclick',
          value: function onclick(attrs) {
            m.route.set('/addReport');
          }
        }, {
          key: 'view',
          value: function view(vnode) {

            return m('div', {
              'class': 'panel',
              onclick: this.onclick
            }, '+');
          }
        }]);

        return AddPanel;
      })();

      _export('default', AddPanel);
    }
  };
});
$__System.register('56', ['48', '50', '51', '52', '53', '54', '55'], function (_export) {
  var _regeneratorRuntime, _Array$from, Panel, m, _createClass, _classCallCheck, AddPanel, Index;

  return {
    setters: [function (_4) {
      _regeneratorRuntime = _4['default'];
    }, function (_5) {
      _Array$from = _5['default'];
    }, function (_7) {
      Panel = _7['default'];
    }, function (_6) {
      m = _6['default'];
    }, function (_2) {
      _createClass = _2['default'];
    }, function (_3) {
      _classCallCheck = _3['default'];
    }, function (_8) {
      AddPanel = _8['default'];
    }],
    execute: function () {
      'use strict';

      Index = (function () {
        function Index() {
          _classCallCheck(this, Index);
        }

        _createClass(Index, [{
          key: 'getReports',
          value: _regeneratorRuntime.mark(function getReports() {
            return _regeneratorRuntime.wrap(function getReports$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  context$2$0.next = 2;
                  return m.request('/codd/v1/templates');

                case 2:
                case 'end':
                  return context$2$0.stop();
              }
            }, getReports, this);
          })
        }, {
          key: 'view',
          value: function view(vnode) {
            // reports shoudl replace the arbitrary array constructor in panels
            //let reports = this.getReports();
            var addPanel = m(AddPanel);

            var panels = _Array$from(Array(70)).map(function (_, idx) {
              return m(Panel, { idx: idx });
            }).concat(addPanel);

            return m('div', { 'class': 'container' }, panels);
          }
        }]);

        return Index;
      })();

      _export('default', Index);
    }
  };
});
$__System.registerDynamic("3", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $Object = Object;
  module.exports = {
    create: $Object.create,
    getProto: $Object.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: $Object.getOwnPropertyDescriptor,
    setDesc: $Object.defineProperty,
    setDescs: $Object.defineProperties,
    getKeys: $Object.keys,
    getNames: $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each: [].forEach
  };
});
$__System.registerDynamic('57', ['3'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('3');
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
});
$__System.registerDynamic("58", ["57"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("57"), __esModule: true };
});
$__System.registerDynamic("53", ["58"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var _Object$defineProperty = $__require("58")["default"];
  exports["default"] = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        _Object$defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  exports.__esModule = true;
});
$__System.registerDynamic("54", [], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports["default"] = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  exports.__esModule = true;
});
$__System.registerDynamic("59", [], true, function ($__require, exports, module) {
	/* */
	"format cjs";

	var global = this || self,
	    GLOBAL = global;
	;(function () {
		"use strict";

		function Vnode(tag, key, attrs0, children, text, dom) {
			return { tag: tag, key: key, attrs: attrs0, children: children, text: text, dom: dom, domSize: undefined, state: undefined, _state: undefined, events: undefined, instance: undefined, skip: false };
		}
		Vnode.normalize = function (node) {
			if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined);
			if (node != null && typeof node !== "object") return Vnode("#", undefined, undefined, node === false ? "" : node, undefined, undefined);
			return node;
		};
		Vnode.normalizeChildren = function normalizeChildren(children) {
			for (var i = 0; i < children.length; i++) {
				children[i] = Vnode.normalize(children[i]);
			}
			return children;
		};
		var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g;
		var selectorCache = {};
		var hasOwn = {}.hasOwnProperty;
		function compileSelector(selector) {
			var match,
			    tag = "div",
			    classes = [],
			    attrs = {};
			while (match = selectorParser.exec(selector)) {
				var type = match[1],
				    value = match[2];
				if (type === "" && value !== "") tag = value;else if (type === "#") attrs.id = value;else if (type === ".") classes.push(value);else if (match[3][0] === "[") {
					var attrValue = match[6];
					if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\");
					if (match[4] === "class") classes.push(attrValue);else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true;
				}
			}
			if (classes.length > 0) attrs.className = classes.join(" ");
			return selectorCache[selector] = { tag: tag, attrs: attrs };
		}
		function execSelector(state, attrs, children) {
			var hasAttrs = false,
			    childList,
			    text;
			var className = attrs.className || attrs.class;
			for (var key in state.attrs) {
				if (hasOwn.call(state.attrs, key)) {
					attrs[key] = state.attrs[key];
				}
			}
			if (className !== undefined) {
				if (attrs.class !== undefined) {
					attrs.class = undefined;
					attrs.className = className;
				}
				if (state.attrs.className != null) {
					attrs.className = state.attrs.className + " " + className;
				}
			}
			for (var key in attrs) {
				if (hasOwn.call(attrs, key) && key !== "key") {
					hasAttrs = true;
					break;
				}
			}
			if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") {
				text = children[0].children;
			} else {
				childList = children;
			}
			return Vnode(state.tag, attrs.key, hasAttrs ? attrs : undefined, childList, text);
		}
		function hyperscript(selector) {
			// Because sloppy mode sucks
			var attrs = arguments[1],
			    start = 2,
			    children;
			if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
				throw Error("The selector must be either a string or a component.");
			}
			if (typeof selector === "string") {
				var cached = selectorCache[selector] || compileSelector(selector);
			}
			if (attrs == null) {
				attrs = {};
			} else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
				attrs = {};
				start = 1;
			}
			if (arguments.length === start + 1) {
				children = arguments[start];
				if (!Array.isArray(children)) children = [children];
			} else {
				children = [];
				while (start < arguments.length) children.push(arguments[start++]);
			}
			var normalized = Vnode.normalizeChildren(children);
			if (typeof selector === "string") {
				return execSelector(cached, attrs, normalized);
			} else {
				return Vnode(selector, attrs.key, attrs, normalized);
			}
		}
		hyperscript.trust = function (html) {
			if (html == null) html = "";
			return Vnode("<", undefined, undefined, html, undefined, undefined);
		};
		hyperscript.fragment = function (attrs1, children) {
			return Vnode("[", attrs1.key, attrs1, Vnode.normalizeChildren(children), undefined, undefined);
		};
		var m = hyperscript;
		/** @constructor */
		var PromisePolyfill = function (executor) {
			if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`");
			if (typeof executor !== "function") throw new TypeError("executor must be a function");
			var self = this,
			    resolvers = [],
			    rejectors = [],
			    resolveCurrent = handler(resolvers, true),
			    rejectCurrent = handler(rejectors, false);
			var instance = self._instance = { resolvers: resolvers, rejectors: rejectors };
			var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout;
			function handler(list, shouldAbsorb) {
				return function execute(value) {
					var then;
					try {
						if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
							if (value === self) throw new TypeError("Promise can't be resolved w/ itself");
							executeOnce(then.bind(value));
						} else {
							callAsync(function () {
								if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value);
								for (var i = 0; i < list.length; i++) list[i](value);
								resolvers.length = 0, rejectors.length = 0;
								instance.state = shouldAbsorb;
								instance.retry = function () {
									execute(value);
								};
							});
						}
					} catch (e) {
						rejectCurrent(e);
					}
				};
			}
			function executeOnce(then) {
				var runs = 0;
				function run(fn) {
					return function (value) {
						if (runs++ > 0) return;
						fn(value);
					};
				}
				var onerror = run(rejectCurrent);
				try {
					then(run(resolveCurrent), onerror);
				} catch (e) {
					onerror(e);
				}
			}
			executeOnce(executor);
		};
		PromisePolyfill.prototype.then = function (onFulfilled, onRejection) {
			var self = this,
			    instance = self._instance;
			function handle(callback, list, next, state) {
				list.push(function (value) {
					if (typeof callback !== "function") next(value);else try {
						resolveNext(callback(value));
					} catch (e) {
						if (rejectNext) rejectNext(e);
					}
				});
				if (typeof instance.retry === "function" && state === instance.state) instance.retry();
			}
			var resolveNext, rejectNext;
			var promise = new PromisePolyfill(function (resolve, reject) {
				resolveNext = resolve, rejectNext = reject;
			});
			handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false);
			return promise;
		};
		PromisePolyfill.prototype.catch = function (onRejection) {
			return this.then(null, onRejection);
		};
		PromisePolyfill.resolve = function (value) {
			if (value instanceof PromisePolyfill) return value;
			return new PromisePolyfill(function (resolve) {
				resolve(value);
			});
		};
		PromisePolyfill.reject = function (value) {
			return new PromisePolyfill(function (resolve, reject) {
				reject(value);
			});
		};
		PromisePolyfill.all = function (list) {
			return new PromisePolyfill(function (resolve, reject) {
				var total = list.length,
				    count = 0,
				    values = [];
				if (list.length === 0) resolve([]);else for (var i = 0; i < list.length; i++) {
					(function (i) {
						function consume(value) {
							count++;
							values[i] = value;
							if (count === total) resolve(values);
						}
						if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
							list[i].then(consume, reject);
						} else consume(list[i]);
					})(i);
				}
			});
		};
		PromisePolyfill.race = function (list) {
			return new PromisePolyfill(function (resolve, reject) {
				for (var i = 0; i < list.length; i++) {
					list[i].then(resolve, reject);
				}
			});
		};
		if (typeof window !== "undefined") {
			if (typeof window.Promise === "undefined") window.Promise = PromisePolyfill;
			var PromisePolyfill = window.Promise;
		} else if (typeof global !== "undefined") {
			if (typeof global.Promise === "undefined") global.Promise = PromisePolyfill;
			var PromisePolyfill = global.Promise;
		} else {}
		var buildQueryString = function (object) {
			if (Object.prototype.toString.call(object) !== "[object Object]") return "";
			var args = [];
			for (var key0 in object) {
				destructure(key0, object[key0]);
			}
			return args.join("&");
			function destructure(key0, value) {
				if (Array.isArray(value)) {
					for (var i = 0; i < value.length; i++) {
						destructure(key0 + "[" + i + "]", value[i]);
					}
				} else if (Object.prototype.toString.call(value) === "[object Object]") {
					for (var i in value) {
						destructure(key0 + "[" + i + "]", value[i]);
					}
				} else args.push(encodeURIComponent(key0) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""));
			}
		};
		var FILE_PROTOCOL_REGEX = new RegExp("^file://", "i");
		var _8 = function ($window, Promise) {
			var callbackCount = 0;
			var oncompletion;
			function setCompletionCallback(callback) {
				oncompletion = callback;
			}
			function finalizer() {
				var count = 0;
				function complete() {
					if (--count === 0 && typeof oncompletion === "function") oncompletion();
				}
				return function finalize(promise0) {
					var then0 = promise0.then;
					promise0.then = function () {
						count++;
						var next = then0.apply(promise0, arguments);
						next.then(complete, function (e) {
							complete();
							if (count === 0) throw e;
						});
						return finalize(next);
					};
					return promise0;
				};
			}
			function normalize(args, extra) {
				if (typeof args === "string") {
					var url = args;
					args = extra || {};
					if (args.url == null) args.url = url;
				}
				return args;
			}
			function request(args, extra) {
				var finalize = finalizer();
				args = normalize(args, extra);
				var promise0 = new Promise(function (resolve, reject) {
					if (args.method == null) args.method = "GET";
					args.method = args.method.toUpperCase();
					var useBody = args.method === "GET" || args.method === "TRACE" ? false : typeof args.useBody === "boolean" ? args.useBody : true;
					if (typeof args.serialize !== "function") args.serialize = typeof FormData !== "undefined" && args.data instanceof FormData ? function (value) {
						return value;
					} : JSON.stringify;
					if (typeof args.deserialize !== "function") args.deserialize = deserialize;
					if (typeof args.extract !== "function") args.extract = extract;
					args.url = interpolate(args.url, args.data);
					if (useBody) args.data = args.serialize(args.data);else args.url = assemble(args.url, args.data);
					var xhr = new $window.XMLHttpRequest(),
					    aborted = false,
					    _abort = xhr.abort;
					xhr.abort = function abort() {
						aborted = true;
						_abort.call(xhr);
					};
					xhr.open(args.method, args.url, typeof args.async === "boolean" ? args.async : true, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined);
					if (args.serialize === JSON.stringify && useBody) {
						xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
					}
					if (args.deserialize === deserialize) {
						xhr.setRequestHeader("Accept", "application/json, text/*");
					}
					if (args.withCredentials) xhr.withCredentials = args.withCredentials;
					for (var key in args.headers) if ({}.hasOwnProperty.call(args.headers, key)) {
						xhr.setRequestHeader(key, args.headers[key]);
					}
					if (typeof args.config === "function") xhr = args.config(xhr, args) || xhr;
					xhr.onreadystatechange = function () {
						// Don't throw errors on xhr.abort().
						if (aborted) return;
						if (xhr.readyState === 4) {
							try {
								var response = args.extract !== extract ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args));
								if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || FILE_PROTOCOL_REGEX.test(args.url)) {
									resolve(cast(args.type, response));
								} else {
									var error = new Error(xhr.responseText);
									for (var key in response) error[key] = response[key];
									reject(error);
								}
							} catch (e) {
								reject(e);
							}
						}
					};
					if (useBody && args.data != null) xhr.send(args.data);else xhr.send();
				});
				return args.background === true ? promise0 : finalize(promise0);
			}
			function jsonp(args, extra) {
				var finalize = finalizer();
				args = normalize(args, extra);
				var promise0 = new Promise(function (resolve, reject) {
					var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++;
					var script = $window.document.createElement("script");
					$window[callbackName] = function (data) {
						script.parentNode.removeChild(script);
						resolve(cast(args.type, data));
						delete $window[callbackName];
					};
					script.onerror = function () {
						script.parentNode.removeChild(script);
						reject(new Error("JSONP request failed"));
						delete $window[callbackName];
					};
					if (args.data == null) args.data = {};
					args.url = interpolate(args.url, args.data);
					args.data[args.callbackKey || "callback"] = callbackName;
					script.src = assemble(args.url, args.data);
					$window.document.documentElement.appendChild(script);
				});
				return args.background === true ? promise0 : finalize(promise0);
			}
			function interpolate(url, data) {
				if (data == null) return url;
				var tokens = url.match(/:[^\/]+/gi) || [];
				for (var i = 0; i < tokens.length; i++) {
					var key = tokens[i].slice(1);
					if (data[key] != null) {
						url = url.replace(tokens[i], data[key]);
					}
				}
				return url;
			}
			function assemble(url, data) {
				var querystring = buildQueryString(data);
				if (querystring !== "") {
					var prefix = url.indexOf("?") < 0 ? "?" : "&";
					url += prefix + querystring;
				}
				return url;
			}
			function deserialize(data) {
				try {
					return data !== "" ? JSON.parse(data) : null;
				} catch (e) {
					throw new Error(data);
				}
			}
			function extract(xhr) {
				return xhr.responseText;
			}
			function cast(type0, data) {
				if (typeof type0 === "function") {
					if (Array.isArray(data)) {
						for (var i = 0; i < data.length; i++) {
							data[i] = new type0(data[i]);
						}
					} else return new type0(data);
				}
				return data;
			}
			return { request: request, jsonp: jsonp, setCompletionCallback: setCompletionCallback };
		};
		var requestService = _8(window, PromisePolyfill);
		var coreRenderer = function ($window) {
			var $doc = $window.document;
			var $emptyFragment = $doc.createDocumentFragment();
			var nameSpace = {
				svg: "http://www.w3.org/2000/svg",
				math: "http://www.w3.org/1998/Math/MathML"
			};
			var onevent;
			function setEventCallback(callback) {
				return onevent = callback;
			}
			function getNameSpace(vnode) {
				return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag];
			}
			//create
			function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
				for (var i = start; i < end; i++) {
					var vnode = vnodes[i];
					if (vnode != null) {
						createNode(parent, vnode, hooks, ns, nextSibling);
					}
				}
			}
			function createNode(parent, vnode, hooks, ns, nextSibling) {
				var tag = vnode.tag;
				if (typeof tag === "string") {
					vnode.state = {};
					if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
					switch (tag) {
						case "#":
							return createText(parent, vnode, nextSibling);
						case "<":
							return createHTML(parent, vnode, nextSibling);
						case "[":
							return createFragment(parent, vnode, hooks, ns, nextSibling);
						default:
							return createElement(parent, vnode, hooks, ns, nextSibling);
					}
				} else return createComponent(parent, vnode, hooks, ns, nextSibling);
			}
			function createText(parent, vnode, nextSibling) {
				vnode.dom = $doc.createTextNode(vnode.children);
				insertNode(parent, vnode.dom, nextSibling);
				return vnode.dom;
			}
			function createHTML(parent, vnode, nextSibling) {
				var match1 = vnode.children.match(/^\s*?<(\w+)/im) || [];
				var parent1 = { caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup" }[match1[1]] || "div";
				var temp = $doc.createElement(parent1);
				temp.innerHTML = vnode.children;
				vnode.dom = temp.firstChild;
				vnode.domSize = temp.childNodes.length;
				var fragment = $doc.createDocumentFragment();
				var child;
				while (child = temp.firstChild) {
					fragment.appendChild(child);
				}
				insertNode(parent, fragment, nextSibling);
				return fragment;
			}
			function createFragment(parent, vnode, hooks, ns, nextSibling) {
				var fragment = $doc.createDocumentFragment();
				if (vnode.children != null) {
					var children = vnode.children;
					createNodes(fragment, children, 0, children.length, hooks, null, ns);
				}
				vnode.dom = fragment.firstChild;
				vnode.domSize = fragment.childNodes.length;
				insertNode(parent, fragment, nextSibling);
				return fragment;
			}
			function createElement(parent, vnode, hooks, ns, nextSibling) {
				var tag = vnode.tag;
				var attrs2 = vnode.attrs;
				var is = attrs2 && attrs2.is;
				ns = getNameSpace(vnode) || ns;
				var element = ns ? is ? $doc.createElementNS(ns, tag, { is: is }) : $doc.createElementNS(ns, tag) : is ? $doc.createElement(tag, { is: is }) : $doc.createElement(tag);
				vnode.dom = element;
				if (attrs2 != null) {
					setAttrs(vnode, attrs2, ns);
				}
				insertNode(parent, element, nextSibling);
				if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
					setContentEditable(vnode);
				} else {
					if (vnode.text != null) {
						if (vnode.text !== "") element.textContent = vnode.text;else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)];
					}
					if (vnode.children != null) {
						var children = vnode.children;
						createNodes(element, children, 0, children.length, hooks, null, ns);
						setLateAttrs(vnode);
					}
				}
				return element;
			}
			function initComponent(vnode, hooks) {
				var sentinel;
				if (typeof vnode.tag.view === "function") {
					vnode.state = Object.create(vnode.tag);
					sentinel = vnode.state.view;
					if (sentinel.$$reentrantLock$$ != null) return $emptyFragment;
					sentinel.$$reentrantLock$$ = true;
				} else {
					vnode.state = void 0;
					sentinel = vnode.tag;
					if (sentinel.$$reentrantLock$$ != null) return $emptyFragment;
					sentinel.$$reentrantLock$$ = true;
					vnode.state = vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function" ? new vnode.tag(vnode) : vnode.tag(vnode);
				}
				vnode._state = vnode.state;
				if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
				initLifecycle(vnode._state, vnode, hooks);
				vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode));
				if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument");
				sentinel.$$reentrantLock$$ = null;
			}
			function createComponent(parent, vnode, hooks, ns, nextSibling) {
				initComponent(vnode, hooks);
				if (vnode.instance != null) {
					var element = createNode(parent, vnode.instance, hooks, ns, nextSibling);
					vnode.dom = vnode.instance.dom;
					vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0;
					insertNode(parent, element, nextSibling);
					return element;
				} else {
					vnode.domSize = 0;
					return $emptyFragment;
				}
			}
			//update
			function updateNodes(parent, old, vnodes, recycling, hooks, nextSibling, ns) {
				if (old === vnodes || old == null && vnodes == null) return;else if (old == null) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns);else if (vnodes == null) removeNodes(old, 0, old.length, vnodes);else {
					if (old.length === vnodes.length) {
						var isUnkeyed = false;
						for (var i = 0; i < vnodes.length; i++) {
							if (vnodes[i] != null && old[i] != null) {
								isUnkeyed = vnodes[i].key == null && old[i].key == null;
								break;
							}
						}
						if (isUnkeyed) {
							for (var i = 0; i < old.length; i++) {
								if (old[i] === vnodes[i]) continue;else if (old[i] == null && vnodes[i] != null) createNode(parent, vnodes[i], hooks, ns, getNextSibling(old, i + 1, nextSibling));else if (vnodes[i] == null) removeNodes(old, i, i + 1, vnodes);else updateNode(parent, old[i], vnodes[i], hooks, getNextSibling(old, i + 1, nextSibling), recycling, ns);
							}
							return;
						}
					}
					recycling = recycling || isRecyclable(old, vnodes);
					if (recycling) {
						var pool = old.pool;
						old = old.concat(old.pool);
					}
					var oldStart = 0,
					    start = 0,
					    oldEnd = old.length - 1,
					    end = vnodes.length - 1,
					    map;
					while (oldEnd >= oldStart && end >= start) {
						var o = old[oldStart],
						    v = vnodes[start];
						if (o === v && !recycling) oldStart++, start++;else if (o == null) oldStart++;else if (v == null) start++;else if (o.key === v.key) {
							var shouldRecycle = pool != null && oldStart >= old.length - pool.length || pool == null && recycling;
							oldStart++, start++;
							updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), shouldRecycle, ns);
							if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling);
						} else {
							var o = old[oldEnd];
							if (o === v && !recycling) oldEnd--, start++;else if (o == null) oldEnd--;else if (v == null) start++;else if (o.key === v.key) {
								var shouldRecycle = pool != null && oldEnd >= old.length - pool.length || pool == null && recycling;
								updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns);
								if (recycling || start < end) insertNode(parent, toFragment(o), getNextSibling(old, oldStart, nextSibling));
								oldEnd--, start++;
							} else break;
						}
					}
					while (oldEnd >= oldStart && end >= start) {
						var o = old[oldEnd],
						    v = vnodes[end];
						if (o === v && !recycling) oldEnd--, end--;else if (o == null) oldEnd--;else if (v == null) end--;else if (o.key === v.key) {
							var shouldRecycle = pool != null && oldEnd >= old.length - pool.length || pool == null && recycling;
							updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns);
							if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling);
							if (o.dom != null) nextSibling = o.dom;
							oldEnd--, end--;
						} else {
							if (!map) map = getKeyMap(old, oldEnd);
							if (v != null) {
								var oldIndex = map[v.key];
								if (oldIndex != null) {
									var movable = old[oldIndex];
									var shouldRecycle = pool != null && oldIndex >= old.length - pool.length || pool == null && recycling;
									updateNode(parent, movable, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns);
									insertNode(parent, toFragment(movable), nextSibling);
									old[oldIndex].skip = true;
									if (movable.dom != null) nextSibling = movable.dom;
								} else {
									var dom = createNode(parent, v, hooks, ns, nextSibling);
									nextSibling = dom;
								}
							}
							end--;
						}
						if (end < start) break;
					}
					createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
					removeNodes(old, oldStart, oldEnd + 1, vnodes);
				}
			}
			function updateNode(parent, old, vnode, hooks, nextSibling, recycling, ns) {
				var oldTag = old.tag,
				    tag = vnode.tag;
				if (oldTag === tag) {
					vnode.state = old.state;
					vnode._state = old._state;
					vnode.events = old.events;
					if (!recycling && shouldNotUpdate(vnode, old)) return;
					if (typeof oldTag === "string") {
						if (vnode.attrs != null) {
							if (recycling) {
								vnode.state = {};
								initLifecycle(vnode.attrs, vnode, hooks);
							} else updateLifecycle(vnode.attrs, vnode, hooks);
						}
						switch (oldTag) {
							case "#":
								updateText(old, vnode);break;
							case "<":
								updateHTML(parent, old, vnode, nextSibling);break;
							case "[":
								updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns);break;
							default:
								updateElement(old, vnode, recycling, hooks, ns);
						}
					} else updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns);
				} else {
					removeNode(old, null);
					createNode(parent, vnode, hooks, ns, nextSibling);
				}
			}
			function updateText(old, vnode) {
				if (old.children.toString() !== vnode.children.toString()) {
					old.dom.nodeValue = vnode.children;
				}
				vnode.dom = old.dom;
			}
			function updateHTML(parent, old, vnode, nextSibling) {
				if (old.children !== vnode.children) {
					toFragment(old);
					createHTML(parent, vnode, nextSibling);
				} else vnode.dom = old.dom, vnode.domSize = old.domSize;
			}
			function updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns) {
				updateNodes(parent, old.children, vnode.children, recycling, hooks, nextSibling, ns);
				var domSize = 0,
				    children = vnode.children;
				vnode.dom = null;
				if (children != null) {
					for (var i = 0; i < children.length; i++) {
						var child = children[i];
						if (child != null && child.dom != null) {
							if (vnode.dom == null) vnode.dom = child.dom;
							domSize += child.domSize || 1;
						}
					}
					if (domSize !== 1) vnode.domSize = domSize;
				}
			}
			function updateElement(old, vnode, recycling, hooks, ns) {
				var element = vnode.dom = old.dom;
				ns = getNameSpace(vnode) || ns;
				if (vnode.tag === "textarea") {
					if (vnode.attrs == null) vnode.attrs = {};
					if (vnode.text != null) {
						vnode.attrs.value = vnode.text; //FIXME handle0 multiple children
						vnode.text = undefined;
					}
				}
				updateAttrs(vnode, old.attrs, vnode.attrs, ns);
				if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
					setContentEditable(vnode);
				} else if (old.text != null && vnode.text != null && vnode.text !== "") {
					if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text;
				} else {
					if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)];
					if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)];
					updateNodes(element, old.children, vnode.children, recycling, hooks, null, ns);
				}
			}
			function updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns) {
				if (recycling) {
					initComponent(vnode, hooks);
				} else {
					vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode));
					if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument");
					if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks);
					updateLifecycle(vnode._state, vnode, hooks);
				}
				if (vnode.instance != null) {
					if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling);else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, recycling, ns);
					vnode.dom = vnode.instance.dom;
					vnode.domSize = vnode.instance.domSize;
				} else if (old.instance != null) {
					removeNode(old.instance, null);
					vnode.dom = undefined;
					vnode.domSize = 0;
				} else {
					vnode.dom = old.dom;
					vnode.domSize = old.domSize;
				}
			}
			function isRecyclable(old, vnodes) {
				if (old.pool != null && Math.abs(old.pool.length - vnodes.length) <= Math.abs(old.length - vnodes.length)) {
					var oldChildrenLength = old[0] && old[0].children && old[0].children.length || 0;
					var poolChildrenLength = old.pool[0] && old.pool[0].children && old.pool[0].children.length || 0;
					var vnodesChildrenLength = vnodes[0] && vnodes[0].children && vnodes[0].children.length || 0;
					if (Math.abs(poolChildrenLength - vnodesChildrenLength) <= Math.abs(oldChildrenLength - vnodesChildrenLength)) {
						return true;
					}
				}
				return false;
			}
			function getKeyMap(vnodes, end) {
				var map = {},
				    i = 0;
				for (var i = 0; i < end; i++) {
					var vnode = vnodes[i];
					if (vnode != null) {
						var key2 = vnode.key;
						if (key2 != null) map[key2] = i;
					}
				}
				return map;
			}
			function toFragment(vnode) {
				var count0 = vnode.domSize;
				if (count0 != null || vnode.dom == null) {
					var fragment = $doc.createDocumentFragment();
					if (count0 > 0) {
						var dom = vnode.dom;
						while (--count0) fragment.appendChild(dom.nextSibling);
						fragment.insertBefore(dom, fragment.firstChild);
					}
					return fragment;
				} else return vnode.dom;
			}
			function getNextSibling(vnodes, i, nextSibling) {
				for (; i < vnodes.length; i++) {
					if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom;
				}
				return nextSibling;
			}
			function insertNode(parent, dom, nextSibling) {
				if (nextSibling && nextSibling.parentNode) parent.insertBefore(dom, nextSibling);else parent.appendChild(dom);
			}
			function setContentEditable(vnode) {
				var children = vnode.children;
				if (children != null && children.length === 1 && children[0].tag === "<") {
					var content = children[0].children;
					if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content;
				} else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted");
			}
			//remove
			function removeNodes(vnodes, start, end, context) {
				for (var i = start; i < end; i++) {
					var vnode = vnodes[i];
					if (vnode != null) {
						if (vnode.skip) vnode.skip = false;else removeNode(vnode, context);
					}
				}
			}
			function removeNode(vnode, context) {
				var expected = 1,
				    called = 0;
				if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
					var result = vnode.attrs.onbeforeremove.call(vnode.state, vnode);
					if (result != null && typeof result.then === "function") {
						expected++;
						result.then(continuation, continuation);
					}
				}
				if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeremove === "function") {
					var result = vnode._state.onbeforeremove.call(vnode.state, vnode);
					if (result != null && typeof result.then === "function") {
						expected++;
						result.then(continuation, continuation);
					}
				}
				continuation();
				function continuation() {
					if (++called === expected) {
						onremove(vnode);
						if (vnode.dom) {
							var count0 = vnode.domSize || 1;
							if (count0 > 1) {
								var dom = vnode.dom;
								while (--count0) {
									removeNodeFromDOM(dom.nextSibling);
								}
							}
							removeNodeFromDOM(vnode.dom);
							if (context != null && vnode.domSize == null && !hasIntegrationMethods(vnode.attrs) && typeof vnode.tag === "string") {
								//TODO test custom elements
								if (!context.pool) context.pool = [vnode];else context.pool.push(vnode);
							}
						}
					}
				}
			}
			function removeNodeFromDOM(node) {
				var parent = node.parentNode;
				if (parent != null) parent.removeChild(node);
			}
			function onremove(vnode) {
				if (vnode.attrs && typeof vnode.attrs.onremove === "function") vnode.attrs.onremove.call(vnode.state, vnode);
				if (typeof vnode.tag !== "string" && typeof vnode._state.onremove === "function") vnode._state.onremove.call(vnode.state, vnode);
				if (vnode.instance != null) onremove(vnode.instance);else {
					var children = vnode.children;
					if (Array.isArray(children)) {
						for (var i = 0; i < children.length; i++) {
							var child = children[i];
							if (child != null) onremove(child);
						}
					}
				}
			}
			//attrs2
			function setAttrs(vnode, attrs2, ns) {
				for (var key2 in attrs2) {
					setAttr(vnode, key2, null, attrs2[key2], ns);
				}
			}
			function setAttr(vnode, key2, old, value, ns) {
				var element = vnode.dom;
				if (key2 === "key" || key2 === "is" || old === value && !isFormAttribute(vnode, key2) && typeof value !== "object" || typeof value === "undefined" || isLifecycleMethod(key2)) return;
				var nsLastIndex = key2.indexOf(":");
				if (nsLastIndex > -1 && key2.substr(0, nsLastIndex) === "xlink") {
					element.setAttributeNS("http://www.w3.org/1999/xlink", key2.slice(nsLastIndex + 1), value);
				} else if (key2[0] === "o" && key2[1] === "n" && typeof value === "function") updateEvent(vnode, key2, value);else if (key2 === "style") updateStyle(element, old, value);else if (key2 in element && !isAttribute(key2) && ns === undefined && !isCustomElement(vnode)) {
					if (key2 === "value") {
						var normalized0 = "" + value; // eslint-disable-line no-implicit-coercion
						//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
						if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return;
						//setting select[value] to same value while having select open blinks select dropdown in Chrome
						if (vnode.tag === "select") {
							if (value === null) {
								if (vnode.dom.selectedIndex === -1 && vnode.dom === $doc.activeElement) return;
							} else {
								if (old !== null && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return;
							}
						}
						//setting option[value] to same value while having select open blinks select dropdown in Chrome
						if (vnode.tag === "option" && old != null && vnode.dom.value === normalized0) return;
					}
					// If you assign an input type1 that is not supported by IE 11 with an assignment expression, an error0 will occur.
					if (vnode.tag === "input" && key2 === "type") {
						element.setAttribute(key2, value);
						return;
					}
					element[key2] = value;
				} else {
					if (typeof value === "boolean") {
						if (value) element.setAttribute(key2, "");else element.removeAttribute(key2);
					} else element.setAttribute(key2 === "className" ? "class" : key2, value);
				}
			}
			function setLateAttrs(vnode) {
				var attrs2 = vnode.attrs;
				if (vnode.tag === "select" && attrs2 != null) {
					if ("value" in attrs2) setAttr(vnode, "value", null, attrs2.value, undefined);
					if ("selectedIndex" in attrs2) setAttr(vnode, "selectedIndex", null, attrs2.selectedIndex, undefined);
				}
			}
			function updateAttrs(vnode, old, attrs2, ns) {
				if (attrs2 != null) {
					for (var key2 in attrs2) {
						setAttr(vnode, key2, old && old[key2], attrs2[key2], ns);
					}
				}
				if (old != null) {
					for (var key2 in old) {
						if (attrs2 == null || !(key2 in attrs2)) {
							if (key2 === "className") key2 = "class";
							if (key2[0] === "o" && key2[1] === "n" && !isLifecycleMethod(key2)) updateEvent(vnode, key2, undefined);else if (key2 !== "key") vnode.dom.removeAttribute(key2);
						}
					}
				}
			}
			function isFormAttribute(vnode, attr) {
				return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === $doc.activeElement;
			}
			function isLifecycleMethod(attr) {
				return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate";
			}
			function isAttribute(attr) {
				return attr === "href" || attr === "list" || attr === "form" || attr === "width" || attr === "height"; // || attr === "type"
			}
			function isCustomElement(vnode) {
				return vnode.attrs.is || vnode.tag.indexOf("-") > -1;
			}
			function hasIntegrationMethods(source) {
				return source != null && (source.oncreate || source.onupdate || source.onbeforeremove || source.onremove);
			}
			//style
			function updateStyle(element, old, style) {
				if (old === style) element.style.cssText = "", old = null;
				if (style == null) element.style.cssText = "";else if (typeof style === "string") element.style.cssText = style;else {
					if (typeof old === "string") element.style.cssText = "";
					for (var key2 in style) {
						element.style[key2] = style[key2];
					}
					if (old != null && typeof old !== "string") {
						for (var key2 in old) {
							if (!(key2 in style)) element.style[key2] = "";
						}
					}
				}
			}
			//event
			function updateEvent(vnode, key2, value) {
				var element = vnode.dom;
				var callback = typeof onevent !== "function" ? value : function (e) {
					var result = value.call(element, e);
					onevent.call(element, e);
					return result;
				};
				if (key2 in element) element[key2] = typeof value === "function" ? callback : null;else {
					var eventName = key2.slice(2);
					if (vnode.events === undefined) vnode.events = {};
					if (vnode.events[key2] === callback) return;
					if (vnode.events[key2] != null) element.removeEventListener(eventName, vnode.events[key2], false);
					if (typeof value === "function") {
						vnode.events[key2] = callback;
						element.addEventListener(eventName, vnode.events[key2], false);
					}
				}
			}
			//lifecycle
			function initLifecycle(source, vnode, hooks) {
				if (typeof source.oninit === "function") source.oninit.call(vnode.state, vnode);
				if (typeof source.oncreate === "function") hooks.push(source.oncreate.bind(vnode.state, vnode));
			}
			function updateLifecycle(source, vnode, hooks) {
				if (typeof source.onupdate === "function") hooks.push(source.onupdate.bind(vnode.state, vnode));
			}
			function shouldNotUpdate(vnode, old) {
				var forceVnodeUpdate, forceComponentUpdate;
				if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") forceVnodeUpdate = vnode.attrs.onbeforeupdate.call(vnode.state, vnode, old);
				if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeupdate === "function") forceComponentUpdate = vnode._state.onbeforeupdate.call(vnode.state, vnode, old);
				if (!(forceVnodeUpdate === undefined && forceComponentUpdate === undefined) && !forceVnodeUpdate && !forceComponentUpdate) {
					vnode.dom = old.dom;
					vnode.domSize = old.domSize;
					vnode.instance = old.instance;
					return true;
				}
				return false;
			}
			function render(dom, vnodes) {
				if (!dom) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");
				var hooks = [];
				var active = $doc.activeElement;
				var namespace = dom.namespaceURI;
				// First time0 rendering into a node clears it out
				if (dom.vnodes == null) dom.textContent = "";
				if (!Array.isArray(vnodes)) vnodes = [vnodes];
				updateNodes(dom, dom.vnodes, Vnode.normalizeChildren(vnodes), false, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace);
				dom.vnodes = vnodes;
				for (var i = 0; i < hooks.length; i++) hooks[i]();
				if ($doc.activeElement !== active) active.focus();
			}
			return { render: render, setEventCallback: setEventCallback };
		};
		function throttle(callback) {
			//60fps translates to 16.6ms, round it down since setTimeout requires int
			var time = 16;
			var last = 0,
			    pending = null;
			var timeout = typeof requestAnimationFrame === "function" ? requestAnimationFrame : setTimeout;
			return function () {
				var now = Date.now();
				if (last === 0 || now - last >= time) {
					last = now;
					callback();
				} else if (pending === null) {
					pending = timeout(function () {
						pending = null;
						callback();
						last = Date.now();
					}, time - (now - last));
				}
			};
		}
		var _11 = function ($window) {
			var renderService = coreRenderer($window);
			renderService.setEventCallback(function (e) {
				if (e.redraw === false) e.redraw = undefined;else redraw();
			});
			var callbacks = [];
			function subscribe(key1, callback) {
				unsubscribe(key1);
				callbacks.push(key1, throttle(callback));
			}
			function unsubscribe(key1) {
				var index = callbacks.indexOf(key1);
				if (index > -1) callbacks.splice(index, 2);
			}
			function redraw() {
				for (var i = 1; i < callbacks.length; i += 2) {
					callbacks[i]();
				}
			}
			return { subscribe: subscribe, unsubscribe: unsubscribe, redraw: redraw, render: renderService.render };
		};
		var redrawService = _11(window);
		requestService.setCompletionCallback(redrawService.redraw);
		var _16 = function (redrawService0) {
			return function (root, component) {
				if (component === null) {
					redrawService0.render(root, []);
					redrawService0.unsubscribe(root);
					return;
				}

				if (component.view == null && typeof component !== "function") throw new Error("m.mount(element, component) expects a component, not a vnode");

				var run0 = function () {
					redrawService0.render(root, Vnode(component));
				};
				redrawService0.subscribe(root, run0);
				redrawService0.redraw();
			};
		};
		m.mount = _16(redrawService);
		var Promise = PromisePolyfill;
		var parseQueryString = function (string) {
			if (string === "" || string == null) return {};
			if (string.charAt(0) === "?") string = string.slice(1);
			var entries = string.split("&"),
			    data0 = {},
			    counters = {};
			for (var i = 0; i < entries.length; i++) {
				var entry = entries[i].split("=");
				var key5 = decodeURIComponent(entry[0]);
				var value = entry.length === 2 ? decodeURIComponent(entry[1]) : "";
				if (value === "true") value = true;else if (value === "false") value = false;
				var levels = key5.split(/\]\[?|\[/);
				var cursor = data0;
				if (key5.indexOf("[") > -1) levels.pop();
				for (var j = 0; j < levels.length; j++) {
					var level = levels[j],
					    nextLevel = levels[j + 1];
					var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10));
					var isValue = j === levels.length - 1;
					if (level === "") {
						var key5 = levels.slice(0, j).join();
						if (counters[key5] == null) counters[key5] = 0;
						level = counters[key5]++;
					}
					if (cursor[level] == null) {
						cursor[level] = isValue ? value : isNumber ? [] : {};
					}
					cursor = cursor[level];
				}
			}
			return data0;
		};
		var coreRouter = function ($window) {
			var supportsPushState = typeof $window.history.pushState === "function";
			var callAsync0 = typeof setImmediate === "function" ? setImmediate : setTimeout;
			function normalize1(fragment0) {
				var data = $window.location[fragment0].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent);
				if (fragment0 === "pathname" && data[0] !== "/") data = "/" + data;
				return data;
			}
			var asyncId;
			function debounceAsync(callback0) {
				return function () {
					if (asyncId != null) return;
					asyncId = callAsync0(function () {
						asyncId = null;
						callback0();
					});
				};
			}
			function parsePath(path, queryData, hashData) {
				var queryIndex = path.indexOf("?");
				var hashIndex = path.indexOf("#");
				var pathEnd = queryIndex > -1 ? queryIndex : hashIndex > -1 ? hashIndex : path.length;
				if (queryIndex > -1) {
					var queryEnd = hashIndex > -1 ? hashIndex : path.length;
					var queryParams = parseQueryString(path.slice(queryIndex + 1, queryEnd));
					for (var key4 in queryParams) queryData[key4] = queryParams[key4];
				}
				if (hashIndex > -1) {
					var hashParams = parseQueryString(path.slice(hashIndex + 1));
					for (var key4 in hashParams) hashData[key4] = hashParams[key4];
				}
				return path.slice(0, pathEnd);
			}
			var router = { prefix: "#!" };
			router.getPath = function () {
				var type2 = router.prefix.charAt(0);
				switch (type2) {
					case "#":
						return normalize1("hash").slice(router.prefix.length);
					case "?":
						return normalize1("search").slice(router.prefix.length) + normalize1("hash");
					default:
						return normalize1("pathname").slice(router.prefix.length) + normalize1("search") + normalize1("hash");
				}
			};
			router.setPath = function (path, data, options) {
				var queryData = {},
				    hashData = {};
				path = parsePath(path, queryData, hashData);
				if (data != null) {
					for (var key4 in data) queryData[key4] = data[key4];
					path = path.replace(/:([^\/]+)/g, function (match2, token) {
						delete queryData[token];
						return data[token];
					});
				}
				var query = buildQueryString(queryData);
				if (query) path += "?" + query;
				var hash = buildQueryString(hashData);
				if (hash) path += "#" + hash;
				if (supportsPushState) {
					var state = options ? options.state : null;
					var title = options ? options.title : null;
					$window.onpopstate();
					if (options && options.replace) $window.history.replaceState(state, title, router.prefix + path);else $window.history.pushState(state, title, router.prefix + path);
				} else $window.location.href = router.prefix + path;
			};
			router.defineRoutes = function (routes, resolve, reject) {
				function resolveRoute() {
					var path = router.getPath();
					var params = {};
					var pathname = parsePath(path, params, params);
					var state = $window.history.state;
					if (state != null) {
						for (var k in state) params[k] = state[k];
					}
					for (var route0 in routes) {
						var matcher = new RegExp("^" + route0.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$");
						if (matcher.test(pathname)) {
							pathname.replace(matcher, function () {
								var keys = route0.match(/:[^\/]+/g) || [];
								var values = [].slice.call(arguments, 1, -2);
								for (var i = 0; i < keys.length; i++) {
									params[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i]);
								}
								resolve(routes[route0], params, path, route0);
							});
							return;
						}
					}
					reject(path, params);
				}
				if (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute);else if (router.prefix.charAt(0) === "#") $window.onhashchange = resolveRoute;
				resolveRoute();
			};
			return router;
		};
		var _20 = function ($window, redrawService0) {
			var routeService = coreRouter($window);
			var identity = function (v) {
				return v;
			};
			var render1, component, attrs3, currentPath, lastUpdate;
			var route = function (root, defaultRoute, routes) {
				if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined");
				var run1 = function () {
					if (render1 != null) redrawService0.render(root, render1(Vnode(component, attrs3.key, attrs3)));
				};
				var bail = function (path) {
					if (path !== defaultRoute) routeService.setPath(defaultRoute, null, { replace: true });else throw new Error("Could not resolve default route " + defaultRoute);
				};
				routeService.defineRoutes(routes, function (payload, params, path) {
					var update = lastUpdate = function (routeResolver, comp) {
						if (update !== lastUpdate) return;
						component = comp != null && (typeof comp.view === "function" || typeof comp === "function") ? comp : "div";
						attrs3 = params, currentPath = path, lastUpdate = null;
						render1 = (routeResolver.render || identity).bind(routeResolver);
						run1();
					};
					if (payload.view || typeof payload === "function") update({}, payload);else {
						if (payload.onmatch) {
							Promise.resolve(payload.onmatch(params, path)).then(function (resolved) {
								update(payload, resolved);
							}, bail);
						} else update(payload, "div");
					}
				}, bail);
				redrawService0.subscribe(root, run1);
			};
			route.set = function (path, data, options) {
				if (lastUpdate != null) {
					options = options || {};
					options.replace = true;
				}
				lastUpdate = null;
				routeService.setPath(path, data, options);
			};
			route.get = function () {
				return currentPath;
			};
			route.prefix = function (prefix0) {
				routeService.prefix = prefix0;
			};
			route.link = function (vnode1) {
				vnode1.dom.setAttribute("href", routeService.prefix + vnode1.attrs.href);
				vnode1.dom.onclick = function (e) {
					if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return;
					e.preventDefault();
					e.redraw = false;
					var href = this.getAttribute("href");
					if (href.indexOf(routeService.prefix) === 0) href = href.slice(routeService.prefix.length);
					route.set(href, undefined, undefined);
				};
			};
			route.param = function (key3) {
				if (typeof attrs3 !== "undefined" && typeof key3 !== "undefined") return attrs3[key3];
				return attrs3;
			};
			return route;
		};
		m.route = _20(window, redrawService);
		m.withAttr = function (attrName, callback1, context) {
			return function (e) {
				callback1.call(context || this, attrName in e.currentTarget ? e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName));
			};
		};
		var _28 = coreRenderer(window);
		m.render = _28.render;
		m.redraw = redrawService.redraw;
		m.request = requestService.request;
		m.jsonp = requestService.jsonp;
		m.parseQueryString = parseQueryString;
		m.buildQueryString = buildQueryString;
		m.version = "1.1.3";
		m.vnode = Vnode;
		if (typeof module !== "undefined") module["exports"] = m;else window.m = m;
	})();
});
$__System.registerDynamic("52", ["59"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("59");
});
$__System.register('5a', ['52', '53', '54'], function (_export) {
  var m, _createClass, _classCallCheck, AddPanelForm;

  return {
    setters: [function (_3) {
      m = _3['default'];
    }, function (_) {
      _createClass = _['default'];
    }, function (_2) {
      _classCallCheck = _2['default'];
    }],
    execute: function () {
      'use strict';

      AddPanelForm = (function () {
        function AddPanelForm() {
          _classCallCheck(this, AddPanelForm);
        }

        _createClass(AddPanelForm, [{
          key: 'onclick',
          value: function onclick(attrs) {
            m.route.set('/');
          }
        }, {
          key: 'view',
          value: function view(vnode) {
            return m('div', {
              'class': 'close-button',
              onclick: this.onclick
            }, 'x');
          }
        }]);

        return AddPanelForm;
      })();

      _export('default', AddPanelForm);
    }
  };
});
$__System.register('5b', ['52', '53', '54', '5a'], function (_export) {
  var m, _createClass, _classCallCheck, CloseButton, AddPanelForm;

  return {
    setters: [function (_3) {
      m = _3['default'];
    }, function (_) {
      _createClass = _['default'];
    }, function (_2) {
      _classCallCheck = _2['default'];
    }, function (_a) {
      CloseButton = _a['default'];
    }],
    execute: function () {
      'use strict';

      AddPanelForm = (function () {
        function AddPanelForm() {
          _classCallCheck(this, AddPanelForm);
        }

        _createClass(AddPanelForm, [{
          key: 'view',
          value: function view(vnode) {
            return m('div', { 'class': 'container' }, [m(CloseButton), m('div', 'field1'), m('div', 'field2'), m('div', 'field3')]);
          }
        }]);

        return AddPanelForm;
      })();

      _export('default', AddPanelForm);
    }
  };
});
$__System.register('1', ['52', '56', '5b'], function (_export) {
  'use strict';

  var m, Index, AddPanelForm;
  return {
    setters: [function (_) {
      m = _['default'];
    }, function (_2) {
      Index = _2['default'];
    }, function (_b) {
      AddPanelForm = _b['default'];
    }],
    execute: function () {

      void (function () {

        m.route(document.getElementById('app'), '/', {
          '/': Index,
          '/addReport': AddPanelForm
        });
      })();
    }
  };
});
})
(function(factory) {
  factory();
});
//# sourceMappingURL=main.js.map