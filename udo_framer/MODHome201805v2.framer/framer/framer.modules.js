require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Gamepad":[function(require,module,exports){
var GamepadSystem, _,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_ = Framer._;

Function.prototype.define = function(prop, desc) {
  return Object.defineProperty(this.prototype, prop, desc);
};

GamepadSystem = (function(superClass) {
  extend(GamepadSystem, superClass);

  function GamepadSystem() {
    this.eventLoop = bind(this.eventLoop, this);
    this.connectedGamepad = void 0;
    this.loopRequest = void 0;
    this.pollingGP = void 0;
    this.buttonsPressed = [];
    this.buttonsPressedPrev = [];
    this.loopInterval = 500;
    this.axisSensitivity = .2;
    this.eventsInSequence = 0;
    this.throttled = true;
    if (navigator.getGamepads()[0]) {
      this.connectedGamepad = navigator.getGamepads()[0];
      this.loopRequest = window.requestAnimationFrame(this.eventLoop.bind(this));
    }
    window.addEventListener('gamepadconnected', (function(_this) {
      return function(e) {
        _this.connectedGamepad = navigator.getGamepads()[0];
        return _this.loopRequest = window.requestAnimationFrame(_this.eventLoop.bind(_this));
      };
    })(this));
    window.addEventListener('gamepaddisconnected', (function(_this) {
      return function(e) {
        _this.connectedGamepad = null;
        return window.cancelAnimationFrame(_this.loopRequest);
      };
    })(this));
  }

  GamepadSystem.define('throttle', {
    set: function(bool) {
      this.throttled = bool;
      if (bool === true) {
        return this.axisSensitivity = .2;
      } else {
        return this.axisSensitivity = .2;
      }
    }
  });

  GamepadSystem.prototype.eventLoop = function() {
    return setTimeout((function(_this) {
      return function() {
        var activeAxis, axis, button, buttonPressed, i, index, j, k, l, len, len1, len2, len3, ref, ref1, ref2, ref3;
        _this.pollingGP = navigator.getGamepads()[0];
        ref = _this.pollingGP.buttons;
        for (index = i = 0, len = ref.length; i < len; index = ++i) {
          button = ref[index];
          button.type = 'button';
          button.keyCode = index;
        }
        _this.buttonsPressedPrev = _this.buttonsPressed;
        _this.buttonsPressed = _.filter(_this.pollingGP.buttons, {
          pressed: true
        });
        ref1 = _this.pollingGP.axes;
        for (index = j = 0, len1 = ref1.length; j < len1; index = ++j) {
          axis = ref1[index];
          if (index <= 3) {
            activeAxis = {};
            if (axis > _this.axisSensitivity || axis < -_this.axisSensitivity) {
              activeAxis.type = 'axis';
              activeAxis.value = axis;
              switch (index) {
                case 0:
                  if (axis > 0) {
                    activeAxis.keyCode = 39;
                    _this.buttonsPressed.push(activeAxis);
                  } else {
                    activeAxis.keyCode = 37;
                    _this.buttonsPressed.push(activeAxis);
                  }
                  break;
                case 1:
                  if (axis > 0) {
                    activeAxis.keyCode = 40;
                    _this.buttonsPressed.push(activeAxis);
                  } else {
                    activeAxis.keyCode = 38;
                    _this.buttonsPressed.push(activeAxis);
                  }
                  break;
                case 2:
                  if (axis > 0) {
                    activeAxis.keyCode = 44;
                    _this.buttonsPressed.push(activeAxis);
                  } else {
                    activeAxis.keyCode = 42;
                    _this.buttonsPressed.push(activeAxis);
                  }
                  break;
                case 3:
                  if (axis > 0) {
                    activeAxis.keyCode = 43;
                    _this.buttonsPressed.push(activeAxis);
                  } else {
                    activeAxis.keyCode = 41;
                    _this.buttonsPressed.push(activeAxis);
                  }
              }
            }
          }
        }
        if (_this.buttonsPressed.length) {
          ref2 = _this.buttonsPressed;
          for (index = k = 0, len2 = ref2.length; k < len2; index = ++k) {
            buttonPressed = ref2[index];
            if (indexOf.call(_this.buttonsPressedPrev, buttonPressed) >= 0 === false) {
              _this.emit('gamepadkeydown', buttonPressed);
            } else {
              _this.emit('gamepadkeyheld', buttonPressed);
            }
            _this.emit('gamepadevent', buttonPressed);
          }
          if (_this.throttled) {
            switch (_this.eventsInSequence) {
              case 0:
                _this.loopInterval = 3;
                break;
              case 1:
                _this.loopInterval = 8;
            }
          } else {
            _this.loopInterval = 1000;
          }
          _this.eventsInSequence++;
        } else {
          if (_this.buttonsPressedPrev.length) {
            ref3 = _this.buttonsPressedPrev;
            for (index = l = 0, len3 = ref3.length; l < len3; index = ++l) {
              buttonPressed = ref3[index];
              _this.emit('gamepadkeyup', buttonPressed);
            }
          }
          if (_this.throttled) {
            _this.eventsInSequence = 0;
            _this.loopInterval = 500;
          } else {
            _this.eventsInSequence = 0;
            _this.loopInterval = 1000;
          }
        }
        return _this.loopRequest = window.requestAnimationFrame(_this.eventLoop.bind(_this));
      };
    })(this), 1000 / this.loopInterval);
  };

  return GamepadSystem;

})(Framer.EventEmitter);

exports.Gamepad = new GamepadSystem();


},{}],"focusManager":[function(require,module,exports){
var Gamepad, addBorder, allSelectables, bubbleBlurEvent, bubbleEvent, bubbleFocusEvent, defaultOffState, defaultOnState, defaultSelectionBorder, defaultSelectionBorderColor, defaultSelectionBorderRadius, defaultSelectionBorderWidth, existingLayer, filterSelectablesByDirection, findNearest, focusManager, getCoords, hasCommonAncestor, isVisible, k, layers, len, moveSelection, removeBorder, selectionControllerDefaultOptions,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

allSelectables = [];

defaultSelectionBorder = true;

defaultSelectionBorderWidth = 5;

defaultSelectionBorderColor = "#fff";

defaultSelectionBorderRadius = 0;

addBorder = function(layer) {
  var border;
  if (layer.childrenWithName("border").length === 0) {
    border = new Layer({
      name: "border",
      parent: layer,
      size: layer,
      borderRadius: layer.borderRadius,
      backgroundColor: null,
      opacity: 1
    });
    if (layer.selectionBorderRadius === void 0) {
      border.borderRadius = defaultSelectionBorderRadius;
    } else {
      border.borderRadius = layer.selectionBorderRadius;
    }
    if (layer.selectionBorderColor === void 0) {
      border.borderColor = defaultSelectionBorderColor;
    } else {
      border.borderColor = layer.selectionBorderColor;
    }
    if (layer.selectionBorderWidth === void 0) {
      return border.borderWidth = defaultSelectionBorderWidth;
    } else {
      return border.borderWidth = layer.selectionBorderWidth;
    }
  }
};

removeBorder = function(layer) {
  var allBorders, border, k, len, results;
  allBorders = layer.childrenWithName("border");
  results = [];
  for (k = 0, len = allBorders.length; k < len; k++) {
    border = allBorders[k];
    results.push(border.destroy());
  }
  return results;
};

try {
  Layer.define("isSelectable", {
    get: function() {
      return this._properties["isSelectable"];
    },
    set: function(value) {
      this._properties["isSelectable"] = value;
      if (value === true) {
        allSelectables.push(this);
        this.states.defaultOnState = defaultOnState;
        this.states.defaultOffState = defaultOffState;
        this.stateSwitch("defaultOffState");
      }
      if (value === false) {
        delete this.states.defaultOnState;
        return delete this.states.defaultOffState;
      }
    }
  });
} catch (error) {}

try {
  Layer.define("selected", {
    get: function() {
      return this._properties["selected"];
    },
    set: function(value) {
      this._properties["selected"] = value;
      if (value === true && this._properties["isSelectable"] === true) {
        if ((defaultSelectionBorder === true && this._properties["selectionBorder"] === void 0) || (this._properties["selectionBorder"] === true)) {
          if (this.childrenWithName("border").length === 0) {
            addBorder(this);
          }
        }
        if (this.states.on === void 0) {
          this.animate("defaultOnState");
        } else {
          this.animate("on");
        }
      }
      if (value === false && this._properties["isSelectable"] === true) {
        if ((this.childrenWithName("border").length)) {
          removeBorder(this);
        }
        if (this.states.off === void 0) {
          return this.animate("defaultOffState");
        } else {
          return this.animate("off");
        }
      }
    }
  });
} catch (error) {}

try {
  Layer.define("up", {
    get: function() {
      return this._properties["up"];
    },
    set: function(value) {
      return this._properties["up"] = value;
    }
  });
} catch (error) {}

try {
  Layer.define("down", {
    get: function() {
      return this._properties["down"];
    },
    set: function(value) {
      return this._properties["down"] = value;
    }
  });
} catch (error) {}

try {
  Layer.define("left", {
    get: function() {
      return this._properties["left"];
    },
    set: function(value) {
      return this._properties["left"] = value;
    }
  });
} catch (error) {}

try {
  Layer.define("right", {
    get: function() {
      return this._properties["right"];
    },
    set: function(value) {
      return this._properties["right"] = value;
    }
  });
} catch (error) {}

try {
  Layer.define("selectionBorder", {
    get: function() {
      return this._properties["selectionBorder"];
    },
    set: function(value) {
      return this._properties["selectionBorder"] = value;
    }
  });
} catch (error) {}

try {
  Layer.define("selectionBorderWidth", {
    get: function() {
      return this._properties["selectionBorderWidth"];
    },
    set: function(value) {
      return this._properties["selectionBorderWidth"] = value;
    }
  });
} catch (error) {}

try {
  Layer.define("selectionBorderRadius", {
    get: function() {
      return this._properties["selectionBorderRadius"];
    },
    set: function(value) {
      return this._properties["selectionBorderRadius"] = value;
    }
  });
} catch (error) {}

try {
  Layer.define("selectionBorderColor", {
    get: function() {
      return this._properties["selectionBorderColor"];
    },
    set: function(value) {
      return this._properties["selectionBorderColor"] = value;
    }
  });
} catch (error) {}

try {
  Layer.define("propagateEvents", {
    get: function() {
      return this._properties["propagateEvents"];
    },
    set: function(value) {
      return this._properties["propagateEvents"] = value;
    }
  });
} catch (error) {}

layers = Framer.CurrentContext._layers;

for (k = 0, len = layers.length; k < len; k++) {
  existingLayer = layers[k];
  existingLayer.up = void 0;
  existingLayer.down = void 0;
  existingLayer.left = void 0;
  existingLayer.right = void 0;
  existingLayer.selectionBorder = void 0;
  existingLayer.selectionBorderWidth = void 0;
  existingLayer.selectionBorderColor = void 0;
  existingLayer.selectionBorderRadius = void 0;
  existingLayer.propagateEvents = true;
  existingLayer.isSelectable = false;
  existingLayer.selected = false;
}

Framer.CurrentContext.on("layer:create", function(newLayer) {
  newLayer.up = void 0;
  newLayer.down = void 0;
  newLayer.left = void 0;
  newLayer.right = void 0;
  newLayer.selectionBorder = void 0;
  newLayer.selectionBorderWidth = void 0;
  newLayer.selectionBorderColor = void 0;
  newLayer.selectionBorderRadius = void 0;
  newLayer.propagateEvents = true;
  newLayer.isSelectable = false;
  return newLayer.selected = false;
});


/* FOCUS MANAGER CLASS */

Gamepad = require('Gamepad').Gamepad;

defaultOnState = {};

defaultOffState = {};

selectionControllerDefaultOptions = {
  leftStickDpad: false,
  selectedItem: null,
  controller: "PS4",
  lastSelectedItem: null,
  width: 0,
  height: 0,
  defaultOnState: defaultOnState,
  defaultOffState: defaultOffState,
  defaultSelectionBorder: true,
  defaultSelectionBorderWidth: 5,
  defaultSelectionBorderColor: "fff",
  defaultSelectionBorderRadius: 0
};

getCoords = function(currentSelection, param) {
  switch (param) {
    case "x":
      return currentSelection.screenFrame.x;
    case "y":
      return currentSelection.screenFrame.y;
    case "midX":
      return currentSelection.screenFrame.x + currentSelection.screenFrame.width / 2;
    case "minX":
      return currentSelection.screenFrame.x;
    case "maxX":
      return currentSelection.screenFrame.x + currentSelection.screenFrame.width;
    case "midY":
      return currentSelection.screenFrame.y + currentSelection.screenFrame.height / 2;
    case "minY":
      return currentSelection.screenFrame.y;
    case "maxY":
      return currentSelection.screenFrame.y + currentSelection.screenFrame.height;
  }
};

hasCommonAncestor = function(element1, element2) {
  var arr1, arr2, i, j, l, m, ref, ref1;
  arr1 = element1.ancestors();
  arr2 = element2.ancestors();
  for (i = l = 0, ref = arr1.length - 1; 0 <= ref ? l <= ref : l >= ref; i = 0 <= ref ? ++l : --l) {
    for (j = m = 0, ref1 = arr2.length - 1; 0 <= ref1 ? m <= ref1 : m >= ref1; j = 0 <= ref1 ? ++m : --m) {
      if (arr1[i] === arr2[j] && arr1[i].constructor.name !== "FlowComponent") {
        return true;
      }
    }
  }
  return false;
};

isVisible = function(layer) {
  var i, l, parentLayers, ref;
  if (layer.opacity === 0 || layer.visible === false) {
    return false;
  }
  parentLayers = layer.ancestors();
  for (i = l = 0, ref = parentLayers.length - 1; 0 <= ref ? l <= ref : l >= ref; i = 0 <= ref ? ++l : --l) {
    if (parentLayers[i].visible === false || parentLayers[i].opacity === 0) {
      return false;
    }
  }
  return true;
};

filterSelectablesByDirection = function(currentSelection, direction) {
  var filteredArray, l, len1, selectable;
  filteredArray = [];
  for (l = 0, len1 = allSelectables.length; l < len1; l++) {
    selectable = allSelectables[l];
    if (hasCommonAncestor(selectable, currentSelection) && isVisible(selectable)) {
      switch (direction) {
        case "up":
          if (getCoords(selectable, "maxY") - 5 < getCoords(currentSelection, "minY") + 5) {
            filteredArray.push(selectable);
          }
          break;
        case "down":
          if (getCoords(selectable, "minY") + 5 > getCoords(currentSelection, "maxY") - 5) {
            filteredArray.push(selectable);
          }
          break;
        case "left":
          if (getCoords(selectable, "maxX") - 5 < getCoords(currentSelection, "minX") + 5) {
            filteredArray.push(selectable);
          }
          break;
        case "right":
          if (getCoords(selectable, "minX") + 5 > getCoords(currentSelection, "maxX") - 5) {
            filteredArray.push(selectable);
          }
      }
    }
  }
  return filteredArray;
};

findNearest = function(currentSelection, direction) {
  var distanceToNearest, dx, dy, filteredSelectables, l, len1, nearestSelectable, selectable, selectableDistance, x1, x2, y1, y2;
  switch (direction) {
    case "up":
      x2 = getCoords(currentSelection, "midX");
      y2 = getCoords(currentSelection, "minY") + 5;
      break;
    case "down":
      x2 = getCoords(currentSelection, "midX");
      y2 = getCoords(currentSelection, "maxY") - 5;
      break;
    case "left":
      x2 = getCoords(currentSelection, "minX") + 5;
      y2 = getCoords(currentSelection, "midY");
      break;
    case "right":
      x2 = getCoords(currentSelection, "maxX") - 5;
      y2 = getCoords(currentSelection, "midY");
  }
  nearestSelectable = null;
  filteredSelectables = filterSelectablesByDirection(currentSelection, direction);
  distanceToNearest = 5000;
  for (l = 0, len1 = filteredSelectables.length; l < len1; l++) {
    selectable = filteredSelectables[l];
    switch (direction) {
      case "up":
        x1 = getCoords(selectable, "midX");
        y1 = getCoords(selectable, "maxY") - 5;
        break;
      case "down":
        x1 = getCoords(selectable, "midX");
        y1 = getCoords(selectable, "minY") + 5;
        break;
      case "left":
        x1 = getCoords(selectable, "maxX") - 5;
        y1 = getCoords(selectable, "midY");
        break;
      case "right":
        x1 = getCoords(selectable, "minX") + 5;
        y1 = getCoords(selectable, "midY");
    }
    dx = x1 - x2;
    dy = y1 - y2;
    selectableDistance = Math.sqrt(dx * dx + dy * dy);
    if (selectableDistance < distanceToNearest) {
      distanceToNearest = selectableDistance;
      nearestSelectable = selectable;
    }
  }
  return nearestSelectable;
};

moveSelection = (function(_this) {
  return function(direction, that) {
    var target;
    switch (direction) {
      case "up":
        target = that.currentSelection.up;
        break;
      case "down":
        target = that.currentSelection.down;
        break;
      case "left":
        target = that.currentSelection.left;
        break;
      case "right":
        target = that.currentSelection.right;
    }
    if (target === void 0) {
      target = findNearest(that.currentSelection, direction);
    }
    if (target === null) {
      return;
    }
    that.lastSelection = that.currentSelection;
    that.currentSelection.selected = false;
    that.currentSelection = target;
    that.currentSelection.selected = true;
    bubbleBlurEvent(that.currentSelection, that.lastSelection);
    that.lastSelection.emit("blur");
    bubbleFocusEvent(that.currentSelection, that.lastSelection);
    that.currentSelection.emit("focus");
    return that.emit("change:selection");
  };
})(this);

bubbleFocusEvent = (function(_this) {
  return function(currentSelection, lastSelection) {
    var children, currentSelectionIsChild, element, event, i, l, lastSelectionIsChild, len1, m, originatingLayer, parentElements, ref;
    if (currentSelection === null) {
      return;
    }
    if (currentSelection.propagateEvents === false) {
      return;
    }
    parentElements = currentSelection.ancestors();
    originatingLayer = currentSelection;
    for (l = 0, len1 = parentElements.length; l < len1; l++) {
      element = parentElements[l];
      if (element.constructor.name !== "FlowComponent") {
        element.emit("focus", originatingLayer);
      } else {
        children = element.descendants;
        currentSelectionIsChild = false;
        lastSelectionIsChild = false;
        for (i = m = 0, ref = children.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
          if (children[i] === currentSelection) {
            currentSelectionIsChild = true;
          }
          if (children[i] === lastSelection) {
            lastSelectionIsChild = true;
          }
        }
        if (lastSelectionIsChild === false && currentSelectionIsChild === true) {
          element.emit("focus", originatingLayer);
        }
      }
    }
    event = new CustomEvent("focus", {
      detail: originatingLayer
    });
    return window.document.dispatchEvent(event);
  };
})(this);

bubbleBlurEvent = (function(_this) {
  return function(currentSelection, lastSelection) {
    var children, currentSelectionIsAChild, element, event, i, l, lastSelectionIsAChild, len1, m, originatingLayer, parentElements, ref;
    if (lastSelection === null) {
      return;
    }
    if (lastSelection.propagateEvents === false) {
      return;
    }
    parentElements = lastSelection.ancestors();
    originatingLayer = lastSelection;
    for (l = 0, len1 = parentElements.length; l < len1; l++) {
      element = parentElements[l];
      if (element.constructor.name !== "FlowComponent") {
        element.emit("blur", originatingLayer);
      } else {
        children = element.descendants;
        currentSelectionIsAChild = false;
        lastSelectionIsAChild = false;
        for (i = m = 0, ref = children.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
          if (children[i] === currentSelection) {
            currentSelectionIsAChild = true;
          }
          if (children[i] === lastSelection) {
            lastSelectionIsAChild = true;
          }
        }
        if (lastSelectionIsAChild === true && currentSelectionIsAChild === false) {
          element.emit("blur", originatingLayer);
        }
      }
    }
    event = new CustomEvent("blur", {
      detail: originatingLayer
    });
    return window.document.dispatchEvent(event);
  };
})(this);

bubbleEvent = (function(_this) {
  return function(bubbledEvent, originatingLayer) {
    var element, event1, event2, l, len1, parentElements;
    if (originatingLayer.propagateEvents === false) {
      return;
    }
    originatingLayer.emit("buttonPress", bubbledEvent);
    parentElements = originatingLayer.ancestors();
    for (l = 0, len1 = parentElements.length; l < len1; l++) {
      element = parentElements[l];
      element.emit(bubbledEvent, originatingLayer);
      element.emit("buttonPress", bubbledEvent, originatingLayer);
    }
    event1 = new CustomEvent(bubbledEvent, {
      detail: originatingLayer
    });
    window.document.dispatchEvent(event1);
    event2 = new CustomEvent("buttonPress", {
      detail: {
        key: bubbledEvent,
        layer: originatingLayer
      }
    });
    return window.document.dispatchEvent(event2);
  };
})(this);

focusManager = (function(superClass) {
  extend(focusManager, superClass);

  focusManager.currentSelection = null;

  focusManager.lastSelection = null;

  focusManager.keycodes = {};

  function focusManager(options) {
    var keycodes;
    if (options == null) {
      options = {};
    }
    this.options = _.defaults(options, selectionControllerDefaultOptions);
    this.currentSelection = this.options.selectedItem;
    focusManager.__super__.constructor.call(this, this.options);
    if (this.options.controller === "PS4") {
      keycodes = {
        square: 0,
        cross: 1,
        circle: 2,
        triangle: 3,
        l1: 4,
        r1: 5,
        r2: 6,
        l2: 7,
        l3press: 10,
        r3press: 11,
        home: 12,
        touchpad: 13,
        up: 14,
        down: 15,
        left: 16,
        right: 17,
        l3Left: 37,
        l3Up: 38,
        l3Right: 39,
        l3Down: 40,
        r3Up: 41,
        r3Left: 42,
        r3Down: 43,
        r3Right: 44
      };
    }
    if (this.options.controller === "XB1") {
      keycodes = {
        a: 0,
        b: 1,
        x: 2,
        y: 3,
        lb: 4,
        rb: 5,
        ljPress: 6,
        rjPress: 7,
        start: 8,
        select: 9,
        home: 10,
        rt: 15,
        lt: 16,
        up: 11,
        down: 12,
        left: 13,
        right: 14,
        ljLeft: 37,
        ljUp: 38,
        ljRight: 39,
        ljDown: 40,
        rjUp: 41,
        rjLeft: 42,
        rjDown: 43,
        rjRight: 44
      };
    }
    Gamepad.on('gamepadevent', Utils.throttle(0.25, (function(_this) {
      return function(event) {
        var a, keycode;
        if (_this.currentSelection === null) {
          return;
        }
        keycode = event.keyCode;
        a = _this.currentSelection;
        if (keycode === keycodes.up) {
          bubbleEvent("up", a);
          a.emit("up");
          moveSelection("up", _this);
        }
        if (keycode === keycodes.down) {
          bubbleEvent("down", a);
          a.emit("down");
          moveSelection("down", _this);
        }
        if (keycode === keycodes.left) {
          bubbleEvent("left", a);
          a.emit("left");
          moveSelection("left", _this);
        }
        if (keycode === keycodes.right) {
          bubbleEvent("right", a);
          a.emit("right");
          moveSelection("right", _this);
        }
        if (keycode === keycodes.cross || keycode === keycodes.a) {
          bubbleEvent("a", a);
          bubbleEvent("cross", a);
          a.emit("a");
          a.emit("cross");
        }
        if (keycode === keycodes.circle || keycode === keycodes.b) {
          bubbleEvent("b", a);
          bubbleEvent("circle", a);
          a.emit("b");
          a.emit("circle");
        }
        if (keycode === keycodes.square || keycode === keycodes.x) {
          bubbleEvent("x", a);
          bubbleEvent("square", a);
          a.emit("x");
          a.emit("square");
        }
        if (keycode === keycodes.triangle || keycode === keycodes.y) {
          bubbleEvent("y", a);
          bubbleEvent("triangle", a);
          a.emit("y");
          a.emit("triangle");
        }
        if (keycode === keycodes.l1 || keycode === keycodes.lb) {
          bubbleEvent("lb", a);
          bubbleEvent("l1", a);
          a.emit("lb");
          a.emit("l1");
        }
        if (keycode === keycodes.r1 || keycode === keycodes.rb) {
          bubbleEvent("rb", a);
          bubbleEvent("r1", a);
          a.emit("rb");
          a.emit("r1");
        }
        if (keycode === keycodes.r2 || keycode === keycodes.rt) {
          bubbleEvent("rt", a);
          bubbleEvent("r2", a);
          a.emit("rt");
          a.emit("r2");
        }
        if (keycode === keycodes.l2 || keycode === keycodes.lt) {
          bubbleEvent("lt", a);
          bubbleEvent("l2", a);
          a.emit("lt");
          a.emit("l2");
        }
        if (keycode === keycodes.l3Left || keycode === keycodes.ljLeft) {
          if (_this.options.leftStickDpad) {
            bubbleEvent("left", a);
            a.emit("left");
            moveSelection("left", _this);
          }
          bubbleEvent("ljLeft", a);
          bubbleEvent("l3Left", a);
          a.emit("ljLeft");
          a.emit("l3Left");
        }
        if (keycode === keycodes.l3Up || keycode === keycodes.ljUp) {
          if (_this.options.leftStickDpad) {
            bubbleEvent("up", a);
            a.emit("up");
            moveSelection("up", _this);
          }
          bubbleEvent("l3Up", a);
          bubbleEvent("ljUp", a);
          a.emit("ljUp");
          a.emit("l3Up");
        }
        if (keycode === keycodes.l3Right || keycode === keycodes.ljRight) {
          if (_this.options.leftStickDpad) {
            bubbleEvent("right", a);
            a.emit("right");
            moveSelection("right", _this);
          }
          bubbleEvent("ljRight", a);
          bubbleEvent("l3Right", a);
          a.emit("ljRight");
          a.emit("l3Right");
        }
        if (keycode === keycodes.l3Down || keycode === keycodes.ljDown) {
          if (_this.options.leftStickDpad) {
            bubbleEvent("down", a);
            a.emit("down");
            moveSelection("down", _this);
          }
          a.emit("ljDown");
          a.emit("l3Down");
          bubbleEvent("ljDown", a);
          bubbleEvent("l3Down", a);
        }
        if (keycode === keycodes.l3Press || keycode === keycodes.ljPress) {
          bubbleEvent("ljPress", a);
          bubbleEvent("l3Press", a);
          a.emit("ljPress");
          a.emit("l3Press");
        }
        if (keycode === keycodes.r3Left || keycode === keycodes.rjLeft) {
          bubbleEvent("r3Left", a);
          bubbleEvent("rjLeft", a);
          a.emit("rjLeft");
          a.emit("r3Left");
        }
        if (keycode === keycodes.r3Up || keycode === keycodes.rjUp) {
          bubbleEvent("rjUp", a);
          bubbleEvent("r3Up", a);
          a.emit("rjUp");
          a.emit("r3Up");
        }
        if (keycode === keycodes.r3Right || keycode === keycodes.rjRight) {
          bubbleEvent("rjRight", a);
          bubbleEvent("r3Right", a);
          a.emit("rjRight");
          a.emit("r3Right");
        }
        if (keycode === keycodes.r3Down || keycode === keycodes.rjDown) {
          bubbleEvent("rjDown", a);
          bubbleEvent("r3Down", a);
          a.emit("rjDown");
          a.emit("r3Down");
        }
        if (keycode === keycodes.r3Press || keycode === keycodes.rjPress) {
          bubbleEvent("rjPress", a);
          bubbleEvent("r3Press", a);
          a.emit("rjPress");
          a.emit("r3Press");
        }
        if (keycode === keycodes.home) {
          bubbleEvent("home", a);
          a.emit("home");
        }
        if (keycode === keycodes.touchpad) {
          bubbleEvent("touchpad", a);
          a.emit("touchpad");
        }
        if (keycode === keycodes.select) {
          bubbleEvent("select", a);
          a.emit("select");
        }
        if (keycode === keycodes.start) {
          bubbleEvent("start", a);
          return a.emit("start");
        }
      };
    })(this)));
    document.addEventListener('keydown', Utils.throttle(0.2, (function(_this) {
      return function(event) {
        var a, keycode;
        if (_this.currentSelection === null) {
          return;
        }
        keycode = event.which;
        a = _this.currentSelection;
        if (keycode === 38) {
          bubbleEvent("up", a);
          a.emit("up");
          moveSelection("up", _this);
        }
        if (keycode === 40) {
          bubbleEvent("down", a);
          a.emit("down");
          moveSelection("down", _this);
        }
        if (keycode === 37) {
          bubbleEvent("left", a);
          a.emit("left");
          moveSelection("left", _this);
        }
        if (keycode === 39) {
          bubbleEvent("right", a);
          a.emit("right");
          moveSelection("right", _this);
        }
        if (keycode === 13) {
          a = a;
          bubbleEvent("cross", a);
          bubbleEvent("a", a);
          bubbleEvent("enter", a);
          a.emit("cross");
          a.emit("a");
          a.emit("enter");
        }
        if (keycode === 8) {
          bubbleEvent("circle", a);
          bubbleEvent("b", a);
          bubbleEvent("back", a);
          a.emit("circle");
          a.emit("b");
          a.emit("back");
        }
        if (keycode === 27 || keycode === 80) {
          bubbleEvent("home", a);
          return a.emit("home");
        }
      };
    })(this)));
  }

  focusManager.define('selectedItem', {
    get: function() {
      return this.currentSelection;
    },
    set: function(value) {
      this.lastSelection = this.currentSelection;
      if (this.currentSelection !== null && this.currentSelection !== void 0) {
        this.currentSelection.selected = false;
      }
      this.currentSelection = value;
      if (this.currentSelection !== null && this.currentSelection !== void 0) {
        this.currentSelection.selected = true;
        bubbleBlurEvent(this.currentSelection, this.lastSelection);
        if (this.lastSelection !== null) {
          this.lastSelection.emit("blur");
        }
        bubbleFocusEvent(this.currentSelection, this.lastSelection);
        if (this.currentSelection !== null) {
          this.currentSelection.emit("focus");
        }
      }
      return this.emit("change:selection", this.currentSelection);
    }
  });

  focusManager.define('lastSelectedItem', {
    get: function() {
      return this.lastSelection;
    }
  });

  focusManager.define('controller', {
    get: function() {
      return this.options.controller;
    },
    set: function(value) {
      return this.options.controller = value;
    }
  });

  focusManager.define('leftStickDpad', {
    get: function() {
      return this.options.leftStickDpad;
    },
    set: function(value) {
      return this.options.leftStickDpad = value;
    }
  });

  focusManager.define('defaultOnState', {
    get: function() {
      return this.options.defaultOnState;
    },
    set: function(value) {
      var l, len1, results, selectable;
      defaultOnState = this.options.defaultOnState = value;
      results = [];
      for (l = 0, len1 = allSelectables.length; l < len1; l++) {
        selectable = allSelectables[l];
        results.push(selectable.states.defaultOnState = defaultOnState);
      }
      return results;
    }
  });

  focusManager.define('defaultOffState', {
    get: function() {
      return this.options.defaultOffState;
    },
    set: function(value) {
      var l, len1, results, selectable;
      defaultOffState = this.options.defaultOffState = value;
      results = [];
      for (l = 0, len1 = allSelectables.length; l < len1; l++) {
        selectable = allSelectables[l];
        results.push(selectable.states.defaultOffState = defaultOffState);
      }
      return results;
    }
  });

  focusManager.define('defaultSelectionBorder', {
    get: function() {
      return this.options.defaultSelectionBorder;
    },
    set: function(value) {
      return defaultSelectionBorder = this.options.defaultSelectionBorder = value;
    }
  });

  focusManager.define('defaultSelectionBorderWidth', {
    get: function() {
      return this.options.defaultSelectionBorderWidth;
    },
    set: function(value) {
      return defaultSelectionBorderWidth = this.options.defaultSelectionBorderWidth = value;
    }
  });

  focusManager.define('defaultSelectionBorderRadius', {
    get: function() {
      return this.options.defaultSelectionBorderRadius;
    },
    set: function(value) {
      return defaultSelectionBorderRadius = this.options.defaultSelectionBorderRadius = value;
    }
  });

  focusManager.define('defaultSelectionBorderColor', {
    get: function() {
      return this.options.defaultSelectionBorderColor;
    },
    set: function(value) {
      return defaultSelectionBorderColor = this.options.defaultSelectionBorderColor = value;
    }
  });

  return focusManager;

})(Layer);

exports.focusManager = focusManager;


},{"Gamepad":"Gamepad"}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NoZXJsb2NrL0Ryb3Bib3gvTXlHaXRodWIvTU9EX0ltcHJvdmVudC9GcmFtZXIvTU9EL01PREhvbWUyMDE4MDV2Mi5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zaGVybG9jay9Ecm9wYm94L015R2l0aHViL01PRF9JbXByb3ZlbnQvRnJhbWVyL01PRC9NT0RIb21lMjAxODA1djIuZnJhbWVyL21vZHVsZXMvZm9jdXNNYW5hZ2VyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NoZXJsb2NrL0Ryb3Bib3gvTXlHaXRodWIvTU9EX0ltcHJvdmVudC9GcmFtZXIvTU9EL01PREhvbWUyMDE4MDV2Mi5mcmFtZXIvbW9kdWxlcy9HYW1lcGFkLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsIiMgTU9ESUZZIFRIRSBMQVlFUiBDTEFTUyAjXG5cbiNjcmVhdGUgYSBjb250YWluZXIgYXJyYXkgZm9yIGFsbCBzZWxlY3RhYmxlIG9iamVjdHMgXG5hbGxTZWxlY3RhYmxlcyA9IFtdXG5kZWZhdWx0U2VsZWN0aW9uQm9yZGVyID0gdHJ1ZVxuZGVmYXVsdFNlbGVjdGlvbkJvcmRlcldpZHRoID0gNVxuZGVmYXVsdFNlbGVjdGlvbkJvcmRlckNvbG9yID0gXCIjZmZmXCJcblxuZGVmYXVsdFNlbGVjdGlvbkJvcmRlclJhZGl1cyA9IDBcbiMgZnVuY3Rpb24gdG8gYWRkIGEgYm9yZGVyIGFyb3VuZCB0aGUgc2VsZWN0ZWQgbGF5ZXJcbmFkZEJvcmRlciA9IChsYXllcikgLT5cblx0aWYgKGxheWVyLmNoaWxkcmVuV2l0aE5hbWUoXCJib3JkZXJcIikubGVuZ3RoIGlzIDApXG5cblx0XHRib3JkZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6XCJib3JkZXJcIlxuXHRcdFx0cGFyZW50OiBsYXllclxuXHRcdFx0c2l6ZTogbGF5ZXJcblx0XHRcdGJvcmRlclJhZGl1czogbGF5ZXIuYm9yZGVyUmFkaXVzXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdG9wYWNpdHk6IDFcblx0XHRpZiAobGF5ZXIuc2VsZWN0aW9uQm9yZGVyUmFkaXVzIGlzIHVuZGVmaW5lZClcblx0XHRcdGJvcmRlci5ib3JkZXJSYWRpdXMgPSBkZWZhdWx0U2VsZWN0aW9uQm9yZGVyUmFkaXVzXG5cdFx0ZWxzZVxuXHRcdFx0Ym9yZGVyLmJvcmRlclJhZGl1cyA9IGxheWVyLnNlbGVjdGlvbkJvcmRlclJhZGl1c1xuXHRcdGlmIChsYXllci5zZWxlY3Rpb25Cb3JkZXJDb2xvciBpcyB1bmRlZmluZWQpXG5cdFx0XHRib3JkZXIuYm9yZGVyQ29sb3IgPSBkZWZhdWx0U2VsZWN0aW9uQm9yZGVyQ29sb3Jcblx0XHRlbHNlXG5cdFx0XHRib3JkZXIuYm9yZGVyQ29sb3IgPSBsYXllci5zZWxlY3Rpb25Cb3JkZXJDb2xvclxuXG5cdFx0aWYgKGxheWVyLnNlbGVjdGlvbkJvcmRlcldpZHRoIGlzIHVuZGVmaW5lZClcblx0XHRcdGJvcmRlci5ib3JkZXJXaWR0aCA9IGRlZmF1bHRTZWxlY3Rpb25Cb3JkZXJXaWR0aFxuXHRcdGVsc2Vcblx0XHRcdGJvcmRlci5ib3JkZXJXaWR0aCA9IGxheWVyLnNlbGVjdGlvbkJvcmRlcldpZHRoXG5cblx0XHQjIGJvcmRlci5hbmltYXRlXG5cdFx0IyBcdFx0b3BhY2l0eTogMVxuXHRcdCMgXHRcdGJvcmRlcldpZHRoOiBsYXllci5zZWxlY3Rpb25Cb3JkZXJXaWR0aFxuXHRcdCMgXHRcdG9wdGlvbnM6XG5cdFx0IyBcdFx0XHR0aW1lOjAuMTVcblxuIyByZW1vdmUgdGhlIGJvcmRlciB3aGVuIGEgbGF5ZXIgaXMgZGVzZWxlY3RlZFxucmVtb3ZlQm9yZGVyID0gKGxheWVyKSAtPlxuXHRhbGxCb3JkZXJzID0gbGF5ZXIuY2hpbGRyZW5XaXRoTmFtZShcImJvcmRlclwiKVxuXHRmb3IgYm9yZGVyIGluIGFsbEJvcmRlcnNcblx0XHQjIGJvcmRlci5hbmltYXRlXG5cdFx0IyBcdG9wYWNpdHk6IDBcblx0XHQjIFx0b3B0aW9uczpcblx0XHQjIFx0XHR0aW1lOjAuMTVcblx0XHQjIGJvcmRlci5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCAtPlxuXHRcdCMgXHR0aGlzLmRlc3Ryb3koKVxuXHRcdGJvcmRlci5kZXN0cm95KClcblx0XG4jaXNTZWxlY3RhYmxlOiBzcGVjaWZpZXMgd2hldGhlciBhIGxheWVyIGlzIGZvY3VzYWJsZSBvciBub3QsIGlmIHllcywgYWRkcyBpdCB0byB0aGUgYWxsU2VsZWN0YWJsZXNbXSBhcnJheVxudHJ5IExheWVyLmRlZmluZSBcImlzU2VsZWN0YWJsZVwiLFxuXHRnZXQ6IC0+IEBfcHJvcGVydGllc1tcImlzU2VsZWN0YWJsZVwiXVxuXHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRAX3Byb3BlcnRpZXNbXCJpc1NlbGVjdGFibGVcIl0gPSB2YWx1ZVxuXHRcdGlmKHZhbHVlIGlzIHRydWUpXG5cdFx0XHRhbGxTZWxlY3RhYmxlcy5wdXNoKEApXG5cdFx0XHRALnN0YXRlcy5kZWZhdWx0T25TdGF0ZSA9IGRlZmF1bHRPblN0YXRlXG5cdFx0XHRALnN0YXRlcy5kZWZhdWx0T2ZmU3RhdGUgPSBkZWZhdWx0T2ZmU3RhdGVcblx0XHRcdEAuc3RhdGVTd2l0Y2goXCJkZWZhdWx0T2ZmU3RhdGVcIilcblx0XHRcdFxuXHRcdGlmKHZhbHVlIGlzIGZhbHNlKVxuXHRcdFx0ZGVsZXRlIEAuc3RhdGVzLmRlZmF1bHRPblN0YXRlXG5cdFx0XHRkZWxldGUgQC5zdGF0ZXMuZGVmYXVsdE9mZlN0YXRlXG5cdFx0XHQjVE9ETzogcmVtb3ZlIGxheWVyIGZyb20gYWxsIHNlbGVjdGFibGVzXG5cbnRyeSBMYXllci5kZWZpbmUgXCJzZWxlY3RlZFwiLFxuXHRnZXQ6IC0+IEBfcHJvcGVydGllc1tcInNlbGVjdGVkXCJdXG5cdHNldDogKHZhbHVlKSAtPlxuXHRcdFxuXHRcdEBfcHJvcGVydGllc1tcInNlbGVjdGVkXCJdID0gdmFsdWVcblx0XHRcblx0XHRpZih2YWx1ZSBpcyB0cnVlIGFuZCBAX3Byb3BlcnRpZXNbXCJpc1NlbGVjdGFibGVcIl0gaXMgdHJ1ZSlcblx0XHRcdFxuXHRcdFx0aWYoKGRlZmF1bHRTZWxlY3Rpb25Cb3JkZXIgaXMgdHJ1ZSBhbmQgQF9wcm9wZXJ0aWVzW1wic2VsZWN0aW9uQm9yZGVyXCJdIGlzIHVuZGVmaW5lZCkgb3IgKEBfcHJvcGVydGllc1tcInNlbGVjdGlvbkJvcmRlclwiXSBpcyB0cnVlKSlcblx0XHRcdFx0XHRpZiAoQC5jaGlsZHJlbldpdGhOYW1lKFwiYm9yZGVyXCIpLmxlbmd0aCBpcyAwKVxuXHRcdFx0XHRcdFx0YWRkQm9yZGVyKEApXG5cblx0XHRcdGlmKEAuc3RhdGVzLm9uIGlzIHVuZGVmaW5lZClcblx0XHRcdFx0QC5hbmltYXRlKFwiZGVmYXVsdE9uU3RhdGVcIilcblx0XHRcdGVsc2Vcblx0XHRcdFx0QC5hbmltYXRlKFwib25cIilcblxuXHRcdGlmKHZhbHVlIGlzIGZhbHNlIGFuZCBAX3Byb3BlcnRpZXNbXCJpc1NlbGVjdGFibGVcIl0gaXMgdHJ1ZSlcblx0XHRcdGlmKEAuY2hpbGRyZW5XaXRoTmFtZShcImJvcmRlclwiKS5sZW5ndGgpXG5cdFx0XHRcdHJlbW92ZUJvcmRlcihAKVxuXHRcdFx0aWYoQC5zdGF0ZXMub2ZmIGlzIHVuZGVmaW5lZClcblx0XHRcdFx0QC5hbmltYXRlKFwiZGVmYXVsdE9mZlN0YXRlXCIpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEAuYW5pbWF0ZShcIm9mZlwiKVxuXG4jcHJvcGVydGllcyB0byBtYW51YWxseSBkZWZpbmUgd2hhdCBpcyB0byB0aGUgdXAsIGRvd24sIGxlZnQgYW5kIHJpZ2h0IG9mIGVhY2ggc2VsZWN0YWJsZSBsYXllclxudHJ5IExheWVyLmRlZmluZSBcInVwXCIsXG5cdGdldDogLT4gQF9wcm9wZXJ0aWVzW1widXBcIl1cblx0c2V0OiAodmFsdWUpIC0+XG5cdFx0QF9wcm9wZXJ0aWVzW1widXBcIl0gPSB2YWx1ZVxuXG50cnkgTGF5ZXIuZGVmaW5lIFwiZG93blwiLFxuXHRnZXQ6IC0+IEBfcHJvcGVydGllc1tcImRvd25cIl1cblx0c2V0OiAodmFsdWUpIC0+XG5cdFx0QF9wcm9wZXJ0aWVzW1wiZG93blwiXSA9IHZhbHVlXG5cbnRyeSBMYXllci5kZWZpbmUgXCJsZWZ0XCIsXG5cdGdldDogLT4gQF9wcm9wZXJ0aWVzW1wibGVmdFwiXVxuXHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRAX3Byb3BlcnRpZXNbXCJsZWZ0XCJdID0gdmFsdWVcblxudHJ5IExheWVyLmRlZmluZSBcInJpZ2h0XCIsXG5cdGdldDogLT4gQF9wcm9wZXJ0aWVzW1wicmlnaHRcIl1cblx0c2V0OiAodmFsdWUpIC0+XG5cdFx0QF9wcm9wZXJ0aWVzW1wicmlnaHRcIl0gPSB2YWx1ZVxuXG4jc2VsZWN0aW9uQm9yZGVyOiBzcGVjaWZpZXMgd2hldGhlciBhIHNlbGVjdGVkIGxheWVyIHNob3VsZCBoYXZlIGEgYm9yZGVyIGFyb3VuZCBpdFxudHJ5IExheWVyLmRlZmluZSBcInNlbGVjdGlvbkJvcmRlclwiLFxuXHRnZXQ6IC0+IEBfcHJvcGVydGllc1tcInNlbGVjdGlvbkJvcmRlclwiXVxuXHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRAX3Byb3BlcnRpZXNbXCJzZWxlY3Rpb25Cb3JkZXJcIl0gPSB2YWx1ZVxuXG50cnkgTGF5ZXIuZGVmaW5lIFwic2VsZWN0aW9uQm9yZGVyV2lkdGhcIixcblx0Z2V0OiAtPiBAX3Byb3BlcnRpZXNbXCJzZWxlY3Rpb25Cb3JkZXJXaWR0aFwiXVxuXHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRAX3Byb3BlcnRpZXNbXCJzZWxlY3Rpb25Cb3JkZXJXaWR0aFwiXSA9IHZhbHVlXG50cnkgTGF5ZXIuZGVmaW5lIFwic2VsZWN0aW9uQm9yZGVyUmFkaXVzXCIsXG5cdGdldDogLT4gQF9wcm9wZXJ0aWVzW1wic2VsZWN0aW9uQm9yZGVyUmFkaXVzXCJdXG5cdHNldDogKHZhbHVlKSAtPlxuXHRcdEBfcHJvcGVydGllc1tcInNlbGVjdGlvbkJvcmRlclJhZGl1c1wiXSA9IHZhbHVlXG50cnkgTGF5ZXIuZGVmaW5lIFwic2VsZWN0aW9uQm9yZGVyQ29sb3JcIixcblx0Z2V0OiAtPiBAX3Byb3BlcnRpZXNbXCJzZWxlY3Rpb25Cb3JkZXJDb2xvclwiXVxuXHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRAX3Byb3BlcnRpZXNbXCJzZWxlY3Rpb25Cb3JkZXJDb2xvclwiXSA9IHZhbHVlXG5cbiNwcm9wYWdhdGVFdmVudHM6IHNwZWNpZmllcyB3aGV0aGVyIHRoIGV2ZW50cyBlbWl0dGVkIGJ5IGEgc2VsZWN0YWJsZSBsYXllciBhcmUgcHJvcGFnYXRlZFxudHJ5IExheWVyLmRlZmluZSBcInByb3BhZ2F0ZUV2ZW50c1wiLFxuXHRnZXQ6IC0+IEBfcHJvcGVydGllc1tcInByb3BhZ2F0ZUV2ZW50c1wiXVxuXHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRAX3Byb3BlcnRpZXNbXCJwcm9wYWdhdGVFdmVudHNcIl0gPSB2YWx1ZVxuXG5cbmxheWVycyA9IEZyYW1lci5DdXJyZW50Q29udGV4dC5fbGF5ZXJzIFxuXG5mb3IgZXhpc3RpbmdMYXllciBpbiBsYXllcnNcblx0ZXhpc3RpbmdMYXllci51cCA9IHVuZGVmaW5lZFxuXHRleGlzdGluZ0xheWVyLmRvd24gPSB1bmRlZmluZWRcblx0ZXhpc3RpbmdMYXllci5sZWZ0ID0gdW5kZWZpbmVkXG5cdGV4aXN0aW5nTGF5ZXIucmlnaHQgPSB1bmRlZmluZWRcblx0ZXhpc3RpbmdMYXllci5zZWxlY3Rpb25Cb3JkZXIgPSB1bmRlZmluZWRcblx0ZXhpc3RpbmdMYXllci5zZWxlY3Rpb25Cb3JkZXJXaWR0aCA9IHVuZGVmaW5lZFxuXHRleGlzdGluZ0xheWVyLnNlbGVjdGlvbkJvcmRlckNvbG9yID0gdW5kZWZpbmVkXG5cblx0ZXhpc3RpbmdMYXllci5zZWxlY3Rpb25Cb3JkZXJSYWRpdXMgPSB1bmRlZmluZWRcblx0ZXhpc3RpbmdMYXllci5wcm9wYWdhdGVFdmVudHMgPSB0cnVlXG5cdGV4aXN0aW5nTGF5ZXIuaXNTZWxlY3RhYmxlID0gZmFsc2Vcblx0ZXhpc3RpbmdMYXllci5zZWxlY3RlZCA9IGZhbHNlXG5cblxuXG4jYXNzaWduIHRoZSBkZWZhdWx0cyB0byBhbGwgcHJvcGVydGllcyB3aGVuIGEgbGF5ZXIgaXMgY3JlYXRlZFxuRnJhbWVyLkN1cnJlbnRDb250ZXh0Lm9uIFwibGF5ZXI6Y3JlYXRlXCIsIChuZXdMYXllcikgLT5cblx0bmV3TGF5ZXIudXAgPSB1bmRlZmluZWRcblx0bmV3TGF5ZXIuZG93biA9IHVuZGVmaW5lZFxuXHRuZXdMYXllci5sZWZ0ID0gdW5kZWZpbmVkXG5cdG5ld0xheWVyLnJpZ2h0ID0gdW5kZWZpbmVkXG5cdG5ld0xheWVyLnNlbGVjdGlvbkJvcmRlciA9IHVuZGVmaW5lZFxuXHRuZXdMYXllci5zZWxlY3Rpb25Cb3JkZXJXaWR0aCA9IHVuZGVmaW5lZFxuXHRuZXdMYXllci5zZWxlY3Rpb25Cb3JkZXJDb2xvciA9IHVuZGVmaW5lZFxuXHRuZXdMYXllci5zZWxlY3Rpb25Cb3JkZXJSYWRpdXMgPSB1bmRlZmluZWRcblx0bmV3TGF5ZXIucHJvcGFnYXRlRXZlbnRzID0gdHJ1ZVxuXHRuZXdMYXllci5pc1NlbGVjdGFibGUgPSBmYWxzZVxuXHRuZXdMYXllci5zZWxlY3RlZCA9IGZhbHNlXG5cblxuIyMjIEZPQ1VTIE1BTkFHRVIgQ0xBU1MgIyMjXG57R2FtZXBhZH0gPSByZXF1aXJlICdHYW1lcGFkJ1xuXG4jZGVmaW5lIHRoZSBkZWZhdWx0IGFwcGVhcmFuY2Ugb2Ygc2VsZWN0ZWQgaXRlbXNcbmRlZmF1bHRPblN0YXRlID0ge1xufVxuXHRcbiNkZWZpbmUgdGhlIGRlZmF1bHQgYXBwZWFyYW5jZSBvZiB0aGUgZGVzZWxlY3RlZCBpdGVtc1xuZGVmYXVsdE9mZlN0YXRlID0ge1xufVxuXG4jZGVmYXVsdCBvcHRpb25zIGZvciB0aGUgc2VsZWN0aW9uQ29udHJvbGxlclxuc2VsZWN0aW9uQ29udHJvbGxlckRlZmF1bHRPcHRpb25zID1cblx0bGVmdFN0aWNrRHBhZDogZmFsc2Vcblx0c2VsZWN0ZWRJdGVtIDogbnVsbFxuXHRjb250cm9sbGVyOiBcIlBTNFwiXG5cdGxhc3RTZWxlY3RlZEl0ZW06IG51bGxcblx0d2lkdGg6MFxuXHRoZWlnaHQ6MFxuXHRkZWZhdWx0T25TdGF0ZTogZGVmYXVsdE9uU3RhdGVcblx0ZGVmYXVsdE9mZlN0YXRlOiBkZWZhdWx0T2ZmU3RhdGVcblx0ZGVmYXVsdFNlbGVjdGlvbkJvcmRlcjogdHJ1ZVxuXHRkZWZhdWx0U2VsZWN0aW9uQm9yZGVyV2lkdGg6IDVcblx0ZGVmYXVsdFNlbGVjdGlvbkJvcmRlckNvbG9yOiBcImZmZlwiXG5cdGRlZmF1bHRTZWxlY3Rpb25Cb3JkZXJSYWRpdXM6MFxuXHRcblxuI2dldCBhIGxheWVyJ3MgYWJzb2x1dGUgY29vcmRpbmF0ZXMgb24gdGhlIHNjcmVlblxuZ2V0Q29vcmRzID0gKGN1cnJlbnRTZWxlY3Rpb24sIHBhcmFtKSAtPlxuXHRzd2l0Y2ggKHBhcmFtKVxuXHRcdHdoZW4gXCJ4XCJcblx0XHRcdHJldHVybiBjdXJyZW50U2VsZWN0aW9uLnNjcmVlbkZyYW1lLnhcblx0XHRcdFxuXHRcdHdoZW4gXCJ5XCJcblx0XHRcdHJldHVybiBjdXJyZW50U2VsZWN0aW9uLnNjcmVlbkZyYW1lLnlcblx0XHRcdFxuXHRcdHdoZW4gXCJtaWRYXCJcblx0XHRcdHJldHVybiBjdXJyZW50U2VsZWN0aW9uLnNjcmVlbkZyYW1lLnggKyBjdXJyZW50U2VsZWN0aW9uLnNjcmVlbkZyYW1lLndpZHRoIC8gMlxuXHRcdFx0XG5cdFx0d2hlbiBcIm1pblhcIlxuXHRcdFx0cmV0dXJuIGN1cnJlbnRTZWxlY3Rpb24uc2NyZWVuRnJhbWUueFxuXHRcdFx0XG5cdFx0d2hlbiBcIm1heFhcIlxuXHRcdFx0cmV0dXJuIGN1cnJlbnRTZWxlY3Rpb24uc2NyZWVuRnJhbWUueCArIGN1cnJlbnRTZWxlY3Rpb24uc2NyZWVuRnJhbWUud2lkdGhcblx0XHRcdFxuXHRcdHdoZW4gXCJtaWRZXCJcblx0XHRcdHJldHVybiBjdXJyZW50U2VsZWN0aW9uLnNjcmVlbkZyYW1lLnkgKyBjdXJyZW50U2VsZWN0aW9uLnNjcmVlbkZyYW1lLmhlaWdodCAvIDJcblx0XHRcdFxuXHRcdHdoZW4gXCJtaW5ZXCJcblx0XHRcdHJldHVybiBjdXJyZW50U2VsZWN0aW9uLnNjcmVlbkZyYW1lLnlcblx0XHRcdFxuXHRcdHdoZW4gXCJtYXhZXCJcblx0XHRcdHJldHVybiBjdXJyZW50U2VsZWN0aW9uLnNjcmVlbkZyYW1lLnkgKyBjdXJyZW50U2VsZWN0aW9uLnNjcmVlbkZyYW1lLmhlaWdodFxuXG4jIHRoaXMgaXMgdXNlZCB0byBjaGVjayBpZiB0aGUgY3VycmVudCBhbmQgdGFyZ2V0IGxheWVycyBhcmUgaW5mYWN0IG9uIHRoZSBzYW1lIHBhZ2UgXG4jIHdoZW4gdXNpbmcgdGhlIG5lYXJlc3QgbmVpZ2hib3IgZm4uIHdpdGggYSBmbG93IGNvbXBvbmVudFxuIyBpbnB1dCBhcnJheXMgYXJlIGEgbGlzdCBvZiBhbGwgcGFyZW50IGxheWVycyBvZiB0aGUgY3VycmVudCBhbmQgdGFyZ2V0IGxheWVyXG4jIHJldHVybiB0cnVlIGlmIGN1cnJlbnQgYW5kIHRhcmdldCBsYXllcnMgaGF2ZSBhIGNvbW1vbiBwYXJlbnQgb3RoZXIgdGhhbiBhIGZsb3cgY29tcG9uZW50XG5oYXNDb21tb25BbmNlc3RvciA9IChlbGVtZW50MSxlbGVtZW50MikgLT5cblx0YXJyMSA9IGVsZW1lbnQxLmFuY2VzdG9ycygpXG5cdGFycjIgPSBlbGVtZW50Mi5hbmNlc3RvcnMoKVxuXHRmb3IgaSBpbiBbMC4uYXJyMS5sZW5ndGgtMV1cblx0XHRmb3IgaiBpbiBbMC4uYXJyMi5sZW5ndGgtMV1cblx0XHRcdGlmKGFycjFbaV0gaXMgYXJyMltqXSBhbmQgYXJyMVtpXS5jb25zdHJ1Y3Rvci5uYW1lIGlzbnQgXCJGbG93Q29tcG9uZW50XCIpXG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdHJldHVybiBmYWxzZVx0XHRcblxuIyB0aGlzIGlzIHVzZWQgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHRhcmdldCBsYXllciByZXR1cm5lZCBieSB0aGUgbmVhcmVzdCBuZWlnaGJvciBmbi4gaXMgaW5mYWN0IHZpc2libGVcbiMgc28gdGhhdCB3ZSBkbyBub3QgbW92ZSB0aGUgc2VsZWN0aW9uIHRvIGFuIGludmlzaWJsZSBsYXllclxuIyByZXR1cm4gdHJ1ZSBpZiBhbnkgYW5jZXN0b3Igb2YgdGhlIGlucHV0IGxheWVyIGlzIG5vdCB2aXNpYmxlXG5pc1Zpc2libGUgPSAobGF5ZXIpIC0+XG5cdGlmKGxheWVyLm9wYWNpdHkgaXMgMCBvciBsYXllci52aXNpYmxlIGlzIGZhbHNlKVxuXHRcdHJldHVybiBmYWxzZVxuXHRcdFxuXHRwYXJlbnRMYXllcnMgPSBsYXllci5hbmNlc3RvcnMoKVxuXHRmb3IgaSBpbiBbMC4ucGFyZW50TGF5ZXJzLmxlbmd0aC0xXVxuXHRcdGlmKHBhcmVudExheWVyc1tpXS52aXNpYmxlIGlzIGZhbHNlIG9yIHBhcmVudExheWVyc1tpXS5vcGFjaXR5IGlzIDAgKVxuXHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0cmV0dXJuIHRydWVcdFx0XG5cbiMgcmV0dXJuIGFsbCBsYXllciB0aGF0IGFyZSBvbiB0b3AsIGJvdHRvbSwgcmlnaHQgb3IgbGVmdCBvZiB0aGUgY3VycmVudCBsYXllciB0byBjYWxjdWxhdGUgdGhlIG5lYXJlc3QgbmVpZ2hib3JcbmZpbHRlclNlbGVjdGFibGVzQnlEaXJlY3Rpb24gPSAoY3VycmVudFNlbGVjdGlvbiwgZGlyZWN0aW9uKSAtPlxuXHRmaWx0ZXJlZEFycmF5ID0gW11cblx0Zm9yIHNlbGVjdGFibGUgaW4gYWxsU2VsZWN0YWJsZXNcblx0XHRpZihoYXNDb21tb25BbmNlc3RvcihzZWxlY3RhYmxlLCBjdXJyZW50U2VsZWN0aW9uKSBhbmQgaXNWaXNpYmxlKHNlbGVjdGFibGUpKVxuXHRcdFx0c3dpdGNoKGRpcmVjdGlvbilcblx0XHRcdFx0d2hlbiBcInVwXCJcblx0XHRcdFx0XHRpZihnZXRDb29yZHMoc2VsZWN0YWJsZSxcIm1heFlcIiktNSA8IGdldENvb3JkcyhjdXJyZW50U2VsZWN0aW9uLFwibWluWVwiKSs1KVxuXHRcdFx0XHRcdFx0ZmlsdGVyZWRBcnJheS5wdXNoKHNlbGVjdGFibGUpXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0d2hlbiBcImRvd25cIlxuXHRcdFx0XHRcdGlmKGdldENvb3JkcyhzZWxlY3RhYmxlLFwibWluWVwiKSs1ID4gZ2V0Q29vcmRzKGN1cnJlbnRTZWxlY3Rpb24sXCJtYXhZXCIpLTUpXG5cdFx0XHRcdFx0XHRmaWx0ZXJlZEFycmF5LnB1c2goc2VsZWN0YWJsZSlcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHR3aGVuIFwibGVmdFwiXG5cdFx0XHRcdFx0aWYoZ2V0Q29vcmRzKHNlbGVjdGFibGUsXCJtYXhYXCIpLTUgPCBnZXRDb29yZHMoY3VycmVudFNlbGVjdGlvbixcIm1pblhcIikrNSlcblx0XHRcdFx0XHRcdGZpbHRlcmVkQXJyYXkucHVzaChzZWxlY3RhYmxlKVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdHdoZW4gXCJyaWdodFwiXG5cdFx0XHRcdFx0aWYoZ2V0Q29vcmRzKHNlbGVjdGFibGUsXCJtaW5YXCIpKzUgPiBnZXRDb29yZHMoY3VycmVudFNlbGVjdGlvbixcIm1heFhcIiktNSlcblx0XHRcdFx0XHRcdGZpbHRlcmVkQXJyYXkucHVzaChzZWxlY3RhYmxlKVxuXHRcdFx0XHRcdFx0XG5cdHJldHVybiBmaWx0ZXJlZEFycmF5XG5cblxuIyByZXR1cm4gdGhlIGxheWVyIG5lYXJlc3QgdG8gdGhlIGN1cnJlbnQgbGF5ZXIgaW4gYSBzcGVjaWZpZWQgZGlyZWN0aW9uXG5maW5kTmVhcmVzdCA9IChjdXJyZW50U2VsZWN0aW9uLCBkaXJlY3Rpb24pIC0+XG5cblx0c3dpdGNoKGRpcmVjdGlvbilcblx0I2dldCB0aGUgeCx5IGNvb3JkaW5hdGVzIG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbiB0byBjYWxjdWxhdGUgZGlzdGFuY2Vcblx0XHR3aGVuIFwidXBcIlxuXHRcdFx0eDIgPSBnZXRDb29yZHMoY3VycmVudFNlbGVjdGlvbixcIm1pZFhcIilcblx0XHRcdHkyID0gZ2V0Q29vcmRzKGN1cnJlbnRTZWxlY3Rpb24sXCJtaW5ZXCIpKzVcblx0XHRcdFxuXHRcdHdoZW4gXCJkb3duXCJcblx0XHRcdHgyID0gZ2V0Q29vcmRzKGN1cnJlbnRTZWxlY3Rpb24sXCJtaWRYXCIpXG5cdFx0XHR5MiA9IGdldENvb3JkcyhjdXJyZW50U2VsZWN0aW9uLFwibWF4WVwiKS01XG5cdFx0XHRcblx0XHR3aGVuIFwibGVmdFwiXG5cdFx0XHR4MiA9IGdldENvb3JkcyhjdXJyZW50U2VsZWN0aW9uLFwibWluWFwiKSs1XG5cdFx0XHR5MiA9IGdldENvb3JkcyhjdXJyZW50U2VsZWN0aW9uLFwibWlkWVwiKVxuXHRcdFx0XG5cdFx0d2hlbiBcInJpZ2h0XCJcblx0XHRcdHgyID0gZ2V0Q29vcmRzKGN1cnJlbnRTZWxlY3Rpb24sXCJtYXhYXCIpLTVcblx0XHRcdHkyID0gZ2V0Q29vcmRzKGN1cnJlbnRTZWxlY3Rpb24sXCJtaWRZXCIpXG5cdFx0XHRcblx0bmVhcmVzdFNlbGVjdGFibGUgID0gbnVsbFxuXHRcblx0ZmlsdGVyZWRTZWxlY3RhYmxlcyA9IGZpbHRlclNlbGVjdGFibGVzQnlEaXJlY3Rpb24oY3VycmVudFNlbGVjdGlvbiwgZGlyZWN0aW9uKVxuXHRcblx0I1N0YXJ0IHdpdGggYSBhcmJpdGFyeSBsYXJnZSBudW1iZXIgdG8gY29tcGFyZSBhbGwgb3RoZXIgZGlzdGFuY2VzIHRvXG5cdGRpc3RhbmNlVG9OZWFyZXN0ID0gNTAwMFxuXG5cdGZvciBzZWxlY3RhYmxlIGluIGZpbHRlcmVkU2VsZWN0YWJsZXNcblx0XG5cdFx0c3dpdGNoKGRpcmVjdGlvbilcblx0XHQjZ2V0IHRoZSB4LHkgY29vcmRpbmF0ZXMgb2YgdGhlIHRhcmdldCBzZWxlY3Rpb24gdG8gY2FsY3VsYXRlIGRpc3RhbmNlXG5cdFx0XHR3aGVuIFwidXBcIlxuXHRcdFx0XHR4MSA9IGdldENvb3JkcyhzZWxlY3RhYmxlLFwibWlkWFwiKVxuXHRcdFx0XHR5MSA9IGdldENvb3JkcyhzZWxlY3RhYmxlLFwibWF4WVwiKS01XG5cdFx0XHRcdFxuXHRcdFx0d2hlbiBcImRvd25cIlxuXHRcdFx0XHR4MSA9IGdldENvb3JkcyhzZWxlY3RhYmxlLFwibWlkWFwiKVxuXHRcdFx0XHR5MSA9IGdldENvb3JkcyhzZWxlY3RhYmxlLFwibWluWVwiKSs1XG5cdFx0XHRcdFxuXHRcdFx0d2hlbiBcImxlZnRcIlxuXHRcdFx0XHR4MSA9IGdldENvb3JkcyhzZWxlY3RhYmxlLFwibWF4WFwiKS01XG5cdFx0XHRcdHkxID0gZ2V0Q29vcmRzKHNlbGVjdGFibGUsXCJtaWRZXCIpXG5cdFx0XHRcdFxuXHRcdFx0d2hlbiBcInJpZ2h0XCJcblx0XHRcdFx0eDEgPSBnZXRDb29yZHMoc2VsZWN0YWJsZSxcIm1pblhcIikrNVxuXHRcdFx0XHR5MSA9IGdldENvb3JkcyhzZWxlY3RhYmxlLFwibWlkWVwiKVxuXHRcdFxuXG5cdFx0I2NhbGN1bGF0ZSBkaXN0YW5jZVxuXHRcdGR4ID0geDEgLSB4MlxuXHRcdGR5ID0geTEgLSB5MlxuXHRcdHNlbGVjdGFibGVEaXN0YW5jZSA9IE1hdGguc3FydCAoZHgqZHggKyBkeSpkeSlcblx0XHRcblx0XHRpZiAoc2VsZWN0YWJsZURpc3RhbmNlIDwgZGlzdGFuY2VUb05lYXJlc3QpXG5cdFx0XHRkaXN0YW5jZVRvTmVhcmVzdCA9IHNlbGVjdGFibGVEaXN0YW5jZVxuXHRcdFx0bmVhcmVzdFNlbGVjdGFibGUgPSBzZWxlY3RhYmxlXG5cdFx0XHRcblx0cmV0dXJuIG5lYXJlc3RTZWxlY3RhYmxlIFxuXG4jIFRPRE86IE1PQVIgRVZFTlRTISEhXG4jIEdhbWVwYWQub24gJ2dhbWVwYWRrZXl1cCcsIChldmVudCkgLT5cbiMgXHRwcmludCBcImtleSB1cFwiLGV2ZW50XG4jIFx0XG4jIEdhbWVwYWQub24gJ2dhbWVwYWRrZXlkb3duJywgKGV2ZW50KSAtPlxuIyBcdHByaW50IFwia2V5IGRvd25cIixldmVudFxuIyBcbiMgR2FtZXBhZC5vbiAnZ2FtZXBhZGtleWhlbGQnLCAoZXZlbnQpIC0+XG4jIFx0cHJpbnQgXCJrZXkgaGVsZFwiLGV2ZW50XG5cblxuIyBtb3ZlIHRoZSBzZWxlY3Rpb24gdG8gdGhlIG5lYXJlc3QgbmVpZ2hib3IgaW4gYSBzcGVjaWZpZWQgZGlyZWN0aW9uXG5tb3ZlU2VsZWN0aW9uID0gKGRpcmVjdGlvbiwgdGhhdCkgPT5cblx0c3dpdGNoKGRpcmVjdGlvbilcblx0XHR3aGVuIFwidXBcIlxuXHRcdFx0dGFyZ2V0ID0gdGhhdC5jdXJyZW50U2VsZWN0aW9uLnVwXG5cdFx0d2hlbiBcImRvd25cIlxuXHRcdFx0dGFyZ2V0ID0gdGhhdC5jdXJyZW50U2VsZWN0aW9uLmRvd25cblx0XHR3aGVuIFwibGVmdFwiXG5cdFx0XHR0YXJnZXQgPSB0aGF0LmN1cnJlbnRTZWxlY3Rpb24ubGVmdFxuXHRcdHdoZW4gXCJyaWdodFwiXG5cdFx0XHR0YXJnZXQgPSB0aGF0LmN1cnJlbnRTZWxlY3Rpb24ucmlnaHRcblxuXHRpZih0YXJnZXQgaXMgdW5kZWZpbmVkKVxuXHRcdHRhcmdldCA9IGZpbmROZWFyZXN0KHRoYXQuY3VycmVudFNlbGVjdGlvbiwgZGlyZWN0aW9uKVxuXHRcdFxuXHRpZih0YXJnZXQgaXMgbnVsbClcblx0XHRyZXR1cm5cblxuXHRcblx0dGhhdC5sYXN0U2VsZWN0aW9uID0gdGhhdC5jdXJyZW50U2VsZWN0aW9uXG5cdHRoYXQuY3VycmVudFNlbGVjdGlvbi5zZWxlY3RlZCA9IGZhbHNlXG5cdFxuXHR0aGF0LmN1cnJlbnRTZWxlY3Rpb24gPSB0YXJnZXRcblx0dGhhdC5jdXJyZW50U2VsZWN0aW9uLnNlbGVjdGVkID0gdHJ1ZVx0XG5cblx0YnViYmxlQmx1ckV2ZW50KHRoYXQuY3VycmVudFNlbGVjdGlvbiwgdGhhdC5sYXN0U2VsZWN0aW9uKSBcdFxuXHR0aGF0Lmxhc3RTZWxlY3Rpb24uZW1pdCBcImJsdXJcIlxuXG5cdGJ1YmJsZUZvY3VzRXZlbnQodGhhdC5jdXJyZW50U2VsZWN0aW9uLCB0aGF0Lmxhc3RTZWxlY3Rpb24pIFx0XG5cdHRoYXQuY3VycmVudFNlbGVjdGlvbi5lbWl0IFwiZm9jdXNcIlxuXG5cdHRoYXQuZW1pdCBcImNoYW5nZTpzZWxlY3Rpb25cIlxuXG5cbiMgYnViYmxlcyB0aGUgZm9jdXMgZXZlbnRzIGZyb20gY3VycmVudCBsYXllciBhbGwgdGhlIHdheSB0byB0aGUgdG9wXG4jIG5vdGU6IG1ha2Ugc3VyZSB0aGF0IGN1cnJlbnQgc2VsZWN0aW9uIGFuZCBsYXN0IHNlbGVjdGlvbiBhcmUgdXBkYXRlZCBCRUZPUkUgdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQhISFcbmJ1YmJsZUZvY3VzRXZlbnQgPSAoY3VycmVudFNlbGVjdGlvbiwgbGFzdFNlbGVjdGlvbikgPT5cblx0XG5cdGlmKGN1cnJlbnRTZWxlY3Rpb24gaXMgbnVsbClcblx0XHRyZXR1cm5cblxuXHRpZihjdXJyZW50U2VsZWN0aW9uLnByb3BhZ2F0ZUV2ZW50cyBpcyBmYWxzZSlcblx0XHRyZXR1cm5cblx0XG5cdFxuXHQjIGZvY3VzIGV2ZW50IGlzIGFsd2F5cyBjYWxsZWQgIGZyb20gdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdHBhcmVudEVsZW1lbnRzID0gY3VycmVudFNlbGVjdGlvbi5hbmNlc3RvcnMoKVxuXHRvcmlnaW5hdGluZ0xheWVyID0gY3VycmVudFNlbGVjdGlvblxuXHRcblx0Zm9yIGVsZW1lbnQgaW4gcGFyZW50RWxlbWVudHNcblx0XHQjZW1pdCB0aGUgZXZlbnQgbm9ybWFsbHkgaWYgdGhlIHBhcmVudCBlbGVtZW50IGlzIE5PVCBhIGZsb3cgY29tcG9uZW50OlxuXHRcdGlmKGVsZW1lbnQuY29uc3RydWN0b3IubmFtZSBpc250IFwiRmxvd0NvbXBvbmVudFwiKVxuXHRcdFx0ZWxlbWVudC5lbWl0IFwiZm9jdXNcIiwgb3JpZ2luYXRpbmdMYXllclxuXHRcdGVsc2Vcblx0XHQjaWYgaXQgSVMgYSBmbG93IGNvbXBvbmVudDpcblx0XHRcdCMgVGhlIHVzZXIgaW50ZW50IGJlaGluZCBsaXN0ZW5pbmcgdG8gdGhlIGJsdXIgLyBmb2N1cyBldmVudHMgb24gYSBmbG93IGNvbXBvbmVudCBpcyB0byBzZWUgaWYgdGhlIHNlbGVjdGlvbiBoYXMgbW92ZWQgaW4gLyBvdXQgb2YgdGhlIGZsb3cgY29tcG9uZW50XG5cdFx0XHQjIHRoZXJlZm9yZSwgdGhlIGJsdXIgLyBmb2N1cyBldmVudHMgYXJlIHN1cHJlc3NlZCBmb3IgYSBmbG93IGNvbXBvbmVudCBpZiBib3RoIHRoZSBjdXJyZW50IGFuZCBsYXN0IHNlbGVjdGlvbiBhcmUgaW5zaWRlIHRoZSBzYW1lIGZsb3cgY29tcG9uZW50XG5cdFx0XHRcblx0XHRcdCNzdGVwIDE6IGdldCB0aGUgY3VycmVudCBlbGVtZW50J3MgZGVzY2VuZGFudHNcblx0XHRcdGNoaWxkcmVuID0gZWxlbWVudC5kZXNjZW5kYW50c1xuXHRcdFx0XG5cdFx0XHQjc3RlcCAyOiBzZWFyY2ggZm9yIHRoZSBjdXJyZW50IGFuZCBsYXN0IHNlbGVjdGlvbiBpbiB0aGUgZGVzY2VuZGFudCB0cmVlXG5cdFx0XHRjdXJyZW50U2VsZWN0aW9uSXNDaGlsZCA9IGZhbHNlXG5cdFx0XHRsYXN0U2VsZWN0aW9uSXNDaGlsZCA9IGZhbHNlXG5cdFx0XHRmb3IgaSBpbiBbMC4uY2hpbGRyZW4ubGVuZ3RoLTFdXG5cdFx0XHRcdGlmKGNoaWxkcmVuW2ldIGlzIGN1cnJlbnRTZWxlY3Rpb24pXG5cdFx0XHRcdFx0Y3VycmVudFNlbGVjdGlvbklzQ2hpbGQgPSB0cnVlXG5cblx0XHRcdFx0aWYoY2hpbGRyZW5baV0gaXMgbGFzdFNlbGVjdGlvbilcblx0XHRcdFx0XHRsYXN0U2VsZWN0aW9uSXNDaGlsZCA9IHRydWVcblx0XHRcdFxuXHRcdFx0I3N0ZXAgMzogZW1pdCBmb2N1cyBldmVudCBvbmx5IGlmIHRoZSBzZWxlY3Rpb24gaGFzIG1vdmVkIGluIHRvIHRoZSBmbG93IGNvbXBvbmVudFxuXHRcdFx0aWYobGFzdFNlbGVjdGlvbklzQ2hpbGQgaXMgZmFsc2UgYW5kIGN1cnJlbnRTZWxlY3Rpb25Jc0NoaWxkIGlzIHRydWUpIFx0XG5cdFx0XHRcdFx0ZWxlbWVudC5lbWl0IFwiZm9jdXNcIiwgb3JpZ2luYXRpbmdMYXllclxuXHRcdFx0XHRcdFxuXHQjZW1pdCBldmVudHMgb24gd2luZG93LmRvY3VtZW50XG5cdGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiZm9jdXNcIiwge2RldGFpbDogb3JpZ2luYXRpbmdMYXllciB9KVx0XG5cdHdpbmRvdy5kb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KVxuXG5cblxuIyBidWJibGVzIHRoZSBibHVyIGV2ZW50cyBmcm9tIGN1cnJlbnQgbGF5ZXIgYWxsIHRoZSB3YXkgdG8gdGhlIHRvcFxuIyBub3RlOiBtYWtlIHN1cmUgdGhhdCBjdXJyZW50IHNlbGVjdGlvbiBhbmQgbGFzdCBzZWxlY3Rpb24gYXJlIHVwZGF0ZWQgQkVGT1JFIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkISEhXG5idWJibGVCbHVyRXZlbnQgPSAoY3VycmVudFNlbGVjdGlvbiwgbGFzdFNlbGVjdGlvbikgPT5cblxuXHRpZihsYXN0U2VsZWN0aW9uIGlzIG51bGwpXG5cdFx0cmV0dXJuXG5cblx0aWYobGFzdFNlbGVjdGlvbi5wcm9wYWdhdGVFdmVudHMgaXMgZmFsc2UpXG5cdFx0cmV0dXJuXG5cblx0I2VtaXQgZXZlbnRzIG9uIHBhcmVudCBsYXllcnNcblx0XG5cdCMgYmx1ciBldmVudCBpcyBhbHdheXMgY2FsbGVkIG9uIHRoZSBsYXN0IHNlbGVjdGlvblxuXHRwYXJlbnRFbGVtZW50cyA9IGxhc3RTZWxlY3Rpb24uYW5jZXN0b3JzKClcblx0b3JpZ2luYXRpbmdMYXllciA9IGxhc3RTZWxlY3Rpb25cblxuXHRmb3IgZWxlbWVudCBpbiBwYXJlbnRFbGVtZW50c1xuXHRcdCNlbWl0IHRoZSBldmVudCBub3JtYWxseSBpZiB0aGUgcGFyZW50IGVsZW1lbnQgaXMgTk9UIGEgZmxvdyBjb21wb25lbnQ6XG5cdFx0aWYoZWxlbWVudC5jb25zdHJ1Y3Rvci5uYW1lIGlzbnQgXCJGbG93Q29tcG9uZW50XCIpXG5cdFx0XHRlbGVtZW50LmVtaXQgXCJibHVyXCIsIG9yaWdpbmF0aW5nTGF5ZXJcblx0XHRlbHNlXG5cdFx0I2lmIGl0IElTIGEgZmxvdyBjb21wb25lbnQ6XG5cblx0XHRcdCMgVGhlIHVzZXIgaW50ZW50IGJlaGluZCBsaXN0ZW5pbmcgdG8gdGhlIGJsdXIgLyBmb2N1cyBldmVudHMgb24gYSBmbG93IGNvbXBvbmVudCBpcyB0byBzZWUgaWYgdGhlIHNlbGVjdGlvbiBoYXMgbW92ZWQgaW4gLyBvdXQgb2YgdGhlIGZsb3cgY29tcG9uZW50XG5cdFx0XHQjIHRoZXJlZm9yZSwgdGhlIGJsdXIgLyBmb2N1cyBldmVudHMgYXJlIHN1cHJlc3NlZCBmb3IgYSBmbG93IGNvbXBvbmVudCBpZiBib3RoIHRoZSBjdXJyZW50IGFuZCBsYXN0IHNlbGVjdGlvbiBhcmUgaW5zaWRlIHRoZSBzYW1lIGZsb3cgY29tcG9uZW50XG5cdFx0XHRcblx0XHRcdCNzdGVwIDE6IGdldCB0aGUgY3VycmVudCBlbGVtZW50J3MgZGVzY2VuZGFudHNcblx0XHRcdGNoaWxkcmVuID0gZWxlbWVudC5kZXNjZW5kYW50c1xuXHRcdFx0XG5cdFx0XHQjc3RlcCAyOiBzZWFyY2ggZm9yIHRoZSBjdXJyZW50IGFuZCBsYXN0IHNlbGVjdGlvbiBpbiB0aGUgZmxvdyBjb21wb25lbnQncyBkZXNjZW5kYW50c1xuXHRcdFx0Y3VycmVudFNlbGVjdGlvbklzQUNoaWxkID0gZmFsc2Vcblx0XHRcdGxhc3RTZWxlY3Rpb25Jc0FDaGlsZCA9IGZhbHNlXG5cdFx0XHRmb3IgaSBpbiBbMC4uY2hpbGRyZW4ubGVuZ3RoLTFdXG5cdFx0XHRcdGlmKGNoaWxkcmVuW2ldIGlzIGN1cnJlbnRTZWxlY3Rpb24pXG5cdFx0XHRcdFx0Y3VycmVudFNlbGVjdGlvbklzQUNoaWxkID0gdHJ1ZVxuXG5cdFx0XHRcdGlmKGNoaWxkcmVuW2ldIGlzIGxhc3RTZWxlY3Rpb24pXG5cdFx0XHRcdFx0bGFzdFNlbGVjdGlvbklzQUNoaWxkID0gdHJ1ZVxuXG5cdFx0XHQjc3RlcCAzOiBlbWl0IGJsdXIgZXZlbnQgb25seSBpZiB0aGUgc2VsZWN0aW9uIGhhcyBtb3ZlZCBvdXQgb2YgdGhlIGZsb3cgY29tcG9uZW50LCBpLmUuIGxhc3Qgc2VsZWN0aW9uIGlzIGEgY2hpbGQgYW5kIHRoZSBjdXJyZW50IHNlbGVjdGlvbiBpc250XG5cdFx0XHRpZihsYXN0U2VsZWN0aW9uSXNBQ2hpbGQgaXMgdHJ1ZSBhbmQgY3VycmVudFNlbGVjdGlvbklzQUNoaWxkIGlzIGZhbHNlKSBcdFxuXHRcdFx0XHRcdGVsZW1lbnQuZW1pdCBcImJsdXJcIiwgb3JpZ2luYXRpbmdMYXllclxuXG5cdCNlbWl0IGV2ZW50cyBvbiB3aW5kb3cuZG9jdW1lbnRcblx0ZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJibHVyXCIsIHtkZXRhaWw6IG9yaWdpbmF0aW5nTGF5ZXIgfSlcdFxuXHR3aW5kb3cuZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudClcblx0XHRcblxuIyBidWJibGVzIGFsbCBvdGhlciBldmVudHMgZnJvbSBjdXJyZW50IGxheWVyIGFsbCB0aGUgd2F5IHRvIHRoZSB0b3BcbmJ1YmJsZUV2ZW50ID0gKGJ1YmJsZWRFdmVudCwgb3JpZ2luYXRpbmdMYXllcikgPT5cblx0XG5cdGlmKG9yaWdpbmF0aW5nTGF5ZXIucHJvcGFnYXRlRXZlbnRzIGlzIGZhbHNlKVxuXHRcdHJldHVyblxuXG5cdCNlbWl0IGJ1dHRvbiBwcmVzcyBldmVudCBvbiBjdXJyZW50IGxheWVyXG5cdG9yaWdpbmF0aW5nTGF5ZXIuZW1pdCBcImJ1dHRvblByZXNzXCIsIGJ1YmJsZWRFdmVudFxuXG5cdCNlbWl0IGV2ZW50IG9uIHBhcmVudCBsYXllcnNcblx0cGFyZW50RWxlbWVudHMgPSBvcmlnaW5hdGluZ0xheWVyLmFuY2VzdG9ycygpXG5cdGZvciBlbGVtZW50IGluIHBhcmVudEVsZW1lbnRzXG5cdFx0ZWxlbWVudC5lbWl0IGJ1YmJsZWRFdmVudCwgb3JpZ2luYXRpbmdMYXllclxuXHRcdGVsZW1lbnQuZW1pdCBcImJ1dHRvblByZXNzXCIsIGJ1YmJsZWRFdmVudCwgb3JpZ2luYXRpbmdMYXllclxuXHRcdFx0XG5cdCNlbWl0IGV2ZW50cyBvbiB3aW5kb3cuZG9jdW1lbnRcblx0ZXZlbnQxID0gbmV3IEN1c3RvbUV2ZW50KGJ1YmJsZWRFdmVudCwge2RldGFpbDogb3JpZ2luYXRpbmdMYXllciB9KVx0XG5cdHdpbmRvdy5kb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50MSlcblx0XG5cdGV2ZW50MiA9IG5ldyBDdXN0b21FdmVudChcImJ1dHRvblByZXNzXCIsIHtcblx0XHRkZXRhaWw6IHtcblx0XHRcdGtleTogYnViYmxlZEV2ZW50XG5cdFx0XHRsYXllcjogb3JpZ2luYXRpbmdMYXllclxuXHRcdFx0fVxuXHRcdH0pO1xuXHR3aW5kb3cuZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudDIpXG5cdFxuXG5cdFxuI2ZvY3VzIG1hbmFnZXIgY2xhc3MgdG8gdHJhY2sgdGhlIHNlbGVjdGlvbiBhcm91bmQgdGhlIHNjcmVlblxuY2xhc3MgZm9jdXNNYW5hZ2VyIGV4dGVuZHMgTGF5ZXJcblx0QC5jdXJyZW50U2VsZWN0aW9uID0gbnVsbFxuXHRALmxhc3RTZWxlY3Rpb24gPSBudWxsXG5cdEAua2V5Y29kZXMgPSB7fVxuXHRjb25zdHJ1Y3RvcjogKCBvcHRpb25zPXt9ICkgLT5cblx0XHRALm9wdGlvbnMgPSBfLmRlZmF1bHRzIG9wdGlvbnMsIHNlbGVjdGlvbkNvbnRyb2xsZXJEZWZhdWx0T3B0aW9uc1xuXHRcdEAuY3VycmVudFNlbGVjdGlvbiA9IEAub3B0aW9ucy5zZWxlY3RlZEl0ZW1cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0aWYoQC5vcHRpb25zLmNvbnRyb2xsZXIgaXMgXCJQUzRcIilcblx0XHRcdGtleWNvZGVzPXtcblxuXHRcdFx0XHRzcXVhcmUgXHRcdDpcdFx0MFxuXHRcdFx0XHRjcm9zc1x0XHQ6XHRcdDFcblx0XHRcdFx0Y2lyY2xlIFx0XHQ6XHRcdDJcblx0XHRcdFx0dHJpYW5nbGUgXHQ6XHRcdDNcblx0XHRcdFx0XG5cdFx0XHRcdGwxIFx0XHRcdDpcdFx0NFxuXHRcdFx0XHRyMSBcdFx0XHQ6XHRcdDVcblxuXHRcdFx0XHRyMiBcdFx0XHQ6XHRcdDZcblx0XHRcdFx0bDIgXHRcdFx0Olx0XHQ3XHRcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHRcdGwzcHJlc3MgXHQ6XHRcdDEwXG5cdFx0XHRcdHIzcHJlc3MgXHQ6XHRcdDExXG5cblx0XHRcdFx0aG9tZSBcdFx0Olx0XHQxMlxuXHRcdFx0XHR0b3VjaHBhZCBcdDpcdFx0MTNcblxuXHRcdFx0XHR1cCBcdFx0XHQ6XHRcdDE0XG5cdFx0XHRcdGRvd24gXHRcdDpcdFx0MTVcblx0XHRcdFx0bGVmdCBcdFx0Olx0XHQxNlxuXHRcdFx0XHRyaWdodCBcdFx0Olx0XHQxN1xuXG5cblx0XHRcdFx0bDNMZWZ0IFx0XHQ6XHRcdDM3XG5cdFx0XHRcdGwzVXAgXHRcdDpcdFx0Mzhcblx0XHRcdFx0bDNSaWdodCBcdDpcdFx0Mzlcblx0XHRcdFx0bDNEb3duIFx0XHQ6XHRcdDQwXG5cdFx0XHRcdFxuXHRcdFx0XHRyM1VwIFx0XHQ6XHRcdDQxXG5cdFx0XHRcdHIzTGVmdCBcdFx0Olx0XHQ0Mlx0XHRcdFx0XG5cdFx0XHRcdHIzRG93biBcdFx0Olx0XHQ0M1xuXHRcdFx0XHRyM1JpZ2h0IFx0Olx0XHQ0NFxuXG5cdFx0XHR9XG5cblxuXHRcdGlmKEAub3B0aW9ucy5jb250cm9sbGVyIGlzIFwiWEIxXCIpXG5cdFx0XHRrZXljb2Rlcz17XG5cblx0XHRcdFx0YVx0XHRcdDpcdFx0MFxuXHRcdFx0XHRiIFx0XHRcdDpcdFx0MVxuXHRcdFx0XHR4IFx0XHRcdDpcdFx0MlxuXHRcdFx0XHR5IFx0XHRcdDpcdFx0M1xuXHRcdFx0XHRcblx0XHRcdFx0bGJcdFx0XHQ6XHRcdDRcdFxuXHRcdFx0XHRyYlx0XHRcdDpcdFx0NVx0XG5cdFx0XHRcdFxuXHRcdFx0XHRsalByZXNzIFx0Olx0XHQ2XG5cdFx0XHRcdHJqUHJlc3MgXHQ6XHRcdDdcblxuXHRcdFx0XHRzdGFydCBcdFx0Olx0XHQ4XG5cdFx0XHRcdHNlbGVjdCBcdFx0Olx0XHQ5XG5cdFx0XHRcdGhvbWUgXHRcdDpcdFx0MTBcblxuXG5cdFx0XHRcdHJ0XHRcdFx0Olx0XHQxNVx0IyB1bmNvbmZpcm1lZFxuXHRcdFx0XHRsdCBcdFx0XHQ6XHRcdDE2XHQjIHVuY29uZmlybWVkXHRcdFxuXG5cdFx0XHRcdHVwIFx0XHRcdDpcdFx0MTFcblx0XHRcdFx0ZG93biBcdFx0Olx0XHQxMlxuXHRcdFx0XHRsZWZ0IFx0XHQ6XHRcdDEzXG5cdFx0XHRcdHJpZ2h0IFx0XHQ6XHRcdDE0XG5cblx0XHRcdFx0bGpMZWZ0IFx0XHQ6XHRcdDM3XG5cdFx0XHRcdGxqVXAgXHRcdDpcdFx0Mzhcblx0XHRcdFx0bGpSaWdodCBcdDpcdFx0Mzlcblx0XHRcdFx0bGpEb3duIFx0XHQ6XHRcdDQwXG5cdFx0XHRcdFxuXHRcdFx0XHRyalVwIFx0XHQ6XHRcdDQxXG5cdFx0XHRcdHJqTGVmdCBcdFx0Olx0XHQ0Mlx0XHRcdFx0XG5cdFx0XHRcdHJqRG93biBcdFx0Olx0XHQ0M1xuXHRcdFx0XHRyalJpZ2h0IFx0Olx0XHQ0NFxuXG5cblx0XHRcdH1cblxuXHRcdCNjcmVhdGUgZXZlbnQgbGlzdGVuZXIgZm9yIGdhbWVwYWQga2V5IHByZXNzZXMgYW5kIGVtaXQgY29ycmVzcG9uZGluZyBldmVudHNcblx0XHRHYW1lcGFkLm9uICdnYW1lcGFkZXZlbnQnLCBVdGlscy50aHJvdHRsZSAwLjI1LCAoZXZlbnQpID0+XG5cblx0XHRcdGlmKEAuY3VycmVudFNlbGVjdGlvbiBpcyBudWxsKVxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0a2V5Y29kZSA9IGV2ZW50LmtleUNvZGVcblx0XHRcdFxuXHRcdFx0I3NhdmUgY3VycmVudCBzZWxlY3Rpb24gdG8gYSB0ZW1wIHZhcmlhYmxlIGFzIGl0IG1pZ2h0IGNoYW5nZSB3aGlsZSB0aGUgZXZlbnRzIGFyZSBzdGlsbCBiZWluZyBlbWl0dGVkXG5cdFx0XHRhID0gQC5jdXJyZW50U2VsZWN0aW9uXG5cblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMudXApXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwidXBcIiwgYSlcdFx0XHRcdFxuXHRcdFx0XHRhLmVtaXQgXCJ1cFwiXG5cdFx0XHRcdG1vdmVTZWxlY3Rpb24oXCJ1cFwiLCBAKVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRpZihrZXljb2RlIGlzIGtleWNvZGVzLmRvd24pXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwiZG93blwiLCBhKVx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0YS5lbWl0IFwiZG93blwiXG5cdFx0XHRcdG1vdmVTZWxlY3Rpb24oXCJkb3duXCIsIEApXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHQjbGVmdCBhcnJvd1xuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5sZWZ0KVxuXHRcdFx0XHRidWJibGVFdmVudChcImxlZnRcIiwgYSlcdFx0XHRcdFxuXHRcdFx0XHRhLmVtaXQgXCJsZWZ0XCJcblx0XHRcdFx0bW92ZVNlbGVjdGlvbihcImxlZnRcIiwgQClcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHQjcmlnaHQgYXJyb3dcblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMucmlnaHQpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwicmlnaHRcIiwgYSlcblx0XHRcdFx0YS5lbWl0IFwicmlnaHRcIlxuXHRcdFx0XHRtb3ZlU2VsZWN0aW9uKFwicmlnaHRcIiwgQClcblxuXHRcdFx0I2Nyb3NzIC8gQSBidXR0b25cblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMuY3Jvc3Mgb3Iga2V5Y29kZSBpcyBrZXljb2Rlcy5hKVxuXHRcdFx0XHRidWJibGVFdmVudChcImFcIiwgYSlcdFx0XHRcdFx0XG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwiY3Jvc3NcIiwgYSlcblxuXHRcdFx0XHRhLmVtaXQgXCJhXCJcblx0XHRcdFx0YS5lbWl0IFwiY3Jvc3NcIlxuXHRcdFx0XHRcblx0XHRcdCNjaXJjbGUgLyBCIGJ1dHRvblxuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5jaXJjbGUgb3Iga2V5Y29kZSBpcyBrZXljb2Rlcy5iKVxuXHRcdFx0XHRidWJibGVFdmVudChcImJcIiwgYSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJjaXJjbGVcIiwgYSlcblx0XHRcdFx0XG5cdFx0XHRcdGEuZW1pdCBcImJcIlxuXHRcdFx0XHRhLmVtaXQgXCJjaXJjbGVcIlxuXHRcdFx0XHRcblx0XHRcdCNzcXVhcmUgLyBYIGJ1dHRvblxuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5zcXVhcmUgb3Iga2V5Y29kZSBpcyBrZXljb2Rlcy54KVxuXHRcdFx0XHRidWJibGVFdmVudChcInhcIiwgYSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJzcXVhcmVcIiwgYSlcblx0XHRcdFx0XG5cdFx0XHRcdGEuZW1pdCBcInhcIlxuXHRcdFx0XHRhLmVtaXQgXCJzcXVhcmVcIlxuXG5cdFx0XHQjdHJpYW5nbGUgLyBZIGJ1dHRvblxuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy50cmlhbmdsZSBvciBrZXljb2RlIGlzIGtleWNvZGVzLnkpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwieVwiLCBhKVxuXHRcdFx0XHRidWJibGVFdmVudChcInRyaWFuZ2xlXCIsIGEpXG5cdFx0XHRcdFxuXHRcdFx0XHRhLmVtaXQgXCJ5XCJcblx0XHRcdFx0YS5lbWl0IFwidHJpYW5nbGVcIlxuXHRcdFx0XHRcblx0XHRcdCNMMSAvIGxlZnQgYnVtcGVyIGJ1dHRvblxuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5sMSBvciBrZXljb2RlIGlzIGtleWNvZGVzLmxiKVxuXHRcdFx0XHRidWJibGVFdmVudChcImxiXCIsIGEpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwibDFcIiwgYSlcblxuXHRcdFx0XHRhLmVtaXQgXCJsYlwiXG5cdFx0XHRcdGEuZW1pdCBcImwxXCJcblxuXHRcdFx0I1IxIC8gcmlnaHQgYnVtcGVyIGJ1dHRvblxuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5yMSBvciBrZXljb2RlIGlzIGtleWNvZGVzLnJiKVxuXHRcdFx0XHRidWJibGVFdmVudChcInJiXCIsIGEpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwicjFcIiwgYSlcblxuXHRcdFx0XHRhLmVtaXQgXCJyYlwiXG5cdFx0XHRcdGEuZW1pdCBcInIxXCJcblxuXHRcdFx0I1IyIC8gcmlnaHQgdHJpZ2dlciBidXR0b25cblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMucjIgb3Iga2V5Y29kZSBpcyBrZXljb2Rlcy5ydClcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJydFwiLCBhKVxuXHRcdFx0XHRidWJibGVFdmVudChcInIyXCIsIGEpXG5cblx0XHRcdFx0YS5lbWl0IFwicnRcIlxuXHRcdFx0XHRhLmVtaXQgXCJyMlwiXG5cblx0XHRcdFx0XG5cdFx0XHQjTDIgLyBsZWZ0IHRyaWdnZXIgYnV0dG9uXG5cdFx0XHRpZihrZXljb2RlIGlzIGtleWNvZGVzLmwyIG9yIGtleWNvZGUgaXMga2V5Y29kZXMubHQpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwibHRcIiwgYSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJsMlwiLCBhKVxuXHRcdFx0XHRcblx0XHRcdFx0YS5lbWl0IFwibHRcIlxuXHRcdFx0XHRhLmVtaXQgXCJsMlwiXG5cdFx0XHRcdFxuXG5cblx0XHRcdCNsZWZ0IGpveXN0aWNrIGRpcmVjdGlvblxuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5sM0xlZnQgb3Iga2V5Y29kZSBpcyBrZXljb2Rlcy5sakxlZnQpXG5cdFx0XHRcdGlmKEAub3B0aW9ucy5sZWZ0U3RpY2tEcGFkKSBcblx0XHRcdFx0XHRidWJibGVFdmVudChcImxlZnRcIiwgYSlcblx0XHRcdFx0XHRhLmVtaXQgXCJsZWZ0XCJcblx0XHRcdFx0XHRtb3ZlU2VsZWN0aW9uKFwibGVmdFwiLCBAKVxuXHRcdFx0XHRcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJsakxlZnRcIiwgYSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJsM0xlZnRcIiwgYSlcblxuXHRcdFx0XHRhLmVtaXQgXCJsakxlZnRcIlxuXHRcdFx0XHRhLmVtaXQgXCJsM0xlZnRcIlxuXHRcdFx0XHRcblx0XHRcdFx0XG5cblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMubDNVcCBvciBrZXljb2RlIGlzIGtleWNvZGVzLmxqVXApXG5cdFx0XHRcdGlmKEAub3B0aW9ucy5sZWZ0U3RpY2tEcGFkKSBcblx0XHRcdFx0XHRidWJibGVFdmVudChcInVwXCIsIGEpXG5cdFx0XHRcdFx0YS5lbWl0IFwidXBcIlxuXHRcdFx0XHRcdG1vdmVTZWxlY3Rpb24oXCJ1cFwiLCBAKVxuXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwibDNVcFwiLCBhKVxuXHRcdFx0XHRidWJibGVFdmVudChcImxqVXBcIiwgYSlcblxuXHRcdFx0XHRhLmVtaXQgXCJsalVwXCJcblx0XHRcdFx0YS5lbWl0IFwibDNVcFwiXG5cblxuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5sM1JpZ2h0IG9yIGtleWNvZGUgaXMga2V5Y29kZXMubGpSaWdodClcblx0XHRcdFx0aWYoQC5vcHRpb25zLmxlZnRTdGlja0RwYWQpIFxuXHRcdFx0XHRcdGJ1YmJsZUV2ZW50KFwicmlnaHRcIiwgYSlcblx0XHRcdFx0XHRhLmVtaXQgXCJyaWdodFwiXG5cdFx0XHRcdFx0bW92ZVNlbGVjdGlvbihcInJpZ2h0XCIsIEApXHRcdFx0XG5cblx0XHRcdFx0YnViYmxlRXZlbnQoXCJsalJpZ2h0XCIsIGEpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwibDNSaWdodFwiLCBhKVxuXG5cdFx0XHRcdGEuZW1pdCBcImxqUmlnaHRcIlxuXHRcdFx0XHRhLmVtaXQgXCJsM1JpZ2h0XCJcblxuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5sM0Rvd24gb3Iga2V5Y29kZSBpcyBrZXljb2Rlcy5sakRvd24pXG5cdFx0XHRcdGlmKEAub3B0aW9ucy5sZWZ0U3RpY2tEcGFkKSBcblx0XHRcdFx0XHRidWJibGVFdmVudChcImRvd25cIiwgYSlcblx0XHRcdFx0XHRhLmVtaXQgXCJkb3duXCJcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdG1vdmVTZWxlY3Rpb24oXCJkb3duXCIsIEApXG5cblx0XHRcdFx0YS5lbWl0IFwibGpEb3duXCJcdFx0XHRcdFx0XG5cdFx0XHRcdGEuZW1pdCBcImwzRG93blwiXG5cblx0XHRcdFx0YnViYmxlRXZlbnQoXCJsakRvd25cIiwgYSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJsM0Rvd25cIiwgYSlcblxuXHRcdFx0I0wzIC8gbGVmdCBqb3lzdGljayBidXR0b25cblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMubDNQcmVzcyBvciBrZXljb2RlIGlzIGtleWNvZGVzLmxqUHJlc3MpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwibGpQcmVzc1wiLCBhKVxuXHRcdFx0XHRidWJibGVFdmVudChcImwzUHJlc3NcIiwgYSlcblx0XHRcdFx0XG5cdFx0XHRcdGEuZW1pdCBcImxqUHJlc3NcIlx0XHRcdFx0XHRcdFxuXHRcdFx0XHRhLmVtaXQgXCJsM1ByZXNzXCJcblxuXHRcdFx0I3JpZ2h0IGpveXN0aWNrXG5cdFx0XHRpZihrZXljb2RlIGlzIGtleWNvZGVzLnIzTGVmdCBvciBrZXljb2RlIGlzIGtleWNvZGVzLnJqTGVmdClcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJyM0xlZnRcIiwgYSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJyakxlZnRcIiwgYSlcblxuXHRcdFx0XHRhLmVtaXQgXCJyakxlZnRcIlxuXHRcdFx0XHRhLmVtaXQgXCJyM0xlZnRcIlxuXHRcdFx0XG5cdFx0XHRcdFxuXG5cdFx0XHRpZihrZXljb2RlIGlzIGtleWNvZGVzLnIzVXAgb3Iga2V5Y29kZSBpcyBrZXljb2Rlcy5yalVwKVxuXHRcdFx0XHRidWJibGVFdmVudChcInJqVXBcIiwgYSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJyM1VwXCIsIGEpXG5cblx0XHRcdFx0YS5lbWl0IFwicmpVcFwiXG5cdFx0XHRcdGEuZW1pdCBcInIzVXBcIlxuXG5cdFx0XHRpZihrZXljb2RlIGlzIGtleWNvZGVzLnIzUmlnaHQgb3Iga2V5Y29kZSBpcyBrZXljb2Rlcy5yalJpZ2h0KVxuXHRcdFx0XHRidWJibGVFdmVudChcInJqUmlnaHRcIiwgYSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJyM1JpZ2h0XCIsIGEpXG5cblx0XHRcdFx0YS5lbWl0IFwicmpSaWdodFwiXG5cdFx0XHRcdGEuZW1pdCBcInIzUmlnaHRcIlxuXG5cdFx0XHRpZihrZXljb2RlIGlzIGtleWNvZGVzLnIzRG93biBvciBrZXljb2RlIGlzIGtleWNvZGVzLnJqRG93bilcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJyakRvd25cIiwgYSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJyM0Rvd25cIiwgYSlcblx0XHRcdFx0XG5cdFx0XHRcdGEuZW1pdCBcInJqRG93blwiXG5cdFx0XHRcdGEuZW1pdCBcInIzRG93blwiXG5cdFx0XHRcblx0XHRcdCNSMyAvIHJpZ2h0IGpveXN0aWNrIGJ1dHRvblxuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5yM1ByZXNzIG9yIGtleWNvZGUgaXMga2V5Y29kZXMucmpQcmVzcylcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJyalByZXNzXCIsIGEpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwicjNQcmVzc1wiLCBhKVxuXG5cdFx0XHRcdGEuZW1pdCBcInJqUHJlc3NcIlxuXHRcdFx0XHRhLmVtaXQgXCJyM1ByZXNzXCJcblxuXHRcdFx0I2hvbWUgYnV0dG9uXG5cdFx0XHRpZihrZXljb2RlIGlzIGtleWNvZGVzLmhvbWUpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwiaG9tZVwiLCBhKVxuXHRcdFx0XHRhLmVtaXQgXCJob21lXCJcblxuXHRcdFx0I3RvdWNocGFkIGJ1dHRvbiAoUFMgb25seSlcblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMudG91Y2hwYWQpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwidG91Y2hwYWRcIiwgYSlcblx0XHRcdFx0YS5lbWl0IFwidG91Y2hwYWRcIlxuXHRcdFx0XHRcblxuXHRcdFx0I3NlbGVjdCBidXR0b24gKFhCMSBvbmx5KVxuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5zZWxlY3QpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwic2VsZWN0XCIsIGEpXG5cdFx0XHRcdGEuZW1pdCBcInNlbGVjdFwiXG5cdFx0XHRcdFxuXG5cdFx0XHQjc3RhcnQgYnV0dG9uIChYQjEgb25seSlcblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMuc3RhcnQpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwic3RhcnRcIiwgYSlcblx0XHRcdFx0YS5lbWl0IFwic3RhcnRcIlxuXHRcdFx0XHRcblxuXHRcdCNjcmVhdGUgZXZlbnQgbGlzdGVuZXIgZm9yIGtleWJvYXJkIGtleSBwcmVzc2VzXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAna2V5ZG93bicsIFV0aWxzLnRocm90dGxlIDAuMiwgKGV2ZW50KSA9PlxuXHRcdFx0XG5cdFx0XHRpZihALmN1cnJlbnRTZWxlY3Rpb24gaXMgbnVsbClcblx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdGtleWNvZGUgPSBldmVudC53aGljaFxuXG5cdFx0XHRhID0gQC5jdXJyZW50U2VsZWN0aW9uXG5cblx0XHRcdFxuXHRcdFx0aWYoa2V5Y29kZSBpcyAzOClcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJ1cFwiLCBhKVxuXHRcdFx0XHRhLmVtaXQgXCJ1cFwiXHRcdFx0XHRcblx0XHRcdFx0bW92ZVNlbGVjdGlvbihcInVwXCIsIEApXG5cdFx0XHRcdFx0XHRcblx0XHRcdGlmKGtleWNvZGUgaXMgNDApXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwiZG93blwiLCBhKVxuXHRcdFx0XHRhLmVtaXQgXCJkb3duXCJcdFx0XHRcdFxuXHRcdFx0XHRtb3ZlU2VsZWN0aW9uKFwiZG93blwiLCBAKVxuXG5cdFx0XHQjbGVmdCBhcnJvd1xuXHRcdFx0aWYoa2V5Y29kZSBpcyAzNylcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJsZWZ0XCIsIGEpXG5cdFx0XHRcdGEuZW1pdCBcImxlZnRcIlxuXHRcdFx0XHRtb3ZlU2VsZWN0aW9uKFwibGVmdFwiLCBAKVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdCNyaWdodCBhcnJvd1xuXHRcdFx0aWYoa2V5Y29kZSBpcyAzOSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJyaWdodFwiLCBhKVxuXHRcdFx0XHRhLmVtaXQgXCJyaWdodFwiXG5cdFx0XHRcdG1vdmVTZWxlY3Rpb24oXCJyaWdodFwiLCBAKVxuXG5cblx0XHRcdGlmKGtleWNvZGUgaXMgMTMpXG5cdFx0XHRcdCNzYXZlIGN1cnJlbnQgc2VsZWN0aW9uIHRvIGEgdGVtcCB2YXJpYWJsZSBhcyBpdCBtaWdodCBjaGFuZ2Ugd2hpbGUgdGhlIGV2ZW50cyBhcmUgYmVpbmcgZW1pdHRlZFxuXHRcdFx0XHRhID0gYVxuXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwiY3Jvc3NcIiwgYSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJhXCIsIGEpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwiZW50ZXJcIiwgYSlcblxuXHRcdFx0XHRhLmVtaXQgXCJjcm9zc1wiXG5cdFx0XHRcdGEuZW1pdCBcImFcIlxuXHRcdFx0XHRhLmVtaXQgXCJlbnRlclwiXG5cblxuXG5cdFx0XHRpZihrZXljb2RlIGlzIDgpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwiY2lyY2xlXCIsIGEpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwiYlwiLCBhKVxuXHRcdFx0XHRidWJibGVFdmVudChcImJhY2tcIiwgYSlcblxuXHRcdFx0XHRhLmVtaXQgXCJjaXJjbGVcIlxuXHRcdFx0XHRhLmVtaXQgXCJiXCJcblx0XHRcdFx0YS5lbWl0IFwiYmFja1wiXG5cblxuXHRcdFx0aWYoa2V5Y29kZSBpcyAyNyBvciBrZXljb2RlIGlzIDgwKVxuXHRcdFx0XHRidWJibGVFdmVudChcImhvbWVcIiwgYSlcblx0XHRcdFx0YS5lbWl0IFwiaG9tZVwiXG5cdFx0XHRcdFx0XHRcdFxuXHRAZGVmaW5lICdzZWxlY3RlZEl0ZW0nLFxuXHRcdGdldDogLT5cblx0XHRcdHJldHVybiBALmN1cnJlbnRTZWxlY3Rpb25cblxuXHRcdHNldDogKHZhbHVlKS0+XG5cblx0XHRcdEAubGFzdFNlbGVjdGlvbiA9IEAuY3VycmVudFNlbGVjdGlvblxuXG5cdFx0XHRpZihALmN1cnJlbnRTZWxlY3Rpb24gaXNudCBudWxsIGFuZCBALmN1cnJlbnRTZWxlY3Rpb24gaXNudCB1bmRlZmluZWQpXG5cdFx0XHRcdEAuY3VycmVudFNlbGVjdGlvbi5zZWxlY3RlZCA9IGZhbHNlXG5cdFx0XHRcblx0XHRcdEAuY3VycmVudFNlbGVjdGlvbiA9IHZhbHVlXG5cblx0XHRcdGlmKEAuY3VycmVudFNlbGVjdGlvbiBpc250IG51bGwgYW5kIEAuY3VycmVudFNlbGVjdGlvbiBpc250IHVuZGVmaW5lZClcblx0XHRcdFx0QC5jdXJyZW50U2VsZWN0aW9uLnNlbGVjdGVkID0gdHJ1ZVxuXG5cdFx0XHRcdGJ1YmJsZUJsdXJFdmVudChALmN1cnJlbnRTZWxlY3Rpb24sIEAubGFzdFNlbGVjdGlvbilcblx0XHRcdFx0aWYoQC5sYXN0U2VsZWN0aW9uIGlzbnQgbnVsbClcblx0XHRcdFx0XHRALmxhc3RTZWxlY3Rpb24uZW1pdCBcImJsdXJcIlxuXG5cdFx0XHRcdGJ1YmJsZUZvY3VzRXZlbnQoQC5jdXJyZW50U2VsZWN0aW9uLCBALmxhc3RTZWxlY3Rpb24pIFxuXHRcdFx0XHRpZihALmN1cnJlbnRTZWxlY3Rpb24gaXNudCBudWxsKVxuXHRcdFx0XHRcdEAuY3VycmVudFNlbGVjdGlvbi5lbWl0IFwiZm9jdXNcIlxuXHRcdFx0XG5cdFx0XHRALmVtaXQgXCJjaGFuZ2U6c2VsZWN0aW9uXCIsIEAuY3VycmVudFNlbGVjdGlvblxuXG5cblx0QGRlZmluZSAnbGFzdFNlbGVjdGVkSXRlbScsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0cmV0dXJuIEAubGFzdFNlbGVjdGlvblxuXG5cdEBkZWZpbmUgJ2NvbnRyb2xsZXInLFxuXHRcdGdldDogLT5cblx0XHRcdHJldHVybiBALm9wdGlvbnMuY29udHJvbGxlclxuXHRcdHNldDogKHZhbHVlKS0+XG5cdFx0XHRALm9wdGlvbnMuY29udHJvbGxlciA9IHZhbHVlXG5cblx0QGRlZmluZSAnbGVmdFN0aWNrRHBhZCcsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0cmV0dXJuIEAub3B0aW9ucy5sZWZ0U3RpY2tEcGFkXG5cdFx0c2V0OiAodmFsdWUpLT5cblx0XHRcdEAub3B0aW9ucy5sZWZ0U3RpY2tEcGFkID0gdmFsdWVcblxuXHRAZGVmaW5lICdkZWZhdWx0T25TdGF0ZScsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0cmV0dXJuIEAub3B0aW9ucy5kZWZhdWx0T25TdGF0ZVxuXHRcdHNldDogKHZhbHVlKS0+XG5cdFx0XHRkZWZhdWx0T25TdGF0ZSA9IEAub3B0aW9ucy5kZWZhdWx0T25TdGF0ZSA9IHZhbHVlXG5cdFx0XHRmb3Igc2VsZWN0YWJsZSBpbiBhbGxTZWxlY3RhYmxlc1xuXHRcdFx0XHRzZWxlY3RhYmxlLnN0YXRlcy5kZWZhdWx0T25TdGF0ZSA9IGRlZmF1bHRPblN0YXRlXG5cblx0QGRlZmluZSAnZGVmYXVsdE9mZlN0YXRlJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRyZXR1cm4gQC5vcHRpb25zLmRlZmF1bHRPZmZTdGF0ZVxuXHRcdHNldDogKHZhbHVlKS0+XG5cdFx0XHRkZWZhdWx0T2ZmU3RhdGUgPSBALm9wdGlvbnMuZGVmYXVsdE9mZlN0YXRlID0gdmFsdWVcblx0XHRcdGZvciBzZWxlY3RhYmxlIGluIGFsbFNlbGVjdGFibGVzXG5cdFx0XHRcdHNlbGVjdGFibGUuc3RhdGVzLmRlZmF1bHRPZmZTdGF0ZSA9IGRlZmF1bHRPZmZTdGF0ZVxuXG5cblx0QGRlZmluZSAnZGVmYXVsdFNlbGVjdGlvbkJvcmRlcicsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0cmV0dXJuIEAub3B0aW9ucy5kZWZhdWx0U2VsZWN0aW9uQm9yZGVyXG5cdFx0c2V0OiAodmFsdWUpLT5cblx0XHRcdGRlZmF1bHRTZWxlY3Rpb25Cb3JkZXIgPSBALm9wdGlvbnMuZGVmYXVsdFNlbGVjdGlvbkJvcmRlciA9IHZhbHVlXG5cblx0QGRlZmluZSAnZGVmYXVsdFNlbGVjdGlvbkJvcmRlcldpZHRoJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRyZXR1cm4gQC5vcHRpb25zLmRlZmF1bHRTZWxlY3Rpb25Cb3JkZXJXaWR0aFxuXHRcdHNldDogKHZhbHVlKS0+XG5cdFx0XHRkZWZhdWx0U2VsZWN0aW9uQm9yZGVyV2lkdGggPSBALm9wdGlvbnMuZGVmYXVsdFNlbGVjdGlvbkJvcmRlcldpZHRoID0gdmFsdWVcblx0QGRlZmluZSAnZGVmYXVsdFNlbGVjdGlvbkJvcmRlclJhZGl1cycsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0cmV0dXJuIEAub3B0aW9ucy5kZWZhdWx0U2VsZWN0aW9uQm9yZGVyUmFkaXVzXG5cdFx0c2V0OiAodmFsdWUpLT5cblx0XHRcdGRlZmF1bHRTZWxlY3Rpb25Cb3JkZXJSYWRpdXMgPSBALm9wdGlvbnMuZGVmYXVsdFNlbGVjdGlvbkJvcmRlclJhZGl1cyA9IHZhbHVlXG5cdEBkZWZpbmUgJ2RlZmF1bHRTZWxlY3Rpb25Cb3JkZXJDb2xvcicsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0cmV0dXJuIEAub3B0aW9ucy5kZWZhdWx0U2VsZWN0aW9uQm9yZGVyQ29sb3Jcblx0XHRzZXQ6ICh2YWx1ZSktPlxuXHRcdFx0ZGVmYXVsdFNlbGVjdGlvbkJvcmRlckNvbG9yID0gQC5vcHRpb25zLmRlZmF1bHRTZWxlY3Rpb25Cb3JkZXJDb2xvciA9IHZhbHVlXG5cbmV4cG9ydHMuZm9jdXNNYW5hZ2VyID0gZm9jdXNNYW5hZ2VyXG4iLCJfID0gRnJhbWVyLl9cblxuRnVuY3Rpb246OmRlZmluZSA9IChwcm9wLCBkZXNjKSAtPlxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhpcy5wcm90b3R5cGUsIHByb3AsIGRlc2NcblxuY2xhc3MgR2FtZXBhZFN5c3RlbSBleHRlbmRzIEZyYW1lci5FdmVudEVtaXR0ZXJcblx0Y29uc3RydWN0b3I6IC0+XG5cdFx0QGNvbm5lY3RlZEdhbWVwYWQgPSB1bmRlZmluZWRcblx0XHRAbG9vcFJlcXVlc3QgPSB1bmRlZmluZWRcblx0XHRAcG9sbGluZ0dQID0gdW5kZWZpbmVkXG5cdFx0QGJ1dHRvbnNQcmVzc2VkID0gW11cblx0XHRAYnV0dG9uc1ByZXNzZWRQcmV2ID0gW11cblx0XHQjIFBvbGwgbG9vcCBYIHRpbWVzIGEgc2Vjb25kIGZvciBuZXcgc3RhdGVzXG5cdFx0QGxvb3BJbnRlcnZhbCA9IDUwMFxuXG5cdFx0IyBUaHJlc2hvbGQgZm9yIGFwcHJvdmVkIGF4aXMgdmFsdWVzIC0gVmFsdWVzIGFib3ZlIFggd2lsbCBiZSByZWdpc3RlcmVkIGFzIGFuIGlucHV0XG5cdFx0QGF4aXNTZW5zaXRpdml0eSA9IC4yXG5cblx0XHQjIEFtb3VudCBvZiBidXR0b24gZXZlbnRzIG9jY3VyaW5nIGluIGEgc2VxdWVuY2Vcblx0XHRAZXZlbnRzSW5TZXF1ZW5jZSA9IDBcblxuXHRcdCMgU2hvdWxkIGV2ZW50cyBiZSB0aHJvdHRsZWQ/XG5cdFx0QHRocm90dGxlZCA9IHRydWVcblx0XHRcblx0XHRpZiBuYXZpZ2F0b3IuZ2V0R2FtZXBhZHMoKVswXVxuXHRcdFx0QGNvbm5lY3RlZEdhbWVwYWQgPSBuYXZpZ2F0b3IuZ2V0R2FtZXBhZHMoKVswXVxuXHRcdFx0QGxvb3BSZXF1ZXN0ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSBAZXZlbnRMb29wLmJpbmQoQClcblx0XHRcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAnZ2FtZXBhZGNvbm5lY3RlZCcsIChlKSA9PlxuXHRcdFx0QGNvbm5lY3RlZEdhbWVwYWQgPSBuYXZpZ2F0b3IuZ2V0R2FtZXBhZHMoKVswXVxuXHRcdFx0QGxvb3BSZXF1ZXN0ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSBAZXZlbnRMb29wLmJpbmQoQClcblx0XHRcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAnZ2FtZXBhZGRpc2Nvbm5lY3RlZCcsIChlKSA9PlxuXHRcdFx0QGNvbm5lY3RlZEdhbWVwYWQgPSBudWxsXG5cdFx0XHR3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgQGxvb3BSZXF1ZXN0XG5cblx0QGRlZmluZSAndGhyb3R0bGUnLFxuXHRcdHNldDogKGJvb2wpIC0+XG5cdFx0XHRAdGhyb3R0bGVkID0gYm9vbFxuXG5cdFx0XHRpZiBib29sID09IHRydWVcblx0XHRcdFx0QGF4aXNTZW5zaXRpdml0eSA9IC4yXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBheGlzU2Vuc2l0aXZpdHkgPSAuMlxuXHRcblx0ZXZlbnRMb29wOiAoKSA9PlxuXG5cdFx0c2V0VGltZW91dCAoKSA9PlxuXHRcdFx0XG5cdFx0XHRAcG9sbGluZ0dQID0gbmF2aWdhdG9yLmdldEdhbWVwYWRzKClbMF1cblx0XHRcdGZvciBidXR0b24sIGluZGV4IGluIEBwb2xsaW5nR1AuYnV0dG9uc1xuXHRcdFx0XHRidXR0b24udHlwZSA9ICdidXR0b24nXG5cdFx0XHRcdGJ1dHRvbi5rZXlDb2RlID0gaW5kZXhcblxuXHRcdFx0I3NhdmUgdGhlIGJ1dHRvbiBwcmVzcyhlcykgaW4gdGhlIGxhc3QgZXZlbnRsb29wXG5cdFx0XHRAYnV0dG9uc1ByZXNzZWRQcmV2ID0gQGJ1dHRvbnNQcmVzc2VkXG5cblx0XHRcdEBidXR0b25zUHJlc3NlZCA9IF8uZmlsdGVyIEBwb2xsaW5nR1AuYnV0dG9ucywge3ByZXNzZWQ6IHRydWV9XG5cdFx0XHRmb3IgYXhpcywgaW5kZXggaW4gQHBvbGxpbmdHUC5heGVzXG5cdFx0XHRcdGlmIChpbmRleCA8PSAzKVxuXHRcdFx0XHRcdGFjdGl2ZUF4aXMgPSB7fVxuXG5cdFx0XHRcdFx0aWYgYXhpcyA+IEBheGlzU2Vuc2l0aXZpdHkgfHwgYXhpcyA8IC1AYXhpc1NlbnNpdGl2aXR5XG5cdFx0XHRcdFx0XHRhY3RpdmVBeGlzLnR5cGUgPSAnYXhpcydcblx0XHRcdFx0XHRcdGFjdGl2ZUF4aXMudmFsdWUgPSBheGlzXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRzd2l0Y2ggaW5kZXhcblx0XHRcdFx0XHRcdFx0d2hlbiAwXG5cdFx0XHRcdFx0XHRcdFx0aWYgYXhpcyA+IDBcblx0XHRcdFx0XHRcdFx0XHRcdGFjdGl2ZUF4aXMua2V5Q29kZSA9IDM5XG5cdFx0XHRcdFx0XHRcdFx0XHRAYnV0dG9uc1ByZXNzZWQucHVzaCBhY3RpdmVBeGlzXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdFx0YWN0aXZlQXhpcy5rZXlDb2RlID0gMzdcblx0XHRcdFx0XHRcdFx0XHRcdEBidXR0b25zUHJlc3NlZC5wdXNoIGFjdGl2ZUF4aXNcblx0XHRcdFx0XHRcdFx0d2hlbiAxXG5cdFx0XHRcdFx0XHRcdFx0aWYgYXhpcyA+IDBcblx0XHRcdFx0XHRcdFx0XHRcdGFjdGl2ZUF4aXMua2V5Q29kZSA9IDQwXG5cdFx0XHRcdFx0XHRcdFx0XHRAYnV0dG9uc1ByZXNzZWQucHVzaCBhY3RpdmVBeGlzXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdFx0YWN0aXZlQXhpcy5rZXlDb2RlID0gMzhcblx0XHRcdFx0XHRcdFx0XHRcdEBidXR0b25zUHJlc3NlZC5wdXNoIGFjdGl2ZUF4aXNcblx0XHRcdFx0XHRcdFx0d2hlbiAyXG5cdFx0XHRcdFx0XHRcdFx0aWYgYXhpcyA+IDBcblx0XHRcdFx0XHRcdFx0XHRcdGFjdGl2ZUF4aXMua2V5Q29kZSA9IDQ0XG5cdFx0XHRcdFx0XHRcdFx0XHRAYnV0dG9uc1ByZXNzZWQucHVzaCBhY3RpdmVBeGlzXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdFx0YWN0aXZlQXhpcy5rZXlDb2RlID0gNDJcblx0XHRcdFx0XHRcdFx0XHRcdEBidXR0b25zUHJlc3NlZC5wdXNoIGFjdGl2ZUF4aXNcblx0XHRcdFx0XHRcdFx0d2hlbiAzXG5cdFx0XHRcdFx0XHRcdFx0aWYgYXhpcyA+IDBcblx0XHRcdFx0XHRcdFx0XHRcdGFjdGl2ZUF4aXMua2V5Q29kZSA9IDQzXG5cdFx0XHRcdFx0XHRcdFx0XHRAYnV0dG9uc1ByZXNzZWQucHVzaCBhY3RpdmVBeGlzXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdFx0YWN0aXZlQXhpcy5rZXlDb2RlID0gNDFcblx0XHRcdFx0XHRcdFx0XHRcdEBidXR0b25zUHJlc3NlZC5wdXNoIGFjdGl2ZUF4aXNcblxuXG5cdFx0XHRpZiBAYnV0dG9uc1ByZXNzZWQubGVuZ3RoXG5cblx0XHRcdFx0Zm9yIGJ1dHRvblByZXNzZWQsIGluZGV4IGluIEBidXR0b25zUHJlc3NlZFxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdCNjb21wYXJlIHRoZSBidXR0b24gcHJlc3MoZXMpIGluIHRoZSBjdXJyZW50IGFuZCBsYXN0IGV2ZW50bG9vcFxuXHRcdFx0XHRcdGlmKGJ1dHRvblByZXNzZWQgaW4gQGJ1dHRvbnNQcmVzc2VkUHJldiA9PSBmYWxzZSlcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0I2lmIGEgYnV0dG9uIHByZXNzIGRpZCBub3QgZXhpc3QgaW4gdGhlIGxhc3QgZXZlbnRsb29wIGkuZS4gaXRzIGEgbmV3IGJ1dHRvbiBwcmVzcy4uLlxuXHRcdFx0XHRcdFx0QGVtaXQgJ2dhbWVwYWRrZXlkb3duJywgYnV0dG9uUHJlc3NlZFx0XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0I2lmIGEgYnV0dG9uIHByZXNzIGRpZCBleGlzdCBpbiB0aGUgbGFzdCBldmVudGxvb3AgaS5lLiBpdHMgYSBjb250aW51ZWQgYnV0dG9uIHByZXNzLi4uXG5cdFx0XHRcdFx0XHRAZW1pdCAnZ2FtZXBhZGtleWhlbGQnLCBidXR0b25QcmVzc2VkXG5cblx0XHRcdFx0XHQjaW4gYW55Y2FzZSBjb250aW51ZSB0by4uLlxuXHRcdFx0XHRcdEBlbWl0ICdnYW1lcGFkZXZlbnQnLCBidXR0b25QcmVzc2VkXG5cdFx0XHRcdFx0XG5cblx0XHRcdFx0aWYgQHRocm90dGxlZFxuXHRcdFx0XHRcdHN3aXRjaCBAZXZlbnRzSW5TZXF1ZW5jZVxuXHRcdFx0XHRcdFx0d2hlbiAwXG5cdFx0XHRcdFx0XHRcdEBsb29wSW50ZXJ2YWwgPSAzXG5cdFx0XHRcdFx0XHR3aGVuIDFcblx0XHRcdFx0XHRcdFx0QGxvb3BJbnRlcnZhbCA9IDhcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdEBsb29wSW50ZXJ2YWwgPSAxMDAwXG5cblx0XHRcdFx0QGV2ZW50c0luU2VxdWVuY2UrK1xuXHRcdFx0ZWxzZSBcblx0XHRcdFx0XG5cdFx0XHRcdCNpZiB0aGVyZSBhcmUgbm8gYnV0dG9uIHByZXNzZXMgaW4gdGhlIGN1cnJlbnQgZXZlbnRsb29wLCBzdGlsbCBjaGVjayB0aGUgbGFzdCBldmVudGxvb3AgZm9yIGJ1dHRvbiBwcmVzc2VzXG5cdFx0XHRcdGlmKEBidXR0b25zUHJlc3NlZFByZXYubGVuZ3RoKVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdCMgaWYgdGhlcmUgYXJlIGFueSBidXR0b24gcHJlc3NlcywgbG9vcCB0aHJvdWdoIHRoZW0gYW5kIGVtaXQgZXZlbnQgZm9yIGVhY2hcblx0XHRcdFx0XHRmb3IgYnV0dG9uUHJlc3NlZCwgaW5kZXggaW4gQGJ1dHRvbnNQcmVzc2VkUHJldlxuXHRcdFx0XHRcdFx0QGVtaXQgJ2dhbWVwYWRrZXl1cCcsIGJ1dHRvblByZXNzZWRcdFxuXG5cdFx0XHRcdGlmIEB0aHJvdHRsZWRcblx0XHRcdFx0XHRAZXZlbnRzSW5TZXF1ZW5jZSA9IDBcblx0XHRcdFx0XHRAbG9vcEludGVydmFsID0gNTAwXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRAZXZlbnRzSW5TZXF1ZW5jZSA9IDBcblx0XHRcdFx0XHRAbG9vcEludGVydmFsID0gMTAwMFxuXHRcdFx0XG5cdFx0XHRAbG9vcFJlcXVlc3QgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBldmVudExvb3AuYmluZChAKVxuXHRcdFxuXHRcdCwgMTAwMCAvIEBsb29wSW50ZXJ2YWxcblxuZXhwb3J0cy5HYW1lcGFkID0gbmV3IEdhbWVwYWRTeXN0ZW0oKSIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBR0FBO0FE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
