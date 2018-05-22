Framer.Extras.Preloader.enable()
BtnContentMappingArray=[{
	name:"ScaleComBtn8" 
	value:"ChildContent"},{
	name:"ScaleComBtn3" 
	value:"MusicContent"},{
	name:"ScaleComBtn9"
	value:"LifeContent"},{
	name:"ScaleComBtn2"
	value:"SportContent"},{
	name:"ScaleComBtn1"
	value:"FreeContent"},{
	name:"ScaleComBtn7"
	value:"CartonContent"},{
	name:"ScaleComBtn6"
	value:"DramaContent"},{
	name:"ScaleComBtn4"
	value:"MovieContent"}]


Array::toDict = (key) ->
  @reduce ((dict, obj) -> dict[ obj[key] ] = obj if obj[key]?; return dict), {}

BtnContentMappingDict=BtnContentMappingArray.toDict('name')

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
			if this.name=="ScaleComBtn5"
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
					focusManager.selectedItem=scrollMainCommand.content.children[4]
			else
				ShowInnerContentFocus(BtnContentMappingDict[this.name]["value"],this)


sketch = Framer.Importer.load("imported/MODHOME_201805v4_Framer@4x", scale: 1)
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
	barker=contentlayer.subLayersByName(layer+"Barker")[0].children[0]
	barker.player.play()
	focusManager.selectedItem=contentlayer
	contentlayer.on "b",->
		barker.player.pause()
		InnerContent.visible=false
		focusManager.selectedItem=parent
	
BuildInnterContent=()->
	for sub in InnerContent.children
		sub.selectionBorder=false
		sub.isSelectable=true
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
		else if this.name.indexOf("P3")>0
			scrollMainCommand.scrollToPoint(y:1308)
			ArrowComponent.animate
				rotation:180
		else
			scrollMainCommand.scrollToPoint(y:0)
			ArrowComponent.animate
				rotation:0
ll=new Layer
	backgroundColor: "Transparent"
	parent: scrollMainCommand.content
	y:1800
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
focusManager.selectedItem=scrollMainCommand.content.children[4]
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
# fifaad = new VideoLayer
# 	width: 1280
# 	height: 720
# 	video: "images/fifaad.mp4"
# 
videoLay.player.play()
scrollMainCommand.content.children[2].right=scrollMainCommand.content.children[3]
scrollMainCommand.content.children[5].right=scrollMainCommand.content.children[6]
scrollMainCommand.content.children[8].right=scrollMainCommand.content.children[9]
scrollMainCommand.content.children[11].right=scrollMainCommand.content.children[12]
scrollMainCommand.content.children[14].right=scrollMainCommand.content.children[15]
scrollMainCommand.content.children[17].right=scrollMainCommand.content.children[18]
BuildInnterContent()