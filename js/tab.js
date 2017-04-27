// JavaScript Document


function tab(){
		//滚轮背景图切换�
		(function(){
			var oDiv=document.getElementById('body_bg');
			var aSpan=oDiv.children;
			var C=7;
			var R=5;
			var W=oDiv.offsetWidth;
			var H=oDiv.offsetHeight;
			var w=W/C;
			var h=H/R;
			var iNow=0;
			var bOk=false;
			oDiv.style.backgroundSize=W+'px '+H+'px';
			for(var i=0;i<R;i++){
				for(var j=0;j<C;j++){
					var oSpan=document.createElement('span');
					var oI=document.createElement('i');
					oI.style.width=W+'px';
					oI.style.height=H+'px';
					oI.style.backgroundSize=W+'px '+H+'px';
					oI.style.left=-j*w+'px';
					oI.style.top=(-i*h)+'px';
					oSpan.appendChild(oI);
					oSpan.style.width=w+'px';
					oSpan.style.height=h+'px';
					oSpan.style.left=j*w+'px';
					oSpan.style.top=i*h+'px';
					oSpan.i=i;
					oSpan.j=j;			
					oDiv.appendChild(oSpan);		
				}	
			}
			var aI=oDiv.getElementsByTagName('i');
			window.onresize=function(){
				W=oDiv.offsetWidth;
				H=oDiv.offsetHeight;
				w=W/C;
				h=H/R;
				var n=-1;
				oDiv.style.backgroundSize=W+'px '+H+'px';
				for(var i=0;i<aSpan.length;i++){
					aI[i].style.width=W+'px';
					aI[i].style.height=H+'px';
					aI[i].style.backgroundSize=W+'px '+H+'px';
					aSpan[i].style.width=w+'px';
					aSpan[i].style.height=h+'px';
					if(i%C==0)n++;
					aI[i].style.left=-(i%C)*w+'px';
					aI[i].style.top=-(n*h)+'px';
					aSpan[i].style.left=i%C*w+'px';
					aSpan[i].style.top=n*h+'px';	
				}
			};
			;(function(){
				var oH_list=document.getElementById('html_list');
				var oH_img=document.getElementById('html_img');
				var oJ_list=document.getElementById('js_list');
				var oJ_img=document.getElementById('js_img');
				var oPerson_list=document.getElementById('person_lsit');
				var oPerson_img=document.getElementById('person_img');
				var oUl=document.getElementById('nav-p');
				var aLi=oUl.children;
				var oBox=document.getElementById('nav');
				var aMain=getByClass(document,'main');
				var oFixed=document.getElementById('fixed');
				var h=oFixed.offsetHeight;
				var oLogo=document.getElementById('logo');
				var nMaxT=oLogo.offsetHeight+oLogo.getBoundingClientRect().top;
				var left=0;
				var aA=oFixed.children;
				var timer2=null;
				var timer=null;
				var bScroll=false;
				function toMove(){
					clearInterval(timer2);
					timer2=setInterval(function(){
						left+=5;
						oLogo.style.backgroundPosition=((left%700)-700)%700+'px';	
					},30);	
				}
				toMove(); /*导航处字体渐变效果*/
				for(var i=0;i<aLi.length-1;i++){
					aLi[i].onmouseenter=function(){
						startMove(oBox,this.offsetLeft+12);
					};
					aLi[i].onmouseleave=function(){
						startMove(oBox,12);
					};
					(function(index){
						aLi[i].onclick=function(){
							scroll2(index);	
						};
					})(i);			
				}
				
				for(var i=0;i<aA.length;i++){
					(function(index){
						aA[i].onclick=function(){
							scroll2(index);	
						};	
					})(i);	
				}
				
				function scroll2(index){
					iNow=index;
					clearInterval(timer);
					var n=0;
					var count=Math.floor(1000/30);
					var start=document.documentElement.scrollTop||document.body.scrollTop;
					var iTarget=aMain[index].offsetTop;
					var dis=iTarget-start;
					timer=setInterval(function(){
						bScroll=false;
						n++;
						var a=1-n/count;
						var top=start+dis*(1-Math.pow(a,3));
						document.documentElement.scrollTop=document.body.scrollTop=top;
						if(n==count){
							clearInterval(timer);
							changeBg();		
						}	
					},30);	
				}
					
				window.onscroll=function(){
					if(bScroll){
						clearInterval(timer);
					}
					bScroll=true;
					var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
					var top=scrollT+document.documentElement.clientHeight;
					var winH=document.documentElement.clientHeight;
					var t=(winH-h)/2+scrollT;
					if(scrollT>nMaxT){
						clearInterval(timer2);	
					}else{
						toMove();	
					}
					if(scrollT>=160){
						move(oFixed,{opacity:1,top:t},{easing:Tween.Circ.easeOut,duration:1000});	
					}else{
						move(oFixed,{opacity:0},{duration:1000});	
					}
					if(top>=1650){
						move(oH_list,{left:160},{duration:2000,easing:Tween.Elastic.easeOut});
						move(oH_img,{top:50},{duration:2000,easing:Tween.Elastic.easeOut});
					}
					if(top>=2200){
						move(oJ_list,{right:120},{duration:2000,easing:Tween.Elastic.easeOut});
						move(oJ_img,{bottom:80},{duration:2000,easing:Tween.Elastic.easeOut});	
					}
					if(top>=2750){
						move(oPerson_list,{top:50},{duration:2000,easing:Tween.Elastic.easeOut});
						move(oPerson_img,{right:120},{duration:2000,easing:Tween.Elastic.easeOut});	
					}	
				};	
			})();
			//改变背景
			function changeBg(){
				if(bOk)return;
				bOk=true;
				for(var i=0;i<aSpan.length;i++){
					aSpan[i].style.opacity=0;
						
				}
				for(var i=0;i<aSpan.length;i++){
					(function(index){
						setTimeout(function(){
							move(aSpan[index],{opacity:1},{complete:function(){
								if(index==aSpan.length-1){
									
									bOk=false;	
								}	
							}});	
						},(aSpan[index].i+aSpan[index].j)*100);	
					})(i);	
				}	
			}
		})();
		//轮播图
		(function(){
			var oUl=document.getElementById('ul1');
			var oOl=document.getElementById('ol1');
			var aLi=oUl.children;
			//aSpan为小滑块移动效果
			var aSpan=oOl.getElementsByTagName('span');
			var left=0;
			var iNow=0;
			var w1=aLi[0].offsetWidth;
			
			var w2=aSpan[0].parentNode.offsetWidth;
			//增加一份内容
			oUl.innerHTML+=oUl.innerHTML;
			oUl.style.width=w1*aLi.length+'px';
			var W=oUl.offsetWidth/2;
			function next(){
				for(var i=0;i<aSpan.length;i++){
					aSpan[i].style.width=0;	
				}
				move(aSpan[iNow%aSpan.length],{width:w2},{duration:2000,complete:function(){
					iNow++;
					
					toGo(oUl,-w1*iNow,next);	
				}});
			}
			next();
			window.toGo=function(obj,iTarget,end){
				var start=left;
				var dis=iTarget-start;
				var n=0;
				var count=Math.floor(1000/30);
				clearInterval(obj.timer);
				obj.timer=setInterval(function(){
					n++;
					var a=1-n/count;
					left=start+dis*(1-Math.pow(a,3));
					obj.style.left=left%W+'px';
					if(n==count){
						clearInterval(obj.timer);
						end&&end();	
					}	
				},30);	
			}
		})();
		//头部导航
		(function(global){
			var left=0;
			var iSpeed=0;
			var timer=null;
			global.startMove=function(obj,iTarget){
				clearInterval(timer);
				timer=setInterval(function(){
					iSpeed+=(iTarget-obj.offsetLeft)/5;
					iSpeed*=0.7;
		
					left+=iSpeed;
					obj.style.left=left+'px';
		
					if(Math.round(left)==iTarget && Math.round(iSpeed)==0){
						clearInterval(timer);
					}
				},30);
			};
		})(window);
		
			
	};
