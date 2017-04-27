// JavaScript Document



	 //照片墙效果
	 function show(){
		var oUl=document.getElementById('products_con').children[0];
		var oBtn=document.getElementById('btn');
		var aLi=oUl.children;
		var w=aLi[0].offsetWidth;
		// alert(w);
		var h=aLi[0].offsetHeight;
		var zIndex=1;
		var aPos=[];
		for(var i=0;i<aLi.length;i++){
			aPos.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop});
			aLi[i].index=i;
			enter(aLi[i]);
			leave(aLi[i]);			
		}
		//布局转换
		for(var i=0;i<aLi.length;i++){
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';
			aLi[i].style.position='absolute';
			aLi[i].style.margin=0;	
		}
		oBtn.onmousedown=function(){
			return false;	
		};
		
		oBtn.onclick=function(){
			aPos.sort(function(){
				return Math.random()-0.5;	
			});	
			for(var i=0;i<aLi.length;i++){
				move(aLi[i],aPos[aLi[i].index]);
			}
		};
		
		function enter(obj){
			obj.onmouseover=function(ev){
				var oEvent=ev||event;
				var oSpan=obj.getElementsByTagName('span')[0];
				var oFrom=oEvent.fromElement||oEvent.relatedTarget;
				if(obj.contains(oFrom))return;
				var n=getN(obj,oEvent);
				switch(n){
					case 0:
						oSpan.style.left=w+'px';
						oSpan.style.top=0;
						break;
					case 1:
						oSpan.style.left=w+'px';
						oSpan.style.top=h+'px';
						break;
					case 2:
						oSpan.style.left=0;
						oSpan.style.top=h+'px';
						break;
					case 3:
						oSpan.style.left=-w+'px';
						oSpan.style.top=h+'px';
						break;
					case 4:
						oSpan.style.left=-w+'px';
						oSpan.style.top=0;
						break;
					case 5:
						oSpan.style.left=-w+'px';
						oSpan.style.top=-h+'px';
						break;
					case 6:
						oSpan.style.left=0;
						oSpan.style.top=-h+'px';
						break;
					case 7:
						oSpan.style.left=w+'px';
						oSpan.style.top=-h+'px';
						break;
						
							
				}
				move(oSpan,{left:0,top:0});		
			};	
		}
		
		function leave(obj){
			obj.onmouseout=function(ev){
				var oEvent=ev||event;
				var oTo=oEvent.toElement||oEvent.relatedTarget;
				if(obj.contains(oTo))return;
				var n=getN(obj,oEvent);
				var oSpan=obj.getElementsByTagName('span')[0];
				switch(n){
					case 0:
						move(oSpan,{left:w,top:0});
						break;
					case 1:
						move(oSpan,{left:w,top:h});
						break;
					case 2:
						move(oSpan,{top:h,left:0});
						break;
					case 3:
						move(oSpan,{left:-w,top:h});
						break;
					case 4:
						move(oSpan,{left:-w,top:0});
						break;
					case 5:
						move(oSpan,{left:-w,top:-h});
						break;
					case 6:
						move(oSpan,{top:-h,left:0});
						break;
					case 7:
						move(oSpan,{left:w,top:-h});
						break;	
				}	
			};	
		}			
	};	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
