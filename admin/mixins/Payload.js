const Payload = {
	methods:{
		makePayload(data){
			let payload = {}
			// 등록자 정보 넣어주기
			let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
			payload['userId'] = userInfo.id;
			payload['regdate'] = new Date().toFormat('Y-M-D H:M:S');
 			data.map(d=>{
				let target = d.target;
				let value = d.model;
				if(target !='thumbnail'){
					payload[target] = value;
				}
			})	
			return payload;
			},
	}
}

export default Payload;