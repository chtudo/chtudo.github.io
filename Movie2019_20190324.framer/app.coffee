# Show Hints
Framer.Extras.Hints.disable()
# Use desktop cursor
document.body.style.cursor = "auto"

# Disable right-click context menu
if document.addEventListener?
	document.addEventListener "contextmenu", (event) ->
		event.preventDefault()

Framer.Device.deviceType="fullscreen"
Utils.insertCSS """
	@font-face {
		font-family: "material";
		src: url("fonts/material.ttf");
	}
"""
Utils.insertCSS """
	@font-face {
		font-family: "cwTeXHei";
		src: url(//fonts.gstatic.com/ea/cwtexhei/v3/cwTeXHei-zhonly.ttf) format('truetype');
	}
"""


movies = [{
title: "雞不可失",
url:"https://www.youtube.com/watch?v=KMl3e5nwj-c",
engtitle: "Extreme Job",
year: "2019",
imdb:"2019",
imdbvotes:"688",
RottenTomato:"N/A",
RottenTomatoAudience:"0.89",
RottenTomatoAudienceVotes:"53",
TAG: "新上",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7878/46539640475_c1407c4504_o.jpg"},
{
title: "速成家庭",
url:"https://www.youtube.com/watch?v=Cb_kAyqd-5w",
engtitle: "Instant Family",
year: "2018",
imdb:"2018",
imdbvotes:"32525",
RottenTomato:"81",
RottenTomatoAudience:"0.81",
RottenTomatoAudienceVotes:"2314",
TAG: "新上",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7881/47401918802_daab9645ba_o.jpg"},
{
title: "愛x 死x 機器人",
url:"https://www.youtube.com/watch?v=d4C3em42I9E",
engtitle: "Love, Death & Robots",
year: "2019",
imdb:"2019",
imdbvotes:"22576",
RottenTomato:"72",
RottenTomatoAudience:"N/A",
RottenTomatoAudienceVotes:"N/A",
TAG: "新上",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7803/47401916922_1489f038f3_o.jpg"},
{
title: "空中急診英雄－海空災難最終救援",
url:"https://www.youtube.com/watch?v=cWiqhRSDvgk",
engtitle: "Code Blue the Movie",
year: "2018",
imdb:"2018",
imdbvotes:"212",
RottenTomato:"N/A",
RottenTomatoAudience:"N/A",
RottenTomatoAudienceVotes:"N/A",
TAG: "新上",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7842/46539650475_e2355a9413_o.jpg"},
{
title: "赤手登峰",
url:"https://www.youtube.com/watch?v=3DykHpn0p1A",
engtitle: "Free Solo",
year: "2018",
imdb:"2018",
imdbvotes:"20871",
RottenTomato:"99",
RottenTomatoAudience:"0.94",
RottenTomatoAudienceVotes:"2040",
TAG: "新上",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7805/40488840023_bc09733f2d_o.jpg"},
{
title: "庫爾斯克號：深海救援",
url:"https://www.youtube.com/watch?v=8GjBhvj5w1g",
engtitle: "Kursk",
year: "2018",
imdb:"2018",
imdbvotes:"3997",
RottenTomato:"71",
RottenTomatoAudience:"N/A",
RottenTomatoAudienceVotes:"N/A",
TAG: "新上",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7889/32513096577_9ba3c7af9c_o.jpg"},
{
title: "生命中的美好意外",
url:"https://www.youtube.com/watch?v=cNi8qSjCSDU",
engtitle: "Life Itself",
year: "2018",
imdb:"2018",
imdbvotes:"7854",
RottenTomato:"13",
RottenTomatoAudience:"0.83",
RottenTomatoAudienceVotes:"1032",
TAG: "新上",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7883/47401863072_93f361f9fc_o.jpg"},
{
title: "驚濤佈局",
url:"https://www.youtube.com/watch?v=WcZsptnscsY",
engtitle: "Serenity",
year: "2019",
imdb:"5.3/10",
imdbvotes:"12176",
RottenTomato:"19",
RottenTomatoAudience:"0.3",
RottenTomatoAudienceVotes:"935",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7927/46482178434_be398c0fa4_o.jpg"},
{
title: "羅馬",
url:"https://www.youtube.com/watch?v=xOuD3snq-vk",
engtitle: "Roma",
year: "2018",
imdb:"7.8/10",
imdbvotes:"97717",
RottenTomato:"96",
RottenTomatoAudience:"0.71",
RottenTomatoAudienceVotes:"4594",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7887/33329999158_7470a1eb33_o.jpg"},
{
title: "私人戰爭",
url:"https://www.youtube.com/watch?v=er7sLm_qwEw",
engtitle: "A Private War",
year: "2018",
imdb:"6.7/10",
imdbvotes:"7504",
RottenTomato:"90",
RottenTomatoAudience:"0.65",
RottenTomatoAudienceVotes:"1210",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7843/47153502102_8e7ea574cb_o.jpg"},
{
title: "幸福綠皮書",
url:"https://www.youtube.com/watch?v=8aX8HYxNxK4",
engtitle: "Green Book",
year: "2018",
imdb:"8.3/10",
imdbvotes:"154027",
RottenTomato:"78",
RottenTomatoAudience:"0.92",
RottenTomatoAudienceVotes:"7544",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7872/47205441251_3314054082_o.jpg"},
{
title: "七龍珠超：布羅利",
url:"https://www.youtube.com/watch?v=Q9rJ_7k0lII",
engtitle: "Dragon Ball Super: Broly",
year: "2018",
imdb:"8.1/10",
imdbvotes:"14299",
RottenTomato:"83",
RottenTomatoAudience:"0.93",
RottenTomatoAudienceVotes:"2868",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7859/32263222907_20cf11ee05_o.jpg"},
{
title: "真寵",
url:"https://www.youtube.com/watch?v=_eu7EZIdLMM",
engtitle: "The Favourite",
year: "2018",
imdb:"7.7/10",
imdbvotes:"96733",
RottenTomato:"93",
RottenTomatoAudience:"0.67",
RottenTomatoAudienceVotes:"5589",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7862/40240578183_67ccf4bd13_o.jpg"},
{
title: "移動城市：致命引擎",
url:"https://www.youtube.com/watch?v=nQLsfPU4lhY",
engtitle: "Mortal Engines",
year: "2018",
imdb:"6.2/10",
imdbvotes:"53810",
RottenTomato:"27",
RottenTomatoAudience:"0.54",
RottenTomatoAudienceVotes:"3048",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7842/47001562392_d6e6a182b9_o.jpg"},
{
title: "信徒",
url:"https://www.youtube.com/watch?v=pM4vc9QPabY",
engtitle: "Believer",
year: "2018",
imdb:"6.3/10",
imdbvotes:"819",
RottenTomato:"64",
RottenTomatoAudience:"0.94",
RottenTomatoAudienceVotes:"63",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7918/46139730565_184888e7f9_o.jpg"},
{
title: "性愛自習室",
url:"https://www.youtube.com/watch?v=yzAuBQTD3JM",
engtitle: "Sex Education",
year: "2019",
imdb:"8.4/10",
imdbvotes:"52038",
RottenTomato:"91",
RottenTomatoAudience:"N/A",
RottenTomatoAudienceVotes:"N/A",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7866/33178482398_94d4a054c4_o.jpg"},
{
title: "李屍朝鮮",
url:"https://www.youtube.com/watch?v=dscGjaJ46h4",
engtitle: "Kingdom",
year: "2019",
imdb:"8.3/10",
imdbvotes:"8580",
RottenTomato:"89",
RottenTomatoAudience:"N/A",
RottenTomatoAudienceVotes:"N/A",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7814/33178518608_66c27dae5f_o.jpg"},
{
title: "安眠書店",
url:"https://www.youtube.com/watch?v=Kt47osttSq0",
engtitle: "You",
year: "2018",
imdb:"7.8/10",
imdbvotes:"53858",
RottenTomato:"93",
RottenTomatoAudience:"N/A",
RottenTomatoAudienceVotes:"N/A",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7854/33178544668_4ee952a9c1_o.jpg"},
{
title: "阿爾罕布拉宮的回憶",
url:"https://www.youtube.com/watch?v=XZBnIBtyGko",
engtitle: "Memories of the Alhambra",
year: "2018",
imdb:"7.9/10",
imdbvotes:"1094",
RottenTomato:"N/A",
RottenTomatoAudience:"N/A",
RottenTomatoAudienceVotes:"N/A",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7815/33178606258_701ea89bd0_o.jpg"},
{
title: "怦然心動的人生整理魔法",
url:"https://www.youtube.com/watch?v=WvyeapVBLWY",
engtitle: "Tidying Up with Marie Kondo",
year: "2019",
imdb:"6.6/10",
imdbvotes:"1672",
RottenTomato:"79",
RottenTomatoAudience:"N/A",
RottenTomatoAudienceVotes:"N/A",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7872/32263284807_0c6742ef30_o.jpg"},
{
title: "香水",
url:"https://www.youtube.com/watch?v=O7ObARHvVF0",
engtitle: "Parfum",
year: "2018",
imdb:"6.7/10",
imdbvotes:"519",
RottenTomato:"N/A",
RottenTomatoAudience:"N/A",
RottenTomatoAudienceVotes:"N/A",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7802/46291155535_57a10e2241_o.jpg"},
{
title: "波希米亞狂想曲",
url:"https://www.youtube.com/watch?v=2w3WtmVdsU0",
engtitle: "Bohemian Rhapsody",
year: "2018",
imdb:"8.1/10",
imdbvotes:"308022",
RottenTomato:"61",
RottenTomatoAudience:"0.87",
RottenTomatoAudienceVotes:"20450",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7916/47208354551_c6348bd015_o.jpg"},
{
title: "非賣品",
url:"https://www.youtube.com/watch?v=o7nY5g3H3pQ",
engtitle: "Unstoppable",
year: "2018",
imdb:"6.4/10",
imdbvotes:"413",
RottenTomato:"N/A",
RottenTomatoAudience:"0.6",
RottenTomatoAudienceVotes:"21",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7879/46484973574_5896567c7d_o.jpg"},
{
title: "捍衛生死線",
url:"https://www.youtube.com/watch?v=aDRfEyemuhk",
engtitle: "Replicas",
year: "2018",
imdb:"5.4/10",
imdbvotes:"11750",
RottenTomato:"10",
RottenTomatoAudience:"0.37",
RottenTomatoAudienceVotes:"882",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7911/40088608833_4b15a5ed9f_o.jpg"},
{
title: "低壓槽",
url:"https://www.youtube.com/watch?v=x5JZhlSSeB0",
engtitle: "The Trough",
year: "2018",
imdb:"4.7/10",
imdbvotes:"151",
RottenTomato:"N/A",
RottenTomatoAudience:"N/A",
RottenTomatoAudienceVotes:"N/A",
TAG: "",
StagePhoto: "",
poster:"http://farm8.static.flickr.com/7872/40088647123_78ee10f0d8_o.jpg"},
{
title: "水行俠",
url:"https://www.youtube.com/watch?v=nX8XumptyEQ",
engtitle: "Aquaman",
year: "2018",
imdb:"7.2/10",
imdbvotes:"207119",
RottenTomato:"65",
RottenTomatoAudience:"0.77",
RottenTomatoAudienceVotes:"31084",
TAG: "",
StagePhoto: "",
poster:"https://c2.staticflickr.com/8/7892/31970422097_e1b8be46da_b.jpg"},
{
title: "內政保鑣",
url:"https://www.youtube.com/watch?v=22VcrijF8Os",
engtitle: "Bodyguard",
year: "2018",
imdb:"8.2/10",
imdbvotes:"58499",
RottenTomato:"94",
RottenTomatoAudience:"N/A",
RottenTomatoAudienceVotes:"N/A",
TAG: "",
StagePhoto: "",
poster:"https://c1.staticflickr.com/5/4888/31970448027_b16ca99ed3_c.jpg"},
{
title: "胡桃鉗與奇幻四國",
url:"https://www.youtube.com/watch?v=ie0l1YUGZ0M",
engtitle: "The Nutcracker and the Four Realms",
year: "2018",
imdb:"5.5/10",
imdbvotes:"16099",
RottenTomato:"34",
RottenTomatoAudience:"0.34",
RottenTomatoAudienceVotes:"1944",
TAG: "",
StagePhoto: "",
poster:"https://c2.staticflickr.com/8/7922/46859266462_4a85643a73_c.jpg"},
{
title: "大師兄",
url:"https://www.youtube.com/watch?v=wTMyUXEYKIU&vl=zh-TW",
engtitle: "Big Brother",
year: "2018",
imdb:"6.3/10",
imdbvotes:"1102",
RottenTomato:"N/A",
RottenTomatoAudience:"0.89",
RottenTomatoAudienceVotes:"44",
TAG: "",
StagePhoto: "",
poster:"https://c1.staticflickr.com/5/4869/46911438081_2738163235_b.jpg"},
{
title: "極盜戰",
url:"https://www.youtube.com/watch?v=gPAWrd3VSJw",
engtitle: "Den of Thieves",
year: "2018",
imdb:"43656",
imdbvotes:"66250",
RottenTomato:"41",
RottenTomatoAudience:"0.62",
RottenTomatoAudienceVotes:"4018",
TAG: "",
StagePhoto: "",
poster:"https://farm8.staticflickr.com/7858/45996927895_60de524dc0_o.jpg"},
{
title: "寡婦",
url:"https://www.youtube.com/watch?v=hjdmzN9Ob0g",
engtitle: "Widows",
year: "2018",
imdb:"43656",
imdbvotes:"52858",
RottenTomato:"91",
RottenTomatoAudience:"0.62",
RottenTomatoAudienceVotes:"4321",
TAG: "",
StagePhoto: "",
poster:"https://farm5.staticflickr.com/4906/33036082108_df6482c156_o.jpg"},
{
title: "羅賓漢崛起",
url:"https://www.youtube.com/watch?v=pbTnUOFEMf4",
engtitle: "Robin Hood",
year: "2018",
imdb:"5.3/10",
imdbvotes:"34346",
RottenTomato:"15",
RottenTomatoAudience:"0.42",
RottenTomatoAudienceVotes:"2789",
TAG: "",
StagePhoto: "",
poster:"https://farm5.staticflickr.com/4846/45944312765_5d338306be_o.jpg"},
{
title: "貼身女保鏢",
url:"https://www.youtube.com/watch?v=yM1TM00L17w",
engtitle: "Close",
year: "2019",
imdb:"5.6/10",
imdbvotes:"12572",
RottenTomato:"38",
RottenTomatoAudience:"0.36",
RottenTomatoAudienceVotes:"237",
TAG: "",
StagePhoto: "",
poster:"https://farm8.staticflickr.com/7814/46780655882_85ace564c2_o.jpg"},
{
title: "少女地球守護者",
url:"https://www.youtube.com/watch?v=y3GLhAumiec",
engtitle: "IO",
year: "2019",
imdb:"4.7/10",
imdbvotes:"22540",
RottenTomato:"32",
RottenTomatoAudience:"0.18",
RottenTomatoAudienceVotes:"814",
TAG: "",
StagePhoto: "",
poster:"https://c2.staticflickr.com/8/7865/46832930311_9838d2ffba_h.jpg"},
{
title: "大黃蜂",
url:"https://www.youtube.com/watch?v=FUGZlZcwC6s",
engtitle: "Bumblebee",
year: "2018",
imdb:"43656",
imdbvotes:"61814",
RottenTomato:"93",
RottenTomatoAudience:"0.77",
RottenTomatoAudienceVotes:"7417",
TAG: "",
StagePhoto: "",
poster:"https://farm8.staticflickr.com/7853/33036977598_29402b6835_o.jpg"},
{
title: "切小金家的旅館",
url:"https://www.youtube.com/watch?v=gye3GVrptyg",
engtitle: "Secrets in the Hot Spring",
year: "2018",
imdb:"43626",
imdbvotes:"227",
RottenTomato:"N/A",
RottenTomatoAudience:"0.78",
RottenTomatoAudienceVotes:"11",
TAG: "",
StagePhoto: "",
poster:"https://c1.staticflickr.com/5/4818/32904422788_60672fa632_h.jpg"},
{
title: "一個巨星的誕生",
url:"https://www.youtube.com/watch?v=g3l3zc6mN6Y",
engtitle: "A Star Is Born",
year: "2018",
imdb:"7.8/10",
imdbvotes:"221762",
RottenTomato:"89",
RottenTomatoAudience:"0.8",
RottenTomatoAudienceVotes:"17813",
TAG: "",
StagePhoto: "",
poster:"https://farm8.staticflickr.com/7816/45865293695_79236bbb4b_o.jpg"},
{
title: "潛艦獵殺令",
url:"https://www.youtube.com/watch?v=aJHWqb3Xdsw",
engtitle: "Hunter Killer",
year: "2018",
imdb:"6.6/10",
imdbvotes:"28970",
RottenTomato:"36",
RottenTomatoAudience:"0.72",
RottenTomatoAudienceVotes:"1872",
TAG: "",
StagePhoto: "",
poster:"https://farm8.staticflickr.com/7856/46055330724_1ccc1b99d7_o.jpg"},
{
title: "怪物遊戲2：妖獸讚",
url:"https://www.youtube.com/watch?v=4MA54kS-45U",
engtitle: "Goosebumps 2: Haunted Halloween",
year: "2018",
imdb:"5.6/10",
imdbvotes:"9699",
RottenTomato:"46",
RottenTomatoAudience:"0.41",
RottenTomatoAudienceVotes:"1099",
TAG: "",
StagePhoto: "",
poster:"https://farm8.staticflickr.com/7880/46055458714_b07886de6f_o.jpg"},
{
title: "冠軍大叔",
url:"https://www.youtube.com/watch?v=5QLMypjy2CQ",
engtitle: "Champion",
year: "2018",
imdb:"5.8/10",
imdbvotes:"358",
RottenTomato:"86",
RottenTomatoAudience:"0.38",
RottenTomatoAudienceVotes:"15",
TAG: "",
StagePhoto: "",
poster:"https://farm8.staticflickr.com/7914/46727986312_0ffa4ae6d9_o.jpg"},
{
title: "蒙住你的眼",
url:"https://www.youtube.com/watch?v=Gj6q88zcJJA",
engtitle: "Bird Box",
year: "2018",
imdb:"6.7/10",
imdbvotes:"199751",
RottenTomato:"62",
RottenTomatoAudience:"0.59",
RottenTomatoAudienceVotes:"6184",
TAG: "",
StagePhoto: "",
poster:"https://farm8.staticflickr.com/7925/45720021085_6755f9da2e_o.jpg"},
{
title: "無敵破壞王2：網路大暴走",
url:"https://www.youtube.com/watch?v=hQeSulWZt1k",
engtitle: "Ralph Breaks the Internet",
year: "2018",
imdb:"7.2/10",
imdbvotes:"70074",
RottenTomato:"88",
RottenTomatoAudience:"0.66",
RottenTomatoAudienceVotes:"6996",
TAG: "",
StagePhoto: "",
poster:"https://farm5.staticflickr.com/4848/45720086705_6b9e88b0c0_o.jpg"},
{
title: "失蹤網紅",
url:"https://www.youtube.com/watch?v=PTQgp3tCyFY",
engtitle: "A Simple Favor",
year: "2018",
imdb:"6.9/10",
imdbvotes:"74938",
RottenTomato:"85",
RottenTomatoAudience:"0.75",
RottenTomatoAudienceVotes:"5544",
TAG: "",
StagePhoto: "",
poster:"https://farm8.staticflickr.com/7907/45910350174_ecdc364f10_o.jpg"},
{
title: "超人特攻隊2",
url:"https://www.youtube.com/watch?v=ITd8L33_a0U",
engtitle: "Incredibles 2",
year: "2018",
imdb:"7.7/10",
imdbvotes:"188449",
RottenTomato:"94",
RottenTomatoAudience:"0.85",
RottenTomatoAudienceVotes:"16789",
TAG: "",
StagePhoto: "",
poster:"https://farm5.staticflickr.com/4821/32620220188_83051efb3d_o.jpg"},
{
title: "私刑教育2",
url:"https://www.youtube.com/watch?v=263HmEIvkx8",
engtitle: "Equalizer 2",
year: "2018",
imdb:"6.7/10",
imdbvotes:"88025",
RottenTomato:"51",
RottenTomatoAudience:"0.62",
RottenTomatoAudienceVotes:"4295",
TAG: "",
StagePhoto: "",
poster:"https://farm5.staticflickr.com/4842/31553112537_aa052c80fb_o.jpg"},
{
title: "猛毒",
url:"https://www.youtube.com/watch?v=iymJJlzThu0",
engtitle: "Venom",
year: "2018",
imdb:"6.8/10",
imdbvotes:"249709",
RottenTomato:"29",
RottenTomatoAudience:"0.81",
RottenTomatoAudienceVotes:"37651",
TAG: "",
StagePhoto: "",
poster:"https://farm5.staticflickr.com/4833/32620288468_a9e4044140_o.jpg"},
{
title: "登月先鋒",
url:"https://www.youtube.com/watch?v=WIKkCwCzaO8",
engtitle: "First Man",
year: "2018",
imdb:"7.4/10",
imdbvotes:"108085",
RottenTomato:"87",
RottenTomatoAudience:"0.66",
RottenTomatoAudienceVotes:"7488",
TAG: "",
StagePhoto: "",
poster:"https://farm8.staticflickr.com/7887/32620328098_ee66a20736_o.jpg"},
{
title: "凸搥特派員：三度出擊",
url:"https://www.youtube.com/watch?v=jn1AglLpapk",
engtitle: "Johnny English Strikes Again",
year: "2018",
imdb:"6.2/10",
imdbvotes:"42805",
RottenTomato:"36",
RottenTomatoAudience:"0.51",
RottenTomatoAudienceVotes:"1668",
TAG: "",
StagePhoto: "",
poster:"https://farm5.staticflickr.com/4906/45769566554_90b11711d1_o.jpg"},
{
title: "怪獸與葛林戴華德的罪行",
url:"https://www.youtube.com/watch?v=hlQm4_4EGao",
engtitle: "Fantastic Beasts: The Crimes of Grindelwald",
year: "2018",
imdb:"6.7/10",
imdbvotes:"142477",
RottenTomato:"37",
RottenTomatoAudience:"0.57",
RottenTomatoAudienceVotes:"13234",
TAG: "",
StagePhoto: "",
poster:"https://farm8.staticflickr.com/7894/45769660264_4e1def872f_o.jpg"},
{
title: "壞事大飯店",
url:"https://www.youtube.com/watch?v=QgVQ_8zAZYE",
engtitle: "Bad Times at the El Royale",
year: "2018",
imdb:"7.1/10",
imdbvotes:"74627",
RottenTomato:"75",
RottenTomatoAudience:"0.74",
RottenTomatoAudienceVotes:"4375",
TAG: "",
StagePhoto: "",
poster:"https://farm8.staticflickr.com/7808/45580012655_e7e9dddb3d_o.jpg"},
{
title: "無雙",
url:"https://www.youtube.com/watch?v=TFEgSkMoqbk",
engtitle: "Project Gutenberg",
year: "2018",
imdb:"7.1/10",
imdbvotes:"1908",
RottenTomato:"80",
RottenTomatoAudience:"0.83",
RottenTomatoAudienceVotes:"37",
TAG: "",
StagePhoto: "",
poster:"https://farm5.staticflickr.com/4832/46493278541_ccf0252dab_o.jpg"},
{
title: "芮氏9.6",
url:"https://www.youtube.com/watch?v=5r29Wd0efNs",
engtitle: "The Quake",
year: "2018",
imdb:"6.2/10",
imdbvotes:"4064",
RottenTomato:"83",
RottenTomatoAudience:"0.53",
RottenTomatoAudienceVotes:"161",
TAG: "",
StagePhoto: "",
poster:"https://farm5.staticflickr.com/4886/46493466571_f634e0a4d2_o.jpg"},
{
title: "人肉搜索",
url:"https://www.youtube.com/watch?v=1f-nx8OAMVk",
engtitle: "Searching",
year: "2018",
imdb:"7.7/10",
imdbvotes:"86438",
RottenTomato:"92",
RottenTomatoAudience:"0.88",
RottenTomatoAudienceVotes:"5826",
TAG: "",
StagePhoto: "",
poster:"https://farm5.staticflickr.com/4846/44677015270_e3d85c8e3f_o.jpg"},
{
title: "鋼鐵墳墓2",
url:"https://www.youtube.com/watch?v=fkub0oVT_2o",
engtitle: "Escape Plan 2: Hades",
year: "2018",
imdb:"3.8/10",
imdbvotes:"19044",
RottenTomato:"9",
RottenTomatoAudience:"0.14",
RottenTomatoAudienceVotes:"620",
TAG: "",
StagePhoto: "",
poster:"https://farm2.staticflickr.com/1962/44284512045_908a5b7571_o.jpg"},
{
title: "蟻人與黃蜂女",
url:"https://www.youtube.com/watch?v=xFkFkU4yPsk",
engtitle: "Ant-Man and the Wasp",
year: "2018",
imdb:"7.1/10",
imdbvotes:"211030",
RottenTomato:"88",
RottenTomatoAudience:"0.76",
RottenTomatoAudienceVotes:"22206",
TAG: "",
StagePhoto: "",
poster:"https://farm2.staticflickr.com/1779/29001564287_96913723c9_o.jpg"},
{
title: "北風",
url:"https://www.youtube.com/watch?v=e7srjeJgCZA",
engtitle: "The Spy Gone North",
year: "2018",
imdb:"7.2/10",
imdbvotes:"1104",
RottenTomato:"100",
RottenTomatoAudience:"0.94",
RottenTomatoAudienceVotes:"111",
TAG: "",
StagePhoto: "",
poster:"https://farm2.staticflickr.com/1905/44473778024_e490b6b682_o.jpg"},
{
title: "尖叫旅社3：怪獸假期",
url:"https://www.youtube.com/watch?v=zk1UaRlHwhg",
engtitle: "Hotel Transylvania 3: Summer Vacation",
year: "2018",
imdb:"6.3/10",
imdbvotes:"38849",
RottenTomato:"61",
RottenTomatoAudience:"0.47",
RottenTomatoAudienceVotes:"3024",
TAG: "",
StagePhoto: "",
poster:"https://farm2.staticflickr.com/1947/31322119838_daeacb8284_o.jpg"},
{
title: "一級玩家",
url:"https://www.youtube.com/watch?v=OGHaKGlklb0",
engtitle: "Ready Player One",
year: "2018",
imdb:"7.5/10",
imdbvotes:"288435",
RottenTomato:"72",
RottenTomatoAudience:"0.77",
RottenTomatoAudienceVotes:"23775",
TAG: "",
StagePhoto: "",
poster:"https://farm2.staticflickr.com/1942/44474017784_697218cc53_o.jpg"}]
scaleContent=1
if Utils.isPhone()
	scaleContent=0.65
# 	print "M"
else
	scaleContent=1
	
bg=new BackgroundLayer
	backgroundColor: "#F8FAFB"
	size: Screen.size
layerScroll=new ScrollComponent
	height: 820*scaleContent
	width: Screen.width
	scrollVertical: false
	scrollHorizontal:true
	mouseWheelEnabled:true
	contentInset:
		right: 250*scaleContent

# 	mouseWheelSpeedMultiplier:0.2
if Utils.isPhone()	
	layerScroll.y=5
else
	layerScroll.centerY()

i=0
color_black = new Color("Black").alpha(.125)
color_shadow1 = "rgba(0,0,0,0.2)"
color_shadow2 = "rgba(0,0,0,0.19)"
color_shadow3 = "rgba(0,0,0,0.1)"
color_shadow4 = "rgba(0,0,0,0.18)"
layerContent=new Layer
	parent:layerScroll.content
	height: 800*scaleContent
	width: movies.length*440*scaleContent+80*scaleContent
	backgroundColor: "#F8FAFB"

for item in movies
	card=new Layer
		width: 400*scaleContent
		height: 800*scaleContent
		backgroundColor: "#F8FAFB"
		parent:layerContent
		x: i*440*scaleContent+80*scaleContent
		clip: true
		borderRadius: 8
		borderWidth: 1
		borderColor: color_black

	card.states.nofocus=
		shadow1:
			y: 4
			x:0
			color:color_shadow1
			blur:8
		shadow2:
			y: 6
			x:0
			color:color_shadow2
			blur:20			
	card.states.focus=
		shadow1:
			y: 8
			x:0
			color:color_shadow3
			blur:18
		shadow2:
			y: 8
			x:0
			color:color_shadow4
			blur:8		
	
	card.stateSwitch("nofocus")
	card.on Events.MouseOver,->
		this.stateSwitch("focus")
	card.on Events.MouseOut,->
		this.stateSwitch("nofocus")
	imagePoster=new Layer
		width: 400*scaleContent
		height: 600*scaleContent
		y:0		
		backgroundColor:"Blue"
		parent:card
		image:item["poster"]
	cardBody=new Layer
		backgroundColor: "#F8FAFB"
		width: 400
		height:150
		parent: card
		y:imagePoster.maxY
	textTitle=new TextLayer
		text:item["title"]
		parent: cardBody
		color: "#414345"
		fontSize: 35*scaleContent
		fontFamily:"cwTeXHei"
		fontWeight: 600
		x:20
		y:20*scaleContent
		width: 360
		height: 50*scaleContent
		textOverflow: "ellipsis"
	engtextTitle=new TextLayer
		text:item["engtitle"]+" ("+item["year"]+")"
		parent: cardBody
		color: "#414345"
		fontFamily:"cwTeXHei"
		fontSize: 20*scaleContent
		fontWeight: 600
		x:20
		y:textTitle.maxY+5*scaleContent-10
		width: 360
		height: 30*scaleContent
		textOverflow: "ellipsis"
	roundPlay=new Layer
		width: 80
		height: 80
		borderRadius: 40
		backgroundColor: "#ff3d49"
		parent: card
		x:card.width-80-24
		midY: imagePoster.maxY
		name:"roundPlay"
		scale:scaleContent
	roundPlay.states.nofocus=
		shadow1:
			y: 4
			x:0
			color:color_shadow1
			blur:8
		shadow2:
			y: 6
			x:0
			color:color_shadow2
			blur:20			
	roundPlay.states.focus=
		shadow1:
			y: 8
			x:0
			color:color_shadow3
			blur:18
		shadow2:
			y: 8
			x:0
			color:color_shadow4
			blur:8		
	roundPlay.on Events.MouseOver,->
		this.stateSwitch("focus")
	roundPlay.on Events.MouseOut,->
		this.stateSwitch("nofocus")
	roundPlay.url=	item["url"]
	roundPlay.on Events.Click,->
		window.open(this.url, '_new')	
	roundPlay.stateSwitch("nofocus")		
	arrowFont=new TextLayer
		text:""
	#	text:"▶"
		font:"material"
		parent: roundPlay
		color: "White"
		fontSize: 55
		x:14
	arrowFont.centerY()		
	roundPlay.bringToFront()
	i=i+1		
	movieExtro=new Layer
		width: card.width
		height: 50
		parent: cardBody
		y:engtextTitle.maxY+10*scaleContent-10
		backgroundColor: "transparent"
# 		scale:scaleContent
	
	imDBLogo=new Layer
		image:"https://farm5.staticflickr.com/4818/32757114018_30ee81e78a_o.png"
		width: 40
		height: 40*0.4875
		parent:movieExtro
		x:20*scaleContent
		scale:scaleContent
		
	imDBV=item["imdb"] + " ("+ item["imdbvotes"]+ ") "
	imDBLogo.centerY()
	imDBText=new TextLayer
		text:imDBV
		parent:movieExtro
		fontFamily:"cwTeXHei"
		fontSize:16*scaleContent
		x:imDBLogo.maxX+10*scaleContent
		color:"gray"
		fontWeight: 900
		
	imDBText.centerY()

	
	rotternTomattoIcon=new Layer
		parent: movieExtro
# 		x:imDBText.maxX+10*scaleContent
		y:imDBLogo.maxY+10*scaleContent
		x:25*scaleContent
		width: 30
		height: 30
		scale:scaleContent
	rtIndex=new TextLayer
		text:item["RottenTomato"]
		parent:movieExtro
		fontFamily:"cwTeXHei"
		fontSize:16*scaleContent
# 		color:"#9FA7A9"
		color:"gray"
		fontWeight: 900
		x:rotternTomattoIcon.maxX+10*scaleContent
		y:imDBLogo.maxY+15*scaleContent
# 		backgroundColor: "rgba(170,121,66,1)"
# 		borderWidth: 1
# 		borderColor: "rgba(255,147,0,1)"
# 	rotternTomattoIcon.centerY()	
# 	rtIndex.centerY()

	audienceIcon=new Layer
		parent: movieExtro
		x:rtIndex.maxX+10*scaleContent
		y:imDBLogo.maxY+10*scaleContent
# 		x:25*scaleContent
		width: 30
		height: 30
		scale:scaleContent
	pv_audience="100%"
	if item["RottenTomatoAudience"]=="N/A"
		pv_audience="N/A"
	else
		pv_audience=Math.round(item["RottenTomatoAudience"]*100)+"% ("+item["RottenTomatoAudienceVotes"]+")"
	
	audienceValue=new TextLayer
		parent: movieExtro
		text:pv_audience
		fontFamily:"cwTeXHei"
		fontSize:16*scaleContent		
		x:audienceIcon.maxX+10*scaleContent
		y:imDBLogo.maxY+15*scaleContent
		color:"gray"
		fontWeight: 900	
# 		x:25*scaleContent



	opacityTag=true
	if item["TAG"]==""
		opacityTag=false
	
	layerTag=new Layer
		width: 80*scaleContent
		height: 40*scaleContent
		x:10
		y:cardBody.y-50*scaleContent
		backgroundColor: "Transparent"
		parent:card
		visible: opacityTag
		borderColor: "White"
		borderWidth: 1
		borderRadius: 5*scaleContent
		clip: true
	layerTagTxt=new TextLayer
		text:item["TAG"]
		parent:layerTag
		fontFamily:"cwTeXHei"
		fontSize:20*scaleContent
		color:"White"
	layerTagBG=new Layer
		width: layerTag.width
		height: layerTag.height
		opacity: 0.8
		backgroundColor: "Black"
		parent:layerTag
	layerTagTxt.bringToFront()	
	layerTagTxt.centerX()
	layerTagTxt.centerY()	
	rotternTomattoIcon.states.verified=
		image:"https://farm8.staticflickr.com/7852/44723806230_5bce3f9d4c_o.png"
		saturate:100
	rotternTomattoIcon.states.fresh=
		image:"https://farm8.staticflickr.com/7809/32667996658_933150e983_o.png"
		saturate:100		
	rotternTomattoIcon.states.rotten=
		image:"https://farm5.staticflickr.com/4860/45627556985_37d24cd21a_o.png"
		saturate:100		 
	rotternTomattoIcon.states.null=
		image:"https://farm8.staticflickr.com/7809/32667996658_933150e983_o.png"
		saturate:0
	audienceIcon.states.want=
		image:"http://farm8.static.flickr.com/7902/40243141003_872e402ca3_o.png"
		saturate:100
	audienceIcon.states.nowant=
		image:"http://farm8.static.flickr.com/7892/33332434148_f52ccbd431_o.png"
		saturate:100		
	audienceIcon.states.na=
		image:"http://farm8.static.flickr.com/7902/40243141003_872e402ca3_o.png"
		saturate:0
	audienceIcon.stateSwitch("want")
	
	if item["RottenTomatoAudience"]=="N/A"
		audienceIcon.stateSwitch("na")
	else
		getRTRate=item["RottenTomatoAudience"]
			
		if getRTRate<0.6
			audienceIcon.stateSwitch("nowant")

		else
			audienceIcon.stateSwitch("want")		
	rotternTomattoIcon.stateSwitch("fresh")
	if item["RottenTomato"]=="N/A"
		rotternTomattoIcon.stateSwitch("null")
	else
		getRTRate=item["RottenTomato"].indexOf("%")
		getV=0
		if getRTRate==-1
			getV=item["RottenTomato"]
		else
			getV=item["RottenTomato"].substr(0,item["RottenTomato"].indexOf("%"))
	
		if getV<=59
			rotternTomattoIcon.stateSwitch("rotten")
		else if getV>=75
			rotternTomattoIcon.stateSwitch("verified")
		else
			rotternTomattoIcon.stateSwitch("fresh")	