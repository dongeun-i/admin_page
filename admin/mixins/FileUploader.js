const FileUploader = {
	methods:{
		async upLoadFile(file){
			let imgForm = new FormData()
			imgForm.append('img',file);
			const Img = await this.$axios({
				method:'post',
				url:'/api/upload',
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