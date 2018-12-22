
sketch = Framer.Importer.load("imported/HamiVideo2019@2x", scale: 1)
Utils.globalLayers sketch

ChannelPlayerControl = require 'ChannelPlayerControl'
VODPlayerControl=require 'VODPlayerControl'
Utils.insertCSS """
	@font-face {
		font-family: "material";
		src: url("fonts/material.ttf");
	}
"""
layerLoading=new Layer
	size: Screen.size
	backgroundColor: "#181818"
animationLoading = new Animation
	layer: AndroidLoading
	properties: { rotation: 360 }
	repeat: Infinity
	time: 1	
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
DramaBig_Buy_State=["Drama_ContinuePlay","DramaBuy_FirstPlay"]
sportNewsArray=[R_05_07_subs_sport_news_video,R_05_06_subs_sport_news_image]
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
		name:"HorContentScroll"
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
	for sub in VOD_Drama_OtherPromoteContents.children
		sub.on Events.Click,->
			BuildControl_LoadingMask(Utils.randomNumber(1,3) )
			ComposeDramaInfoPage(Utils.randomChoice(DramaBig_Buy_State))		
	for sub in VOD_Drama_Curration1Contents.children
		sub.on Events.Click,->
			BuildControl_LoadingMask(Utils.randomNumber(1,3))
			ComposeDramaInfoPage(Utils.randomChoice(DramaBig_Buy_State))		
	for sub in VOD_Drama_Curration2Contents.children
		sub.on Events.Click,->
			BuildControl_LoadingMask(Utils.randomNumber(1,3))
			ComposeDramaInfoPage(Utils.randomChoice(DramaBig_Buy_State))		
	for sub in VOD_Drama_Curration3Contents.children
		sub.on Events.Click,->
			BuildControl_LoadingMask(Utils.randomNumber(1,3))
			ComposeDramaInfoPage(Utils.randomChoice(DramaBig_Buy_State))					
	for sub in VOD_Drama_Curration4Contents.children
		sub.on Events.Click,->
			BuildControl_LoadingMask(Utils.randomNumber(1,3))
			ComposeDramaInfoPage(Utils.randomChoice(DramaBig_Buy_State))		
	for sub in VOD_Drama_HotContent.children
		sub.on Events.Click,->
			BuildControl_LoadingMask(Utils.randomNumber(1,3))
			ComposeDramaInfoPage(Utils.randomChoice(DramaBig_Buy_State))		
	for sub in VOD_Drama_NewestContent.children
		sub.on Events.Click,->
			BuildControl_LoadingMask(Utils.randomNumber(1,3))
			ComposeDramaInfoPage(Utils.randomChoice(DramaBig_Buy_State))		
	for sub in VOD_DramaPromoteContents.children
		sub.on Events.Click,->
			BuildControl_LoadingMask(Utils.randomNumber(1,3))
			ComposeDramaInfoPage(Utils.randomChoice(DramaBig_Buy_State))																	
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
	MoreExcellentContentSPORT_FEATURE.on Events.Click,->
		flowMain.visible=true
		flowMain.showNext(R_05_03_subs_sport_vod)
	MoreExcellentContentSPORT.on Events.Click,->
		flowMain.visible=true
		flowMain.showNext(R_05_03_subs_sport_vod)
	MoreLiveSchedule_Feature.on Events.Click,->
		flowMain.visible=true
		flowMain.showNext(R_05_04_subs_sport_live_calendar)
	
	More_EUROSchedule.on Events.Click,->
		flowMain.visible=true
		flowMain.showNext(R_05_08_subs_game_calendar)
	BACK_LIVEGAMESCHEDULE.on Events.Click,->
		flowMain.visible=false
		flowMain.showPrevious()	
	BackSportVODS.on Events.Click,->
		flowMain.visible=false
		flowMain.showPrevious()
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
				
ComposeLoadingPage=()->

	AndroidLoading.parent=layerLoading
	AndroidLoading.bringToFront()
	AndroidLoading.center()
	AndroidLoading.visible=true
	animationLoading.start()
	Utils.interval 0.2,->
		return if layerLoading.opacity==0
		layerLoading.bringToFront()


layerLoading.opacity=0
BuildControl_LoadingMask=(waitingTime)->
	layerLoading.opacity=1
	
	Utils.delay waitingTime,->
		layerLoading.animate
			opacity: 0
			options: 
				time:0.5	
		
# 		animationLoading.stop()	

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
	
	BigPlayC.on Events.Click,->
		layerPlayerSmall=new VODPlayerControl
			ControlMask:VODPlayerMask.copy()
			Video:"images/dead6.mp4"
			visible:false
			name:"layerVODPl"
			QualitySesstingMask:VODQualitySetting.copy()
			VODSelectSessionMask:VODSelectSession.copy()
			IsDrama:false
			parent:layerMovieInfo
		layerPlayerSmall.center()
		layerPlayerSmall.InitialEvent()
		layerPlayerSmall.Show()
		
		backBtn=layerPlayerSmall.subLayersByName("LayerPlayerMask")[0].subLayersByName("VODPlayer_Back")[0]
		backBtn.on Events.Click,->
			layerPlayerSmall.destroy()									
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
# 		
# dead6 = new VideoLayer
# 	width: 1936
# 	height: 804
# 	video: "images/dead6.mp4"
# 
# dead6.player.play()

ComposeTVChannelProgramList=()->
	SupportDevice_TV_Channel_ProgramList.visible=false
	ContentLIVEsHistoryList.on Events.Click,->
		flowMain.visible=true
		flowMain.showNext(TV_Channel_ProgramList)	
	ContentLIVEs_NewsList.on Events.Click,->
		flowMain.visible=true
		flowMain.showNext(TV_Channel_ProgramList)
	for sub in ContentLIVEs_Favorites.subLayersByName("HorContentScroll")[0].content.children
		sub.on Events.Click,->
			flowMain.showNext(TV_Channel_ProgramList)
			flowMain.visible=true
	BackTV_Channel_ProgramList.on Events.Click,->
		flowMain.visible=false
		flowMain.showPrevious()
	HintSupportDeviceTV_Channel_ProgramList.on Events.Click,->
		SupportDevice_TV_Channel_ProgramList.visible=true
	SupportDevice_TV_Channel_ProgramList.on Events.Click,->
		SupportDevice_TV_Channel_ProgramList.visible=false
ComposeDramaInfoPage=(VODState)->
	
	DramaInfoPageC=VODDramaInfoPage.copy()
	
	layerDramaInfo=new Layer
		size: Screen.size
	scrollDramaInfo=new ScrollComponent
		size: Screen.size
		scrollHorizontal: false
		scrollVertical: true
		parent: layerDramaInfo
	BigPlayC=DramaInfoPageC.subLayersByName("BigPlayDrama")[0]# BigPlay.copy()
	BigPlayC.name="BigPlayDramaC"
	BigPlayC.states.Drama_ContinuePlay=
		opacity:1
	BigPlayC.states.DramaBuy_FirstPlay=
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
	BigPlayC.on Events.Click,->
		layerPlayerSmall=new VODPlayerControl
			ControlMask:VODPlayerMask.copy()
			Video:"images/BackVOD.mp4"
			visible:false
			name:"layerVODPl"
			QualitySesstingMask:VODQualitySetting.copy()
			VODSelectSessionMask:VODSelectSession.copy()
			IsDrama:true
			parent:layerDramaInfo
		layerPlayerSmall.center()
		layerPlayerSmall.InitialEvent()
		layerPlayerSmall.Show()
		
		backBtn=layerPlayerSmall.subLayersByName("LayerPlayerMask")[0].subLayersByName("VODPlayer_Back")[0]
		backBtn.on Events.Click,->
			layerPlayerSmall.destroy()
												
	scrollDramaInfo.content.draggable.directionLock = true
	scrollDramaInfo.content.draggable.directionLockThreshold = {x:10, y:10}
	scrollDramaInfo.mouseWheelEnabled = false
	scrollDramaInfo.content.draggable.momentumOptions = {friction: 10}	
	SupportDeviceWindowC=DramaInfoPageC.subLayersByName("DramaSupportDeviceWindow")[0]
	SupportDeviceWindowC.parent=null
	SupportDeviceWindowC.visible=false
	StatusBarMovieInfoC=DramaInfoPageC.subLayersByName("StatusBarDramaInfo")[0]
	StatusBarMovieInfoC.y=0
	DramaTopTitleInfoC=DramaInfoPageC.subLayersByName("DramaTopTitleInfo")[0]
	
	StatusBarDramaTopTitleInfoC=DramaTopTitleInfoC.subLayersByName("StatusBarDramaTopTitleInfo")[0]
	StatusBarDramaTopTitleInfoC.y=0
	DramaTopTitleInfoC.parent=layerDramaInfo
	DramaTopTitleInfoC.opacity=0
	DramaTopTitleInfoC.y=0
	StatusBarMovieInfoC.parent=layerDramaInfo
	
	DramaInfoPageC.parent=scrollDramaInfo.content
	DramaInfoPageC.backgroundColor="#181818"
	DescriptionVBlockC=DramaInfoPageC.subLayersByName("DescriptionDramaBlock")[0]
	DescriptionVBlockC.clip=true
	originalBlockH=DescriptionVBlockC.height
	originalBlockW=DescriptionVBlockC.width
	DescriptionVBlockC.height=50
	DescriptionVBlockC.width=ShortDescriptionShow.width
	LongDescriptionC=DescriptionVBlockC.subLayersByName("LongDescriptionDrama")[0]
	LongDescriptionC.visible=false
	origialBigPlayY=BigPlay.y
	BigPlayC.parent=layerDramaInfo
	DescriptionCollapseC=DescriptionVBlockC.subLayersByName("ShortDescriptionShowDrama")[0].subLayersByName("DescriptionCollapseDrama")[0]
	RelatedDramaInDramaInfoC=DramaInfoPageC.subLayersByName("VODDramaInfoRelated")[0] 
	ShortDescriptionC=DescriptionVBlockC.subLayersByName("ShortDescriptionShowDrama")[0].subLayersByName("ShortDescriptionDrama")[0]
	DramaSessionSelectorC=DramaInfoPageC.subLayersByName("DramaSessionSelector")[0]
	MyRationC=DramaInfoPageC.subLayersByName("MyDramaRation")[0]	
	DescriptionCollapseC.on Events.Click,->
		DescriptionVBlockC.height=originalBlockH
		DescriptionVBlockC.width=originalBlockW
		ShortDescriptionC.visible=false
		
		LongDescriptionC.visible=true
		
		DramaSessionSelectorC.y=(DescriptionVBlockC.maxY+40)
		MyRationC.y=(DramaSessionSelectorC.maxY+40)
# 		MyRationC.y=(DescriptionVBlockC.maxY+40)
		RelatedDramaInDramaInfoC.y=(MyRationC.maxY+60)
		this.visible=false
	scrollDramaInfo.on "scroll",->
		if this.y<=-150
			DramaTopTitleInfoC.opacity=Utils.modulate(Math.abs(this.y), [150, 160], [0, 1],true)
			BigPlayC.parent=layerDramaInfo
			BigPlayC.placeBefore(DramaTopTitleInfoC)
			BigPlayC.y=Utils.modulate(Math.abs(this.y), [150, 160], [90, 70],true)
		else
			DramaTopTitleInfoC.opacity=0
			BigPlayC.parent=DramaInfoPageC
			BigPlayC.y=origialBigPlayY			
	
	Session01_20C=DramaSessionSelectorC.subLayersByName("Session01_20")[0]
	Session21_40C=DramaSessionSelectorC.subLayersByName("Session21_40")[0]
	Session41_60C=DramaSessionSelectorC.subLayersByName("Session41_60")[0]	
	Session01_20_TitleC=Session01_20C.subLayersByName("Session01_20_Title")[0]
	Session01_20_TitleRotateIconC=Session01_20_TitleC.subLayersByName("Session01_20_TitleRotateIcon")[0]
	DramaSession1TO20SetC=Session01_20C.subLayersByName("DramaSession1TO20Set")[0]
	isexpandSession=true
	Session01_20C.clip=true
	Session01_20_TitleC.bringToFront()
	Session01_20_TitleC.on Events.Click,->
		isexpandSession=!isexpandSession
		if isexpandSession
			Session01_20_TitleRotateIconC.animate
				rotation:0
				options:
					time:0.2
					curve:"linear"				
			DramaSession1TO20SetC.animate
				y:Session01_20_Title.maxY
				options:
					time:0.2
					curve:"linear"
			Session01_20C.height=DramaSession1TO20SetC.height+Session01_20_Title.height
		else
			Session01_20_TitleRotateIconC.animate
				rotation:180
				options:
					time:0.2
					curve:"linear"
			DramaSession1TO20SetC.animate
				y:-DramaSession1TO20SetC.height
				options:
					time:0.2
					curve:"linear"
			Session01_20C.height=Session01_20_Title.height
		
		Session21_40C.y=Session01_20C.maxY+10
		Session41_60C.y=Session21_40C.maxY+10
		DramaSessionSelectorC.height=Session41_60C.maxY
		MyRationC.y=(DramaSessionSelectorC.maxY+40)
		RelatedDramaInDramaInfoC.y=(MyRationC.maxY+60)
	
	RelatedMovieInMovieInfoContentsC=RelatedDramaInDramaInfoC.subLayersByName("VODDramaInfoRelatedContents")[0]  
	#if RelatedMovieInMovieInfoContents.children.length==0
	#else
	ComposeHorscrollContent(RelatedDramaInDramaInfoC,RelatedMovieInMovieInfoContentsC)	
	BTNSupportDevicesC=DramaInfoPageC.subLayersByName("BTNSupportDevicesDrama")[0]
	BTNSupportDevicesC.on Events.Click,->
		SupportDeviceWindowC.visible=true
	SupportDeviceWindowC.on Events.Click,->
		this.visible=false
	BackBTNMovieInfoC=DramaInfoPageC.subLayersByName("BackBTNDramaInfo")[0]
	RatingStarsC=MyRationC.subLayersByName("DramaRatingStars")[0]
	
	newStarBar=BuildControl_RatingControl(5,30)
	newStarBar.x=RatingStars.x
	newStarBar.y=RatingStars.y
	newStarBar.parent=RatingStarsC.parent
	RatingStarsC.destroy()
	BackBTNMovieInfoC.on Events.Click,->
		layerDramaInfo.destroy()

		
ComposeAnimateNews=(isStart)->
	Video_sport_news_videoCover.bringToFront()
	if isStart
		Utils.delay 2,->
			Video_sport_news_videoCover.visible=false
			#print Video_sport_news_video.subLayersByName("layerPlayer")[0]
			R_05_07_subs_sport_news_video.subLayersByName("layerPlayer")[0].Show()
	else
		Video_sport_news_videoCover.visible=true
		
		R_05_07_subs_sport_news_video.subLayersByName("layerPlayer")[0].STOP()

		
#賽事、聊天室 0904
ComposeAllR0904Pagelink=()->

	SportPlayer.clip=true
	layerPlayerSmall=new ChannelPlayerControl
		ControlMask:SportPlayerControlMask.copy()
		Video:"images/SportVoD.mp4"
		visible:false
		parent:R_09_04_SportPlayer
		isrotated:"N"
		ControlMask_Landscape:ChannelPlayerLandscape.copy()
		QualitySesstingMask:QualitySetting_Portrait.copy()
	layerPlayerSmall.ori_XX=0
	layerPlayerSmall.ori_YY=0
	Back_R_09_04_SportPlayer.on Events.Click,->
		flowMain.showPrevious()
		flowMain.visible=false
		layerPlayerSmall.STOP()
	layerPlayerSmall.InitialEvent()
# 	backBtn=layerPlayerSmall.subLayersByName("LayerPlayerMask")[0].subLayersByName("Back_ChannelPlayer")[0]
# 	
# 	backBtn.on Events.Click,->
# 		#裡面按下Back，要判斷是否為已旋轉，若是已旋轉則轉回去，保持元畫面
# 		if layerPlayerSmall.rotation==90
# 			layerPlayerSmall.RotationBack()
# 		else
# 			flowMain.showPrevious()
# 			flowMain.visible=false		

	layerPlayerSmall.bringToFront()	
	for sub in MainContentHome.subLayersByName("ADComponent_Home")[0].children
		sub.on Events.Click,->
			return if MainContentHome.subLayersByName("ADComponent_Home")[0].isDragging
			flowMain.visible=true
			flowMain.showOverlayRight(R_09_04_SportPlayer)
			Utils.delay 1,->
				R_09_04_SportPlayerStatus.animate
					opacity:0
					options:
						time:2
						curve:"easy-out"
			SportPlayer.visible=false
			layerPlayerSmall.Show()			
# 				SportPlayerControlMask.animate
# 					opacity:0
# 					options:
# 						time:2
# 						curve:"easy-out"
# 			SportPlayerContent.subLayersByName("SportPlayerContentPlayer")[0].player.currentTime=0
# 			SportPlayerContent.subLayersByName("SportPlayerContentPlayer")[0].player.play()
	
# 	Back_R_09_04_SportPlayer.on Events.Click,->
# 		flowMain.visible=false
# 		flowMain.showPrevious()
# 		SportPlayerControlMask.opacity=1
# 		R_09_04_SportPlayerStatus.opacity=1
		

Compose_SportNewsVideoImage=()->
	layerVideoSport=new ChannelPlayerControl
		ControlMask:SportPlayerControlMask.copy()
		ControlMask_Landscape:ChannelPlayerLandscape.copy()
		Video:"images/SportVoD.mp4"
		visible:false
		parent:R_05_07_subs_sport_news_video
		name:"layerPlayer"
		QualitySesstingMask:QualitySetting_Portrait.copy()
		ori_XX:0
		ori_YY:74
	layerVideoSport.ori_XX=0
	layerVideoSport.ori_YY=74
	layerVideoSport.bringToFront()	
	layerVideoSport.InitialEvent()
# 	backBtn=layerVideoSport.subLayersByName("LayerPlayerMask")[0].subLayersByName("Back_ChannelPlayer")[0]
# 	
# 	backBtn.on Events.Click,->
# 		#裡面按下Back，要判斷是否為已旋轉，若是已旋轉則轉回去，保持元畫面
# # 		layerPlayerSmall.doisrotated="Y"
# # 		print "dddd",layerPlayerSmall.rotation
# 		if layerVideoSport.rotation==90
# 			layerVideoSport.RotationBack()
# 		else
# 			flowMain.showPrevious()
# 			flowMain.visible=false		

	Video_sport_news_video.clip=true	
	
	for sub in ContentSPORT_Euro_RealTime.subLayersByName("HorContentScroll")[0].content.children
		
		sub.on Events.Click,->
			flowMain.visible=true
			flowMain.showNext(Utils.randomChoice(sportNewsArray))
			
	
	for sub in ContentSPORT_RealTime.subLayersByName("HorContentScroll")[0].content.children
		sub.on Events.Click,->
			flowMain.visible=true
			layer=Utils.randomChoice(sportNewsArray)
			if layer==R_05_07_subs_sport_news_video
				ComposeAnimateNews(true)
				
			flowMain.showNext(layer)
			
	
	
	BACK_R_05_07_subs_sport_news_video.on Events.Click,->
		flowMain.visible=false
		flowMain.showPrevious()
		ComposeAnimateNews(false)
	BACK_R_05_06_subs_sport_news_image.on Events.Click,->
		flowMain.visible=false
		flowMain.showPrevious()
	BACK_R_05_07_subs_sport_news_video.sendToBack()
	#BACK_R_05_07_subs_sport_news_video.visible=false
ComposeChangeTVOrderPage=()->
	ContentLIVEs_Adjust.on Events.Click,->
		
		flowMain.visible=true
		flowMain.showNext(R_04_05_subs_tv_change_order)
	
	ChangeTVOrderBackTilte.on Events.Click,->
		flowMain.visible=false
		flowMain.showPrevious()
Home=()->
	flow.showNext(R_01_01_login_phone)
	BuildControl_SideMenu()
	BuildContent_HeadTitle()
	BuildContent_Description()
	BuildContent_MainSelection()
	Compose_LoginFlow()
	

	Compose_HomePage()
	ComposeAnnounceMessagePopup()
	ComposeChangeTVOrderPage()
	ComposeTVChannelProgramList()
	Compose_SportNewsVideoImage()
	ComposeAllR0904Pagelink()
	ComposeLoadingPage()
# 	layerPlayerSmall=new ChannelPlayerControl
# 		ControlMask:SportPlayerControlMask.copy()
# 		Video:"images/SportVoD.mp4"
# 		visible:false
# 		isrotated:"N"
# 		ControlMask_Landscape:ChannelPlayerLandscape.copy()
# 		name:"AAAAAAA"
# 		QualitySesstingMask:QualitySetting_Portrait.copy()
# 	layerPlayerSmall.ori_XX=0
# 	layerPlayerSmall.ori_YY=0
# 	layerPlayerSmall.InitialEvent()
# 	layerPlayerSmall.Show()

# 	ComposeDramaInfoPage(Utils.randomChoice(DramaBig_Buy_State))
	#ComposeMovieInfoPage(Utils.randomChoice(TVODBig_Buy_State))		
# 	layerPlayerSmall=new ChannelPlayerControl
# 		ControlMask:SportPlayerControlMask.copy()
# 		Video:"images/SportVoD.mp4"
# 	layerPlayerSmall.Show()
Home()
