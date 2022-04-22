<template>
	<div>
		서브페이지입니다.
	</div>
</template>
<script>
export default {
	layout:'layout',
	created(){
		console.log(this.$route)
	}
}
</script>