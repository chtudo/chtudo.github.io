# Import file "MODHome_201805v2_Framer_08update"
class TwoScenarioComponent extends Layer
	constructor: (options={}) ->
		options.width=32
		options.height=65
		options.backgroundColor="Transparent"
		options.isSelectable=true
		super options


		@.states.focus=
			visible: true

		@.states.blur=
			visible: true
	
		options.DefaultComponent.parent=@
		options.DefaultComponent.x=0
		options.DefaultComponent.y=0
		options.FocusComponent.parent=@
		options.FocusComponent.x=-120
		options.FocusComponent.y=-180
	
		
		options.DefaultComponent.states.focus=
			visible:true
		options.DefaultComponent.states.blur=
			visible:false
		options.DefaultComponent.stateSwitch("focus")
		options.FocusComponent.states.focus=
			visible:true
		options.FocusComponent.states.blur=
			visible:false
		options.FocusComponent.stateSwitch("blur")


		@.on "focus",->
			@.stateSwitch("focus")
			@.bringToFront()
			options.DefaultComponent.stateSwitch("blur")
			options.FocusComponent.stateSwitch("focus")
		@.on "blur",->
			@.stateSwitch("blur")
			options.DefaultComponent.stateSwitch("focus")
			options.FocusComponent.stateSwitch("blur")
			
		@.on "a",->
			@.stateSwitch("focus")
			for sub in @.children
				sub.stateSwitch("focus")
		@.stateSwitch("focus")

class ScaleCommandFirstRowVisibleBTN extends Layer
	constructor: (options={}) ->

		options.width=options.BASECOMPONENT.width
		options.height=options.BASECOMPONENT.height		
		
		options.backgroundColor="Transparent"
		options.name=options.BASECOMPONENT.name#"commandBTN_"+options.TAGLABEL
		options.isSelectable=true
		super options

		
		@.states.focus=
			opacity: 1

		@.states.blur=
			opacity: 1
		options.BGMask=""

			
		options.BASECOMPONENT.parent=@
		options.BASECOMPONENT.x=0
		options.BASECOMPONENT.y=0
		options.BASECOMPONENT.scale=1
		options.BASECOMPONENT.states.focus=
			scale:1.34
			borderColor:"Black"
			borderWidth:4
			shadowBlur:40
			borderColor:"#FF9900"
			borderRadius:20
			shadowColor:"Black"
			visible:true
			#style["outline"]:"4px solid #F5A623"
		options.BASECOMPONENT.states.blur=
			scale:1
			borderWidth:0
			shadowBlur:0
			shadowColor:"Black"
# 			visible:true					
# 		layerMask=new Layer
# 			width:	options.BASECOMPONENT.width+4
# 			height:options.BASECOMPONENT.height+4
# 			parent:@
# 			borderRadius:20
# 			backgroundColor:options.BGMaskColor
# 			name:"layerMask"
# 		layerMask.center()
# 		layerMask.states.focus=
# 			visible:false
# 		layerMask.states.blur=
# 			visible:true
# 		layerMask.bringToFront()	
		options.BASECOMPONENT.stateSwitch("blur")

		@.on "focus",->
			
			@.stateSwitch("focus")
			options.BASECOMPONENT.scale=1.5
			@.bringToFront()
			
			for sub in @.children
				sub.stateSwitch("focus")
		@.on "blur",->

			@.stateSwitch("blur")
			
			
			for sub in @.children
				sub.stateSwitch("blur")
# 				if sub.name=="layerMask"
# 					if @.name.indexOf("First")>=0
# 						sub.stateSwitch("focus")
# 				else
# 					sub.stateSwitch("blur")
			
		@.on "a",->
			@.stateSwitch("focus")
			for sub in @.children
				sub.stateSwitch("focus")
								


# Import file "MODHome_201805v2_Framer"
# sketch = Framer.Importer.load("imported/MODHome_201805v2_Framer@4x", scale: 1)
sketch = Framer.Importer.load("imported/MODHome_201805v2_Framer_09update@4x", scale: 1)
Framer.Extras.Preloader.enable()
{focusManager} = require 'focusManager'
enterTV=""

focusManager = new focusManager
	leftStickDpad: true
	controller: "XB1"
	defaultSelectionBorder: true
	defaultSelectionBorderWidth: 4
	defaultSelectionBorderColor: "#FF9900"	
theBackColor="#222222"
Utils.globalLayers sketch
TheHeader=Header.copy()
SettingFloatingAD=()->
	startX=-FloatingAD.width
	FloatingAD.x=startX
	FloatingAD.y=BarkerContent.height-FloatingAD.height+5
	FloatingAD.visible=true
	originalPO=FloatingAD.x
	
	startX=FloatingAD.x-2*FloatingAD.width
	animationA = new Animation FloatingAD,
		x: 0
		
		options:
			curve: Bezier(0.25, 0.1, 0.25, 1)	

	animationC = new Animation FloatingAD,
		x: startX
		
		options:
			curve: Bezier(0.25, 0.1, 0.25, 1)
			time:4.6
	animationA.start()
	animationB=animationA.reverse()
	Utils.delay 5,->
		animationC.start()

videoLay=new VideoLayer
		video: "images/Genius.mp4"
		#video: "images/Adidas_FIFA.mp4"
		width:BarkerContent.width*1
		height: BarkerContent.height*1
		x:0
		y:0
		parent:BarkerContent
		scale: 1			
videoLayAD=new VideoLayer
		video: "images/Adidas_FIFA.mp4"
		#video: "images/Adidas_FIFA.mp4"
		width:BarkerContent.width*1
		height: BarkerContent.height*1
		x:0
		y:0
		parent:BarkerContent
		scale: 1
Events.wrap(videoLayAD.player).on "ended",->
	videoLayAD.visible=false
SettingVideoAD=()->
	videoLayAD.visible=true
	videoLayAD.player.play()	
InitialUI=()->	
	
	TheHeader.name="TheHeader"
	Header.destroy()
	TheHeader.bringToFront()
	FloatingAD.parent=Barker
	Barker.clip=true
	
	

	BarkerContent.clip=true	
	videoLay.player.loop=true
	videoLay.player.muted=true
	videoLay.player.play()
	videoLayAD.player.loop=false
	videoLayAD.player.muted=true
	videoLayAD.player.play()
		
	Barker.isSelectable=true
	FloatingAD.bringToFront()
	SettingPopupAD()
	for sub in BigBanner.children
		sub.isSelectable=true
	
	
scrollMainPage=new ScrollComponent
	width: Screen.width
	height: Screen.height
	scrollHorizontal: false
PageBG.parent=scrollMainPage.content
posterMapping = [
]
MainBtnsPageMappingArray=[{
	name:"FirstBtnCom01" 
	value:"Page1Content"},{
	name:"FirstBtnCom02" 
	value:"Page2Content"},{
	name:"FirstBtnCom03"
	value:"Page3Content"},{
	name:"FirstBtnCom04"
	value:"Page4Content"},{
	name:"FirstBtnCom05"
	value:"Page5Content"},{
	name:"FirstBtnCom06"
	value:"Page6Content"},{
	name:"FirstBtnCom07"
	value:"Page7Content"},{
	name:"FirstBtnCom08"
	value:"Page7Content"},{
	name:"FirstBtnCom09"
	value:"Page7Content"}]
	

Array::toDict = (key) ->
  @reduce ((dict, obj) -> dict[ obj[key] ] = obj if obj[key]?; return dict), {}

MainBtnsPageMappingDict=MainBtnsPageMappingArray.toDict('name')

dramapreview = new VideoLayer
	width: 520*16/9
	height: 520
	video: "images/dramapreview.mp4"
	parent:BarkerDrama
	opacity: 0
	y:0
	scale:1.4
	
BarkerDrama.clip=true
netflixdramapreview = new VideoLayer
	width: 520*16/9
	height: 520
	video: "images/netflix.mp4"
	parent:NetflixBarkerDrama
	opacity: 0
	y:0
	scale:1
	
NetflixBarkerDrama.clip=true
#ADImage.parent=null
SettingPopupAD=()->
	scrollMainPage.scrollToPoint(x: 0,y: 0)
# 	ADImage.x=0
# 	ADImage.y=0
# 	ADImage.bringToFront()
# 	Utils.delay 3,->
# 		ADImage.sendToBack()
	SettingFloatingAD()
IsShowBigBannerAd=false
SettingBigBanner=()->
	BigBannerAD.visible=!BigBannerAD.visible
	IsShowBigBannerAd=!IsShowBigBannerAd
	BannerUp.visible=!BannerUp.visible
	BannerDown.visible=!BannerDown.visible
		
dramapreview.player.pause()
netflixdramapreview.player.pause()
pageComponent=new PageComponent
	width: Screen.width
	height: 520
	scrollVertical: false
	parent:scrollMainPage.content
for page in TopContent.children
	page.x=0
	page.y=0
	page.height=520
	pageComponent.addPage(page)
	posterMapping.push({
		name:   page.name,
		poster: page
	});
nappingDict = posterMapping.toDict('name')	

showBarkerImage=(day)->
	
	pageToSnap=nappingDict[day]["poster"]
	
	pageComponent.snapToPage(pageToSnap)
	
scrollBtm=new Layer #ScrollComponent
	width: Screen.width
	height: 520
	x:0
	y:500
	backgroundColor: "Transparent"
	parent:scrollMainPage.content
SettingBtns=()->

	gg=0
	for btn in MainBTMUIBtns.children


		item=new ScaleCommandFirstRowVisibleBTN
				BASECOMPONENT:btn.copy()
				TAGLABEL:""
				x:btn.x+208
				y:btn.y+35
				parent:scrollBtm
				name:btn.name
				BGMaskColor:"#222222"

		item.on "focus",->
			#SettingArrowBarZ()
			this.visible=true
			#print this.name
			if this.name.indexOf("First")>=0
				ArrowBarBG.visible=true
				pageComponent.opacity=1
				ArrowComponent.animate
					rotation:0
				scrollMainPage.scrollToPoint(x:0,y:0)
			else

				ArrowBarBG.visible=true
				pageComponent.opacity=0
				ArrowComponent.animate
					rotation:180
				scrollMainPage.scrollToPoint(x:0,y:600)
		item.on "focus",->
			if this.name.indexOf("First")>=0
				showBarkerImage(MainBtnsPageMappingDict[this.name]['value'])
	MainBTMUIBtns.destroy()
	Message_Focus.x=-0
	Message_Focus.y=-0
	BTN_SmallMessageX=147
	BTN_SmallMessageY=148-(BTN_SmallMessage.height-BTN_SmallSetting.height)	
	MainBTMUISysToolGroup.parent=scrollMainPage.content
	MainBTMUISysToolGroup.x=90
	MainBTMUISysToolGroup.y=555
	twoCom=new TwoScenarioComponent
		DefaultComponent:BTN_SmallMessage.copy()
		FocusComponent:Message_Focus.copy()
		x:BTN_SmallMessage.x
		y:BTN_SmallMessage.y
		parent:MainBTMUISysToolGroup
	BTN_SmallMessage.destroy()
	twoCom.isSelectable=true
	twoCom.selectionBorder=false	
	ArrowBar.parent=null
	ArrowBar.bringToFront()
	ArrowBar.x=0
	ArrowBar.y=660

	x=0
	#BTN_SmallMessage.destroy()
		#print btn.name
SettingBtns()
# Screen2BG.parent=scrollMainPage.content
# Screen2BG.x=0
# Screen2BG.y=520
# Screen2BG.sendToBack()
pageComponent.on "change:currentPage", ->
	if this.currentPage.name=="Page3Content"
		Utils.delay 3,->
			StaticImage.animate
				opacity: 0
				options: 
					curve: Spring(damping: 0.5)
					time: 1
			Utils.delay 0.4,->	
				dramapreview.animate
					opacity: 1
					options: 
						curve: Spring(damping: 0.5)
						time: 1.3			
				dramapreview.player.loop=true
				dramapreview.player.play()
				dramapreview.player.muted = true
	else if this.currentPage.name=="Page6Content"
		Utils.delay 3,->
			StaticImageNetflix.animate
				opacity: 0
				options: 
					curve: Spring(damping: 0.5)
					time: 1
			Utils.delay 0.4,->	
				netflixdramapreview.animate
					opacity: 1
					options: 
						curve: Spring(damping: 0.5)
						time: 1.3			
				netflixdramapreview.player.loop=true
				netflixdramapreview.player.play()
				netflixdramapreview.player.muted = true	
	else
		StaticImage.opacity=1
		dramapreview.opacity=0
		dramapreview.player.pause()
		StaticImageNetflix.opacity=1
		netflixdramapreview.opacity=0
		netflixdramapreview.player.pause()		
SettingFocusUI=()->
	
	focusManager.selectedItem=scrollBtm.childrenWithName("FirstBtnCom01")[0]
	scrollBtm.childrenWithName("FirstBtnCom09")[0].right=scrollBtm.childrenWithName("BtnCom11")[0]
	scrollBtm.childrenWithName("BtnCom11")[0].left=scrollBtm.childrenWithName("FirstBtnCom09")[0]
	#SettingArrowBarZ()


	CartonPoster1.isSelectable=true
	CartonPoster2.isSelectable=true
	CartonPoster3.isSelectable=true
	CartonPoster4.isSelectable=true
	Barker.down=scrollBtm.childrenWithName("FirstBtnCom01")[0]
	Barker.on "focus",->
		if IsShowBigBannerAd
			Barker.right=BigBannerAD
		else
			Barker.right=BannerUp
	#page2
	MoviePoster1.isSelectable=true
	MoviePoster2.isSelectable=true
	MoviePoster3.isSelectable=true
	MoviePoster4.isSelectable=true	
	scrollBtm.childrenWithName("FirstBtnCom02")[0].up=MoviePoster1
	MoviePoster1.down=scrollBtm.childrenWithName("FirstBtnCom02")[0]
	MoviePoster2.down=scrollBtm.childrenWithName("FirstBtnCom02")[0]
	MoviePoster3.down=scrollBtm.childrenWithName("FirstBtnCom02")[0]
	MoviePoster4.down=scrollBtm.childrenWithName("FirstBtnCom02")[0]
	#page3
	Page3ContentCTA.isSelectable=true	
	Page3ContentCTA.down=scrollBtm.childrenWithName("FirstBtnCom03")[0]
	scrollBtm.childrenWithName("FirstBtnCom03")[0].up=Page3ContentCTA
	#page4
	Page4ContentCTA.isSelectable=true
	Page4ContentCTA.down=scrollBtm.childrenWithName("FirstBtnCom04")[0]
	scrollBtm.childrenWithName("FirstBtnCom04")[0].up=Page4ContentCTA		
	#Page6
	Page6ContentCTA.isSelectable=true	
	Page6ContentCTA.down=scrollBtm.childrenWithName("FirstBtnCom06")[0]
	scrollBtm.childrenWithName("FirstBtnCom06")[0].up=Page6ContentCTA
SettingFocusUI()
InitialUI()
###### 補上鍵盤操控
Events.wrap(window).addEventListener "keydown", (event) ->
# 	if event.keyCode is 80  #p ppopup全版
# 		
# 		SettingPopupAD()
	if event.keyCode is 70  #f floating
		SettingFloatingAD()
	if event.keyCode is 86  #f videoad
		SettingVideoAD()
	if event.keyCode is 66  #f big banner
		SettingBigBanner()
	#if event.keyCode is 73 # i
	#if event.keyCode is 66 # b
	#if event.keyCode is 72 # h
	#if event.keyCode is 32 # space
	#if event.keyCode is 13 # enter
# 	if event.keyCode is 66
	

# 
# Genius = new VideoLayer
# 	width: 1280
# 	height: 720
# 	video: "images/Genius.mp4"
# 
# Genius.player.play()
