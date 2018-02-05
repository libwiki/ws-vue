//父子组件通讯
export default{
	store:null,
	Instance(Vue){
		if(this.store===null){
			this.store=new Vue;
		}
	},
}
