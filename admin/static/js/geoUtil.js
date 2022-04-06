/**
	@name geoUtil
	@author sjeg, eminno.kr
	@version 0.5 on 2020-07-17 17:20
	대한민국 주소체계, 위도/경도와 관련된 유틸리티 라이브러리
**/
!(function(self){
	if(typeof exports!=='undefined'&&exports) Object.keys(self).map(function(k){exports[k]=self[k];})
	else if(typeof window!=='undefined'&&window) window.GeoUtil = self;
	else if(typeof global!=='undefined'&&global) global.GeoUtil = self;
	else console.error("GLOBAL OBJECT NOT FOUND");
})(new function(){
	const RADIUS_OF_EARTH_IN_METER = 6378137;
	const self = this;

	// =========================================================================
	;
	// 좌표 관련
	;
	// =========================================================================

	/** 두 지점의 위도/경도로 거리 구하기
		@param {Number}lat1 위치 A의 위도
		@param {Number}lng1 위치 A의 경도
		@param {Number}lat2 위치 B의 위도
		@param {Number}lng2 위치 B의 경도
		@return {Number} 두 지점 사이의 거리 (Metre)
	 */
	self.getMeterByLatLng = function(lat1, lng1, lat2, lng2){
		var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
		var dLng = lng2 * Math.PI / 180 - lng1 * Math.PI / 180;
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
			Math.sin(dLng/2) * Math.sin(dLng/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		return RADIUS_OF_EARTH_IN_METER * c;
	}

	/** 미터를 위도 단위로 환산
	 	@param {Number}meter 미터값 (DEFAULT = 1)
		@return {Number} 지정한 미터를 위도 단위로 환산했을 때의 값
	 */
	self.getLatitudeByMeter = function(meter){
		// check args ...
		if(meter===0) return 0;
		else if(meter<0 || 0<meter) ;
		else meter = 1;
		// calc ...
		let c = meter / RADIUS_OF_EARTH_IN_METER;
		return c * 180 / Math.PI;
	}
	/** 미터를 경도 단위로 환산
	 	@param {Number}meter 미터값 (DEFAULT = 1)
		@param {Number}lat 위도 (DEFAULT = 0) 동/서 방향으로만 지구 한바퀴를 도는 둘레는 위도에 따라 다릅니다. (적도에선 최대, 극지방에선 0)
		@return {Number} 지정한 미터를 경도 단위로 환산했을 때의 값
	 */
	self.getLongitudeByMeter = function(meter, lat){
		// check args ...
		if(meter===0) return 0;
		else if(meter<0 || 0<meter) ;
		else meter = 1;
		lat = Number(lat)||0;
		// calc ... dLon = de/(R*Cos(Pi*lat/180))
		let c = meter / RADIUS_OF_EARTH_IN_METER;
		let a = c / Math.cos( lat * Math.PI/180 );
		return a * 180 / Math.PI;
	}
	/** 위경도가 들어있는 DB 테이블에 관하여, 특정 좌표점과의 거리 필드를 생성해줘
		@param {Number}baseLat 기준 좌표점 위도
		@param {Number}baseLng 기준 좌표점 경도
		@param {String}latColName 테이블 내 위도 필드명
		@param {String}lngColName 테이블 내 경도 필드명
		@return {String} 활용예시 "select { } as distance from ~", "~ where { } < 4.5", "~ order by { } asc limit 30" 등 ...
	**/
	self.buildSQLColumn = function(baseLat,baseLng,latColName,lngColName){
		function degToRate(v){ return v+"*pi()/180"; };
		var lat1Rate = degToRate(latColName), lat2Rate = degToRate(baseLat),
			lng1Rate = degToRate(lngColName), lng2Rate = degToRate(baseLng);
		var dLat = lat2Rate+"-"+lat1Rate, dLng = lng2Rate+"-"+lng1Rate;
		var a = "sin(("+dLat+")/2) * sin(("+dLat+")/2)" +"+"+ "cos("+lat1Rate+") * cos("+lat2Rate+") * sin(("+dLng+")/2) * sin(("+dLng+")/2)";
		var c = "2 * atan2(sqrt("+a+"), sqrt(1-("+a+")))";
		return RADIUS_OF_EARTH_IN_METER +"*"+ c;
	}

	// =========================================================================
	;
	// 주소 관련
	;
	// =========================================================================

	/**
	 * 주소의 각 구성요소별로 쪼개어 구분된 객체
	 * @param obj
	 * @return {Object} {<ul>
	 *     <li>do - ~남/북도,경기,강원,제주 등. 직할시의 주소에서는 undefined.</li>
	 *     <li>si - 직할시 또는 위 do 에 속한 하위 시. do 하위에 바로 군이 이어지는 주소에서는 undefined.</li>
	 *     <li>gun - 군.</li>
	 *     <li>gu - 구.</li>
	 *     <li>eup - 읍.</li>
	 *     <li>myeon - 면.</li>
	 *     <li>dong - 동.</li>
	 *     <li>ga - 가.</li>
	 *     <li>li - 리(理).</li>
	 *     <li>roadname - 도로명주소인 경우 도로명. 지번주소인 경우 undefined</li>
	 *     <li>num - 지번주소인 경우 번지, 도로명주소인 경우 건물번호. 본번과 부번을 모두 포함.</li>
	 *     <li>raw - 쪼개기 전 원본 주소 문자열</li>
	 * </ul>}
	 * @constructor
	 */
	const ParsedJuso = function(obj){
		const self = this;
		Object.keys(obj||{}).map(function(k){ self[k] = obj[k]; });
		return this;
	};
	/** 분리된 주소 구성요소를, 원하는 형식으로 자유롭게 구성하여 반환받기.
		@param {String}F = { D=도 , S=시 , G=군/구 , d=읍/면/동/가 , l=리 , r=도로명 , n=번지/건물번호 }
		존재하지 않는 구성요소 앞뒤의 한칸띄기는 합쳐서 한칸띄기로 표현되도록 처리됩니다.
		@return {String}
	 */
	ParsedJuso.prototype.toFormat = function(F){
		if(F==null) F="";
		const V = {
			'D':this.do||"",
			'S':this.si||"",
			'G':this.gu||this.gun||"",
			'E':this.eup||this.myeon||this.dong||this.ga||"",
			'L':this.li||"",
			'R':this.roadname||"",
			'N':this.num||"",
		};
		Object.entries(this).map(([k,v])=>{ if(v===null||typeof v=='string')V[k]=v; });
		Object.keys(V).map(function(k){
			const v = V[k];
			if(v===undefined);
			else if(v) F = F.replace(new RegExp(k,'g'),v);
			else F = F.replace(new RegExp(" "+k+" ",'g')," ").replace(new RegExp("^"+k+" |"+k+"$|"+k,'g'),"");
		});
		return F;
	}
	function testSido(chunk){
		var dict = {
			'서울특별시': /^서울((특별)?시)?$/,
			'인천광역시': /^인천((광역|직할)?시)?$/,
			'세종특별자치시': /^세종(((특별)?자치)?시)?$/,
			'대전광역시': /^대전((광역|직할)?시)?$/,
			'광주광역시': /^광주((광역|직할)?시)?$/,
			'대구광역시': /^대구((광역|직할)?시)?$/,
			'울산광역시': /^울산((광역|직할)?시)?$/,
			'부산광역시': /^부산((광역|직할)?시)?$/,
			'제주특별자치도': /^제주(((특별)?자치)?도)?$/,
			'경기도': /^경기(도)?$/,
			'강원도': /^강원(도)?$/,
			'충청남도': /^충청?남도?$/,
			'충청북도': /^충청?북도?$/,
			'전라남도': /^전라?남도?$/,
			'전라북도': /^전라?북도?$/,
			'경상남도': /^경상?남도?$/,
			'경상북도': /^경상?북도?$/,
		};
		for(var name in dict) if(dict[name].test(chunk)) return name;
		return null;
	};
	/**
	 * 주소의 각 구성요소별로 쪼개 구분하여 객체화
	 * <b>Usage:</b>
	 * &#9;콜 리스트의 명칭복사에서 동 또는 군구까지 함께 복사하기 위해 주소 분석
	 * @param raw {String} 분석하고자 하는 주소 통 문자열
	 * @return {ParsedJuso}
	 * @see ParsedJuso
	 */
	self.parseJuso = function(raw){
		var result = new ParsedJuso({'raw':raw});
		var fields = {
			'do':/.*도$/,
			'si':/.*시$/,
			'gun':/.*군$/,
			'gu':/.*구$/,
			'eup':/.*읍$/,
			'myeon':/.*면$/,
			'dong':/.*동$/,
			'ga':/.*가$/,
			'li':/.*리$/,
			'mt':/^산$/,
			'roadname':/.*(?:로|길|거리)$/,
			'num':/[-0-9]+(?:번지)?/,
		};
		Object.keys(fields).map(k=>{ result[k]=null; });
		// 세분화
		raw.replace(/\s+/g," ").split(" ").map(function(chunk){
			var i,k;
			for(k in fields){
				if(result[k]) continue;
				if(k=="do" && (result[k]=testSido(chunk))) break;
				if(fields[k].test(chunk)){
					result[k] = chunk.match(fields[k])[0];
					break;
				}
			}
		});
		// 예외대응
		if(!(result.dong||result.ga||result.li) && result.num && result.num.match(/[동가리].*\d/)){	// 번지 앞 띄어쓰기 누락됐을 경우 대응
			result._temp = result.num.replace(/([동가리])[^가-힣]*$/,"$1");
			result.num = result.num.substr(result._temp.length).trim();
			Object.keys(fields).map(function(k){
				if(!result[k] && fields[k].test(result._temp)){
					result[k] = result._temp;
				}
			});
			delete result._temp;
		}
		// 수준별 정리
		result.sido = result.do || result.si;
		result.sgg = ((result.do&&result.si||"") +" "+ (result.gun||result.gu||"")).trim();
		result.emd = result.eup||result.myeon||result.dong||result.ga;
		result.num = result.num || "";
		//
		return result;
	}

	// =========================================================================
	return self;
}());
