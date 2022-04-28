const FileUploader = {
	methods:{
		async upLoadFile(file,name){
			let imgForm = new FormData();
			console.log(name);
			imgForm.append('img',file);
			if(name)imgForm.append('fileName',name);
			const Img = await this.$axios({
				method:'post',
				url:'/api/upload',
				data:imgForm,
				fileName:name,
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