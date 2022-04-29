const FileUploader = {
	methods:{
		async upLoadFile(file,name){
			let imgForm = new FormData();
			let fileName = name?name:null
			imgForm.append('img',file);
			const Img = await this.$axios({
				method:'post',
				url:'/api/upload',
				fileName : fileName,
				data:imgForm,
				headers: {
				'Content-Type': 'multipart/form-data',
				}
			})
			console.log(Img);
			return Img
		},
	}
}

export default FileUploader;