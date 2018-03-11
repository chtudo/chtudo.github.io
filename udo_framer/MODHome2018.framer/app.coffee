# Import file "MODHome2018"
sketch = Framer.Importer.load("imported/MODHome2018@4x", scale: 1)
# Import file "Untitled"
class ScaleCommandBTN extends Layer
	constructor: (options={}) ->

		options.width=options.BASECOMPONENT.width
		options.height=options.BASECOMPONENT.height		
		
		options.backgroundColor="Transparent"
		options.name=options.BASECOMPONENT.name#"commandBTN_"+options.TAGLABEL
		options.isSelectable=true
		super options
		txt=new TextLayer
			text:options.TAGLABEL
			parent:@
			width: 206
			height:30
			color: "white"
			fontSize: 20
			textAlign:Align.center
			y:105
			name:options.TAGLABEL
		
		@.states.focus=
			visible: true

		@.states.blur=
			visible: true
			
		options.BASECOMPONENT.parent=@
		options.BASECOMPONENT.x=0
		options.BASECOMPONENT.y=0
		options.BASECOMPONENT.scale=1.2875
		options.BASECOMPONENT.states.focus=
			scale:1.2875
			borderColor:"Black"
			borderWidth:2
			shadowBlur:40
			shadowColor:"Black"
		options.BASECOMPONENT.states.blur=
			scale:1
			borderWidth:0
			shadowBlur:0
			shadowColor:"Black"					
		txt.centerX()
		options.BASECOMPONENT.stateSwitch("blur")
		txt.states.focus=
			visible:true

		txt.states.blur=
			visible:false
		txt.stateSwitch("blur")
		@.on "focus",->
			@.stateSwitch("focus")
			options.BASECOMPONENT.scale=1.2875
			@.bringToFront()
			for sub in @.children
				sub.stateSwitch("focus")
		
		@.on "blur",->
			@.stateSwitch("blur")
			for sub in @.children
				sub.stateSwitch("blur")
			
		@.on "a",->
			@.stateSwitch("focus")
			for sub in @.children
				sub.stateSwitch("focus")
				

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
		options.FocusComponent.parent=@
		
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
class ZoomBtn extends Layer
	constructor: (options={}) ->
		options.width=160
		options.height=90
		options.backgroundColor="#323232"
		options.isSelectable=true
		super options
		bgComponent=new Layer
			backgroundColor:"#323232"
			width:160
			height:90
			parent:@
			borderRadius:2
			
		
		
		txt=new TextLayer
			text:options.TAGLABEL
			parent:@
			width: 100
			height:30
			color: "white"
			fontSize: 20
			textAlign:Align.center
			name:options.TAGLABEL
		
		txt.center()
		@.states.focus=
			visible: true

		@.states.blur=
			visible: true
			
		
		bgComponent.states.focus=
			scale:116/90
			shadowBlur:40
			shadowColor:"Black"

		bgComponent.states.blur=
			scale:1
			shadowBlur:0
			shadowColor:"Black"
		bgComponent.stateSwitch("blur")
		txt.states.focus=
			fontSize:22

		txt.states.blur=
			fontSize:20
		txt.stateSwitch("blur")
		@.on "focus",->
			@.stateSwitch("focus")
			bgComponent.scale=116/90
			@.bringToFront()
			for sub in @.children
				sub.stateSwitch("focus")
		
		@.on "blur",->
			@.stateSwitch("blur")
			for sub in @.children
				sub.stateSwitch("blur")
			
		@.on "a",->
			@.stateSwitch("focus")
			for sub in @.children
				sub.stateSwitch("focus")
{focusManager} = require 'focusManager'
focusManager = new focusManager
	leftStickDpad: true
	controller: "XB1"
theBackColor="Black"
sketch = Framer.Importer.load("imported/MODHome2018@4x", scale: 1)
Utils.globalLayers sketch
flowMODHome=new FlowComponent
	scrollHorizontal: false
	scrollVertical: true
	width: Screen.width
	height: Screen.height
	backgroundColor: theBackColor
play_tv = new VideoLayer
	video: "images/play_tv.mp4"
food_tv = new VideoLayer
	video: "images/food_tv.mp4"	
cut_boss2 = new VideoLayer
	video: "images/cut_boss3.mp4"
	scale:1.2
fifa_tv = new VideoLayer
	video: "images/messi.mp4"
	scale:1.27
layerHead=new Layer
	width:Screen.width
	name:"Header_Layer"
	height: MODHeader.height
	backgroundColor: "Transparent"
	
MODHeader.parent=layerHead
MODHeader.x=0
MODHeader.y=0
MainBtnsPositionArray=[{
	name:"BTN_EnterChannel" 
	value:0},{
	name:"BTN_FIFAEvent" 
	value:0},{
	name:"BTN_KKTV"
	value:0},{
	name:"BTN_Movie199"
	value:0},{
	name:"BTN_TVOD"
	value:0},{
	name:"BTN_Drama"
	value:0},{
	name:"BTN_Child"
	value:200},{
	name:"BTN_Sporteee"
	value:600},{
	name:"BTN_Comicss"
	value:400},]
MainBtnsLabelArray=[{
	name:"BTN_EnterChannel" 
	value:"已訂閱家庭豪華餐.."},{
	name:"BTN_FIFAEvent" 
	value:"2018 世足專區"},{
	name:"BTN_KKTV"
	value:"KKTV"},{
	name:"BTN_Movie199"
	value:"本週新上架四片"},{
	name:"BTN_TVOD"
	value:"本週新上架四片"},{
	name:"BTN_Drama"
	value:"去追劇吧！"},{
	name:"BTN_Child"
	value:"2+好片上架！"},{
	name:"BTN_Sporteee"
	value:"春番新上架！"},{
	name:"BTN_Comicss"
	value:"FIFA運動影音"}]
	

MainBtnsPageMappingArray=[{
	name:"BTN_EnterChannel" 
	value:"ChannelContent"},{
	name:"BTN_FIFAEvent" 
	value:"FIFA_Content"},{
	name:"BTN_KKTV"
	value:"DramaContent"},{
	name:"BTN_Movie199"
	value:"MovieContent"},{
	name:"BTN_TVOD"
	value:"MovieContent"},{
	name:"BTN_Drama"
	value:"MovieContent"},{
	name:"BTN_Child"
	value:"MovieContent"},{
	name:"BTN_Sporteee"
	value:"MovieContent"},{
	name:"BTN_Comicss"
	value:"MovieContent"}]
	
SubBtnsLabelMappingArray=[{
	name:"Music" 
	value:"音樂"},{
	name:"Game" 
	value:"遊戲"},{
	name:"Life"
	value:"生活"},{
	name:"Learn"
	value:"學習"},{
	name:"Package"
	value:"套餐"},{
	name:"Free"
	value:"免費"},{
	name:"TaiwanDrama"
	value:"霹靂"},{
	name:"ChannelSubscribe"
	value:"訂閱"},{
	name:"Personal"
	value:"個人"},{
	name:"Setting"
	value:"設定"}]	



#MainHome.parent=MainContentScroll.content
MODHomePage=new Layer
	width: Screen.width
	height: MainHome.height
	x:0
	y:-MODHeader.height
	backgroundColor: theBackColor
	
flowMODHome.showNext(MODHomePage)
#MODHomePage.y=-MODHeader.height


PageContent=new PageComponent
	width: Screen.width
	height: 520
	parent: MODHomePage
	x:0
	y:0
	backgroundColor: "Black"
	#Purple
	#拉到沒有頁面會是紫色
	

posterMapping = [
]
Array::toDict = (key) ->
  @reduce ((dict, obj) -> dict[ obj[key] ] = obj if obj[key]?; return dict), {}
MainBtnsLabelDict = MainBtnsLabelArray.toDict('name')
MainBtnsPositionDict= MainBtnsPositionArray.toDict('name')
MainBtnsPageMappingDict=MainBtnsPageMappingArray.toDict('name')
SubBtnsLabelMappingDict=SubBtnsLabelMappingArray.toDict('name')


for sub in RichContents.children	
	pageview=new Layer
		width: Screen.width
		height: 520
		x:0
		y:0
		backgroundColor: "Black"
		name:sub.name
		#預設頁面背景會是紅色
	
		
	sub.parent=pageview
	sub.x=0
	sub.y=0
	PageContent.addPage(pageview)	
	posterMapping.push({
			name:   sub.name,
			poster: pageview
		});
nappingDict = posterMapping.toDict('name')
showBarkerImage=(day)->
	
	pageToSnap=nappingDict[day]["poster"]
	#print pageToSnap,"---->"
	
	PageContent.snapToPage(pageToSnap)

SettingVideoAction=(isPlay)->
	if isPlay
		play_tv.player.play()
		food_tv.player.play()
		cut_boss2.player.play()
	else
		play_tv.player.pause()
		food_tv.player.pause()
		cut_boss2.player.pause()
SettingFIFATV=(isPlay)->
	if isPlay
		fifa_tv.player.play()
	else
		fifa_tv.player.pause()
				
BindVideo=(video,banner,sounded)->
	video.props=
		width:banner.width
		height: banner.height
		x:banner.x
		y:banner.y
		parent: banner.parent
	banner.parent.clip=true
	video.player.loop=true
	banner.visible=false
	if sounded
		video.player.muted=false
	else
		video.player.muted=true
BindVideo(play_tv,TVContent1,false)		
BindVideo(food_tv,TVContent2,false)		
BindVideo(cut_boss2,ChannelMainTVInter,true)
BindVideo(fifa_tv,EventBarkerInter,true)

BuildMenuBtnBars=()->
	
	HomeBtnMenuBar=new ScrollComponent
		width: Screen.width
		parent:MODHomePage
		scrollVertical: false
		scrollHorizontal: true
		y:410
		backgroundColor: "Transparent"
		height: 272
		name:"HomeBtnMenuBar"
	HomeBtnMenuBar.contentInset=
		right: 50
	HomeBtnMenuBar.placeBefore PageContent
			
	BTN_SmallSetting.parent=HomeBtnMenuBar.content
#	BTN_SmallMessage.parent=HomeBtnMenuBar.content
	BTN_SmallSetting.x=90
	BTN_SmallSetting.y=148
	BTN_SmallMessageX=147
	BTN_SmallMessageY=148-(BTN_SmallMessage.height-BTN_SmallSetting.height)
	x=0
# 	BTN_SmallMessage.isSelectable=true
# 	BTN_SmallMessage.selectionBorder=false
	BTN_SmallSetting.isSelectable=true
	BTN_SmallSetting.selectionBorder=false
	BTN_SmallMessage.visible=false	
	
	Message_Focus.x=-140
	Message_Focus.y=-180
	BTN_SmallMessage.x=0
	BTN_SmallMessage.y=0
	twoCom=new TwoScenarioComponent
		DefaultComponent:BTN_SmallMessage.copy()
		FocusComponent:Message_Focus.copy()
		x:BTN_SmallMessageX
		y:BTN_SmallMessageY
		parent:HomeBtnMenuBar.content
	twoCom.isSelectable=true
	twoCom.selectionBorder=false
	for sub in MainBTNs.children
		
		bb=new ScaleCommandBTN
			BASECOMPONENT:sub.copy()
			TAGLABEL:MainBtnsLabelDict[sub.name]['value']
			x:220+x*(sub.width+10)
			y:545-HomeBtnMenuBar.y
		bb.stateSwitch("blur")
		bb.parent=HomeBtnMenuBar.content
		bb.selectionBorder=false

		x=x+1

		bb.on "focus",->
			#print this.name,"focus",MainBtnsPageMappingDict[this.name]['value']
			
			if this.name=="BTN_EnterChannel"
				SettingVideoAction(true)
			else
				SettingVideoAction(false)
				
			if this.name=="BTN_FIFAEvent"
				SettingFIFATV(true)
			else
				SettingFIFATV(false)	
			#print MainBtnsPositionDict[this.name]['value']
			HomeBtnMenuBar.scrollToPoint(x:MainBtnsPositionDict[this.name]['value'])
			flowMODHome.scroll.scrollToPoint(y:0)
			layerHead.visible=true
			showBarkerImage(MainBtnsPageMappingDict[this.name]['value'])
			#print PageContent.currentPage,"CurrentPage"
			#showBarkerImage("MovieContent")
			#print "ddd"
			
			
	Page2Menus.parent=MODHomePage
	for sub in Page2Menus.children
		sub.visible=false		
		ZoomBtn_sub=new ZoomBtn
			TAGLABEL:SubBtnsLabelMappingDict[sub.name]['value']
			parent:sub.parent
			x:sub.x
			y:sub.y
			name:"NewXX"
			
		ZoomBtn_sub.isSelectable=false
		ZoomBtn_sub.selectionBorder=false
		ZoomBtn_sub.on "focus",->
			flowMODHome.scroll.scrollToPoint(y:500)
			layerHead.visible=false

			
	MainHome.visible=false
BuildMenuBtnBars()
focusManager.selectedItem=MODHomePage.subLayersByName("HomeBtnMenuBar")[0].content.subLayersByName("BTN_EnterChannel")[0]
	#video.player.play()	




# 
# messi = new VideoLayer
# 	width: 1280
# 	height: 720
# 	video: "images/messi.mp4"
# 
# messi.player.play()
