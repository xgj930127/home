// JavaScript Document

(function(){
			var arr=['夜的钢琴曲','单车','浮夸','明年今日','人来人往','一丝不挂'];
			var oMusic=document.getElementById('music');
			var oV=document.getElementById('v1');
			var aLi=oMusic.getElementsByTagName('li');
			var oB=getByClass(aLi[5],'drag')[0];
			var oI=getByClass(aLi[5],'s_link')[0];
			var oP=oMusic.getElementsByTagName('p')[0];
			var nMaxL=aLi[5].offsetWidth-oB.offsetWidth;
			var oldW=oMusic.offsetWidth;
			var oldL=oMusic.offsetLeft;
			var n=0;
			var bShow=true;
			var bOk=true;
			oP.innerHTML=decodeURIComponent(oV.src).match(/[\u4e00-\u9fa5]+/g);
			aLi[0].onclick=function(){
				if(bShow){
					oMusic.style.overflow='hidden';
					move(oMusic,{width:this.offsetWidth,left:oldL});	
				}else{
					move(oMusic,{width:oldW},{complete:function(){
						oMusic.style.overflow='';	
					}});	
				}
				bShow=!bShow;	
			};
			oV.onended=function(){
				n++;
				if(n<0){
					oV.src='music/'+arr[[n%arr.length+arr.length]%arr.length]+'.mp3';
					oP.innerHTML=arr[[n%arr.length+arr.length]%arr.length];	
				}else{
					oV.src='music/'+arr[n%arr.length]+'.mp3';
					oP.innerHTML=arr[n%arr.length];	
				}	
			};
			for(var i=1;i<aLi.length-1;i++){
				aLi[i].onmouseover=function(){
					move(oP,{opacity:1});	
				};
				aLi[i].onmouseout=function(){
					move(oP,{opacity:0});	
				};	
			}
			aLi[2].onclick=function(){
				if(bOk){
					oV.pause();
					this.children[0].style.background='url(images/music_c2.png)';	
				}else{
					oV.play();
					this.children[0].style.background='url(images/music_c1.png)';	
				}
				bOk=!bOk;	
			};
			aLi[3].onclick=function(){
				n++;
				if(n<0){
					oV.src='music/'+arr[[n%arr.length+arr.length]%arr.length]+'.mp3';
					oP.innerHTML=arr[[n%arr.length+arr.length]%arr.length];	
				}else{
					oV.src='music/'+arr[n%arr.length]+'.mp3';
					oP.innerHTML=arr[n%arr.length];	
				}	
			};
			aLi[1].onclick=function(){
				n--;
				if(n<0){
					oV.src='music/'+arr[[n%arr.length+arr.length]%arr.length]+'.mp3';
					oP.innerHTML=arr[[n%arr.length+arr.length]%arr.length];	
				}else{
					oV.src='music/'+arr[n%arr.length]+'.mp3';
					oP.innerHTML=arr[n%arr.length];	
				}
			};
			aLi[4].onclick=function(){
				if(oV.muted){
					oV.muted=false;
					this.children[0].style.background='url(images/music_e1.png)';	
				}else{
					oV.muted=true;
					this.children[0].style.background='url(images/music_e2.png)';	
				}	
			};
			oB.onmousedown=function(ev){
				var oEvent=ev||event;
				var disX=oEvent.clientX-oB.offsetLeft;
				document.onmousemove=function(ev){
					var oEvent=ev||event;
					var left=oEvent.clientX-disX;
					setSound(left);	
				};
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
					oB.releaseCapture&&oB.releaseCapture();	
				};
				oB.setCapture&&oB.setCapture();
				return false;	
			};
			function setSound(left){
				if(left<=0){
					left=0;	
					oV.muted=true;
					aLi[4].children[0].style.background='url(images/music_e2.png)';
				}else{
					oV.muted=false;
					aLi[4].children[0].style.background='url(images/music_e1.png)';	
				}
				if(left>=nMaxL){
					left=nMaxL;	
				}
				var Scale=left/nMaxL;
				oV.volume=Scale;
				oI.style.width=left+'px';
				oB.style.left=left+'px';	
			}
			aLi[5].onclick=function(ev){
				var oEvent=ev||event;
				var left=oEvent.clientX-this.getBoundingClientRect().left;
				setSound(left);	
			};	
		})();