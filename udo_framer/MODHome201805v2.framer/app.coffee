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
		options.FocusComponent.x=-140
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
			scale:1.18
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
sketch = Framer.Importer.load("imported/MODHome_201805v2_Framer@4x", scale: 1)
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
	videoLay.player.play()
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
	value:"Page6Content"},{
	name:"FirstBtnCom08"
	value:"Page6Content"},{
	name:"FirstBtnCom09"
	value:"Page6Content"}]
	

Array::toDict = (key) ->
  @reduce ((dict, obj) -> dict[ obj[key] ] = obj if obj[key]?; return dict), {}

MainBtnsPageMappingDict=MainBtnsPageMappingArray.toDict('name')
pageComponent=new PageComponent
	width: Screen.width
	height: 520
	scrollVertical: false
	parent:scrollMainPage.content
for page in TopContent.children
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
		item=new ScaleCommandFirstRowVisibleBTN
				BASECOMPONENT:btn.copy()
				TAGLABEL:""
				x:btn.x+208
				y:btn.y+36
				parent:scrollBtm.content
				name:btn.name
				BGMaskColor:"#222222"

		item.on "focus",->
			this.visible=true
			if this.name.indexOf("First")>=0
				ArrowBarBG.visible=true
				TheHeader.visible=true
				ArrowComponent.animate
					rotation:0
				scrollMainPage.scrollToPoint(x:0,y:0)
			else
				TheHeader.visible=false
				ArrowBarBG.visible=false
				ArrowComponent.animate
					rotation:180
				scrollMainPage.scrollToPoint(x:0,y:500)
		item.on "focus",->
			if this.name.indexOf("First")>=0
				showBarkerImage(MainBtnsPageMappingDict[this.name]['value'])
			#print this.name
# 			if this.name.indexOf("First")>=0
# 				this.visible=true
# 			else
# 				this.visible=false	
	MainBTMUIBtns.destroy()
	Message_Focus.x=-0
	Message_Focus.y=-0
	BTN_SmallMessageX=147
	BTN_SmallMessageY=148-(BTN_SmallMessage.height-BTN_SmallSetting.height)	
# 	twoCom=new TwoScenarioComponent
# 		DefaultComponent:BTN_SmallMessage.copy()
# 		FocusComponent:Message_Focus.copy()
# 		x:BTN_SmallMessageX
# 		y:BTN_SmallMessageY
# 		parent:MainBTMUISysToolGroup
# 	twoCom.isSelectable=true
# 	twoCom.selectionBorder=false
	#BTN_SmallMessage.destroy()
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
	ArrowBar.x=202
	ArrowBar.y=668

	x=0
	#BTN_SmallMessage.destroy()
		#print btn.name
SettingBtns()
focusManager.selectedItem=scrollBtm.content.childrenWithName("FirstBtnCom01")[0]