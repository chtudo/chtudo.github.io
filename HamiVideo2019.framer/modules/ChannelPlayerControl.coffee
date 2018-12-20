#Events.BackEventFire  = "backEventFire"

class module.exports extends Layer
	ori_XX:0
	ori_YY:0
	constructor: (@options={}) ->
		@options.isrotated ?= "N"
		@options.width=375
		@options.height=210
		@options.ori_X ?= 0
		@options.ori_Y ?= 0
		@options.backgroundColor="Transparent"
		@options.isSelectable ?= true
		@options.clip=true
		@options.name ?= "ChannelPlayerControl"
		@ControlMask=@options.ControlMask
		@Video=@options.Video
		#@options.x=@.ori_XX
		#@options.y=@.ori_YY
		

		super @options
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
		@ControlMask.bringToFront()
		@ControlMask.name="LayerPlayerMask"
		@ControlMask.subLayersByName("ZoomOUT_ChannelPlayer")[0].visible=false
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
		@ControlMask.subLayersByName("Continue_ChannelPlayer")[0].visible=false
		@ControlMask.subLayersByName("Pause_ChannelPlayer")[0].on Events.Click,->
			this.parent.subLayersByName("Continue_ChannelPlayer")[0].visible=true
			this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.pause()
			this.visible=false

		@ControlMask.subLayersByName("Continue_ChannelPlayer")[0].on Events.Click,->
			this.parent.subLayersByName("Pause_ChannelPlayer")[0].visible=true
			this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.play()
			this.visible=false
		
		
		
		
		@ControlMask.subLayersByName("UNMuteControl_ChannelPlayer")[0].visible=false
		@ControlMask.subLayersByName("MuteControl_ChannelPlayer")[0].on Events.Click,->
			this.parent.subLayersByName("UNMuteControl_ChannelPlayer")[0].visible=true
			this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.muted=true
			this.visible=false

		@ControlMask.subLayersByName("UNMuteControl_ChannelPlayer")[0].on Events.Click,->
			this.parent.subLayersByName("MuteControl_ChannelPlayer")[0].visible=true
			this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].player.muted=false
			this.visible=false
			
						
		@ControlMask.subLayersByName("ZoomIN_ChannelPlayer")[0].on Events.Click,->
			this.parent.subLayersByName("ZoomOUT_ChannelPlayer")[0].visible=true
			this.visible=false
			this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].scale=1.33
			#假設為iPhoneXS,則放大1.2175倍
		@ControlMask.subLayersByName("ZoomOUT_ChannelPlayer")[0].on Events.Click,->
			this.parent.subLayersByName("ZoomIN_ChannelPlayer")[0].visible=true
			this.visible=false
			this.parent.parent.subLayersByName("ChannelPlayerSmallVideo")[0].scale=1

		@ControlMask.subLayersByName("Fullscreen_ChannelPlayer")[0].on Events.Click,->
			this.parent.subLayersByName("UnFullScreen_ChannelPlayer")[0].visible=true
			this.visible=false
			#要跳出另外一個播放器
			this.parent.parent.animate
				rotation:90
				scale:(667/375)
				x:0
				y:228
				options:
					time:0.1
			
			@doisrotated="Y"
			#print @doisrotated,"<----"
		@ControlMask.subLayersByName("UnFullScreen_ChannelPlayer")[0].on Events.Click,->
			 
			#@.RotationBack()

			#return

			this.parent.subLayersByName("Fullscreen_ChannelPlayer")[0].visible=true
			this.visible=false
			#print this.parent.parent,"<unfs"
			this.parent.parent.animate
				rotation:0
				scale:1
				options:
					time:0.1
			#print "Unfullsc",this.parent.parent.ori_XX,this.parent.parent.ori_YY
			this.parent.parent.x=this.parent.parent.ori_XX
			this.parent.parent.y=this.parent.parent.ori_YY
			@doisrotated="Y"
			#print @doisrotated,"<--UnFullScreen--"
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
		player=@.subLayersByName("ChannelPlayerSmallVideo")[0]
		player.player.pause()
		#@rotation=0
		#@scale=1
		#@IsRotated=false
		#@x=this.ori_XX
		#@y=this.ori_YY
		#print "setting false"
	Show: ->
		#print this.ori_XX,this.ori_YY
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