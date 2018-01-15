import Vue from 'vue'
import Modal from '../modal'
import MessageBox from './message-box'
MessageBox.Instance=function(options={}){
	const Instance=new Vue({
		data:Object.assign(options,{
			key:'MessageBox',
			title:'',
			content:'',
			showModal:true,
			zIndex:Modal.zIndex,
			show:false,
		}),
		render(h){
			return h(MessageBox,{
				props:{
					title:this.title,
					content:this.content,
					show:this.show,
				},
				style:{
					'z-index':this.zIndex,
				},
				on:{
					close:this.closeHandle
				}
			})
		},
		methods:{
			open(content,title='',showModal=true){
				this.showModal=showModal
				this.content=content
				this.title=title
				Modal.open(this.showModal)
				this.show=true;
				Modal.add(this.key,this)
			},
			close(closeModal=true){
				//closeModal 防止在modal中调用关闭的死循环
				if(closeModal)Modal.remove(this.key);
				this.show=false;
			},
			closeHandle(){
				this.close()
			}
		}
	})
	document.body.appendChild(Instance.$mount().$el)
	return Instance
}
export default MessageBox