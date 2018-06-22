{ Sheet } = require 'sheet'
hd_score_kent = new Layer
	width: 1280
	height: 720
	image: "images/hd_score_kent.png"
sheet = new Sheet
	key: '1wYhbZ3A8YsDe44pq5TmnDI205MTAeozgAWjNZqCw9ZY'
Array::toDict = (key) ->
  @reduce ((dict, obj) -> dict[ obj[key] ] = obj if obj[key]?; return dict), {}


FIFA_ScoreArray=[]
sheet.get((data, sheet) ->
  FIFA_ScoreArray = data
  #print "ddd",FIFA_ScoreArray.length
  Utils.delay 0.5,->
    i=0
    for item in FIFA_ScoreArray
      
      #print item["Country_TW"],item["Group"],item["Win"],item["Score"]
      layerScore=generateScores(item["Win"],item["Fail"],item["Duce"],item["Score"])
      if item["Group"]=="A" 
        layerScore.y=40*i+50
      if item["Group"]=="B" 
        layerScore.y=40*i+55
      if item["Group"]=="C" 
        layerScore.y=40*i+55
      if item["Group"]=="D" 
        layerScore.y=40*i+57
      if item["Group"]=="E" 
        layerScore.x=1135 
        layerScore.y=40*(i%16)+50
      if item["Group"]=="F"
        layerScore.x=1135
        layerScore.y=40*(i%16)+55
      if item["Group"]=="G" 
        layerScore.x=1135
        layerScore.y=40*(i%16)+55
      if item["Group"]=="H" 
        layerScore.x=1135
        layerScore.y=40*(i%16)+56      
      i=i+1
      layerScore.name="Group"+item["Group"]
      
)
layerCover=new Layer
	backgroundColor:"#0A2242"
	width:150
	height:30
layerCover.centerX()
layerCover.y=660
helloText=new TextLayer
	fontSize:24
	text:"更新FIFA官方數據＠夏洛克"
	parent:layerCover
	color:"White"
helloText.centerX()		
layerCover.on "click",->
	window.location = "https://docs.google.com/spreadsheets/d/1wYhbZ3A8YsDe44pq5TmnDI205MTAeozgAWjNZqCw9ZY/edit?usp=sharing"
generateScores=(win,fail,duce,total)->
	layer=new Layer
		backgroundColor:"Transparent"
		#borderWidth:1
		width:100
		height:40
		x:190
		y:50
	fontSizeN=24
	gap=9
	fontColorT="Black"
	
	layerWin=new TextLayer
		text:win
		parent:layer
		color:fontColorT
		fontSize:fontSizeN
	layerFail=new TextLayer
		text:fail
		parent:layer
		color:fontColorT
		fontSize:fontSizeN
		x:layerWin.maxX+gap
	layerDuce=new TextLayer
		text:duce
		parent:layer
		color:fontColorT
		fontSize:fontSizeN
		x:layerFail.maxX+gap
	layerScore=new TextLayer
		text:total
		parent:layer
		color:fontColorT
		fontSize:fontSizeN
		fontStyle: "bold"
		x:layerDuce.maxX+gap
	
		
	return layer