# Import file "MODHOME_201805v1_Framer"
class ScaleCommandBTN extends Layer
	constructor: (options={}) ->

		options.width=options.BASECOMPONENT.width
		options.height=options.BASECOMPONENT.height		
		
		options.backgroundColor="Transparent"
		options.name=options.BASECOMPONENT.name#"commandBTN_"+options.TAGLABEL
		options.isSelectable=true
		super options

		
		@.states.focus=
			visible: true

		@.states.blur=
			visible: true
			
		options.BASECOMPONENT.parent=@
		options.BASECOMPONENT.x=0
		options.BASECOMPONENT.y=0
		options.BASECOMPONENT.scale=1
		options.BASECOMPONENT.states.focus=
			scale:1.1
			borderColor:"Black"
			borderWidth:6.3
			shadowBlur:40
			borderColor:"#FF9900"
			borderRadius:31.5
			shadowColor:"Black"
			#style["outline"]:"4px solid #F5A623"
		options.BASECOMPONENT.states.blur=
			scale:1
			borderWidth:0
			shadowBlur:0
			shadowColor:"Black"					

		options.BASECOMPONENT.stateSwitch("blur")

		@.on "focus",->
			@.stateSwitch("focus")
			options.BASECOMPONENT.scale=1.1
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
								

sketch = Framer.Importer.load("imported/MODHOME_201805v1_Framer@4x", scale: 1)
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
scrollMainCommand=new ScrollComponent
	width:530
	height: 720-84 
	x:699
	y:84
	backgroundColor: "Transparent"
	scrollHorizontal: false


for sub in Page1Btns.children
	item=new ScaleCommandBTN
		BASECOMPONENT:sub.copy()
		TAGLABEL:""
		x:sub.x+10
		y:sub.y+10
		parent:scrollMainCommand.content
	item.name="ScaleCom"+sub.name
		
	item.stateSwitch("blur")
	item.selectionBorder=true
	
	
	item.on "focus",->
		#print this.name
		if this.name.indexOf("P2")>0
			scrollMainCommand.scrollToPoint(y:655)
			ArrowComponent.animate
				rotation:180
		else
			scrollMainCommand.scrollToPoint(y:0)
			ArrowComponent.animate
				rotation:0
ll=new Layer
	backgroundColor: "Transparent"
	parent: scrollMainCommand.content
	y:1200
Page1Btns.destroy()
scrollMainCommand.contentInset=
	bottom: 10
# for sub in Page2Btns.children
# 	item=new ScaleCommandBTN
# 		BASECOMPONENT:sub.copy()
# 		TAGLABEL:""
# 		x:sub.x+10
# 		y:sub.y+530+10
# 		parent:scrollMainCommand.content
# 	item.name="ScaleCom"+sub.name
# 	item.stateSwitch("blur")
# 	item.selectionBorder=true
# 	item.on "focus",->
# 		scrollMainCommand.scrollToPoint(x:0,y:520)
# Page2Btns.destroy()
Arrow.parent=null
Arrow.bringToFront()
Arrow.y=Arrow.y+5
focusManager.selectedItem=scrollMainCommand.content.children[8]
videoLay=new VideoLayer
	video: "images/fifaad.mp4"
	width:BarkerContent.width*1
	height: BarkerContent.height*1
	x:0
	y:0
	parent:BarkerContent
	scale: 1.55
BarkerContent.clip=true	
# fifaad = new VideoLayer
# 	width: 1280
# 	height: 720
# 	video: "images/fifaad.mp4"
# 
videoLay.player.play()
