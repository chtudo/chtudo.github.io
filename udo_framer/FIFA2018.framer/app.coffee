# Import file "FIFA_Framer"
class Keyboard extends Framer.EventEmitter

	################################################################################
	# CONSTANTS
	
	KEYBOARD = "keyboard"
	
	# Press Types
	@KEY       = KEY       = "key"
	@DIRECTION = DIRECTION = "direction"
	@BUTTON    = BUTTON    = "button"
	@CUSTOM    = CUSTOM    = "custom"
	@OTHER     = OTHER     = "other"
	
	# Default Direction & Button Settings
	@UP     = UP     = "up"
	@DOWN   = DOWN   = "down"
	@LEFT   = LEFT   = "left"
	@RIGHT  = RIGHT  = "right"
	@BACK   = BACK   = "back"
	@SELECT = SELECT = "select"
	@START  = START  = "start"
	@MENU   = MENU   = "menu"

	# Event Types
	@PRESS_BUTTON    = EVENT_BUTTON    = "press:#{ BUTTON    }"
	@PRESS_DIRECTION = EVENT_DIRECTION = "press:#{ DIRECTION }"
	@PRESS_CUSTOM    = EVENT_CUSTOM    = "press:#{ CUSTOM    }"
	@PRESS_OTHER     = EVENT_OTHER     = "press:#{ OTHER     }"
	@PRESS_KEY       = EVENT_KEYPRESS  = "press:#{ KEY       }"

	################################################################################
	# INITIALIZATION

	constructor:(options={}) ->
		@keyCodes       = options.keyCodes or {}
		# Call Super
		super options
		# Register listener on keyboard
		unless Object.keys(@keyCodes).length is 0
			window.onkeydown = (event) =>
				handleInput @, type: null, control: event.keyCode
				event.preventDefault()

	################################################################################
	# EVENT HELPERS

	onPressDirection: (callback) -> @on EVENT_DIRECTION, callback
	onPressButton:    (callback) -> @on EVENT_BUTTON,    callback
	onPressCustom:    (callback) -> @on EVENT_CUSTOM,    callback
	onPressOther:     (callback) -> @on EVENT_OTHER,     callback
	onPressKey:       (callback) -> @on EVENT_KEYPRESS,  callback

	################################################################################
	# PUBLIC METHODS
	
	emitEvent: (type, action, info) -> @.emit type, action, info

	################################################################################
	# PRIVATE METHODS

	handleInput = (self, info) ->
		type = action = null
		press   = EVENT_KEYPRESS
		control = info.control
		# Check Value & Type
		type = EVENT_BUTTON    if type is null and action = checkButton    self, control
		type = EVENT_DIRECTION if type is null and action = checkDirection self, control
		type = EVENT_CUSTOM    if type is null and action = checkCustom    self, control
		# Set as Other Event & Type
		unless type							            
			type = EVENT_OTHER
			action = control
		# Set Press Type
		action = label for label, keyCode of self.keyCodes when keyCode is info.control
		# Set info details
		info.press = action
		info.type = switch type
			when EVENT_DIRECTION then DIRECTION
			when EVENT_BUTTON    then BUTTON
			when EVENT_CUSTOM    then CUSTOM
			when EVENT_OTHER     then OTHER
		# Call Events
		self.emitEvent press, action, info
		self.emitEvent type,  action, info
		return

	checkDirection = (self, control) ->
		switch control
			when self.keyCodes.up    then return UP
			when self.keyCodes.down  then return DOWN
			when self.keyCodes.left  then return LEFT
			when self.keyCodes.right then return RIGHT

	checkButton = (self, control) ->
		switch control
			when self.keyCodes.select then return SELECT
			when self.keyCodes.back   then return BACK
			when self.keyCodes.start  then return START
			
	checkCustom = (self, control) ->
		return label for label, keyCode of self.keyCodes when keyCode is control
keyboard = new Keyboard
	keyCodes:
		# Directions
		up:       38
		down:     40
		left:     37
		right:    39
		# Buttons
		q_key:    81 #Q鍵
		f_key:   70 #F鍵
		g_key:   71 #G鍵
		back:     8  #del鍵
		# Custom
		space:   32
		enter: 13
		esc: 27 #ESC
		# OTHER
		pop_up:112  #紅外線PC遙控器上面的音樂
		

{focusManager} = require 'focusManager'
focusManager = new focusManager
	leftStickDpad: true
	controller: "XB1"
# Import file "NBA_Phase2_Framer"

tagManageArray=[]

class Tag_With_4State_Component extends Layer
	constructor: (options={}) ->
		options.width=156
		options.height=54
		options.backgroundColor="Transparent"
		options.name="btnLayer"
		options.isSelectable=true
		super options
		@ischoiced=false#options.ISCHOICED
		
		controlSelect_PRESSEND_Style=(componentChoice)->
			componentChoice.children[0].backgroundColor="#3B2808"
			
		controlUnSelect_PRESSEND_Style=(componentChoice)->
			componentChoice.children[0].backgroundColor="#3B2808"
		@.states.focus=
			borderColor: options.FOCUSCOLOR
			borderWidth:options.BORDERWIDTH			

		@.states.blur=
			borderColor: options.FOCUSCOLOR
			borderWidth:0			
		txtLayer=new TextLayer
			text:options.TAGLABEL
			parent:@
			fontSize: 24
			textOverflow: "ellipsis"
			borderWidth:1
			borderRadius:27
			height:54
			textAlign: "center"
			width: 156
			padding: 
				top: 11
				bottom:10

		txtLayer.states.focus=
			backgroundColor: "#282828"
			color: "White"
			borderColor: "#F5A623"

		txtLayer.states.blur=
			backgroundColor: "#282828"
			color: "White"
			borderColor: "#3B3B3B"
		options.ISCHOICED=false	

		
		@.on "focus",->
			@.stateSwitch("focus")
			
			for sub in @.children
				sub.stateSwitch("focus")
# 				controlSelectStyle(sub)
			if options.ISCHOICED
				controlSelect_PRESSEND_Style(@)
		@.on "blur",->
			@.stateSwitch("blur")
			for sub in @.children
				sub.stateSwitch("blur")
			if options.ISCHOICED
				controlUnSelect_PRESSEND_Style(@)
		@.on "a",->
			options.ISCHOICED=!options.ISCHOICED
			@ischoiced=options.ISCHOICED
		
			@.stateSwitch("focus")
			for sub in @.children
				sub.stateSwitch("focus")
			if options.ISCHOICED
				controlSelect_PRESSEND_Style(@)				

		txtLayer.stateSwitch("blur")
	getIsChoiced:()=>
		return @ischoiced

class TagComponent extends Layer
	
	constructor: (options={}) ->
		options.width=156
		options.backgroundColor="Transparent"
		options.name="btnLayer"
		options.isSelectable=true
		super options
		@TAGLABEL=options.TAGLABEL
		@.states.focus=
			borderColor: options.FOCUSCOLOR
			borderWidth:options.BORDERWIDTH			
		
		@.states.blur=
			borderColor: options.FOCUSCOLOR
			borderWidth:0			
		txtLayer=new TextLayer
			text:options.TAGLABEL
			parent:@
			fontSize: 24
			borderWidth:1
			borderRadius:27
			height:54
			textAlign: "center"
			width: 156
			padding: 
				top: 11
				bottom:10

		txtLayer.states.focus=
			backgroundColor: "#282828"
			color: "White"
			borderColor: "#F5A623"

		txtLayer.states.blur=
			backgroundColor: "#282828"
			color: "White"
			borderColor: "#3B3B3B"

		
		@.on "focus",->
			@.stateSwitch("focus")
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
		txtLayer.stateSwitch("blur")
	getMyLabel:()=>
		return @TAGLABEL

class CommandBTN extends Layer
	constructor: (options={}) ->
		options.width=156
		options.height=74
		
		
		options.backgroundColor="Transparent"
		options.name="commandBTN"
		options.isSelectable=true
		super options

		@.states.focus=
			borderColor: options.FOCUSCOLOR
			borderWidth:options.BORDERWIDTH			

		@.states.blur=
			borderColor: options.FOCUSCOLOR
			borderWidth:0			
		gradient = new Gradient
			start: "#0F141A"
			end: "#3E3F41"
			angle:180
		txt=new TextLayer
			text:options.TAGLABEL
			parent:@
			width: 156
			height:74
			borderRadius: 0
			borderWidth: 2
			gradient:gradient
			borderColor: "#494949"
			color: "#E6E6E6"
			fontSize: 26
			textAlign:Align.center
			padding: 18
			name:"BTNCommand"

		txt.states.focus=
			color: "#FF9900"
			borderColor: "#F5A623"
			borderWidth:4

		txt.states.blur=
			color: "#E5E5E5"
			borderColor: "#3B3B3B"
			borderWidth:2

		
		@.on "focus",->
			@.stateSwitch("focus")
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
		txt.stateSwitch("blur")				

class ChannelGameBTN extends Layer
	constructor: (options={}) ->
		options.width=options.BASECOMPONENT.width
		options.height=options.BASECOMPONENT.height
		options.x=options.BASECOMPONENT.x+2
		options.y=options.BASECOMPONENT.y+5		
		options.isSelectable=true
		super options
		
		@.states.focus=
			borderColor: options.FOCUSCOLOR
			borderWidth:options.BORDERWIDTH			

		@.states.blur=
			borderColor: options.FOCUSCOLOR
			borderWidth:0			


		options.BASECOMPONENT.parent=@
		options.BASECOMPONENT.x=0
		options.BASECOMPONENT.y=0
		leftStatLayer=options.StarIcon.copy()
		leftStatLayer.props=
			parent:@
			x:9
			y:52
			backgroundColor:"Transparent"
			name:"LeftStar"
			visible:false
		rightStarLayer=options.StarIcon.copy()
		rightStarLayer.props=
			parent:@
			x:313
			y:52
			backgroundColor:"Transparent"
			name:"RightStar"
			visible:false
		layerTxt=new TextLayer
			text:options.DATEINFO
			fontSize: 28
			x:10
			y:5
			color:"#FF9900"
			parent:@
			name:"subLaybel"
		
		
		this.stateSwitch("blur")
		if options.ISTodaySpecial
			this.subLayersByName("subLaybel")[0].color="#FF9900"
		else
			this.subLayersByName("subLaybel")[0].color="#FFFFFF"	
		@.on "focus",->
			this.style["outline"] = "2px solid #F5A623"
			this.subLayersByName("subLaybel")[0].color="#FF9900"
		
		
		@.on "blur",->
			this.style["outline"] = "0px solid #F5A623"
			this.borderColor="#F5A623"
			
			if options.ISTodaySpecial
				this.subLayersByName("subLaybel")[0].color="#FF9900"
			else
				this.subLayersByName("subLaybel")[0].color="#FFFFFF"	
# 			@.stateSwitch("blur")
# 			for sub in @.children
# 				sub.stateSwitch("blur")
		@.on "a",->
			@.stateSwitch("focus")
			for sub in @.children
				sub.stateSwitch("focus")
		
		
class ProvidedUI_BTN extends Layer
	constructor: (options={}) ->
		options.width=options.BASECOMPONENT.width
		options.height=options.BASECOMPONENT.height
		options.x=options.BASECOMPONENT.x+2
		options.y=options.BASECOMPONENT.y+5		
		options.isSelectable=options.isSelectable
		super options
		
		@.states.focus=
			borderColor: options.FOCUSCOLOR
			borderWidth:options.BORDERWIDTH			

		@.states.blur=
			borderColor: options.FOCUSCOLOR
			borderWidth:0			


		options.BASECOMPONENT.parent=@
		options.BASECOMPONENT.x=0
		options.BASECOMPONENT.y=0


		
		
		this.stateSwitch("blur")
		@.on "focus",->
			this.style["outline"] = "2px solid #F5A623"
		
		
		@.on "blur",->
			this.style["outline"] = "0px solid #F5A623"
			this.borderColor="#F5A623"
			
		@.on "a",->
			@.stateSwitch("focus")
# 			for sub in @.children
# 				sub.stateSwitch("focus")
# 		
		
sketch = Framer.Importer.load("imported/FIFA_Framer@2x", scale: 1)
Utils.globalLayers sketch
tagHome=["#C羅","#葡萄牙","#PK賽","#足球小知識","#每日好球","#用生命擋球"]
btnsHome=["轉播表","賽事影音","找國家","找球星","追蹤管理","賽程表","訂閱管理"]
SettingBenzGameComponent=()->
	NBA_Game.isSelectable=true
	NBA_Game.selectionBorder=false
	NBA_Game.states.defaultOnState=
		visible:true
	NBA_Game.states.defaultOffState=
		visible:true
	NBA_Game.on Events.StateWillSwitch,(from, to, states)->
		
		if(to=="defaultOnState")
			this.subLayersByName("Focus_Game")[0].visible=true
			this.subLayersByName("NoFocus_Game")[0].visible=false
		if(to=="defaultOffState")
			this.subLayersByName("Focus_Game")[0].visible=false
			this.subLayersByName("NoFocus_Game")[0].visible=true
	NBA_Game.stateSwitch("defaultOffState")

# 	NBA_Game.on "focus",->
# 		this.stateSwitch("onfocus")
SettingBenzGameComponent()	
BuildFindPlayerControl=()->
	for item in FindPlayerContents.children
		oriX=item.x
		oriY=item.y
		
		btn=new ProvidedUI_BTN
				BASECOMPONENT:item
				isSelectable:true
				parent:FindPlayerContents
		btn.x=oriX
		btn.y=oriY
		btn.parent=FindPlayerContents
		btn.on "a",->
			flow.showNext(NBA_PLayer)
			setUpHeaderTitle("史蒂芬．柯瑞")
			NBA_PLayer.isSelectable=true
			NBA_PLayer.selectionBorder=false
			focusManager.selectedItem=NBA_PLayer
	NBA_PLayer.on "b",->
		flow.showPrevious()
		LiveIcon.stateSwitch("NOTLive")
		clearAllStateHome()
		setUpHeaderTitle("找球星")
		FindPlayer.isSelectable=true
		FindPlayer.selectionBorder=false
		focusManager.selectedItem=FindPlayerContents.children[0]

BuildFindPlayerControl()

BuildFindTeamControl=()->
	for item in EastAlian.children
		oriX=item.x
		oriY=item.y
		
		btn=new ProvidedUI_BTN
				BASECOMPONENT:item
				isSelectable:true
		btn.x=oriX
		btn.y=oriY
		btn.parent=EastAlian
		btn.on "a",->
			flow.showNext(NBA_Team)
			setUpHeaderTitle("國家介紹")
			NBA_Team.isSelectable=true
			NBA_Team.selectionBorder=false
			focusManager.selectedItem=NBA_Team
		btn.on "focus",->
			flow.scroll.scrollToPoint(y:this.y)
# 	for item in WestAlian.children
# 		oriX=item.x
# 		oriY=item.y
# 		
# 		btn=new ProvidedUI_BTN
# 				BASECOMPONENT:item
# 				isSelectable:true
# 		btn.x=oriX
# 		btn.y=oriY
# 		btn.parent=WestAlian
# 		btn.on "a",->
# 			flow.showNext(NBA_Team)
# 			setUpHeaderTitle("勇士隊")
# 			NBA_Team.isSelectable=true
# 			NBA_Team.selectionBorder=false
# 			focusManager.selectedItem=NBA_Team
# 		btn.on "focus",->
# 			flow.scroll.scrollToPoint(y:this.y+WestAlian.y)
# 
	NBA_Team.on "b",->
		flow.showPrevious()
		LiveIcon.stateSwitch("NOTLive")
		clearAllStateHome()
		setUpHeaderTitle("找國家")
		FindPlayer.isSelectable=true
		FindPlayer.selectionBorder=false
		focusManager.selectedItem=EastAlian.children[0]
BuildFindTeamControl()

#這適用於按鈕下面有XXXX_OnFocus/XXXX_NoFocus的複雜View，單純程式額外加框
SettingBtnStates_ComplexeView=(btn_contain_2views)->
	btn_contain_2views.states.OnFocus=
		name:btn_contain_2views.name
		borderWidth:4
		borderColor:"#F5A623"
	btn_contain_2views.states.NoFocus=
		name:btn_contain_2views.name
		borderWidth:4
		borderColor:"Transparent"
	btn_contain_2views.on Events.StateWillSwitch,(from, to, states)->
		
		if(to=="OnFocus")
			this.subLayersByName(this.name+"_Focus")[0].visible=true
			this.subLayersByName(this.name+"_NoFocus")[0].visible=false
		if(to=="NoFocus")
			this.subLayersByName(this.name+"_Focus")[0].visible=false
			this.subLayersByName(this.name+"_NoFocus")[0].visible=true
page=new PageComponent
	x: 0
	width: Screen.width
	height: 260
	parent: NBA_Home
videoLay=new VideoLayer
	video: "images/fifaad.mp4"
	width:BarkerpngContent.width*1.55
	height: BarkerpngContent.height*1.55
	x: 0
	y:0



SetupLiveFrame=()->
	videoLay.player.loop=true
	videoLay.player.muted=true
	LiveFrame=new Layer
		parent:NBA_Home
		x:LivePoster.x
		#y:LivePoster.y
		width: LivePoster.width
		height: LivePoster.height
		backgroundColor: "Transparent"
		name:"LiveFrame"
	poster=TotalBanner.subLayersByName("D_Today")[0].copy()
	
	poster.parent=LiveFrame
	poster.x=0
	poster.y=0
	
# 	LivePoster.parent=LiveFrame
# 	LivePoster.x=0
# 	LivePoster.y=0
	Barkerpng.parent=NBA_Home
	
	videoFrame=new Layer
		width:BarkerpngContent.width
		height: BarkerpngContent.height
		x: 0
		y:13
		clip: true
		parent:Barkerpng
	videoFrame.centerX()
	videoLay.parent= videoFrame
	#Barkerpng#
	Barkerpng.bringToFront()
	#videoFrame.bringToFront()
	videoLay.center()


SetupLiveFrame()

posterMapping = [
]
#設定首頁上方的切換Banner
for sub in TotalBanner.children
	pageview=new Layer
		width: Screen.width
		height: 260
		x:0
		y:0
	if sub.name=="D_Today"
		NBA_Home.subLayersByName("LiveFrame")[0].parent=pageview
	else

		
		sub.parent=pageview
		sub.x=0
		sub.y=0
	page.addPage(pageview)	
	posterMapping.push({
			name:   sub.name,
			poster: pageview
		});

Array::toDict = (key) ->
  @reduce ((dict, obj) -> dict[ obj[key] ] = obj if obj[key]?; return dict), {}
nappingDict = posterMapping.toDict('name')
 
#這個專案中，是有設定為flow.header
layerHead=new Layer
	width:screen.width
	name:"Header_Layer"
	height: MODHeaderFrame.height
layerHead.states.home=
	height: 80
layerHead.states.other=
	height: 80
layerHead.on Events.StateWillSwitch,(from, to, states)->
	if to=="home"
		this.subLayersByName("MODHeaderFrame")[0].subLayersByName("MODHeaderFrameBlue")[0].visible=true
		this.subLayersByName("MODHeaderFrame")[0].subLayersByName("MODHeaderFrameBlack")[0].visible=false
	else
		this.subLayersByName("MODHeaderFrame")[0].subLayersByName("MODHeaderFrameBlue")[0].visible=false
		this.subLayersByName("MODHeaderFrame")[0].subLayersByName("MODHeaderFrameBlack")[0].visible=true	
showHomeView=()->
	
	flow.showPrevious()
	setUpHeaderTitle("")
	#LiveIcon.stateSwitch("Live")
# 	HomeConteolsArray[currentRow][currentCol].stateSwitch("OnFocus")
	#NewsGroup改成動態指定內容
	NewsGroup.visible=false
	SettingChannelBtnStar(IsAnyTagFollow)
	UpdateNewsFollowContents(IsAnyTagFollow)
	for sub in NBA_Home.subLayersByName("scrollChannelNew")[0].content.children
		if sub.name =="今天"
			focusManager.selectedItem=sub
			break
# 		
# 	else
# 		SettingChannelBtnStar(false)
# 		
layerHead.on Events.Click,->
	showHomeView()
MODHeaderFrame.parent=layerHead
layerHeaderLabel=new TextLayer
	parent: layerHead
	text:""
	color: "White"
	fontSize: 36
	x:220
	y:20
setUpHeaderTitle=(txtTitle)->
	layerHeaderLabel.text=txtTitle
	if txtTitle==""
		layerHead.stateSwitch("home")
	else
		layerHead.stateSwitch("other")
		
howManyComponentsInaRow=0	

# mainBG.sendToBack()
flow =new FlowComponent
flow.header=layerHead

createTagBtnGroups=(maxWidth,datasTag,randomSelectNum,isSelected,isFocus)->
	
	layerBtns=new Layer
		width:maxWidth
		backgroundColor: "Transparent"
	originalX=20
	newX=20
	newY=0
	count=1
	componentH=35
	eachGap=34
	isWide=false
	index=0
	isBigThanWith=false
	for sub in datasTag
		isFocused=false
		if index<randomSelectNum
			isFocused=true
		
		#bt=createTagBtn(sub,isFocused)
		bt=new Tag_With_4State_Component
			TAGLABEL:sub
		tagManageArray.push(bt)	
# 			 createTagBtn(sub)
		if((newX+bt.width)>(maxWidth-20))
			newX=originalX
			isBigThanWith=true	
			newY=(count)*componentH+eachGap*(count)
			count=count+1
		if isBigThanWith
			
# 			if (index+1>howManyComponentsInaRow)
# 			else
			if howManyComponentsInaRow==0
			
				howManyComponentsInaRow=index
			
		bt.parent=layerBtns
		bt.y=newY
		bt.x=newX
		newX=newX+bt.width+10
		index=index+1
		componentH=bt.height
	
# 	for sub in layerBtns.children
# 		
# 		TagManageControlArray[TagManageControlArray.length]=sub
	
	 
	layerBtns.height=count*componentH+(count-1)*eachGap
	
	
	return layerBtns	
CreateTagGroup=(groupName,tagArray,tagedNum,isSelected,isFocus)->
	layerTagGroup=new Layer
		width: Screen.width
		backgroundColor: "Transparent"
	groupTitle=new TextLayer
		text:groupName
		fontSize: 26
		color:"White"
		width: 55
		parent: layerTagGroup
		x:62
#		textOverflow: "ellipsis"
	
	tagView=createTagBtnGroups(Screen.width-groupTitle.maxX, tagArray,tagedNum,isSelected,isFocus)
	tagView.props=
		parent:layerTagGroup
		x:130
		name:"layerBTNS"
	layerTagGroup.height=tagView.height
	groupTitle.centerY()


	return layerTagGroup

CreateManageTagPage=()->
	layerManage=new Layer
		width: Screen.width
		height: Screen.height
		backgroundColor: "#000000"
		name:"TagManageView"

	layerManegeFollow=new ScrollComponent
		width: Screen.width
		height: Screen.height-80
		backgroundColor: "#000000"
		parent:layerManage
		x:0
		scrollVertical: true
		scrollHorizontal: false
		y:80#layerTitle.maxY+70
		name:"tagScrollContent"
		contentInset: 
			bottom: 1000
			top:50
	#TagManageControlArray=[]
	layG1=CreateTagGroup("話題",["#每日好球","#用生命擋球","#PK戰定生死","#足球小知識"],Utils.randomChoice([1,2,3]),true,true)
	layG1.name="話題"
	for d in layG1.children
		d.on "focus",->
			layerManegeFollow.scrollToPoint(y:this.y)
		
	layG1.parent=layerManegeFollow.content
	layG1.y=50
	layG2=CreateTagGroup("國家",["#德國","比利時","#瑞士","#波蘭","#丹麥","#冰島","#葡萄牙",
	"#西班牙","#法國","#英格蘭","#瑞典","#賽爾維亞","#巴西","#阿根廷","#祕魯","#烏拉圭","#墨西哥","#奈及利亞","#克羅埃西亞","#哥斯大黎加","#俄羅斯","#埃及","#伊朗","#沙烏地阿拉伯","#澳大利亞","#巴拿馬","#日本","#韓國"],Utils.randomChoice([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]),true,false)
	layG2.parent=layerManegeFollow.content
	layG2.y=layG1.maxY+60
	layG2.name="國家"
	layG3=CreateTagGroup("球星",["#穆勒","#德布勞內","#夏奇里","#萊萬多夫斯基","#艾瑞克森","#西格森","#C羅","#拉莫斯","#格里茲曼","#凱恩","#拉爾森","#馬堤奇","#內馬爾","#梅西","#法爾範","#卡瓦尼","#赫南德茲","#哈梅斯","#哈茲里","#馬內","#貝拿提亞","#摩西斯","#莫德里奇","#儒易茲","#亞金費耶夫","#薩拉","#亞玆蒙","#阿爾-慕瓦拉","#傑迪納克","#佩雷茲","#香川真司","#孫興慜"],Utils.randomChoice([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]),false,true)
	layG3.parent=layerManegeFollow.content
	layG3.y=layG2.maxY+60
	layG3.name="球星"
	
	loopA=0
	eachRows=0
	focusManager.selectedItem = layG1.children[0]
	
	return layerManage
pageManageTag=CreateManageTagPage()
pageManageTag.y=2000

flow.showNext(NBA_Home)

InitialResource=()->
	Posters.visible=false
InitialResource()

LiveIcon.states.Live=
	visible:true
LiveIcon.states.NOTLive=
	visible:false

setLiveShow=(isLive)->
	if isLive
		videoLay.player.play()
		#LiveIcon.stateSwitch("Live")
	else
		videoLay.player.pause()
	
setLiveShow(true)
getLastDayInFormat=(dayadd)->
	newDate1=new Date()
	newDate1.setDate(newDate1.getDate()+dayadd)
	return formatDate(newDate1)
PaddingNum=(num, size)->

    s = "00" + num;
    return s.substr(s.length-size);
	
formatDate = (date) ->
  year = date.getFullYear()
  week=date.getDay()
  weeks = ['(日)','(一)','(二)','(三)','(四)','(五)','(六)']
  month = PaddingNum(date.getMonth()+1,2)
  day = PaddingNum(date.getDate(),2)
  weekchinese=weeks[week]
  return "#{month}/#{day}#{weekchinese}"

 formatAMPM=(date) ->
  hours = date.getHours()
  minutes = date.getMinutes()
  ampm = if(hours>=12) then "PM" else "AM"

  strTime = PaddingNum(hours,2) + ':' + PaddingNum(minutes,2)
  return strTime
timeLayer=new TextLayer
SettingHeaderDateTime=()->
	timeLayer.props =
		text:formatDate(new Date())+" "+formatAMPM(new Date())
		color:"#FAFAFA"
		fontSize:24
		parent:MODHeaderFrame
		x:Screen.width-200
		y:25
	Utils.interval 40,->
		timeLayer.text=formatDate(new Date())+" "+formatAMPM(new Date())
SettingHeaderDateTime()

layerPoster = new Layer
		parent:NBA_Home
		y:70
		x:-1280

showBarkerImage=(day)->
	
	pageToSnap=nappingDict[day]["poster"]
	
	page.snapToPage(pageToSnap)

IsAnyTagFollow=true		
showBarkerImage("D_Today")
#建立最近最夯的tag
createScrollTag=()->
	TagBarContent.visible=false
	tagScrollStartX=270
	scrollTag=new ScrollComponent
		parent:NBA_Home
		width: Screen.width-tagScrollStartX
		height: TagBar.height
		y:TagBar.y
		x:tagScrollStartX
		scrollVertical: false
		name:"scrollTag"
	oriTagX=TagBar.x
	xIndex=0
	iControl=0
	for sub in tagHome
		
		#tag1=createTag(sub)
		tag1=new TagComponent
			TAGLABEL:sub
		
		if (xIndex==0)
			tag1.x=xIndex*tag1.width+30
		else
			tag1.x=xIndex*tag1.width+30+25*(xIndex)

		xIndex=xIndex+1
		tag1.parent=scrollTag.content
		tag1.on "focus",->
			flow.scroll.scrollToPoint(y:0)
			scrollTag.scrollToPoint(x:this.x)
		tag1.on "a",->
			flow.showNext(NBA_Tag)
			focusManager.selectedItem = NBA_Tag
			LiveIcon.stateSwitch("NOTLive")
			setUpHeaderTitle(this.getMyLabel())
			
	NBA_Tag.isSelectable=true
	NBA_Tag.selectionBorder=false
	
	NBA_Tag.on "b",->
		showHomeView()
		
	#TagBar.parent=scrollTag.content
	#TagBar.x=0
	#TagBar.y=0
createScrollTag()
getTimeNextHour=()->
  hours = new Date().getHours()+1
  minutes = new Date().getMinutes()

  strTime = PaddingNum(hours,2) + ':' + Utils.randomChoice(["20","00","30"])
  return strTime
#建立賽程表列表
GenScrollChannelBars=()->
	controlIndex=0
	isTodayBegin=0
	scrollChannelNew=new ScrollComponent
		parent:NBA_Home
		x:0
		y:ChannelGroups.y
		backgroundColor: "Transparent"
		width: Screen.width
		height: 146+10
		scrollVertical: false
		scrollHorizontal: true
		name:"scrollChannelNew"
	scrollChannelNew.contentInset=
		left:104
		right:50
	todayIndex=0
	BtnGroups.visible=false
	for sub in NewChannelItems.children
		if sub.name.indexOf("Today")>0
			#xPO= sub.x-sub.width
			break
		todayIndex=todayIndex+1
	loopIndex=0
	
	for sub in NewChannelItems.children
		
		if sub.name.indexOf("Today")>0
			isTodayBegin=isTodayBegin+1
			#btn=BuildChannelBtn("今天  "+getTimeNextHour(),sub,true)
			btn=new ChannelGameBTN
				BASECOMPONENT:sub
				DATEINFO:"今天  "+getTimeNextHour()
				StarIcon:StarIcon
				ISTodaySpecial:true
				
			btn.parent=scrollChannelNew.content
			btn.name="今天"
			focusManager.selectedItem = btn
# 			btn.stateSwitch("focus")
			
		else
			if loopIndex==todayIndex+1
				btn=new ChannelGameBTN
					BASECOMPONENT:sub
					DATEINFO:"明天  "+getTimeNextHour()
					StarIcon:StarIcon
					ISTodaySpecial:false
				btn.name="D_ADD"+(loopIndex-todayIndex)
				btn.parent=scrollChannelNew.content
			else if loopIndex<todayIndex
				btn=new ChannelGameBTN
					BASECOMPONENT:sub
					DATEINFO:getLastDayInFormat(-1)+"  "+getTimeNextHour()
					StarIcon:StarIcon
					ISTodaySpecial:false
				btn.parent=scrollChannelNew.content
				btn.name="D_MINUS"+(todayIndex-loopIndex)
			else
				btn=new ChannelGameBTN
					BASECOMPONENT:sub
					DATEINFO:getLastDayInFormat(loopIndex-todayIndex+1)+"  "+getTimeNextHour()
					StarIcon:StarIcon
					ISTodaySpecial:false
				btn.parent=scrollChannelNew.content
				btn.name="D_ADD"+(loopIndex-todayIndex)
			btn.stateSwitch("blur")

		btn.on "focus",->
			controlName= this.name
			if controlName=="今天"
				setLiveShow(true)
				showBarkerImage("D_Today")
				
			if controlName.indexOf("D_")>=0
				showBarkerImage(controlName)
							
			flow.scroll.scrollToPoint(y:0)
			if this.x>740 and this.x<1500
				scrollChannelNew.scrollToPoint(x:724)
			else if this.x<740
			
				scrollChannelNew.scrollToPoint(x:this.x)
			else
				scrollChannelNew.scrollToPoint(x:this.x-800)
		loopIndex=loopIndex+1
	#xPO=xPO-40 
	scrollChannelNew.scrollToPoint(x:724,y:0)
	
GenScrollChannelBars()
#命令列

crateScrollMainBtns=()->
	scrollMainBtns=new ScrollComponent
		parent:NBA_Home
		width: Screen.width
		height: BtnGroups.height+10
		y:BtnGroups.y
		scrollVertical: false
		name:"scrollBtnGroups"
		contentInset:
			left:104
	BtnGroups.visible=false
	xIndex=1
	NBA_Game.parent=scrollMainBtns.content
	NBA_Game.x=0
	NBA_Game.y=0
	for sub in btnsHome
		
		btn=new CommandBTN
			TAGLABEL:sub
		btn.name=sub
		
		if sub=="找國家"
			btn.on "a",->		
				flow.showNext(FindTeam)
				LiveIcon.stateSwitch("NOTLive")
				clearAllStateHome()
				setUpHeaderTitle("找國家")
				FindTeam.isSelectable=true
				FindTeam.selectionBorder=false
				focusManager.selectedItem=FindTeam
				focusManager.selectedItem=EastAlian.children[0]
			FindTeam.on "b",->
				showHomeView()
# 				focusManager.selectedItem=NBASchedule
				for uu in NBA_Home.subLayersByName("scrollBtnGroups")[0].content.children
					if uu.name =="找國家"
						focusManager.selectedItem=uu
						break		
		if sub=="找球星"
			btn.on "a",->
				flow.showNext(FindPlayer)
				LiveIcon.stateSwitch("NOTLive")
				clearAllStateHome()
				setUpHeaderTitle("找球星")
				FindPlayer.isSelectable=true
				FindPlayer.selectionBorder=false
				focusManager.selectedItem=FindPlayerContents.children[0]
			FindPlayer.on "b",->
				showHomeView()
# 				focusManager.selectedItem=NBASchedule
				for uu in NBA_Home.subLayersByName("scrollBtnGroups")[0].content.children
					if uu.name =="找球星"
						focusManager.selectedItem=uu
						break
		if sub=="追蹤管理"
			btn.on "a",->
				
				flow.showNext(pageManageTag)
				LiveIcon.stateSwitch("NOTLive")
				pageManageTag.isSelectable=true
				pageManageTag.selectionBorder=false
				setUpHeaderTitle("追蹤管理")		
				if !IsShowFollowBenefit
					FollowBenefit.x=0
	
					FollowBenefit.y=0
					FollowBenefit.isSelectable=true
					FollowBenefit.selectionBorder=false
					FollowBenefit.bringToFront()
					focusManager.selectedItem=FollowBenefit
				else
					
					focusManager.selectedItem=pageManageTag
					focusManager.selectedItem=pageManageTag .subLayersByName("tagScrollContent")[0].content.subLayersByName("話題")[0].subLayersByName("layerBTNS")[0].children[0]	
			FollowBenefit.on "a",->
				FollowBenefit.sendToBack()
				focusManager.selectedItem=pageManageTag
				focusManager.selectedItem=pageManageTag .subLayersByName("tagScrollContent")[0].content.subLayersByName("話題")[0].subLayersByName("layerBTNS")[0].children[0]	
			FollowBenefit.on "b",->
				FollowBenefit.sendToBack()
				focusManager.selectedItem=pageManageTag
			pageManageTag.on "b",->
				
				for uu in NBA_Home.subLayersByName("scrollBtnGroups")[0].content.children
					if uu.name =="追蹤管理"
						focusManager.selectedItem=uu
						break
				for sss in tagManageArray
					#print sss.getIsChoiced(),sss.name
					if sss.getIsChoiced()
						IsAnyTagFollow=true
# 						print "-------"
				showHomeView()
# 				print IsAnyTagFollow,"哈哈"
						
		if sub=="轉播表"
			btn.on "a",->
				NBASchedule.isSelectable=true
				NBASchedule.selectionBorder=false
				
				flow.showNext(NBASchedule)
				LiveIcon.stateSwitch("NOTLive")
				focusManager.selectedItem=NBASchedule
				
				setUpHeaderTitle("轉播表")
			NBASchedule.on "b",->
				showHomeView()
# 				focusManager.selectedItem=NBASchedule
				for uu in NBA_Home.subLayersByName("scrollBtnGroups")[0].content.children
					if uu.name =="轉播表"
						focusManager.selectedItem=uu
						break									
		if sub=="訂閱管理"
			OrderedIcon.scale=0.8
			

			OrderedIcon.backgroundColor="Transparent"
			OrderedIcon.parent=btn
			OrderedIcon.x=-5
			OrderedIcon.y=-5
			OrderedIcon.states.focus=
				visible:true
				x:-2
				y:-2
			
			OrderedIcon.states.blur=
				visible:true
				x:-5
				y:-5
			btn.on "a",->
				NBASubscrib.x=0
				NBASubscrib.y=0
				NBASubscrib.bringToFront()
				NBASubscrib.isSelectable=true
				
				NBASubscrib.selectionBorder=false
	
				focusManager.selectedItem=NBASubscrib
			NBASubscrib.on "b",->
				NBASubscrib.sendToBack()
# 				focusManager.selectedItem=sub
				for uu in NBA_Home.subLayersByName("scrollBtnGroups")[0].content.children
					if uu.name =="訂閱管理"
						focusManager.selectedItem=uu
						break				
				
				NBASubscrib.sendToBack()
				return
		if (xIndex==0)
			btn.x=xIndex*btn.width+0
		else
			btn.x=xIndex*btn.width+0+25*(xIndex)		
		xIndex=xIndex+1
		btn.parent=scrollMainBtns.content
		btn.on "focus",->
			if this.x>1000
				scrollMainBtns.scrollToPoint(x:this.x)
			else
				scrollMainBtns.scrollToPoint(x:0)
			flow.scroll.scrollToPoint(y:800)

	scrollMainBtns.scrollToPoint(x:0)
crateScrollMainBtns()	
#建立追蹤VOD列表

createNewsGroup=(isShowFollowedNews)->
	scrollNewsGroup=new ScrollComponent
		parent:NBA_Home
		width: Screen.width
		height: NewsGroup.height+20
		y:NewsGroup.y
		backgroundColor: "Black"
		scrollVertical: false
		name:"scrollNewsGroupLayer"
		contentInset:
			left:104
			right:100
	
	
# 	NewsGroup_default.visible=!isShowFollowedNews
# 	NewsGroup.visible=!isShowFollowedNews
	if isShowFollowedNews
		for sub in NewsGroup_default.children
			sub.visible=false
		
		for sub in NewsGroup.children
			
			copyItem=sub.copy()
			copyItem.visible=true
			isLine=copyItem.name.indexOf("Line")>=0
# 			print NBA_Home.subLayersByName("scrollBtnGroups")[0].content.children[2]
			btn=new ProvidedUI_BTN
					BASECOMPONENT:copyItem
					isSelectable:!isLine
					up:NBA_Home.subLayersByName("scrollBtnGroups")[0].content.children[2]
			
			btn.name="News"
			btn.parent=scrollNewsGroup.content
			controlIndex=controlIndex+1	
			btn.on "focus",->
				scrollNewsGroup.scrollToPoint(x:this.x)
				flow.scroll.scrollToPoint(y:1000)
	else
		for sub in NewsGroup.children
			sub.visible=false
		for sub in NewsGroup_default.children
			copyItem=sub.copy()
			copyItem.visible=true
			
			isLine=copyItem.name.indexOf("Line")>=0
			
			btn=new ProvidedUI_BTN
					BASECOMPONENT:copyItem
					isSelectable:!isLine
			btn.on "focus",->
				scrollNewsGroup.scrollToPoint(x:this.x)
				flow.scroll.scrollToPoint(y:1000)
			#HomeConteolsArray[3][controlIndex]=copyItem
			#SetStates(copyItem)
			btn.name="News"
			btn.parent=scrollNewsGroup.content
			controlIndex=controlIndex+1
	scrollNewsGroup.scrollToPoint(x:0)
createNewsGroup(true)

ReOrg=()->	
	firstNews=NBA_Home.subLayersByName("scrollNewsGroupLayer")[0].content.children[0]
	todayChannel=NBA_Home.subLayersByName("scrollChannelNew")[0].content.children[3]
	firsttag=NBA_Home.subLayersByName("scrollTag")[0].content.children[0]
	firstBtn=NBA_Home.subLayersByName("scrollBtnGroups")[0].content.children[0]
	for tt in NBA_Home.subLayersByName("scrollChannelNew")[0].content.children
		if tt=="今天"
			todayChannel =tt
	
	
	for sub in NBA_Home.subLayersByName("scrollTag")[0].content.children
		sub.down=todayChannel
		
	for sub in NBA_Home.subLayersByName("scrollChannelNew")[0].content.children
		sub.up=firsttag
		sub.down=firstBtn
	
# 	print "firstNew:",firstNews,"todayChannel:",todayChannel
	for ii in NBA_Home.subLayersByName("scrollBtnGroups")[0].content.children
		ii.top=todayChannel
		ii.down=firstNews
		
ReOrg()		
	

clearAllStateHome_ButNoStopLive=()->
	#clearScrollBtnState()
	clearScrollTagState()
	clearChannelStates()
		
clearAllStateHome=()->
	setLiveShow(false)
	

SetStates=(layer)->
	layer.states.OnFocus=
		borderWidth:4
		borderColor:"#F5A623"
	layer.states.NoFocus=
		borderWidth:0
		borderColor:"#F5A623"

ReOrgNBA_Team=()->
	SettingBtnStates_ComplexeView(FindScore_NBA_Team)
	SettingBtnStates_ComplexeView(FollowBtn_NBATeam)
# 	for sub in RecentGames_NBA_Team.children
# 		SetStates(sub)
ReOrgNBA_Team()
IsShowSubscrib=false
IsShowFollowBenefit=false
PopNotifyWin=Popup_Notify_WinWin.copy()
		
PopNotifyWin.visible=false
PopNotifyWin.x=901
PopNotifyWin.y=59
IsJump=()->
	if(currentCol==0 && currentRow<=5)
		return true
	else
		return false
ShowOrHidePopup=()->
	PopNotifyWin.visible=!PopNotifyWin.visible
	if PopNotifyWin.visible
		PopNotifyWin.bringToFront()
	else
		PopNotifyWin.sendToBack()
keyboard.onPressCustom (key, info) -> 
	if key=="pop_up"
		ShowOrHidePopup()
	if key=="g_key"
		ShowOrHidePopup()
NBASubscrib.backgroundColor="Transparent"
SettingChannelBtnStar=(isShowStar)->
	if isShowStar
		for sub in NBA_Home.subLayersByName("scrollChannelNew")[0].content.children # HomeConteolsArray[1]
			sub.subLayersByName("RightStar")[0].visible=Utils.randomChoice([true,false])
			sub.subLayersByName("LeftStar")[0].visible=Utils.randomChoice([true,false])
	else		
		for sub in NBA_Home.subLayersByName("scrollChannelNew")[0].content.children
			sub.subLayersByName("RightStar")[0].visible=false
			sub.subLayersByName("LeftStar")[0].visible=false
UpdateNewsFollowContents=(isShowFollowedNews)->
	scroll=NBA_Home.subLayersByName("scrollNewsGroupLayer")[0]
	scroll.destroy()
	if isShowFollowedNews
		createNewsGroup(isShowFollowedNews)
	else
		createNewsGroup(isShowFollowedNews)
