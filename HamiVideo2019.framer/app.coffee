# Import file "HamiVideo2019"
sketch = Framer.Importer.load("imported/HamiVideo2019@2x", scale: 1)
Utils.globalLayers sketch
Framer.Extras.Preloader.enable()
Framer.Extras.Hints.disable()
flow=new FlowComponent()
flow.x=0
flow.y=0

	
isLogin=false

sideMenu=new Layer
	width: 310
	height: Screen.height
	backgroundColor: "transparent"
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
isCloseAnnounce=false
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
			if sub.opacity==1
				sub.animate
					opacity:0
					scale:0
					options:
						time:0.1
						curve:"easy-out"
		this.subLayersByName("State_"+to)[0].animate
			opacity:1
			scale:1
			options:
				time:0.2
				curve:"easy-in"


	NaviTitleContent.stateSwitch("HamiVideo")
ComposeHorscrollContent=(parentObject,layerContainsContent)->
	contentScroll=new ScrollComponent
		parent:parentObject
		x:0
		y:layerContainsContent.y
		width: Screen.width
		height: layerContainsContent.height
		scrollVertical: false
		scrollHorizontal: true
	contentScroll.contentInset=
		right: 15	
	contentScroll.content.draggable.directionLock = true
	contentScroll.content.draggable.directionLockThreshold = {x:5, y:5}		
	for sub in layerContainsContent.children
		sub.parent=contentScroll.content
BuildHomeContentVODInfo=()->
	ComposeHorscrollContent(ContinueWatch,ContinueWatchContents)
	ComposeHorscrollContent(Favorite_VOD_Feature,Favorite_VOD_FeatureContents)
	ComposeHorscrollContent(MostWatch_Drama,MostWatch_DramaContents)
	ComposeHorscrollContent(MostWatch_Movie,MostWatch_MovieContents)
	ComposeHorscrollContent(MostWatch_Comic,MostWatch_ComicContents)
	ComposeHorscrollContent(MostWatch_Child,MostWatch_ChildContents)	
	ComposeHorscrollContent(TVODFeature,TVODFeatureContents)
	#電影
	ComposeHorscrollContent(Content_VOD_Other,Content_VOD_OtherContents)
	ComposeHorscrollContent(Content_VOD_Movie_Curration1,Content_VOD_Movie_Curration1Content)
	ComposeHorscrollContent(Content_VOD_Movie_Curration2,Content_VOD_Movie_Curration2Contents)
	ComposeHorscrollContent(Content_VOD_Movie_Hot,Content_VOD_Movie_HotContents)
	ComposeHorscrollContent(Content_VOD_Movie_Newest,Content_VOD_Movie_NewestContents)
	ComposeHorscrollContent(Content_VOD_Movie_Promote,Content_VOD_Movie_PromoteContents)
#戲劇
	ComposeHorscrollContent(VOD_Drama_OtherPromote,VOD_Drama_OtherPromoteContents)
	ComposeHorscrollContent(VOD_Drama_Curration1,VOD_Drama_Curration1Contents)
	ComposeHorscrollContent(VOD_Drama_Curration2,VOD_Drama_Curration2Contents)
	ComposeHorscrollContent(VOD_Drama_Curration3,VOD_Drama_Curration3Contents)
	ComposeHorscrollContent(VOD_Drama_Curration4,VOD_Drama_Curration4Contents)
	ComposeHorscrollContent(VOD_Drama_Hot,VOD_Drama_HotContent)
	ComposeHorscrollContent(VOD_Drama_Newest,VOD_Drama_NewestContent)
	ComposeHorscrollContent(VOD_DramaPromote,VOD_DramaPromoteContents)
	ComposeHorscrollContent(VOD_Drama_Filter,VOD_Drama_FilterContents)	
																
			
BuildContent_BannerBar=(contents,parent)->
#組裝Banner內容
	for adbanner in contents.children		
		layer=new Layer
			width: 345
			height: 220
			backgroundColor: "transparent"
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
		y:ImportantAnnounce.y+ImportantAnnounce.height+10
	BuildContent_BannerBar(BannerBarHome,pager)
	Compose_FloatingDot()

scrollHomeContent=new ScrollComponent
		width: Screen.width
		height: Screen.height-MainContentHome.y
		y:MainContentHome.y
		parent: R_02_01_home_subs_vod
		backgroundColor: "transparent"
		scrollVertical: true
		scrollHorizontal: false
scrollHomeContent.content.draggable.directionLock = true
scrollHomeContent.content.draggable.directionLockThreshold = {x:10, y:10}
scrollHomeContent.mouseWheelEnabled = false
scrollHomeContent.content.draggable.momentumOptions = {friction: 10}
BuildControl_FloatSelectVODBar=(isSnap)->
	if isSnap		
		
		MainContentSelection.y=MainContentDescription.y+MainContentDescription.height
		MainContentSelection.parent=MainContentSelBar
		 
	else
		MainContentSelection.y=NaviBTN.y+NaviBTN.height
		MainContentSelection.parent=null
		
			
scrollHomeContent.on "scroll",->
	gap=0
	if isCloseAnnounce
		gap=ImportantAnnounce.height
		#65
	hiddenPoint=MainContentHomeVODInfo.y+MainContentDescription.height
	if (!isCloseAnnounce)
		if this.y<= -(hiddenPoint)
			NaviTitleContent.stateSwitch("VOD")
			BuildControl_FloatSelectVODBar(false)
		else
			NaviTitleContent.stateSwitch("HamiVideo")
			BuildControl_FloatSelectVODBar(true)
	else
		
		if this.y<= -(hiddenPoint-gap)
			NaviTitleContent.stateSwitch("VOD")
			BuildControl_FloatSelectVODBar(false)
		else
			NaviTitleContent.stateSwitch("HamiVideo")
			BuildControl_FloatSelectVODBar(true)			

	
BuildControl_VODSelectionBar=()->
	
	
	
	MainContentSelBar.backgroundColor="#282828"
	ComposeHorscrollContent(MainContentSelectionContents,MainContentSelectionContentsInner)
	MainContentSelection_VOD_FocusBar.bringToFront()

BuildControl_VODPage=()->
	oriY=ContentVODs.y
	oriX=ContentVODs.x
	VODPage=new PageComponent
		width: Screen.width
		height: ContentVODs.height
		x:oriX
		y:oriY
		scrollVertical: false
		scrollHorizontal: false
		clip: false
		name:"VODPage"
	VODPage.parent=MainContentHomeVODInfo
	index=0
	layerHome=null
	arrayVOD=[3]
	
	for sub in ContentVODs.children
		sub.parent=null
		sub.x=0
		sub.y=0
		
		layerParent=new Layer
			width: Screen.width
			height: sub.height
			name:"page"+index
		
		sub.parent=	layerParent
		arrayVOD[index]=layerParent
		VODPage.addPage(layerParent,"right")
		if index==0
			layerHome=layerParent
		index=index+1
	VODPage.snapToPage(arrayVOD[0])

	MainContentSelection_VOD_Feature.on Events.Click,->
		MainContentHomeVODInfo.subLayersByName("VODPage")[0].snapToPage(arrayVOD[0])
		MainContentSelection_VOD_FocusBar.animate
			x:28
			options:
				time:0.2
	MainContentSelection_VOD_Drama.on Events.Click,->
		MainContentHomeVODInfo.subLayersByName("VODPage")[0].snapToPage(arrayVOD[1])			
		MainContentSelection_VOD_FocusBar.animate
			x:97
			options:
				time:0.2
	MainContentSelection_VOD_Movie.on Events.Click,->
		MainContentHomeVODInfo.subLayersByName("VODPage")[0].snapToPage(arrayVOD[2])
		MainContentSelection_VOD_FocusBar.animate
			x:166
			options:
				time:0.2	
	
Compose_VODFeature=()->
	Content_VOD_Feature.visible=true
Compose_HomePage=()->
	Compose_VODFeature()
	Compose_PaddingBannerBar()
	#Compose_AnnounceEvent()
	ComposeAnnounceMessagePopup()
	MainContentHome.parent=	scrollHomeContent.content
	MainContentHome.y=0
	BuildHomeContentVODInfo()
	BuildControl_VODSelectionBar()
	BuildControl_VODPage()
	scrollHomeContent.sendToBack()
ComposeAnnounceMessagePopup=()->
	AnnouncePopWindow=new Layer
		size: Screen.size
		visible: false
		backgroundColor: "transparent"
	AnnounceMessagePopup.visible=true
	layerBlackMask=new Layer
		size: Screen.size
		backgroundColor: "Black"
		
		opacity: 0.6
		parent: AnnouncePopWindow	
	AnnounceMessagePopup.parent=AnnouncePopWindow
	AnnouncePopWindow.bringToFront()
	AnnounceContent.on Events.Click,->
		AnnouncePopWindow.visible=true

		AnnouncePopWindow.bringToFront()
	AnnounceMessagePopupOK.on Events.Click,->
		AnnouncePopWindow.visible=false
		BlackMask.visible=false
	Announce_Close.on Events.Click,->
		#print ImportantAnnounce.height,ImportantAnnounce.y
		
		ImportantAnnounce.animate
			y:-ImportantAnnounce.height
			options:
				time:0.2
		scrollHomeContent.animate
			y:10
			options:
				time:0.2

		scrollHomeContent.height=scrollHomeContent.height+84
		isCloseAnnounce=true
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
	ComposeAnnounceMessagePopup()

Home()