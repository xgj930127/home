// JavaScript Document

function move(obj,json,options){
		options=options||{};
		options.time=options.time||'700';
		options.type=options.type||'ease-out';
		var star={};
		var dis={};
		for(var name in json){
			star[name]=parseFloat(getStyle(obj,name));
			if(isNaN(star[name])){
				switch(star[name]){
					case'width':
					star[name]=obj.offsetWidth;
					break;
					case'height':
					star[name]=obj.offsetHeight;
					break;
					case'top':
					star[name]=obj.offsetTop;
					break;
					case'left':
					star[name]=obj.offsetLeft;
					break;
					case'opacity':
					star[name]=1;
					break;	
				}	
			}
			dis[name]=json[name]-star[name];	
		}
		var count=Math.floor(options.time/30);
		var n=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			for(var name in json){
				switch(options.type){
				case'linear':
					var a=n/count;
					var cur=star[name]+dis[name]*a;
				break;
				case'ease-in':
					var a=n/count;
					var cur=star[name]+dis[name]*a*a*a;
				break;
				case'ease-out':
					var a=1-n/count;
					var cur=star[name]+dis[name]*(1-a*a*a);
				break;	
				}
				if(name=='opacity'){
					obj.style[name]=cur;
					obj.style.filter='alpha(opacity:'+(cur)*100+')'	
				}else{
					obj.style[name]=cur+'px';	
				}	
			}
			if(n==count){
				clearInterval(obj.timer);
				options.complete&&options.complete();	
			}	
	},30);	
};