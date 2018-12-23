
class module.exports extends Layer
	ori_XX:0
	ori_YY:0
	constructor: (@options={}) ->
		@options.width=375
		@options.height=667
		@options.ori_X ?= 0
		@options.ori_Y ?= 0
		@options.backgroundColor="Transparent"
		@options.isSelectable ?= true
		@options.clip=true
		@options.name ?= "ChannelPlayerControl"
		@IsDrama =@options.IsDrama
		@ControlMask=@options.ControlMask
		@QualitySesstingMask=@options.QualitySesstingMask
		@DeviceSupportMask=@options.DeviceSupportMask
		@VODSelectSessionMask=@options.VODSelectSessionMask
		#print @options.QualitySesstingMask,@QualitySesstingMask
		@Video=@options.Video
		@ControlMask.rotation=90
		@ControlMask.x=-146
		@ControlMask.y=146
		
		@DeviceSupportMask.rotation=90
		@DeviceSupportMask.x=-146
		@DeviceSupportMask.y=146


		@QualitySesstingMask.rotation=90
		@QualitySesstingMask.x=-146
		@QualitySesstingMask.y=146

		@VODSelectSessionMask.rotation=90
		@VODSelectSessionMask.x=-146
		@VODSelectSessionMask.y=146

		super @options
		@.onClick @ClickMe
		layerPlayerSmallVideo=new VideoLayer
			width: 667
			height: 375
			name:"ChannelPlayerSmallVideo"
			video: @options.Video
			parent:	@
			x:-146
			y:146
			rotation:90
			backgroundColor: "Black"
# 		layerPlayerSmallVideo.player.muted=true
		layerPlayerSmallVideo.player.loop=true
		#layerPlayerMask=@options.ControlMask
		@DeviceSupportMask.parent=@
		@DeviceSupportMask.visible=false
		@DeviceSupportMask.name="DeviceSupportMask"
		
		@QualitySesstingMask.parent=@
		@QualitySesstingMask.visible=false
		@QualitySesstingMask.name="QualitySesstingMask"
		

		@VODSelectSessionMask.parent=@
		@VODSelectSessionMask.name="VODSelectSessionMask"
		@VODSelectSessionMask.visible=false
		@ControlMask.parent=@
		@ControlMask.bringToFront()
		@ControlMask.name="LayerPlayerMask"
		numlayer=@ControlMask.subLayersByName("VODPlayer_BitrateNumber")[0]
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
	
	@define 'qualitySesstingMask',
		get: -> 
			@QualitySesstingMask	
#		set: (value) -> 
#			@options.isrotated = value
	InitialEvent: ->		
		#print @IsDrama
		DeviceHintBTN=@ControlMask.subLayersByName("DeviceSupport_LandscapeVOD")[0]


		QualityBTN=@ControlMask.subLayersByName("VODPlayer_Quality")[0]
		SessionBTN=@ControlMask.subLayersByName("VODPlayer_SessionSelector")[0]

		NextSessionBTN=@ControlMask.subLayersByName("VODPlayer_Next")[0]
		PrevSessionBTN=@ControlMask.subLayersByName("VODPlayer_Prev")[0]
		
		if @IsDrama
			SessionBTN.visible=true
			NextSessionBTN.visible=true
			PrevSessionBTN.visible=true
		else
			SessionBTN.visible=false
			NextSessionBTN.visible=false
			PrevSessionBTN.visible=false
		QualityBTN.states.ShowQ=
			opacity:1
		QualityBTN.states.UnShowQ=
			opacity:1
		QualityBTN.on Events.StateWillSwitch,(from, to, states)->
			if to=="ShowQ"
				this.parent.parent.subLayersByName("QualitySesstingMask")[0].visible=true
				this.parent.parent.subLayersByName("QualitySesstingMask")[0].bringToFront()
			else
				print "NoShowQ"
		QualityBTN.on Events.Click,->
			this.stateSwitch("ShowQ")
			#@options.QualitySesstingMask.visible=true
		DeviceHintBTN.on Events.Click,->
			this.parent.parent.subLayersByName("DeviceSupportMask")[0].visible=true
			this.parent.parent.subLayersByName("DeviceSupportMask")[0].bringToFront()
		SessionBTN.on Events.Click,->
			this.parent.parent.subLayersByName("VODSelectSessionMask")[0].visible=true
			this.parent.parent.subLayersByName("VODSelectSessionMask")[0].bringToFront()
		@DeviceSupportMask.on Events.Click,->
			this.visible=false
		@QualitySesstingMask.on Events.Click,->
			this.visible=false
		@VODSelectSessionMask.on Events.Click,->
			this.visible=false
			
		playBtn=@ControlMask.subLayersByName("VODPlayer_Play")[0]
		playBtn.states.Play=
			opacity:1
		playBtn.states.Pause=
			opacity:1
		playBtn.on Events.StateWillSwitch,(from, to, states)->
			if to=="Pause"
				this.subLayersByName("VODPlayer_PlayState_Play")[0].visible=true
				this.subLayersByName("VODPlayer_PlayState_Pause")[0].visible=false
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.pause()			
			else
				this.subLayersByName("VODPlayer_PlayState_Play")[0].visible=false
				this.subLayersByName("VODPlayer_PlayState_Pause")[0].visible=true
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.play()			
		playBtn.stateSwitch("Play")

		playBtn.on Events.Click,->
			this.stateCycle("Pause","Play")

		ZoomBtn=@ControlMask.subLayersByName("VODPlayer_Zoom")[0]
		ZoomBtn.states.ZoomIn=
			opacity:1
		ZoomBtn.states.ZoomOut=
			opacity:1
		ZoomBtn.on Events.StateWillSwitch,(from, to, states)->
			if to=="ZoomIn"
				this.subLayersByName("VODPlayer_ZoomState_ZoomIn")[0].visible=false
				this.subLayersByName("VODPlayer_ZoomState_ZoomOut")[0].visible=true
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].scale=1.333

			else
				this.subLayersByName("VODPlayer_ZoomState_ZoomIn")[0].visible=true
				this.subLayersByName("VODPlayer_ZoomState_ZoomOut")[0].visible=false
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].scale=1			
		ZoomBtn.stateSwitch("ZoomOut")
		ZoomBtn.on Events.Click,->
			this.stateCycle("ZoomIn","ZoomOut")
		MuteBtn=@ControlMask.subLayersByName("VODPlayer_Sound")[0]
		MuteBtn.states.Mute=
			opacity:1
		MuteBtn.states.UnMute=
			opacity:1
		MuteBtn.on Events.StateWillSwitch,(from, to, states)->
			if to=="Mute"
				this.subLayersByName("VODPlayer_SoundUnMute")[0].visible=true
				this.subLayersByName("VODPlayer_SoundMute")[0].visible=false
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.muted=true			
			else
				this.subLayersByName("VODPlayer_SoundUnMute")[0].visible=false
				this.subLayersByName("VODPlayer_SoundMute")[0].visible=true
				this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.muted=false		
		MuteBtn.stateSwitch("UnMute")
		MuteBtn.on Events.Click,->
			this.stateCycle("UnMute","Mute")
		
		FastBtn=@ControlMask.subLayersByName("VODPlayer_Fast10SecHint")[0]
		BackBtn=@ControlMask.subLayersByName("VODPlayer_Back10SecHint")[0]
		
		FastBtn.on Events.DoubleTap,->
			player=this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player
			player.currentTime=player.currentTime+10
			
		BackBtn.on Events.DoubleTap,->
			player=this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player
			
			player.currentTime=player.currentTime-10
			
	RotationBack: ->
		@ControlMask.subLayersByName("UnFullScreen_ChannelPlayer")[0].visible=false
		@ControlMask.subLayersByName("Fullscreen_ChannelPlayer")[0].visible=true
		player=@.subLayersByName("ChannelPlayerSmallVideo")[0]
		@rotation=0
		@scale=1
		@IsRotated=false
		@x=@.ori_XX
		@y=@.ori_YY

	STOP: ->
		player=@.subLayersByName("ChannelPlayerSmallVideo")[0]
		player.player.pause()

	Show: ->
		childMask=@ControlMask
		player=@.subLayersByName("ChannelPlayerSmallVideo")[0]
		this.visible=true
		this.x=this.ori_XX
		this.y=this.ori_YY
		Utils.delay 3,->
			childMask.animate
				opacity:0
				options:
					time:4
					curve:"easy-in"
		player.player.currentTime=0
		player.player.play()
	ClickMe:->
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