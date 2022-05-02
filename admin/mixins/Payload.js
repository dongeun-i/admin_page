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
		checkmodels(data){
			let exit = false;
			data.map(p=>{
				if(exit) return
				if(p.model =='선택' || p.model == null || p.model==''){
					let message_target = KorUtil.fixPostPositions(`${p.title}을(를)`)
					exit = true;
					return alert(`${message_target} 작성해주세요`);
				}
			})
			return exit
		},
	}
}

export default Payload;