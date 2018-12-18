Utils.insertCSS """
	@font-face {
		font-family: "material";
		src: url("fonts/material.ttf");
	}
"""
sketch = Framer.Importer.load("imported/HamiVideo2019@2x", scale: 1)
Utils.globalLayers sketch
Framer.Extras.Preloader.enable()
Framer.Extras.Hints.disable()
flow=new FlowComponent()
flow.x=0
flow.y=0
defaltPackageStates="VOD"
currentPackage="VOD"	
isLogin=false
##
VODBig_Buy_State=["VOD_ContinuePlay","VODBuy_FirstPlay"]
TVODBig_Buy_State=["TVOD_ContinuePlay","TVODBuy"]
##
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
animationSideMenu = new Animation sideMenu,
	x: 0
	options:
		curve:"ease-in"
		time:0.15
animationSideMenuR = animationSideMenu.reverse()
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
flowMain=new FlowComponent
	size: Screen.size
	scrollHorizontal:false
	visible: false
BuildContent_Description=()->
	
	MainContentDescription.states.LIVE=
		opacity: 1
	MainContentDescription.states.TVOD=
		opacity: 1
	MainContentDescription.states.VOD=
		opacity: 1
	MainContentDescription.states.SPORT=
		opacity: 1
	for sub in MainContentDescription.children
		sub.opacity=0
	MainContentDescription.on Events.StateWillSwitch,(from, to, states)->
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
		#print "State_"+to
		this.subLayersByName("DState_"+to)[0].animate
			opacity:1
			scale:1
			options:
				time:0.2
				curve:"easy-in"


	MainContentDescription.stateSwitch(defaltPackageStates)
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
	NaviTitleContent.states.SPORT=
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
	
	for sub in Content_VOD_OtherContents.children
		sub.on Events.Click,->
			ComposeMovieInfoPage(Utils.randomChoice(VODBig_Buy_State))
			
	for sub in Content_VOD_Movie_Curration1Content.children
		sub.on Events.Click,->
			ComposeMovieInfoPage(Utils.randomChoice(VODBig_Buy_State))
	for sub in Content_VOD_Movie_Curration2Contents.children
		sub.on Events.Click,->
			ComposeMovieInfoPage(Utils.randomChoice(VODBig_Buy_State))
	for sub in Content_VOD_Movie_HotContents.children
		sub.on Events.Click,->
			ComposeMovieInfoPage(Utils.randomChoice(VODBig_Buy_State))
	for sub in Content_VOD_Movie_NewestContents.children
		sub.on Events.Click,->
			ComposeMovieInfoPage(Utils.randomChoice(VODBig_Buy_State))
	for sub in Content_VOD_Movie_PromoteContents.children
		sub.on Events.Click,->
			ComposeMovieInfoPage(Utils.randomChoice(VODBig_Buy_State))
											
	ComposeHorscrollContent(Content_VOD_Other,Content_VOD_OtherContents)
	ComposeHorscrollContent(Content_VOD_Movie_Curration1,Content_VOD_Movie_Curration1Content)
	ComposeHorscrollContent(Content_VOD_Movie_Curration2,Content_VOD_Movie_Curration2Contents)
	ComposeHorscrollContent(Content_VOD_Movie_Hot,Content_VOD_Movie_HotContents)
	ComposeHorscrollContent(Content_VOD_Movie_Newest,Content_VOD_Movie_NewestContents)
	ComposeHorscrollContent(Content_VOD_Movie_Promote,Content_VOD_Movie_PromoteContents)
#TVOD
	for sub in ContentTVODs_Rent_NewestContents.children
		sub.on Events.Click,->
			ComposeMovieInfoPage(Utils.randomChoice(TVODBig_Buy_State))
			
	for sub in ContentTVODs_Rent_FavoriteContents.children
		sub.on Events.Click,->
			ComposeMovieInfoPage(Utils.randomChoice(TVODBig_Buy_State))
	for sub in ContentTVODs_RentContents.children
		sub.on Events.Click,->
			ComposeMovieInfoPage(Utils.randomChoice(TVODBig_Buy_State))
	for sub in ContentTVODs_HotContents.children
		sub.on Events.Click,->
			ComposeMovieInfoPage(Utils.randomChoice(TVODBig_Buy_State))
	ComposeHorscrollContent(ContentTVODs_Rent_Newest,ContentTVODs_Rent_NewestContents)
	ComposeHorscrollContent(ContentTVODs_Rent_Favorite,ContentTVODs_Rent_FavoriteContents)
	ComposeHorscrollContent(ContentTVODs_Rent,ContentTVODs_RentContents)
	ComposeHorscrollContent(ContentTVODs_Hot,ContentTVODs_HotContents)
	ComposeHorscrollContent(ContentTVODs_Curration1,ContentTVODs_Curration1Contents)
	ComposeHorscrollContent(ContentTVODs_Curration2,ContentTVODs_Curration2Contents)
	ComposeHorscrollContent(ContentTVODs_Other,ContentTVODs_OtherContents)
	

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
#LIVE
	ComposeHorscrollContent(ContentLIVEs_Favorites,ContentLIVEs_Favorites_Contents)
	ComposeHorscrollContent(ContentLIVEs_Free,ContentLIVEs_FreeContents)
	ComposeHorscrollContent(ContentSPORT_Euro_RealTime,ContentSPORT_Euro_RealTimeContents)
	ComposeHorscrollContent(SportEuro_Fentasic,SportEuro_FentasicContents)
	ComposeHorscrollContent(ContentSPORT_RealTime,ContentSPORT_RealTimeContents)
	ComposeHorscrollContent(ContentSPORT_Feature_Fantasic,ContentSPORT_Feature_FantasicContents)
	ComposeHorscrollContent(ContentSPORT_Other,ContentSPORT_OtherContents)
Compose_HeaderFunction=()->
	
	FunctionInBar.states.Curration=
		opacity: 1
	FunctionInBar.states.Main=
		opacity: 1
	for sub in FunctionInBar.children
		sub.opacity=0
	FunctionInBar.on Events.StateWillSwitch,(from, to, states)->
		for sub in this.children
			if sub.opacity==1
				sub.animate
					opacity:0
					scale:0
					options:
						time:0.1
						curve:"easy-out"
		this.subLayersByName("FunctionInBar_State_"+to)[0].animate
			opacity:1
			scale:1
			options:
				time:0.2
				curve:"easy-in"
	FunctionInBar.stateSwitch("Main")
Compose_LIVEClipContent=()->
	ContentLIVEs_Catogory_News.clip=true
	ContentLIVEs_Catogory_News.height=55
	ContentLIVEs_Catogory_Summary.clip=true
	ContentLIVEs_Catogory_Summary.height=55
	ContentLIVEs_Catogory_Summary.y=ContentLIVEs_Catogory_News.y+10
	index=0
	ContentLIVEs_Catogory_NewsTitleArrow.expanded=false

	for sib in ContentLIVEs_Catogory_News.siblings
		index=index+1
		sib.y=ContentLIVEs_Catogory_News.y*index+10*index+ContentLIVEs_Catogory_News.height*index
	ContentLIVEs_Catogory_SummaryTitleArrow.on Events.Click,->
		this.expanded=!this.expanded
		if this.expanded==false
			ContentLIVEs_Catogory_Summary.height=ContentLIVEs_Catogory_SummaryTitle.height+ContentLIVEs_Catogory_SummaryContent.height
			ContentLIVEs_Catogory_SummaryTitleArrow.animate
				rotation: -180
		else
			ContentLIVEs_Catogory_Summary.height=ContentLIVEs_Catogory_SummaryTitle.height
			ContentLIVEs_Catogory_SummaryTitleArrow.animate
				rotation: 0					
		index=0
		previousLayer=ContentLIVEs_Catogory_News
		for sib in ContentLIVEs_Catogory_News.siblings
			index=index+1
			sib.y=previousLayer.y+10+previousLayer.height
			previousLayer=sib
					
		scrollHomeContent.updateContent()
	ContentLIVEs_Catogory_NewsTitleArrow.on Events.Click,->
		this.expanded=!this.expanded
		if this.expanded==false
			ContentLIVEs_Catogory_News.height=ContentLIVEs_Catogory_NewsTitle.height+ContentLIVEs_Catogory_NewsContent.height
			ContentLIVEs_Catogory_NewsTitleArrow.animate
				rotation: -180
				options:
					time:0.2	
		else
			ContentLIVEs_Catogory_News.height=ContentLIVEs_Catogory_NewsTitle.height
			ContentLIVEs_Catogory_NewsTitleArrow.animate
				rotation: 0
				options:
					time:0.2						
		index=0
		previousLayer=ContentLIVEs_Catogory_News
		for sib in ContentLIVEs_Catogory_News.siblings
			index=index+1
			sib.y=previousLayer.y+10+previousLayer.height
			previousLayer=sib
					
		scrollHomeContent.updateContent()
	
Compose_MainSelectionFocusBarEvent=()->
	MainContentSelection_VOD_FocusBar.states.TVOD=
		opacity: 1
	MainContentSelection_VOD_FocusBar.states.VOD=
		opacity: 1

	for sub in MainContentSelection_VOD_FocusBar.children
		sub.opacity=0
	MainContentSelection_VOD_FocusBar.on Events.StateWillSwitch,(from, to, states)->

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
		this.subLayersByName("FocusBarState_"+to)[0].animate
			opacity:1
			scale:1
			options:
				time:0.2
				curve:"easy-in"


	MainContentSelection_VOD_FocusBar.stateSwitch("VOD")

SettingCurrationPage=(contentPage,addFloat)->
	jump=FixTitle.height
	scroll=new ScrollComponent
		width: Screen.width
		height: Screen.height-jump
		scrollHorizontal: false
		name:"scrollContent"
	contentPage.parent=scroll.content
	scroll.content.draggable.directionLock = true
	scroll.content.draggable.directionLockThreshold = {x:10, y:10}
	scroll.mouseWheelEnabled = false
	scroll.content.draggable.momentumOptions = {friction: 10}
	if addFloat
		layerMain=new Layer
			width: Screen.width
			height: (Screen.height-jump)
		scroll.parent=layerMain
		layerMore=MoreCurration.copy()
		layerMore.name="LayerMore"
		MoreCurration.destroy()
		layerMore.visible=true
		layerMore.y=607-jump
		layerMore.parent=layerMain
		return layerMain
	else		
		return scroll
ComposeCurrationPage=()->
	jump=FixTitle.height
	#設定pagecomponent的scrollHorizontal/scrollVertical 避免移動的時候晃來晃去
	pageCurration=new PageComponent
		width: Screen.width
		height: Screen.height-jump
		parent:MainContent_Curration
		scrollHorizontal: false
		scrollVertical: false
		name:"pageCurration"
	pageCurration.content.draggable.directionLock = true
	pageCurration.content.draggable.directionLockThreshold = {x:10, y:10}
	pageCurration.mouseWheelEnabled = false
	pageCurration.content.draggable.momentumOptions = {friction: 10}
	pageERA=SettingCurrationPage(ERAContent,true)
	berlin=SettingCurrationPage(BerlinContent,true)
	gma=SettingCurrationPage(GMACurrationContent,true)
	original=SettingCurrationPage(MainContent_CurrationList,false)
	pageERA.subLayersByName("LayerMore")[0].on Events.Click,->
		pageCurration.snapToPage(original)
	berlin.subLayersByName("LayerMore")[0].on Events.Click,->
		pageCurration.snapToPage(original)
	gma.subLayersByName("LayerMore")[0].on Events.Click,->
		pageCurration.snapToPage(original)			
	ERAEVENTBTN.on Events.Click,->
		pageCurration.snapToPage(pageERA)

	BERLINEVENTBTN.on Events.Click,->
		pageCurration.snapToPage(berlin)
	GMABTN.on Events.Click,->
		pageCurration.snapToPage(gma)			
	pageCurration.addPage(original)	
	pageCurration.addPage(gma)	
	pageCurration.addPage(berlin)	
	pageCurration.addPage(pageERA)				
		
	ImportantAnnounceCurration.bringToFront()
	
	ComposeHorscrollContent(GMACurrationContentRelated,GMACurrationContentRelatedContents)
	ComposeHorscrollContent(ERAContent_Vote,ERAContent_VoteContents)
	ComposeHorscrollContent(ERAContentRelated,ERAContentRelatedContents)
	ERAVoteEntry.on Events.Click,->
		flowMain.visible=true
		flowMain.showNext(ERAVotePage)
	VOTETITLE.on Events.Click,->
		flowMain.showPrevious()
		flowMain.visible=false
		


			
ComposeSideMenuEvent=()->

	
	SideMenu_TV.on Events.Click,->
		MainContentHome.visible=true
		MainContentHome.bringToFront()
		MainContent_Curration.visible=false
		#ShareEvent是策展在用
		FunctionInBar.stateSwitch("Main")
		currentPackage="LIVE"
		oldPage=MainContentHomeVODInfo.subLayersByName("LIVEPage")[0]
		oldPage.visible=true
		oldPage.bringToFront()
		NaviTitleContent.stateSwitch("HamiVideo")
		MainContentSelectionStates.stateSwitch("LIVE")
		MainContentDescription.stateSwitch("LIVE")
		MainContentSelection_VOD_FocusBar.stateSwitch("VOD")
		Utils.delay 0.2,->
			animationSideMenuR.start()
			BlackMask.visible=false
	SideMenu_Sport.on Events.Click,->
		MainContentHome.visible=true
		MainContentHome.bringToFront()
		MainContent_Curration.visible=false
		#ShareEvent是策展在用
		FunctionInBar.stateSwitch("Main")		
		currentPackage="SPORT"
		oldPage=MainContentHomeVODInfo.subLayersByName("SPORTPage")[0]
		oldPage.visible=true
		oldPage.bringToFront()
		NaviTitleContent.stateSwitch("HamiVideo")
		MainContentSelectionStates.stateSwitch("SPORT")
		MainContentDescription.stateSwitch("SPORT")
		MainContentSelection_VOD_FocusBar.stateSwitch("VOD")
		Utils.delay 0.2,->
			animationSideMenuR.start()
			BlackMask.visible=false
	SideMenu_VOD.on Events.Click,->
		MainContentHome.visible=true
		MainContentHome.bringToFront()
		MainContent_Curration.visible=false
		#ShareEvent是策展在用
		FunctionInBar.stateSwitch("Main")			
		#這裡可以用regular finder 去調整
		currentPackage="VOD"
		oldPage=MainContentHomeVODInfo.subLayersByName("VODPage")[0]
		oldPage.visible=true
		oldPage.bringToFront()
		NaviTitleContent.stateSwitch("HamiVideo")
		MainContentSelectionStates.stateSwitch("VOD")
		MainContentSelection_VOD_FocusBar.stateSwitch("VOD")
		MainContentDescription.stateSwitch("VOD")
		Utils.delay 0.2,->
			animationSideMenuR.start()
			BlackMask.visible=false
		#scrollHomeContent.sendToBack()
	SideMenu_TVOD.on Events.Click,->
		MainContentHome.visible=true
		MainContentHome.bringToFront()
		MainContent_Curration.visible=false
		#ShareEvent是策展在用
		FunctionInBar.stateSwitch("Main")			
		currentPackage="TVOD"
		oldPage=MainContentHomeVODInfo.subLayersByName("TVODPage")[0]
		oldPage.visible=true
		oldPage.bringToFront()
		NaviTitleContent.stateSwitch("HamiVideo")
		MainContentSelectionStates.stateSwitch("TVOD")
		MainContentDescription.stateSwitch("TVOD")
		MainContentSelection_VOD_FocusBar.stateSwitch("TVOD")
		Utils.delay 0.2,->
			animationSideMenuR.start()
			BlackMask.visible=false
	SideMenu_Curration.on Events.Click,->
		if isCloseAnnounce
			jump=FixTitle.height
			MainContent_CurrationItems.y=10
			ImportantAnnounceCurration.visible=false
		MainContent_Curration.visible=true
		MainContentHome.visible=false
		FunctionInBar.stateSwitch("Curration")
		MainContent_Curration.bringToFront()
		FixTitle.bringToFront()
		page=MainContent_Curration.subLayersByName("pageCurration")[0]
		page.snapToPage()		
		Utils.delay 0.2,->
			animationSideMenuR.start()
			BlackMask.visible=false
		

			
BuildContent_MainSelection=()->
	
	MainContentSelectionStates.states.LIVE=
		opacity: 1
	MainContentSelectionStates.states.TVOD=
		opacity: 1
	MainContentSelectionStates.states.VOD=
		opacity: 1
	MainContentSelectionStates.states.SPORT=
		opacity: 1
	for sub in MainContentSelectionStates.children
		sub.opacity=0
	MainContentSelectionStates.on Events.StateWillSwitch,(from, to, states)->

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
		this.subLayersByName("MainContentSelection_State_"+to)[0].animate
			opacity:1
			scale:1
			options:
				time:0.2
				curve:"easy-in"
		this.subLayersByName("MainContentSelection_State_"+to)[0].bringToFront()


	MainContentSelectionStates.stateSwitch(defaltPackageStates)			
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
		MainContentSelection.parent=R_02_01_home_subs_vod#null
		
			
scrollHomeContent.on "scroll",->
	gap=0
	if isCloseAnnounce
		gap=ImportantAnnounce.height
		#65
	hiddenPoint=MainContentHomeVODInfo.y+MainContentDescription.height
	if (!isCloseAnnounce)
		if this.y<= -(hiddenPoint)
			NaviTitleContent.stateSwitch(currentPackage)
			BuildControl_FloatSelectVODBar(false)
		else
			NaviTitleContent.stateSwitch("HamiVideo")
			BuildControl_FloatSelectVODBar(true)
	else
		
		if this.y<= -(hiddenPoint-gap)
			print NaviTitleContent.states.current
			NaviTitleContent.stateSwitch(currentPackage)
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


BuildControl_TVODPage=()->
	oriY=ContentVODs.y
	oriX=ContentVODs.x
	TVODPage=new PageComponent
		width: Screen.width
		height: ContentVODs.height
		x:oriX
		y:oriY
		scrollVertical: false
		scrollHorizontal: false
		clip: false
		name:"TVODPage"
		visible: false
	TVODPage.parent=MainContentHomeVODInfo
	index=0
	layerHome=null
	arrayVOD=[3]
	
	for sub in ContentTVODsContents.children
		sub.parent=null
		sub.x=0
		sub.y=0
		
		layerParent=new Layer
			width: Screen.width
			height: sub.height
			name:"page"+index
		
		sub.parent=	layerParent
		arrayVOD[index]=layerParent
		TVODPage.addPage(layerParent,"right")
		if index==0
			layerHome=layerParent
		index=index+1
	TVODPage.snapToPage(arrayVOD[0])

	MainContentSelection_State_TVOD_FeatureBTN.on Events.Click,->
		MainContentHomeVODInfo.subLayersByName("TVODPage")[0].snapToPage(arrayVOD[0])
		MainContentSelection_VOD_FocusBar.animate
			x:28
			options:
				time:0.2
	MainContentSelection_State_TVOD_StoryBTN.on Events.Click,->
		MainContentHomeVODInfo.subLayersByName("TVODPage")[0].snapToPage(arrayVOD[1])			
		MainContentSelection_VOD_FocusBar.animate
			x:97
			options:
				time:0.2

BuildControl_LIVEPage=()->
	oriY=ContentVODs.y
	oriX=ContentVODs.x
	LIVEPage=new PageComponent
		width: Screen.width
		height: ContentVODs.height
		x:oriX
		y:oriY
		scrollVertical: false
		scrollHorizontal: false
		clip: false
		name:"LIVEPage"
		visible: false
	LIVEPage.parent=MainContentHomeVODInfo
	index=0
	layerHome=null
	arrayVOD=[2]
	
	for sub in ContentLIVE.children
		sub.parent=null
		sub.x=0
		sub.y=0
		
		layerParent=new Layer
			width: Screen.width
			height: sub.height
			name:"page"+index
		
		sub.parent=	layerParent
		arrayVOD[index]=layerParent
		LIVEPage.addPage(layerParent,"right")
		if index==0
			layerHome=layerParent
		index=index+1
	LIVEPage.snapToPage(arrayVOD[0])
	MainContentSelection_State_LIVE_Feature.on Events.Click,->
		MainContentHomeVODInfo.subLayersByName("LIVEPage")[0].snapToPage(arrayVOD[0])
		MainContentSelection_VOD_FocusBar.animate
			x:28
			options:
				time:0.2
	MainContentSelection_State_LIVE_News.on Events.Click,->
		MainContentHomeVODInfo.subLayersByName("LIVEPage")[0].snapToPage(arrayVOD[1])			
		MainContentSelection_VOD_FocusBar.animate
			x:97
			options:
				time:0.2
BuildControl_SportPage=()->
	oriY=ContentVODs.y
	oriX=ContentVODs.x
	SPORTPage=new PageComponent
		width: Screen.width
		height: ContentVODs.height
		x:oriX
		y:oriY
		scrollVertical: false
		scrollHorizontal: false
		clip: false
		name:"SPORTPage"
		visible: false
	SPORTPage.parent=MainContentHomeVODInfo
	index=0
	layerHome=null
	arrayVOD=[2]
	
	for sub in ContentSPORT.children
		sub.parent=null
		sub.x=0
		sub.y=0
		
		layerParent=new Layer
			width: Screen.width
			height: sub.height
			name:"page"+index
		
		sub.parent=	layerParent
		arrayVOD[index]=layerParent
		SPORTPage.addPage(layerParent,"right")
		if index==0
			layerHome=layerParent
		index=index+1
	SPORTPage.snapToPage(arrayVOD[0])
	MainContentSelection_State_SPORT_FeatureBTN.on Events.Click,->
		MainContentHomeVODInfo.subLayersByName("SPORTPage")[0].snapToPage(arrayVOD[0])
		MainContentSelection_VOD_FocusBar.animate
			x:28
			options:
				time:0.2
	MainContentSelection_State_SPORT_EuroBTN.on Events.Click,->
		MainContentHomeVODInfo.subLayersByName("SPORTPage")[0].snapToPage(arrayVOD[1])			
		MainContentSelection_VOD_FocusBar.animate
			x:97
			options:
				time:0.2
				
Compose_VODFeature=()->
	Content_VOD_Feature.visible=true
Compose_HomePage=()->
	MainContent_Curration.visible=false
	Compose_VODFeature()
	ComposeCurrationPage()
	Compose_PaddingBannerBar()
	#Compose_AnnounceEvent()
	ComposeAnnounceMessagePopup()
	MainContentHome.parent=	scrollHomeContent.content
	MainContentHome.y=0
	BuildHomeContentVODInfo()
	BuildControl_VODSelectionBar()
	BuildControl_VODPage()
	BuildControl_TVODPage()
	BuildControl_LIVEPage()
	BuildControl_SportPage()
	scrollHomeContent.sendToBack()
	ComposeSideMenuEvent()
	Compose_HeaderFunction()
	Compose_MainSelectionFocusBarEvent()
	MoreCurration.visible=false
	Compose_LIVEClipContent()
BuildControl_RatingControl=(stars,gap)->

	IN=0
	RatingBar=new Layer
		width: stars*20+gap*(stars-1)
		height: 20
		backgroundColor: "transparent"
	indexT=stars
	for sub in [0...indexT]
		
		star=new TextLayer
			text:""
			fontFamily:"material"
			parent:RatingBar
			x:IN*(gap+20)
			y:0
			fontSize: 20
			color: '#50E3C2'
			name:"StarMe"+(IN+1)
		star.centerY()
		star.states.NULL=
			color:	'#888888'
		star.states.NOSELECT=
			color:	'#50E3C2'
			text:""
		star.states.SELECT=
			color:	'#50E3C2'
			text: ''
		star.stateSwitch("NULL")
		star.hintStar=IN
		IN=IN+1
				
	for star in RatingBar.children	
		star.on Events.Click,->
			for sib in RatingBar.children
				sib.stateSwitch("NOSELECT")
			toSrar=0
			for sib in RatingBar.children
				if toSrar==this.hintStar
					break
				sib.stateSwitch("SELECT")
				toSrar=toSrar+1
			this.stateSwitch("SELECT")
	return RatingBar
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
ComposeMovieInfoPage=(VODState)->
	VODInfoPageC=VODInfoPage.copy()
	layerMovieInfo=new Layer
		size: Screen.size
	scrollMovieInfo=new ScrollComponent
		size: Screen.size
		scrollHorizontal: false
		scrollVertical: true
		parent: layerMovieInfo
	BigPlayC=VODInfoPageC.subLayersByName("BigPlay")[0]# BigPlay.copy()
	BigPlayC.name="BigPlayC"
	BigPlayC.states.VOD_ContinuePlay=
		opacity:1
	BigPlayC.states.VODBuy_FirstPlay=
		opacity:1		
	BigPlayC.states.TVOD_ContinuePlay=
		opacity:1
	BigPlayC.states.TVODBuy=
		opacity:1
	for sub in BigPlayC.children
		sub.opacity=0	
	BigPlayC.on Events.StateWillSwitch,(from, to, states)->
		for sub in this.children
			if sub.opacity==1
				sub.animate
					opacity:0
					scale:0
					options:
						time:0.1
						curve:"easy-out"
		#print "State_"+to
		this.subLayersByName("BigPlayState_"+to)[0].animate
			opacity:1
			scale:1
			options:
				time:0.2
				curve:"easy-in"
	BigPlayC.stateSwitch(VODState)
									
	scrollMovieInfo.content.draggable.directionLock = true
	scrollMovieInfo.content.draggable.directionLockThreshold = {x:10, y:10}
	scrollMovieInfo.mouseWheelEnabled = false
	scrollMovieInfo.content.draggable.momentumOptions = {friction: 10}	
	SupportDeviceWindowC=VODInfoPageC.subLayersByName("SupportDeviceWindow")[0]
	SupportDeviceWindowC.parent=null
	SupportDeviceWindowC.visible=false
	StatusBarMovieInfoC=VODInfoPageC.subLayersByName("StatusBarMovieInfo")[0]
	StatusBarMovieInfoC.y=0
	MovieTopTitleInfoC=VODInfoPageC.subLayersByName("MovieTopTitleInfo")[0]
	
	StatusBarMovieTopTitleInfoC=MovieTopTitleInfoC.subLayersByName("StatusBarMovieTopTitleInfo")[0]
	StatusBarMovieTopTitleInfoC.y=0
	MovieTopTitleInfoC.parent=layerMovieInfo
	MovieTopTitleInfoC.opacity=0
	MovieTopTitleInfoC.y=0
	StatusBarMovieInfoC.parent=layerMovieInfo
	
	VODInfoPageC.parent=scrollMovieInfo.content
	VODInfoPageC.backgroundColor="#181818"
	DescriptionVBlockC=VODInfoPageC.subLayersByName("DescriptionVBlock")[0]
	DescriptionVBlockC.clip=true
	originalBlockH=DescriptionVBlockC.height
	originalBlockW=DescriptionVBlockC.width
	DescriptionVBlockC.height=50
	DescriptionVBlockC.width=ShortDescriptionShow.width
	LongDescriptionC=DescriptionVBlockC.subLayersByName("LongDescription")[0]
	LongDescriptionC.visible=false
	origialBigPlayY=BigPlay.y
	BigPlayC.parent=layerMovieInfo
	
	DescriptionCollapseC=DescriptionVBlockC.subLayersByName("ShortDescriptionShow")[0].subLayersByName("DescriptionCollapse")[0]
	RelatedMovieInMovieInfoC=VODInfoPageC.subLayersByName("RelatedMovieInMovieInfo")[0]
	MyRationC=VODInfoPageC.subLayersByName("MyRation")[0]	
	DescriptionCollapseC.on Events.Click,->
		DescriptionVBlockC.height=originalBlockH
		DescriptionVBlockC.width=originalBlockW
		ShortDescriptionC=DescriptionVBlockC.subLayersByName("ShortDescriptionShow")[0].subLayersByName("ShortDescription")[0]
		ShortDescriptionC.visible=false
		
		LongDescriptionC.visible=true
		this.visible=false
		
		MyRationC.y=(DescriptionVBlockC.maxY+40)
		RelatedMovieInMovieInfoC.y=(MyRationC.maxY+60)
	scrollMovieInfo.on "scroll",->
		if this.y<=-150
			MovieTopTitleInfoC.opacity=Utils.modulate(Math.abs(this.y), [150, 160], [0, 1],true)
			BigPlayC.parent=layerMovieInfo
			BigPlayC.placeBefore(MovieTopTitleInfoC)
			BigPlayC.y=Utils.modulate(Math.abs(this.y), [150, 160], [90, 70],true)
		else
			MovieTopTitleInfoC.opacity=0
			BigPlayC.parent=VODInfoPageC
			BigPlayC.y=origialBigPlayY			
	RelatedMovieInMovieInfoContentsC=RelatedMovieInMovieInfoC.subLayersByName("RelatedMovieInMovieInfoContents")[0]  
	#if RelatedMovieInMovieInfoContents.children.length==0
	#else
	ComposeHorscrollContent(RelatedMovieInMovieInfoC,RelatedMovieInMovieInfoContentsC)	
	BTNSupportDevicesC=VODInfoPageC.subLayersByName("BTNSupportDevices")[0]
	BTNSupportDevicesC.on Events.Click,->
		SupportDeviceWindowC.visible=true
	SupportDeviceWindowC.on Events.Click,->
		this.visible=false
	BackBTNMovieInfoC=VODInfoPageC.subLayersByName("BackBTNMovieInfo")[0]
	RatingStarsC=MyRationC.subLayersByName("RatingStars")[0]
	
	newStarBar=BuildControl_RatingControl(5,30)
	newStarBar.x=RatingStars.x
	newStarBar.y=RatingStars.y
	newStarBar.parent=RatingStarsC.parent
	RatingStarsC.destroy()
	BackBTNMovieInfoC.on Events.Click,->
		layerMovieInfo.destroy()
		scrollMovieInfo.destroy()
		BigPlayC.destroy()
		DescriptionCollapseC.destroy()
		BTNSupportDevicesC.destroy()
		SupportDeviceWindowC.destroy()
		VODInfoPageC.destroy()
		
Home=()->
	flow.showNext(R_01_01_login_phone)
	BuildControl_SideMenu()
	BuildContent_HeadTitle()
	BuildContent_Description()
	BuildContent_MainSelection()
	Compose_LoginFlow()
	

	Compose_HomePage()
	ComposeAnnounceMessagePopup()
	

	
Home()