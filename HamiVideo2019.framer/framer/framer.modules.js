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
    this.Video = this.options.Video;
    this.offsetY = this.options.ori_YY;
    this.ControlMask_Landscape.offsetYY = this.offsetY;
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
    var muteBtn_land, muteBtn_port, playBtn_land, playBtn_port, zoomBtn_land, zoomBtn_port;
    playBtn_land = this.ControlMask_Landscape.subLayersByName("PlayBTN_ChannelPlayerLandscape")[0];
    playBtn_port = this.ControlMask.subLayersByName("PlayBTN_ChannelPlayer")[0];
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
    this.VODSelectSessionMask = this.options.VODSelectSessionMask;
    this.Video = this.options.Video;
    this.ControlMask.rotation = 90;
    this.ControlMask.x = -146;
    this.ControlMask.y = 146;
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
      rotation: 90
    });
    layerPlayerSmallVideo.player.loop = true;
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
    var BackBtn, FastBtn, MuteBtn, NextSessionBTN, PrevSessionBTN, QualityBTN, SessionBTN, ZoomBtn, playBtn;
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
    SessionBTN.on(Events.Click, function() {
      this.parent.parent.subLayersByName("VODSelectSessionMask")[0].visible = true;
      return this.parent.parent.subLayersByName("VODSelectSessionMask")[0].bringToFront();
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
      if (to === "ZoomOut") {
        this.subLayersByName("VODPlayer_ZoomState_ZoomIn")[0].visible = true;
        this.subLayersByName("VODPlayer_ZoomState_ZoomOut")[0].visible = false;
        return this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].scale = 1.333;
      } else {
        this.subLayersByName("VODPlayer_ZoomState_ZoomIn")[0].visible = false;
        this.subLayersByName("VODPlayer_ZoomState_ZoomOut")[0].visible = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NoZXJsb2NrL0Ryb3Bib3gvTXlHaXRodWIvTU9EX0ltcHJvdmVudC9IYW1pVmlkZW9fMjAxOS9GcmFtZXIvSGFtaVZpZGVvMjAxOS5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zaGVybG9jay9Ecm9wYm94L015R2l0aHViL01PRF9JbXByb3ZlbnQvSGFtaVZpZGVvXzIwMTkvRnJhbWVyL0hhbWlWaWRlbzIwMTkuZnJhbWVyL21vZHVsZXMvVk9EUGxheWVyQ29udHJvbC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zaGVybG9jay9Ecm9wYm94L015R2l0aHViL01PRF9JbXByb3ZlbnQvSGFtaVZpZGVvXzIwMTkvRnJhbWVyL0hhbWlWaWRlbzIwMTkuZnJhbWVyL21vZHVsZXMvQ2hhbm5lbFBsYXllckNvbnRyb2wuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiXG5jbGFzcyBtb2R1bGUuZXhwb3J0cyBleHRlbmRzIExheWVyXG5cdG9yaV9YWDowXG5cdG9yaV9ZWTowXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMud2lkdGg9Mzc1XG5cdFx0QG9wdGlvbnMuaGVpZ2h0PTY2N1xuXHRcdEBvcHRpb25zLm9yaV9YID89IDBcblx0XHRAb3B0aW9ucy5vcmlfWSA/PSAwXG5cdFx0QG9wdGlvbnMuYmFja2dyb3VuZENvbG9yPVwiVHJhbnNwYXJlbnRcIlxuXHRcdEBvcHRpb25zLmlzU2VsZWN0YWJsZSA/PSB0cnVlXG5cdFx0QG9wdGlvbnMuY2xpcD10cnVlXG5cdFx0QG9wdGlvbnMubmFtZSA/PSBcIkNoYW5uZWxQbGF5ZXJDb250cm9sXCJcblx0XHRASXNEcmFtYSA9QG9wdGlvbnMuSXNEcmFtYVxuXHRcdEBDb250cm9sTWFzaz1Ab3B0aW9ucy5Db250cm9sTWFza1xuXHRcdEBRdWFsaXR5U2Vzc3RpbmdNYXNrPUBvcHRpb25zLlF1YWxpdHlTZXNzdGluZ01hc2tcblx0XHRAVk9EU2VsZWN0U2Vzc2lvbk1hc2s9QG9wdGlvbnMuVk9EU2VsZWN0U2Vzc2lvbk1hc2tcblx0XHQjcHJpbnQgQG9wdGlvbnMuUXVhbGl0eVNlc3N0aW5nTWFzayxAUXVhbGl0eVNlc3N0aW5nTWFza1xuXHRcdEBWaWRlbz1Ab3B0aW9ucy5WaWRlb1xuXHRcdEBDb250cm9sTWFzay5yb3RhdGlvbj05MFxuXHRcdEBDb250cm9sTWFzay54PS0xNDZcblx0XHRAQ29udHJvbE1hc2sueT0xNDZcblx0XHRcblx0XHRAUXVhbGl0eVNlc3N0aW5nTWFzay5yb3RhdGlvbj05MFxuXHRcdEBRdWFsaXR5U2Vzc3RpbmdNYXNrLng9LTE0NlxuXHRcdEBRdWFsaXR5U2Vzc3RpbmdNYXNrLnk9MTQ2XG5cblx0XHRAVk9EU2VsZWN0U2Vzc2lvbk1hc2sucm90YXRpb249OTBcblx0XHRAVk9EU2VsZWN0U2Vzc2lvbk1hc2sueD0tMTQ2XG5cdFx0QFZPRFNlbGVjdFNlc3Npb25NYXNrLnk9MTQ2XG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEAub25DbGljayBAQ2xpY2tNZVxuXHRcdGxheWVyUGxheWVyU21hbGxWaWRlbz1uZXcgVmlkZW9MYXllclxuXHRcdFx0d2lkdGg6IDY2N1xuXHRcdFx0aGVpZ2h0OiAzNzVcblx0XHRcdG5hbWU6XCJDaGFubmVsUGxheWVyU21hbGxWaWRlb1wiXG5cdFx0XHR2aWRlbzogQG9wdGlvbnMuVmlkZW9cblx0XHRcdHBhcmVudDpcdEBcblx0XHRcdHg6LTE0NlxuXHRcdFx0eToxNDZcblx0XHRcdHJvdGF0aW9uOjkwXG4jIFx0XHRsYXllclBsYXllclNtYWxsVmlkZW8ucGxheWVyLm11dGVkPXRydWVcblx0XHRsYXllclBsYXllclNtYWxsVmlkZW8ucGxheWVyLmxvb3A9dHJ1ZVxuXHRcdCNsYXllclBsYXllck1hc2s9QG9wdGlvbnMuQ29udHJvbE1hc2tcblx0XHRAUXVhbGl0eVNlc3N0aW5nTWFzay5wYXJlbnQ9QFxuXHRcdEBRdWFsaXR5U2Vzc3RpbmdNYXNrLnZpc2libGU9ZmFsc2Vcblx0XHRAUXVhbGl0eVNlc3N0aW5nTWFzay5uYW1lPVwiUXVhbGl0eVNlc3N0aW5nTWFza1wiXG5cdFx0XG5cblx0XHRAVk9EU2VsZWN0U2Vzc2lvbk1hc2sucGFyZW50PUBcblx0XHRAVk9EU2VsZWN0U2Vzc2lvbk1hc2submFtZT1cIlZPRFNlbGVjdFNlc3Npb25NYXNrXCJcblx0XHRAVk9EU2VsZWN0U2Vzc2lvbk1hc2sudmlzaWJsZT1mYWxzZVxuXHRcdEBDb250cm9sTWFzay5wYXJlbnQ9QFxuXHRcdEBDb250cm9sTWFzay5icmluZ1RvRnJvbnQoKVxuXHRcdEBDb250cm9sTWFzay5uYW1lPVwiTGF5ZXJQbGF5ZXJNYXNrXCJcblx0XHRudW1sYXllcj1AQ29udHJvbE1hc2suc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX0JpdHJhdGVOdW1iZXJcIilbMF1cblx0XHRudW1sYXllci52aXNpYmxlPWZhbHNlXG5cdFx0dGV4dE51bT1uZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiBcIntzcGVlZH1tYnBzXCJcblx0XHRcdHg6bnVtbGF5ZXIueFxuXHRcdFx0eTpudW1sYXllci55XG5cdFx0XHRwYXJlbnQ6bnVtbGF5ZXIucGFyZW50XG5cdFx0XHRmb250U2l6ZToxMFxuXHRcdFx0Y29sb3I6XCIjQUFBQUFBXCJcblx0XHR0ZXh0TnVtLnRlbXBsYXRlRm9ybWF0dGVyID0gXG5cdFx0XHRzcGVlZDoodmFsdWUpLT5cblx0XHRcdFx0VXRpbHMucm91bmQodmFsdWUsMClcblx0XHRVdGlscy5pbnRlcnZhbCAyLC0+XG5cdFx0XHR0ZXh0TnVtLmFuaW1hdGVcblx0XHRcdFx0dGVtcGxhdGU6XG5cdFx0XHRcdFx0c3BlZWQ6VXRpbHMucmFuZG9tTnVtYmVyKDcwLDkwKVxuXHRcdFxuXHRAZGVmaW5lICdkb2lzcm90YXRlZCcsXG5cdFx0Z2V0OiAtPiBcblx0XHRcdEBvcHRpb25zLmlzcm90YXRlZFx0XG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QG9wdGlvbnMuaXNyb3RhdGVkID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3F1YWxpdHlTZXNzdGluZ01hc2snLFxuXHRcdGdldDogLT4gXG5cdFx0XHRAUXVhbGl0eVNlc3N0aW5nTWFza1x0XG4jXHRcdHNldDogKHZhbHVlKSAtPiBcbiNcdFx0XHRAb3B0aW9ucy5pc3JvdGF0ZWQgPSB2YWx1ZVxuXHRJbml0aWFsRXZlbnQ6IC0+XHRcdFxuXHRcdCNwcmludCBASXNEcmFtYVxuXHRcdFF1YWxpdHlCVE49QENvbnRyb2xNYXNrLnN1YkxheWVyc0J5TmFtZShcIlZPRFBsYXllcl9RdWFsaXR5XCIpWzBdXG5cdFx0U2Vzc2lvbkJUTj1AQ29udHJvbE1hc2suc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX1Nlc3Npb25TZWxlY3RvclwiKVswXVxuXG5cdFx0TmV4dFNlc3Npb25CVE49QENvbnRyb2xNYXNrLnN1YkxheWVyc0J5TmFtZShcIlZPRFBsYXllcl9OZXh0XCIpWzBdXG5cdFx0UHJldlNlc3Npb25CVE49QENvbnRyb2xNYXNrLnN1YkxheWVyc0J5TmFtZShcIlZPRFBsYXllcl9QcmV2XCIpWzBdXG5cdFx0XG5cdFx0aWYgQElzRHJhbWFcblx0XHRcdFNlc3Npb25CVE4udmlzaWJsZT10cnVlXG5cdFx0XHROZXh0U2Vzc2lvbkJUTi52aXNpYmxlPXRydWVcblx0XHRcdFByZXZTZXNzaW9uQlROLnZpc2libGU9dHJ1ZVxuXHRcdGVsc2Vcblx0XHRcdFNlc3Npb25CVE4udmlzaWJsZT1mYWxzZVxuXHRcdFx0TmV4dFNlc3Npb25CVE4udmlzaWJsZT1mYWxzZVxuXHRcdFx0UHJldlNlc3Npb25CVE4udmlzaWJsZT1mYWxzZVxuXHRcdFF1YWxpdHlCVE4uc3RhdGVzLlNob3dRPVxuXHRcdFx0b3BhY2l0eToxXG5cdFx0UXVhbGl0eUJUTi5zdGF0ZXMuVW5TaG93UT1cblx0XHRcdG9wYWNpdHk6MVxuXHRcdFF1YWxpdHlCVE4ub24gRXZlbnRzLlN0YXRlV2lsbFN3aXRjaCwoZnJvbSwgdG8sIHN0YXRlcyktPlxuXHRcdFx0aWYgdG89PVwiU2hvd1FcIlxuXHRcdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiUXVhbGl0eVNlc3N0aW5nTWFza1wiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIlF1YWxpdHlTZXNzdGluZ01hc2tcIilbMF0uYnJpbmdUb0Zyb250KClcblx0XHRcdGVsc2Vcblx0XHRcdFx0cHJpbnQgXCJOb1Nob3dRXCJcblx0XHRRdWFsaXR5QlROLm9uIEV2ZW50cy5DbGljaywtPlxuXHRcdFx0dGhpcy5zdGF0ZVN3aXRjaChcIlNob3dRXCIpXG5cdFx0XHQjQG9wdGlvbnMuUXVhbGl0eVNlc3N0aW5nTWFzay52aXNpYmxlPXRydWVcblxuXHRcdFNlc3Npb25CVE4ub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiVk9EU2VsZWN0U2Vzc2lvbk1hc2tcIilbMF0udmlzaWJsZT10cnVlXG5cdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiVk9EU2VsZWN0U2Vzc2lvbk1hc2tcIilbMF0uYnJpbmdUb0Zyb250KClcblx0XHRAUXVhbGl0eVNlc3N0aW5nTWFzay5vbiBFdmVudHMuQ2xpY2ssLT5cblx0XHRcdHRoaXMudmlzaWJsZT1mYWxzZVxuXHRcdEBWT0RTZWxlY3RTZXNzaW9uTWFzay5vbiBFdmVudHMuQ2xpY2ssLT5cblx0XHRcdHRoaXMudmlzaWJsZT1mYWxzZVxuXHRcdFx0XG5cdFx0cGxheUJ0bj1AQ29udHJvbE1hc2suc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX1BsYXlcIilbMF1cblx0XHRwbGF5QnRuLnN0YXRlcy5QbGF5PVxuXHRcdFx0b3BhY2l0eToxXG5cdFx0cGxheUJ0bi5zdGF0ZXMuUGF1c2U9XG5cdFx0XHRvcGFjaXR5OjFcblx0XHRwbGF5QnRuLm9uIEV2ZW50cy5TdGF0ZVdpbGxTd2l0Y2gsKGZyb20sIHRvLCBzdGF0ZXMpLT5cblx0XHRcdGlmIHRvPT1cIlBhdXNlXCJcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJWT0RQbGF5ZXJfUGxheVN0YXRlX1BsYXlcIilbMF0udmlzaWJsZT10cnVlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX1BsYXlTdGF0ZV9QYXVzZVwiKVswXS52aXNpYmxlPWZhbHNlXG5cdFx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJDaGFubmVsUGxheWVyU21hbGxWaWRlb1wiKVswXS5wbGF5ZXIucGF1c2UoKVx0XHRcdFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlZPRFBsYXllcl9QbGF5U3RhdGVfUGxheVwiKVswXS52aXNpYmxlPWZhbHNlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX1BsYXlTdGF0ZV9QYXVzZVwiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5wbGF5KClcdFx0XHRcblx0XHRwbGF5QnRuLnN0YXRlU3dpdGNoKFwiUGxheVwiKVxuXG5cdFx0cGxheUJ0bi5vbiBFdmVudHMuQ2xpY2ssLT5cblx0XHRcdHRoaXMuc3RhdGVDeWNsZShcIlBhdXNlXCIsXCJQbGF5XCIpXG5cblx0XHRab29tQnRuPUBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJWT0RQbGF5ZXJfWm9vbVwiKVswXVxuXHRcdFpvb21CdG4uc3RhdGVzLlpvb21Jbj1cblx0XHRcdG9wYWNpdHk6MVxuXHRcdFpvb21CdG4uc3RhdGVzLlpvb21PdXQ9XG5cdFx0XHRvcGFjaXR5OjFcblx0XHRab29tQnRuLm9uIEV2ZW50cy5TdGF0ZVdpbGxTd2l0Y2gsKGZyb20sIHRvLCBzdGF0ZXMpLT5cblx0XHRcdGlmIHRvPT1cIlpvb21PdXRcIlxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlZPRFBsYXllcl9ab29tU3RhdGVfWm9vbUluXCIpWzBdLnZpc2libGU9dHJ1ZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlZPRFBsYXllcl9ab29tU3RhdGVfWm9vbU91dFwiKVswXS52aXNpYmxlPWZhbHNlXG5cdFx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJDaGFubmVsUGxheWVyU21hbGxWaWRlb1wiKVswXS5zY2FsZT0xLjMzM1xuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX1pvb21TdGF0ZV9ab29tSW5cIilbMF0udmlzaWJsZT1mYWxzZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlZPRFBsYXllcl9ab29tU3RhdGVfWm9vbU91dFwiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnNjYWxlPTFcdFx0XHRcblx0XHRab29tQnRuLnN0YXRlU3dpdGNoKFwiWm9vbU91dFwiKVxuXHRcdFpvb21CdG4ub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnN0YXRlQ3ljbGUoXCJab29tSW5cIixcIlpvb21PdXRcIilcblx0XHRNdXRlQnRuPUBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJWT0RQbGF5ZXJfU291bmRcIilbMF1cblx0XHRNdXRlQnRuLnN0YXRlcy5NdXRlPVxuXHRcdFx0b3BhY2l0eToxXG5cdFx0TXV0ZUJ0bi5zdGF0ZXMuVW5NdXRlPVxuXHRcdFx0b3BhY2l0eToxXG5cdFx0TXV0ZUJ0bi5vbiBFdmVudHMuU3RhdGVXaWxsU3dpdGNoLChmcm9tLCB0bywgc3RhdGVzKS0+XG5cdFx0XHRpZiB0bz09XCJNdXRlXCJcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJWT0RQbGF5ZXJfU291bmRVbk11dGVcIilbMF0udmlzaWJsZT10cnVlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX1NvdW5kTXV0ZVwiKVswXS52aXNpYmxlPWZhbHNlXG5cdFx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJDaGFubmVsUGxheWVyU21hbGxWaWRlb1wiKVswXS5wbGF5ZXIubXV0ZWQ9dHJ1ZVx0XHRcdFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlZPRFBsYXllcl9Tb3VuZFVuTXV0ZVwiKVswXS52aXNpYmxlPWZhbHNlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX1NvdW5kTXV0ZVwiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5tdXRlZD1mYWxzZVx0XHRcblx0XHRNdXRlQnRuLnN0YXRlU3dpdGNoKFwiVW5NdXRlXCIpXG5cdFx0TXV0ZUJ0bi5vbiBFdmVudHMuQ2xpY2ssLT5cblx0XHRcdHRoaXMuc3RhdGVDeWNsZShcIlVuTXV0ZVwiLFwiTXV0ZVwiKVxuXHRcdFxuXHRcdEZhc3RCdG49QENvbnRyb2xNYXNrLnN1YkxheWVyc0J5TmFtZShcIlZPRFBsYXllcl9GYXN0MTBTZWNIaW50XCIpWzBdXG5cdFx0QmFja0J0bj1AQ29udHJvbE1hc2suc3ViTGF5ZXJzQnlOYW1lKFwiVk9EUGxheWVyX0JhY2sxMFNlY0hpbnRcIilbMF1cblx0XHRcblx0XHRGYXN0QnRuLm9uIEV2ZW50cy5Eb3VibGVUYXAsLT5cblx0XHRcdHBsYXllcj10aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF0ucGxheWVyXG5cdFx0XHRwbGF5ZXIuY3VycmVudFRpbWU9cGxheWVyLmN1cnJlbnRUaW1lKzEwXG5cdFx0XHRcblx0XHRCYWNrQnRuLm9uIEV2ZW50cy5Eb3VibGVUYXAsLT5cblx0XHRcdHBsYXllcj10aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF0ucGxheWVyXG5cdFx0XHRcblx0XHRcdHBsYXllci5jdXJyZW50VGltZT1wbGF5ZXIuY3VycmVudFRpbWUtMTBcblx0XHRcdFxuXHRSb3RhdGlvbkJhY2s6IC0+XG5cdFx0QENvbnRyb2xNYXNrLnN1YkxheWVyc0J5TmFtZShcIlVuRnVsbFNjcmVlbl9DaGFubmVsUGxheWVyXCIpWzBdLnZpc2libGU9ZmFsc2Vcblx0XHRAQ29udHJvbE1hc2suc3ViTGF5ZXJzQnlOYW1lKFwiRnVsbHNjcmVlbl9DaGFubmVsUGxheWVyXCIpWzBdLnZpc2libGU9dHJ1ZVxuXHRcdHBsYXllcj1ALnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdXG5cdFx0QHJvdGF0aW9uPTBcblx0XHRAc2NhbGU9MVxuXHRcdEBJc1JvdGF0ZWQ9ZmFsc2Vcblx0XHRAeD1ALm9yaV9YWFxuXHRcdEB5PUAub3JpX1lZXG5cblx0U1RPUDogLT5cblx0XHRwbGF5ZXI9QC5zdWJMYXllcnNCeU5hbWUoXCJDaGFubmVsUGxheWVyU21hbGxWaWRlb1wiKVswXVxuXHRcdHBsYXllci5wbGF5ZXIucGF1c2UoKVxuXG5cdFNob3c6IC0+XG5cdFx0Y2hpbGRNYXNrPUBDb250cm9sTWFza1xuXHRcdHBsYXllcj1ALnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdXG5cdFx0dGhpcy52aXNpYmxlPXRydWVcblx0XHR0aGlzLng9dGhpcy5vcmlfWFhcblx0XHR0aGlzLnk9dGhpcy5vcmlfWVlcblx0XHRVdGlscy5kZWxheSAzLC0+XG5cdFx0XHRjaGlsZE1hc2suYW5pbWF0ZVxuXHRcdFx0XHRvcGFjaXR5OjBcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOjRcblx0XHRcdFx0XHRjdXJ2ZTpcImVhc3ktaW5cIlxuXHRcdHBsYXllci5wbGF5ZXIuY3VycmVudFRpbWU9MFxuXHRcdHBsYXllci5wbGF5ZXIucGxheSgpXG5cdENsaWNrTWU6LT5cblx0XHRjaGlsZE1hc2s9QENvbnRyb2xNYXNrXG5cdFx0Y2hpbGRNYXNrLmFuaW1hdGVcblx0XHRcdFx0b3BhY2l0eToxXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOjAuMlxuXHRcdFx0XHRjdXJ2ZTpcImVhc3ktaW5cIlxuXHRcdFV0aWxzLmRlbGF5IDMsLT5cblx0XHRcdGNoaWxkTWFzay5hbmltYXRlXG5cdFx0XHRcdG9wYWNpdHk6MFxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdHRpbWU6NFxuXHRcdFx0XHRcdGN1cnZlOlwiZWFzeS1pblwiIiwiI0V2ZW50cy5CYWNrRXZlbnRGaXJlICA9IFwiYmFja0V2ZW50RmlyZVwiXG5cbmNsYXNzIG1vZHVsZS5leHBvcnRzIGV4dGVuZHMgTGF5ZXJcblx0b3JpX1hYOjBcblx0b3JpX1lZOjBcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAb3B0aW9ucy5pc3JvdGF0ZWQgPz0gXCJOXCJcblx0XHRAb3B0aW9ucy53aWR0aD0zNzVcblx0XHRAb3B0aW9ucy5oZWlnaHQ9MjEwXG5cdFx0QG9wdGlvbnMub3JpX1hYID89IDBcblx0XHRAb3B0aW9ucy5vcmlfWVkgPz0gMFxuXHRcdEBvcHRpb25zLmJhY2tncm91bmRDb2xvcj1cIlRyYW5zcGFyZW50XCJcblx0XHRAb3B0aW9ucy5pc1NlbGVjdGFibGUgPz0gdHJ1ZVxuXHRcdCNAb3B0aW9ucy5jbGlwPXRydWVcblx0XHRAb3B0aW9ucy5uYW1lID89IFwiQ2hhbm5lbFBsYXllckNvbnRyb2xcIlxuXHRcdEBDb250cm9sTWFzaz1Ab3B0aW9ucy5Db250cm9sTWFza1xuXHRcdEBDb250cm9sTWFza19MYW5kc2NhcGU9QG9wdGlvbnMuQ29udHJvbE1hc2tfTGFuZHNjYXBlXG5cdFx0QFF1YWxpdHlTZXNzdGluZ01hc2s9QG9wdGlvbnMuUXVhbGl0eVNlc3N0aW5nTWFza1xuXHRcdEBWaWRlbz1Ab3B0aW9ucy5WaWRlb1xuXHRcdCNAb3B0aW9ucy54PUAub3JpX1hYXG5cdFx0I0BvcHRpb25zLnk9QC5vcmlfWVlcblx0XHRAb2Zmc2V0WT1Ab3B0aW9ucy5vcmlfWVlcblx0XHRAQ29udHJvbE1hc2tfTGFuZHNjYXBlLm9mZnNldFlZPUBvZmZzZXRZXG5cblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAUXVhbGl0eVNlc3N0aW5nTWFzay5wYXJlbnQ9QFxuXHRcdEBRdWFsaXR5U2Vzc3RpbmdNYXNrLng9QG9wdGlvbnMub3JpX1hYXG5cdFx0QFF1YWxpdHlTZXNzdGluZ01hc2sueT0tQG9wdGlvbnMub3JpX1lZXG5cdFx0QFF1YWxpdHlTZXNzdGluZ01hc2sudmlzaWJsZT1mYWxzZVxuXHRcdEBRdWFsaXR5U2Vzc3RpbmdNYXNrLm5hbWU9XCJRdWFsaXR5U2Vzc3RpbmdNYXNrXCJcdFx0XG5cdFx0QC5jbGlwPXRydWVcblx0XHRALm9uQ2xpY2sgQENsaWNrTWVcblx0XHRsYXllclBsYXllclNtYWxsVmlkZW89bmV3IFZpZGVvTGF5ZXJcblx0XHRcdHdpZHRoOiAzNzVcblx0XHRcdGhlaWdodDogMjEwXG5cdFx0XHRuYW1lOlwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIlxuXHRcdFx0dmlkZW86IEBvcHRpb25zLlZpZGVvI1wiaW1hZ2VzL1Nwb3J0Vm9ELm1wNFwiXG5cdFx0XHRwYXJlbnQ6XHRAXHRcdFxuIyBcdFx0bGF5ZXJQbGF5ZXJTbWFsbFZpZGVvLnBsYXllci5tdXRlZD10cnVlXG5cdFx0bGF5ZXJQbGF5ZXJTbWFsbFZpZGVvLnBsYXllci5sb29wPXRydWVcblx0XHRsYXllclBsYXllck1hc2s9QG9wdGlvbnMuQ29udHJvbE1hc2tcblx0XHRAQ29udHJvbE1hc2sucGFyZW50PUBcblx0XHRAQ29udHJvbE1hc2tfTGFuZHNjYXBlLnBhcmVudD1AXG5cdFx0QENvbnRyb2xNYXNrX0xhbmRzY2FwZS52aXNpYmxlPWZhbHNlXG5cdFx0QENvbnRyb2xNYXNrX0xhbmRzY2FwZS5uYW1lPVwiY29udHJvbE1hc2tfTGFuZHNjYXBlXCJcblx0XHRcblx0XHRAQ29udHJvbE1hc2suYnJpbmdUb0Zyb250KClcblx0XHRAQ29udHJvbE1hc2submFtZT1cIkxheWVyUGxheWVyTWFza1wiXG5cdFx0I0BDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJab29tT1VUX0NoYW5uZWxQbGF5ZXJcIilbMF0udmlzaWJsZT1mYWxzZVxuXHRcdEBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJVbkZ1bGxTY3JlZW5fQ2hhbm5lbFBsYXllclwiKVswXS52aXNpYmxlPWZhbHNlXG5cdFx0bnVtbGF5ZXI9QENvbnRyb2xNYXNrLnN1YkxheWVyc0J5TmFtZShcIkJpdFJhdGVfQ2hhbm5lbFBsYXllclwiKVswXS5zdWJMYXllcnNCeU5hbWUoXCJiaXRyYXRlbnVtXCIpWzBdXG5cdFx0bnVtbGF5ZXIudmlzaWJsZT1mYWxzZVxuXHRcdHRleHROdW09bmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogXCJ7c3BlZWR9bWJwc1wiXG5cdFx0XHR4Om51bWxheWVyLnhcblx0XHRcdHk6bnVtbGF5ZXIueVxuXHRcdFx0cGFyZW50Om51bWxheWVyLnBhcmVudFxuXHRcdFx0Zm9udFNpemU6MTBcblx0XHRcdGNvbG9yOlwiI0FBQUFBQVwiXG5cdFx0dGV4dE51bS50ZW1wbGF0ZUZvcm1hdHRlciA9IFxuXHRcdFx0c3BlZWQ6KHZhbHVlKS0+XG5cdFx0XHRcdFV0aWxzLnJvdW5kKHZhbHVlLDApXG5cdFx0VXRpbHMuaW50ZXJ2YWwgMiwtPlxuXHRcdFx0dGV4dE51bS5hbmltYXRlXG5cdFx0XHRcdHRlbXBsYXRlOlxuXHRcdFx0XHRcdHNwZWVkOlV0aWxzLnJhbmRvbU51bWJlcig3MCw5MClcblx0XHRcblx0QGRlZmluZSAnZG9pc3JvdGF0ZWQnLFxuXHRcdGdldDogLT4gXG5cdFx0XHRAb3B0aW9ucy5pc3JvdGF0ZWRcdFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBvcHRpb25zLmlzcm90YXRlZCA9IHZhbHVlXG5cdEluaXRpYWxFdmVudDogLT5cdFx0XG5cdFx0Iy0tLVBsYXlCVE4gTGFuZHNjYXBlXG5cdFx0cGxheUJ0bl9sYW5kPUBDb250cm9sTWFza19MYW5kc2NhcGUuc3ViTGF5ZXJzQnlOYW1lKFwiUGxheUJUTl9DaGFubmVsUGxheWVyTGFuZHNjYXBlXCIpWzBdXG5cdFx0cGxheUJ0bl9wb3J0PUBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJQbGF5QlROX0NoYW5uZWxQbGF5ZXJcIilbMF1cblx0XHRcblx0XHRwbGF5QnRuX2xhbmQuc3RhdGVzLlBsYXk9XG5cdFx0XHRvcGFjaXR5OjFcblx0XHRwbGF5QnRuX2xhbmQuc3RhdGVzLlBhdXNlPVxuXHRcdFx0b3BhY2l0eToxXG5cdFx0cGxheUJ0bl9wb3J0LnN0YXRlcy5QbGF5PVxuXHRcdFx0b3BhY2l0eToxXG5cdFx0cGxheUJ0bl9wb3J0LnN0YXRlcy5QYXVzZT1cblx0XHRcdG9wYWNpdHk6MVx0XHRcdFxuXHRcdHBsYXlCdG5fbGFuZC5vbiBFdmVudHMuU3RhdGVXaWxsU3dpdGNoLChmcm9tLCB0bywgc3RhdGVzKS0+XG5cdFx0XHRpZiB0bz09XCJQYXVzZVwiXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiUGxheUJUTl9DaGFubmVsUGxheWVyTGFuZHNjYXBlX1N0YXRlX1BsYXlcIilbMF0udmlzaWJsZT10cnVlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiUGxheUJUTl9DaGFubmVsUGxheWVyTGFuZHNjYXBlX1N0YXRlX1BhdXNlXCIpWzBdLnZpc2libGU9ZmFsc2Vcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5wYXVzZSgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiUGxheUJUTl9DaGFubmVsUGxheWVyTGFuZHNjYXBlX1N0YXRlX1BsYXlcIilbMF0udmlzaWJsZT1mYWxzZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlBsYXlCVE5fQ2hhbm5lbFBsYXllckxhbmRzY2FwZV9TdGF0ZV9QYXVzZVwiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5wbGF5KClcblx0XHRwbGF5QnRuX2xhbmQuc3RhdGVTd2l0Y2goXCJQYXVzZVwiKVxuXHRcdHBsYXlCdG5fbGFuZC5vbiBFdmVudHMuQ2xpY2ssLT5cblx0XHRcdHRoaXMuc3RhdGVDeWNsZShcIlBsYXlcIixcIlBhdXNlXCIpXG5cdFx0XHQjcGxheUJ0bl9wb3J0LnN0YXRlQ3ljbGUoXCJQbGF5XCIsXCJQYXVzZVwiKVxuXHRcdCMtLS1QbGF5QlROIExhbmRzY2FwZSBFbmRcblx0XHQjLS0tUGxheUJUTiBcblx0XHRcblxuXHRcdHBsYXlCdG5fcG9ydC5vbiBFdmVudHMuU3RhdGVXaWxsU3dpdGNoLChmcm9tLCB0bywgc3RhdGVzKS0+XG5cdFx0XHRpZiB0bz09XCJQYXVzZVwiXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiQ29udGludWVfQ2hhbm5lbFBsYXllclwiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJQYXVzZV9DaGFubmVsUGxheWVyXCIpWzBdLnZpc2libGU9ZmFsc2Vcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5wYXVzZSgpXG5cblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJDb250aW51ZV9DaGFubmVsUGxheWVyXCIpWzBdLnZpc2libGU9ZmFsc2Vcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJQYXVzZV9DaGFubmVsUGxheWVyXCIpWzBdLnZpc2libGU9dHJ1ZVxuXHRcdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF0ucGxheWVyLnBsYXkoKVxuXG5cdFx0cGxheUJ0bl9wb3J0LnN0YXRlU3dpdGNoKFwiUGF1c2VcIilcblx0XHRwbGF5QnRuX3BvcnQub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnN0YXRlQ3ljbGUoXCJQbGF5XCIsXCJQYXVzZVwiKVxuXHRcdFx0I3BsYXlCdG5fbGFuZC5zdGF0ZUN5Y2xlKFwiUGxheVwiLFwiUGF1c2VcIilcblx0XHQjLS0tUGxheUJUTiAgRW5kXG5cblx0XHQjLS0tWm9vbSBMYW5kc2NhcGVcblx0XHR6b29tQnRuX2xhbmQ9QENvbnRyb2xNYXNrX0xhbmRzY2FwZS5zdWJMYXllcnNCeU5hbWUoXCJab29tX0NoYW5uZWxQbGF5ZXJMYW5kc2NhcGVcIilbMF1cblx0XHRcblx0XHR6b29tQnRuX2xhbmQuc3RhdGVzLlpvb21Jbj1cblx0XHRcdG9wYWNpdHk6MVxuXHRcdHpvb21CdG5fbGFuZC5zdGF0ZXMuWm9vbU91dD1cblx0XHRcdG9wYWNpdHk6MVxuXHRcdHpvb21CdG5fbGFuZC5vbiBFdmVudHMuU3RhdGVXaWxsU3dpdGNoLChmcm9tLCB0bywgc3RhdGVzKS0+XG5cdFx0XHRpZiB0bz09XCJab29tSW5cIlxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlpvb21fQ2hhbm5lbFBsYXllckxhbmRzY2FwZV9TdGF0ZV9ab29tSW5cIilbMF0udmlzaWJsZT1mYWxzZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlpvb21fQ2hhbm5lbFBsYXllckxhbmRzY2FwZV9TdGF0ZV9ab29tT3V0XCIpWzBdLnZpc2libGU9dHJ1ZVxuXHRcdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF0uc2NhbGU9MS4zMzNcblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlpvb21fQ2hhbm5lbFBsYXllckxhbmRzY2FwZV9TdGF0ZV9ab29tSW5cIilbMF0udmlzaWJsZT10cnVlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiWm9vbV9DaGFubmVsUGxheWVyTGFuZHNjYXBlX1N0YXRlX1pvb21PdXRcIilbMF0udmlzaWJsZT1mYWxzZVxuXHRcdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF0uc2NhbGU9MVx0XHRcdFxuXHRcdHpvb21CdG5fbGFuZC5zdGF0ZVN3aXRjaChcIlpvb21PdXRcIilcblx0XHR6b29tQnRuX2xhbmQub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnN0YXRlQ3ljbGUoXCJab29tSW5cIixcIlpvb21PdXRcIilcblx0XHQjLS0tWm9vbSBMYW5kc2NhcGUgRW5kXG5cblx0XHQjLS0tLS1ab29tXG5cdFx0em9vbUJ0bl9wb3J0PUBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJab29tX0NoYW5uZWxQbGF5ZXJcIilbMF1cblx0XHR6b29tQnRuX3BvcnQuc3RhdGVzLlpvb21Jbj1cblx0XHRcdG9wYWNpdHk6MVxuXHRcdHpvb21CdG5fcG9ydC5zdGF0ZXMuWm9vbU91dD1cblx0XHRcdG9wYWNpdHk6MVxuXHRcdFxuXHRcdHpvb21CdG5fcG9ydC5vbiBFdmVudHMuU3RhdGVXaWxsU3dpdGNoLChmcm9tLCB0bywgc3RhdGVzKS0+XG5cdFx0XHRpZiB0bz09XCJab29tSW5cIlxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlpvb21JTl9DaGFubmVsUGxheWVyXCIpWzBdLnZpc2libGU9ZmFsc2Vcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJab29tT1VUX0NoYW5uZWxQbGF5ZXJcIilbMF0udmlzaWJsZT10cnVlXG5cdFx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJDaGFubmVsUGxheWVyU21hbGxWaWRlb1wiKVswXS5zY2FsZT0xLjMzM1xuXHRcdFx0XHQj5YGH6Kit54K6aVBob25lWFMs5YmH5pS+5aSnMS4yMTc15YCNXG5cblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJab29tSU5fQ2hhbm5lbFBsYXllclwiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJab29tT1VUX0NoYW5uZWxQbGF5ZXJcIilbMF0udmlzaWJsZT1mYWxzZVxuXHRcdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF0uc2NhbGU9MVx0XHRcdFxuXHRcdHpvb21CdG5fcG9ydC5zdGF0ZVN3aXRjaChcIlpvb21PdXRcIilcblx0XHR6b29tQnRuX3BvcnQub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnN0YXRlQ3ljbGUoXCJab29tSW5cIixcIlpvb21PdXRcIilcblx0XHQjLS0tLVx0XG5cblx0XHQjLS0tTXV0ZSBMYW5kc2NhcGVcblx0XHRtdXRlQnRuX2xhbmQ9QENvbnRyb2xNYXNrX0xhbmRzY2FwZS5zdWJMYXllcnNCeU5hbWUoXCJNdXRlX0NoYW5uZWxQbGF5ZXJMYW5kc2NhcGVcIilbMF1cblx0XHRtdXRlQnRuX2xhbmQuc3RhdGVzLk11dGU9XG5cdFx0XHRvcGFjaXR5OjFcblx0XHRtdXRlQnRuX2xhbmQuc3RhdGVzLlVuTXV0ZT1cblx0XHRcdG9wYWNpdHk6MVxuXHRcdG11dGVCdG5fbGFuZC5vbiBFdmVudHMuU3RhdGVXaWxsU3dpdGNoLChmcm9tLCB0bywgc3RhdGVzKS0+XG5cdFx0XHRpZiB0bz09XCJNdXRlXCJcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJNdXRlX0NoYW5uZWxQbGF5ZXJMYW5kc2NhcGVfU3RhdGVfTXV0ZVwiKVswXS52aXNpYmxlPWZhbHNlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiTXV0ZV9DaGFubmVsUGxheWVyTGFuZHNjYXBlX1N0YXRlX1VuTXV0ZVwiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5tdXRlZD10cnVlXG5cdFx0XHRcblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJNdXRlX0NoYW5uZWxQbGF5ZXJMYW5kc2NhcGVfU3RhdGVfTXV0ZVwiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5zdWJMYXllcnNCeU5hbWUoXCJNdXRlX0NoYW5uZWxQbGF5ZXJMYW5kc2NhcGVfU3RhdGVfVW5NdXRlXCIpWzBdLnZpc2libGU9ZmFsc2Vcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5tdXRlZD1mYWxzZVx0XHRcdFxuXHRcdG11dGVCdG5fbGFuZC5zdGF0ZVN3aXRjaChcIlVuTXV0ZVwiKVxuXHRcdG11dGVCdG5fbGFuZC5vbiBFdmVudHMuQ2xpY2ssLT5cblx0XHRcdHRoaXMuc3RhdGVDeWNsZShcIk11dGVcIixcIlVuTXV0ZVwiKVxuXHRcdCMtLS1NdXRlIExhbmRzY2FwZSBFbmRcblx0XHQjLS0tTXV0ZSBQb3J0cmFpdFxuXHRcdG11dGVCdG5fcG9ydD1AQ29udHJvbE1hc2suc3ViTGF5ZXJzQnlOYW1lKFwiTXV0ZUJUTkNvbnRyb2xfQ2hhbm5lbFBsYXllclwiKVswXVxuXHRcdG11dGVCdG5fcG9ydC5zdGF0ZXMuTXV0ZT1cblx0XHRcdG9wYWNpdHk6MVxuXHRcdG11dGVCdG5fcG9ydC5zdGF0ZXMuVW5NdXRlPVxuXHRcdFx0b3BhY2l0eToxXG5cdFx0bXV0ZUJ0bl9wb3J0Lm9uIEV2ZW50cy5TdGF0ZVdpbGxTd2l0Y2gsKGZyb20sIHRvLCBzdGF0ZXMpLT5cblx0XHRcdGlmIHRvPT1cIk11dGVcIlxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIk11dGVDb250cm9sX0NoYW5uZWxQbGF5ZXJcIilbMF0udmlzaWJsZT1mYWxzZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIlVOTXV0ZUNvbnRyb2xfQ2hhbm5lbFBsYXllclwiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5tdXRlZD10cnVlXG5cdFx0XHRcdFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLnN1YkxheWVyc0J5TmFtZShcIk11dGVDb250cm9sX0NoYW5uZWxQbGF5ZXJcIilbMF0udmlzaWJsZT10cnVlXG5cdFx0XHRcdHRoaXMuc3ViTGF5ZXJzQnlOYW1lKFwiVU5NdXRlQ29udHJvbF9DaGFubmVsUGxheWVyXCIpWzBdLnZpc2libGU9ZmFsc2Vcblx0XHRcdFx0dGhpcy5wYXJlbnQucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIkNoYW5uZWxQbGF5ZXJTbWFsbFZpZGVvXCIpWzBdLnBsYXllci5tdXRlZD1mYWxzZVx0XHRcdFxuXHRcdG11dGVCdG5fcG9ydC5zdGF0ZVN3aXRjaChcIlVuTXV0ZVwiKVxuXHRcdG11dGVCdG5fcG9ydC5vbiBFdmVudHMuQ2xpY2ssLT5cblx0XHRcdHRoaXMuc3RhdGVDeWNsZShcIk11dGVcIixcIlVuTXV0ZVwiKVxuXHRcdFxuXG5cdFx0QFF1YWxpdHlTZXNzdGluZ01hc2sub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnZpc2libGU9ZmFsc2Vcblx0XHRcdHRoaXMucGFyZW50LndpZHRoPTM3NVxuXHRcdFx0dGhpcy5wYXJlbnQuaGVpZ2h0PTIxMFxuXHRcdEBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJTZXR0aW5nX0NoYW5uZWxQbGF5ZXJcIilbMF0ub24gRXZlbnRzLkNsaWNrLC0+XG5cdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiUXVhbGl0eVNlc3N0aW5nTWFza1wiKVswXS52aXNpYmxlPXRydWVcblx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJRdWFsaXR5U2Vzc3RpbmdNYXNrXCIpWzBdLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcblx0XHRcdHRoaXMucGFyZW50LnBhcmVudC53aWR0aD0zNzVcblx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5oZWlnaHQ9NjY3XG5cblx0XHRAQ29udHJvbE1hc2suc3ViTGF5ZXJzQnlOYW1lKFwiRnVsbHNjcmVlbl9DaGFubmVsUGxheWVyXCIpWzBdLm9uIEV2ZW50cy5DbGljaywtPlxuXHRcdFx0I+imgeaJvuWIsOawtOW5s+eVq+mdouS4i+eahOaOp+WItumghe+8jOS4puaKiueLgOaFi+aUueiuiu+8jOWFseacieS4ieWAi++8muiBsumfs+OAgeaSreaUvuOAgeaUvuWkp1xuXHRcdFx0I+S5n+imgeaJvuWIsOWeguebtOeahO+8jOeEtuW+jOaKiuWeguebtOeahOeLgOaFi2Fzc2lnbue1puawtOW5s+eahFxuXHRcdFx0Y29udHJvbE1hc2tfTGFuZHNjYXBlPXRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJjb250cm9sTWFza19MYW5kc2NhcGVcIilbMF1cblx0XHRcdGlmIE1hdGguYWJzKGNvbnRyb2xNYXNrX0xhbmRzY2FwZS5vZmZzZXRZWSk+MFxuXHRcdFx0XHQjcHJpbnQgXCLmnInkvY3np7vvvIzvvIzkuJTlm6DngrropoHlhajonqLluZXopoHmiormraTlhYPku7bnmoRjbGlw6Kit5oiQZmFsc2VcIlxuXHRcdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuY2xpcD1mYWxzZVxuXG5cblx0XHRcdFxuXHRcdFx0cGxheUJ0bl9sYW5kPWNvbnRyb2xNYXNrX0xhbmRzY2FwZS5zdWJMYXllcnNCeU5hbWUoXCJQbGF5QlROX0NoYW5uZWxQbGF5ZXJMYW5kc2NhcGVcIilbMF1cblx0XHRcdHBsYXlCdG5fcG9ydD10aGlzLnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJQbGF5QlROX0NoYW5uZWxQbGF5ZXJcIilbMF1cblx0XHRcdHBsYXlCdG5fbGFuZC5zdGF0ZVN3aXRjaChwbGF5QnRuX3BvcnQuc3RhdGVzLmN1cnJlbnQubmFtZSlcblxuXG5cdFx0XHRtdXRlQnRuX2xhbmQ9Y29udHJvbE1hc2tfTGFuZHNjYXBlLnN1YkxheWVyc0J5TmFtZShcIk11dGVfQ2hhbm5lbFBsYXllckxhbmRzY2FwZVwiKVswXVxuXHRcdFx0bXV0ZUJ0bl9wb3J0PXRoaXMucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIk11dGVCVE5Db250cm9sX0NoYW5uZWxQbGF5ZXJcIilbMF1cblx0XHRcdG11dGVCdG5fbGFuZC5zdGF0ZVN3aXRjaChtdXRlQnRuX3BvcnQuc3RhdGVzLmN1cnJlbnQubmFtZSlcblx0XHRcdFxuXG5cdFx0XHR6b29tQnRuX2xhbmQ9Y29udHJvbE1hc2tfTGFuZHNjYXBlLnN1YkxheWVyc0J5TmFtZShcIlpvb21fQ2hhbm5lbFBsYXllckxhbmRzY2FwZVwiKVswXVxuXHRcdFx0em9vbUJ0bl9wb3J0PXRoaXMucGFyZW50LnN1YkxheWVyc0J5TmFtZShcIlpvb21fQ2hhbm5lbFBsYXllclwiKVswXVxuXHRcdFx0em9vbUJ0bl9sYW5kLnN0YXRlU3dpdGNoKHpvb21CdG5fcG9ydC5zdGF0ZXMuY3VycmVudC5uYW1lKVxuXHRcdFx0XG5cdFx0XHRcblx0XHRcdFV0aWxzLmRlbGF5IDMsLT5cblx0XHRcdFx0Y29udHJvbE1hc2tfTGFuZHNjYXBlLmFuaW1hdGVcblx0XHRcdFx0XHRvcGFjaXR5OjBcblx0XHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdFx0dGltZTo0XG5cdFx0XHRcdFx0XHRjdXJ2ZTpcImVhc3ktaW5cIlxuXG5cblxuXHRcdFx0XG5cdFx0XHRAZG9pc3JvdGF0ZWQ9XCJZXCJcblx0XHRcdHRoaXMucGFyZW50LnBhcmVudC53aWR0aD0zNzVcblx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5oZWlnaHQ9NjY3XG5cblxuXHRcdFx0cGxheWVyPSB0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF1cblx0XHRcdGNvbnRyb2xNYXNrX0xhbmRzY2FwZT10aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiY29udHJvbE1hc2tfTGFuZHNjYXBlXCIpWzBdXG5cdFx0XHRjb250cm9sTWFza19MYW5kc2NhcGUuYnJpbmdUb0Zyb250KClcblx0XHRcdHBsYXllci53aWR0aD02Njdcblx0XHRcdHBsYXllci5oZWlnaHQ9Mzc1XHRcdFx0XG5cdFx0XHRwbGF5ZXIucm90YXRpb249OTBcblx0XHRcdCNwcmludCBjb250cm9sTWFza19MYW5kc2NhcGUub2Zmc2V0WVlcblxuXG5cblx0XHRcdHBsYXllci54PS0xNDZcblx0XHRcdHBsYXllci55PTE0Ni1jb250cm9sTWFza19MYW5kc2NhcGUub2Zmc2V0WVlcblx0XHRcdHRoaXMucGFyZW50LnZpc2libGU9ZmFsc2Vcblx0XHRcdGNvbnRyb2xNYXNrX0xhbmRzY2FwZS52aXNpYmxlPXRydWVcblxuXHRcdFx0Y29udHJvbE1hc2tfTGFuZHNjYXBlLnJvdGF0aW9uPTkwXG5cdFx0XHRjb250cm9sTWFza19MYW5kc2NhcGUueD0tMTQ2XG5cdFx0XHRjb250cm9sTWFza19MYW5kc2NhcGUueT0xNDYtY29udHJvbE1hc2tfTGFuZHNjYXBlLm9mZnNldFlZXG5cblx0XHRAQ29udHJvbE1hc2tfTGFuZHNjYXBlLnN1YkxheWVyc0J5TmFtZShcIkZ1bGxTY3JlZW5fQ2hhbm5lbFBsYXllckxhbmRzY2FwZVwiKVswXS5vbiBFdmVudHMuQ2xpY2ssLT5cblx0XHRcdHRoaXMucGFyZW50LnBhcmVudC5jbGlwPXRydWVcblx0XHRcdGNvbnRyb2xNYXNrPXRoaXMucGFyZW50LnBhcmVudC5zdWJMYXllcnNCeU5hbWUoXCJMYXllclBsYXllck1hc2tcIilbMF1cblx0XHRcdGNvbnRyb2xNYXNrLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRjb250cm9sTWFzay52aXNpYmxlPXRydWVcblx0XHRcdGNvbnRyb2xNYXNrX0xhbmRzY2FwZT10aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiY29udHJvbE1hc2tfTGFuZHNjYXBlXCIpWzBdXG5cdFx0XHRjb250cm9sTWFza19MYW5kc2NhcGUudmlzaWJsZT1mYWxzZVxuXG5cdFx0XHQjdGhpcy52aXNpYmxlPWZhbHNlXG5cdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQud2lkdGg9Mzc1XG5cdFx0XHR0aGlzLnBhcmVudC5wYXJlbnQuaGVpZ2h0PTIxMFxuXHRcdFx0cGxheWVyPSB0aGlzLnBhcmVudC5wYXJlbnQuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF1cblx0XHRcdHBsYXllci53aWR0aD0zNzVcblx0XHRcdHBsYXllci5oZWlnaHQ9MjEwXHRcdFx0XG5cdFx0XHRwbGF5ZXIucm90YXRpb249MFxuXHRcdFx0cGxheWVyLng9MFxuXHRcdFx0cGxheWVyLnk9MFxuXG5cdFJvdGF0aW9uQmFjazogLT5cblx0XHRAQ29udHJvbE1hc2suc3ViTGF5ZXJzQnlOYW1lKFwiVW5GdWxsU2NyZWVuX0NoYW5uZWxQbGF5ZXJcIilbMF0udmlzaWJsZT1mYWxzZVxuXHRcdEBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJGdWxsc2NyZWVuX0NoYW5uZWxQbGF5ZXJcIilbMF0udmlzaWJsZT10cnVlXG5cdFx0cGxheWVyPUAuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF1cblx0XHRAcm90YXRpb249MFxuXHRcdEBzY2FsZT0xXG5cdFx0QElzUm90YXRlZD1mYWxzZVxuXHRcdEB4PUAub3JpX1hYXG5cdFx0QHk9QC5vcmlfWVlcblx0Tm93U3RhdGU6IC0+XG5cdFx0QGRvaXNyb3RhdGVkXG5cblx0U1RPUDogLT5cblx0XHQj5Zyo6aCB6Z2i5LiK5oyJ5LiLYmFja++8jOacg+inuOeZvOatpOWFg+S7tueahOS6i+S7tuOAguimgeiomOW+l+mghuS+v+i9ieWQkVxuXHRcdCBcblx0XHRjb250cm9sTWFzaz1ALnN1YkxheWVyc0J5TmFtZShcIkxheWVyUGxheWVyTWFza1wiKVswXVxuXHRcdGNvbnRyb2xNYXNrLmJyaW5nVG9Gcm9udCgpXG5cdFx0Y29udHJvbE1hc2sudmlzaWJsZT10cnVlXG5cdFx0Y29udHJvbE1hc2tfTGFuZHNjYXBlPUAuc3ViTGF5ZXJzQnlOYW1lKFwiY29udHJvbE1hc2tfTGFuZHNjYXBlXCIpWzBdXG5cdFx0Y29udHJvbE1hc2tfTGFuZHNjYXBlLnZpc2libGU9ZmFsc2VcblxuXHRcdHRoaXMucGFyZW50LndpZHRoPTM3NVxuXHRcdHRoaXMucGFyZW50LmhlaWdodD0yMTBcblx0XHQjeWVzXG5cdFx0cGxheWVyPUAuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF1cblx0XHRcblx0XHRwbGF5ZXIud2lkdGg9Mzc1XG5cdFx0cGxheWVyLmhlaWdodD0yMTBcdFx0XHRcblx0XHRwbGF5ZXIucm90YXRpb249MFxuXHRcdHBsYXllci54PTBcblx0XHRwbGF5ZXIueT0wXHRcdFxuXHRcdFxuXHRcdHBsYXllci5wbGF5ZXIucGF1c2UoKVxuXG5cdFNob3c6IC0+XG5cdFx0Y2hpbGRNYXNrPUBDb250cm9sTWFza1xuXHRcdEBDb250cm9sTWFzay5zdWJMYXllcnNCeU5hbWUoXCJQbGF5QlROX0NoYW5uZWxQbGF5ZXJcIilbMF0uc3RhdGVTd2l0Y2goXCJQbGF5XCIpXG5cblx0XHQjcGxheWVyPUAuc3ViTGF5ZXJzQnlOYW1lKFwiQ2hhbm5lbFBsYXllclNtYWxsVmlkZW9cIilbMF1cblx0XHR0aGlzLnZpc2libGU9dHJ1ZVxuXHRcdHRoaXMueD10aGlzLm9yaV9YWFxuXHRcdHRoaXMueT10aGlzLm9yaV9ZWVxuXHRcdFV0aWxzLmRlbGF5IDMsLT5cblx0XHRcdGNoaWxkTWFzay5hbmltYXRlXG5cdFx0XHRcdG9wYWNpdHk6MFxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdHRpbWU6NFxuXHRcdFx0XHRcdGN1cnZlOlwiZWFzeS1pblwiXG5cdFx0I3BsYXllci5wbGF5ZXIuY3VycmVudFRpbWU9MFxuXHRcdCNwbGF5ZXIucGxheWVyLnBsYXkoKVxuXHRDbGlja01lOi0+XG5cdFx0XG5cdFx0aG9yTWFzaz1AQ29udHJvbE1hc2tfTGFuZHNjYXBlXG5cdFx0aG9yTWFzay5hbmltYXRlXG5cdFx0XHRcdG9wYWNpdHk6MVxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6XCJlYXN5LWluXCJcblx0XHRVdGlscy5kZWxheSAzLC0+XG5cdFx0XHRob3JNYXNrLmFuaW1hdGVcblx0XHRcdFx0b3BhY2l0eTowXG5cdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0dGltZTo0XG5cdFx0XHRcdFx0Y3VydmU6XCJlYXN5LWluXCJcblxuXHRcdGNoaWxkTWFzaz1AQ29udHJvbE1hc2tcblx0XHRcblx0XHRjaGlsZE1hc2suYW5pbWF0ZVxuXHRcdFx0XHRvcGFjaXR5OjFcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6MC4yXG5cdFx0XHRcdGN1cnZlOlwiZWFzeS1pblwiXG5cdFx0VXRpbHMuZGVsYXkgMywtPlxuXHRcdFx0Y2hpbGRNYXNrLmFuaW1hdGVcblx0XHRcdFx0b3BhY2l0eTowXG5cdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0dGltZTo0XG5cdFx0XHRcdFx0Y3VydmU6XCJlYXN5LWluXCIiLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUdBQTtBREVBLElBQUE7OztBQUFNLE1BQU0sQ0FBQzs7O29CQUNaLE1BQUEsR0FBTzs7b0JBQ1AsTUFBQSxHQUFPOztFQUNNLGlCQUFDLE9BQUQ7QUFDWixRQUFBO0lBRGEsSUFBQyxDQUFBLDRCQUFELFVBQVM7O1VBQ2QsQ0FBQyxZQUFhOztJQUN0QixJQUFDLENBQUEsT0FB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
