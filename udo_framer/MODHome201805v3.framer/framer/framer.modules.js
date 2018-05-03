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
var Gamepad, addBorder, allSelectables, bubbleBlurEvent, bubbleEvent, bubbleFocusEvent, defaultOffState, defaultOnState, defaultSelectionBorder, defaultSelectionBorderColor, defaultSelectionBorderWidth, existingLayer, filterSelectablesByDirection, findNearest, focusManager, getCoords, hasCommonAncestor, isVisible, k, layers, len, moveSelection, removeBorder, selectionControllerDefaultOptions,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

allSelectables = [];

defaultSelectionBorder = true;

defaultSelectionBorderWidth = 5;

defaultSelectionBorderColor = "#fff";

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
        if (this.states.off === void 0) {
          this.stateSwitch("defaultOffState");
        } else {
          this.stateSwitch("off");
        }
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
  defaultSelectionBorderColor: "fff"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NoZXJsb2NrL0Ryb3Bib3gvTXlHaXRodWIvTU9EX0ltcHJvdmVudC9GcmFtZXIvTU9EL01PREhvbWUyMDE4MDV2My5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zaGVybG9jay9Ecm9wYm94L015R2l0aHViL01PRF9JbXByb3ZlbnQvRnJhbWVyL01PRC9NT0RIb21lMjAxODA1djMuZnJhbWVyL21vZHVsZXMvZm9jdXNNYW5hZ2VyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NoZXJsb2NrL0Ryb3Bib3gvTXlHaXRodWIvTU9EX0ltcHJvdmVudC9GcmFtZXIvTU9EL01PREhvbWUyMDE4MDV2My5mcmFtZXIvbW9kdWxlcy9HYW1lcGFkLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsIiMgTU9ESUZZIFRIRSBMQVlFUiBDTEFTUyAjXG5cbiNjcmVhdGUgYSBjb250YWluZXIgYXJyYXkgZm9yIGFsbCBzZWxlY3RhYmxlIG9iamVjdHMgXG5hbGxTZWxlY3RhYmxlcyA9IFtdXG5kZWZhdWx0U2VsZWN0aW9uQm9yZGVyID0gdHJ1ZVxuZGVmYXVsdFNlbGVjdGlvbkJvcmRlcldpZHRoID0gNVxuZGVmYXVsdFNlbGVjdGlvbkJvcmRlckNvbG9yID0gXCIjZmZmXCJcbiMgZnVuY3Rpb24gdG8gYWRkIGEgYm9yZGVyIGFyb3VuZCB0aGUgc2VsZWN0ZWQgbGF5ZXJcbmFkZEJvcmRlciA9IChsYXllcikgLT5cblx0aWYgKGxheWVyLmNoaWxkcmVuV2l0aE5hbWUoXCJib3JkZXJcIikubGVuZ3RoIGlzIDApXG5cblx0XHRib3JkZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6XCJib3JkZXJcIlxuXHRcdFx0cGFyZW50OiBsYXllclxuXHRcdFx0c2l6ZTogbGF5ZXJcblx0XHRcdGJvcmRlclJhZGl1czogbGF5ZXIuYm9yZGVyUmFkaXVzXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdG9wYWNpdHk6IDFcblxuXHRcdGlmIChsYXllci5zZWxlY3Rpb25Cb3JkZXJDb2xvciBpcyB1bmRlZmluZWQpXG5cdFx0XHRib3JkZXIuYm9yZGVyQ29sb3IgPSBkZWZhdWx0U2VsZWN0aW9uQm9yZGVyQ29sb3Jcblx0XHRlbHNlXG5cdFx0XHRib3JkZXIuYm9yZGVyQ29sb3IgPSBsYXllci5zZWxlY3Rpb25Cb3JkZXJDb2xvclxuXG5cdFx0aWYgKGxheWVyLnNlbGVjdGlvbkJvcmRlcldpZHRoIGlzIHVuZGVmaW5lZClcblx0XHRcdGJvcmRlci5ib3JkZXJXaWR0aCA9IGRlZmF1bHRTZWxlY3Rpb25Cb3JkZXJXaWR0aFxuXHRcdGVsc2Vcblx0XHRcdGJvcmRlci5ib3JkZXJXaWR0aCA9IGxheWVyLnNlbGVjdGlvbkJvcmRlcldpZHRoXG5cblx0XHQjIGJvcmRlci5hbmltYXRlXG5cdFx0IyBcdFx0b3BhY2l0eTogMVxuXHRcdCMgXHRcdGJvcmRlcldpZHRoOiBsYXllci5zZWxlY3Rpb25Cb3JkZXJXaWR0aFxuXHRcdCMgXHRcdG9wdGlvbnM6XG5cdFx0IyBcdFx0XHR0aW1lOjAuMTVcblxuIyByZW1vdmUgdGhlIGJvcmRlciB3aGVuIGEgbGF5ZXIgaXMgZGVzZWxlY3RlZFxucmVtb3ZlQm9yZGVyID0gKGxheWVyKSAtPlxuXHRhbGxCb3JkZXJzID0gbGF5ZXIuY2hpbGRyZW5XaXRoTmFtZShcImJvcmRlclwiKVxuXHRmb3IgYm9yZGVyIGluIGFsbEJvcmRlcnNcblx0XHQjIGJvcmRlci5hbmltYXRlXG5cdFx0IyBcdG9wYWNpdHk6IDBcblx0XHQjIFx0b3B0aW9uczpcblx0XHQjIFx0XHR0aW1lOjAuMTVcblx0XHQjIGJvcmRlci5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCAtPlxuXHRcdCMgXHR0aGlzLmRlc3Ryb3koKVxuXHRcdGJvcmRlci5kZXN0cm95KClcblx0XG4jaXNTZWxlY3RhYmxlOiBzcGVjaWZpZXMgd2hldGhlciBhIGxheWVyIGlzIGZvY3VzYWJsZSBvciBub3QsIGlmIHllcywgYWRkcyBpdCB0byB0aGUgYWxsU2VsZWN0YWJsZXNbXSBhcnJheVxudHJ5IExheWVyLmRlZmluZSBcImlzU2VsZWN0YWJsZVwiLFxuXHRnZXQ6IC0+IEBfcHJvcGVydGllc1tcImlzU2VsZWN0YWJsZVwiXVxuXHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRAX3Byb3BlcnRpZXNbXCJpc1NlbGVjdGFibGVcIl0gPSB2YWx1ZVxuXHRcdGlmKHZhbHVlIGlzIHRydWUpXG5cdFx0XHRhbGxTZWxlY3RhYmxlcy5wdXNoKEApXG5cdFx0XHRALnN0YXRlcy5kZWZhdWx0T25TdGF0ZSA9IGRlZmF1bHRPblN0YXRlXG5cdFx0XHRALnN0YXRlcy5kZWZhdWx0T2ZmU3RhdGUgPSBkZWZhdWx0T2ZmU3RhdGVcblxuXHRcdFx0aWYoQC5zdGF0ZXMub2ZmIGlzIHVuZGVmaW5lZClcblx0XHRcdFx0QC5zdGF0ZVN3aXRjaChcImRlZmF1bHRPZmZTdGF0ZVwiKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRALnN0YXRlU3dpdGNoKFwib2ZmXCIpXG5cdFx0XHRcblx0XHRpZih2YWx1ZSBpcyBmYWxzZSlcblx0XHRcdGRlbGV0ZSBALnN0YXRlcy5kZWZhdWx0T25TdGF0ZVxuXHRcdFx0ZGVsZXRlIEAuc3RhdGVzLmRlZmF1bHRPZmZTdGF0ZVxuXHRcdFx0I1RPRE86IHJlbW92ZSBsYXllciBmcm9tIGFsbFNlbGVjdGFibGVzIGFycmF5XG5cbnRyeSBMYXllci5kZWZpbmUgXCJzZWxlY3RlZFwiLFxuXHRnZXQ6IC0+IEBfcHJvcGVydGllc1tcInNlbGVjdGVkXCJdXG5cdHNldDogKHZhbHVlKSAtPlxuXHRcdFxuXHRcdEBfcHJvcGVydGllc1tcInNlbGVjdGVkXCJdID0gdmFsdWVcblx0XHRcblx0XHRpZih2YWx1ZSBpcyB0cnVlIGFuZCBAX3Byb3BlcnRpZXNbXCJpc1NlbGVjdGFibGVcIl0gaXMgdHJ1ZSlcblx0XHRcdFxuXHRcdFx0aWYoKGRlZmF1bHRTZWxlY3Rpb25Cb3JkZXIgaXMgdHJ1ZSBhbmQgQF9wcm9wZXJ0aWVzW1wic2VsZWN0aW9uQm9yZGVyXCJdIGlzIHVuZGVmaW5lZCkgb3IgKEBfcHJvcGVydGllc1tcInNlbGVjdGlvbkJvcmRlclwiXSBpcyB0cnVlKSlcblx0XHRcdFx0XHRpZiAoQC5jaGlsZHJlbldpdGhOYW1lKFwiYm9yZGVyXCIpLmxlbmd0aCBpcyAwKVxuXHRcdFx0XHRcdFx0YWRkQm9yZGVyKEApXG5cblx0XHRcdGlmKEAuc3RhdGVzLm9uIGlzIHVuZGVmaW5lZClcblx0XHRcdFx0QC5hbmltYXRlKFwiZGVmYXVsdE9uU3RhdGVcIilcblx0XHRcdGVsc2Vcblx0XHRcdFx0QC5hbmltYXRlKFwib25cIilcblxuXHRcdGlmKHZhbHVlIGlzIGZhbHNlIGFuZCBAX3Byb3BlcnRpZXNbXCJpc1NlbGVjdGFibGVcIl0gaXMgdHJ1ZSlcblx0XHRcdGlmKEAuY2hpbGRyZW5XaXRoTmFtZShcImJvcmRlclwiKS5sZW5ndGgpXG5cdFx0XHRcdHJlbW92ZUJvcmRlcihAKVxuXHRcdFx0aWYoQC5zdGF0ZXMub2ZmIGlzIHVuZGVmaW5lZClcblx0XHRcdFx0QC5hbmltYXRlKFwiZGVmYXVsdE9mZlN0YXRlXCIpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEAuYW5pbWF0ZShcIm9mZlwiKVxuXG4jcHJvcGVydGllcyB0byBtYW51YWxseSBkZWZpbmUgd2hhdCBpcyB0byB0aGUgdXAsIGRvd24sIGxlZnQgYW5kIHJpZ2h0IG9mIGVhY2ggc2VsZWN0YWJsZSBsYXllclxudHJ5IExheWVyLmRlZmluZSBcInVwXCIsXG5cdGdldDogLT4gQF9wcm9wZXJ0aWVzW1widXBcIl1cblx0c2V0OiAodmFsdWUpIC0+XG5cdFx0QF9wcm9wZXJ0aWVzW1widXBcIl0gPSB2YWx1ZVxuXG50cnkgTGF5ZXIuZGVmaW5lIFwiZG93blwiLFxuXHRnZXQ6IC0+IEBfcHJvcGVydGllc1tcImRvd25cIl1cblx0c2V0OiAodmFsdWUpIC0+XG5cdFx0QF9wcm9wZXJ0aWVzW1wiZG93blwiXSA9IHZhbHVlXG5cbnRyeSBMYXllci5kZWZpbmUgXCJsZWZ0XCIsXG5cdGdldDogLT4gQF9wcm9wZXJ0aWVzW1wibGVmdFwiXVxuXHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRAX3Byb3BlcnRpZXNbXCJsZWZ0XCJdID0gdmFsdWVcblxudHJ5IExheWVyLmRlZmluZSBcInJpZ2h0XCIsXG5cdGdldDogLT4gQF9wcm9wZXJ0aWVzW1wicmlnaHRcIl1cblx0c2V0OiAodmFsdWUpIC0+XG5cdFx0QF9wcm9wZXJ0aWVzW1wicmlnaHRcIl0gPSB2YWx1ZVxuXG4jc2VsZWN0aW9uQm9yZGVyOiBzcGVjaWZpZXMgd2hldGhlciBhIHNlbGVjdGVkIGxheWVyIHNob3VsZCBoYXZlIGEgYm9yZGVyIGFyb3VuZCBpdFxudHJ5IExheWVyLmRlZmluZSBcInNlbGVjdGlvbkJvcmRlclwiLFxuXHRnZXQ6IC0+IEBfcHJvcGVydGllc1tcInNlbGVjdGlvbkJvcmRlclwiXVxuXHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRAX3Byb3BlcnRpZXNbXCJzZWxlY3Rpb25Cb3JkZXJcIl0gPSB2YWx1ZVxuXG50cnkgTGF5ZXIuZGVmaW5lIFwic2VsZWN0aW9uQm9yZGVyV2lkdGhcIixcblx0Z2V0OiAtPiBAX3Byb3BlcnRpZXNbXCJzZWxlY3Rpb25Cb3JkZXJXaWR0aFwiXVxuXHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRAX3Byb3BlcnRpZXNbXCJzZWxlY3Rpb25Cb3JkZXJXaWR0aFwiXSA9IHZhbHVlXG5cbnRyeSBMYXllci5kZWZpbmUgXCJzZWxlY3Rpb25Cb3JkZXJDb2xvclwiLFxuXHRnZXQ6IC0+IEBfcHJvcGVydGllc1tcInNlbGVjdGlvbkJvcmRlckNvbG9yXCJdXG5cdHNldDogKHZhbHVlKSAtPlxuXHRcdEBfcHJvcGVydGllc1tcInNlbGVjdGlvbkJvcmRlckNvbG9yXCJdID0gdmFsdWVcblxuI3Byb3BhZ2F0ZUV2ZW50czogc3BlY2lmaWVzIHdoZXRoZXIgdGggZXZlbnRzIGVtaXR0ZWQgYnkgYSBzZWxlY3RhYmxlIGxheWVyIGFyZSBwcm9wYWdhdGVkXG50cnkgTGF5ZXIuZGVmaW5lIFwicHJvcGFnYXRlRXZlbnRzXCIsXG5cdGdldDogLT4gQF9wcm9wZXJ0aWVzW1wicHJvcGFnYXRlRXZlbnRzXCJdXG5cdHNldDogKHZhbHVlKSAtPlxuXHRcdEBfcHJvcGVydGllc1tcInByb3BhZ2F0ZUV2ZW50c1wiXSA9IHZhbHVlXG5cblxubGF5ZXJzID0gRnJhbWVyLkN1cnJlbnRDb250ZXh0Ll9sYXllcnMgXG5cbmZvciBleGlzdGluZ0xheWVyIGluIGxheWVyc1xuXHRleGlzdGluZ0xheWVyLnVwID0gdW5kZWZpbmVkXG5cdGV4aXN0aW5nTGF5ZXIuZG93biA9IHVuZGVmaW5lZFxuXHRleGlzdGluZ0xheWVyLmxlZnQgPSB1bmRlZmluZWRcblx0ZXhpc3RpbmdMYXllci5yaWdodCA9IHVuZGVmaW5lZFxuXHRleGlzdGluZ0xheWVyLnNlbGVjdGlvbkJvcmRlciA9IHVuZGVmaW5lZFxuXHRleGlzdGluZ0xheWVyLnNlbGVjdGlvbkJvcmRlcldpZHRoID0gdW5kZWZpbmVkXG5cdGV4aXN0aW5nTGF5ZXIuc2VsZWN0aW9uQm9yZGVyQ29sb3IgPSB1bmRlZmluZWRcblx0ZXhpc3RpbmdMYXllci5wcm9wYWdhdGVFdmVudHMgPSB0cnVlXG5cdGV4aXN0aW5nTGF5ZXIuaXNTZWxlY3RhYmxlID0gZmFsc2Vcblx0ZXhpc3RpbmdMYXllci5zZWxlY3RlZCA9IGZhbHNlXG5cblxuXG4jYXNzaWduIHRoZSBkZWZhdWx0cyB0byBhbGwgcHJvcGVydGllcyB3aGVuIGEgbGF5ZXIgaXMgY3JlYXRlZFxuRnJhbWVyLkN1cnJlbnRDb250ZXh0Lm9uIFwibGF5ZXI6Y3JlYXRlXCIsIChuZXdMYXllcikgLT5cblx0bmV3TGF5ZXIudXAgPSB1bmRlZmluZWRcblx0bmV3TGF5ZXIuZG93biA9IHVuZGVmaW5lZFxuXHRuZXdMYXllci5sZWZ0ID0gdW5kZWZpbmVkXG5cdG5ld0xheWVyLnJpZ2h0ID0gdW5kZWZpbmVkXG5cdG5ld0xheWVyLnNlbGVjdGlvbkJvcmRlciA9IHVuZGVmaW5lZFxuXHRuZXdMYXllci5zZWxlY3Rpb25Cb3JkZXJXaWR0aCA9IHVuZGVmaW5lZFxuXHRuZXdMYXllci5zZWxlY3Rpb25Cb3JkZXJDb2xvciA9IHVuZGVmaW5lZFxuXHRuZXdMYXllci5wcm9wYWdhdGVFdmVudHMgPSB0cnVlXG5cdG5ld0xheWVyLmlzU2VsZWN0YWJsZSA9IGZhbHNlXG5cdG5ld0xheWVyLnNlbGVjdGVkID0gZmFsc2VcblxuXG4jIyMgRk9DVVMgTUFOQUdFUiBDTEFTUyAjIyNcbntHYW1lcGFkfSA9IHJlcXVpcmUgJ0dhbWVwYWQnXG5cbiNkZWZpbmUgdGhlIGRlZmF1bHQgYXBwZWFyYW5jZSBvZiBzZWxlY3RlZCBpdGVtc1xuZGVmYXVsdE9uU3RhdGUgPSB7XG59XG5cdFxuI2RlZmluZSB0aGUgZGVmYXVsdCBhcHBlYXJhbmNlIG9mIHRoZSBkZXNlbGVjdGVkIGl0ZW1zXG5kZWZhdWx0T2ZmU3RhdGUgPSB7XG59XG5cbiNkZWZhdWx0IG9wdGlvbnMgZm9yIHRoZSBzZWxlY3Rpb25Db250cm9sbGVyXG5zZWxlY3Rpb25Db250cm9sbGVyRGVmYXVsdE9wdGlvbnMgPVxuXHRsZWZ0U3RpY2tEcGFkOiBmYWxzZVxuXHRzZWxlY3RlZEl0ZW0gOiBudWxsXG5cdGNvbnRyb2xsZXI6IFwiUFM0XCJcblx0bGFzdFNlbGVjdGVkSXRlbTogbnVsbFxuXHR3aWR0aDowXG5cdGhlaWdodDowXG5cdGRlZmF1bHRPblN0YXRlOiBkZWZhdWx0T25TdGF0ZVxuXHRkZWZhdWx0T2ZmU3RhdGU6IGRlZmF1bHRPZmZTdGF0ZVxuXHRkZWZhdWx0U2VsZWN0aW9uQm9yZGVyOiB0cnVlXG5cdGRlZmF1bHRTZWxlY3Rpb25Cb3JkZXJXaWR0aDogNVxuXHRkZWZhdWx0U2VsZWN0aW9uQm9yZGVyQ29sb3I6IFwiZmZmXCJcblx0XG5cbiNnZXQgYSBsYXllcidzIGFic29sdXRlIGNvb3JkaW5hdGVzIG9uIHRoZSBzY3JlZW5cbmdldENvb3JkcyA9IChjdXJyZW50U2VsZWN0aW9uLCBwYXJhbSkgLT5cblx0c3dpdGNoIChwYXJhbSlcblx0XHR3aGVuIFwieFwiXG5cdFx0XHRyZXR1cm4gY3VycmVudFNlbGVjdGlvbi5zY3JlZW5GcmFtZS54XG5cdFx0XHRcblx0XHR3aGVuIFwieVwiXG5cdFx0XHRyZXR1cm4gY3VycmVudFNlbGVjdGlvbi5zY3JlZW5GcmFtZS55XG5cdFx0XHRcblx0XHR3aGVuIFwibWlkWFwiXG5cdFx0XHRyZXR1cm4gY3VycmVudFNlbGVjdGlvbi5zY3JlZW5GcmFtZS54ICsgY3VycmVudFNlbGVjdGlvbi5zY3JlZW5GcmFtZS53aWR0aCAvIDJcblx0XHRcdFxuXHRcdHdoZW4gXCJtaW5YXCJcblx0XHRcdHJldHVybiBjdXJyZW50U2VsZWN0aW9uLnNjcmVlbkZyYW1lLnhcblx0XHRcdFxuXHRcdHdoZW4gXCJtYXhYXCJcblx0XHRcdHJldHVybiBjdXJyZW50U2VsZWN0aW9uLnNjcmVlbkZyYW1lLnggKyBjdXJyZW50U2VsZWN0aW9uLnNjcmVlbkZyYW1lLndpZHRoXG5cdFx0XHRcblx0XHR3aGVuIFwibWlkWVwiXG5cdFx0XHRyZXR1cm4gY3VycmVudFNlbGVjdGlvbi5zY3JlZW5GcmFtZS55ICsgY3VycmVudFNlbGVjdGlvbi5zY3JlZW5GcmFtZS5oZWlnaHQgLyAyXG5cdFx0XHRcblx0XHR3aGVuIFwibWluWVwiXG5cdFx0XHRyZXR1cm4gY3VycmVudFNlbGVjdGlvbi5zY3JlZW5GcmFtZS55XG5cdFx0XHRcblx0XHR3aGVuIFwibWF4WVwiXG5cdFx0XHRyZXR1cm4gY3VycmVudFNlbGVjdGlvbi5zY3JlZW5GcmFtZS55ICsgY3VycmVudFNlbGVjdGlvbi5zY3JlZW5GcmFtZS5oZWlnaHRcblxuIyB0aGlzIGlzIHVzZWQgdG8gY2hlY2sgaWYgdGhlIGN1cnJlbnQgYW5kIHRhcmdldCBsYXllcnMgYXJlIGluZmFjdCBvbiB0aGUgc2FtZSBwYWdlIFxuIyB3aGVuIHVzaW5nIHRoZSBuZWFyZXN0IG5laWdoYm9yIGZuLiB3aXRoIGEgZmxvdyBjb21wb25lbnRcbiMgaW5wdXQgYXJyYXlzIGFyZSBhIGxpc3Qgb2YgYWxsIHBhcmVudCBsYXllcnMgb2YgdGhlIGN1cnJlbnQgYW5kIHRhcmdldCBsYXllclxuIyByZXR1cm4gdHJ1ZSBpZiBjdXJyZW50IGFuZCB0YXJnZXQgbGF5ZXJzIGhhdmUgYSBjb21tb24gcGFyZW50IG90aGVyIHRoYW4gYSBmbG93IGNvbXBvbmVudFxuaGFzQ29tbW9uQW5jZXN0b3IgPSAoZWxlbWVudDEsZWxlbWVudDIpIC0+XG5cdGFycjEgPSBlbGVtZW50MS5hbmNlc3RvcnMoKVxuXHRhcnIyID0gZWxlbWVudDIuYW5jZXN0b3JzKClcblx0Zm9yIGkgaW4gWzAuLmFycjEubGVuZ3RoLTFdXG5cdFx0Zm9yIGogaW4gWzAuLmFycjIubGVuZ3RoLTFdXG5cdFx0XHRpZihhcnIxW2ldIGlzIGFycjJbal0gYW5kIGFycjFbaV0uY29uc3RydWN0b3IubmFtZSBpc250IFwiRmxvd0NvbXBvbmVudFwiKVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRyZXR1cm4gZmFsc2VcdFx0XG5cbiMgdGhpcyBpcyB1c2VkIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSB0YXJnZXQgbGF5ZXIgcmV0dXJuZWQgYnkgdGhlIG5lYXJlc3QgbmVpZ2hib3IgZm4uIGlzIGluZmFjdCB2aXNpYmxlXG4jIHNvIHRoYXQgd2UgZG8gbm90IG1vdmUgdGhlIHNlbGVjdGlvbiB0byBhbiBpbnZpc2libGUgbGF5ZXJcbiMgcmV0dXJuIHRydWUgaWYgYW55IGFuY2VzdG9yIG9mIHRoZSBpbnB1dCBsYXllciBpcyBub3QgdmlzaWJsZVxuaXNWaXNpYmxlID0gKGxheWVyKSAtPlxuXHRpZihsYXllci5vcGFjaXR5IGlzIDAgb3IgbGF5ZXIudmlzaWJsZSBpcyBmYWxzZSlcblx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcblx0cGFyZW50TGF5ZXJzID0gbGF5ZXIuYW5jZXN0b3JzKClcblx0Zm9yIGkgaW4gWzAuLnBhcmVudExheWVycy5sZW5ndGgtMV1cblx0XHRpZihwYXJlbnRMYXllcnNbaV0udmlzaWJsZSBpcyBmYWxzZSBvciBwYXJlbnRMYXllcnNbaV0ub3BhY2l0eSBpcyAwIClcblx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdHJldHVybiB0cnVlXHRcdFxuXG4jIHJldHVybiBhbGwgbGF5ZXIgdGhhdCBhcmUgb24gdG9wLCBib3R0b20sIHJpZ2h0IG9yIGxlZnQgb2YgdGhlIGN1cnJlbnQgbGF5ZXIgdG8gY2FsY3VsYXRlIHRoZSBuZWFyZXN0IG5laWdoYm9yXG5maWx0ZXJTZWxlY3RhYmxlc0J5RGlyZWN0aW9uID0gKGN1cnJlbnRTZWxlY3Rpb24sIGRpcmVjdGlvbikgLT5cblx0ZmlsdGVyZWRBcnJheSA9IFtdXG5cdGZvciBzZWxlY3RhYmxlIGluIGFsbFNlbGVjdGFibGVzXG5cdFx0aWYoaGFzQ29tbW9uQW5jZXN0b3Ioc2VsZWN0YWJsZSwgY3VycmVudFNlbGVjdGlvbikgYW5kIGlzVmlzaWJsZShzZWxlY3RhYmxlKSlcblx0XHRcdHN3aXRjaChkaXJlY3Rpb24pXG5cdFx0XHRcdHdoZW4gXCJ1cFwiXG5cdFx0XHRcdFx0aWYoZ2V0Q29vcmRzKHNlbGVjdGFibGUsXCJtYXhZXCIpLTUgPCBnZXRDb29yZHMoY3VycmVudFNlbGVjdGlvbixcIm1pbllcIikrNSlcblx0XHRcdFx0XHRcdGZpbHRlcmVkQXJyYXkucHVzaChzZWxlY3RhYmxlKVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdHdoZW4gXCJkb3duXCJcblx0XHRcdFx0XHRpZihnZXRDb29yZHMoc2VsZWN0YWJsZSxcIm1pbllcIikrNSA+IGdldENvb3JkcyhjdXJyZW50U2VsZWN0aW9uLFwibWF4WVwiKS01KVxuXHRcdFx0XHRcdFx0ZmlsdGVyZWRBcnJheS5wdXNoKHNlbGVjdGFibGUpXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0d2hlbiBcImxlZnRcIlxuXHRcdFx0XHRcdGlmKGdldENvb3JkcyhzZWxlY3RhYmxlLFwibWF4WFwiKS01IDwgZ2V0Q29vcmRzKGN1cnJlbnRTZWxlY3Rpb24sXCJtaW5YXCIpKzUpXG5cdFx0XHRcdFx0XHRmaWx0ZXJlZEFycmF5LnB1c2goc2VsZWN0YWJsZSlcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHR3aGVuIFwicmlnaHRcIlxuXHRcdFx0XHRcdGlmKGdldENvb3JkcyhzZWxlY3RhYmxlLFwibWluWFwiKSs1ID4gZ2V0Q29vcmRzKGN1cnJlbnRTZWxlY3Rpb24sXCJtYXhYXCIpLTUpXG5cdFx0XHRcdFx0XHRmaWx0ZXJlZEFycmF5LnB1c2goc2VsZWN0YWJsZSlcblx0XHRcdFx0XHRcdFxuXHRyZXR1cm4gZmlsdGVyZWRBcnJheVxuXG5cbiMgcmV0dXJuIHRoZSBsYXllciBuZWFyZXN0IHRvIHRoZSBjdXJyZW50IGxheWVyIGluIGEgc3BlY2lmaWVkIGRpcmVjdGlvblxuZmluZE5lYXJlc3QgPSAoY3VycmVudFNlbGVjdGlvbiwgZGlyZWN0aW9uKSAtPlxuXG5cdHN3aXRjaChkaXJlY3Rpb24pXG5cdCNnZXQgdGhlIHgseSBjb29yZGluYXRlcyBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb24gdG8gY2FsY3VsYXRlIGRpc3RhbmNlXG5cdFx0d2hlbiBcInVwXCJcblx0XHRcdHgyID0gZ2V0Q29vcmRzKGN1cnJlbnRTZWxlY3Rpb24sXCJtaWRYXCIpXG5cdFx0XHR5MiA9IGdldENvb3JkcyhjdXJyZW50U2VsZWN0aW9uLFwibWluWVwiKSs1XG5cdFx0XHRcblx0XHR3aGVuIFwiZG93blwiXG5cdFx0XHR4MiA9IGdldENvb3JkcyhjdXJyZW50U2VsZWN0aW9uLFwibWlkWFwiKVxuXHRcdFx0eTIgPSBnZXRDb29yZHMoY3VycmVudFNlbGVjdGlvbixcIm1heFlcIiktNVxuXHRcdFx0XG5cdFx0d2hlbiBcImxlZnRcIlxuXHRcdFx0eDIgPSBnZXRDb29yZHMoY3VycmVudFNlbGVjdGlvbixcIm1pblhcIikrNVxuXHRcdFx0eTIgPSBnZXRDb29yZHMoY3VycmVudFNlbGVjdGlvbixcIm1pZFlcIilcblx0XHRcdFxuXHRcdHdoZW4gXCJyaWdodFwiXG5cdFx0XHR4MiA9IGdldENvb3JkcyhjdXJyZW50U2VsZWN0aW9uLFwibWF4WFwiKS01XG5cdFx0XHR5MiA9IGdldENvb3JkcyhjdXJyZW50U2VsZWN0aW9uLFwibWlkWVwiKVxuXHRcdFx0XG5cdG5lYXJlc3RTZWxlY3RhYmxlICA9IG51bGxcblx0XG5cdGZpbHRlcmVkU2VsZWN0YWJsZXMgPSBmaWx0ZXJTZWxlY3RhYmxlc0J5RGlyZWN0aW9uKGN1cnJlbnRTZWxlY3Rpb24sIGRpcmVjdGlvbilcblx0XG5cdCNTdGFydCB3aXRoIGEgYXJiaXRhcnkgbGFyZ2UgbnVtYmVyIHRvIGNvbXBhcmUgYWxsIG90aGVyIGRpc3RhbmNlcyB0b1xuXHRkaXN0YW5jZVRvTmVhcmVzdCA9IDUwMDBcblxuXHRmb3Igc2VsZWN0YWJsZSBpbiBmaWx0ZXJlZFNlbGVjdGFibGVzXG5cdFxuXHRcdHN3aXRjaChkaXJlY3Rpb24pXG5cdFx0I2dldCB0aGUgeCx5IGNvb3JkaW5hdGVzIG9mIHRoZSB0YXJnZXQgc2VsZWN0aW9uIHRvIGNhbGN1bGF0ZSBkaXN0YW5jZVxuXHRcdFx0d2hlbiBcInVwXCJcblx0XHRcdFx0eDEgPSBnZXRDb29yZHMoc2VsZWN0YWJsZSxcIm1pZFhcIilcblx0XHRcdFx0eTEgPSBnZXRDb29yZHMoc2VsZWN0YWJsZSxcIm1heFlcIiktNVxuXHRcdFx0XHRcblx0XHRcdHdoZW4gXCJkb3duXCJcblx0XHRcdFx0eDEgPSBnZXRDb29yZHMoc2VsZWN0YWJsZSxcIm1pZFhcIilcblx0XHRcdFx0eTEgPSBnZXRDb29yZHMoc2VsZWN0YWJsZSxcIm1pbllcIikrNVxuXHRcdFx0XHRcblx0XHRcdHdoZW4gXCJsZWZ0XCJcblx0XHRcdFx0eDEgPSBnZXRDb29yZHMoc2VsZWN0YWJsZSxcIm1heFhcIiktNVxuXHRcdFx0XHR5MSA9IGdldENvb3JkcyhzZWxlY3RhYmxlLFwibWlkWVwiKVxuXHRcdFx0XHRcblx0XHRcdHdoZW4gXCJyaWdodFwiXG5cdFx0XHRcdHgxID0gZ2V0Q29vcmRzKHNlbGVjdGFibGUsXCJtaW5YXCIpKzVcblx0XHRcdFx0eTEgPSBnZXRDb29yZHMoc2VsZWN0YWJsZSxcIm1pZFlcIilcblx0XHRcblxuXHRcdCNjYWxjdWxhdGUgZGlzdGFuY2Vcblx0XHRkeCA9IHgxIC0geDJcblx0XHRkeSA9IHkxIC0geTJcblx0XHRzZWxlY3RhYmxlRGlzdGFuY2UgPSBNYXRoLnNxcnQgKGR4KmR4ICsgZHkqZHkpXG5cdFx0XG5cdFx0aWYgKHNlbGVjdGFibGVEaXN0YW5jZSA8IGRpc3RhbmNlVG9OZWFyZXN0KVxuXHRcdFx0ZGlzdGFuY2VUb05lYXJlc3QgPSBzZWxlY3RhYmxlRGlzdGFuY2Vcblx0XHRcdG5lYXJlc3RTZWxlY3RhYmxlID0gc2VsZWN0YWJsZVxuXHRcdFx0XG5cdHJldHVybiBuZWFyZXN0U2VsZWN0YWJsZSBcblxuIyBUT0RPOiBNT0FSIEVWRU5UUyEhIVxuIyBHYW1lcGFkLm9uICdnYW1lcGFka2V5dXAnLCAoZXZlbnQpIC0+XG4jIFx0cHJpbnQgXCJrZXkgdXBcIixldmVudFxuIyBcdFxuIyBHYW1lcGFkLm9uICdnYW1lcGFka2V5ZG93bicsIChldmVudCkgLT5cbiMgXHRwcmludCBcImtleSBkb3duXCIsZXZlbnRcbiMgXG4jIEdhbWVwYWQub24gJ2dhbWVwYWRrZXloZWxkJywgKGV2ZW50KSAtPlxuIyBcdHByaW50IFwia2V5IGhlbGRcIixldmVudFxuXG5cbiMgbW92ZSB0aGUgc2VsZWN0aW9uIHRvIHRoZSBuZWFyZXN0IG5laWdoYm9yIGluIGEgc3BlY2lmaWVkIGRpcmVjdGlvblxubW92ZVNlbGVjdGlvbiA9IChkaXJlY3Rpb24sIHRoYXQpID0+XG5cdHN3aXRjaChkaXJlY3Rpb24pXG5cdFx0d2hlbiBcInVwXCJcblx0XHRcdHRhcmdldCA9IHRoYXQuY3VycmVudFNlbGVjdGlvbi51cFxuXHRcdHdoZW4gXCJkb3duXCJcblx0XHRcdHRhcmdldCA9IHRoYXQuY3VycmVudFNlbGVjdGlvbi5kb3duXG5cdFx0d2hlbiBcImxlZnRcIlxuXHRcdFx0dGFyZ2V0ID0gdGhhdC5jdXJyZW50U2VsZWN0aW9uLmxlZnRcblx0XHR3aGVuIFwicmlnaHRcIlxuXHRcdFx0dGFyZ2V0ID0gdGhhdC5jdXJyZW50U2VsZWN0aW9uLnJpZ2h0XG5cblx0aWYodGFyZ2V0IGlzIHVuZGVmaW5lZClcblx0XHR0YXJnZXQgPSBmaW5kTmVhcmVzdCh0aGF0LmN1cnJlbnRTZWxlY3Rpb24sIGRpcmVjdGlvbilcblx0XHRcblx0aWYodGFyZ2V0IGlzIG51bGwpXG5cdFx0cmV0dXJuXG5cblx0XG5cdHRoYXQubGFzdFNlbGVjdGlvbiA9IHRoYXQuY3VycmVudFNlbGVjdGlvblxuXHR0aGF0LmN1cnJlbnRTZWxlY3Rpb24uc2VsZWN0ZWQgPSBmYWxzZVxuXHRcblx0dGhhdC5jdXJyZW50U2VsZWN0aW9uID0gdGFyZ2V0XG5cdHRoYXQuY3VycmVudFNlbGVjdGlvbi5zZWxlY3RlZCA9IHRydWVcdFxuXG5cdGJ1YmJsZUJsdXJFdmVudCh0aGF0LmN1cnJlbnRTZWxlY3Rpb24sIHRoYXQubGFzdFNlbGVjdGlvbikgXHRcblx0dGhhdC5sYXN0U2VsZWN0aW9uLmVtaXQgXCJibHVyXCJcblxuXHRidWJibGVGb2N1c0V2ZW50KHRoYXQuY3VycmVudFNlbGVjdGlvbiwgdGhhdC5sYXN0U2VsZWN0aW9uKSBcdFxuXHR0aGF0LmN1cnJlbnRTZWxlY3Rpb24uZW1pdCBcImZvY3VzXCJcblxuXHR0aGF0LmVtaXQgXCJjaGFuZ2U6c2VsZWN0aW9uXCJcblxuXG4jIGJ1YmJsZXMgdGhlIGZvY3VzIGV2ZW50cyBmcm9tIGN1cnJlbnQgbGF5ZXIgYWxsIHRoZSB3YXkgdG8gdGhlIHRvcFxuIyBub3RlOiBtYWtlIHN1cmUgdGhhdCBjdXJyZW50IHNlbGVjdGlvbiBhbmQgbGFzdCBzZWxlY3Rpb24gYXJlIHVwZGF0ZWQgQkVGT1JFIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkISEhXG5idWJibGVGb2N1c0V2ZW50ID0gKGN1cnJlbnRTZWxlY3Rpb24sIGxhc3RTZWxlY3Rpb24pID0+XG5cdFxuXHRpZihjdXJyZW50U2VsZWN0aW9uIGlzIG51bGwpXG5cdFx0cmV0dXJuXG5cblx0aWYoY3VycmVudFNlbGVjdGlvbi5wcm9wYWdhdGVFdmVudHMgaXMgZmFsc2UpXG5cdFx0cmV0dXJuXG5cdFxuXHRcblx0IyBmb2N1cyBldmVudCBpcyBhbHdheXMgY2FsbGVkICBmcm9tIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuXHRwYXJlbnRFbGVtZW50cyA9IGN1cnJlbnRTZWxlY3Rpb24uYW5jZXN0b3JzKClcblx0b3JpZ2luYXRpbmdMYXllciA9IGN1cnJlbnRTZWxlY3Rpb25cblx0XG5cdGZvciBlbGVtZW50IGluIHBhcmVudEVsZW1lbnRzXG5cdFx0I2VtaXQgdGhlIGV2ZW50IG5vcm1hbGx5IGlmIHRoZSBwYXJlbnQgZWxlbWVudCBpcyBOT1QgYSBmbG93IGNvbXBvbmVudDpcblx0XHRpZihlbGVtZW50LmNvbnN0cnVjdG9yLm5hbWUgaXNudCBcIkZsb3dDb21wb25lbnRcIilcblx0XHRcdGVsZW1lbnQuZW1pdCBcImZvY3VzXCIsIG9yaWdpbmF0aW5nTGF5ZXJcblx0XHRlbHNlXG5cdFx0I2lmIGl0IElTIGEgZmxvdyBjb21wb25lbnQ6XG5cdFx0XHQjIFRoZSB1c2VyIGludGVudCBiZWhpbmQgbGlzdGVuaW5nIHRvIHRoZSBibHVyIC8gZm9jdXMgZXZlbnRzIG9uIGEgZmxvdyBjb21wb25lbnQgaXMgdG8gc2VlIGlmIHRoZSBzZWxlY3Rpb24gaGFzIG1vdmVkIGluIC8gb3V0IG9mIHRoZSBmbG93IGNvbXBvbmVudFxuXHRcdFx0IyB0aGVyZWZvcmUsIHRoZSBibHVyIC8gZm9jdXMgZXZlbnRzIGFyZSBzdXByZXNzZWQgZm9yIGEgZmxvdyBjb21wb25lbnQgaWYgYm90aCB0aGUgY3VycmVudCBhbmQgbGFzdCBzZWxlY3Rpb24gYXJlIGluc2lkZSB0aGUgc2FtZSBmbG93IGNvbXBvbmVudFxuXHRcdFx0XG5cdFx0XHQjc3RlcCAxOiBnZXQgdGhlIGN1cnJlbnQgZWxlbWVudCdzIGRlc2NlbmRhbnRzXG5cdFx0XHRjaGlsZHJlbiA9IGVsZW1lbnQuZGVzY2VuZGFudHNcblx0XHRcdFxuXHRcdFx0I3N0ZXAgMjogc2VhcmNoIGZvciB0aGUgY3VycmVudCBhbmQgbGFzdCBzZWxlY3Rpb24gaW4gdGhlIGRlc2NlbmRhbnQgdHJlZVxuXHRcdFx0Y3VycmVudFNlbGVjdGlvbklzQ2hpbGQgPSBmYWxzZVxuXHRcdFx0bGFzdFNlbGVjdGlvbklzQ2hpbGQgPSBmYWxzZVxuXHRcdFx0Zm9yIGkgaW4gWzAuLmNoaWxkcmVuLmxlbmd0aC0xXVxuXHRcdFx0XHRpZihjaGlsZHJlbltpXSBpcyBjdXJyZW50U2VsZWN0aW9uKVxuXHRcdFx0XHRcdGN1cnJlbnRTZWxlY3Rpb25Jc0NoaWxkID0gdHJ1ZVxuXG5cdFx0XHRcdGlmKGNoaWxkcmVuW2ldIGlzIGxhc3RTZWxlY3Rpb24pXG5cdFx0XHRcdFx0bGFzdFNlbGVjdGlvbklzQ2hpbGQgPSB0cnVlXG5cdFx0XHRcblx0XHRcdCNzdGVwIDM6IGVtaXQgZm9jdXMgZXZlbnQgb25seSBpZiB0aGUgc2VsZWN0aW9uIGhhcyBtb3ZlZCBpbiB0byB0aGUgZmxvdyBjb21wb25lbnRcblx0XHRcdGlmKGxhc3RTZWxlY3Rpb25Jc0NoaWxkIGlzIGZhbHNlIGFuZCBjdXJyZW50U2VsZWN0aW9uSXNDaGlsZCBpcyB0cnVlKSBcdFxuXHRcdFx0XHRcdGVsZW1lbnQuZW1pdCBcImZvY3VzXCIsIG9yaWdpbmF0aW5nTGF5ZXJcblx0XHRcdFx0XHRcblx0I2VtaXQgZXZlbnRzIG9uIHdpbmRvdy5kb2N1bWVudFxuXHRldmVudCA9IG5ldyBDdXN0b21FdmVudChcImZvY3VzXCIsIHtkZXRhaWw6IG9yaWdpbmF0aW5nTGF5ZXIgfSlcdFxuXHR3aW5kb3cuZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudClcblxuXG5cbiMgYnViYmxlcyB0aGUgYmx1ciBldmVudHMgZnJvbSBjdXJyZW50IGxheWVyIGFsbCB0aGUgd2F5IHRvIHRoZSB0b3BcbiMgbm90ZTogbWFrZSBzdXJlIHRoYXQgY3VycmVudCBzZWxlY3Rpb24gYW5kIGxhc3Qgc2VsZWN0aW9uIGFyZSB1cGRhdGVkIEJFRk9SRSB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCEhIVxuYnViYmxlQmx1ckV2ZW50ID0gKGN1cnJlbnRTZWxlY3Rpb24sIGxhc3RTZWxlY3Rpb24pID0+XG5cblx0aWYobGFzdFNlbGVjdGlvbiBpcyBudWxsKVxuXHRcdHJldHVyblxuXG5cdGlmKGxhc3RTZWxlY3Rpb24ucHJvcGFnYXRlRXZlbnRzIGlzIGZhbHNlKVxuXHRcdHJldHVyblxuXG5cdCNlbWl0IGV2ZW50cyBvbiBwYXJlbnQgbGF5ZXJzXG5cdFxuXHQjIGJsdXIgZXZlbnQgaXMgYWx3YXlzIGNhbGxlZCBvbiB0aGUgbGFzdCBzZWxlY3Rpb25cblx0cGFyZW50RWxlbWVudHMgPSBsYXN0U2VsZWN0aW9uLmFuY2VzdG9ycygpXG5cdG9yaWdpbmF0aW5nTGF5ZXIgPSBsYXN0U2VsZWN0aW9uXG5cblx0Zm9yIGVsZW1lbnQgaW4gcGFyZW50RWxlbWVudHNcblx0XHQjZW1pdCB0aGUgZXZlbnQgbm9ybWFsbHkgaWYgdGhlIHBhcmVudCBlbGVtZW50IGlzIE5PVCBhIGZsb3cgY29tcG9uZW50OlxuXHRcdGlmKGVsZW1lbnQuY29uc3RydWN0b3IubmFtZSBpc250IFwiRmxvd0NvbXBvbmVudFwiKVxuXHRcdFx0ZWxlbWVudC5lbWl0IFwiYmx1clwiLCBvcmlnaW5hdGluZ0xheWVyXG5cdFx0ZWxzZVxuXHRcdCNpZiBpdCBJUyBhIGZsb3cgY29tcG9uZW50OlxuXG5cdFx0XHQjIFRoZSB1c2VyIGludGVudCBiZWhpbmQgbGlzdGVuaW5nIHRvIHRoZSBibHVyIC8gZm9jdXMgZXZlbnRzIG9uIGEgZmxvdyBjb21wb25lbnQgaXMgdG8gc2VlIGlmIHRoZSBzZWxlY3Rpb24gaGFzIG1vdmVkIGluIC8gb3V0IG9mIHRoZSBmbG93IGNvbXBvbmVudFxuXHRcdFx0IyB0aGVyZWZvcmUsIHRoZSBibHVyIC8gZm9jdXMgZXZlbnRzIGFyZSBzdXByZXNzZWQgZm9yIGEgZmxvdyBjb21wb25lbnQgaWYgYm90aCB0aGUgY3VycmVudCBhbmQgbGFzdCBzZWxlY3Rpb24gYXJlIGluc2lkZSB0aGUgc2FtZSBmbG93IGNvbXBvbmVudFxuXHRcdFx0XG5cdFx0XHQjc3RlcCAxOiBnZXQgdGhlIGN1cnJlbnQgZWxlbWVudCdzIGRlc2NlbmRhbnRzXG5cdFx0XHRjaGlsZHJlbiA9IGVsZW1lbnQuZGVzY2VuZGFudHNcblx0XHRcdFxuXHRcdFx0I3N0ZXAgMjogc2VhcmNoIGZvciB0aGUgY3VycmVudCBhbmQgbGFzdCBzZWxlY3Rpb24gaW4gdGhlIGZsb3cgY29tcG9uZW50J3MgZGVzY2VuZGFudHNcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb25Jc0FDaGlsZCA9IGZhbHNlXG5cdFx0XHRsYXN0U2VsZWN0aW9uSXNBQ2hpbGQgPSBmYWxzZVxuXHRcdFx0Zm9yIGkgaW4gWzAuLmNoaWxkcmVuLmxlbmd0aC0xXVxuXHRcdFx0XHRpZihjaGlsZHJlbltpXSBpcyBjdXJyZW50U2VsZWN0aW9uKVxuXHRcdFx0XHRcdGN1cnJlbnRTZWxlY3Rpb25Jc0FDaGlsZCA9IHRydWVcblxuXHRcdFx0XHRpZihjaGlsZHJlbltpXSBpcyBsYXN0U2VsZWN0aW9uKVxuXHRcdFx0XHRcdGxhc3RTZWxlY3Rpb25Jc0FDaGlsZCA9IHRydWVcblxuXHRcdFx0I3N0ZXAgMzogZW1pdCBibHVyIGV2ZW50IG9ubHkgaWYgdGhlIHNlbGVjdGlvbiBoYXMgbW92ZWQgb3V0IG9mIHRoZSBmbG93IGNvbXBvbmVudCwgaS5lLiBsYXN0IHNlbGVjdGlvbiBpcyBhIGNoaWxkIGFuZCB0aGUgY3VycmVudCBzZWxlY3Rpb24gaXNudFxuXHRcdFx0aWYobGFzdFNlbGVjdGlvbklzQUNoaWxkIGlzIHRydWUgYW5kIGN1cnJlbnRTZWxlY3Rpb25Jc0FDaGlsZCBpcyBmYWxzZSkgXHRcblx0XHRcdFx0XHRlbGVtZW50LmVtaXQgXCJibHVyXCIsIG9yaWdpbmF0aW5nTGF5ZXJcblxuXHQjZW1pdCBldmVudHMgb24gd2luZG93LmRvY3VtZW50XG5cdGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiYmx1clwiLCB7ZGV0YWlsOiBvcmlnaW5hdGluZ0xheWVyIH0pXHRcblx0d2luZG93LmRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpXG5cdFx0XG5cbiMgYnViYmxlcyBhbGwgb3RoZXIgZXZlbnRzIGZyb20gY3VycmVudCBsYXllciBhbGwgdGhlIHdheSB0byB0aGUgdG9wXG5idWJibGVFdmVudCA9IChidWJibGVkRXZlbnQsIG9yaWdpbmF0aW5nTGF5ZXIpID0+XG5cdFxuXHRpZihvcmlnaW5hdGluZ0xheWVyLnByb3BhZ2F0ZUV2ZW50cyBpcyBmYWxzZSlcblx0XHRyZXR1cm5cblxuXHQjZW1pdCBidXR0b24gcHJlc3MgZXZlbnQgb24gY3VycmVudCBsYXllclxuXHRvcmlnaW5hdGluZ0xheWVyLmVtaXQgXCJidXR0b25QcmVzc1wiLCBidWJibGVkRXZlbnRcblxuXHQjZW1pdCBldmVudCBvbiBwYXJlbnQgbGF5ZXJzXG5cdHBhcmVudEVsZW1lbnRzID0gb3JpZ2luYXRpbmdMYXllci5hbmNlc3RvcnMoKVxuXHRmb3IgZWxlbWVudCBpbiBwYXJlbnRFbGVtZW50c1xuXHRcdGVsZW1lbnQuZW1pdCBidWJibGVkRXZlbnQsIG9yaWdpbmF0aW5nTGF5ZXJcblx0XHRlbGVtZW50LmVtaXQgXCJidXR0b25QcmVzc1wiLCBidWJibGVkRXZlbnQsIG9yaWdpbmF0aW5nTGF5ZXJcblx0XHRcdFxuXHQjZW1pdCBldmVudHMgb24gd2luZG93LmRvY3VtZW50XG5cdGV2ZW50MSA9IG5ldyBDdXN0b21FdmVudChidWJibGVkRXZlbnQsIHtkZXRhaWw6IG9yaWdpbmF0aW5nTGF5ZXIgfSlcdFxuXHR3aW5kb3cuZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudDEpXG5cdFxuXHRldmVudDIgPSBuZXcgQ3VzdG9tRXZlbnQoXCJidXR0b25QcmVzc1wiLCB7XG5cdFx0ZGV0YWlsOiB7XG5cdFx0XHRrZXk6IGJ1YmJsZWRFdmVudFxuXHRcdFx0bGF5ZXI6IG9yaWdpbmF0aW5nTGF5ZXJcblx0XHRcdH1cblx0XHR9KTtcblx0d2luZG93LmRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQyKVxuXHRcblxuXHRcbiNmb2N1cyBtYW5hZ2VyIGNsYXNzIHRvIHRyYWNrIHRoZSBzZWxlY3Rpb24gYXJvdW5kIHRoZSBzY3JlZW5cbmNsYXNzIGZvY3VzTWFuYWdlciBleHRlbmRzIExheWVyXG5cdEAuY3VycmVudFNlbGVjdGlvbiA9IG51bGxcblx0QC5sYXN0U2VsZWN0aW9uID0gbnVsbFxuXHRALmtleWNvZGVzID0ge31cblx0Y29uc3RydWN0b3I6ICggb3B0aW9ucz17fSApIC0+XG5cdFx0QC5vcHRpb25zID0gXy5kZWZhdWx0cyBvcHRpb25zLCBzZWxlY3Rpb25Db250cm9sbGVyRGVmYXVsdE9wdGlvbnNcblx0XHRALmN1cnJlbnRTZWxlY3Rpb24gPSBALm9wdGlvbnMuc2VsZWN0ZWRJdGVtXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdGlmKEAub3B0aW9ucy5jb250cm9sbGVyIGlzIFwiUFM0XCIpXG5cdFx0XHRrZXljb2Rlcz17XG5cblx0XHRcdFx0c3F1YXJlIFx0XHQ6XHRcdDBcblx0XHRcdFx0Y3Jvc3NcdFx0Olx0XHQxXG5cdFx0XHRcdGNpcmNsZSBcdFx0Olx0XHQyXG5cdFx0XHRcdHRyaWFuZ2xlIFx0Olx0XHQzXG5cdFx0XHRcdFxuXHRcdFx0XHRsMSBcdFx0XHQ6XHRcdDRcblx0XHRcdFx0cjEgXHRcdFx0Olx0XHQ1XG5cblx0XHRcdFx0cjIgXHRcdFx0Olx0XHQ2XG5cdFx0XHRcdGwyIFx0XHRcdDpcdFx0N1x0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0XHRsM3ByZXNzIFx0Olx0XHQxMFxuXHRcdFx0XHRyM3ByZXNzIFx0Olx0XHQxMVxuXG5cdFx0XHRcdGhvbWUgXHRcdDpcdFx0MTJcblx0XHRcdFx0dG91Y2hwYWQgXHQ6XHRcdDEzXG5cblx0XHRcdFx0dXAgXHRcdFx0Olx0XHQxNFxuXHRcdFx0XHRkb3duIFx0XHQ6XHRcdDE1XG5cdFx0XHRcdGxlZnQgXHRcdDpcdFx0MTZcblx0XHRcdFx0cmlnaHQgXHRcdDpcdFx0MTdcblxuXG5cdFx0XHRcdGwzTGVmdCBcdFx0Olx0XHQzN1xuXHRcdFx0XHRsM1VwIFx0XHQ6XHRcdDM4XG5cdFx0XHRcdGwzUmlnaHQgXHQ6XHRcdDM5XG5cdFx0XHRcdGwzRG93biBcdFx0Olx0XHQ0MFxuXHRcdFx0XHRcblx0XHRcdFx0cjNVcCBcdFx0Olx0XHQ0MVxuXHRcdFx0XHRyM0xlZnQgXHRcdDpcdFx0NDJcdFx0XHRcdFxuXHRcdFx0XHRyM0Rvd24gXHRcdDpcdFx0NDNcblx0XHRcdFx0cjNSaWdodCBcdDpcdFx0NDRcblxuXHRcdFx0fVxuXG5cblx0XHRpZihALm9wdGlvbnMuY29udHJvbGxlciBpcyBcIlhCMVwiKVxuXHRcdFx0a2V5Y29kZXM9e1xuXG5cdFx0XHRcdGFcdFx0XHQ6XHRcdDBcblx0XHRcdFx0YiBcdFx0XHQ6XHRcdDFcblx0XHRcdFx0eCBcdFx0XHQ6XHRcdDJcblx0XHRcdFx0eSBcdFx0XHQ6XHRcdDNcblx0XHRcdFx0XG5cdFx0XHRcdGxiXHRcdFx0Olx0XHQ0XHRcblx0XHRcdFx0cmJcdFx0XHQ6XHRcdDVcdFxuXHRcdFx0XHRcblx0XHRcdFx0bGpQcmVzcyBcdDpcdFx0NlxuXHRcdFx0XHRyalByZXNzIFx0Olx0XHQ3XG5cblx0XHRcdFx0c3RhcnQgXHRcdDpcdFx0OFxuXHRcdFx0XHRzZWxlY3QgXHRcdDpcdFx0OVxuXHRcdFx0XHRob21lIFx0XHQ6XHRcdDEwXG5cblxuXHRcdFx0XHRydFx0XHRcdDpcdFx0MTVcdCMgdW5jb25maXJtZWRcblx0XHRcdFx0bHQgXHRcdFx0Olx0XHQxNlx0IyB1bmNvbmZpcm1lZFx0XHRcblxuXHRcdFx0XHR1cCBcdFx0XHQ6XHRcdDExXG5cdFx0XHRcdGRvd24gXHRcdDpcdFx0MTJcblx0XHRcdFx0bGVmdCBcdFx0Olx0XHQxM1xuXHRcdFx0XHRyaWdodCBcdFx0Olx0XHQxNFxuXG5cdFx0XHRcdGxqTGVmdCBcdFx0Olx0XHQzN1xuXHRcdFx0XHRsalVwIFx0XHQ6XHRcdDM4XG5cdFx0XHRcdGxqUmlnaHQgXHQ6XHRcdDM5XG5cdFx0XHRcdGxqRG93biBcdFx0Olx0XHQ0MFxuXHRcdFx0XHRcblx0XHRcdFx0cmpVcCBcdFx0Olx0XHQ0MVxuXHRcdFx0XHRyakxlZnQgXHRcdDpcdFx0NDJcdFx0XHRcdFxuXHRcdFx0XHRyakRvd24gXHRcdDpcdFx0NDNcblx0XHRcdFx0cmpSaWdodCBcdDpcdFx0NDRcblxuXG5cdFx0XHR9XG5cblx0XHQjY3JlYXRlIGV2ZW50IGxpc3RlbmVyIGZvciBnYW1lcGFkIGtleSBwcmVzc2VzIGFuZCBlbWl0IGNvcnJlc3BvbmRpbmcgZXZlbnRzXG5cdFx0R2FtZXBhZC5vbiAnZ2FtZXBhZGV2ZW50JywgVXRpbHMudGhyb3R0bGUgMC4yNSwgKGV2ZW50KSA9PlxuXG5cdFx0XHRpZihALmN1cnJlbnRTZWxlY3Rpb24gaXMgbnVsbClcblx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdGtleWNvZGUgPSBldmVudC5rZXlDb2RlXG5cdFx0XHRcblx0XHRcdCNzYXZlIGN1cnJlbnQgc2VsZWN0aW9uIHRvIGEgdGVtcCB2YXJpYWJsZSBhcyBpdCBtaWdodCBjaGFuZ2Ugd2hpbGUgdGhlIGV2ZW50cyBhcmUgc3RpbGwgYmVpbmcgZW1pdHRlZFxuXHRcdFx0YSA9IEAuY3VycmVudFNlbGVjdGlvblxuXG5cdFx0XHRpZihrZXljb2RlIGlzIGtleWNvZGVzLnVwKVxuXHRcdFx0XHRidWJibGVFdmVudChcInVwXCIsIGEpXHRcdFx0XHRcblx0XHRcdFx0YS5lbWl0IFwidXBcIlxuXHRcdFx0XHRtb3ZlU2VsZWN0aW9uKFwidXBcIiwgQClcblx0XHRcdFx0XHRcdFxuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5kb3duKVxuXHRcdFx0XHRidWJibGVFdmVudChcImRvd25cIiwgYSlcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdGEuZW1pdCBcImRvd25cIlxuXHRcdFx0XHRtb3ZlU2VsZWN0aW9uKFwiZG93blwiLCBAKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0I2xlZnQgYXJyb3dcblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMubGVmdClcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJsZWZ0XCIsIGEpXHRcdFx0XHRcblx0XHRcdFx0YS5lbWl0IFwibGVmdFwiXG5cdFx0XHRcdG1vdmVTZWxlY3Rpb24oXCJsZWZ0XCIsIEApXG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0I3JpZ2h0IGFycm93XG5cdFx0XHRpZihrZXljb2RlIGlzIGtleWNvZGVzLnJpZ2h0KVxuXHRcdFx0XHRidWJibGVFdmVudChcInJpZ2h0XCIsIGEpXG5cdFx0XHRcdGEuZW1pdCBcInJpZ2h0XCJcblx0XHRcdFx0bW92ZVNlbGVjdGlvbihcInJpZ2h0XCIsIEApXG5cblx0XHRcdCNjcm9zcyAvIEEgYnV0dG9uXG5cdFx0XHRpZihrZXljb2RlIGlzIGtleWNvZGVzLmNyb3NzIG9yIGtleWNvZGUgaXMga2V5Y29kZXMuYSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJhXCIsIGEpXHRcdFx0XHRcdFxuXHRcdFx0XHRidWJibGVFdmVudChcImNyb3NzXCIsIGEpXG5cblx0XHRcdFx0YS5lbWl0IFwiYVwiXG5cdFx0XHRcdGEuZW1pdCBcImNyb3NzXCJcblx0XHRcdFx0XG5cdFx0XHQjY2lyY2xlIC8gQiBidXR0b25cblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMuY2lyY2xlIG9yIGtleWNvZGUgaXMga2V5Y29kZXMuYilcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJiXCIsIGEpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwiY2lyY2xlXCIsIGEpXG5cdFx0XHRcdFxuXHRcdFx0XHRhLmVtaXQgXCJiXCJcblx0XHRcdFx0YS5lbWl0IFwiY2lyY2xlXCJcblx0XHRcdFx0XG5cdFx0XHQjc3F1YXJlIC8gWCBidXR0b25cblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMuc3F1YXJlIG9yIGtleWNvZGUgaXMga2V5Y29kZXMueClcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJ4XCIsIGEpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwic3F1YXJlXCIsIGEpXG5cdFx0XHRcdFxuXHRcdFx0XHRhLmVtaXQgXCJ4XCJcblx0XHRcdFx0YS5lbWl0IFwic3F1YXJlXCJcblxuXHRcdFx0I3RyaWFuZ2xlIC8gWSBidXR0b25cblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMudHJpYW5nbGUgb3Iga2V5Y29kZSBpcyBrZXljb2Rlcy55KVxuXHRcdFx0XHRidWJibGVFdmVudChcInlcIiwgYSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJ0cmlhbmdsZVwiLCBhKVxuXHRcdFx0XHRcblx0XHRcdFx0YS5lbWl0IFwieVwiXG5cdFx0XHRcdGEuZW1pdCBcInRyaWFuZ2xlXCJcblx0XHRcdFx0XG5cdFx0XHQjTDEgLyBsZWZ0IGJ1bXBlciBidXR0b25cblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMubDEgb3Iga2V5Y29kZSBpcyBrZXljb2Rlcy5sYilcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJsYlwiLCBhKVxuXHRcdFx0XHRidWJibGVFdmVudChcImwxXCIsIGEpXG5cblx0XHRcdFx0YS5lbWl0IFwibGJcIlxuXHRcdFx0XHRhLmVtaXQgXCJsMVwiXG5cblx0XHRcdCNSMSAvIHJpZ2h0IGJ1bXBlciBidXR0b25cblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMucjEgb3Iga2V5Y29kZSBpcyBrZXljb2Rlcy5yYilcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJyYlwiLCBhKVxuXHRcdFx0XHRidWJibGVFdmVudChcInIxXCIsIGEpXG5cblx0XHRcdFx0YS5lbWl0IFwicmJcIlxuXHRcdFx0XHRhLmVtaXQgXCJyMVwiXG5cblx0XHRcdCNSMiAvIHJpZ2h0IHRyaWdnZXIgYnV0dG9uXG5cdFx0XHRpZihrZXljb2RlIGlzIGtleWNvZGVzLnIyIG9yIGtleWNvZGUgaXMga2V5Y29kZXMucnQpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwicnRcIiwgYSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJyMlwiLCBhKVxuXG5cdFx0XHRcdGEuZW1pdCBcInJ0XCJcblx0XHRcdFx0YS5lbWl0IFwicjJcIlxuXG5cdFx0XHRcdFxuXHRcdFx0I0wyIC8gbGVmdCB0cmlnZ2VyIGJ1dHRvblxuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5sMiBvciBrZXljb2RlIGlzIGtleWNvZGVzLmx0KVxuXHRcdFx0XHRidWJibGVFdmVudChcImx0XCIsIGEpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwibDJcIiwgYSlcblx0XHRcdFx0XG5cdFx0XHRcdGEuZW1pdCBcImx0XCJcblx0XHRcdFx0YS5lbWl0IFwibDJcIlxuXHRcdFx0XHRcblxuXG5cdFx0XHQjbGVmdCBqb3lzdGljayBkaXJlY3Rpb25cblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMubDNMZWZ0IG9yIGtleWNvZGUgaXMga2V5Y29kZXMubGpMZWZ0KVxuXHRcdFx0XHRpZihALm9wdGlvbnMubGVmdFN0aWNrRHBhZCkgXG5cdFx0XHRcdFx0YnViYmxlRXZlbnQoXCJsZWZ0XCIsIGEpXG5cdFx0XHRcdFx0YS5lbWl0IFwibGVmdFwiXG5cdFx0XHRcdFx0bW92ZVNlbGVjdGlvbihcImxlZnRcIiwgQClcblx0XHRcdFx0XG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwibGpMZWZ0XCIsIGEpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwibDNMZWZ0XCIsIGEpXG5cblx0XHRcdFx0YS5lbWl0IFwibGpMZWZ0XCJcblx0XHRcdFx0YS5lbWl0IFwibDNMZWZ0XCJcblx0XHRcdFx0XG5cdFx0XHRcdFxuXG5cdFx0XHRpZihrZXljb2RlIGlzIGtleWNvZGVzLmwzVXAgb3Iga2V5Y29kZSBpcyBrZXljb2Rlcy5salVwKVxuXHRcdFx0XHRpZihALm9wdGlvbnMubGVmdFN0aWNrRHBhZCkgXG5cdFx0XHRcdFx0YnViYmxlRXZlbnQoXCJ1cFwiLCBhKVxuXHRcdFx0XHRcdGEuZW1pdCBcInVwXCJcblx0XHRcdFx0XHRtb3ZlU2VsZWN0aW9uKFwidXBcIiwgQClcblxuXHRcdFx0XHRidWJibGVFdmVudChcImwzVXBcIiwgYSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJsalVwXCIsIGEpXG5cblx0XHRcdFx0YS5lbWl0IFwibGpVcFwiXG5cdFx0XHRcdGEuZW1pdCBcImwzVXBcIlxuXG5cblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMubDNSaWdodCBvciBrZXljb2RlIGlzIGtleWNvZGVzLmxqUmlnaHQpXG5cdFx0XHRcdGlmKEAub3B0aW9ucy5sZWZ0U3RpY2tEcGFkKSBcblx0XHRcdFx0XHRidWJibGVFdmVudChcInJpZ2h0XCIsIGEpXG5cdFx0XHRcdFx0YS5lbWl0IFwicmlnaHRcIlxuXHRcdFx0XHRcdG1vdmVTZWxlY3Rpb24oXCJyaWdodFwiLCBAKVx0XHRcdFxuXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwibGpSaWdodFwiLCBhKVxuXHRcdFx0XHRidWJibGVFdmVudChcImwzUmlnaHRcIiwgYSlcblxuXHRcdFx0XHRhLmVtaXQgXCJsalJpZ2h0XCJcblx0XHRcdFx0YS5lbWl0IFwibDNSaWdodFwiXG5cblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMubDNEb3duIG9yIGtleWNvZGUgaXMga2V5Y29kZXMubGpEb3duKVxuXHRcdFx0XHRpZihALm9wdGlvbnMubGVmdFN0aWNrRHBhZCkgXG5cdFx0XHRcdFx0YnViYmxlRXZlbnQoXCJkb3duXCIsIGEpXG5cdFx0XHRcdFx0YS5lbWl0IFwiZG93blwiXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRtb3ZlU2VsZWN0aW9uKFwiZG93blwiLCBAKVxuXG5cdFx0XHRcdGEuZW1pdCBcImxqRG93blwiXHRcdFx0XHRcdFxuXHRcdFx0XHRhLmVtaXQgXCJsM0Rvd25cIlxuXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwibGpEb3duXCIsIGEpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwibDNEb3duXCIsIGEpXG5cblx0XHRcdCNMMyAvIGxlZnQgam95c3RpY2sgYnV0dG9uXG5cdFx0XHRpZihrZXljb2RlIGlzIGtleWNvZGVzLmwzUHJlc3Mgb3Iga2V5Y29kZSBpcyBrZXljb2Rlcy5salByZXNzKVxuXHRcdFx0XHRidWJibGVFdmVudChcImxqUHJlc3NcIiwgYSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJsM1ByZXNzXCIsIGEpXG5cdFx0XHRcdFxuXHRcdFx0XHRhLmVtaXQgXCJsalByZXNzXCJcdFx0XHRcdFx0XHRcblx0XHRcdFx0YS5lbWl0IFwibDNQcmVzc1wiXG5cblx0XHRcdCNyaWdodCBqb3lzdGlja1xuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5yM0xlZnQgb3Iga2V5Y29kZSBpcyBrZXljb2Rlcy5yakxlZnQpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwicjNMZWZ0XCIsIGEpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwicmpMZWZ0XCIsIGEpXG5cblx0XHRcdFx0YS5lbWl0IFwicmpMZWZ0XCJcblx0XHRcdFx0YS5lbWl0IFwicjNMZWZ0XCJcblx0XHRcdFxuXHRcdFx0XHRcblxuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5yM1VwIG9yIGtleWNvZGUgaXMga2V5Y29kZXMucmpVcClcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJyalVwXCIsIGEpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwicjNVcFwiLCBhKVxuXG5cdFx0XHRcdGEuZW1pdCBcInJqVXBcIlxuXHRcdFx0XHRhLmVtaXQgXCJyM1VwXCJcblxuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5yM1JpZ2h0IG9yIGtleWNvZGUgaXMga2V5Y29kZXMucmpSaWdodClcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJyalJpZ2h0XCIsIGEpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwicjNSaWdodFwiLCBhKVxuXG5cdFx0XHRcdGEuZW1pdCBcInJqUmlnaHRcIlxuXHRcdFx0XHRhLmVtaXQgXCJyM1JpZ2h0XCJcblxuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5yM0Rvd24gb3Iga2V5Y29kZSBpcyBrZXljb2Rlcy5yakRvd24pXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwicmpEb3duXCIsIGEpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwicjNEb3duXCIsIGEpXG5cdFx0XHRcdFxuXHRcdFx0XHRhLmVtaXQgXCJyakRvd25cIlxuXHRcdFx0XHRhLmVtaXQgXCJyM0Rvd25cIlxuXHRcdFx0XG5cdFx0XHQjUjMgLyByaWdodCBqb3lzdGljayBidXR0b25cblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMucjNQcmVzcyBvciBrZXljb2RlIGlzIGtleWNvZGVzLnJqUHJlc3MpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwicmpQcmVzc1wiLCBhKVxuXHRcdFx0XHRidWJibGVFdmVudChcInIzUHJlc3NcIiwgYSlcblxuXHRcdFx0XHRhLmVtaXQgXCJyalByZXNzXCJcblx0XHRcdFx0YS5lbWl0IFwicjNQcmVzc1wiXG5cblx0XHRcdCNob21lIGJ1dHRvblxuXHRcdFx0aWYoa2V5Y29kZSBpcyBrZXljb2Rlcy5ob21lKVxuXHRcdFx0XHRidWJibGVFdmVudChcImhvbWVcIiwgYSlcblx0XHRcdFx0YS5lbWl0IFwiaG9tZVwiXG5cblx0XHRcdCN0b3VjaHBhZCBidXR0b24gKFBTIG9ubHkpXG5cdFx0XHRpZihrZXljb2RlIGlzIGtleWNvZGVzLnRvdWNocGFkKVxuXHRcdFx0XHRidWJibGVFdmVudChcInRvdWNocGFkXCIsIGEpXG5cdFx0XHRcdGEuZW1pdCBcInRvdWNocGFkXCJcblx0XHRcdFx0XG5cblx0XHRcdCNzZWxlY3QgYnV0dG9uIChYQjEgb25seSlcblx0XHRcdGlmKGtleWNvZGUgaXMga2V5Y29kZXMuc2VsZWN0KVxuXHRcdFx0XHRidWJibGVFdmVudChcInNlbGVjdFwiLCBhKVxuXHRcdFx0XHRhLmVtaXQgXCJzZWxlY3RcIlxuXHRcdFx0XHRcblxuXHRcdFx0I3N0YXJ0IGJ1dHRvbiAoWEIxIG9ubHkpXG5cdFx0XHRpZihrZXljb2RlIGlzIGtleWNvZGVzLnN0YXJ0KVxuXHRcdFx0XHRidWJibGVFdmVudChcInN0YXJ0XCIsIGEpXG5cdFx0XHRcdGEuZW1pdCBcInN0YXJ0XCJcblx0XHRcdFx0XG5cblx0XHQjY3JlYXRlIGV2ZW50IGxpc3RlbmVyIGZvciBrZXlib2FyZCBrZXkgcHJlc3Nlc1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2tleWRvd24nLCBVdGlscy50aHJvdHRsZSAwLjIsIChldmVudCkgPT5cblx0XHRcdFxuXHRcdFx0aWYoQC5jdXJyZW50U2VsZWN0aW9uIGlzIG51bGwpXG5cdFx0XHRcdHJldHVyblxuXG5cdFx0XHRrZXljb2RlID0gZXZlbnQud2hpY2hcblxuXHRcdFx0YSA9IEAuY3VycmVudFNlbGVjdGlvblxuXG5cdFx0XHRcblx0XHRcdGlmKGtleWNvZGUgaXMgMzgpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwidXBcIiwgYSlcblx0XHRcdFx0YS5lbWl0IFwidXBcIlx0XHRcdFx0XG5cdFx0XHRcdG1vdmVTZWxlY3Rpb24oXCJ1cFwiLCBAKVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRpZihrZXljb2RlIGlzIDQwKVxuXHRcdFx0XHRidWJibGVFdmVudChcImRvd25cIiwgYSlcblx0XHRcdFx0YS5lbWl0IFwiZG93blwiXHRcdFx0XHRcblx0XHRcdFx0bW92ZVNlbGVjdGlvbihcImRvd25cIiwgQClcblxuXHRcdFx0I2xlZnQgYXJyb3dcblx0XHRcdGlmKGtleWNvZGUgaXMgMzcpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwibGVmdFwiLCBhKVxuXHRcdFx0XHRhLmVtaXQgXCJsZWZ0XCJcblx0XHRcdFx0bW92ZVNlbGVjdGlvbihcImxlZnRcIiwgQClcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHQjcmlnaHQgYXJyb3dcblx0XHRcdGlmKGtleWNvZGUgaXMgMzkpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwicmlnaHRcIiwgYSlcblx0XHRcdFx0YS5lbWl0IFwicmlnaHRcIlxuXHRcdFx0XHRtb3ZlU2VsZWN0aW9uKFwicmlnaHRcIiwgQClcblxuXG5cdFx0XHRpZihrZXljb2RlIGlzIDEzKVxuXHRcdFx0XHQjc2F2ZSBjdXJyZW50IHNlbGVjdGlvbiB0byBhIHRlbXAgdmFyaWFibGUgYXMgaXQgbWlnaHQgY2hhbmdlIHdoaWxlIHRoZSBldmVudHMgYXJlIGJlaW5nIGVtaXR0ZWRcblx0XHRcdFx0YSA9IGFcblxuXHRcdFx0XHRidWJibGVFdmVudChcImNyb3NzXCIsIGEpXG5cdFx0XHRcdGJ1YmJsZUV2ZW50KFwiYVwiLCBhKVxuXHRcdFx0XHRidWJibGVFdmVudChcImVudGVyXCIsIGEpXG5cblx0XHRcdFx0YS5lbWl0IFwiY3Jvc3NcIlxuXHRcdFx0XHRhLmVtaXQgXCJhXCJcblx0XHRcdFx0YS5lbWl0IFwiZW50ZXJcIlxuXG5cblxuXHRcdFx0aWYoa2V5Y29kZSBpcyA4KVxuXHRcdFx0XHRidWJibGVFdmVudChcImNpcmNsZVwiLCBhKVxuXHRcdFx0XHRidWJibGVFdmVudChcImJcIiwgYSlcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJiYWNrXCIsIGEpXG5cblx0XHRcdFx0YS5lbWl0IFwiY2lyY2xlXCJcblx0XHRcdFx0YS5lbWl0IFwiYlwiXG5cdFx0XHRcdGEuZW1pdCBcImJhY2tcIlxuXG5cblx0XHRcdGlmKGtleWNvZGUgaXMgMjcgb3Iga2V5Y29kZSBpcyA4MClcblx0XHRcdFx0YnViYmxlRXZlbnQoXCJob21lXCIsIGEpXG5cdFx0XHRcdGEuZW1pdCBcImhvbWVcIlxuXHRcdFx0XHRcdFx0XHRcblx0QGRlZmluZSAnc2VsZWN0ZWRJdGVtJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRyZXR1cm4gQC5jdXJyZW50U2VsZWN0aW9uXG5cblx0XHRzZXQ6ICh2YWx1ZSktPlxuXG5cdFx0XHRALmxhc3RTZWxlY3Rpb24gPSBALmN1cnJlbnRTZWxlY3Rpb25cblxuXHRcdFx0aWYoQC5jdXJyZW50U2VsZWN0aW9uIGlzbnQgbnVsbCBhbmQgQC5jdXJyZW50U2VsZWN0aW9uIGlzbnQgdW5kZWZpbmVkKVxuXHRcdFx0XHRALmN1cnJlbnRTZWxlY3Rpb24uc2VsZWN0ZWQgPSBmYWxzZVxuXHRcdFx0XG5cdFx0XHRALmN1cnJlbnRTZWxlY3Rpb24gPSB2YWx1ZVxuXG5cdFx0XHRpZihALmN1cnJlbnRTZWxlY3Rpb24gaXNudCBudWxsIGFuZCBALmN1cnJlbnRTZWxlY3Rpb24gaXNudCB1bmRlZmluZWQpXG5cdFx0XHRcdEAuY3VycmVudFNlbGVjdGlvbi5zZWxlY3RlZCA9IHRydWVcblxuXHRcdFx0XHRidWJibGVCbHVyRXZlbnQoQC5jdXJyZW50U2VsZWN0aW9uLCBALmxhc3RTZWxlY3Rpb24pXG5cdFx0XHRcdGlmKEAubGFzdFNlbGVjdGlvbiBpc250IG51bGwpXG5cdFx0XHRcdFx0QC5sYXN0U2VsZWN0aW9uLmVtaXQgXCJibHVyXCJcblxuXHRcdFx0XHRidWJibGVGb2N1c0V2ZW50KEAuY3VycmVudFNlbGVjdGlvbiwgQC5sYXN0U2VsZWN0aW9uKSBcblx0XHRcdFx0aWYoQC5jdXJyZW50U2VsZWN0aW9uIGlzbnQgbnVsbClcblx0XHRcdFx0XHRALmN1cnJlbnRTZWxlY3Rpb24uZW1pdCBcImZvY3VzXCJcblx0XHRcdFxuXHRcdFx0QC5lbWl0IFwiY2hhbmdlOnNlbGVjdGlvblwiLCBALmN1cnJlbnRTZWxlY3Rpb25cblxuXG5cdEBkZWZpbmUgJ2xhc3RTZWxlY3RlZEl0ZW0nLFxuXHRcdGdldDogLT5cblx0XHRcdHJldHVybiBALmxhc3RTZWxlY3Rpb25cblxuXHRAZGVmaW5lICdjb250cm9sbGVyJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRyZXR1cm4gQC5vcHRpb25zLmNvbnRyb2xsZXJcblx0XHRzZXQ6ICh2YWx1ZSktPlxuXHRcdFx0QC5vcHRpb25zLmNvbnRyb2xsZXIgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ2xlZnRTdGlja0RwYWQnLFxuXHRcdGdldDogLT5cblx0XHRcdHJldHVybiBALm9wdGlvbnMubGVmdFN0aWNrRHBhZFxuXHRcdHNldDogKHZhbHVlKS0+XG5cdFx0XHRALm9wdGlvbnMubGVmdFN0aWNrRHBhZCA9IHZhbHVlXG5cblx0QGRlZmluZSAnZGVmYXVsdE9uU3RhdGUnLFxuXHRcdGdldDogLT5cblx0XHRcdHJldHVybiBALm9wdGlvbnMuZGVmYXVsdE9uU3RhdGVcblx0XHRzZXQ6ICh2YWx1ZSktPlxuXHRcdFx0ZGVmYXVsdE9uU3RhdGUgPSBALm9wdGlvbnMuZGVmYXVsdE9uU3RhdGUgPSB2YWx1ZVxuXHRcdFx0Zm9yIHNlbGVjdGFibGUgaW4gYWxsU2VsZWN0YWJsZXNcblx0XHRcdFx0c2VsZWN0YWJsZS5zdGF0ZXMuZGVmYXVsdE9uU3RhdGUgPSBkZWZhdWx0T25TdGF0ZVxuXG5cdEBkZWZpbmUgJ2RlZmF1bHRPZmZTdGF0ZScsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0cmV0dXJuIEAub3B0aW9ucy5kZWZhdWx0T2ZmU3RhdGVcblx0XHRzZXQ6ICh2YWx1ZSktPlxuXHRcdFx0ZGVmYXVsdE9mZlN0YXRlID0gQC5vcHRpb25zLmRlZmF1bHRPZmZTdGF0ZSA9IHZhbHVlXG5cdFx0XHRmb3Igc2VsZWN0YWJsZSBpbiBhbGxTZWxlY3RhYmxlc1xuXHRcdFx0XHRzZWxlY3RhYmxlLnN0YXRlcy5kZWZhdWx0T2ZmU3RhdGUgPSBkZWZhdWx0T2ZmU3RhdGVcblxuXG5cdEBkZWZpbmUgJ2RlZmF1bHRTZWxlY3Rpb25Cb3JkZXInLFxuXHRcdGdldDogLT5cblx0XHRcdHJldHVybiBALm9wdGlvbnMuZGVmYXVsdFNlbGVjdGlvbkJvcmRlclxuXHRcdHNldDogKHZhbHVlKS0+XG5cdFx0XHRkZWZhdWx0U2VsZWN0aW9uQm9yZGVyID0gQC5vcHRpb25zLmRlZmF1bHRTZWxlY3Rpb25Cb3JkZXIgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ2RlZmF1bHRTZWxlY3Rpb25Cb3JkZXJXaWR0aCcsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0cmV0dXJuIEAub3B0aW9ucy5kZWZhdWx0U2VsZWN0aW9uQm9yZGVyV2lkdGhcblx0XHRzZXQ6ICh2YWx1ZSktPlxuXHRcdFx0ZGVmYXVsdFNlbGVjdGlvbkJvcmRlcldpZHRoID0gQC5vcHRpb25zLmRlZmF1bHRTZWxlY3Rpb25Cb3JkZXJXaWR0aCA9IHZhbHVlXG5cblx0QGRlZmluZSAnZGVmYXVsdFNlbGVjdGlvbkJvcmRlckNvbG9yJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRyZXR1cm4gQC5vcHRpb25zLmRlZmF1bHRTZWxlY3Rpb25Cb3JkZXJDb2xvclxuXHRcdHNldDogKHZhbHVlKS0+XG5cdFx0XHRkZWZhdWx0U2VsZWN0aW9uQm9yZGVyQ29sb3IgPSBALm9wdGlvbnMuZGVmYXVsdFNlbGVjdGlvbkJvcmRlckNvbG9yID0gdmFsdWVcblxuZXhwb3J0cy5mb2N1c01hbmFnZXIgPSBmb2N1c01hbmFnZXJcbiIsIl8gPSBGcmFtZXIuX1xuXG5GdW5jdGlvbjo6ZGVmaW5lID0gKHByb3AsIGRlc2MpIC0+XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGlzLnByb3RvdHlwZSwgcHJvcCwgZGVzY1xuXG5jbGFzcyBHYW1lcGFkU3lzdGVtIGV4dGVuZHMgRnJhbWVyLkV2ZW50RW1pdHRlclxuXHRjb25zdHJ1Y3RvcjogLT5cblx0XHRAY29ubmVjdGVkR2FtZXBhZCA9IHVuZGVmaW5lZFxuXHRcdEBsb29wUmVxdWVzdCA9IHVuZGVmaW5lZFxuXHRcdEBwb2xsaW5nR1AgPSB1bmRlZmluZWRcblx0XHRAYnV0dG9uc1ByZXNzZWQgPSBbXVxuXHRcdEBidXR0b25zUHJlc3NlZFByZXYgPSBbXVxuXHRcdCMgUG9sbCBsb29wIFggdGltZXMgYSBzZWNvbmQgZm9yIG5ldyBzdGF0ZXNcblx0XHRAbG9vcEludGVydmFsID0gNTAwXG5cblx0XHQjIFRocmVzaG9sZCBmb3IgYXBwcm92ZWQgYXhpcyB2YWx1ZXMgLSBWYWx1ZXMgYWJvdmUgWCB3aWxsIGJlIHJlZ2lzdGVyZWQgYXMgYW4gaW5wdXRcblx0XHRAYXhpc1NlbnNpdGl2aXR5ID0gLjJcblxuXHRcdCMgQW1vdW50IG9mIGJ1dHRvbiBldmVudHMgb2NjdXJpbmcgaW4gYSBzZXF1ZW5jZVxuXHRcdEBldmVudHNJblNlcXVlbmNlID0gMFxuXG5cdFx0IyBTaG91bGQgZXZlbnRzIGJlIHRocm90dGxlZD9cblx0XHRAdGhyb3R0bGVkID0gdHJ1ZVxuXHRcdFxuXHRcdGlmIG5hdmlnYXRvci5nZXRHYW1lcGFkcygpWzBdXG5cdFx0XHRAY29ubmVjdGVkR2FtZXBhZCA9IG5hdmlnYXRvci5nZXRHYW1lcGFkcygpWzBdXG5cdFx0XHRAbG9vcFJlcXVlc3QgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBldmVudExvb3AuYmluZChAKVxuXHRcdFxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyICdnYW1lcGFkY29ubmVjdGVkJywgKGUpID0+XG5cdFx0XHRAY29ubmVjdGVkR2FtZXBhZCA9IG5hdmlnYXRvci5nZXRHYW1lcGFkcygpWzBdXG5cdFx0XHRAbG9vcFJlcXVlc3QgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBldmVudExvb3AuYmluZChAKVxuXHRcdFxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyICdnYW1lcGFkZGlzY29ubmVjdGVkJywgKGUpID0+XG5cdFx0XHRAY29ubmVjdGVkR2FtZXBhZCA9IG51bGxcblx0XHRcdHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSBAbG9vcFJlcXVlc3RcblxuXHRAZGVmaW5lICd0aHJvdHRsZScsXG5cdFx0c2V0OiAoYm9vbCkgLT5cblx0XHRcdEB0aHJvdHRsZWQgPSBib29sXG5cblx0XHRcdGlmIGJvb2wgPT0gdHJ1ZVxuXHRcdFx0XHRAYXhpc1NlbnNpdGl2aXR5ID0gLjJcblx0XHRcdGVsc2Vcblx0XHRcdFx0QGF4aXNTZW5zaXRpdml0eSA9IC4yXG5cdFxuXHRldmVudExvb3A6ICgpID0+XG5cblx0XHRzZXRUaW1lb3V0ICgpID0+XG5cdFx0XHRcblx0XHRcdEBwb2xsaW5nR1AgPSBuYXZpZ2F0b3IuZ2V0R2FtZXBhZHMoKVswXVxuXHRcdFx0Zm9yIGJ1dHRvbiwgaW5kZXggaW4gQHBvbGxpbmdHUC5idXR0b25zXG5cdFx0XHRcdGJ1dHRvbi50eXBlID0gJ2J1dHRvbidcblx0XHRcdFx0YnV0dG9uLmtleUNvZGUgPSBpbmRleFxuXG5cdFx0XHQjc2F2ZSB0aGUgYnV0dG9uIHByZXNzKGVzKSBpbiB0aGUgbGFzdCBldmVudGxvb3Bcblx0XHRcdEBidXR0b25zUHJlc3NlZFByZXYgPSBAYnV0dG9uc1ByZXNzZWRcblxuXHRcdFx0QGJ1dHRvbnNQcmVzc2VkID0gXy5maWx0ZXIgQHBvbGxpbmdHUC5idXR0b25zLCB7cHJlc3NlZDogdHJ1ZX1cblx0XHRcdGZvciBheGlzLCBpbmRleCBpbiBAcG9sbGluZ0dQLmF4ZXNcblx0XHRcdFx0aWYgKGluZGV4IDw9IDMpXG5cdFx0XHRcdFx0YWN0aXZlQXhpcyA9IHt9XG5cblx0XHRcdFx0XHRpZiBheGlzID4gQGF4aXNTZW5zaXRpdml0eSB8fCBheGlzIDwgLUBheGlzU2Vuc2l0aXZpdHlcblx0XHRcdFx0XHRcdGFjdGl2ZUF4aXMudHlwZSA9ICdheGlzJ1xuXHRcdFx0XHRcdFx0YWN0aXZlQXhpcy52YWx1ZSA9IGF4aXNcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdHN3aXRjaCBpbmRleFxuXHRcdFx0XHRcdFx0XHR3aGVuIDBcblx0XHRcdFx0XHRcdFx0XHRpZiBheGlzID4gMFxuXHRcdFx0XHRcdFx0XHRcdFx0YWN0aXZlQXhpcy5rZXlDb2RlID0gMzlcblx0XHRcdFx0XHRcdFx0XHRcdEBidXR0b25zUHJlc3NlZC5wdXNoIGFjdGl2ZUF4aXNcblx0XHRcdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdFx0XHRhY3RpdmVBeGlzLmtleUNvZGUgPSAzN1xuXHRcdFx0XHRcdFx0XHRcdFx0QGJ1dHRvbnNQcmVzc2VkLnB1c2ggYWN0aXZlQXhpc1xuXHRcdFx0XHRcdFx0XHR3aGVuIDFcblx0XHRcdFx0XHRcdFx0XHRpZiBheGlzID4gMFxuXHRcdFx0XHRcdFx0XHRcdFx0YWN0aXZlQXhpcy5rZXlDb2RlID0gNDBcblx0XHRcdFx0XHRcdFx0XHRcdEBidXR0b25zUHJlc3NlZC5wdXNoIGFjdGl2ZUF4aXNcblx0XHRcdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdFx0XHRhY3RpdmVBeGlzLmtleUNvZGUgPSAzOFxuXHRcdFx0XHRcdFx0XHRcdFx0QGJ1dHRvbnNQcmVzc2VkLnB1c2ggYWN0aXZlQXhpc1xuXHRcdFx0XHRcdFx0XHR3aGVuIDJcblx0XHRcdFx0XHRcdFx0XHRpZiBheGlzID4gMFxuXHRcdFx0XHRcdFx0XHRcdFx0YWN0aXZlQXhpcy5rZXlDb2RlID0gNDRcblx0XHRcdFx0XHRcdFx0XHRcdEBidXR0b25zUHJlc3NlZC5wdXNoIGFjdGl2ZUF4aXNcblx0XHRcdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdFx0XHRhY3RpdmVBeGlzLmtleUNvZGUgPSA0MlxuXHRcdFx0XHRcdFx0XHRcdFx0QGJ1dHRvbnNQcmVzc2VkLnB1c2ggYWN0aXZlQXhpc1xuXHRcdFx0XHRcdFx0XHR3aGVuIDNcblx0XHRcdFx0XHRcdFx0XHRpZiBheGlzID4gMFxuXHRcdFx0XHRcdFx0XHRcdFx0YWN0aXZlQXhpcy5rZXlDb2RlID0gNDNcblx0XHRcdFx0XHRcdFx0XHRcdEBidXR0b25zUHJlc3NlZC5wdXNoIGFjdGl2ZUF4aXNcblx0XHRcdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdFx0XHRhY3RpdmVBeGlzLmtleUNvZGUgPSA0MVxuXHRcdFx0XHRcdFx0XHRcdFx0QGJ1dHRvbnNQcmVzc2VkLnB1c2ggYWN0aXZlQXhpc1xuXG5cblx0XHRcdGlmIEBidXR0b25zUHJlc3NlZC5sZW5ndGhcblxuXHRcdFx0XHRmb3IgYnV0dG9uUHJlc3NlZCwgaW5kZXggaW4gQGJ1dHRvbnNQcmVzc2VkXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0I2NvbXBhcmUgdGhlIGJ1dHRvbiBwcmVzcyhlcykgaW4gdGhlIGN1cnJlbnQgYW5kIGxhc3QgZXZlbnRsb29wXG5cdFx0XHRcdFx0aWYoYnV0dG9uUHJlc3NlZCBpbiBAYnV0dG9uc1ByZXNzZWRQcmV2ID09IGZhbHNlKVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQjaWYgYSBidXR0b24gcHJlc3MgZGlkIG5vdCBleGlzdCBpbiB0aGUgbGFzdCBldmVudGxvb3AgaS5lLiBpdHMgYSBuZXcgYnV0dG9uIHByZXNzLi4uXG5cdFx0XHRcdFx0XHRAZW1pdCAnZ2FtZXBhZGtleWRvd24nLCBidXR0b25QcmVzc2VkXHRcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHQjaWYgYSBidXR0b24gcHJlc3MgZGlkIGV4aXN0IGluIHRoZSBsYXN0IGV2ZW50bG9vcCBpLmUuIGl0cyBhIGNvbnRpbnVlZCBidXR0b24gcHJlc3MuLi5cblx0XHRcdFx0XHRcdEBlbWl0ICdnYW1lcGFka2V5aGVsZCcsIGJ1dHRvblByZXNzZWRcblxuXHRcdFx0XHRcdCNpbiBhbnljYXNlIGNvbnRpbnVlIHRvLi4uXG5cdFx0XHRcdFx0QGVtaXQgJ2dhbWVwYWRldmVudCcsIGJ1dHRvblByZXNzZWRcblx0XHRcdFx0XHRcblxuXHRcdFx0XHRpZiBAdGhyb3R0bGVkXG5cdFx0XHRcdFx0c3dpdGNoIEBldmVudHNJblNlcXVlbmNlXG5cdFx0XHRcdFx0XHR3aGVuIDBcblx0XHRcdFx0XHRcdFx0QGxvb3BJbnRlcnZhbCA9IDNcblx0XHRcdFx0XHRcdHdoZW4gMVxuXHRcdFx0XHRcdFx0XHRAbG9vcEludGVydmFsID0gOFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0QGxvb3BJbnRlcnZhbCA9IDEwMDBcblxuXHRcdFx0XHRAZXZlbnRzSW5TZXF1ZW5jZSsrXG5cdFx0XHRlbHNlIFxuXHRcdFx0XHRcblx0XHRcdFx0I2lmIHRoZXJlIGFyZSBubyBidXR0b24gcHJlc3NlcyBpbiB0aGUgY3VycmVudCBldmVudGxvb3AsIHN0aWxsIGNoZWNrIHRoZSBsYXN0IGV2ZW50bG9vcCBmb3IgYnV0dG9uIHByZXNzZXNcblx0XHRcdFx0aWYoQGJ1dHRvbnNQcmVzc2VkUHJldi5sZW5ndGgpXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0IyBpZiB0aGVyZSBhcmUgYW55IGJ1dHRvbiBwcmVzc2VzLCBsb29wIHRocm91Z2ggdGhlbSBhbmQgZW1pdCBldmVudCBmb3IgZWFjaFxuXHRcdFx0XHRcdGZvciBidXR0b25QcmVzc2VkLCBpbmRleCBpbiBAYnV0dG9uc1ByZXNzZWRQcmV2XG5cdFx0XHRcdFx0XHRAZW1pdCAnZ2FtZXBhZGtleXVwJywgYnV0dG9uUHJlc3NlZFx0XG5cblx0XHRcdFx0aWYgQHRocm90dGxlZFxuXHRcdFx0XHRcdEBldmVudHNJblNlcXVlbmNlID0gMFxuXHRcdFx0XHRcdEBsb29wSW50ZXJ2YWwgPSA1MDBcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdEBldmVudHNJblNlcXVlbmNlID0gMFxuXHRcdFx0XHRcdEBsb29wSW50ZXJ2YWwgPSAxMDAwXG5cdFx0XHRcblx0XHRcdEBsb29wUmVxdWVzdCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQGV2ZW50TG9vcC5iaW5kKEApXG5cdFx0XG5cdFx0LCAxMDAwIC8gQGxvb3BJbnRlcnZhbFxuXG5leHBvcnRzLkdhbWVwYWQgPSBuZXcgR2FtZXBhZFN5c3RlbSgpIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFHQUE7QURBQSxJQUFBLGdCQUFBO0VBQUE7Ozs7O0FBQUEsQ0FBQSxHQUFJLE1BQU0sQ0FBQzs7QUFFWCxRQUFRLENBQUEsU0FBRSxDQUFBLE1BQVYsR0FBbUIsU0FBQyxJQUFELEVBQU8sSUFBUDtTQUNsQixNQUFNLENBQUMsY0FBUCxDQUFzQixJQUFJLENBQUMsU0FBM0IsRUFBc0MsSUFBdEMsRUFBNEMsSUFBNUM7QUFEa0I7O0FBR2I7OztFQUNRLHVCQUFBOztJQUNaLElBQUMsQ0FBQSxnQkFBRCxHQUFvQjtJQUNwQixJQUFDLENBQUEsV0FBRCxHQUFlO0lBQ2YsSUFBQyxDQUFBLFNBQUQsR0FBYTtJQUNiLElBQUMsQ0FBQSxjQUFELEdBQWtCO0lBQ2xCLElBQUMsQ0FBQSxrQkFBRCxHQUFzQjtJQUV0QixJQUFDLENBQUEsWUFBRCxHQUFnQjtJQUdoQixJQUFDLENBQUEsZUFBRCxHQUFtQjtJQUduQixJQUFDLENBQUEsZ0JBQUQsR0FBb0I7SUFHcEIsSUFBQyxDQUFBLFNBQUQsR0FBYTtJQUViLElBQUcsU0FBUyxDQUFDLFdBQVYsQ0FBQSxDQUF3QixDQUFBLENBQUEsQ0FBM0I7TUFDQyxJQUFDLENBQUEsZ0JBQUQsR0FBb0IsU0FBUyxDQUFDLFdBQVYsQ0FBQSxDQUF3QixDQUFBLENBQUE7TUFDNUMsSUFBQyxDQUFBLFdBQUQsR0FBZSxNQUFNLENBQUMscUJBQVAsQ0FBNkIsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFYLENBQWdC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
