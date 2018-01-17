import MessageBox from './message-box'
MessageBox.Instance=Vue=>{
	const Instance=new Vue({
		data:{
			propsData:{}
		},
		render(h){
			return h(MessageBox,{
				props:Object.assign(this.propsData,{

				}),
				on:{
					close:this.close
				}
				
			})
		},
		methods:{
			open(options={}){
				this.propsData=options;
				this.$modal.add(MessageBox.name,this)
				this.$modal.open(this.propsData.modal&&this.propsData.show)
			},
			close(){
				this.propsData.show=false;
				this.$modal.remove(MessageBox.name,false);
			},
		}
	})
	document.body.appendChild(Instance.$mount().$el)
	return Instance;
}
export default MessageBox