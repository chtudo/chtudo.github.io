require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ChannelPlayerControl":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (function(superClass) {
  extend(exports, superClass);

  exports.prototype.ori_XX = 0;

  exports.prototype.ori_YY = 0;

  function exports(options) {
    var base, base1, base2, base3, base4, layerPlayerMask, layerPlayerSmallVideo, numlayer, textNum;
    this.options = options != null ? options : {};
    if ((base = this.options).isrotated == null) {
      base.isrotated = "N";
    }
    this.options.width = 375;
    this.options.height = 210;
    if ((base1 = this.options).ori_XX == null) {
      base1.ori_XX = 0;
    }
    if ((base2 = this.options).ori_YY == null) {
      base2.ori_YY = 0;
    }
    this.options.backgroundColor = "Transparent";
    if ((base3 = this.options).isSelectable == null) {
      base3.isSelectable = true;
    }
    if ((base4 = this.options).name == null) {
      base4.name = "ChannelPlayerControl";
    }
    this.ControlMask = this.options.ControlMask;
    this.ControlMask_Landscape = this.options.ControlMask_Landscape;
    this.QualitySesstingMask = this.options.QualitySesstingMask;
    this.QualitySesstingMask_Landscape = this.options.QualitySesstingMask_Landscape;
    this.DeviceSupportMask = this.options.DeviceSupportMask;
    this.DeviceSupportMask_Landscape = this.options.DeviceSupportMask_Landscape;
    this.Video = this.options.Video;
    this.offsetY = this.options.ori_YY;
    this.ControlMask_Landscape.offsetYY = this.offsetY;
    this.ControlMask.offsetYY = this.offsetY;
    exports.__super__.constructor.call(this, this.options);
    this.QualitySesstingMask.parent = this;
    this.QualitySesstingMask.x = this.options.ori_XX;
    this.QualitySesstingMask.y = -this.options.ori_YY;
    this.QualitySesstingMask.visible = false;
    this.QualitySesstingMask.name = "QualitySesstingMask";
    this.clip = true;
    this.onClick(this.ClickMe);
    layerPlayerSmallVideo = new VideoLayer({
      width: 375,
      height: 210,
      name: "ChannelPlayerSmallVideo",
      video: this.options.Video,
      parent: this
    });
    layerPlayerSmallVideo.player.loop = true;
    layerPlayerMask = this.options.ControlMask;
    this.ControlMask.parent = this;
    this.ControlMask_Landscape.parent = this;
    this.ControlMask_Landscape.visible = false;
    this.ControlMask_Landscape.name = "controlMask_Landscape";
    this.DeviceSupportMask.parent = this;
    this.DeviceSupportMask.x = this.options.ori_XX;
    this.DeviceSupportMask.y = -this.options.ori_YY;
    this.DeviceSupportMask.visible = false;
    this.DeviceSupportMask.name = "DeviceSupportMask";
    this.DeviceSupportMask_Landscape.parent = this;
    this.DeviceSupportMask_Landscape.visible = false;
    this.DeviceSupportMask_Landscape.name = "DeviceSupportMask_Landscape";
    this.QualitySesstingMask_Landscape.parent = this;
    this.QualitySesstingMask_Landscape.visible = false;
    this.QualitySesstingMask_Landscape.name = "QualitySesstingMask_Landscape";
    this.QualitySesstingMask_Landscape.rotation = 90;
    this.QualitySesstingMask_Landscape.x = -146;
    this.QualitySesstingMask_Landscape.y = 146 - this.options.ori_YY;
    this.ControlMask.bringToFront();
    this.ControlMask.name = "LayerPlayerMask";
    this.ControlMask.subLayersByName("UnFullScreen_ChannelPlayer")[0].visible = false;
    numlayer = this.ControlMask.subLayersByName("BitRate_ChannelPlayer")[0].subLayersByName("bitratenum")[0];
    numlayer.visible = false;
    textNum = new TextLayer({
      text: "{speed}mbps",
      x: numlayer.x,
      y: numlayer.y,
      parent: numlayer.parent,
      fontSize: 10,
      color: "#AAAAAA"
    });
    textNum.templateFormatter = {
      speed: function(value) {
        return Utils.round(value, 0);
      }
    };
    Utils.interval(2, function() {
      return textNum.animate({
        template: {
          speed: Utils.randomNumber(70, 90)
        }
      });
    });
  }

  exports.define('doisrotated', {
    get: function() {
      return this.options.isrotated;
    },
    set: function(value) {
      return this.options.isrotated = value;
    }
  });

  exports.prototype.InitialEvent = function() {
    var deviceHintBTN_land, deviceHintBtn, muteBtn_land, muteBtn_port, playBtn_land, playBtn_port, settingBtn_land, zoomBtn_land, zoomBtn_port;
    playBtn_land = this.ControlMask_Landscape.subLayersByName("PlayBTN_ChannelPlayerLandscape")[0];
    playBtn_port = this.ControlMask.subLayersByName("PlayBTN_ChannelPlayer")[0];
    deviceHintBTN_land = this.ControlMask_Landscape.subLayersByName("DeviceSupport_LandscapeChannel")[0];
    settingBtn_land = this.ControlMask_Landscape.subLayersByName("Setting_ChannelPlayerLandscape")[0];
    deviceHintBtn = this.ControlMask.subLayersByName("ScreenSupport_PortChannel")[0];
    playBtn_land.states.Play = {
      opacity: 1
    };
    playBtn_land.states.Pause = {
      opacity: 1
    };
    playBtn_port.states.Play = {
      opacity: 1
    };
    playBtn_port.states.Pause = {
      opacity: 1
    };
    playBtn_land.on(Events.StateWillSwitch, function(from, to, states) {
      if (to === "Pause") {
        this.subLayersByName("PlayBTN_ChannelPlayerLandscape_State_Play")[0].visible = true;
        this.subLayersByName("PlayBTN_ChannelPlayerLandscape_State_Pause")[0].visible = false;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.pause();
      } else {
        this.subLayersByName("PlayBTN_ChannelPlayerLandscape_State_Play")[0].visible = false;
        this.subLayersByName("PlayBTN_ChannelPlayerLandscape_State_Pause")[0].visible = true;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.play();
      }
    });
    playBtn_land.stateSwitch("Pause");
    playBtn_land.on(Events.Click, function() {
      return this.stateCycle("Play", "Pause");
    });
    playBtn_port.on(Events.StateWillSwitch, function(from, to, states) {
      if (to === "Pause") {
        this.subLayersByName("Continue_ChannelPlayer")[0].visible = true;
        this.subLayersByName("Pause_ChannelPlayer")[0].visible = false;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.pause();
      } else {
        this.subLayersByName("Continue_ChannelPlayer")[0].visible = false;
        this.subLayersByName("Pause_ChannelPlayer")[0].visible = true;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.play();
      }
    });
    playBtn_port.stateSwitch("Pause");
    playBtn_port.on(Events.Click, function() {
      return this.stateCycle("Play", "Pause");
    });
    zoomBtn_land = this.ControlMask_Landscape.subLayersByName("Zoom_ChannelPlayerLandscape")[0];
    zoomBtn_land.states.ZoomIn = {
      opacity: 1
    };
    zoomBtn_land.states.ZoomOut = {
      opacity: 1
    };
    zoomBtn_land.on(Events.StateWillSwitch, function(from, to, states) {
      if (to === "ZoomIn") {
        this.subLayersByName("Zoom_ChannelPlayerLandscape_State_ZoomIn")[0].visible = false;
        this.subLayersByName("Zoom_ChannelPlayerLandscape_State_ZoomOut")[0].visible = true;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].scale = 1.333;
      } else {
        this.subLayersByName("Zoom_ChannelPlayerLandscape_State_ZoomIn")[0].visible = true;
        this.subLayersByName("Zoom_ChannelPlayerLandscape_State_ZoomOut")[0].visible = false;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].scale = 1;
      }
    });
    zoomBtn_land.stateSwitch("ZoomOut");
    zoomBtn_land.on(Events.Click, function() {
      return this.stateCycle("ZoomIn", "ZoomOut");
    });
    zoomBtn_port = this.ControlMask.subLayersByName("Zoom_ChannelPlayer")[0];
    zoomBtn_port.states.ZoomIn = {
      opacity: 1
    };
    zoomBtn_port.states.ZoomOut = {
      opacity: 1
    };
    zoomBtn_port.on(Events.StateWillSwitch, function(from, to, states) {
      if (to === "ZoomIn") {
        this.subLayersByName("ZoomIN_ChannelPlayer")[0].visible = false;
        this.subLayersByName("ZoomOUT_ChannelPlayer")[0].visible = true;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].scale = 1.333;
      } else {
        this.subLayersByName("ZoomIN_ChannelPlayer")[0].visible = true;
        this.subLayersByName("ZoomOUT_ChannelPlayer")[0].visible = false;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].scale = 1;
      }
    });
    zoomBtn_port.stateSwitch("ZoomOut");
    zoomBtn_port.on(Events.Click, function() {
      return this.stateCycle("ZoomIn", "ZoomOut");
    });
    muteBtn_land = this.ControlMask_Landscape.subLayersByName("Mute_ChannelPlayerLandscape")[0];
    muteBtn_land.states.Mute = {
      opacity: 1
    };
    muteBtn_land.states.UnMute = {
      opacity: 1
    };
    muteBtn_land.on(Events.StateWillSwitch, function(from, to, states) {
      if (to === "Mute") {
        this.subLayersByName("Mute_ChannelPlayerLandscape_State_Mute")[0].visible = false;
        this.subLayersByName("Mute_ChannelPlayerLandscape_State_UnMute")[0].visible = true;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.muted = true;
      } else {
        this.subLayersByName("Mute_ChannelPlayerLandscape_State_Mute")[0].visible = true;
        this.subLayersByName("Mute_ChannelPlayerLandscape_State_UnMute")[0].visible = false;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.muted = false;
      }
    });
    muteBtn_land.stateSwitch("UnMute");
    muteBtn_land.on(Events.Click, function() {
      return this.stateCycle("Mute", "UnMute");
    });
    muteBtn_port = this.ControlMask.subLayersByName("MuteBTNControl_ChannelPlayer")[0];
    muteBtn_port.states.Mute = {
      opacity: 1
    };
    muteBtn_port.states.UnMute = {
      opacity: 1
    };
    muteBtn_port.on(Events.StateWillSwitch, function(from, to, states) {
      if (to === "Mute") {
        this.subLayersByName("MuteControl_ChannelPlayer")[0].visible = false;
        this.subLayersByName("UNMuteControl_ChannelPlayer")[0].visible = true;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.muted = true;
      } else {
        this.subLayersByName("MuteControl_ChannelPlayer")[0].visible = true;
        this.subLayersByName("UNMuteControl_ChannelPlayer")[0].visible = false;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.muted = false;
      }
    });
    muteBtn_port.stateSwitch("UnMute");
    muteBtn_port.on(Events.Click, function() {
      return this.stateCycle("Mute", "UnMute");
    });
    this.QualitySesstingMask.on(Events.Click, function() {
      this.visible = false;
      this.parent.width = 375;
      return this.parent.height = 210;
    });
    this.ControlMask.subLayersByName("Setting_ChannelPlayer")[0].on(Events.Click, function() {
      this.parent.parent.subLayersByName("QualitySesstingMask")[0].visible = true;
      this.parent.parent.subLayersByName("QualitySesstingMask")[0].bringToFront();
      this.parent.parent.width = 375;
      return this.parent.parent.height = 667;
    });
    this.DeviceSupportMask_Landscape.on(Events.Click, function() {
      return this.visible = false;
    });
    deviceHintBTN_land.on(Events.Click, function() {
      var controlMask_Landscape, layerDeviceLand;
      controlMask_Landscape = this.parent.parent.subLayersByName("controlMask_Landscape")[0];
      layerDeviceLand = this.parent.parent.subLayersByName("DeviceSupportMask_Landscape")[0];
      layerDeviceLand.visible = true;
      layerDeviceLand.bringToFront();
      this.parent.parent.width = 375;
      this.parent.parent.height = 667;
      layerDeviceLand.width = 667;
      layerDeviceLand.height = 375;
      layerDeviceLand.rotation = 90;
      layerDeviceLand.x = -146;
      return layerDeviceLand.y = 146 - controlMask_Landscape.offsetYY;
    });
    this.QualitySesstingMask_Landscape.on(Events.Click, function() {
      return this.visible = false;
    });
    settingBtn_land.on(Events.Click, function() {
      var qualitySesstingMask_Landscape;
      qualitySesstingMask_Landscape = this.parent.parent.subLayersByName("QualitySesstingMask_Landscape")[0];
      qualitySesstingMask_Landscape.visible = true;
      return qualitySesstingMask_Landscape.bringToFront();
    });
    this.DeviceSupportMask.on(Events.Click, function() {
      this.visible = false;
      this.parent.width = 375;
      this.parent.height = 210;
      return this.parent.clip = false;
    });
    deviceHintBtn.on(Events.Click, function() {
      var controlMask_Landscape;
      this.parent.parent.subLayersByName("DeviceSupportMask")[0].visible = true;
      this.parent.parent.subLayersByName("DeviceSupportMask")[0].bringToFront();
      this.parent.parent.width = 375;
      this.parent.parent.height = 667;
      controlMask_Landscape = this.parent.parent.subLayersByName("controlMask_Landscape")[0];
      if (Math.abs(controlMask_Landscape.offsetYY) > 0) {
        return this.parent.parent.clip = false;
      }
    });
    this.ControlMask.subLayersByName("Fullscreen_ChannelPlayer")[0].on(Events.Click, function() {
      var controlMask_Landscape, player;
      controlMask_Landscape = this.parent.parent.subLayersByName("controlMask_Landscape")[0];
      if (Math.abs(controlMask_Landscape.offsetYY) > 0) {
        this.parent.parent.clip = false;
      }
      playBtn_land = controlMask_Landscape.subLayersByName("PlayBTN_ChannelPlayerLandscape")[0];
      playBtn_port = this.parent.subLayersByName("PlayBTN_ChannelPlayer")[0];
      playBtn_land.stateSwitch(playBtn_port.states.current.name);
      muteBtn_land = controlMask_Landscape.subLayersByName("Mute_ChannelPlayerLandscape")[0];
      muteBtn_port = this.parent.subLayersByName("MuteBTNControl_ChannelPlayer")[0];
      muteBtn_land.stateSwitch(muteBtn_port.states.current.name);
      zoomBtn_land = controlMask_Landscape.subLayersByName("Zoom_ChannelPlayerLandscape")[0];
      zoomBtn_port = this.parent.subLayersByName("Zoom_ChannelPlayer")[0];
      zoomBtn_land.stateSwitch(zoomBtn_port.states.current.name);
      Utils.delay(3, function() {
        return controlMask_Landscape.animate({
          opacity: 0,
          options: {
            time: 4,
            curve: "easy-in"
          }
        });
      });
      this.doisrotated = "Y";
      this.parent.parent.width = 375;
      this.parent.parent.height = 667;
      player = this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0];
      controlMask_Landscape = this.parent.parent.subLayersByName("controlMask_Landscape")[0];
      controlMask_Landscape.bringToFront();
      player.width = 667;
      player.height = 375;
      player.rotation = 90;
      player.x = -146;
      player.y = 146 - controlMask_Landscape.offsetYY;
      this.parent.visible = false;
      controlMask_Landscape.visible = true;
      controlMask_Landscape.rotation = 90;
      controlMask_Landscape.x = -146;
      return controlMask_Landscape.y = 146 - controlMask_Landscape.offsetYY;
    });
    return this.ControlMask_Landscape.subLayersByName("FullScreen_ChannelPlayerLandscape")[0].on(Events.Click, function() {
      var controlMask, controlMask_Landscape, player;
      this.parent.parent.clip = true;
      controlMask = this.parent.parent.subLayersByName("LayerPlayerMask")[0];
      controlMask.bringToFront();
      controlMask.visible = true;
      controlMask_Landscape = this.parent.parent.subLayersByName("controlMask_Landscape")[0];
      controlMask_Landscape.visible = false;
      this.parent.parent.width = 375;
      this.parent.parent.height = 210;
      player = this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0];
      player.width = 375;
      player.height = 210;
      player.rotation = 0;
      player.x = 0;
      return player.y = 0;
    });
  };

  exports.prototype.RotationBack = function() {
    var player;
    this.ControlMask.subLayersByName("UnFullScreen_ChannelPlayer")[0].visible = false;
    this.ControlMask.subLayersByName("Fullscreen_ChannelPlayer")[0].visible = true;
    player = this.subLayersByName("ChannelPlayerSmallVideo")[0];
    this.rotation = 0;
    this.scale = 1;
    this.IsRotated = false;
    this.x = this.ori_XX;
    return this.y = this.ori_YY;
  };

  exports.prototype.NowState = function() {
    return this.doisrotated;
  };

  exports.prototype.STOP = function() {
    var controlMask, controlMask_Landscape, player;
    controlMask = this.subLayersByName("LayerPlayerMask")[0];
    controlMask.bringToFront();
    controlMask.visible = true;
    controlMask_Landscape = this.subLayersByName("controlMask_Landscape")[0];
    controlMask_Landscape.visible = false;
    this.parent.width = 375;
    this.parent.height = 210;
    player = this.subLayersByName("ChannelPlayerSmallVideo")[0];
    player.width = 375;
    player.height = 210;
    player.rotation = 0;
    player.x = 0;
    player.y = 0;
    return player.player.pause();
  };

  exports.prototype.Show = function() {
    var childMask;
    childMask = this.ControlMask;
    this.ControlMask.subLayersByName("PlayBTN_ChannelPlayer")[0].stateSwitch("Play");
    this.visible = true;
    this.x = this.ori_XX;
    this.y = this.ori_YY;
    return Utils.delay(3, function() {
      return childMask.animate({
        opacity: 0,
        options: {
          time: 4,
          curve: "easy-in"
        }
      });
    });
  };

  exports.prototype.ClickMe = function() {
    var childMask, horMask;
    horMask = this.ControlMask_Landscape;
    horMask.animate({
      opacity: 1
    });
    ({
      options: {
        time: 0.2,
        curve: "easy-in"
      }
    });
    Utils.delay(3, function() {
      return horMask.animate({
        opacity: 0,
        options: {
          time: 4,
          curve: "easy-in"
        }
      });
    });
    childMask = this.ControlMask;
    childMask.animate({
      opacity: 1
    });
    ({
      options: {
        time: 0.2,
        curve: "easy-in"
      }
    });
    return Utils.delay(3, function() {
      return childMask.animate({
        opacity: 0,
        options: {
          time: 4,
          curve: "easy-in"
        }
      });
    });
  };

  return exports;

})(Layer);


},{}],"VODPlayerControl":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (function(superClass) {
  extend(exports, superClass);

  exports.prototype.ori_XX = 0;

  exports.prototype.ori_YY = 0;

  function exports(options) {
    var base, base1, base2, base3, layerPlayerSmallVideo, numlayer, textNum;
    this.options = options != null ? options : {};
    this.options.width = 375;
    this.options.height = 667;
    if ((base = this.options).ori_X == null) {
      base.ori_X = 0;
    }
    if ((base1 = this.options).ori_Y == null) {
      base1.ori_Y = 0;
    }
    this.options.backgroundColor = "Transparent";
    if ((base2 = this.options).isSelectable == null) {
      base2.isSelectable = true;
    }
    this.options.clip = true;
    if ((base3 = this.options).name == null) {
      base3.name = "ChannelPlayerControl";
    }
    this.IsDrama = this.options.IsDrama;
    this.ControlMask = this.options.ControlMask;
    this.QualitySesstingMask = this.options.QualitySesstingMask;
    this.DeviceSupportMask = this.options.DeviceSupportMask;
    this.VODSelectSessionMask = this.options.VODSelectSessionMask;
    this.Video = this.options.Video;
    this.ControlMask.rotation = 90;
    this.ControlMask.x = -146;
    this.ControlMask.y = 146;
    this.DeviceSupportMask.rotation = 90;
    this.DeviceSupportMask.x = -146;
    this.DeviceSupportMask.y = 146;
    this.QualitySesstingMask.rotation = 90;
    this.QualitySesstingMask.x = -146;
    this.QualitySesstingMask.y = 146;
    this.VODSelectSessionMask.rotation = 90;
    this.VODSelectSessionMask.x = -146;
    this.VODSelectSessionMask.y = 146;
    exports.__super__.constructor.call(this, this.options);
    this.onClick(this.ClickMe);
    layerPlayerSmallVideo = new VideoLayer({
      width: 667,
      height: 375,
      name: "ChannelPlayerSmallVideo",
      video: this.options.Video,
      parent: this,
      x: -146,
      y: 146,
      rotation: 90,
      backgroundColor: "Black"
    });
    layerPlayerSmallVideo.player.loop = true;
    this.DeviceSupportMask.parent = this;
    this.DeviceSupportMask.visible = false;
    this.DeviceSupportMask.name = "DeviceSupportMask";
    this.QualitySesstingMask.parent = this;
    this.QualitySesstingMask.visible = false;
    this.QualitySesstingMask.name = "QualitySesstingMask";
    this.VODSelectSessionMask.parent = this;
    this.VODSelectSessionMask.name = "VODSelectSessionMask";
    this.VODSelectSessionMask.visible = false;
    this.ControlMask.parent = this;
    this.ControlMask.bringToFront();
    this.ControlMask.name = "LayerPlayerMask";
    numlayer = this.ControlMask.subLayersByName("VODPlayer_BitrateNumber")[0];
    numlayer.visible = false;
    textNum = new TextLayer({
      text: "{speed}mbps",
      x: numlayer.x,
      y: numlayer.y,
      parent: numlayer.parent,
      fontSize: 10,
      color: "#AAAAAA"
    });
    textNum.templateFormatter = {
      speed: function(value) {
        return Utils.round(value, 0);
      }
    };
    Utils.interval(2, function() {
      return textNum.animate({
        template: {
          speed: Utils.randomNumber(70, 90)
        }
      });
    });
  }

  exports.define('doisrotated', {
    get: function() {
      return this.options.isrotated;
    },
    set: function(value) {
      return this.options.isrotated = value;
    }
  });

  exports.define('qualitySesstingMask', {
    get: function() {
      return this.QualitySesstingMask;
    }
  });

  exports.prototype.InitialEvent = function() {
    var BackBtn, DeviceHintBTN, FastBtn, MuteBtn, NextSessionBTN, PrevSessionBTN, QualityBTN, SessionBTN, ZoomBtn, playBtn;
    DeviceHintBTN = this.ControlMask.subLayersByName("DeviceSupport_LandscapeVOD")[0];
    QualityBTN = this.ControlMask.subLayersByName("VODPlayer_Quality")[0];
    SessionBTN = this.ControlMask.subLayersByName("VODPlayer_SessionSelector")[0];
    NextSessionBTN = this.ControlMask.subLayersByName("VODPlayer_Next")[0];
    PrevSessionBTN = this.ControlMask.subLayersByName("VODPlayer_Prev")[0];
    if (this.IsDrama) {
      SessionBTN.visible = true;
      NextSessionBTN.visible = true;
      PrevSessionBTN.visible = true;
    } else {
      SessionBTN.visible = false;
      NextSessionBTN.visible = false;
      PrevSessionBTN.visible = false;
    }
    QualityBTN.states.ShowQ = {
      opacity: 1
    };
    QualityBTN.states.UnShowQ = {
      opacity: 1
    };
    QualityBTN.on(Events.StateWillSwitch, function(from, to, states) {
      if (to === "ShowQ") {
        this.parent.parent.subLayersByName("QualitySesstingMask")[0].visible = true;
        return this.parent.parent.subLayersByName("QualitySesstingMask")[0].bringToFront();
      } else {
        return print("NoShowQ");
      }
    });
    QualityBTN.on(Events.Click, function() {
      return this.stateSwitch("ShowQ");
    });
    DeviceHintBTN.on(Events.Click, function() {
      this.parent.parent.subLayersByName("DeviceSupportMask")[0].visible = true;
      return this.parent.parent.subLayersByName("DeviceSupportMask")[0].bringToFront();
    });
    SessionBTN.on(Events.Click, function() {
      this.parent.parent.subLayersByName("VODSelectSessionMask")[0].visible = true;
      return this.parent.parent.subLayersByName("VODSelectSessionMask")[0].bringToFront();
    });
    this.DeviceSupportMask.on(Events.Click, function() {
      return this.visible = false;
    });
    this.QualitySesstingMask.on(Events.Click, function() {
      return this.visible = false;
    });
    this.VODSelectSessionMask.on(Events.Click, function() {
      return this.visible = false;
    });
    playBtn = this.ControlMask.subLayersByName("VODPlayer_Play")[0];
    playBtn.states.Play = {
      opacity: 1
    };
    playBtn.states.Pause = {
      opacity: 1
    };
    playBtn.on(Events.StateWillSwitch, function(from, to, states) {
      if (to === "Pause") {
        this.subLayersByName("VODPlayer_PlayState_Play")[0].visible = true;
        this.subLayersByName("VODPlayer_PlayState_Pause")[0].visible = false;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.pause();
      } else {
        this.subLayersByName("VODPlayer_PlayState_Play")[0].visible = false;
        this.subLayersByName("VODPlayer_PlayState_Pause")[0].visible = true;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.play();
      }
    });
    playBtn.stateSwitch("Play");
    playBtn.on(Events.Click, function() {
      return this.stateCycle("Pause", "Play");
    });
    ZoomBtn = this.ControlMask.subLayersByName("VODPlayer_Zoom")[0];
    ZoomBtn.states.ZoomIn = {
      opacity: 1
    };
    ZoomBtn.states.ZoomOut = {
      opacity: 1
    };
    ZoomBtn.on(Events.StateWillSwitch, function(from, to, states) {
      if (to === "ZoomIn") {
        this.subLayersByName("VODPlayer_ZoomState_ZoomIn")[0].visible = false;
        this.subLayersByName("VODPlayer_ZoomState_ZoomOut")[0].visible = true;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].scale = 1.333;
      } else {
        this.subLayersByName("VODPlayer_ZoomState_ZoomIn")[0].visible = true;
        this.subLayersByName("VODPlayer_ZoomState_ZoomOut")[0].visible = false;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].scale = 1;
      }
    });
    ZoomBtn.stateSwitch("ZoomOut");
    ZoomBtn.on(Events.Click, function() {
      return this.stateCycle("ZoomIn", "ZoomOut");
    });
    MuteBtn = this.ControlMask.subLayersByName("VODPlayer_Sound")[0];
    MuteBtn.states.Mute = {
      opacity: 1
    };
    MuteBtn.states.UnMute = {
      opacity: 1
    };
    MuteBtn.on(Events.StateWillSwitch, function(from, to, states) {
      if (to === "Mute") {
        this.subLayersByName("VODPlayer_SoundUnMute")[0].visible = true;
        this.subLayersByName("VODPlayer_SoundMute")[0].visible = false;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.muted = true;
      } else {
        this.subLayersByName("VODPlayer_SoundUnMute")[0].visible = false;
        this.subLayersByName("VODPlayer_SoundMute")[0].visible = true;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.muted = false;
      }
    });
    MuteBtn.stateSwitch("UnMute");
    MuteBtn.on(Events.Click, function() {
      return this.stateCycle("UnMute", "Mute");
    });
    FastBtn = this.ControlMask.subLayersByName("VODPlayer_Fast10SecHint")[0];
    BackBtn = this.ControlMask.subLayersByName("VODPlayer_Back10SecHint")[0];
    FastBtn.on(Events.DoubleTap, function() {
      var player;
      player = this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player;
      return player.currentTime = player.currentTime + 10;
    });
    return BackBtn.on(Events.DoubleTap, function() {
      var player;
      player = this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player;
      return player.currentTime = player.currentTime - 10;
    });
  };

  exports.prototype.RotationBack = function() {
    var player;
    this.ControlMask.subLayersByName("UnFullScreen_ChannelPlayer")[0].visible = false;
    this.ControlMask.subLayersByName("Fullscreen_ChannelPlayer")[0].visible = true;
    player = this.subLayersByName("ChannelPlayerSmallVideo")[0];
    this.rotation = 0;
    this.scale = 1;
    this.IsRotated = false;
    this.x = this.ori_XX;
    return this.y = this.ori_YY;
  };

  exports.prototype.STOP = function() {
    var player;
    player = this.subLayersByName("ChannelPlayerSmallVideo")[0];
    return player.player.pause();
  };

  exports.prototype.Show = function() {
    var childMask, player;
    childMask = this.ControlMask;
    player = this.subLayersByName("ChannelPlayerSmallVideo")[0];
    this.visible = true;
    this.x = this.ori_XX;
    this.y = this.ori_YY;
    Utils.delay(3, function() {
      return childMask.animate({
        opacity: 0,
        options: {
          time: 4,
          curve: "easy-in"
        }
      });
    });
    player.player.currentTime = 0;
    return player.player.play();
  };

  exports.prototype.ClickMe = function() {
    var childMask;
    childMask = this.ControlMask;
    childMask.animate({
      opacity: 1
    });
    ({
      options: {
        time: 0.2,
        curve: "easy-in"
      }
    });
    return Utils.delay(3, function() {
      return childMask.animate({
        opacity: 0,
        options: {
          time: 4,
          curve: "easy-in"
        }
      });
    });
  };

  return exports;

})(Layer);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NoZXJsb2NrL0Ryb3Bib3gvTXlHaXRodWIvTU9EX0ltcHJvdmVudC9IYW1pVmlkZW9fMjAxOS9GcmFtZXIvSGFtaVZpZGVvMjAxOS5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zaGVybG9jay9Ecm9wYm94L015R2l0aHViL01PRF9JbXByb3ZlbnQvSGFtaVZpZGVvXzIwMTkvRnJhbWVyL0hhbWlWaWRlbzIwMTkuZnJhbWVyL21vZHVsZXMvVk9EUGxheWVyQ29udHJvbC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zaGVybG9jay9Ecm9wYm94L015R2l0aHViL01PRF9JbXByb3ZlbnQvSGFtaVZpZGVvXzIwMTkvRnJhbWVyL0hhbWlWaWRlbzIwMTkuZnJhbWVyL21vZHVsZXMvQ2hhbm5lbFBsYXllckNvbnRyb2wuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiXG5jbGFzcyBtb2R1bGUuZXhwb3J0cyBleHRlbmRzIExheWVyXG5cdG9yaV9YWDowXG5cdG9yaV9ZWTowXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMud2lkdGg9Mzc1XG5cdFx0QG9wdGlvbnMuaGVpZ2h0PTY2N1xuXHRcdEBvcHRpb25zLm9yaV9YID89IDBcblx0XHRAb3B0aW9ucy5vcmlfWSA/PSAwXG5cdFx0QG9wdGlvbnMuYmFja2dyb3VuZENvbG9yPVwiVHJhbnNwYXJlbnRcIlxuXHRcdEBvcHRpb25zLmlzU2VsZWN0YWJsZSA/PSB0cnVlXG5cdFx0QG9wdGlvbnMuY2xpcD10cnVlXG5cdFx0QG9wdGlvbnMubmFtZSA/PSBcIkNoYW5uZWxQbGF5ZXJDb250cm9sXCJcblx0XHRASXNEcmFtYSA9QG9wdGlvbnMuSXNEcmFtYVxuXHRcdEBDb250cm9sTWFzaz1Ab3B0aW9ucy5Db250cm9sTWFza1xuXHRcdEBRdWFsaXR5U2Vzc3RpbmdNYXNrPUBvcHRpb25zLlF1YWxpdHlTZXNzdGluZ01hc2tcblx0XHRARGV2aWNlU3VwcG9ydE1hc2s9QG9wdGlvbnMuRGV2aWNlU3VwcG9ydE1hc2tcblx0XHRAVk9EU2VsZWN0U2Vzc2lvbk1hc2s9QG9wdGlvbnMuVk9EU2VsZWN0U2Vzc2lvbk1hc2tcblx0XHQjcHJpbnQgQG9wdGlvbnMuUXVhbGl0eVNlc3N0aW5nTWFzayxAUXVhbGl0eVNlc3N0aW5nTWFza1xuXHRcdEBWaWRlbz1Ab3B0aW9ucy5WaWRlb1xuXHRcdEBDb250cm9sTWFzay5yb3RhdGlvbj05MFxuXHRcdEBDb250cm9sTWFzay54PS0xNDZcblx0XHRAQ29udHJvbE1hc2sueT0xNDZcblx0XHRcblx0XHRARGV2aWNlU3VwcG9ydE1hc2sucm90YXRpb249OTBcblx0XHRARGV2aWNlU3VwcG9ydE1hc2sueD0tMTQ2XG5cdFx0QERldmljZVN1cHBvcnRNYXNrLnk9MTQ2XG5cblxuXHRcdEBRdWFsaXR5U2Vzc3RpbmdNYXNrLnJvdGF0aW9uPTkwXG5cdFx0QFF1YWxpdHlTZXNzdGluZ01hc2sueD0tMTQ2XG5cdFx0QFF1YWxpdHlTZXNzdGluZ01hc2sueT0xNDZcblxuXHRcdEBWT0RTZWxlY3RTZXNzaW9uTWFzay5yb3RhdGlvbj05MFxuXHRcdEBWT0RTZWxlY3RTZXNzaW9uTWFzay54PS0xNDZcblx0XHRAVk9EU2VsZWN0U2Vzc2lvbk1hc2sueT0xNDZcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QC5vbkNsaWNrIEBDbGlja01lXG5cdFx0bGF5ZXJQbGF5ZXJTbWFsbFZpZGVvPW5ldyBWaWRlb0xheWVyXG5cdFx0XHR3aWR0aDogNjY3XG5cdFx0XHRoZWlnaHQ6IDM3NVxuXHRcdFx0bmFtZTpcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCJcblx0XHRcdHZpZGVvOiBAb3B0aW9ucy5WaWRlb1xuXHRcdFx0cGFyZW50Olx0QFxuXHRcdFx0eDotMTQ2XG5cdFx0XHR5OjE0NlxuXHRcdFx0cm90YXRpb246OTBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJCbGFja1wiXG4jIFx0XHRsYXllclBsYXllclNtYWxsVmlkZW8ucGxheWVyLm11dGVkPXRydWVcblx0XHRsYXllclBsYXllclNtYWxsVmlkZW8ucGxheWVyLmxvb3A9dHJ1ZVxuXHRcdCNsYXllclBsYXllck1hc2s9QG9wdGlvbnMuQ29udHJvbE1hc2tcblx0XHRARGV2aWNlU3VwcG9ydE1hc2sucGFyZW50PUBcblx0XHRARGV2aWNlU3VwcG9ydE1hc2sudmlzaWJsZT1mYWxzZVxuXHRcdEBEZXZpY2VTdXBwb3J0TWFzay5uYW1lPVwiRGV2aWNlU3VwcG9ydE1hc2tcIlxuXHRcdFxuXHRcdEBRdWFsaXR5U2Vzc3RpbmdNYXNrLnBhcmVudD1AXG5cdFx0QFF1YWxpdHlTZXNzdGluZ01hc2sudmlzaWJsZT1mYWxzZVxuXHRcdEBRdWFsaXR5U2Vzc3RpbmdNYXNrLm5hbWU9XCJRdWFsaXR5U2Vzc3RpbmdNYXNrXCJcblx0XHRcblxuXHRcdEBWT0RTZWxlY3RTZXNzaW9uTWFzay5wYXJlbnQ9QFxuXHRcdEBWT0RTZWxlY3RTZXNzaW9uTWFzay5uYW1lPVwiVk9EU2VsZWN0U2Vzc2lvbk1hc2tcIlxuXHRcdEBWT0RTZWxlY3RTZXNzaW9uTWFzay52aXNpYmxlPWZhbHNlXG5cdFx0QENvbnRyb2xNYXNrLnBhcmVudD1AXG5cdFx0QENvbnRyb2xNYXNrLmJyaW5nVG9Gcm9udCgpXG5cdFx0QENvbnRyb2xNYXNrLm5hbWU9XCJMYXllclBsYXllck1hc2tcIlxuXHRcdG51bWxheWVyPUBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJWT0RQbGF5ZXJfQml0cmF0ZU51bWJlclwiKVswXVxuXHRcdG51bWxheWVyLnZpc2libGU9ZmFsc2Vcblx0XHR0ZXh0TnVtPW5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IFwie3NwZWVkfW1icHNcIlxuXHRcdFx0eDpudW1sYXllci54XG5cdFx0XHR5Om51bWxheWVyLnlcblx0XHRcdHBhcmVudDpudW1sYXllci5wYXJlbnRcblx0XHRcdGZvbnRTaXplOjEwXG5cdFx0XHRjb2xvcjpcIiNBQUFBQUFcIlxuXHRcdHRleHROdW0udGVtcGxhdGVGb3JtYXR0ZXIgPSBcblx0XHRcdHNwZWVkOih2YWx1ZSktPlxuXHRcdFx0XHRVdGlscy5yb3VuZCh2YWx1ZSwwKVxuXHRcdFV0aWxzLmludGVydmFsIDIsLT5cblx0XHRcdHRleHROdW0uYW5pbWF0ZVxuXHRcdFx0XHR0ZW1wbGF0ZTpcblx0XHRcdFx0XHRzcGVlZDpVdGlscy5yYW5kb21OdW1iZXIoNzAsOTApXG5cdFx0XG5cdEBkZWZpbmUgJ2RvaXNyb3RhdGVkJyxcblx0XHRnZXQ6IC0+IFxuXHRcdFx0QG9wdGlvbnMuaXNyb3RhdGVkXHRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAb3B0aW9ucy5pc3JvdGF0ZWQgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAncXVhbGl0eVNlc3N0aW5nTWFzaycsXG5cdFx0Z2V0OiAtPiBcblx0XHRcdEBRdWFsaXR5U2Vzc3RpbmdNYXNrXHRcbiNcdFx0c2V0OiAodmFsdWUpIC0+IFxuI1x0XHRcdEBvcHRpb25zLmlzcm90YXRlZCA9IHZhbHVlXG5cdEluaXRpYWxFdmVudDogLT5cdFx0XG5cdFx0I3ByaW50IEBJc0RyYW1hXG5cdFx0RGV2aWNlSGludEJUTj1AQ29udHJvbE1hc2suc3ViTGF5ZXJzQnlOYW1lKFwiRGV2aWNlU3VwcG9ydF9MYW5kc2NhcGVWT0RcIilbMF1cblxuXG5cdFx0UXVhbGl0eUJUTj1AQ29udHJvbE1hc2suc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX1F1YWxpdHlcIilbMF1cblx0XHRTZXNzaW9uQlROPUBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJWT0RQbGF5ZXJfU2Vzc2lvblNlbGVjdG9yXCIpWzBdXG5cblx0XHROZXh0U2Vzc2lvbkJUTj1AQ29udHJvbE1hc2suc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX05leHRcIilbMF1cblx0XHRQcmV2U2Vzc2lvbkJUTj1AQ29udHJvbE1hc2suc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX1ByZXZcIilbMF1cblx0XHRcblx0XHRpZiBASXNEcmFtYVxuXHRcdFx0U2Vzc2lvbkJUTi52aXNpYmxlPXRydWVcblx0XHRcdE5leHRTZXNzaW9uQlROLnZpc2libGU9dHJ1ZVxuXHRcdFx0UHJldlNlc3Npb25CVE4udmlzaWJsZT10cnVlXG5cdFx0ZWxzZVxuXHRcdFx0U2Vzc2lvbkJUTi52aXNpYmxlPWZhbHNlXG5cdFx0XHROZXh0U2Vzc2lvbkJUTi52aXNpYmxlPWZhbHNlXG5cdFx0XHRQcmV2U2Vzc2lvbkJUTi52aXNpYmxlPWZhbHNlXG5cdFx0UXVhbGl0eUJUTi5zdGF0ZXMuU2hvd1E9XG5cdFx0XHRvcGFjaXR5OjFcblx0XHRRdWFsaXR5QlROLnN0YXRlcy5VblNob3dRPVxuXHRcdFx0b3BhY2l0eToxXG5cdFx0UXVhbGl0eUJUTi5vbiBFdmVudHMuU3RhdGVXaWxsU3dpdGNoLChmcm9tLCB0bywgc3RhdGVzKS0+XG5cdFx0XHRpZiB0bz09XCJTaG93UVwiXG5cdFx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJRdWFsaXR5U2Vzc3RpbmdNYXNrXCIpWzBdLnZpc2libGU9dHJ1ZVxuXHRcdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiUXVhbGl0eVNlc3N0aW5nTWFza1wiKVswXS5icmluZ1RvRnJvbnQoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRwcmludCBcIk5vU2hvd1FcIlxuXHRcdFF1YWxpdHlCVE4ub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnN0YXRlU3dpdGNoKFwiU2hvd1FcIilcblx0XHRcdCNAb3B0aW9ucy5RdWFsaXR5U2Vzc3RpbmdNYXNrLnZpc2libGU9dHJ1ZVxuXHRcdERldmljZUhpbnRCVE4ub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiRGV2aWNlU3VwcG9ydE1hc2tcIilbMF0udmlzaWJsZT10cnVlXG5cdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiRGV2aWNlU3VwcG9ydE1hc2tcIilbMF0uYnJpbmdUb0Zyb250KClcblx0XHRTZXNzaW9uQlROLm9uIEV2ZW50cy5DbGljaywtPlxuXHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIlZPRFNlbGVjdFNlc3Npb25NYXNrXCIpWzBdLnZpc2libGU9dHJ1ZVxuXHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIlZPRFNlbGVjdFNlc3Npb25NYXNrXCIpWzBdLmJyaW5nVG9Gcm9udCgpXG5cdFx0QERldmljZVN1cHBvcnRNYXNrLm9uIEV2ZW50cy5DbGljaywtPlxuXHRcdFx0dGhpcy52aXNpYmxlPWZhbHNlXG5cdFx0QFF1YWxpdHlTZXNzdGluZ01hc2sub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnZpc2libGU9ZmFsc2Vcblx0XHRAVk9EU2VsZWN0U2Vzc2lvbk1hc2sub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnZpc2libGU9ZmFsc2Vcblx0XHRcdFxuXHRcdHBsYXlCdG49QENvbnRyb2xNYXNrLnN1YkxheWVyc0J5TmFtZShcIlZPRFBsYXllcl9QbGF5XCIpWzBdXG5cdFx0cGxheUJ0bi5zdGF0ZXMuUGxheT1cblx0XHRcdG9wYWNpdHk6MVxuXHRcdHBsYXlCdG4uc3RhdGVzLlBhdXNlPVxuXHRcdFx0b3BhY2l0eToxXG5cdFx0cGxheUJ0bi5vbiBFdmVudHMuU3RhdGVXaWxsU3dpdGNoLChmcm9tLCB0bywgc3RhdGVzKS0+XG5cdFx0XHRpZiB0bz09XCJQYXVzZVwiXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX1BsYXlTdGF0ZV9QbGF5XCIpWzBdLnZpc2libGU9dHJ1ZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlZPRFBsYXllcl9QbGF5U3RhdGVfUGF1c2VcIilbMF0udmlzaWJsZT1mYWxzZVxuXHRcdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF0ucGxheWVyLnBhdXNlKClcdFx0XHRcblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJWT0RQbGF5ZXJfUGxheVN0YXRlX1BsYXlcIilbMF0udmlzaWJsZT1mYWxzZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlZPRFBsYXllcl9QbGF5U3RhdGVfUGF1c2VcIilbMF0udmlzaWJsZT10cnVlXG5cdFx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJDaGFubmVsUGxheWVyU21hbGxWaWRlb1wiKVswXS5wbGF5ZXIucGxheSgpXHRcdFx0XG5cdFx0cGxheUJ0bi5zdGF0ZVN3aXRjaChcIlBsYXlcIilcblxuXHRcdHBsYXlCdG4ub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnN0YXRlQ3ljbGUoXCJQYXVzZVwiLFwiUGxheVwiKVxuXG5cdFx0Wm9vbUJ0bj1AQ29udHJvbE1hc2suc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX1pvb21cIilbMF1cblx0XHRab29tQnRuLnN0YXRlcy5ab29tSW49XG5cdFx0XHRvcGFjaXR5OjFcblx0XHRab29tQnRuLnN0YXRlcy5ab29tT3V0PVxuXHRcdFx0b3BhY2l0eToxXG5cdFx0Wm9vbUJ0bi5vbiBFdmVudHMuU3RhdGVXaWxsU3dpdGNoLChmcm9tLCB0bywgc3RhdGVzKS0+XG5cdFx0XHRpZiB0bz09XCJab29tSW5cIlxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlZPRFBsYXllcl9ab29tU3RhdGVfWm9vbUluXCIpWzBdLnZpc2libGU9ZmFsc2Vcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJWT0RQbGF5ZXJfWm9vbVN0YXRlX1pvb21PdXRcIilbMF0udmlzaWJsZT10cnVlXG5cdFx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJDaGFubmVsUGxheWVyU21hbGxWaWRlb1wiKVswXS5zY2FsZT0xLjMzM1xuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX1pvb21TdGF0ZV9ab29tSW5cIilbMF0udmlzaWJsZT10cnVlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX1pvb21TdGF0ZV9ab29tT3V0XCIpWzBdLnZpc2libGU9ZmFsc2Vcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnNjYWxlPTFcdFx0XHRcblx0XHRab29tQnRuLnN0YXRlU3dpdGNoKFwiWm9vbU91dFwiKVxuXHRcdFpvb21CdG4ub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnN0YXRlQ3ljbGUoXCJab29tSW5cIixcIlpvb21PdXRcIilcblx0XHRNdXRlQnRuPUBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJWT0RQbGF5ZXJfU291bmRcIilbMF1cblx0XHRNdXRlQnRuLnN0YXRlcy5NdXRlPVxuXHRcdFx0b3BhY2l0eToxXG5cdFx0TXV0ZUJ0bi5zdGF0ZXMuVW5NdXRlPVxuXHRcdFx0b3BhY2l0eToxXG5cdFx0TXV0ZUJ0bi5vbiBFdmVudHMuU3RhdGVXaWxsU3dpdGNoLChmcm9tLCB0bywgc3RhdGVzKS0+XG5cdFx0XHRpZiB0bz09XCJNdXRlXCJcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJWT0RQbGF5ZXJfU291bmRVbk11dGVcIilbMF0udmlzaWJsZT10cnVlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX1NvdW5kTXV0ZVwiKVswXS52aXNpYmxlPWZhbHNlXG5cdFx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJDaGFubmVsUGxheWVyU21hbGxWaWRlb1wiKVswXS5wbGF5ZXIubXV0ZWQ9dHJ1ZVx0XHRcdFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlZPRFBsYXllcl9Tb3VuZFVuTXV0ZVwiKVswXS52aXNpYmxlPWZhbHNlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX1NvdW5kTXV0ZVwiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5tdXRlZD1mYWxzZVx0XHRcblx0XHRNdXRlQnRuLnN0YXRlU3dpdGNoKFwiVW5NdXRlXCIpXG5cdFx0TXV0ZUJ0bi5vbiBFdmVudHMuQ2xpY2ssLT5cblx0XHRcdHRoaXMuc3RhdGVDeWNsZShcIlVuTXV0ZVwiLFwiTXV0ZVwiKVxuXHRcdFxuXHRcdEZhc3RCdG49QENvbnRyb2xNYXNrLnN1YkxheWVyc0J5TmFtZShcIlZPRFBsYXllcl9GYXN0MTBTZWNIaW50XCIpWzBdXG5cdFx0QmFja0J0bj1AQ29udHJvbE1hc2suc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX0JhY2sxMFNlY0hpbnRcIilbMF1cblx0XHRcblx0XHRGYXN0QnRuLm9uIEV2ZW50cy5Eb3VibGVUYXAsLT5cblx0XHRcdHBsYXllcj10aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF0ucGxheWVyXG5cdFx0XHRwbGF5ZXIuY3VycmVudFRpbWU9cGxheWVyLmN1cnJlbnRUaW1lKzEwXG5cdFx0XHRcblx0XHRCYWNrQnRuLm9uIEV2ZW50cy5Eb3VibGVUYXAsLT5cblx0XHRcdHBsYXllcj10aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF0ucGxheWVyXG5cdFx0XHRcblx0XHRcdHBsYXllci5jdXJyZW50VGltZT1wbGF5ZXIuY3VycmVudFRpbWUtMTBcblx0XHRcdFxuXHRSb3RhdGlvbkJhY2s6IC0+XG5cdFx0QENvbnRyb2xNYXNrLnN1YkxheWVyc0J5TmFtZShcIlVuRnVsbFNjcmVlbl9DaGFubmVsUGxheWVyXCIpWzBdLnZpc2libGU9ZmFsc2Vcblx0XHRAQ29udHJvbE1hc2suc3ViTGF5ZXJzQnlOYW1lKFwiRnVsbHNjcmVlbl9DaGFubmVsUGxheWVyXCIpWzBdLnZpc2libGU9dHJ1ZVxuXHRcdHBsYXllcj1ALnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdXG5cdFx0QHJvdGF0aW9uPTBcblx0XHRAc2NhbGU9MVxuXHRcdEBJc1JvdGF0ZWQ9ZmFsc2Vcblx0XHRAeD1ALm9yaV9YWFxuXHRcdEB5PUAub3JpX1lZXG5cblx0U1RPUDogLT5cblx0XHRwbGF5ZXI9QC5zdWJMYXllcnNCeU5hbWUoXCJDaGFubmVsUGxheWVyU21hbGxWaWRlb1wiKVswXVxuXHRcdHBsYXllci5wbGF5ZXIucGF1c2UoKVxuXG5cdFNob3c6IC0+XG5cdFx0Y2hpbGRNYXNrPUBDb250cm9sTWFza1xuXHRcdHBsYXllcj1ALnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdXG5cdFx0dGhpcy52aXNpYmxlPXRydWVcblx0XHR0aGlzLng9dGhpcy5vcmlfWFhcblx0XHR0aGlzLnk9dGhpcy5vcmlfWVlcblx0XHRVdGlscy5kZWxheSAzLC0+XG5cdFx0XHRjaGlsZE1hc2suYW5pbWF0ZVxuXHRcdFx0XHRvcGFjaXR5OjBcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOjRcblx0XHRcdFx0XHRjdXJ2ZTpcImVhc3ktaW5cIlxuXHRcdHBsYXllci5wbGF5ZXIuY3VycmVudFRpbWU9MFxuXHRcdHBsYXllci5wbGF5ZXIucGxheSgpXG5cdENsaWNrTWU6LT5cblx0XHRjaGlsZE1hc2s9QENvbnRyb2xNYXNrXG5cdFx0Y2hpbGRNYXNrLmFuaW1hdGVcblx0XHRcdFx0b3BhY2l0eToxXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOjAuMlxuXHRcdFx0XHRjdXJ2ZTpcImVhc3ktaW5cIlxuXHRcdFV0aWxzLmRlbGF5IDMsLT5cblx0XHRcdGNoaWxkTWFzay5hbmltYXRlXG5cdFx0XHRcdG9wYWNpdHk6MFxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdHRpbWU6NFxuXHRcdFx0XHRcdGN1cnZlOlwiZWFzeS1pblwiIiwiI0V2ZW50cy5CYWNrRXZlbnRGaXJlICA9IFwiYmFja0V2ZW50RmlyZVwiXG5cbmNsYXNzIG1vZHVsZS5leHBvcnRzIGV4dGVuZHMgTGF5ZXJcblx0b3JpX1hYOjBcblx0b3JpX1lZOjBcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAb3B0aW9ucy5pc3JvdGF0ZWQgPz0gXCJOXCJcblx0XHRAb3B0aW9ucy53aWR0aD0zNzVcblx0XHRAb3B0aW9ucy5oZWlnaHQ9MjEwXG5cdFx0QG9wdGlvbnMub3JpX1hYID89IDBcblx0XHRAb3B0aW9ucy5vcmlfWVkgPz0gMFxuXHRcdEBvcHRpb25zLmJhY2tncm91bmRDb2xvcj1cIlRyYW5zcGFyZW50XCJcblx0XHRAb3B0aW9ucy5pc1NlbGVjdGFibGUgPz0gdHJ1ZVxuXHRcdCNAb3B0aW9ucy5jbGlwPXRydWVcblx0XHRAb3B0aW9ucy5uYW1lID89IFwiQ2hhbm5lbFBsYXllckNvbnRyb2xcIlxuXHRcdEBDb250cm9sTWFzaz1Ab3B0aW9ucy5Db250cm9sTWFza1xuXHRcdEBDb250cm9sTWFza19MYW5kc2NhcGU9QG9wdGlvbnMuQ29udHJvbE1hc2tfTGFuZHNjYXBlXG5cdFx0QFF1YWxpdHlTZXNzdGluZ01hc2s9QG9wdGlvbnMuUXVhbGl0eVNlc3N0aW5nTWFza1xuXHRcdEBRdWFsaXR5U2Vzc3RpbmdNYXNrX0xhbmRzY2FwZT1Ab3B0aW9ucy5RdWFsaXR5U2Vzc3RpbmdNYXNrX0xhbmRzY2FwZVxuXHRcdEBEZXZpY2VTdXBwb3J0TWFzaz1Ab3B0aW9ucy5EZXZpY2VTdXBwb3J0TWFza1xuXHRcdEBEZXZpY2VTdXBwb3J0TWFza19MYW5kc2NhcGU9QG9wdGlvbnMuRGV2aWNlU3VwcG9ydE1hc2tfTGFuZHNjYXBlXG5cdFx0XG5cdFx0QFZpZGVvPUBvcHRpb25zLlZpZGVvXG5cdFx0I0BvcHRpb25zLng9QC5vcmlfWFhcblx0XHQjQG9wdGlvbnMueT1ALm9yaV9ZWVxuXHRcdEBvZmZzZXRZPUBvcHRpb25zLm9yaV9ZWVxuXHRcdEBDb250cm9sTWFza19MYW5kc2NhcGUub2Zmc2V0WVk9QG9mZnNldFlcblx0XHRAQ29udHJvbE1hc2sub2Zmc2V0WVk9QG9mZnNldFlcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAUXVhbGl0eVNlc3N0aW5nTWFzay5wYXJlbnQ9QFxuXHRcdEBRdWFsaXR5U2Vzc3RpbmdNYXNrLng9QG9wdGlvbnMub3JpX1hYXG5cdFx0QFF1YWxpdHlTZXNzdGluZ01hc2sueT0tQG9wdGlvbnMub3JpX1lZXG5cdFx0QFF1YWxpdHlTZXNzdGluZ01hc2sudmlzaWJsZT1mYWxzZVxuXHRcdEBRdWFsaXR5U2Vzc3RpbmdNYXNrLm5hbWU9XCJRdWFsaXR5U2Vzc3RpbmdNYXNrXCJcdFx0XG5cdFx0QC5jbGlwPXRydWVcblx0XHRALm9uQ2xpY2sgQENsaWNrTWVcblx0XHRsYXllclBsYXllclNtYWxsVmlkZW89bmV3IFZpZGVvTGF5ZXJcblx0XHRcdHdpZHRoOiAzNzVcblx0XHRcdGhlaWdodDogMjEwXG5cdFx0XHRuYW1lOlwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIlxuXHRcdFx0dmlkZW86IEBvcHRpb25zLlZpZGVvI1wiaW1hZ2VzL1Nwb3J0Vm9ELm1wNFwiXG5cdFx0XHRwYXJlbnQ6XHRAXHRcdFxuIyBcdFx0bGF5ZXJQbGF5ZXJTbWFsbFZpZGVvLnBsYXllci5tdXRlZD10cnVlXG5cdFx0bGF5ZXJQbGF5ZXJTbWFsbFZpZGVvLnBsYXllci5sb29wPXRydWVcblx0XHRsYXllclBsYXllck1hc2s9QG9wdGlvbnMuQ29udHJvbE1hc2tcblx0XHRAQ29udHJvbE1hc2sucGFyZW50PUBcblxuXHRcdEBDb250cm9sTWFza19MYW5kc2NhcGUucGFyZW50PUBcblx0XHRAQ29udHJvbE1hc2tfTGFuZHNjYXBlLnZpc2libGU9ZmFsc2Vcblx0XHRAQ29udHJvbE1hc2tfTGFuZHNjYXBlLm5hbWU9XCJjb250cm9sTWFza19MYW5kc2NhcGVcIlxuXG5cblx0XHRARGV2aWNlU3VwcG9ydE1hc2sucGFyZW50PUBcblx0XHRARGV2aWNlU3VwcG9ydE1hc2sueD1Ab3B0aW9ucy5vcmlfWFhcblx0XHRARGV2aWNlU3VwcG9ydE1hc2sueT0tQG9wdGlvbnMub3JpX1lZXG5cdFx0QERldmljZVN1cHBvcnRNYXNrLnZpc2libGU9ZmFsc2Vcblx0XHRARGV2aWNlU3VwcG9ydE1hc2submFtZT1cIkRldmljZVN1cHBvcnRNYXNrXCJcblx0XHRARGV2aWNlU3VwcG9ydE1hc2tfTGFuZHNjYXBlLnBhcmVudD1AXG5cdFx0QERldmljZVN1cHBvcnRNYXNrX0xhbmRzY2FwZS52aXNpYmxlPWZhbHNlXG5cdFx0QERldmljZVN1cHBvcnRNYXNrX0xhbmRzY2FwZS5uYW1lPVwiRGV2aWNlU3VwcG9ydE1hc2tfTGFuZHNjYXBlXCJcblx0XHRAUXVhbGl0eVNlc3N0aW5nTWFza19MYW5kc2NhcGUucGFyZW50PUBcblx0XHRAUXVhbGl0eVNlc3N0aW5nTWFza19MYW5kc2NhcGUudmlzaWJsZT1mYWxzZVxuXHRcdEBRdWFsaXR5U2Vzc3RpbmdNYXNrX0xhbmRzY2FwZS5uYW1lPVwiUXVhbGl0eVNlc3N0aW5nTWFza19MYW5kc2NhcGVcIlx0XHRcblx0XHRAUXVhbGl0eVNlc3N0aW5nTWFza19MYW5kc2NhcGUucm90YXRpb249OTBcblx0XHRAUXVhbGl0eVNlc3N0aW5nTWFza19MYW5kc2NhcGUueD0tMTQ2XG5cdFx0QFF1YWxpdHlTZXNzdGluZ01hc2tfTGFuZHNjYXBlLnk9MTQ2LUBvcHRpb25zLm9yaV9ZWVxuXG5cblxuXG5cdFx0QENvbnRyb2xNYXNrLmJyaW5nVG9Gcm9udCgpXG5cdFx0QENvbnRyb2xNYXNrLm5hbWU9XCJMYXllclBsYXllck1hc2tcIlxuXHRcdEBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJVbkZ1bGxTY3JlZW5fQ2hhbm5lbFBsYXllclwiKVswXS52aXNpYmxlPWZhbHNlXG5cdFx0bnVtbGF5ZXI9QENvbnRyb2xNYXNrLnN1YkxheWVyc0J5TmFtZShcIkJpdFJhdGVfQ2hhbm5lbFBsYXllclwiKVswXS5zdWJMYXllcnNCeU5hbWUoXCJiaXRyYXRlbnVtXCIpWzBdXG5cdFx0bnVtbGF5ZXIudmlzaWJsZT1mYWxzZVxuXHRcdHRleHROdW09bmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogXCJ7c3BlZWR9bWJwc1wiXG5cdFx0XHR4Om51bWxheWVyLnhcblx0XHRcdHk6bnVtbGF5ZXIueVxuXHRcdFx0cGFyZW50Om51bWxheWVyLnBhcmVudFxuXHRcdFx0Zm9udFNpemU6MTBcblx0XHRcdGNvbG9yOlwiI0FBQUFBQVwiXG5cdFx0dGV4dE51bS50ZW1wbGF0ZUZvcm1hdHRlciA9IFxuXHRcdFx0c3BlZWQ6KHZhbHVlKS0+XG5cdFx0XHRcdFV0aWxzLnJvdW5kKHZhbHVlLDApXG5cdFx0VXRpbHMuaW50ZXJ2YWwgMiwtPlxuXHRcdFx0dGV4dE51bS5hbmltYXRlXG5cdFx0XHRcdHRlbXBsYXRlOlxuXHRcdFx0XHRcdHNwZWVkOlV0aWxzLnJhbmRvbU51bWJlcig3MCw5MClcblx0XHRcblx0QGRlZmluZSAnZG9pc3JvdGF0ZWQnLFxuXHRcdGdldDogLT4gXG5cdFx0XHRAb3B0aW9ucy5pc3JvdGF0ZWRcdFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBvcHRpb25zLmlzcm90YXRlZCA9IHZhbHVlXG5cdEluaXRpYWxFdmVudDogLT5cdFx0XG5cdFx0Iy0tLVBsYXlCVE4gTGFuZHNjYXBlXG5cdFx0cGxheUJ0bl9sYW5kPUBDb250cm9sTWFza19MYW5kc2NhcGUuc3ViTGF5ZXJzQnlOYW1lKFwiUGxheUJUTl9DaGFubmVsUGxheWVyTGFuZHNjYXBlXCIpWzBdXG5cdFx0cGxheUJ0bl9wb3J0PUBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJQbGF5QlROX0NoYW5uZWxQbGF5ZXJcIilbMF1cblx0XHRkZXZpY2VIaW50QlROX2xhbmQ9QENvbnRyb2xNYXNrX0xhbmRzY2FwZS5zdWJMYXllcnNCeU5hbWUoXCJEZXZpY2VTdXBwb3J0X0xhbmRzY2FwZUNoYW5uZWxcIilbMF1cblx0XHRzZXR0aW5nQnRuX2xhbmQ9QENvbnRyb2xNYXNrX0xhbmRzY2FwZS5zdWJMYXllcnNCeU5hbWUoXCJTZXR0aW5nX0NoYW5uZWxQbGF5ZXJMYW5kc2NhcGVcIilbMF1cblx0XHRkZXZpY2VIaW50QnRuPUBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJTY3JlZW5TdXBwb3J0X1BvcnRDaGFubmVsXCIpWzBdXG5cblxuXG5cblx0XHRcblx0XHRwbGF5QnRuX2xhbmQuc3RhdGVzLlBsYXk9XG5cdFx0XHRvcGFjaXR5OjFcblx0XHRwbGF5QnRuX2xhbmQuc3RhdGVzLlBhdXNlPVxuXHRcdFx0b3BhY2l0eToxXG5cdFx0cGxheUJ0bl9wb3J0LnN0YXRlcy5QbGF5PVxuXHRcdFx0b3BhY2l0eToxXG5cdFx0cGxheUJ0bl9wb3J0LnN0YXRlcy5QYXVzZT1cblx0XHRcdG9wYWNpdHk6MVx0XHRcdFxuXHRcdHBsYXlCdG5fbGFuZC5vbiBFdmVudHMuU3RhdGVXaWxsU3dpdGNoLChmcm9tLCB0bywgc3RhdGVzKS0+XG5cdFx0XHRpZiB0bz09XCJQYXVzZVwiXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiUGxheUJUTl9DaGFubmVsUGxheWVyTGFuZHNjYXBlX1N0YXRlX1BsYXlcIilbMF0udmlzaWJsZT10cnVlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiUGxheUJUTl9DaGFubmVsUGxheWVyTGFuZHNjYXBlX1N0YXRlX1BhdXNlXCIpWzBdLnZpc2libGU9ZmFsc2Vcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5wYXVzZSgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiUGxheUJUTl9DaGFubmVsUGxheWVyTGFuZHNjYXBlX1N0YXRlX1BsYXlcIilbMF0udmlzaWJsZT1mYWxzZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlBsYXlCVE5fQ2hhbm5lbFBsYXllckxhbmRzY2FwZV9TdGF0ZV9QYXVzZVwiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5wbGF5KClcblx0XHRwbGF5QnRuX2xhbmQuc3RhdGVTd2l0Y2goXCJQYXVzZVwiKVxuXHRcdHBsYXlCdG5fbGFuZC5vbiBFdmVudHMuQ2xpY2ssLT5cblx0XHRcdHRoaXMuc3RhdGVDeWNsZShcIlBsYXlcIixcIlBhdXNlXCIpXG5cdFx0XHQjcGxheUJ0bl9wb3J0LnN0YXRlQ3ljbGUoXCJQbGF5XCIsXCJQYXVzZVwiKVxuXHRcdCMtLS1QbGF5QlROIExhbmRzY2FwZSBFbmRcblx0XHQjLS0tUGxheUJUTiBcblx0XHRcblxuXHRcdHBsYXlCdG5fcG9ydC5vbiBFdmVudHMuU3RhdGVXaWxsU3dpdGNoLChmcm9tLCB0bywgc3RhdGVzKS0+XG5cdFx0XHRpZiB0bz09XCJQYXVzZVwiXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiQ29udGludWVfQ2hhbm5lbFBsYXllclwiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJQYXVzZV9DaGFubmVsUGxheWVyXCIpWzBdLnZpc2libGU9ZmFsc2Vcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5wYXVzZSgpXG5cblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJDb250aW51ZV9DaGFubmVsUGxheWVyXCIpWzBdLnZpc2libGU9ZmFsc2Vcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJQYXVzZV9DaGFubmVsUGxheWVyXCIpWzBdLnZpc2libGU9dHJ1ZVxuXHRcdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF0ucGxheWVyLnBsYXkoKVxuXG5cdFx0cGxheUJ0bl9wb3J0LnN0YXRlU3dpdGNoKFwiUGF1c2VcIilcblx0XHRwbGF5QnRuX3BvcnQub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnN0YXRlQ3ljbGUoXCJQbGF5XCIsXCJQYXVzZVwiKVxuXHRcdFx0I3BsYXlCdG5fbGFuZC5zdGF0ZUN5Y2xlKFwiUGxheVwiLFwiUGF1c2VcIilcblx0XHQjLS0tUGxheUJUTiAgRW5kXG5cblx0XHQjLS0tWm9vbSBMYW5kc2NhcGVcblx0XHR6b29tQnRuX2xhbmQ9QENvbnRyb2xNYXNrX0xhbmRzY2FwZS5zdWJMYXllcnNCeU5hbWUoXCJab29tX0NoYW5uZWxQbGF5ZXJMYW5kc2NhcGVcIilbMF1cblx0XHRcblx0XHR6b29tQnRuX2xhbmQuc3RhdGVzLlpvb21Jbj1cblx0XHRcdG9wYWNpdHk6MVxuXHRcdHpvb21CdG5fbGFuZC5zdGF0ZXMuWm9vbU91dD1cblx0XHRcdG9wYWNpdHk6MVxuXHRcdHpvb21CdG5fbGFuZC5vbiBFdmVudHMuU3RhdGVXaWxsU3dpdGNoLChmcm9tLCB0bywgc3RhdGVzKS0+XG5cdFx0XHRpZiB0bz09XCJab29tSW5cIlxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlpvb21fQ2hhbm5lbFBsYXllckxhbmRzY2FwZV9TdGF0ZV9ab29tSW5cIilbMF0udmlzaWJsZT1mYWxzZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlpvb21fQ2hhbm5lbFBsYXllckxhbmRzY2FwZV9TdGF0ZV9ab29tT3V0XCIpWzBdLnZpc2libGU9dHJ1ZVxuXHRcdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF0uc2NhbGU9MS4zMzNcblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlpvb21fQ2hhbm5lbFBsYXllckxhbmRzY2FwZV9TdGF0ZV9ab29tSW5cIilbMF0udmlzaWJsZT10cnVlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiWm9vbV9DaGFubmVsUGxheWVyTGFuZHNjYXBlX1N0YXRlX1pvb21PdXRcIilbMF0udmlzaWJsZT1mYWxzZVxuXHRcdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF0uc2NhbGU9MVx0XHRcdFxuXHRcdHpvb21CdG5fbGFuZC5zdGF0ZVN3aXRjaChcIlpvb21PdXRcIilcblx0XHR6b29tQnRuX2xhbmQub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnN0YXRlQ3ljbGUoXCJab29tSW5cIixcIlpvb21PdXRcIilcblx0XHQjLS0tWm9vbSBMYW5kc2NhcGUgRW5kXG5cblx0XHQjLS0tLS1ab29tXG5cdFx0em9vbUJ0bl9wb3J0PUBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJab29tX0NoYW5uZWxQbGF5ZXJcIilbMF1cblx0XHR6b29tQnRuX3BvcnQuc3RhdGVzLlpvb21Jbj1cblx0XHRcdG9wYWNpdHk6MVxuXHRcdHpvb21CdG5fcG9ydC5zdGF0ZXMuWm9vbU91dD1cblx0XHRcdG9wYWNpdHk6MVxuXHRcdFxuXHRcdHpvb21CdG5fcG9ydC5vbiBFdmVudHMuU3RhdGVXaWxsU3dpdGNoLChmcm9tLCB0bywgc3RhdGVzKS0+XG5cdFx0XHRpZiB0bz09XCJab29tSW5cIlxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlpvb21JTl9DaGFubmVsUGxheWVyXCIpWzBdLnZpc2libGU9ZmFsc2Vcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJab29tT1VUX0NoYW5uZWxQbGF5ZXJcIilbMF0udmlzaWJsZT10cnVlXG5cdFx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJDaGFubmVsUGxheWVyU21hbGxWaWRlb1wiKVswXS5zY2FsZT0xLjMzM1xuXHRcdFx0XHQj5YGH6Kit54K6aVBob25lWFMs5YmH5pS+5aSnMS4yMTc15YCNXG5cblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJab29tSU5fQ2hhbm5lbFBsYXllclwiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJab29tT1VUX0NoYW5uZWxQbGF5ZXJcIilbMF0udmlzaWJsZT1mYWxzZVxuXHRcdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF0uc2NhbGU9MVx0XHRcdFxuXHRcdHpvb21CdG5fcG9ydC5zdGF0ZVN3aXRjaChcIlpvb21PdXRcIilcblx0XHR6b29tQnRuX3BvcnQub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnN0YXRlQ3ljbGUoXCJab29tSW5cIixcIlpvb21PdXRcIilcblx0XHQjLS0tLVx0XG5cblx0XHQjLS0tTXV0ZSBMYW5kc2NhcGVcblx0XHRtdXRlQnRuX2xhbmQ9QENvbnRyb2xNYXNrX0xhbmRzY2FwZS5zdWJMYXllcnNCeU5hbWUoXCJNdXRlX0NoYW5uZWxQbGF5ZXJMYW5kc2NhcGVcIilbMF1cblx0XHRtdXRlQnRuX2xhbmQuc3RhdGVzLk11dGU9XG5cdFx0XHRvcGFjaXR5OjFcblx0XHRtdXRlQnRuX2xhbmQuc3RhdGVzLlVuTXV0ZT1cblx0XHRcdG9wYWNpdHk6MVxuXHRcdG11dGVCdG5fbGFuZC5vbiBFdmVudHMuU3RhdGVXaWxsU3dpdGNoLChmcm9tLCB0bywgc3RhdGVzKS0+XG5cdFx0XHRpZiB0bz09XCJNdXRlXCJcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJNdXRlX0NoYW5uZWxQbGF5ZXJMYW5kc2NhcGVfU3RhdGVfTXV0ZVwiKVswXS52aXNpYmxlPWZhbHNlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiTXV0ZV9DaGFubmVsUGxheWVyTGFuZHNjYXBlX1N0YXRlX1VuTXV0ZVwiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5tdXRlZD10cnVlXG5cdFx0XHRcblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJNdXRlX0NoYW5uZWxQbGF5ZXJMYW5kc2NhcGVfU3RhdGVfTXV0ZVwiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJNdXRlX0NoYW5uZWxQbGF5ZXJMYW5kc2NhcGVfU3RhdGVfVW5NdXRlXCIpWzBdLnZpc2libGU9ZmFsc2Vcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5tdXRlZD1mYWxzZVx0XHRcdFxuXHRcdG11dGVCdG5fbGFuZC5zdGF0ZVN3aXRjaChcIlVuTXV0ZVwiKVxuXHRcdG11dGVCdG5fbGFuZC5vbiBFdmVudHMuQ2xpY2ssLT5cblx0XHRcdHRoaXMuc3RhdGVDeWNsZShcIk11dGVcIixcIlVuTXV0ZVwiKVxuXHRcdCMtLS1NdXRlIExhbmRzY2FwZSBFbmRcblx0XHQjLS0tTXV0ZSBQb3J0cmFpdFxuXHRcdG11dGVCdG5fcG9ydD1AQ29udHJvbE1hc2suc3ViTGF5ZXJzQnlOYW1lKFwiTXV0ZUJUTkNvbnRyb2xfQ2hhbm5lbFBsYXllclwiKVswXVxuXHRcdG11dGVCdG5fcG9ydC5zdGF0ZXMuTXV0ZT1cblx0XHRcdG9wYWNpdHk6MVxuXHRcdG11dGVCdG5fcG9ydC5zdGF0ZXMuVW5NdXRlPVxuXHRcdFx0b3BhY2l0eToxXG5cdFx0bXV0ZUJ0bl9wb3J0Lm9uIEV2ZW50cy5TdGF0ZVdpbGxTd2l0Y2gsKGZyb20sIHRvLCBzdGF0ZXMpLT5cblx0XHRcdGlmIHRvPT1cIk11dGVcIlxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIk11dGVDb250cm9sX0NoYW5uZWxQbGF5ZXJcIilbMF0udmlzaWJsZT1mYWxzZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlVOTXV0ZUNvbnRyb2xfQ2hhbm5lbFBsYXllclwiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5tdXRlZD10cnVlXG5cdFx0XHRcdFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIk11dGVDb250cm9sX0NoYW5uZWxQbGF5ZXJcIilbMF0udmlzaWJsZT10cnVlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiVU5NdXRlQ29udHJvbF9DaGFubmVsUGxheWVyXCIpWzBdLnZpc2libGU9ZmFsc2Vcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5tdXRlZD1mYWxzZVx0XHRcdFxuXHRcdG11dGVCdG5fcG9ydC5zdGF0ZVN3aXRjaChcIlVuTXV0ZVwiKVxuXHRcdG11dGVCdG5fcG9ydC5vbiBFdmVudHMuQ2xpY2ssLT5cblx0XHRcdHRoaXMuc3RhdGVDeWNsZShcIk11dGVcIixcIlVuTXV0ZVwiKVxuXHRcdFxuXG5cdFx0QFF1YWxpdHlTZXNzdGluZ01hc2sub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnZpc2libGU9ZmFsc2Vcblx0XHRcdHRoaXMucGFyZW50LndpZHRoPTM3NVxuXHRcdFx0dGhpcy5wYXJlbnQuaGVpZ2h0PTIxMFxuXHRcdEBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJTZXR0aW5nX0NoYW5uZWxQbGF5ZXJcIilbMF0ub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiUXVhbGl0eVNlc3N0aW5nTWFza1wiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJRdWFsaXR5U2Vzc3RpbmdNYXNrXCIpWzBdLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcblx0XHRcdHRoaXMucGFyZW50LnBhcmVudC53aWR0aD0zNzVcblx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5oZWlnaHQ9NjY3XG5cdFx0QERldmljZVN1cHBvcnRNYXNrX0xhbmRzY2FwZS5vbiBFdmVudHMuQ2xpY2ssLT5cblx0XHRcdHRoaXMudmlzaWJsZT1mYWxzZVxuXG5cdFx0ZGV2aWNlSGludEJUTl9sYW5kLm9uIEV2ZW50cy5DbGljaywtPlxuXHRcdFx0XG5cdFx0XHQj5Lul5LiL55qERGV2aWNlU3VwcG9ydE1hc2vngrrlnKjml6nlhYhpbml0aWFs55qE5pmC5YCZ55qEbmFtZVxuXHRcdFx0Y29udHJvbE1hc2tfTGFuZHNjYXBlPXRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJjb250cm9sTWFza19MYW5kc2NhcGVcIilbMF1cblx0XHRcdGxheWVyRGV2aWNlTGFuZD10aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiRGV2aWNlU3VwcG9ydE1hc2tfTGFuZHNjYXBlXCIpWzBdXG5cdFx0XHRsYXllckRldmljZUxhbmQudmlzaWJsZT10cnVlXG5cdFx0XHRsYXllckRldmljZUxhbmQuYnJpbmdUb0Zyb250KClcblx0XHRcdHRoaXMucGFyZW50LnBhcmVudC53aWR0aD0zNzVcblx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5oZWlnaHQ9NjY3XG5cdFx0XHRsYXllckRldmljZUxhbmQud2lkdGg9NjY3XG5cdFx0XHRsYXllckRldmljZUxhbmQuaGVpZ2h0PTM3NVx0XHRcdFxuXHRcdFx0bGF5ZXJEZXZpY2VMYW5kLnJvdGF0aW9uPTkwXG5cdFx0XHRsYXllckRldmljZUxhbmQueD0tMTQ2XG5cdFx0XHRsYXllckRldmljZUxhbmQueT0xNDYtY29udHJvbE1hc2tfTGFuZHNjYXBlLm9mZnNldFlZXHRcdFx0XG5cdFx0XHRcblx0XHRcdCMgRGV2aWNlU3VwcG9ydE1hc2tfTGFuZHNjYXBlXG5cdFx0QFF1YWxpdHlTZXNzdGluZ01hc2tfTGFuZHNjYXBlLm9uIEV2ZW50cy5DbGljaywtPlxuXHRcdFx0dGhpcy52aXNpYmxlPWZhbHNlXG5cblx0XHRzZXR0aW5nQnRuX2xhbmQub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHRxdWFsaXR5U2Vzc3RpbmdNYXNrX0xhbmRzY2FwZT10aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiUXVhbGl0eVNlc3N0aW5nTWFza19MYW5kc2NhcGVcIilbMF1cblx0XHRcdHF1YWxpdHlTZXNzdGluZ01hc2tfTGFuZHNjYXBlLnZpc2libGU9dHJ1ZVxuXHRcdFx0cXVhbGl0eVNlc3N0aW5nTWFza19MYW5kc2NhcGUuYnJpbmdUb0Zyb250KClcblxuXHRcdFx0XG5cdFx0QERldmljZVN1cHBvcnRNYXNrLm9uIEV2ZW50cy5DbGljaywtPlxuXHRcdFx0dGhpcy52aXNpYmxlPWZhbHNlXG5cdFx0XHR0aGlzLnBhcmVudC53aWR0aD0zNzVcblx0XHRcdHRoaXMucGFyZW50LmhlaWdodD0yMTBcblx0XHRcdCN0aGlzLnBhcmVudC5wYXJlbnQg5piv5oyHLS0+Q2hhbm5lbFBsYXllckNvbnRyb2xcblx0XHRcdHRoaXMucGFyZW50LmNsaXA9ZmFsc2Vcblx0XHRcdFxuXHRcdGRldmljZUhpbnRCdG4ub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHQj5Lul5LiL55qERGV2aWNlU3VwcG9ydE1hc2vngrrlnKjml6nlhYhpbml0aWFs55qE5pmC5YCZ55qEbmFtZVxuXHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkRldmljZVN1cHBvcnRNYXNrXCIpWzBdLnZpc2libGU9dHJ1ZVxuXHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkRldmljZVN1cHBvcnRNYXNrXCIpWzBdLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQud2lkdGg9Mzc1XG5cdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuaGVpZ2h0PTY2N1xuXHRcdFx0Y29udHJvbE1hc2tfTGFuZHNjYXBlPXRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJjb250cm9sTWFza19MYW5kc2NhcGVcIilbMF1cblx0XHRcdGlmIE1hdGguYWJzKGNvbnRyb2xNYXNrX0xhbmRzY2FwZS5vZmZzZXRZWSk+MFxuXHRcdFx0XHQjcHJpbnQgXCLmnInkvY3np7vvvIzvvIzkuJTlm6DngrropoHlhajonqLluZXopoHmiormraTlhYPku7bnmoRjbGlw6Kit5oiQZmFsc2VcIlxuXHRcdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuY2xpcD1mYWxzZVxuXHRcdEBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJGdWxsc2NyZWVuX0NoYW5uZWxQbGF5ZXJcIilbMF0ub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHQj6KaB5om+5Yiw5rC05bmz55Wr6Z2i5LiL55qE5o6n5Yi26aCF77yM5Lim5oqK54uA5oWL5pS56K6K77yM5YWx5pyJ5LiJ5YCL77ya6IGy6Z+z44CB5pKt5pS+44CB5pS+5aSnXG5cdFx0XHQj5Lmf6KaB5om+5Yiw5Z6C55u055qE77yM54S25b6M5oqK5Z6C55u055qE54uA5oWLYXNzaWdu57Wm5rC05bmz55qEXG5cdFx0XHRjb250cm9sTWFza19MYW5kc2NhcGU9dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcImNvbnRyb2xNYXNrX0xhbmRzY2FwZVwiKVswXVxuXHRcdFx0aWYgTWF0aC5hYnMoY29udHJvbE1hc2tfTGFuZHNjYXBlLm9mZnNldFlZKT4wXG5cdFx0XHRcdCNwcmludCBcIuacieS9jeenu++8jO+8jOS4lOWboOeCuuimgeWFqOieouW5leimgeaKiuatpOWFg+S7tueahGNsaXDoqK3miJBmYWxzZVwiXG5cdFx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5jbGlwPWZhbHNlXG5cblxuXHRcdFx0XG5cdFx0XHRwbGF5QnRuX2xhbmQ9Y29udHJvbE1hc2tfTGFuZHNjYXBlLnN1YkxheWVyc0J5TmFtZShcIlBsYXlCVE5fQ2hhbm5lbFBsYXllckxhbmRzY2FwZVwiKVswXVxuXHRcdFx0cGxheUJ0bl9wb3J0PXRoaXMucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIlBsYXlCVE5fQ2hhbm5lbFBsYXllclwiKVswXVxuXHRcdFx0cGxheUJ0bl9sYW5kLnN0YXRlU3dpdGNoKHBsYXlCdG5fcG9ydC5zdGF0ZXMuY3VycmVudC5uYW1lKVxuXG5cblx0XHRcdG11dGVCdG5fbGFuZD1jb250cm9sTWFza19MYW5kc2NhcGUuc3ViTGF5ZXJzQnlOYW1lKFwiTXV0ZV9DaGFubmVsUGxheWVyTGFuZHNjYXBlXCIpWzBdXG5cdFx0XHRtdXRlQnRuX3BvcnQ9dGhpcy5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiTXV0ZUJUTkNvbnRyb2xfQ2hhbm5lbFBsYXllclwiKVswXVxuXHRcdFx0bXV0ZUJ0bl9sYW5kLnN0YXRlU3dpdGNoKG11dGVCdG5fcG9ydC5zdGF0ZXMuY3VycmVudC5uYW1lKVxuXHRcdFx0XG5cblx0XHRcdHpvb21CdG5fbGFuZD1jb250cm9sTWFza19MYW5kc2NhcGUuc3ViTGF5ZXJzQnlOYW1lKFwiWm9vbV9DaGFubmVsUGxheWVyTGFuZHNjYXBlXCIpWzBdXG5cdFx0XHR6b29tQnRuX3BvcnQ9dGhpcy5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiWm9vbV9DaGFubmVsUGxheWVyXCIpWzBdXG5cdFx0XHR6b29tQnRuX2xhbmQuc3RhdGVTd2l0Y2goem9vbUJ0bl9wb3J0LnN0YXRlcy5jdXJyZW50Lm5hbWUpXG5cdFx0XHRcblx0XHRcdFxuXHRcdFx0VXRpbHMuZGVsYXkgMywtPlxuXHRcdFx0XHRjb250cm9sTWFza19MYW5kc2NhcGUuYW5pbWF0ZVxuXHRcdFx0XHRcdG9wYWNpdHk6MFxuXHRcdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0XHR0aW1lOjRcblx0XHRcdFx0XHRcdGN1cnZlOlwiZWFzeS1pblwiXG5cblxuXG5cdFx0XHRcblx0XHRcdEBkb2lzcm90YXRlZD1cIllcIlxuXHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LndpZHRoPTM3NVxuXHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LmhlaWdodD02NjdcblxuXG5cdFx0XHRwbGF5ZXI9IHRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJDaGFubmVsUGxheWVyU21hbGxWaWRlb1wiKVswXVxuXHRcdFx0Y29udHJvbE1hc2tfTGFuZHNjYXBlPXRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJjb250cm9sTWFza19MYW5kc2NhcGVcIilbMF1cblx0XHRcdGNvbnRyb2xNYXNrX0xhbmRzY2FwZS5icmluZ1RvRnJvbnQoKVxuXHRcdFx0cGxheWVyLndpZHRoPTY2N1xuXHRcdFx0cGxheWVyLmhlaWdodD0zNzVcdFx0XHRcblx0XHRcdHBsYXllci5yb3RhdGlvbj05MFxuXHRcdFx0I3ByaW50IGNvbnRyb2xNYXNrX0xhbmRzY2FwZS5vZmZzZXRZWVxuXG5cblxuXHRcdFx0cGxheWVyLng9LTE0NlxuXHRcdFx0cGxheWVyLnk9MTQ2LWNvbnRyb2xNYXNrX0xhbmRzY2FwZS5vZmZzZXRZWVxuXHRcdFx0dGhpcy5wYXJlbnQudmlzaWJsZT1mYWxzZVxuXHRcdFx0Y29udHJvbE1hc2tfTGFuZHNjYXBlLnZpc2libGU9dHJ1ZVxuXG5cdFx0XHRjb250cm9sTWFza19MYW5kc2NhcGUucm90YXRpb249OTBcblx0XHRcdGNvbnRyb2xNYXNrX0xhbmRzY2FwZS54PS0xNDZcblx0XHRcdGNvbnRyb2xNYXNrX0xhbmRzY2FwZS55PTE0Ni1jb250cm9sTWFza19MYW5kc2NhcGUub2Zmc2V0WVlcblxuXHRcdEBDb250cm9sTWFza19MYW5kc2NhcGUuc3ViTGF5ZXJzQnlOYW1lKFwiRnVsbFNjcmVlbl9DaGFubmVsUGxheWVyTGFuZHNjYXBlXCIpWzBdLm9uIEV2ZW50cy5DbGljaywtPlxuXHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LmNsaXA9dHJ1ZVxuXHRcdFx0I3RoaXMucGFyZW50LnBhcmVudCDmmK/mjIctLT5DaGFubmVsUGxheWVyQ29udHJvbFxuXHRcdFx0Y29udHJvbE1hc2s9dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkxheWVyUGxheWVyTWFza1wiKVswXVxuXHRcdFx0Y29udHJvbE1hc2suYnJpbmdUb0Zyb250KClcblx0XHRcdGNvbnRyb2xNYXNrLnZpc2libGU9dHJ1ZVxuXHRcdFx0Y29udHJvbE1hc2tfTGFuZHNjYXBlPXRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJjb250cm9sTWFza19MYW5kc2NhcGVcIilbMF1cblx0XHRcdGNvbnRyb2xNYXNrX0xhbmRzY2FwZS52aXNpYmxlPWZhbHNlXG5cblx0XHRcdCN0aGlzLnZpc2libGU9ZmFsc2Vcblx0XHRcdHRoaXMucGFyZW50LnBhcmVudC53aWR0aD0zNzVcblx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5oZWlnaHQ9MjEwXG5cdFx0XHRwbGF5ZXI9IHRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJDaGFubmVsUGxheWVyU21hbGxWaWRlb1wiKVswXVxuXHRcdFx0cGxheWVyLndpZHRoPTM3NVxuXHRcdFx0cGxheWVyLmhlaWdodD0yMTBcdFx0XHRcblx0XHRcdHBsYXllci5yb3RhdGlvbj0wXG5cdFx0XHRwbGF5ZXIueD0wXG5cdFx0XHRwbGF5ZXIueT0wXG5cblx0Um90YXRpb25CYWNrOiAtPlxuXHRcdEBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJVbkZ1bGxTY3JlZW5fQ2hhbm5lbFBsYXllclwiKVswXS52aXNpYmxlPWZhbHNlXG5cdFx0QENvbnRyb2xNYXNrLnN1YkxheWVyc0J5TmFtZShcIkZ1bGxzY3JlZW5fQ2hhbm5lbFBsYXllclwiKVswXS52aXNpYmxlPXRydWVcblx0XHRwbGF5ZXI9QC5zdWJMYXllcnNCeU5hbWUoXCJDaGFubmVsUGxheWVyU21hbGxWaWRlb1wiKVswXVxuXHRcdEByb3RhdGlvbj0wXG5cdFx0QHNjYWxlPTFcblx0XHRASXNSb3RhdGVkPWZhbHNlXG5cdFx0QHg9QC5vcmlfWFhcblx0XHRAeT1ALm9yaV9ZWVxuXHROb3dTdGF0ZTogLT5cblx0XHRAZG9pc3JvdGF0ZWRcblxuXHRTVE9QOiAtPlxuXHRcdCPlnKjpoIHpnaLkuIrmjInkuItiYWNr77yM5pyD6Ke455m85q2k5YWD5Lu255qE5LqL5Lu244CC6KaB6KiY5b6X6aCG5L6/6L2J5ZCRXG5cdFx0IFxuXHRcdGNvbnRyb2xNYXNrPUAuc3ViTGF5ZXJzQnlOYW1lKFwiTGF5ZXJQbGF5ZXJNYXNrXCIpWzBdXG5cdFx0Y29udHJvbE1hc2suYnJpbmdUb0Zyb250KClcblx0XHRjb250cm9sTWFzay52aXNpYmxlPXRydWVcblx0XHRjb250cm9sTWFza19MYW5kc2NhcGU9QC5zdWJMYXllcnNCeU5hbWUoXCJjb250cm9sTWFza19MYW5kc2NhcGVcIilbMF1cblx0XHRjb250cm9sTWFza19MYW5kc2NhcGUudmlzaWJsZT1mYWxzZVxuXG5cdFx0dGhpcy5wYXJlbnQud2lkdGg9Mzc1XG5cdFx0dGhpcy5wYXJlbnQuaGVpZ2h0PTIxMFxuXHRcdCN5ZXNcblx0XHRwbGF5ZXI9QC5zdWJMYXllcnNCeU5hbWUoXCJDaGFubmVsUGxheWVyU21hbGxWaWRlb1wiKVswXVxuXHRcdFxuXHRcdHBsYXllci53aWR0aD0zNzVcblx0XHRwbGF5ZXIuaGVpZ2h0PTIxMFx0XHRcdFxuXHRcdHBsYXllci5yb3RhdGlvbj0wXG5cdFx0cGxheWVyLng9MFxuXHRcdHBsYXllci55PTBcdFx0XG5cdFx0XG5cdFx0cGxheWVyLnBsYXllci5wYXVzZSgpXG5cblx0U2hvdzogLT5cblx0XHRjaGlsZE1hc2s9QENvbnRyb2xNYXNrXG5cdFx0QENvbnRyb2xNYXNrLnN1YkxheWVyc0J5TmFtZShcIlBsYXlCVE5fQ2hhbm5lbFBsYXllclwiKVswXS5zdGF0ZVN3aXRjaChcIlBsYXlcIilcblxuXHRcdCNwbGF5ZXI9QC5zdWJMYXllcnNCeU5hbWUoXCJDaGFubmVsUGxheWVyU21hbGxWaWRlb1wiKVswXVxuXHRcdHRoaXMudmlzaWJsZT10cnVlXG5cdFx0dGhpcy54PXRoaXMub3JpX1hYXG5cdFx0dGhpcy55PXRoaXMub3JpX1lZXG5cdFx0VXRpbHMuZGVsYXkgMywtPlxuXHRcdFx0Y2hpbGRNYXNrLmFuaW1hdGVcblx0XHRcdFx0b3BhY2l0eTowXG5cdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0dGltZTo0XG5cdFx0XHRcdFx0Y3VydmU6XCJlYXN5LWluXCJcblx0XHQjcGxheWVyLnBsYXllci5jdXJyZW50VGltZT0wXG5cdFx0I3BsYXllci5wbGF5ZXIucGxheSgpXG5cdENsaWNrTWU6LT5cblx0XHRcblx0XHRob3JNYXNrPUBDb250cm9sTWFza19MYW5kc2NhcGVcblx0XHRob3JNYXNrLmFuaW1hdGVcblx0XHRcdFx0b3BhY2l0eToxXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOjAuMlxuXHRcdFx0XHRjdXJ2ZTpcImVhc3ktaW5cIlxuXHRcdFV0aWxzLmRlbGF5IDMsLT5cblx0XHRcdGhvck1hc2suYW5pbWF0ZVxuXHRcdFx0XHRvcGFjaXR5OjBcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOjRcblx0XHRcdFx0XHRjdXJ2ZTpcImVhc3ktaW5cIlxuXG5cdFx0Y2hpbGRNYXNrPUBDb250cm9sTWFza1xuXHRcdFxuXHRcdGNoaWxkTWFzay5hbmltYXRlXG5cdFx0XHRcdG9wYWNpdHk6MVxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6XCJlYXN5LWluXCJcblx0XHRVdGlscy5kZWxheSAzLC0+XG5cdFx0XHRjaGlsZE1hc2suYW5pbWF0ZVxuXHRcdFx0XHRvcGFjaXR5OjBcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOjRcblx0XHRcdFx0XHRjdXJ2ZTpcImVhc3ktaW5cIiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBR0FBO0FERUEsSUFBQTs7O0FBQU0sTUFBTSxDQUFDOzs7b0JBQ1osTUFBQSxHQUFPOztvQkFDUCxNQUFBLEdBQU87O0VBQ00saUJBQUMsT0FBRDtBQUNaLFFBQUE7SUFEYSxJQUFDLENBQUEsNEJBQUQsVUFBUzs7VUFDZCxDQUFDLFlBQWE7O0lBQ3RCLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxHQUFlO0lBQ2YsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULEdBQWdCOztXQUNSLENBQUMsU0FBVTs7O1dBQ1gsQ0FBQyxTQUFVOztJQUNuQixJQUFDLENBQUEsT0FBTyxDQUFDLGVBQVQsR0FBeUI7O1dBQ2pCLENBQUMsZUFBZ0I7OztXQUVqQixDQUFDLE9BQVE7O0lBQ2pCLElBQUMsQ0FBQSxXQUFELEdBQWEsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUN0QixJQUFDLENBQUEscUJBQUQsR0FBdUIsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUNoQyxJQUFDLENBQUEsbUJBQUQsR0FBcUIsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUM5QixJQUFDLENBQUEsNkJBQUQsR0FBK0IsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUN4QyxJQUFDLENBQUEsaUJBQUQsR0FBbUIsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUM1QixJQUFDLENBQUEsMkJBQUQsR0FBNkIsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUV0QyxJQUFDLENBQUEsS0FBRCxHQUFPLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFHaEIsSUFBQyxDQUFBLE9BQUQsR0FBUyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQ2xCLElBQUMsQ0FBQSxxQkFBcUIsQ0FBQyxRQUF2QixHQUFnQyxJQUFDLENBQUE7SUFDakMsSUFBQyxDQUFBLFdBQVcsQ0FBQyxRQUFiLEdBQXNCLElBQUMsQ0FBQTtJQUV2Qix5Q0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxtQkFBbUIsQ0FBQyxNQUFyQixHQUE0QjtJQUM1QixJQUFDLENBQUEsbUJBQW1CLENBQUMsQ0FBckIsR0FBdUIsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUNoQyxJQUFDLENBQUEsbUJBQW1CLENBQUMsQ0FBckIsR0FBdUIsQ0FBQyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQ2pDLElBQUMsQ0FBQSxtQkFBbUIsQ0FBQyxPQUFyQixHQUE2QjtJQUM3QixJQUFDLENBQUEsbUJBQW1CLENBQUMsSUFBckIsR0FBMEI7SUFDMUIsSUFBQyxDQUFDLElBQUYsR0FBTztJQUNQLElBQUMsQ0FBQyxPQUFGLENBQVUsSUFBQyxDQUFBLE9BQVg7SUFDQSxxQkFBQSxHQUEwQixJQUFBLFVBQUEsQ0FDekI7TUFBQSxLQUFBLEVBQU8sR0FBUDtNQUNBLE1BQUEsRUFBUSxHQURSO01BRUEsSUFBQSxFQUFLLHlCQUZMO01BR0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FIaEI7TUFJQSxNQUFBLEVBQVEsSUFKUjtLQUR5QjtJQU8xQixxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBN0IsR0FBa0M7SUFDbEMsZUFBQSxHQUFnQixJQUFDLENBQUEsT0FBTyxDQUFDO0lBQ3pCLElBQUMsQ0FBQSxXQUFXLENBQUMsTUFBYixHQUFvQjtJQUVwQixJQUFDLENBQUEscUJBQXFCLENBQUMsTUFBdkIsR0FBOEI7SUFDOUIsSUFBQyxDQUFBLHFCQUFxQixDQUFDLE9BQXZCLEdBQStCO0lBQy9CLElBQUMsQ0FBQSxxQkFBcUIsQ0FBQyxJQUF2QixHQUE0QjtJQUc1QixJQUFDLENBQUEsaUJBQWlCLENBQUMsTUFBbkIsR0FBMEI7SUFDMUIsSUFBQyxDQUFBLGlCQUFpQixDQUFDLENBQW5CLEdBQXFCLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDOUIsSUFBQyxDQUFBLGlCQUFpQixDQUFDLENBQW5CLEdBQXFCLENBQUMsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUMvQixJQUFDLENBQUEsaUJBQWlCLENBQUMsT0FBbkIsR0FBMkI7SUFDM0IsSUFBQyxDQUFBLGlCQUFpQixDQUFDLElBQW5CLEdBQXdCO0lBQ3hCLElBQUMsQ0FBQSwyQkFBMkIsQ0FBQyxNQUE3QixHQUFvQztJQUNwQyxJQUFDLENBQUEsMkJBQTJCLENBQUMsT0FBN0IsR0FBcUM7SUFDckMsSUFBQyxDQUFBLDJCQUEyQixDQUFDLElBQTdCLEdBQWtDO0lBQ2xDLElBQUMsQ0FBQSw2QkFBNkIsQ0FBQyxNQUEvQixHQUFzQztJQUN0QyxJQUFDLENBQUEsNkJBQTZCLENBQUMsT0FBL0IsR0FBdUM7SUFDdkMsSUFBQyxDQUFBLDZCQUE2QixDQUFDLElBQS9CLEdBQW9DO0lBQ3BDLElBQUMsQ0FBQSw2QkFBNkIsQ0FBQyxRQUEvQixHQUF3QztJQUN4QyxJQUFDLENBQUEsNkJBQTZCLENBQUMsQ0FBL0IsR0FBaUMsQ0FBQztJQUNsQyxJQUFDLENBQUEsNkJBQTZCLENBQUMsQ0FBL0IsR0FBaUMsR0FBQSxHQUFJLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFLOUMsSUFBQyxDQUFBLFdBQVcsQ0FBQyxZQUFiLENBQUE7SUFDQSxJQUFDLENBQUEsV0FBVyxDQUFDLElBQWIsR0FBa0I7SUFDbEIsSUFBQyxDQUFBLFdBQVcsQ0FBQyxlQUFiLENBQTZCLDRCQUE3QixDQUEyRCxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQTlELEdBQXNFO0lBQ3RFLFFBQUEsR0FBUyxJQUFDLENBQUEsV0FBVyxDQUFDLGVBQWIsQ0FBNkIsdUJBQTdCLENBQXNELENBQUEsQ0FBQSxDQUFFLENBQUMsZUFBekQsQ0FBeUUsWUFBekUsQ0FBdUYsQ0FBQSxDQUFBO0lBQ2hHLFFBQVEsQ0FBQyxPQUFULEdBQWlCO0lBQ2pCLE9BQUEsR0FBWSxJQUFBLFNBQUEsQ0FDWDtNQUFBLElBQUEsRUFBTSxhQUFOO01BQ0EsQ0FBQSxFQUFFLFFBQVEsQ0FBQyxDQURYO01BRUEsQ0FBQSxFQUFFLFFBQVEsQ0FBQyxDQUZYO01BR0EsTUFBQSxFQUFPLFFBQVEsQ0FBQyxNQUhoQjtNQUlBLFFBQUEsRUFBUyxFQUpUO01BS0EsS0FBQSxFQUFNLFNBTE47S0FEVztJQU9aLE9BQU8sQ0FBQyxpQkFBUixHQUNDO01BQUEsS0FBQSxFQUFNLFNBQUMsS0FBRDtlQUNMLEtBQUssQ0FBQyxLQUFOLENBQVksS0FBWixFQUFrQixDQUFsQjtNQURLLENBQU47O0lBRUQsS0FBSyxDQUFDLFFBQU4sQ0FBZSxDQUFmLEVBQWlCLFNBQUE7YUFDaEIsT0FBTyxDQUFDLE9BQVIsQ0FDQztRQUFBLFFBQUEsRUFDQztVQUFBLEtBQUEsRUFBTSxLQUFLLENBQUMsWUFBTixDQUFtQixFQUFuQixFQUFzQixFQUF0QixDQUFOO1NBREQ7T0FERDtJQURnQixDQUFqQjtFQWxGWTs7RUF1RmIsT0FBQyxDQUFBLE1BQUQsQ0FBUSxhQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUNKLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFETCxDQUFMO0lBRUEsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUNKLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxHQUFxQjtJQURqQixDQUZMO0dBREQ7O29CQUtBLFlBQUEsR0FBYyxTQUFBO0FBRWIsUUFBQTtJQUFBLFlBQUEsR0FBYSxJQUFDLENBQUEscUJBQXFCLENBQUMsZUFBdkIsQ0FBdUMsZ0NBQXZDLENBQXlFLENBQUEsQ0FBQTtJQUN0RixZQUFBLEdBQWEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxlQUFiLENBQTZCLHVCQUE3QixDQUFzRCxDQUFBLENBQUE7SUFDbkUsa0JBQUEsR0FBbUIsSUFBQyxDQUFBLHFCQUFxQixDQUFDLGVBQXZCLENBQXVDLGdDQUF2QyxDQUF5RSxDQUFBLENBQUE7SUFDNUYsZUFBQSxHQUFnQixJQUFDLENBQUEscUJBQXFCLENBQUMsZUFBdkIsQ0FBdUMsZ0NBQXZDLENBQXlFLENBQUEsQ0FBQTtJQUN6RixhQUFBLEdBQWMsSUFBQyxDQUFBLFdBQVcsQ0FBQyxlQUFiLENBQTZCLDJCQUE3QixDQUEwRCxDQUFBLENBQUE7SUFNeEUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFwQixHQUNDO01BQUEsT0FBQSxFQUFRLENBQVI7O0lBQ0QsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFwQixHQUNDO01BQUEsT0FBQSxFQUFRLENBQVI7O0lBQ0QsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFwQixHQUNDO01BQUEsT0FBQSxFQUFRLENBQVI7O0lBQ0QsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFwQixHQUNDO01BQUEsT0FBQSxFQUFRLENBQVI7O0lBQ0QsWUFBWSxDQUFDLEVBQWIsQ0FBZ0IsTUFBTSxDQUFDLGVBQXZCLEVBQXVDLFNBQUMsSUFBRCxFQUFPLEVBQVAsRUFBVyxNQUFYO01BQ3RDLElBQUcsRUFBQSxLQUFJLE9BQVA7UUFDQyxJQUFJLENBQUMsZUFBTCxDQUFxQiwyQ0FBckIsQ0FBa0UsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUFyRSxHQUE2RTtRQUM3RSxJQUFJLENBQUMsZUFBTCxDQUFxQiw0Q0FBckIsQ0FBbUUsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUF0RSxHQUE4RTtlQUM5RSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyx5QkFBbkMsQ0FBOEQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxNQUFNLENBQUMsS0FBeEUsQ0FBQSxFQUhEO09BQUEsTUFBQTtRQUtDLElBQUksQ0FBQyxlQUFMLENBQXFCLDJDQUFyQixDQUFrRSxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQXJFLEdBQTZFO1FBQzdFLElBQUksQ0FBQyxlQUFMLENBQXFCLDRDQUFyQixDQUFtRSxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQXRFLEdBQThFO2VBQzlFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQW5CLENBQW1DLHlCQUFuQyxDQUE4RCxDQUFBLENBQUEsQ0FBRSxDQUFDLE1BQU0sQ0FBQyxJQUF4RSxDQUFBLEVBUEQ7O0lBRHNDLENBQXZDO0lBU0EsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsT0FBekI7SUFDQSxZQUFZLENBQUMsRUFBYixDQUFnQixNQUFNLENBQUMsS0FBdkIsRUFBNkIsU0FBQTthQUM1QixJQUFJLENBQUMsVUFBTCxDQUFnQixNQUFoQixFQUF1QixPQUF2QjtJQUQ0QixDQUE3QjtJQU9BLFlBQVksQ0FBQyxFQUFiLENBQWdCLE1BQU0sQ0FBQyxlQUF2QixFQUF1QyxTQUFDLElBQUQsRUFBTyxFQUFQLEVBQVcsTUFBWDtNQUN0QyxJQUFHLEVBQUEsS0FBSSxPQUFQO1FBQ0MsSUFBSSxDQUFDLGVBQUwsQ0FBcUIsd0JBQXJCLENBQStDLENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBbEQsR0FBMEQ7UUFDMUQsSUFBSSxDQUFDLGVBQUwsQ0FBcUIscUJBQXJCLENBQTRDLENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBL0MsR0FBdUQ7ZUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBbkIsQ0FBbUMseUJBQW5DLENBQThELENBQUEsQ0FBQSxDQUFFLENBQUMsTUFBTSxDQUFDLEtBQXhFLENBQUEsRUFIRDtPQUFBLE1BQUE7UUFNQyxJQUFJLENBQUMsZUFBTCxDQUFxQix3QkFBckIsQ0FBK0MsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUFsRCxHQUEwRDtRQUMxRCxJQUFJLENBQUMsZUFBTCxDQUFxQixxQkFBckIsQ0FBNEMsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUEvQyxHQUF1RDtlQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyx5QkFBbkMsQ0FBOEQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxNQUFNLENBQUMsSUFBeEUsQ0FBQSxFQVJEOztJQURzQyxDQUF2QztJQVdBLFlBQVksQ0FBQyxXQUFiLENBQXlCLE9BQXpCO0lBQ0EsWUFBWSxDQUFDLEVBQWIsQ0FBZ0IsTUFBTSxDQUFDLEtBQXZCLEVBQTZCLFNBQUE7YUFDNUIsSUFBSSxDQUFDLFVBQUwsQ0FBZ0IsTUFBaEIsRUFBdUIsT0FBdkI7SUFENEIsQ0FBN0I7SUFNQSxZQUFBLEdBQWEsSUFBQyxDQUFBLHFCQUFxQixDQUFDLGVBQXZCLENBQXVDLDZCQUF2QyxDQUFzRSxDQUFBLENBQUE7SUFFbkYsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFwQixHQUNDO01BQUEsT0FBQSxFQUFRLENBQVI7O0lBQ0QsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFwQixHQUNDO01BQUEsT0FBQSxFQUFRLENBQVI7O0lBQ0QsWUFBWSxDQUFDLEVBQWIsQ0FBZ0IsTUFBTSxDQUFDLGVBQXZCLEVBQXVDLFNBQUMsSUFBRCxFQUFPLEVBQVAsRUFBVyxNQUFYO01BQ3RDLElBQUcsRUFBQSxLQUFJLFFBQVA7UUFDQyxJQUFJLENBQUMsZUFBTCxDQUFxQiwwQ0FBckIsQ0FBaUUsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUFwRSxHQUE0RTtRQUM1RSxJQUFJLENBQUMsZUFBTCxDQUFxQiwyQ0FBckIsQ0FBa0UsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUFyRSxHQUE2RTtlQUM3RSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyx5QkFBbkMsQ0FBOEQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxLQUFqRSxHQUF1RSxNQUh4RTtPQUFBLE1BQUE7UUFNQyxJQUFJLENBQUMsZUFBTCxDQUFxQiwwQ0FBckIsQ0FBaUUsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUFwRSxHQUE0RTtRQUM1RSxJQUFJLENBQUMsZUFBTCxDQUFxQiwyQ0FBckIsQ0FBa0UsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUFyRSxHQUE2RTtlQUM3RSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyx5QkFBbkMsQ0FBOEQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxLQUFqRSxHQUF1RSxFQVJ4RTs7SUFEc0MsQ0FBdkM7SUFVQSxZQUFZLENBQUMsV0FBYixDQUF5QixTQUF6QjtJQUNBLFlBQVksQ0FBQyxFQUFiLENBQWdCLE1BQU0sQ0FBQyxLQUF2QixFQUE2QixTQUFBO2FBQzVCLElBQUksQ0FBQyxVQUFMLENBQWdCLFFBQWhCLEVBQXlCLFNBQXpCO0lBRDRCLENBQTdCO0lBS0EsWUFBQSxHQUFhLElBQUMsQ0FBQSxXQUFXLENBQUMsZUFBYixDQUE2QixvQkFBN0IsQ0FBbUQsQ0FBQSxDQUFBO0lBQ2hFLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBcEIsR0FDQztNQUFBLE9BQUEsRUFBUSxDQUFSOztJQUNELFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBcEIsR0FDQztNQUFBLE9BQUEsRUFBUSxDQUFSOztJQUVELFlBQVksQ0FBQyxFQUFiLENBQWdCLE1BQU0sQ0FBQyxlQUF2QixFQUF1QyxTQUFDLElBQUQsRUFBTyxFQUFQLEVBQVcsTUFBWDtNQUN0QyxJQUFHLEVBQUEsS0FBSSxRQUFQO1FBQ0MsSUFBSSxDQUFDLGVBQUwsQ0FBcUIsc0JBQXJCLENBQTZDLENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBaEQsR0FBd0Q7UUFDeEQsSUFBSSxDQUFDLGVBQUwsQ0FBcUIsdUJBQXJCLENBQThDLENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBakQsR0FBeUQ7ZUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBbkIsQ0FBbUMseUJBQW5DLENBQThELENBQUEsQ0FBQSxDQUFFLENBQUMsS0FBakUsR0FBdUUsTUFIeEU7T0FBQSxNQUFBO1FBT0MsSUFBSSxDQUFDLGVBQUwsQ0FBcUIsc0JBQXJCLENBQTZDLENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBaEQsR0FBd0Q7UUFDeEQsSUFBSSxDQUFDLGVBQUwsQ0FBcUIsdUJBQXJCLENBQThDLENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBakQsR0FBeUQ7ZUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBbkIsQ0FBbUMseUJBQW5DLENBQThELENBQUEsQ0FBQSxDQUFFLENBQUMsS0FBakUsR0FBdUUsRUFUeEU7O0lBRHNDLENBQXZDO0lBV0EsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsU0FBekI7SUFDQSxZQUFZLENBQUMsRUFBYixDQUFnQixNQUFNLENBQUMsS0FBdkIsRUFBNkIsU0FBQTthQUM1QixJQUFJLENBQUMsVUFBTCxDQUFnQixRQUFoQixFQUF5QixTQUF6QjtJQUQ0QixDQUE3QjtJQUtBLFlBQUEsR0FBYSxJQUFDLENBQUEscUJBQXFCLENBQUMsZUFBdkIsQ0FBdUMsNkJBQXZDLENBQXNFLENBQUEsQ0FBQTtJQUNuRixZQUFZLENBQUMsTUFBTSxDQUFDLElBQXBCLEdBQ0M7TUFBQSxPQUFBLEVBQVEsQ0FBUjs7SUFDRCxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQXBCLEdBQ0M7TUFBQSxPQUFBLEVBQVEsQ0FBUjs7SUFDRCxZQUFZLENBQUMsRUFBYixDQUFnQixNQUFNLENBQUMsZUFBdkIsRUFBdUMsU0FBQyxJQUFELEVBQU8sRUFBUCxFQUFXLE1BQVg7TUFDdEMsSUFBRyxFQUFBLEtBQUksTUFBUDtRQUNDLElBQUksQ0FBQyxlQUFMLENBQXFCLHdDQUFyQixDQUErRCxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQWxFLEdBQTBFO1FBQzFFLElBQUksQ0FBQyxlQUFMLENBQXFCLDBDQUFyQixDQUFpRSxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQXBFLEdBQTRFO2VBQzVFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQW5CLENBQW1DLHlCQUFuQyxDQUE4RCxDQUFBLENBQUEsQ0FBRSxDQUFDLE1BQU0sQ0FBQyxLQUF4RSxHQUE4RSxLQUgvRTtPQUFBLE1BQUE7UUFNQyxJQUFJLENBQUMsZUFBTCxDQUFxQix3Q0FBckIsQ0FBK0QsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUFsRSxHQUEwRTtRQUMxRSxJQUFJLENBQUMsZUFBTCxDQUFxQiwwQ0FBckIsQ0FBaUUsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUFwRSxHQUE0RTtlQUM1RSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyx5QkFBbkMsQ0FBOEQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxNQUFNLENBQUMsS0FBeEUsR0FBOEUsTUFSL0U7O0lBRHNDLENBQXZDO0lBVUEsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsUUFBekI7SUFDQSxZQUFZLENBQUMsRUFBYixDQUFnQixNQUFNLENBQUMsS0FBdkIsRUFBNkIsU0FBQTthQUM1QixJQUFJLENBQUMsVUFBTCxDQUFnQixNQUFoQixFQUF1QixRQUF2QjtJQUQ0QixDQUE3QjtJQUlBLFlBQUEsR0FBYSxJQUFDLENBQUEsV0FBVyxDQUFDLGVBQWIsQ0FBNkIsOEJBQTdCLENBQTZELENBQUEsQ0FBQTtJQUMxRSxZQUFZLENBQUMsTUFBTSxDQUFDLElBQXBCLEdBQ0M7TUFBQSxPQUFBLEVBQVEsQ0FBUjs7SUFDRCxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQXBCLEdBQ0M7TUFBQSxPQUFBLEVBQVEsQ0FBUjs7SUFDRCxZQUFZLENBQUMsRUFBYixDQUFnQixNQUFNLENBQUMsZUFBdkIsRUFBdUMsU0FBQyxJQUFELEVBQU8sRUFBUCxFQUFXLE1BQVg7TUFDdEMsSUFBRyxFQUFBLEtBQUksTUFBUDtRQUNDLElBQUksQ0FBQyxlQUFMLENBQXFCLDJCQUFyQixDQUFrRCxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQXJELEdBQTZEO1FBQzdELElBQUksQ0FBQyxlQUFMLENBQXFCLDZCQUFyQixDQUFvRCxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQXZELEdBQStEO2VBQy9ELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQW5CLENBQW1DLHlCQUFuQyxDQUE4RCxDQUFBLENBQUEsQ0FBRSxDQUFDLE1BQU0sQ0FBQyxLQUF4RSxHQUE4RSxLQUgvRTtPQUFBLE1BQUE7UUFNQyxJQUFJLENBQUMsZUFBTCxDQUFxQiwyQkFBckIsQ0FBa0QsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUFyRCxHQUE2RDtRQUM3RCxJQUFJLENBQUMsZUFBTCxDQUFxQiw2QkFBckIsQ0FBb0QsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUF2RCxHQUErRDtlQUMvRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyx5QkFBbkMsQ0FBOEQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxNQUFNLENBQUMsS0FBeEUsR0FBOEUsTUFSL0U7O0lBRHNDLENBQXZDO0lBVUEsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsUUFBekI7SUFDQSxZQUFZLENBQUMsRUFBYixDQUFnQixNQUFNLENBQUMsS0FBdkIsRUFBNkIsU0FBQTthQUM1QixJQUFJLENBQUMsVUFBTCxDQUFnQixNQUFoQixFQUF1QixRQUF2QjtJQUQ0QixDQUE3QjtJQUlBLElBQUMsQ0FBQSxtQkFBbUIsQ0FBQyxFQUFyQixDQUF3QixNQUFNLENBQUMsS0FBL0IsRUFBcUMsU0FBQTtNQUNwQyxJQUFJLENBQUMsT0FBTCxHQUFhO01BQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFaLEdBQWtCO2FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBWixHQUFtQjtJQUhpQixDQUFyQztJQUlBLElBQUMsQ0FBQSxXQUFXLENBQUMsZUFBYixDQUE2Qix1QkFBN0IsQ0FBc0QsQ0FBQSxDQUFBLENBQUUsQ0FBQyxFQUF6RCxDQUE0RCxNQUFNLENBQUMsS0FBbkUsRUFBeUUsU0FBQTtNQUN4RSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyxxQkFBbkMsQ0FBMEQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUE3RCxHQUFxRTtNQUNyRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyxxQkFBbkMsQ0FBMEQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxZQUE3RCxDQUFBO01BRUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBbkIsR0FBeUI7YUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBbkIsR0FBMEI7SUFMOEMsQ0FBekU7SUFNQSxJQUFDLENBQUEsMkJBQTJCLENBQUMsRUFBN0IsQ0FBZ0MsTUFBTSxDQUFDLEtBQXZDLEVBQTZDLFNBQUE7YUFDNUMsSUFBSSxDQUFDLE9BQUwsR0FBYTtJQUQrQixDQUE3QztJQUdBLGtCQUFrQixDQUFDLEVBQW5CLENBQXNCLE1BQU0sQ0FBQyxLQUE3QixFQUFtQyxTQUFBO0FBR2xDLFVBQUE7TUFBQSxxQkFBQSxHQUFzQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyx1QkFBbkMsQ0FBNEQsQ0FBQSxDQUFBO01BQ2xGLGVBQUEsR0FBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBbkIsQ0FBbUMsNkJBQW5DLENBQWtFLENBQUEsQ0FBQTtNQUNsRixlQUFlLENBQUMsT0FBaEIsR0FBd0I7TUFDeEIsZUFBZSxDQUFDLFlBQWhCLENBQUE7TUFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFuQixHQUF5QjtNQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFuQixHQUEwQjtNQUMxQixlQUFlLENBQUMsS0FBaEIsR0FBc0I7TUFDdEIsZUFBZSxDQUFDLE1BQWhCLEdBQXVCO01BQ3ZCLGVBQWUsQ0FBQyxRQUFoQixHQUF5QjtNQUN6QixlQUFlLENBQUMsQ0FBaEIsR0FBa0IsQ0FBQzthQUNuQixlQUFlLENBQUMsQ0FBaEIsR0FBa0IsR0FBQSxHQUFJLHFCQUFxQixDQUFDO0lBYlYsQ0FBbkM7SUFnQkEsSUFBQyxDQUFBLDZCQUE2QixDQUFDLEVBQS9CLENBQWtDLE1BQU0sQ0FBQyxLQUF6QyxFQUErQyxTQUFBO2FBQzlDLElBQUksQ0FBQyxPQUFMLEdBQWE7SUFEaUMsQ0FBL0M7SUFHQSxlQUFlLENBQUMsRUFBaEIsQ0FBbUIsTUFBTSxDQUFDLEtBQTFCLEVBQWdDLFNBQUE7QUFDL0IsVUFBQTtNQUFBLDZCQUFBLEdBQThCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQW5CLENBQW1DLCtCQUFuQyxDQUFvRSxDQUFBLENBQUE7TUFDbEcsNkJBQTZCLENBQUMsT0FBOUIsR0FBc0M7YUFDdEMsNkJBQTZCLENBQUMsWUFBOUIsQ0FBQTtJQUgrQixDQUFoQztJQU1BLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxFQUFuQixDQUFzQixNQUFNLENBQUMsS0FBN0IsRUFBbUMsU0FBQTtNQUNsQyxJQUFJLENBQUMsT0FBTCxHQUFhO01BQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFaLEdBQWtCO01BQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBWixHQUFtQjthQUVuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQVosR0FBaUI7SUFMaUIsQ0FBbkM7SUFPQSxhQUFhLENBQUMsRUFBZCxDQUFpQixNQUFNLENBQUMsS0FBeEIsRUFBOEIsU0FBQTtBQUU3QixVQUFBO01BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBbkIsQ0FBbUMsbUJBQW5DLENBQXdELENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBM0QsR0FBbUU7TUFDbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBbkIsQ0FBbUMsbUJBQW5DLENBQXdELENBQUEsQ0FBQSxDQUFFLENBQUMsWUFBM0QsQ0FBQTtNQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQW5CLEdBQXlCO01BQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQW5CLEdBQTBCO01BQzFCLHFCQUFBLEdBQXNCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQW5CLENBQW1DLHVCQUFuQyxDQUE0RCxDQUFBLENBQUE7TUFDbEYsSUFBRyxJQUFJLENBQUMsR0FBTCxDQUFTLHFCQUFxQixDQUFDLFFBQS9CLENBQUEsR0FBeUMsQ0FBNUM7ZUFFQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFuQixHQUF3QixNQUZ6Qjs7SUFQNkIsQ0FBOUI7SUFVQSxJQUFDLENBQUEsV0FBVyxDQUFDLGVBQWIsQ0FBNkIsMEJBQTdCLENBQXlELENBQUEsQ0FBQSxDQUFFLENBQUMsRUFBNUQsQ0FBK0QsTUFBTSxDQUFDLEtBQXRFLEVBQTRFLFNBQUE7QUFHM0UsVUFBQTtNQUFBLHFCQUFBLEdBQXNCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQW5CLENBQW1DLHVCQUFuQyxDQUE0RCxDQUFBLENBQUE7TUFDbEYsSUFBRyxJQUFJLENBQUMsR0FBTCxDQUFTLHFCQUFxQixDQUFDLFFBQS9CLENBQUEsR0FBeUMsQ0FBNUM7UUFFQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFuQixHQUF3QixNQUZ6Qjs7TUFNQSxZQUFBLEdBQWEscUJBQXFCLENBQUMsZUFBdEIsQ0FBc0MsZ0NBQXRDLENBQXdFLENBQUEsQ0FBQTtNQUNyRixZQUFBLEdBQWEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFaLENBQTRCLHVCQUE1QixDQUFxRCxDQUFBLENBQUE7TUFDbEUsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBckQ7TUFHQSxZQUFBLEdBQWEscUJBQXFCLENBQUMsZUFBdEIsQ0FBc0MsNkJBQXRDLENBQXFFLENBQUEsQ0FBQTtNQUNsRixZQUFBLEdBQWEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFaLENBQTRCLDhCQUE1QixDQUE0RCxDQUFBLENBQUE7TUFDekUsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBckQ7TUFHQSxZQUFBLEdBQWEscUJBQXFCLENBQUMsZUFBdEIsQ0FBc0MsNkJBQXRDLENBQXFFLENBQUEsQ0FBQTtNQUNsRixZQUFBLEdBQWEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFaLENBQTRCLG9CQUE1QixDQUFrRCxDQUFBLENBQUE7TUFDL0QsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBckQ7TUFHQSxLQUFLLENBQUMsS0FBTixDQUFZLENBQVosRUFBYyxTQUFBO2VBQ2IscUJBQXFCLENBQUMsT0FBdEIsQ0FDQztVQUFBLE9BQUEsRUFBUSxDQUFSO1VBQ0EsT0FBQSxFQUNDO1lBQUEsSUFBQSxFQUFLLENBQUw7WUFDQSxLQUFBLEVBQU0sU0FETjtXQUZEO1NBREQ7TUFEYSxDQUFkO01BVUEsSUFBQyxDQUFBLFdBQUQsR0FBYTtNQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQW5CLEdBQXlCO01BQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQW5CLEdBQTBCO01BRzFCLE1BQUEsR0FBUSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyx5QkFBbkMsQ0FBOEQsQ0FBQSxDQUFBO01BQ3RFLHFCQUFBLEdBQXNCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQW5CLENBQW1DLHVCQUFuQyxDQUE0RCxDQUFBLENBQUE7TUFDbEYscUJBQXFCLENBQUMsWUFBdEIsQ0FBQTtNQUNBLE1BQU0sQ0FBQyxLQUFQLEdBQWE7TUFDYixNQUFNLENBQUMsTUFBUCxHQUFjO01BQ2QsTUFBTSxDQUFDLFFBQVAsR0FBZ0I7TUFLaEIsTUFBTSxDQUFDLENBQVAsR0FBUyxDQUFDO01BQ1YsTUFBTSxDQUFDLENBQVAsR0FBUyxHQUFBLEdBQUkscUJBQXFCLENBQUM7TUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLEdBQW9CO01BQ3BCLHFCQUFxQixDQUFDLE9BQXRCLEdBQThCO01BRTlCLHFCQUFxQixDQUFDLFFBQXRCLEdBQStCO01BQy9CLHFCQUFxQixDQUFDLENBQXRCLEdBQXdCLENBQUM7YUFDekIscUJBQXFCLENBQUMsQ0FBdEIsR0FBd0IsR0FBQSxHQUFJLHFCQUFxQixDQUFDO0lBekR5QixDQUE1RTtXQTJEQSxJQUFDLENBQUEscUJBQXFCLENBQUMsZUFBdkIsQ0FBdUMsbUNBQXZDLENBQTRFLENBQUEsQ0FBQSxDQUFFLENBQUMsRUFBL0UsQ0FBa0YsTUFBTSxDQUFDLEtBQXpGLEVBQStGLFNBQUE7QUFDOUYsVUFBQTtNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQW5CLEdBQXdCO01BRXhCLFdBQUEsR0FBWSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyxpQkFBbkMsQ0FBc0QsQ0FBQSxDQUFBO01BQ2xFLFdBQVcsQ0FBQyxZQUFaLENBQUE7TUFDQSxXQUFXLENBQUMsT0FBWixHQUFvQjtNQUNwQixxQkFBQSxHQUFzQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyx1QkFBbkMsQ0FBNEQsQ0FBQSxDQUFBO01BQ2xGLHFCQUFxQixDQUFDLE9BQXRCLEdBQThCO01BRzlCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQW5CLEdBQXlCO01BQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQW5CLEdBQTBCO01BQzFCLE1BQUEsR0FBUSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyx5QkFBbkMsQ0FBOEQsQ0FBQSxDQUFBO01BQ3RFLE1BQU0sQ0FBQyxLQUFQLEdBQWE7TUFDYixNQUFNLENBQUMsTUFBUCxHQUFjO01BQ2QsTUFBTSxDQUFDLFFBQVAsR0FBZ0I7TUFDaEIsTUFBTSxDQUFDLENBQVAsR0FBUzthQUNULE1BQU0sQ0FBQyxDQUFQLEdBQVM7SUFqQnFGLENBQS9GO0VBOVBhOztvQkFpUmQsWUFBQSxHQUFjLFNBQUE7QUFDYixRQUFBO0lBQUEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxlQUFiLENBQTZCLDRCQUE3QixDQUEyRCxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQTlELEdBQXNFO0lBQ3RFLElBQUMsQ0FBQSxXQUFXLENBQUMsZUFBYixDQUE2QiwwQkFBN0IsQ0FBeUQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUE1RCxHQUFvRTtJQUNwRSxNQUFBLEdBQU8sSUFBQyxDQUFDLGVBQUYsQ0FBa0IseUJBQWxCLENBQTZDLENBQUEsQ0FBQTtJQUNwRCxJQUFDLENBQUEsUUFBRCxHQUFVO0lBQ1YsSUFBQyxDQUFBLEtBQUQsR0FBTztJQUNQLElBQUMsQ0FBQSxTQUFELEdBQVc7SUFDWCxJQUFDLENBQUEsQ0FBRCxHQUFHLElBQUMsQ0FBQztXQUNMLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQyxDQUFDO0VBUlE7O29CQVNkLFFBQUEsR0FBVSxTQUFBO1dBQ1QsSUFBQyxDQUFBO0VBRFE7O29CQUdWLElBQUEsR0FBTSxTQUFBO0FBR0wsUUFBQTtJQUFBLFdBQUEsR0FBWSxJQUFDLENBQUMsZUFBRixDQUFrQixpQkFBbEIsQ0FBcUMsQ0FBQSxDQUFBO0lBQ2pELFdBQVcsQ0FBQyxZQUFaLENBQUE7SUFDQSxXQUFXLENBQUMsT0FBWixHQUFvQjtJQUNwQixxQkFBQSxHQUFzQixJQUFDLENBQUMsZUFBRixDQUFrQix1QkFBbEIsQ0FBMkMsQ0FBQSxDQUFBO0lBQ2pFLHFCQUFxQixDQUFDLE9BQXRCLEdBQThCO0lBRTlCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBWixHQUFrQjtJQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQVosR0FBbUI7SUFFbkIsTUFBQSxHQUFPLElBQUMsQ0FBQyxlQUFGLENBQWtCLHlCQUFsQixDQUE2QyxDQUFBLENBQUE7SUFFcEQsTUFBTSxDQUFDLEtBQVAsR0FBYTtJQUNiLE1BQU0sQ0FBQyxNQUFQLEdBQWM7SUFDZCxNQUFNLENBQUMsUUFBUCxHQUFnQjtJQUNoQixNQUFNLENBQUMsQ0FBUCxHQUFTO0lBQ1QsTUFBTSxDQUFDLENBQVAsR0FBUztXQUVULE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBZCxDQUFBO0VBcEJLOztvQkFzQk4sSUFBQSxHQUFNLFNBQUE7QUFDTCxRQUFBO0lBQUEsU0FBQSxHQUFVLElBQUMsQ0FBQTtJQUNYLElBQUMsQ0FBQSxXQUFXLENBQUMsZUFBYixDQUE2Qix1QkFBN0IsQ0FBc0QsQ0FBQSxDQUFBLENBQUUsQ0FBQyxXQUF6RCxDQUFxRSxNQUFyRTtJQUdBLElBQUksQ0FBQyxPQUFMLEdBQWE7SUFDYixJQUFJLENBQUMsQ0FBTCxHQUFPLElBQUksQ0FBQztJQUNaLElBQUksQ0FBQyxDQUFMLEdBQU8sSUFBSSxDQUFDO1dBQ1osS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFaLEVBQWMsU0FBQTthQUNiLFNBQVMsQ0FBQyxPQUFWLENBQ0M7UUFBQSxPQUFBLEVBQVEsQ0FBUjtRQUNBLE9BQUEsRUFDQztVQUFBLElBQUEsRUFBSyxDQUFMO1VBQ0EsS0FBQSxFQUFNLFNBRE47U0FGRDtPQUREO0lBRGEsQ0FBZDtFQVJLOztvQkFnQk4sT0FBQSxHQUFRLFNBQUE7QUFFUCxRQUFBO0lBQUEsT0FBQSxHQUFRLElBQUMsQ0FBQTtJQUNULE9BQU8sQ0FBQyxPQUFSLENBQ0U7TUFBQSxPQUFBLEVBQVEsQ0FBUjtLQURGO0lBRUMsQ0FBQTtNQUFBLE9BQUEsRUFDQztRQUFBLElBQUEsRUFBSyxHQUFMO1FBQ0EsS0FBQSxFQUFNLFNBRE47T0FERDtLQUFBO0lBR0QsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFaLEVBQWMsU0FBQTthQUNiLE9BQU8sQ0FBQyxPQUFSLENBQ0M7UUFBQSxPQUFBLEVBQVEsQ0FBUjtRQUNBLE9BQUEsRUFDQztVQUFBLElBQUEsRUFBSyxDQUFMO1VBQ0EsS0FBQSxFQUFNLFNBRE47U0FGRDtPQUREO0lBRGEsQ0FBZDtJQU9BLFNBQUEsR0FBVSxJQUFDLENBQUE7SUFFWCxTQUFTLENBQUMsT0FBVixDQUNFO01BQUEsT0FBQSxFQUFRLENBQVI7S0FERjtJQUVDLENBQUE7TUFBQSxPQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQUssR0FBTDtRQUNBLEtBQUEsRUFBTSxTQUROO09BREQ7S0FBQTtXQUdELEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBWixFQUFjLFNBQUE7YUFDYixTQUFTLENBQUMsT0FBVixDQUNDO1FBQUEsT0FBQSxFQUFRLENBQVI7UUFDQSxPQUFBLEVBQ0M7VUFBQSxJQUFBLEVBQUssQ0FBTDtVQUNBLEtBQUEsRUFBTSxTQUROO1NBRkQ7T0FERDtJQURhLENBQWQ7RUF0Qk87Ozs7R0FsYW9COzs7O0FERDdCLElBQUE7OztBQUFNLE1BQU0sQ0FBQzs7O29CQUNaLE1BQUEsR0FBTzs7b0JBQ1AsTUFBQSxHQUFPOztFQUNNLGlCQUFDLE9BQUQ7QUFDWixRQUFBO0lBRGEsSUFBQyxDQUFBLDRCQUFELFVBQVM7SUFDdEIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFULEdBQWU7SUFDZixJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsR0FBZ0I7O1VBQ1IsQ0FBQyxRQUFTOzs7V0FDVixDQUFDLFFBQVM7O0lBQ2xCLElBQUMsQ0FBQSxPQUFPLENBQUMsZUFBVCxHQUF5Qjs7V0FDakIsQ0FBQyxlQUFnQjs7SUFDekIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULEdBQWM7O1dBQ04sQ0FBQyxPQUFROztJQUNqQixJQUFDLENBQUEsT0FBRCxHQUFVLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDbkIsSUFBQyxDQUFBLFdBQUQsR0FBYSxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQ3RCLElBQUMsQ0FBQSxtQkFBRCxHQUFxQixJQUFDLENBQUEsT0FBTyxDQUFDO0lBQzlCLElBQUMsQ0FBQSxpQkFBRCxHQUFtQixJQUFDLENBQUEsT0FBTyxDQUFDO0lBQzVCLElBQUMsQ0FBQSxvQkFBRCxHQUFzQixJQUFDLENBQUEsT0FBTyxDQUFDO0lBRS9CLElBQUMsQ0FBQSxLQUFELEdBQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUNoQixJQUFDLENBQUEsV0FBVyxDQUFDLFFBQWIsR0FBc0I7SUFDdEIsSUFBQyxDQUFBLFdBQVcsQ0FBQyxDQUFiLEdBQWUsQ0FBQztJQUNoQixJQUFDLENBQUEsV0FBVyxDQUFDLENBQWIsR0FBZTtJQUVmLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxRQUFuQixHQUE0QjtJQUM1QixJQUFDLENBQUEsaUJBQWlCLENBQUMsQ0FBbkIsR0FBcUIsQ0FBQztJQUN0QixJQUFDLENBQUEsaUJBQWlCLENBQUMsQ0FBbkIsR0FBcUI7SUFHckIsSUFBQyxDQUFBLG1CQUFtQixDQUFDLFFBQXJCLEdBQThCO0lBQzlCLElBQUMsQ0FBQSxtQkFBbUIsQ0FBQyxDQUFyQixHQUF1QixDQUFDO0lBQ3hCLElBQUMsQ0FBQSxtQkFBbUIsQ0FBQyxDQUFyQixHQUF1QjtJQUV2QixJQUFDLENBQUEsb0JBQW9CLENBQUMsUUFBdEIsR0FBK0I7SUFDL0IsSUFBQyxDQUFBLG9CQUFvQixDQUFDLENBQXRCLEdBQXdCLENBQUM7SUFDekIsSUFBQyxDQUFBLG9CQUFvQixDQUFDLENBQXRCLEdBQXdCO0lBRXhCLHlDQUFNLElBQUMsQ0FBQSxPQUFQO0lBQ0EsSUFBQyxDQUFDLE9BQUYsQ0FBVSxJQUFDLENBQUEsT0FBWDtJQUNBLHFCQUFBLEdBQTBCLElBQUEsVUFBQSxDQUN6QjtNQUFBLEtBQUEsRUFBTyxHQUFQO01BQ0EsTUFBQSxFQUFRLEdBRFI7TUFFQSxJQUFBLEVBQUsseUJBRkw7TUFHQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUhoQjtNQUlBLE1BQUEsRUFBUSxJQUpSO01BS0EsQ0FBQSxFQUFFLENBQUMsR0FMSDtNQU1BLENBQUEsRUFBRSxHQU5GO01BT0EsUUFBQSxFQUFTLEVBUFQ7TUFRQSxlQUFBLEVBQWlCLE9BUmpCO0tBRHlCO0lBVzFCLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUE3QixHQUFrQztJQUVsQyxJQUFDLENBQUEsaUJBQWlCLENBQUMsTUFBbkIsR0FBMEI7SUFDMUIsSUFBQyxDQUFBLGlCQUFpQixDQUFDLE9BQW5CLEdBQTJCO0lBQzNCLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxJQUFuQixHQUF3QjtJQUV4QixJQUFDLENBQUEsbUJBQW1CLENBQUMsTUFBckIsR0FBNEI7SUFDNUIsSUFBQyxDQUFBLG1CQUFtQixDQUFDLE9BQXJCLEdBQTZCO0lBQzdCLElBQUMsQ0FBQSxtQkFBbUIsQ0FBQyxJQUFyQixHQUEwQjtJQUcxQixJQUFDLENBQUEsb0JBQW9CLENBQUMsTUFBdEIsR0FBNkI7SUFDN0IsSUFBQyxDQUFBLG9CQUFvQixDQUFDLElBQXRCLEdBQTJCO0lBQzNCLElBQUMsQ0FBQSxvQkFBb0IsQ0FBQyxPQUF0QixHQUE4QjtJQUM5QixJQUFDLENBQUEsV0FBVyxDQUFDLE1BQWIsR0FBb0I7SUFDcEIsSUFBQyxDQUFBLFdBQVcsQ0FBQyxZQUFiLENBQUE7SUFDQSxJQUFDLENBQUEsV0FBVyxDQUFDLElBQWIsR0FBa0I7SUFDbEIsUUFBQSxHQUFTLElBQUMsQ0FBQSxXQUFXLENBQUMsZUFBYixDQUE2Qix5QkFBN0IsQ0FBd0QsQ0FBQSxDQUFBO0lBQ2pFLFFBQVEsQ0FBQyxPQUFULEdBQWlCO0lBQ2pCLE9BQUEsR0FBWSxJQUFBLFNBQUEsQ0FDWDtNQUFBLElBQUEsRUFBTSxhQUFOO01BQ0EsQ0FBQSxFQUFFLFFBQVEsQ0FBQyxDQURYO01BRUEsQ0FBQSxFQUFFLFFBQVEsQ0FBQyxDQUZYO01BR0EsTUFBQSxFQUFPLFFBQVEsQ0FBQyxNQUhoQjtNQUlBLFFBQUEsRUFBUyxFQUpUO01BS0EsS0FBQSxFQUFNLFNBTE47S0FEVztJQU9aLE9BQU8sQ0FBQyxpQkFBUixHQUNDO01BQUEsS0FBQSxFQUFNLFNBQUMsS0FBRDtlQUNMLEtBQUssQ0FBQyxLQUFOLENBQVksS0FBWixFQUFrQixDQUFsQjtNQURLLENBQU47O0lBRUQsS0FBSyxDQUFDLFFBQU4sQ0FBZSxDQUFmLEVBQWlCLFNBQUE7YUFDaEIsT0FBTyxDQUFDLE9BQVIsQ0FDQztRQUFBLFFBQUEsRUFDQztVQUFBLEtBQUEsRUFBTSxLQUFLLENBQUMsWUFBTixDQUFtQixFQUFuQixFQUFzQixFQUF0QixDQUFOO1NBREQ7T0FERDtJQURnQixDQUFqQjtFQTNFWTs7RUFnRmIsT0FBQyxDQUFBLE1BQUQsQ0FBUSxhQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUNKLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFETCxDQUFMO0lBRUEsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUNKLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxHQUFxQjtJQURqQixDQUZMO0dBREQ7O0VBTUEsT0FBQyxDQUFBLE1BQUQsQ0FBUSxxQkFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFDSixJQUFDLENBQUE7SUFERyxDQUFMO0dBREQ7O29CQUtBLFlBQUEsR0FBYyxTQUFBO0FBRWIsUUFBQTtJQUFBLGFBQUEsR0FBYyxJQUFDLENBQUEsV0FBVyxDQUFDLGVBQWIsQ0FBNkIsNEJBQTdCLENBQTJELENBQUEsQ0FBQTtJQUd6RSxVQUFBLEdBQVcsSUFBQyxDQUFBLFdBQVcsQ0FBQyxlQUFiLENBQTZCLG1CQUE3QixDQUFrRCxDQUFBLENBQUE7SUFDN0QsVUFBQSxHQUFXLElBQUMsQ0FBQSxXQUFXLENBQUMsZUFBYixDQUE2QiwyQkFBN0IsQ0FBMEQsQ0FBQSxDQUFBO0lBRXJFLGNBQUEsR0FBZSxJQUFDLENBQUEsV0FBVyxDQUFDLGVBQWIsQ0FBNkIsZ0JBQTdCLENBQStDLENBQUEsQ0FBQTtJQUM5RCxjQUFBLEdBQWUsSUFBQyxDQUFBLFdBQVcsQ0FBQyxlQUFiLENBQTZCLGdCQUE3QixDQUErQyxDQUFBLENBQUE7SUFFOUQsSUFBRyxJQUFDLENBQUEsT0FBSjtNQUNDLFVBQVUsQ0FBQyxPQUFYLEdBQW1CO01BQ25CLGNBQWMsQ0FBQyxPQUFmLEdBQXVCO01BQ3ZCLGNBQWMsQ0FBQyxPQUFmLEdBQXVCLEtBSHhCO0tBQUEsTUFBQTtNQUtDLFVBQVUsQ0FBQyxPQUFYLEdBQW1CO01BQ25CLGNBQWMsQ0FBQyxPQUFmLEdBQXVCO01BQ3ZCLGNBQWMsQ0FBQyxPQUFmLEdBQXVCLE1BUHhCOztJQVFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBbEIsR0FDQztNQUFBLE9BQUEsRUFBUSxDQUFSOztJQUNELFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBbEIsR0FDQztNQUFBLE9BQUEsRUFBUSxDQUFSOztJQUNELFVBQVUsQ0FBQyxFQUFYLENBQWMsTUFBTSxDQUFDLGVBQXJCLEVBQXFDLFNBQUMsSUFBRCxFQUFPLEVBQVAsRUFBVyxNQUFYO01BQ3BDLElBQUcsRUFBQSxLQUFJLE9BQVA7UUFDQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyxxQkFBbkMsQ0FBMEQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUE3RCxHQUFxRTtlQUNyRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyxxQkFBbkMsQ0FBMEQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxZQUE3RCxDQUFBLEVBRkQ7T0FBQSxNQUFBO2VBSUMsS0FBQSxDQUFNLFNBQU4sRUFKRDs7SUFEb0MsQ0FBckM7SUFNQSxVQUFVLENBQUMsRUFBWCxDQUFjLE1BQU0sQ0FBQyxLQUFyQixFQUEyQixTQUFBO2FBQzFCLElBQUksQ0FBQyxXQUFMLENBQWlCLE9BQWpCO0lBRDBCLENBQTNCO0lBR0EsYUFBYSxDQUFDLEVBQWQsQ0FBaUIsTUFBTSxDQUFDLEtBQXhCLEVBQThCLFNBQUE7TUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBbkIsQ0FBbUMsbUJBQW5DLENBQXdELENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBM0QsR0FBbUU7YUFDbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBbkIsQ0FBbUMsbUJBQW5DLENBQXdELENBQUEsQ0FBQSxDQUFFLENBQUMsWUFBM0QsQ0FBQTtJQUY2QixDQUE5QjtJQUdBLFVBQVUsQ0FBQyxFQUFYLENBQWMsTUFBTSxDQUFDLEtBQXJCLEVBQTJCLFNBQUE7TUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBbkIsQ0FBbUMsc0JBQW5DLENBQTJELENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBOUQsR0FBc0U7YUFDdEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBbkIsQ0FBbUMsc0JBQW5DLENBQTJELENBQUEsQ0FBQSxDQUFFLENBQUMsWUFBOUQsQ0FBQTtJQUYwQixDQUEzQjtJQUdBLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxFQUFuQixDQUFzQixNQUFNLENBQUMsS0FBN0IsRUFBbUMsU0FBQTthQUNsQyxJQUFJLENBQUMsT0FBTCxHQUFhO0lBRHFCLENBQW5DO0lBRUEsSUFBQyxDQUFBLG1CQUFtQixDQUFDLEVBQXJCLENBQXdCLE1BQU0sQ0FBQyxLQUEvQixFQUFxQyxTQUFBO2FBQ3BDLElBQUksQ0FBQyxPQUFMLEdBQWE7SUFEdUIsQ0FBckM7SUFFQSxJQUFDLENBQUEsb0JBQW9CLENBQUMsRUFBdEIsQ0FBeUIsTUFBTSxDQUFDLEtBQWhDLEVBQXNDLFNBQUE7YUFDckMsSUFBSSxDQUFDLE9BQUwsR0FBYTtJQUR3QixDQUF0QztJQUdBLE9BQUEsR0FBUSxJQUFDLENBQUEsV0FBVyxDQUFDLGVBQWIsQ0FBNkIsZ0JBQTdCLENBQStDLENBQUEsQ0FBQTtJQUN2RCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQWYsR0FDQztNQUFBLE9BQUEsRUFBUSxDQUFSOztJQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBZixHQUNDO01BQUEsT0FBQSxFQUFRLENBQVI7O0lBQ0QsT0FBTyxDQUFDLEVBQVIsQ0FBVyxNQUFNLENBQUMsZUFBbEIsRUFBa0MsU0FBQyxJQUFELEVBQU8sRUFBUCxFQUFXLE1BQVg7TUFDakMsSUFBRyxFQUFBLEtBQUksT0FBUDtRQUNDLElBQUksQ0FBQyxlQUFMLENBQXFCLDBCQUFyQixDQUFpRCxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQXBELEdBQTREO1FBQzVELElBQUksQ0FBQyxlQUFMLENBQXFCLDJCQUFyQixDQUFrRCxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQXJELEdBQTZEO2VBQzdELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQW5CLENBQW1DLHlCQUFuQyxDQUE4RCxDQUFBLENBQUEsQ0FBRSxDQUFDLE1BQU0sQ0FBQyxLQUF4RSxDQUFBLEVBSEQ7T0FBQSxNQUFBO1FBS0MsSUFBSSxDQUFDLGVBQUwsQ0FBcUIsMEJBQXJCLENBQWlELENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBcEQsR0FBNEQ7UUFDNUQsSUFBSSxDQUFDLGVBQUwsQ0FBcUIsMkJBQXJCLENBQWtELENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBckQsR0FBNkQ7ZUFDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBbkIsQ0FBbUMseUJBQW5DLENBQThELENBQUEsQ0FBQSxDQUFFLENBQUMsTUFBTSxDQUFDLElBQXhFLENBQUEsRUFQRDs7SUFEaUMsQ0FBbEM7SUFTQSxPQUFPLENBQUMsV0FBUixDQUFvQixNQUFwQjtJQUVBLE9BQU8sQ0FBQyxFQUFSLENBQVcsTUFBTSxDQUFDLEtBQWxCLEVBQXdCLFNBQUE7YUFDdkIsSUFBSSxDQUFDLFVBQUwsQ0FBZ0IsT0FBaEIsRUFBd0IsTUFBeEI7SUFEdUIsQ0FBeEI7SUFHQSxPQUFBLEdBQVEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxlQUFiLENBQTZCLGdCQUE3QixDQUErQyxDQUFBLENBQUE7SUFDdkQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFmLEdBQ0M7TUFBQSxPQUFBLEVBQVEsQ0FBUjs7SUFDRCxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQWYsR0FDQztNQUFBLE9BQUEsRUFBUSxDQUFSOztJQUNELE9BQU8sQ0FBQyxFQUFSLENBQVcsTUFBTSxDQUFDLGVBQWxCLEVBQWtDLFNBQUMsSUFBRCxFQUFPLEVBQVAsRUFBVyxNQUFYO01BQ2pDLElBQUcsRUFBQSxLQUFJLFFBQVA7UUFDQyxJQUFJLENBQUMsZUFBTCxDQUFxQiw0QkFBckIsQ0FBbUQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUF0RCxHQUE4RDtRQUM5RCxJQUFJLENBQUMsZUFBTCxDQUFxQiw2QkFBckIsQ0FBb0QsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUF2RCxHQUErRDtlQUMvRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyx5QkFBbkMsQ0FBOEQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxLQUFqRSxHQUF1RSxNQUh4RTtPQUFBLE1BQUE7UUFNQyxJQUFJLENBQUMsZUFBTCxDQUFxQiw0QkFBckIsQ0FBbUQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUF0RCxHQUE4RDtRQUM5RCxJQUFJLENBQUMsZUFBTCxDQUFxQiw2QkFBckIsQ0FBb0QsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUF2RCxHQUErRDtlQUMvRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyx5QkFBbkMsQ0FBOEQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxLQUFqRSxHQUF1RSxFQVJ4RTs7SUFEaUMsQ0FBbEM7SUFVQSxPQUFPLENBQUMsV0FBUixDQUFvQixTQUFwQjtJQUNBLE9BQU8sQ0FBQyxFQUFSLENBQVcsTUFBTSxDQUFDLEtBQWxCLEVBQXdCLFNBQUE7YUFDdkIsSUFBSSxDQUFDLFVBQUwsQ0FBZ0IsUUFBaEIsRUFBeUIsU0FBekI7SUFEdUIsQ0FBeEI7SUFFQSxPQUFBLEdBQVEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxlQUFiLENBQTZCLGlCQUE3QixDQUFnRCxDQUFBLENBQUE7SUFDeEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFmLEdBQ0M7TUFBQSxPQUFBLEVBQVEsQ0FBUjs7SUFDRCxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQWYsR0FDQztNQUFBLE9BQUEsRUFBUSxDQUFSOztJQUNELE9BQU8sQ0FBQyxFQUFSLENBQVcsTUFBTSxDQUFDLGVBQWxCLEVBQWtDLFNBQUMsSUFBRCxFQUFPLEVBQVAsRUFBVyxNQUFYO01BQ2pDLElBQUcsRUFBQSxLQUFJLE1BQVA7UUFDQyxJQUFJLENBQUMsZUFBTCxDQUFxQix1QkFBckIsQ0FBOEMsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUFqRCxHQUF5RDtRQUN6RCxJQUFJLENBQUMsZUFBTCxDQUFxQixxQkFBckIsQ0FBNEMsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUEvQyxHQUF1RDtlQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFuQixDQUFtQyx5QkFBbkMsQ0FBOEQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxNQUFNLENBQUMsS0FBeEUsR0FBOEUsS0FIL0U7T0FBQSxNQUFBO1FBS0MsSUFBSSxDQUFDLGVBQUwsQ0FBcUIsdUJBQXJCLENBQThDLENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBakQsR0FBeUQ7UUFDekQsSUFBSSxDQUFDLGVBQUwsQ0FBcUIscUJBQXJCLENBQTRDLENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBL0MsR0FBdUQ7ZUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBbkIsQ0FBbUMseUJBQW5DLENBQThELENBQUEsQ0FBQSxDQUFFLENBQUMsTUFBTSxDQUFDLEtBQXhFLEdBQThFLE1BUC9FOztJQURpQyxDQUFsQztJQVNBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLFFBQXBCO0lBQ0EsT0FBTyxDQUFDLEVBQVIsQ0FBVyxNQUFNLENBQUMsS0FBbEIsRUFBd0IsU0FBQTthQUN2QixJQUFJLENBQUMsVUFBTCxDQUFnQixRQUFoQixFQUF5QixNQUF6QjtJQUR1QixDQUF4QjtJQUdBLE9BQUEsR0FBUSxJQUFDLENBQUEsV0FBVyxDQUFDLGVBQWIsQ0FBNkIseUJBQTdCLENBQXdELENBQUEsQ0FBQTtJQUNoRSxPQUFBLEdBQVEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxlQUFiLENBQTZCLHlCQUE3QixDQUF3RCxDQUFBLENBQUE7SUFFaEUsT0FBTyxDQUFDLEVBQVIsQ0FBVyxNQUFNLENBQUMsU0FBbEIsRUFBNEIsU0FBQTtBQUMzQixVQUFBO01BQUEsTUFBQSxHQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQW5CLENBQW1DLHlCQUFuQyxDQUE4RCxDQUFBLENBQUEsQ0FBRSxDQUFDO2FBQ3hFLE1BQU0sQ0FBQyxXQUFQLEdBQW1CLE1BQU0sQ0FBQyxXQUFQLEdBQW1CO0lBRlgsQ0FBNUI7V0FJQSxPQUFPLENBQUMsRUFBUixDQUFXLE1BQU0sQ0FBQyxTQUFsQixFQUE0QixTQUFBO0FBQzNCLFVBQUE7TUFBQSxNQUFBLEdBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBbkIsQ0FBbUMseUJBQW5DLENBQThELENBQUEsQ0FBQSxDQUFFLENBQUM7YUFFeEUsTUFBTSxDQUFDLFdBQVAsR0FBbUIsTUFBTSxDQUFDLFdBQVAsR0FBbUI7SUFIWCxDQUE1QjtFQTNHYTs7b0JBZ0hkLFlBQUEsR0FBYyxTQUFBO0FBQ2IsUUFBQTtJQUFBLElBQUMsQ0FBQSxXQUFXLENBQUMsZUFBYixDQUE2Qiw0QkFBN0IsQ0FBMkQsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUE5RCxHQUFzRTtJQUN0RSxJQUFDLENBQUEsV0FBVyxDQUFDLGVBQWIsQ0FBNkIsMEJBQTdCLENBQXlELENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBNUQsR0FBb0U7SUFDcEUsTUFBQSxHQUFPLElBQUMsQ0FBQyxlQUFGLENBQWtCLHlCQUFsQixDQUE2QyxDQUFBLENBQUE7SUFDcEQsSUFBQyxDQUFBLFFBQUQsR0FBVTtJQUNWLElBQUMsQ0FBQSxLQUFELEdBQU87SUFDUCxJQUFDLENBQUEsU0FBRCxHQUFXO0lBQ1gsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFDLENBQUM7V0FDTCxJQUFDLENBQUEsQ0FBRCxHQUFHLElBQUMsQ0FBQztFQVJROztvQkFVZCxJQUFBLEdBQU0sU0FBQTtBQUNMLFFBQUE7SUFBQSxNQUFBLEdBQU8sSUFBQyxDQUFDLGVBQUYsQ0FBa0IseUJBQWxCLENBQTZDLENBQUEsQ0FBQTtXQUNwRCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQWQsQ0FBQTtFQUZLOztvQkFJTixJQUFBLEdBQU0sU0FBQTtBQUNMLFFBQUE7SUFBQSxTQUFBLEdBQVUsSUFBQyxDQUFBO0lBQ1gsTUFBQSxHQUFPLElBQUMsQ0FBQyxlQUFGLENBQWtCLHlCQUFsQixDQUE2QyxDQUFBLENBQUE7SUFDcEQsSUFBSSxDQUFDLE9BQUwsR0FBYTtJQUNiLElBQUksQ0FBQyxDQUFMLEdBQU8sSUFBSSxDQUFDO0lBQ1osSUFBSSxDQUFDLENBQUwsR0FBTyxJQUFJLENBQUM7SUFDWixLQUFLLENBQUMsS0FBTixDQUFZLENBQVosRUFBYyxTQUFBO2FBQ2IsU0FBUyxDQUFDLE9BQVYsQ0FDQztRQUFBLE9BQUEsRUFBUSxDQUFSO1FBQ0EsT0FBQSxFQUNDO1VBQUEsSUFBQSxFQUFLLENBQUw7VUFDQSxLQUFBLEVBQU0sU0FETjtTQUZEO09BREQ7SUFEYSxDQUFkO0lBTUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFkLEdBQTBCO1dBQzFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBZCxDQUFBO0VBYks7O29CQWNOLE9BQUEsR0FBUSxTQUFBO0FBQ1AsUUFBQTtJQUFBLFNBQUEsR0FBVSxJQUFDLENBQUE7SUFDWCxTQUFTLENBQUMsT0FBVixDQUNFO01BQUEsT0FBQSxFQUFRLENBQVI7S0FERjtJQUVDLENBQUE7TUFBQSxPQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQUssR0FBTDtRQUNBLEtBQUEsRUFBTSxTQUROO09BREQ7S0FBQTtXQUdELEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBWixFQUFjLFNBQUE7YUFDYixTQUFTLENBQUMsT0FBVixDQUNDO1FBQUEsT0FBQSxFQUFRLENBQVI7UUFDQSxPQUFBLEVBQ0M7VUFBQSxJQUFBLEVBQUssQ0FBTDtVQUNBLEtBQUEsRUFBTSxTQUROO1NBRkQ7T0FERDtJQURhLENBQWQ7RUFQTzs7OztHQTFPb0I7Ozs7QURHN0IsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7O0FBRWhCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7U0FDcEIsS0FBQSxDQUFNLHVCQUFOO0FBRG9COztBQUdyQixPQUFPLENBQUMsT0FBUixHQUFrQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCJ9
