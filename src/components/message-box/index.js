import MessageBox from './message-box'
import Modal from '../modal'
MessageBox.Instance=Vue=>{
	const MessageBoxs=Vue.extend(MessageBox)
	const Instance=new Vue({
		data:{
			propsData:{}
		},
		render(h){
			return h(MessageBoxs,{
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
			},
			close(){
				this.propsData.show=false;
			},
		}
	})
	document.body.appendChild(Instance.$mount().$el)
	return Instance;
}
export default MessageBox