const Payload = {
	methods:{
		makeFormData(data){
			let payload = new FormData();
			// 등록자 정보 넣어주기
			let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
			payload.append('userId',userInfo.id)
			payload.append('regdate',new Date().toFormat('Y-M-D H:M:S'));
 			data.map(d=>{
				let target = d.target;
				let value = d.model;
				if(value){
					payload.append(target,value)
				}
			})	
			return payload;
		},
		makePayload(data){
			let payload = {};
			data.map(d=>{
				let target = d.target;
				let value = d.value;
				if(target){
					payload[target] = value
				}
			})
			return payload
		},
		checkmodels(data){
			let exit = false;
			data.map(p=>{
				if(exit) return
				let message_target = KorUtil.fixPostPositions(`${p.title}을(를)`)

				if(p.model =='선택' || p.model == null&&p.layout !='img' || p.model==''){
					exit = true;
					return alert(`${message_target} 작성해주세요`);
				}else if(p.layout == 'img'){
					if(p.src) return
					else if(!p.model){
						exit = true
						return alert(`${message_target} 작성해주세요`);
					}
				}
			})
			return exit
		},
	}
}

export default Payload;