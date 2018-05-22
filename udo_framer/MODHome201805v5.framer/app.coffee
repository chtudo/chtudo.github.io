Framer.Extras.Preloader.enable()
# Import file "MODHOME_201805v5_Framer"
sketch = Framer.Importer.load("imported/MODHOME_201805v5_Framer@4x", scale: 1)

class TwoScenarioComponent extends Layer
	constructor: (options={}) ->

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
		options.FocusComponent.x=0
		options.FocusComponent.y=-20
		options.FocusComponent.visible=false
	
		
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
			this.bringToFront()
			@.stateSwitch("focus")
			options.BASECOMPONENT.scale=1.5
			@.bringToFront()
			
			for sub in @.children
				sub.stateSwitch("focus")
				sub.bringToFront()
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
InitialUI=()->	
	
	TheHeader.name="TheHeader"
	Header.destroy()
	TheHeader.bringToFront()
	videoLay=new VideoLayer
		video: "images/fifaad.mp4"
		width:BarkerContent.width*1
		height: BarkerContent.height*1
		x:0
		y:0
		parent:BarkerContent
		scale: 1.55
	BarkerContent.clip=true	
	videoLay.player.loop=true
	videoLay.player.play()
	Barker.isSelectable=true
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
	name:"FirstBtnCom00" 
	value:"PageMsgContent"},{
	name:"FirstBtnCom07" 
	value:"PageMusicContent"},{
	name:"FirstBtnCom09" 
	value:"PageFreeContent"},{
	name:"FirstBtnCom06"
	value:"PageSportContent"},{
	name:"FirstBtnCom01"
	value:"PageTVContent"},{
	name:"FirstBtnCom02"
	value:"PageMovieContent"},{
	name:"FirstBtnCom03"
	value:"PageDramaContent"},{
	name:"FirstBtnCom04"
	value:"PageChildContent"},{
	name:"FirstBtnCom05"
	value:"PageCartonContent"},{
	name:"FirstBtnCom08"
	value:"PageLifeContent"}]
	

Array::toDict = (key) ->
  @reduce ((dict, obj) -> dict[ obj[key] ] = obj if obj[key]?; return dict), {}

MainBtnsPageMappingDict=MainBtnsPageMappingArray.toDict('name')
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
InitialUI()
showBarkerImage=(day)->
	pageToSnap=nappingDict[day]["poster"]
	pageComponent.snapToPage(pageToSnap)
	
scrollBtm=new ScrollComponent
	width: Screen.width
	height: 520
	x:0
	y:510
	backgroundColor: "Transparent"
	parent:scrollMainPage.content
SettingBtns=()->

	
	for btn in MainBTMUIBtns.children
		if btn.name=="FirstBtnCom00"
			item=new TwoScenarioComponent
					DefaultComponent:btn.copy()
					FocusComponent:FirstBtnCom00_Scale.copy()
					x:btn.x+50
					y:btn.y+20
					parent:scrollBtm.content
					name:btn.name
		else		
			item=new ScaleCommandFirstRowVisibleBTN
					BASECOMPONENT:btn.copy()
					TAGLABEL:""
					x:btn.x+50
					y:btn.y+20
					parent:scrollBtm.content
					name:btn.name
					BGMaskColor:"#222222"

		item.on "focus",->
			this.visible=true
			#print this.name
			if this.name.indexOf("First")>=0
				ArrowBarBG.visible=true
				TheHeader.visible=true
				ArrowComponent.animate
					rotation:0
				scrollMainPage.scrollToPoint(x:0,y:0)
				showBarkerImage(MainBtnsPageMappingDict[this.name]['value'])
		
			else
				TheHeader.visible=false
				ArrowBarBG.visible=false
				ArrowComponent.animate
					rotation:180
				scrollMainPage.scrollToPoint(x:0,y:500)

				

		item.on "a",->
			@.stateSwitch("focus")
			for sub in @.children
				sub.stateSwitch("focus")
			if this.name=="FirstBtnCom01"
				min = new VideoLayer
					width: 1280
					height: 720
					video: "images/min.mp4"
				min.player.loop=true
				min.player.play()
				min.isSelectable=true
				min.selectionBorder=false
				focusManager.selectedItem=min
				min.on "b",->
					this.destroy()
					focusManager.selectedItem=scrollBtm.content.subLayersByName("FirstBtnCom01")[0]
			else
				ShowInnerContentFocus(BtnContentMappingDict[this.name]["value"],this)
			#print this.name
# 			if this.name.indexOf("First")>=0
# 				this.visible=true
# 			else
# 				this.visible=false	
	MainBTMUIBtns.destroy()
		
# 	twoCom=new TwoScenarioComponent
# 		DefaultComponent:BTN_SmallMessage.copy()
# 		FocusComponent:Message_Focus.copy()
# 		x:BTN_SmallMessageX
# 		y:BTN_SmallMessageY
# 		parent:MainBTMUISysToolGroup
# 	twoCom.isSelectable=true
# 	twoCom.selectionBorder=false
	#BTN_SmallMessage.destroy()
	ArrowBar.parent=null
	ArrowBar.bringToFront()
	ArrowBar.x=202
	ArrowBar.y=690

	x=0
	#BTN_SmallMessage.destroy()
		#print btn.name
SettingBtns()
# MainBtnsPageMappingArray=[{
# 	name:"FirstBtnCom00" 
# 	value:"PageMsgContent"},{
# 	name:"FirstBtnCom07" 
# 	value:"PageMusicContent"},{
# 	name:"FirstBtnCom09" 
# 	value:"PageFreeContent"},{
# 	name:"FirstBtnCom06"
# 	value:"PageSportContent"},{
# 	name:"FirstBtnCom01"
# 	value:"PageTVContent"},{
# 	name:"FirstBtnCom02"
# 	value:"PageMovieContent"},{
# 	name:"FirstBtnCom03"
# 	value:"PageDramaContent"},{
# 	name:"FirstBtnCom04"
# 	value:"PageChildContent"},{
# 	name:"FirstBtnCom05"
# 	value:"PageCartonContent"},{
# 	name:"FirstBtnCom08"
# 	value:"PageLifeContent"}]
BtnContentMappingArray=[{
	name:"FirstBtnCom04" 
	value:"ChildContent"},{
	name:"FirstBtnCom07" 
	value:"MusicContent"},{
	name:"FirstBtnCom08"
	value:"LifeContent"},{
	name:"FirstBtnCom06"
	value:"SportContent"},{
	name:"FirstBtnCom09"
	value:"FreeContent"},{
	name:"FirstBtnCom05"
	value:"CartonContent"},{
	name:"FirstBtnCom03"
	value:"DramaContent"},{
	name:"FirstBtnCom02"
	value:"MovieContent"},{
	name:"FirstBtnCom00"
	value:"MessageContent"}]


Array::toDict = (key) ->
  @reduce ((dict, obj) -> dict[ obj[key] ] = obj if obj[key]?; return dict), {}

BtnContentMappingDict=BtnContentMappingArray.toDict('name')


InnerContentMappingArray=[{
	name:"ChildContent" 
	value:"images/child.mp4"},{
	name:"MusicContent" 
	value:"images/music.mp4"},{
	name:"LifeContent"
	value:"images/life.mp4"},{
	name:"SportContent"
	value:"images/fifaad.mp4"},{
	name:"FreeContent"
	value:"images/free.mp4"},{
	name:"CartonContent"
	value:"images/carton.mp4"},{
	name:"DramaContent"
	value:"images/drama.mp4"},{
	name:"MovieContent"
	value:"images/movie.mp4"}]


Array::toDict = (key) ->
  @reduce ((dict, obj) -> dict[ obj[key] ] = obj if obj[key]?; return dict), {}

InnerContentMappingDict=InnerContentMappingArray.toDict('name')
ShowInnerContentFocus=(layer,parent)->
	InnerContent.visible=true
	contentlayer=InnerContent.subLayersByName(layer)[0]
	contentlayer.bringToFront()
	
	
	if layer=="MessageContent"
		a=1
	else
		barker=contentlayer.subLayersByName(layer+"Barker")[0].children[0]
		barker.player.play()	
	focusManager.selectedItem=contentlayer
	contentlayer.on "b",->
		if this.name=="MessageContent"
			s=1
		else
			barker=this.subLayersByName(layer+"Barker")[0].children[0]
			barker.player.pause()
		InnerContent.visible=false
		focusManager.selectedItem=parent
	
BuildInnterContent=()->
	for sub in InnerContent.children
		sub.selectionBorder=false
		sub.isSelectable=true
		
		if sub.name=="MessageContent"
			s=1
		else
			videoContent=InnerContentMappingDict[sub.name]["value"]
			barker=sub.subLayersByName(sub.name+"Barker")[0]
			barker.clip=true
			videolayer=new VideoLayer
				parent:barker
				size:barker.size
				scale:1.3
				video:videoContent
			videolayer.player.loop=true	
		#videolayer.player.play()	

	InnerContent.bringToFront()		
	InnerContent.x=0
	InnerContent.y=0
	InnerContent.visible=false	
BuildInnterContent()

# Screen2BG.parent=scrollMainPage.content
# Screen2BG.x=0
# Screen2BG.y=520
# Screen2BG.sendToBack()
SettingFocusUI=()->
	
	focusManager.selectedItem=scrollBtm.content.childrenWithName("FirstBtnCom01")[0]
	scrollBtm.content.subLayersByName("FirstBtnCom08")[0].right=scrollBtm.content.subLayersByName("BtnCom10")[0]
	scrollBtm.content.subLayersByName("BtnCom10")[0].left=scrollBtm.content.subLayersByName("FirstBtnCom08")[0]
	scrollBtm.content.subLayersByName("FirstBtnCom07")[0].left=scrollBtm.content.subLayersByName("FirstBtnCom00")[0]
	scrollBtm.content.subLayersByName("FirstBtnCom00")[0].right=scrollBtm.content.subLayersByName("FirstBtnCom07")[0]
	CartonPoster1.isSelectable=true
	CartonPoster2.isSelectable=true
	CartonPoster3.isSelectable=true
	CartonPoster4.isSelectable=true
	Barker.down=scrollBtm.content.childrenWithName("FirstBtnCom01")[0]
	Barker.right=BannerUp
	#page2
	MoviePoster1.isSelectable=true
	MoviePoster2.isSelectable=true
	MoviePoster3.isSelectable=true
	MoviePoster4.isSelectable=true	
	scrollBtm.content.childrenWithName("FirstBtnCom02")[0].up=MoviePoster1
	MoviePoster1.down=scrollBtm.content.childrenWithName("FirstBtnCom02")[0]
	MoviePoster2.down=scrollBtm.content.childrenWithName("FirstBtnCom02")[0]
	MoviePoster3.down=scrollBtm.content.childrenWithName("FirstBtnCom02")[0]
	MoviePoster4.down=scrollBtm.content.childrenWithName("FirstBtnCom02")[0]
	#page3
	PageLifeContentCTA.isSelectable=true
	PageChildContentCTA.isSelectable=true
	PageDramaContentCTA.isSelectable=true
	PageFreeContentCTA.isSelectable=true
	
	sportVideo=new VideoLayer
		size: PageSportContentBarker.size
		scale:1.3
		video:InnerContentMappingDict["SportContent"]["value"]
		parent:PageSportContentBarker
	sportVideo.player.play()
	sportVideo.player.muted=true
	sportVideo.player.loop=true
	PageSportContentBarker.clip=true
	musicVideo=new VideoLayer
		size: PageMusicContentBarker.size
		scale: 1.3
		video:InnerContentMappingDict["MusicContent"]["value"]
		parent:PageMusicContentBarker
	PageMusicContentBarker.clip=true
	musicVideo.player.play()
	musicVideo.player.muted=true
	musicVideo.player.loop=true
	PopHint.x=0
	PopHint.y=0
	PopHint.bringToFront()
# 	PopHintPage1.isSelectable=true
# 	PopHintPage2.isSelectable=true
# 	PopHintPage3.isSelectable=true
# 	
# 	focusManager.selectedItem=PopHintPage1
# 	PopHintPage1.on "a",->
# 		print "ddd"

	for sub in PopHint.children
		sub.isSelectable=true
		sub.selectionBorder=false
		sub.visible=false
		sub.on "blur",->
			this.visible=false
		sub.on "focus",->
			this.visible=true
		sub.on "a",->
			this.visible=false
			if this.name=="PopHintPage1"
				
				focusManager.selectedItem=PopHintPage2
			if this.name=="PopHintPage2"
				
				focusManager.selectedItem=PopHintPage3
			if this.name=="PopHintPage3"
				PopHint.sendToBack()
				focusManager.selectedItem=scrollBtm.content.childrenWithName("FirstBtnCom01")[0]						
	focusManager.selectedItem=PopHintPage1
	
# 	Page3ContentCTA.isSelectable=true	
# 	Page3ContentCTA.down=scrollBtm.content.childrenWithName("FirstBtnCom03")[0]
# 	scrollBtm.content.childrenWithName("FirstBtnCom03")[0].up=Page3ContentCTA
	#page4
# 	Page4ContentCTA.isSelectable=true
# 	Page4ContentCTA.down=scrollBtm.content.childrenWithName("FirstBtnCom04")[0]
# 	scrollBtm.content.childrenWithName("FirstBtnCom04")[0].up=Page4ContentCTA		
SettingFocusUI()