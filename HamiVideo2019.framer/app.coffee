sketch = Framer.Importer.load("imported/HamiVideo2019@4x", scale: 1)
Utils.globalLayers sketch
Framer.Extras.Preloader.enable()
Framer.Extras.Hints.disable()
flow=new FlowComponent()
flow.x=0
flow.y=0

	
isLogin=false
isCloseAnnounce=false
sideMenu=new Layer
	width: 310
	height: Screen.height
	backgroundColor: "Transparent"
	visible: true
	x:-310
	
BlackMask=new Layer
	size: Screen.size
	backgroundColor: "Black"
	opacity: 0.6
	visible: false

BuildControl_SideMenu=()->
#組裝SideMenu兩種狀態元件，要在Login flow開始前執行

	SideMenu_VIP.x=0
	SideMenu_VIP.y=0
	SideMenu_NotLogin.x=0
	SideMenu_NotLogin.y=0
	SideMenu_NotLogin.parent=sideMenu
	SideMenu_VIP.parent=sideMenu
	SideMenu_VIP.width=310
	SideMenu_NotLogin.width=310

		
	sideMenu.states.VIP=
		opacity: 1
	sideMenu.states.NOLOGIN=
		opacity: 1
	sideMenu.on Events.StateWillSwitch,(from, to, states)->
		if to=="VIP"
			this.subLayersByName("SideMenu_VIP")[0].visible=true
			this.subLayersByName("SideMenu_NotLogin")[0].visible=false
		else
			this.subLayersByName("SideMenu_VIP")[0].visible=false
			this.subLayersByName("SideMenu_NotLogin")[0].visible=true


Compose_FloatingDot=()->
#組裝成會隨著page移動的指標點元件邏輯 Compose_FloatingDot()
	for layer in DotBG.children
		layer.animate 
			properties: {opacity: 0.3}
			time: 0.2
	DotBG.children[0].animate 
		properties: 
			opacity:1
			time: 0.2
	page=MainContentHome.subLayersByName("ADComponent_Home")[0]
# 	page.on Events.ScrollStart,->
# 		scrollHomeContent.scro
# 	page.on Events.ScrollEnd,->	
# 		
	page.on "change:currentPage",->
		for layer in DotBG.children
			layer.animate 
				properties: {opacity: 0.3}
				time: 0.2
		current = page.currentPage
		i = page.horizontalPageIndex(current)
		DotBG.children[i].animate 
			properties: 
				opacity:1
				time: 0.2

BuildContent_HeadTitle=()->
	NaviTitleContent.states.LIVE=
		opacity: 1
	NaviTitleContent.states.TVOD=
		opacity: 1
	NaviTitleContent.states.VOD=
		opacity: 1
	NaviTitleContent.states.HamiVideo=
		opacity: 1
	for sub in NaviTitleContent.children
		sub.opacity=0
	NaviTitleContent.on Events.StateWillSwitch,(from, to, states)->

		if from == to
			return
		
		for sub in this.children
			sub.opacity=0
		this.subLayersByName("State_"+to)[0].animate
			opacity:1
			options:
				time:0.2
				curve:"easy-in"


	NaviTitleContent.stateSwitch("HamiVideo")
	
BuildContent_BannerBar=(contents,parent)->
#組裝Banner內容
	for adbanner in contents.children		
		layer=new Layer
			width: 345
			height: 220
			backgroundColor: "Transparent"
		adbanner.x=0
		adbanner.y=0
		adbanner.parent=layer
		adbanner.centerX()
		parent.addPage(layer,"right")
	BannerBarHome.destroy()
Compose_PaddingBannerBar=()->
#建構一個置中廣告海報不填滿的Banner區 Compose_PaddingBannerBar()
	padding=15
	pager = new PageComponent
		name:"ADComponent_Home"
		width: Screen.width - padding*2
		height: 220
		x: padding
		scrollVertical: false
		clip: false
		parent:MainContentHome
		y:10
	BuildContent_BannerBar(BannerBarHome,pager)
	Compose_FloatingDot()
Compose_AnnounceEvent=()->
	Announce_Close.on Events.Click,->
		ImportantAnnounce.animate
			y:0
			options:
				time:0.2
		scrollHomeContent.animate
			y:74
			options:
				time:0.2
		scrollHomeContent.height=scrollHomeContent.height+84
		isCloseAnnounce=true
scrollHomeContent=new ScrollComponent
		width: Screen.width
		height: Screen.height-MainContentHome.y
		y:MainContentHome.y
		parent: R_02_01_home_subs_vod
		backgroundColor: "transparent"
		scrollVertical: true
		scrollHorizontal: false

BuildControl_FloatSelectVODBar=(isSnap)->
	if isSnap		
		MainContentSelection.y=MainContentDescription.y+MainContentDescription.height
		MainContentSelection.parent=MainContentSelBar
	else
		MainContentSelection.parent=null
		MainContentSelection.y=ImportantAnnounce.y+ImportantAnnounce.height	
scrollHomeContent.on "scroll",->
	
	if (!isCloseAnnounce)
		if this.y<= -(320)
			NaviTitleContent.stateSwitch("VOD")
			BuildControl_FloatSelectVODBar(false)
		else
			NaviTitleContent.stateSwitch("HamiVideo")
			BuildControl_FloatSelectVODBar(true)
	else
		
		if this.y< -(276)
			NaviTitleContent.stateSwitch("VOD")
			BuildControl_FloatSelectVODBar(false)
		else
			NaviTitleContent.stateSwitch("HamiVideo")
			BuildControl_FloatSelectVODBar(true)			

	
scrollHomeContent.content.draggable.directionLock = true
scrollHomeContent.content.draggable.directionLockThreshold = {x:15, y:15}

Compose_VODFeature=()->
	Content_VOD_Feature.visible=true
Compose_HomePage=()->
	Compose_VODFeature()
	Compose_PaddingBannerBar()
	Compose_AnnounceEvent()
	
	MainContentHome.parent=	scrollHomeContent.content
	MainContentHome.y=0
	
Compose_LoginFlow=()->
#組裝登入流程Compose_LoginFlow()
	otherLogin.on Events.Click,->
		flow.showNext(R_01_02_login_phone_others,false)
	Back_BTN_CellPhone.on Events.Click,->
		flow.showOverlayLeft(R_02_01_home_subs_vod,false)
		sideMenu.stateSwitch("NOLOGIN")
		BlackMask.visible=true
		sideMenu.bringToFront()
		animationSideMenu.start()	
	Back_BTN_OtherLogin.on Events.Click,->
		flow.showPrevious()

	Login.on Events.Click,->
		flow.showOverlayCenter(R_02_01_home_subs_vod,false)
		sideMenu.stateSwitch("VIP")
	animationSideMenu = new Animation sideMenu,
		x: 0
		options:
			curve:"ease-in"
			time:0.15
	animationSideMenuR = animationSideMenu.reverse()
# Nothing will move until we start 
	
	BlackMask.on Events.Click,->
		animationSideMenuR.start()
		BlackMask.visible=false
	NavSideMenuBtn.on Events.Click,->
		BlackMask.visible=true
		sideMenu.bringToFront()
		animationSideMenu.start()
	LoginBIgBTN_SideMenu.on Events.Click,->	
		animationSideMenuR.start()
		BlackMask.visible=false
		flow.showNext(R_01_01_login_phone)
	BTN_LoginBYHN.on Events.Click,->
		flow.showOverlayCenter(R_02_01_home_subs_vod,false)
		sideMenu.stateSwitch("NOLOGIN")
		
	if isLogin
		sideMenu.stateSwitch("VIP")

	else
		sideMenu.stateSwitch("NOLOGIN")
Home=()->
	flow.showNext(R_01_01_login_phone)
	BuildControl_SideMenu()
	BuildContent_HeadTitle()
	Compose_LoginFlow()

	Compose_HomePage()
	

Home()