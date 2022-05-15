export const state = ()=>({
	userInfo:JSON.parse(sessionStorage.getItem('userInfo'))||null,
})
export default state;