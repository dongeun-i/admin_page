/**
	핵심 소스를 편리하게 이용하기 위한 프로토타입 확장 기술
	@author sjeg, deepcross.
	@since 2016
	@update 2021-07-16
 */
	(function(){

		// #1. 각 자료형 객체의 프로토타입 확장
		if(String&&String.prototype){
			/** 지정한 자릿수만큼 채우기
				@getter 원본(this)에는 영향 없음
				@param {Number}sz 목표 길이. 음수인 경우 앞부분을 채우라는 뜻으로 인식.
				@param {String}alt 목표 길이까지 채울 때 쓰일 문자
				@return {String} 목표 길이만큼 채우거나 자른 결과
			 */
			String.prototype.fill = function(sz,alt){var str=this;sz=typeof sz=="number"?parseInt(sz):str.length;alt=alt!=null?String(alt):"";if(alt.length<1)alt=" ";while(str.length<Math.abs(sz))str=(sz<=0?alt:"")+str+(sz>=0?alt:"");str=str.substr(sz<0?(str.length+sz):0,Math.abs(sz));return str;};
			/** {Number}.toComma 의 역함수
				@return {Number}
				@see Number.prototype.toComma
			 */
			String.prototype.toNumber = function(){var i,str="",dotFound=false,ch;for(i=0;i<this.length;i++)if(((ch=this.charCodeAt(i))&&!1)||(48<=ch&&ch<58)||(ch==46&&(function(){var r=dotFound;dotFound=!0;return !r;})())||(ch==45&&str==""))str+=this[i];return Number(str);};
			/** 여러개의 문자열 중 가장 먼저 발견되는 문자열의 위치
				@param {Array}ss 찾고자 하는 문자열 후보
				@return {Number} 가장 먼저 발견된 위치, 모두 발견되지 않았으면 null.
			 */
			String.prototype.minIndexOf = function(ss,skip){var res=null,r=-1,i;for(i in ss)if(1+(r=this.indexOf(ss[i],skip)))if(res===null||res>r)res=r;return res;};
			/** bp자리 이후 bb와 ee 사이의 문자열 추출 */
			String.prototype.between = function(bb,ee,bp){ var pos,str=this;bp=bp||0;if(bp>str.length)str="";else str=str.substr(bp);if((pos=str.indexOf(bb))<0)return null;else str=str.substr(pos+bb.length);if((pos=str.indexOf(ee))<0)return null;else return str.substr(0,pos); }
			/** */
			if(window && window.decodeURIComponent){
				if(!window.decodeURIComponentWithoutPlus) window.decodeURIComponentWithoutPlus = window.decodeURIComponent;
				window.decodeURIComponent = function(str){ if(str==null)return "";return window.decodeURIComponentWithoutPlus(String(str).replace(/\+/g," ")) }
			}
		}
		if(Number&&Number.prototype){
			/** 쉼표스타일로 변환
				@param {Number}bottomDigitIn 소숫점 자릿수 고정 길이 (null : 원본에 있는 그대로)
				@return {String}
			 */
			Number.prototype.toComma = function(bottomDigitIn){var i,str=""+Math.abs(this),pos=(str+".").indexOf("."),bottomDigit=bottomDigitIn,isMinus=(this<0);if((bottomDigit=parseInt(bottomDigit))<0)bottomDigit=0;else if(bottomDigit>=0);else bottomDigit=str.length;var top=str.substr(0,pos),bottom=str.substr(pos+1,bottomDigit);for(i=bottom.length;i<bottomDigitIn;i++)bottom+="0";for(i=top.length-3;i>0;i-=3)top=top.substr(0,i)+","+top.substr(i);return (isMinus?'-':'')+top+(bottom!=""?"."+bottom:"");};
			/** 한글표현으로 변환
				@param {Number}lv 변환수준 ( "12만3456" vs "일십이만삼천사백오십육" )
				@return {String}
			 */
			Number.prototype.toKorean = function(lv){var i,r="",temp="",ch,val=""+this,arrNum=["","일","이","삼","사","오","육","칠","팔","구"],arrUnit=["","십","백","천"],arrUnitX=["","만","억","조","경","해","자","양","구","간","정","재","극","항하사","아승기","나유타","불가사의","무량대수","？무량대수","？？무량대수","？？？무량대수","？？？？무량대수","？？？？？무량대수"];switch(""+lv){case "1":if(isNaN(this))return "영";for(i=0;i<val.length;i++){if((ch=val.substr(val.length-i-1,1))=="-"){r="음 "+r;break;}if(i%arrUnit.length==0) temp=arrUnitX[parseInt(i/arrUnit.length)]+(r?" ":"");if(ch!="0")ch=arrNum[eval(ch)]+arrUnit[i%arrUnit.length];else ch="";temp=ch+temp;if(ch!=""){r=temp+r;temp="";}}return r||"영";default:if(isNaN(this))return "0";for(i=0;i<val.length;i++){if((ch=val.substr(val.length-i-1,1))=="-"){r="-"+r;break;}if(i%arrUnit.length==0)temp=arrUnitX[parseInt(i/arrUnit.length)];temp=ch+temp;if(ch!="0"){r=temp+r;temp="";}}return r||"0";}}
	
			if(!Number.prototype._DO_toString) Number.prototype._DO_toString = Number.prototype.toString;
			Number.prototype.toString = function(arg){
				if(typeof arg!='number') return this._DO_toString(arg)
				if(arg>36);else return this._DO_toString(arg)
				try{
					return this._DO_toString(arg);
				}catch(e){
					if(arg>62) throw e;
					let str = "", n=Math.abs(Math.floor(this));
					while(n>0){
						let m = n%arg, c=null;
						n = Math.floor(n/arg);
						if(!c && m<10) c=String.fromCharCode(48+m); else m-=10;	// 10
						if(!c && m<26) c=String.fromCharCode(97+m); else m-=26;	// 10+26 = 36
						if(!c && m<26) c=String.fromCharCode(65+m); else m-=26;	// 36+26 = 62
						str=(c||" ")+str;
					}
					return (Math.sign(this)<0?"-":"") + (str||"0");
				}
			}
		}
		if(Date&&Date.prototype){
			/** 새로운 날짜를 생성
				@constructor
				@param {Date}d 복제할 원본 날짜 객체
				@param {Number}d 1900-01-01 00:00:00(UTC)로부터 경과한 밀리초.
				@param {String}d 형식화된 날짜 (인식가능형식:
					yyyy-mm-dd hh:ii:ss
				)
			*/
			Date.new = function(d){var D;if("number"==typeof d)if(isNaN(d))d=null;else return (D=new Date()).setTime(d)&&!1||D;if(d==null)return (new Date());D=new Date(d);if(D.getDay()>0)return (d.length==10?D.setHours(0):null)&&!1||D;d+="";D=new Date();D.setDate(1);if(""+Number(d.substr(0,1))!=d.substr(0,1))d=d.substr(11,4)+"-"+{'Jan':"01",'Feb':"02",'Mar':"03",'Apr':"04",'May':"05",'Jun':"06",'Jul':"07",'Aug':"08",'Sep':"09",'Oct':"10",'Nov':"11",'Dec':"12"}[d.substr(4,3)]+"-"+d.substr(8,2)+" "+d.substr(16,8);D.setYear(Number(d.substr(0,4)));D.setMonth(Number(d.substr(5,2))-1);D.setDate(Number(d.substr(8,2)));if(d.length>11)D.setHours(Number(d.substr(11,2)));else D.setHours(0);
			if(d.length>14)D.setMinutes(Number(d.substr(14,2)));else D.setMinutes(0);if(d.length>17)D.setSeconds(Number(d.substr(17,2)));else D.setSeconds(0);return D;}// ymdhis is ok , but ymd cause error , why
			/** 밀리초 단위 증감
				@setter 원본(this)이 변경됨.
				@return {Date}this
			 */
			Date.prototype.addTime = function(v){if(isNaN(v)||"number"!=typeof v)return null;else this.setTime(this.getTime()+parseInt(v));return this;};
			/** 일 단위 증감
				@setter 원본(this)이 변경됨.
				@return {Date}this
			 */
			Date.prototype.addDate = function(v){this.addTime(v*86400000);return this;};
			/** 형식화된 문자열을 추출
				@getter 원본(this)에는 영향 없음.
				@param {String}fS 날짜 형식 정의(기본값="Y-M-D H:I:S")(연도부터 밀리초까지 순서대로 YyMmDdHhIiSsLl 이며, 대문자는 자릿수 고정)
				@return {String}
			 */
			Date.prototype.toFormat = function(fS){var v,d=this,dS=fS;dS=dS||"Y-M-D H:I:S";dS=dS.replace(/Y/g,d.getFullYear());dS=dS.replace(/y/g,d.getYear());v=d.getMonth()+1;dS=dS.replace(/m/g,v);if(v<10)v='0'+v;dS=dS.replace(/M/g,v);v=d.getDate();dS=dS.replace(/d/g,v);if(v<10)v='0'+v;dS=dS.replace(/D/g,v);v=d.getHours()%12;dS=dS.replace(/h/g,v);v=d.getHours();if(v<10)v='0'+v;dS=dS.replace(/H/g,v);v=d.getMinutes();dS=dS.replace(/i/g,v);if(v<10)v='0'+v;dS=dS.replace(/I/g,v);v=d.getSeconds();dS=dS.replace(/s/g,v);if(v<10)v='0'+v;dS=dS.replace(/S/g,v);v=d.getTime()%1000;dS=dS.replace(/l/g,v);if(v<100)v='0'+v;if(v<10)v='0'+v;dS=dS.replace(/L/g,v);return dS;};
			/** 자정시각으로 변환하여 추출
				@getter 원본(this)에는 영향 없음.
				@param {Number}TZH 시간대 Timezone 설정
				@return {Date}
			 */
			Date.prototype.getMidnight = function(TZH){var D=Date.new(this);D.setMidnight(TZH);return D;}
			/** 자정으로 변환
				@setter 원본(this)이 변경됨.
				@return {Date}this
			 */
			Date.prototype.setMidnight = function(TZH){TZH=TZH||(-Date.new().getTimezoneOffset()/60);this.setTime(this.getTime()-(this.getTime()+3600000*TZH)%86400000);return this;};
			/** 지정한 날짜와 본 원본 간 시제관계 확인
				@param {Date|String|Number}d 비교대상 (null = 현재)
				@return {Number} this가 param보다 미래일 때 +1, 아니면 -1, 같으면 0, 정상이 아니면 null
				@see Date.new
			 */
			Date.prototype.getTense = function(d){d=Date.new(d).getTime()-this.getTime();if(d<0)return 1;else if(d==0)return 0;else if(d>0)return -1;else return null;}	// past=(-) // future=(+)
			/** 날짜 형식 변환상태 검증
				@param {String}dt 형식화된 날짜표현 ex="2018-01-01 21:30:59"
				@param {String}fs 형식 정의 ex="Y-M-D H:I:S"
				@return {Boolean} 주어진 형식대로 잘 변환된 상태인지 여부
			 */
			Date.verifyFormat = function(dt,fs){	if(typeof dt.getTime+typeof dt.toFormat!="functionfunction")return dt==(Date.new(""+dt)).toFormat(fs); else return dt.getTime()==Date.new(dt.toFormat(fs)).getTime();	};
		}
		if(Boolean&&Boolean.prototype){
			Boolean._parse = Boolean._parse || (typeof Boolean.parse == 'function' ? Boolean.parse : function(v){ return Boolean(v); })
			Boolean.parse = function(v){
				if(v==null) return false;
				if(typeof Buffer != 'undefined' && v instanceof Buffer) return v.length>0 && Boolean._parse(v[0]);
				if(/false/i.test(v)) return false;
				else return Boolean._parse(v);
			}
		}
	
		// 프로토타입 변경이 불가능한 경우 = 실제 데이터와 뒤섞여 보이지 않도록
		if(typeof Array!=='undefined'){
			// get:extract
			Array.getRandom = function(a){ if("object"!=typeof a||!a.indexOf)return null;return a[parseInt(Math.random()*a.length)]; };
			Array.new = function(sz,v){ var i,r=[];sz=parseInt(sz);if(sz>=0);else sz=(typeof v!=='function'?1:0);for(i=0;i<sz;i++)r.push(typeof v=='function'?v(i):null);return r;};
			/** @getter 배열의 앞뒤를 뒤집어놓은 새로운 배열을 생성하여 반환
				@return {Array}
			 */
			Array.reverse = function(a){ var ret=[]; if(!Array.isArray(a))return null; a.map(function(v){ ret.unshift(v); }); return ret; };
		}
		if(typeof Object!=='undefined'){
			// conversion
			Object.toQuerystring = function(obj){var a=[];for(var k in obj){a[a.length]=encodeURIComponent(k)+"=";if(obj[k]==null);else if(typeof obj[k]=='object')a[a.length-1]+=encodeURIComponent(JSON.stringify(obj[k]));else a[a.length-1]+=encodeURIComponent(obj[k])}return a.join("&")};
			Object.fromQuerystring = function(str, enc){
				var raw = String(str).replace(/^.*\?/,"");
				var params = {};
				function decode(str){
					let Iconv = null;
					try{Iconv=require('iconv-lite')}catch(e){console.warn(e);return encodeURIComponent(str);}
					buff = Buffer.from((str.match(/%[0-9a-f]{2}|[^%]/ig)||[]).map(c=>/^%/.test(c)?parseInt(c.substr(1),16):c.charCodeAt(0)));
					return Iconv.decode(buff, enc).toString();
				}
				raw.split("&").map(function(str){
					var raw = str.split("=");
					var key = raw[0];
					var val = raw[1]==null? true: raw[1];
					if(typeof val=='string'){
						if(val.indexOf(",")>=0)
							val = val.split(",").map(function(chunk){
								return (enc?decode:decodeURIComponent)(chunk);
							});
						else
							val = (enc?decode:decodeURIComponent)(val);
					}
					if(params[key] == null)
						params[key] = val;
					else if(Array.isArray(params[key]))
						params[key].push(val);
					else
						params[key] = [params[key], val];
				});
				return params;
			};;
			/** @return {Object} it will only includes members which are retuning TRUE from {Function}fn( value, key ). it can be not only function but also array of keys. */
			Object.filter = function(obj,fn){
				if(Array.isArray(fn)) return Object.filter(obj,function(v,k){ return fn.includes(k); });
				var ret = {}; Object.keys(obj).map(function(k){ if(fn(obj[k],k)) ret[k] = obj[k]; }); return ret;  }
			Object.map = function(obj,fn,idKey){if(!idKey){var res={};if("function"!=typeof fn)throw "argument 2 must be a function";for(var k in obj)res[k]=fn(k,obj[k]);return res;}else{idKey=String(idKey);var res=[];if("function"!=typeof fn)throw "argument 2 must be a function";for(var k in obj){if("object"==typeof obj[k])obj[k][idKey]=k;res.push(fn(obj[k]));}return res;}}
			// set:modify
			Object.feed = function(mainObject,feed,force){if("object"!=typeof mainObject||"object"!=typeof feed)return mainObject;for(var k in feed){if("object"==typeof feed[k])mainObject[k]=Object.feed(mainObject[k],feed[k],force);else if(force||mainObject[k]===undefined) mainObject[k]=feed[k];}return mainObject;};
			Object.swap = function(objA,objB){var objX={};for(var k in objA)if(objB[k]===undefined){objX[k]=objA[k];delete objA[k];}for(var k in objB){objX[k]=objA[k];objA[k]=objB[k];if(objX[k]!==undefined)objB[k]=objX[k];else delete objB[k];delete objX[k];}for(var k in objX){objB[k]=objX[k];delete objX[k];}};
			// debug
			Object.explore = function(obj,deep){if("number"!=typeof deep||isNaN(deep)||parseInt(deep=(deep))<0) deep=0;var _go = function(obj,deepRemain,depth){
				var str="",k;if("object"!=typeof obj)return ('-').repeat(depth)+"["+typeof obj+"] "+obj+"\n";else if(depth==0) str="[object]\n";for(k in obj){str+=(('-').repeat(depth+1)+"[%1] %2\n").replace('%1',typeof obj[k]).replace('%2',k)+("object"==typeof obj[k]?(deepRemain?_go(obj[k],deepRemain-1,depth+1):(('-').repeat(depth+2)+" ...\n")):"")}return str;
				};return _go(obj,deep,0);};
			Object.mapDeep = function(obj,fn,fnCircular){
				const accessedObjs=[],accessedRes=[],r=(obj,paths)=>{
					if(obj && typeof obj=='object'){
						let i = accessedObjs.indexOf(obj), res=Array.isArray(obj)?[]:{};
						if(1+i) return typeof(fnCircular)=='function' ? fnCircular(obj,paths) : accessedRes(i);
						else{ accessedObjs.push(obj); accessedRes.push(res); }
						fn(obj,paths);
						if(Array.isArray(obj)) return res.concat(obj.map((x,i)=>r(x,paths.concat(i)))), res;
						else return Object.assign(res, Object.fromEntries(Object.entries(obj).map(([k,v])=>[k,r(v,paths.concat(k))])));
					}
					else return fn(obj,paths);
				};return r(obj,[]);
			}
		}
		if(typeof Math!=='undefined'){
			Math.randomInt = function(v1,v2){
				let min,max;
				if(v1!=null&&v2!=null) min=Math.floor(Number(v1)),max=Math.floor(Number(v2));
				if(v1!=null&&v2==null) min=0,max=Math.floor(Number(v1));
				if(v1==null&&v2!=null) min=0,max=Math.floor(Number(v2));
				if(v1==null&&v2==null) min=0,max=1;
				if(min>max) v1=min,min=max,max=v1;
				if(min==max) return min;
				return Math.floor(Math.random()*(max-min+1))+min;
			}
		}
		if(typeof JSON!=='undefined'){
			/** 순환참조를 감당할 수 있는 */
			JSON.stringify2 = function(obj){
				const $ = "\\u0024"
				const def = [];
				return function exec(obj,path){
					if(obj==null || typeof obj!='object') return JSON.stringify(obj);
					let altPath = find(obj);
					if(altPath) return `"${altPath}"`;
					regi(obj,path);
					if(Array.isArray(obj))
						return "["+obj.map((v,i)=>{
							return exec(v,path+$+i);
						})+"]";
					else
						return "{"+Object.entries(obj).map(([k,v])=>{
							return JSON.stringify(k) + ":" + exec(v,path+$+JSON.stringify(k).replace(/^"|"$/g,""));
						}).join(",")+"}";
				}(obj,"");
				function regi(o,p){  def.push([o,p]);  }
				function find(obj){  for(let i=0; i<def.length; i++) if(obj==def[i][0]) return def[i][1]; return null;  }
			}
			JSON.parse2 = function(json){
				const strings = [];
				json = String(json).replace(/\u0000-\u001f/,"");
				let i,j,chunk;
				while((i=json.indexOf('"'))>=0){
					j = (json.substr(i+1).replace(/\\\\/g,"00").replace(/\\"/g,"00")+'"').indexOf('"');
					chunk = json.substr(i,j);
					json = json.substr(0,i) +`\u0001${strings.length}\u0001`+ json.substr(1+i+j+1);
					strings.push(chunk);
				}
				json = json.replace(/\u0001/g,'"');
				const obj = JSON.parse(json);
				return function convert(v){
					if(typeof v=='string'){
						v = strings[v] || null;
						if(v.match(/\\u0024/)){
							v = ref(v);
						}
					}
					if(v==null || typeof v!='object') return v;
					if(Array.isArray(v)) return v.map(convert);
					else return Object.fromEntries(Object.entries(([k,v])=>[k,convert(v)]));
				}(obj);
				function ref(path){
					let v = obj;
					(path=path.split("\\u0024")).shift();
					while(path.length) v = (v||{})[JSON.parse(`"${path.shift()||''}"`)];
					return v;
				}
			}
		}
		if(typeof RegExp!=='undefined'){
			RegExp.PInt = /^[1-9][0-9]*$/;
			RegExp.UInt = /^0|[1-9][0-9]*$/;
			RegExp.SInt = /^0|-?[1-9][0-9]*$/;
			RegExp.UReal = /^[0-9]|[0-9]?\.[0-9]+$/;
			RegExp.SReal = /^0|-?[1-9]|-?[1-9]?\.[0-9]+|-?[0-9]?\.[0-9]*[1-9][0-9]*$/;
			RegExp.UUID = /^[\da-f]{8}(-[\da-f]{4}){3}-[\da-f]{12}$/;
			RegExp.DATE_ISOSTRING = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
			RegExp.EMAIL = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
			RegExp.TEL_MOBILE = /^010-[0-9]{4}-[0-9]{4}$/;
		}
		if(typeof Promise!=='undefined'){
			Promise.AsyncFunction = (async()=>{}).constructor;
			Promise.mapSeries = async function(arr, func){
				const ret = [];
				for(let i=0; i<arr.length; i++) ret.push(await func(arr[i],i));
				return ret;
			}
			Promise.reduceSeries = async function(arr, func, ret){
				let i = 0;
				if(!arr.length) return ret;
				if(ret===undefined) ret = arr[i++];
				for(; i<arr.length; i++) ret = await func(ret, arr[i], i);
				return ret;
			}
			Promise.filterSeries = async function(arr, func){
				const ret = [];
				for(let i=0; i<arr.length; i++) if(await func(arr[i],i)) ret.push(arr[i]);
				return ret;
			}
		}
	
	})();
	(function(){
		let _ = {};
	
		//
	
		Object.keys(_).map(function(k){
			const F = _[k];
			if(typeof HTMLElement != 'undefined' && typeof window != 'undefined'){
				if(typeof window[k] == 'undefined') window[k] = F;
			}else{
				exports[k] = F;
			}
		});
	})();
	