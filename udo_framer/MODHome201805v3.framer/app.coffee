class ProvideUIStates_With_4State_Component extends Layer
	constructor: (options={}) ->

		options.backgroundColor="Transparent"
#		options.name="btnLayer"
		options.isSelectable=true
		super options
		@ishided=false#options.ISCHOICED
		objName=options.BASECOMPONENT.name
		options.BASECOMPONENT.x=0
		options.BASECOMPONENT.y=0
		options.BASECOMPONENT.subLayersByName(objName+"_default")[0].visible=true
		options.BASECOMPONENT.subLayersByName(objName+"_focus")[0].visible=false
		options.BASECOMPONENT.parent=@
		if options.ISHIDED			
			@.opacity=0.2
		else
			@.opacity=1
# 		options.BASECOMPONENT.states.on=
# 			opacity:1
# 			visible:true			
# 		options.BASECOMPONENT.states.off=
# 			opacity:1
# 			visible:true
# 		options.BASECOMPONENT.stateSwitch("off")
		@.states.on=
			visible:true

		@.states.off=
			
			visible:true

# 		options.ISHIDED=false	

		
		@.on "focus",->
			@.stateSwitch("on")
			
# 			options.BASECOMPONENT.stateSwitch("on")
			@.opacity=1
			options.BASECOMPONENT.visible=true
			options.BASECOMPONENT.subLayersByName(objName+"_default")[0].visible=false
			options.BASECOMPONENT.subLayersByName(objName+"_focus")[0].visible=true
			@.bringToFront()		
		@.on "blur",->
			@.stateSwitch("off")
			options.BASECOMPONENT.visible=true
			options.BASECOMPONENT.subLayersByName(objName+"_default")[0].visible=true
			options.BASECOMPONENT.subLayersByName(objName+"_focus")[0].visible=false			
			
			if options.ISHIDED
				
				@.opacity=0.2
			else
				@.opacity=1
				


class ScaleCommandBTN extends Layer
	constructor: (options={}) ->

		options.width=options.BASECOMPONENT.width
		options.height=options.BASECOMPONENT.height		
		
		options.backgroundColor="Transparent"
		options.name=options.BASECOMPONENT.name#"commandBTN_"+options.TAGLABEL
		options.isSelectable=true
		super options

		
		@.states.on=
			visible: true

		@.states.off=
			visible: true
			
		options.BASECOMPONENT.parent=@
		options.BASECOMPONENT.x=0
		options.BASECOMPONENT.y=0
		options.BASECOMPONENT.scale=1
		options.BASECOMPONENT.states.on=
			scale:1.1
			borderColor:"Black"
			borderWidth:6.3
			shadowBlur:40
			borderColor:"#FF9900"
			borderRadius:23.7
			shadowColor:"Black"
			#style["outline"]:"4px solid #F5A623"
		options.BASECOMPONENT.states.off=
			scale:1
			borderWidth:0
			shadowBlur:0
			shadowColor:"Black"					

		options.BASECOMPONENT.stateSwitch("off")

		@.on "focus",->
			@.stateSwitch("on")
			options.BASECOMPONENT.scale=1.1
			@.bringToFront()
			
			for sub in @.children
				sub.stateSwitch("on")
		
		@.on "blur",->
			@.stateSwitch("off")
			for sub in @.children
				sub.stateSwitch("off")
			
		@.on "a",->
			@.stateSwitch("on")
			for sub in @.children
				sub.stateSwitch("on")
								
# Import file "MODHome_201805v3_Framer"
sketch = Framer.Importer.load("imported/MODHome_201805v3_Framer@4x", scale: 1)
{focusManager} = require 'focusManager'
enterTV=""

MainBtnsPageMappingArray=[{
	name:"RBannerParent" 
	value:2},{
	name:"CBannerParent" 
	value:1},{
	name:"LBannerParent"
	value:0}]
	

Array::toDict = (key) ->
  @reduce ((dict, obj) -> dict[ obj[key] ] = obj if obj[key]?; return dict), {}

MainBtnsPageMappingDict=MainBtnsPageMappingArray.toDict('name')
#Kanit font
Utils.insertCSS('@import url(https://fonts.googleapis.com/css?family=Kanit);')
focusManager = new focusManager
	leftStickDpad: true
	controller: "XB1"
	defaultSelectionBorder: true
	defaultSelectionBorderWidth: 4
	defaultSelectionBorderColor: "#FF9900"	
padding=350
Utils.globalLayers sketch

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
videoLay.player.loop=true
scrollBtns=new ScrollComponent
	width: 560
	x:720
	y:90
	height: 380
	scrollVertical: false
scrollBtns.contentInset=
	right:200
bannerComp = new PageComponent
	width: Screen.width - padding * 2
	height: 200
	y:485
	backgroundColor: ""
	scrollVertical: false
	point: Align.center
	clip: false
bannerComp.centerX()
cards=[]
# bannerComp=new ScrollComponent
# 	width: Screen.width
# 	height: 200
# 	y:485
# 	backgroundColor: "Transparent"
# 	scrollVertical: false
for btn in BTNS.children
	if btn.name=="HiddenUI"
		btn.parent=scrollBtns.content
	else	
		newBtn=new ScaleCommandBTN
			BASECOMPONENT:btn.copy()
			TAGLABEL:""
			x:btn.x+10
			y:btn.y+10
			parent:scrollBtns.content
			name:btn.name
			
		newBtn.on "focus",->
			if this.name.indexOf("First")>=0
				scrollBtns.scrollToPoint(x:0)
				HScrollContentMask.visible=true
			else if this.name.indexOf("Third")>=0
				scrollBtns.scrollToPoint(x:1020)
				HScrollContentMask.visible=false			
			else
				scrollBtns.scrollToPoint(x:500)
				HScrollContentMask.visible=false
BTNS.destroy()
#Banners.parent=null
# BannersCopy=Banners.copy()
# 
# BannersCopy.name="ssss1"

#Banners.destroy()
for kk in Banners.children
	isHide=true
	
	if kk.name=="CBanner"
		isHide=false
	bannerKK=new ProvideUIStates_With_4State_Component
		name:kk.name+"Parent"
		BASECOMPONENT:kk
		x:kk.x
		y:kk.y
		width:kk.width
		height:kk.height
		ISHIDED:isHide
	
	bannerKK.parent=bannerComp.content

	bannerKK.on "focus",->
		for s in bannerComp.content.children
			s.opacity=0.2
		current = bannerComp.horizontalPageIndex(cards[MainBtnsPageMappingDict[this.name]["value"]])
		this.opacity=1
		bannerComp.snapToPage cards[MainBtnsPageMappingDict[this.name]["value"]]
	bannerKK.on "blur",->
		isAnyFocus=false
		for s in bannerComp.content.children
			if s.states.current.name=="on"
				isAnyFocus=true
				break
		if !isAnyFocus
			this.opacity=1
		else
			this.opacity=0.2
			
	bannerKK.isSelectable=true
	bannerKK.selectionBorder=false
	cards.push(bannerKK)
Banners.destroy()

bannerComp.snapToPage(bannerComp.content.children[1])
for sub in bannerComp.content.children
	sub.stateSwitch "off"
	

#bannerComp.content.children[1].states.switchInstant "focus"
HScrollContentMask.parent=null
HScrollContentMask.x=Screen.width-HScrollContentMask.width
HScrollContentMask.y=HScrollContentMask.y+7

focusManager.selectedItem=scrollBtns.content.children[0]

scrollBtns.content.subLayersByName("FirstBtnCom03")[0].down=bannerComp.content.subLayersByName("CBannerParent")[0]
scrollBtns.content.subLayersByName("FirstBtnCom06")[0].down=bannerComp.content.subLayersByName("CBannerParent")[0]
scrollBtns.content.subLayersByName("FirstBtnCom09")[0].down=bannerComp.content.subLayersByName("CBannerParent")[0]
scrollBtns.content.subLayersByName("BtnCom12")[0].down=bannerComp.content.subLayersByName("CBannerParent")[0]
scrollBtns.content.subLayersByName("BtnCom15")[0].down=bannerComp.content.subLayersByName("CBannerParent")[0]
scrollBtns.content.subLayersByName("BtnCom18")[0].down=bannerComp.content.subLayersByName("CBannerParent")[0]
bannerComp.content.subLayersByName("CBannerParent")[0].up=scrollBtns.content.subLayersByName("FirstBtnCom03")[0]
bannerComp.content.subLayersByName("LBannerParent")[0].up=scrollBtns.content.subLayersByName("FirstBtnCom03")[0]
bannerComp.content.subLayersByName("RBannerParent")[0].up=scrollBtns.content.subLayersByName("FirstBtnCom03")[0]
bannerComp.content.subLayersByName("CBannerParent")[0].left=bannerComp.content.subLayersByName("LBannerParent")[0]
bannerComp.content.subLayersByName("CBannerParent")[0].right=bannerComp.content.subLayersByName("RBannerParent")[0]
bannerComp.content.subLayersByName("LBannerParent")[0].right=bannerComp.content.subLayersByName("CBannerParent")[0]
bannerComp.content.subLayersByName("RBannerParent")[0].left=bannerComp.content.subLayersByName("CBannerParent")[0]
