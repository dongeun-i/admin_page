const FileUploader = {
	data(){
		return{
			path:null,
			url:null,
			methods:null
		}
	},
	methods:{
		async upLoadFile(file,name,path){
			let imgForm = new FormData();
			let fileName = name?name:null
			imgForm.append('path',this.path);
			imgForm.append('img',file);
			imgForm.append('newFileName',fileName);
			const img = await this.$axios({
				method:'post',
				url:'/api/upload/product',
				data:imgForm,
				headers: {
					'Content-Type': 'multipart/form-data',
				}
			})
			return img
		},
		setPath(path){
			switch(path){
				case 'productImg':
					this.path = 'static/img/product/thumbnail'
				break

				case 'productDetail':
					this.path = 'static/img/product/detail'
				break

				case 'banner':
					this.path = 'static/img/event/bannerSrc'
				break

				case 'bannerDetail':
					this.path = 'static/img/event/detail'
				break

			}
		},
		createForm(arr){

		}
	},
	created(){

	}
}

export default FileUploader;