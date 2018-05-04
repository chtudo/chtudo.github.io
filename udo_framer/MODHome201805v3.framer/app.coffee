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
	name:"RBanner" 
	value:2},{
	name:"CBanner" 
	value:1},{
	name:"LBanner"
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
padding=330
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
			else
				scrollBtns.scrollToPoint(x:500)
				HScrollContentMask.visible=false
BTNS.destroy()
Banners.parent=null
for kk in Banners.children
#	print kk.name
	kk.parent=bannerComp.content
	kk.states.on =
		opacity: 1
		scale: 1
		visible:true

	kk.states.off=
		opacity: 1
		scale: 0.9
		visible:true
	kk.on "focus",->
# 		print "here focus"
		card.states.switch("off") for card in cards
		current = bannerComp.horizontalPageIndex(cards[MainBtnsPageMappingDict[this.name]["value"]])
# 		print MainBtnsPageMappingDict[this.name]["value"],current,cards[MainBtnsPageMappingDict[this.name]["value"]]
		cards[current].states.switch("on")
		bannerComp.snapToPage cards[MainBtnsPageMappingDict[this.name]["value"]]
# 		print "focus",this.name
# 	kk.on "off",->
# 		print "blur",this.name		
	kk.isSelectable=true
	kk.selectionBorder=false
	cards.push(kk)
Banners.destroy()
bannerComp.snapToPage(bannerComp.content.children[1])
for sub in bannerComp.content.children
	sub.states.switchInstant "off"

#bannerComp.content.children[1].states.switchInstant "focus"
HScrollContentMask.parent=null
HScrollContentMask.x=Screen.width-HScrollContentMask.width
HScrollContentMask.y=HScrollContentMask.y+7
RBannerContentMask.parent=null
LBannerContentMask.parent=null
focusManager.selectedItem=scrollBtns.content.children[0]

scrollBtns.content.subLayersByName("FirstBtnCom03")[0].down=bannerComp.content.subLayersByName("CBanner")[0]
scrollBtns.content.subLayersByName("FirstBtnCom06")[0].down=bannerComp.content.subLayersByName("CBanner")[0]
scrollBtns.content.subLayersByName("FirstBtnCom09")[0].down=bannerComp.content.subLayersByName("CBanner")[0]
scrollBtns.content.subLayersByName("BtnCom12")[0].down=bannerComp.content.subLayersByName("CBanner")[0]
scrollBtns.content.subLayersByName("BtnCom15")[0].down=bannerComp.content.subLayersByName("CBanner")[0]
scrollBtns.content.subLayersByName("BtnCom18")[0].down=bannerComp.content.subLayersByName("CBanner")[0]
bannerComp.content.subLayersByName("CBanner")[0].up=scrollBtns.content.subLayersByName("FirstBtnCom03")[0]
bannerComp.content.subLayersByName("LBanner")[0].up=scrollBtns.content.subLayersByName("FirstBtnCom03")[0]
bannerComp.content.subLayersByName("RBanner")[0].up=scrollBtns.content.subLayersByName("FirstBtnCom03")[0]

