#Events.BackEventFire  = "backEventFire"

class module.exports extends Layer
	ori_XX:0
	ori_YY:0
	constructor: (@options={}) ->
		@options.isrotated ?= "N"
		@options.width=375
		@options.height=210
		@options.ori_XX ?= 0
		@options.ori_YY ?= 0
		@options.backgroundColor="Transparent"
		@options.isSelectable ?= true
		#@options.clip=true
		@options.name ?= "ChannelPlayerControl"
		@ControlMask=@options.ControlMask
		@ControlMask_Landscape=@options.ControlMask_Landscape
		@QualitySesstingMask=@options.QualitySesstingMask
		@Video=@options.Video
		#@options.x=@.ori_XX
		#@options.y=@.ori_YY
		@offsetY=@options.ori_YY
		@ControlMask_Landscape.offsetYY=@offsetY


		super @options

		@QualitySesstingMask.parent=@
		@QualitySesstingMask.x=@options.ori_XX
		@QualitySesstingMask.y=-@options.ori_YY
		@QualitySesstingMask.visible=false
		@QualitySesstingMask.name="QualitySesstingMask"		
		@.clip=true
		@.onClick @ClickMe
		layerPlayerSmallVideo=new VideoLayer
			width: 375
			height: 210
			name:"ChannelPlayerSmallVideo"
			video: @options.Video#"images/SportVoD.mp4"
			parent:	@		
# 		layerPlayerSmallVideo.player.muted=true
		layerPlayerSmallVideo.player.loop=true
		layerPlayerMask=@options.ControlMask
		@ControlMask.parent=@
		@ControlMask_Landscape.parent=@
		@ControlMask_Landscape.visible=false
		@ControlMask_Landscape.name="controlMask_Landscape"
		
		@ControlMask.bringToFront()
		@ControlMask.name="LayerPlayerMask"
		#@ControlMask.subLayersByName("ZoomOUT_ChannelPlayer")[0].visible=false
		@ControlMask.subLayersByName("UnFullScreen_ChannelPlayer")[0].visible=false
		numlayer=@ControlMask.subLayersByName("BitRate_ChannelPlayer")[0].subLayersByName("bitratenum")[0]
		numlayer.visible=false
		textNum=new TextLayer
			text: "{speed}mbps"
			x:numlayer.x
			y:numlayer.y
			parent:numlayer.parent
			fontSize:10
			color:"#AAAAAA"
		textNum.templateFormatter = 
			speed:(value)->
				Utils.round(value,0)
		Utils.interval 2,->
			textNum.animate
				template:
					speed:Utils.randomNumber(70,90)
		
	@define 'doisrotated',
		get: -> 
			@options.isrotated	
		set: (value) -> 
			@options.isrotated = value
	InitialEvent: ->		
		#---PlayBTN Landscape
		playBtn_land=@ControlMask_Landscape.subLayersByName("PlayBTN_ChannelPlayerLandscape")[0]
		playBtn_port=@ControlMask.subLayersByName("PlayBTN_ChannelPlayer")[0]
		
		playBtn_land.states.Play=
			opacity:1
		playBtn_land.states.Pause=
			opacity:1
		playBtn_port.states.Play=
			opacity:1
		playBtn_port.states.Pause=
			opacity:1			
		playBtn_land.on Events.StateWillSwitch,(from, to, states)->
			if to=="Pause"
				this.subLayersByName("PlayBTN_ChannelPlayerLandscape_State_Play")[0].visible=true
				this.subLayersByName("PlayBTN_ChannelPlayerLandscape_State_Pause")[0].visible=false
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.pause()
			else
				this.subLayersByName("PlayBTN_ChannelPlayerLandscape_State_Play")[0].visible=false
				this.subLayersByName("PlayBTN_ChannelPlayerLandscape_State_Pause")[0].visible=true
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.play()
		playBtn_land.stateSwitch("Pause")
		playBtn_land.on Events.Click,->
			this.stateCycle("Play","Pause")
			#playBtn_port.stateCycle("Play","Pause")
		#---PlayBTN Landscape End
		#---PlayBTN 
		

		playBtn_port.on Events.StateWillSwitch,(from, to, states)->
			if to=="Pause"
				this.subLayersByName("Continue_ChannelPlayer")[0].visible=true
				this.subLayersByName("Pause_ChannelPlayer")[0].visible=false
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.pause()

			else
				this.subLayersByName("Continue_ChannelPlayer")[0].visible=false
				this.subLayersByName("Pause_ChannelPlayer")[0].visible=true
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.play()

		playBtn_port.stateSwitch("Pause")
		playBtn_port.on Events.Click,->
			this.stateCycle("Play","Pause")
			#playBtn_land.stateCycle("Play","Pause")
		#---PlayBTN  End

		#---Zoom Landscape
		zoomBtn_land=@ControlMask_Landscape.subLayersByName("Zoom_ChannelPlayerLandscape")[0]
		
		zoomBtn_land.states.ZoomIn=
			opacity:1
		zoomBtn_land.states.ZoomOut=
			opacity:1
		zoomBtn_land.on Events.StateWillSwitch,(from, to, states)->
			if to=="ZoomIn"
				this.subLayersByName("Zoom_ChannelPlayerLandscape_State_ZoomIn")[0].visible=false
				this.subLayersByName("Zoom_ChannelPlayerLandscape_State_ZoomOut")[0].visible=true
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].scale=1.333

			else
				this.subLayersByName("Zoom_ChannelPlayerLandscape_State_ZoomIn")[0].visible=true
				this.subLayersByName("Zoom_ChannelPlayerLandscape_State_ZoomOut")[0].visible=false
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].scale=1			
		zoomBtn_land.stateSwitch("ZoomOut")
		zoomBtn_land.on Events.Click,->
			this.stateCycle("ZoomIn","ZoomOut")
		#---Zoom Landscape End

		#-----Zoom
		zoomBtn_port=@ControlMask.subLayersByName("Zoom_ChannelPlayer")[0]
		zoomBtn_port.states.ZoomIn=
			opacity:1
		zoomBtn_port.states.ZoomOut=
			opacity:1
		
		zoomBtn_port.on Events.StateWillSwitch,(from, to, states)->
			if to=="ZoomIn"
				this.subLayersByName("ZoomIN_ChannelPlayer")[0].visible=false
				this.subLayersByName("ZoomOUT_ChannelPlayer")[0].visible=true
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].scale=1.333
				#假設為iPhoneXS,則放大1.2175倍

			else
				this.subLayersByName("ZoomIN_ChannelPlayer")[0].visible=true
				this.subLayersByName("ZoomOUT_ChannelPlayer")[0].visible=false
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].scale=1			
		zoomBtn_port.stateSwitch("ZoomOut")
		zoomBtn_port.on Events.Click,->
			this.stateCycle("ZoomIn","ZoomOut")
		#----	

		#---Mute Landscape
		muteBtn_land=@ControlMask_Landscape.subLayersByName("Mute_ChannelPlayerLandscape")[0]
		muteBtn_land.states.Mute=
			opacity:1
		muteBtn_land.states.UnMute=
			opacity:1
		muteBtn_land.on Events.StateWillSwitch,(from, to, states)->
			if to=="Mute"
				this.subLayersByName("Mute_ChannelPlayerLandscape_State_Mute")[0].visible=false
				this.subLayersByName("Mute_ChannelPlayerLandscape_State_UnMute")[0].visible=true
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.muted=true
			
			else
				this.subLayersByName("Mute_ChannelPlayerLandscape_State_Mute")[0].visible=true
				this.subLayersByName("Mute_ChannelPlayerLandscape_State_UnMute")[0].visible=false
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.muted=false			
		muteBtn_land.stateSwitch("UnMute")
		muteBtn_land.on Events.Click,->
			this.stateCycle("Mute","UnMute")
		#---Mute Landscape End
		#---Mute Portrait
		muteBtn_port=@ControlMask.subLayersByName("MuteBTNControl_ChannelPlayer")[0]
		muteBtn_port.states.Mute=
			opacity:1
		muteBtn_port.states.UnMute=
			opacity:1
		muteBtn_port.on Events.StateWillSwitch,(from, to, states)->
			if to=="Mute"
				this.subLayersByName("MuteControl_ChannelPlayer")[0].visible=false
				this.subLayersByName("UNMuteControl_ChannelPlayer")[0].visible=true
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.muted=true
				
			else
				this.subLayersByName("MuteControl_ChannelPlayer")[0].visible=true
				this.subLayersByName("UNMuteControl_ChannelPlayer")[0].visible=false
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.muted=false			
		muteBtn_port.stateSwitch("UnMute")
		muteBtn_port.on Events.Click,->
			this.stateCycle("Mute","UnMute")
		

		@QualitySesstingMask.on Events.Click,->
			this.visible=false
			this.parent.width=375
			this.parent.height=210
		@ControlMask.subLayersByName("Setting_ChannelPlayer")[0].on Events.Click,->
			this.parent.parent.subLayersByName("QualitySesstingMask")[0].visible=true
			this.parent.parent.subLayersByName("QualitySesstingMask")[0].bringToFront()
			
			this.parent.parent.width=375
			this.parent.parent.height=667

		@ControlMask.subLayersByName("Fullscreen_ChannelPlayer")[0].on Events.Click,->
			#要找到水平畫面下的控制項，並把狀態改變，共有三個：聲音、播放、放大
			#也要找到垂直的，然後把垂直的狀態assign給水平的
			controlMask_Landscape=this.parent.parent.subLayersByName("controlMask_Landscape")[0]
			if Math.abs(controlMask_Landscape.offsetYY)>0
				#print "有位移，，且因為要全螢幕要把此元件的clip設成false"
				this.parent.parent.clip=false


			
			playBtn_land=controlMask_Landscape.subLayersByName("PlayBTN_ChannelPlayerLandscape")[0]
			playBtn_port=this.parent.subLayersByName("PlayBTN_ChannelPlayer")[0]
			playBtn_land.stateSwitch(playBtn_port.states.current.name)


			muteBtn_land=controlMask_Landscape.subLayersByName("Mute_ChannelPlayerLandscape")[0]
			muteBtn_port=this.parent.subLayersByName("MuteBTNControl_ChannelPlayer")[0]
			muteBtn_land.stateSwitch(muteBtn_port.states.current.name)
			

			zoomBtn_land=controlMask_Landscape.subLayersByName("Zoom_ChannelPlayerLandscape")[0]
			zoomBtn_port=this.parent.subLayersByName("Zoom_ChannelPlayer")[0]
			zoomBtn_land.stateSwitch(zoomBtn_port.states.current.name)
			
			
			Utils.delay 3,->
				controlMask_Landscape.animate
					opacity:0
					options:
						time:4
						curve:"easy-in"



			
			@doisrotated="Y"
			this.parent.parent.width=375
			this.parent.parent.height=667


			player= this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0]
			controlMask_Landscape=this.parent.parent.subLayersByName("controlMask_Landscape")[0]
			controlMask_Landscape.bringToFront()
			player.width=667
			player.height=375			
			player.rotation=90
			#print controlMask_Landscape.offsetYY



			player.x=-146
			player.y=146-controlMask_Landscape.offsetYY
			this.parent.visible=false
			controlMask_Landscape.visible=true

			controlMask_Landscape.rotation=90
			controlMask_Landscape.x=-146
			controlMask_Landscape.y=146-controlMask_Landscape.offsetYY

		@ControlMask_Landscape.subLayersByName("FullScreen_ChannelPlayerLandscape")[0].on Events.Click,->
			this.parent.parent.clip=true
			controlMask=this.parent.parent.subLayersByName("LayerPlayerMask")[0]
			controlMask.bringToFront()
			controlMask.visible=true
			controlMask_Landscape=this.parent.parent.subLayersByName("controlMask_Landscape")[0]
			controlMask_Landscape.visible=false

			#this.visible=false
			this.parent.parent.width=375
			this.parent.parent.height=210
			player= this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0]
			player.width=375
			player.height=210			
			player.rotation=0
			player.x=0
			player.y=0

	RotationBack: ->
		@ControlMask.subLayersByName("UnFullScreen_ChannelPlayer")[0].visible=false
		@ControlMask.subLayersByName("Fullscreen_ChannelPlayer")[0].visible=true
		player=@.subLayersByName("ChannelPlayerSmallVideo")[0]
		@rotation=0
		@scale=1
		@IsRotated=false
		@x=@.ori_XX
		@y=@.ori_YY
	NowState: ->
		@doisrotated

	STOP: ->
		#在頁面上按下back，會觸發此元件的事件。要記得順便轉向
		 
		controlMask=@.subLayersByName("LayerPlayerMask")[0]
		controlMask.bringToFront()
		controlMask.visible=true
		controlMask_Landscape=@.subLayersByName("controlMask_Landscape")[0]
		controlMask_Landscape.visible=false

		this.parent.width=375
		this.parent.height=210
		#yes
		player=@.subLayersByName("ChannelPlayerSmallVideo")[0]
		
		player.width=375
		player.height=210			
		player.rotation=0
		player.x=0
		player.y=0		
		
		player.player.pause()

	Show: ->
		childMask=@ControlMask
		@ControlMask.subLayersByName("PlayBTN_ChannelPlayer")[0].stateSwitch("Play")

		#player=@.subLayersByName("ChannelPlayerSmallVideo")[0]
		this.visible=true
		this.x=this.ori_XX
		this.y=this.ori_YY
		Utils.delay 3,->
			childMask.animate
				opacity:0
				options:
					time:4
					curve:"easy-in"
		#player.player.currentTime=0
		#player.player.play()
	ClickMe:->
		
		horMask=@ControlMask_Landscape
		horMask.animate
				opacity:1
			options:
				time:0.2
				curve:"easy-in"
		Utils.delay 3,->
			horMask.animate
				opacity:0
				options:
					time:4
					curve:"easy-in"

		childMask=@ControlMask
		
		childMask.animate
				opacity:1
			options:
				time:0.2
				curve:"easy-in"
		Utils.delay 3,->
			childMask.animate
				opacity:0
				options:
					time:4
					curve:"easy-in"