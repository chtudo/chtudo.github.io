---
layout: page
title: "看片金與片架串連"
sideNavId: designopeningasscociate
pageDescription: "本章會介紹開機時若有看片金獲得訊息的介面說明、流程規則、遙控器對應操作"
titleImage: "https://farm8.staticflickr.com/7041/26760580844_abe707e7f9_o.png"
nextSessionTitle: "開機頻道訊息通知"
nextSessionLink: "/messageinchannel"
nextSessionDescription: "下一章會介紹開機時若設定在頻道，若有看片金獲得訊息的介面說明、流程規則、遙控器對應操作"
nextSessionImage: "https://farm8.staticflickr.com/7383/27688058812_7f43ab0a9b_o.png"

---

<div id="Overview"></div>
                
## Overview

當客戶擁有看片金(看片金總餘額大於0)，在首頁片架區進行提醒，會更能降低客戶對於單點電影的門檻以及發揮與告知看片金效益。若看片金為0，則不需要顯示提醒串連。


<div id="介面說明"></div>
                
## 介面說明

為一單純明顯的底色，上面有資訊為『用看片金立馬看強片！』。而為免造成區塊常駐視覺困擾，使用動畫處理。

![image](https://farm8.staticflickr.com/7314/27176442734_b06f71beaf_o.png)

1) 串連資訊區塊，提示『用看片金立馬看強片』。顯示於單點推薦區。  

            
<div id="操作說明"></div>            
            
## 操作說明  

如下圖中所示黃色區塊，規則為  
1) 開機後，從左下放大到右上，然後縮小到左下角，每次顯示20秒，縮回後間隔20秒。  
2) 按下Y鍵連結到看片金專區，第一階段可以設定為看片金使用記錄。  
3) 若為0元看片金，看片金餘額＝0，且無活動，顯示”看片金專區”，無需出現黃色區塊提醒。    
4) 若有提示看片金逾期的訊息Popup時，以隱藏(停止動畫排程)處理，避免同時出現兩個訊息會疊在一起。
 
<div id="Prototyping"></div>            

## Prototyping
如下連結，可以看到看片金逾期提示，與片架看片金串連的互動方式。
[http://share.framerjs.com/szl4iu7bqz4o/](http://share.framerjs.com/szl4iu7bqz4o/)

<div id="資訊維運"></div> 
           
## 資訊維運
1)由系統判斷，無需特別資訊維護需求。

<div id="遙控器對應"></div>            
            
## 遙控器對應

![image](https://c2.staticflickr.com/8/7184/27590008230_1e7c4e6473_b.jpg)
