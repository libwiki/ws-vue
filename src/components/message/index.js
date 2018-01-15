import Vue from 'vue'
import Modal from '../modal'
import Message from './message'
Message.Instance=function(options={}){
	const Instance=new Vue({
		data:Object.assign(options,{
			opacity:0.75,
			show:false,
			autoClose:true,
			continueTime:1800,
			timer:null,
			message:'',
			zIndex:Modal.zIndex,
		}),
		render(h){
			return h(Message,{
				props:{
					message:this.message,
					show:this.show,
					opacity:this.opacity,
				},
				style:{
					'z-index':this.zIndex+20180115,
				},
			})
		},
		
		methods:{
			setMsg(msg,continueTime){
				if(!msg)return;
				this.message=msg
				if(continueTime)this.continueTime=continueTime;
				if(this.timer!==null){
					clearTimeout(this.timer)
					this.timer=null
				}
				if(this.autoClose)this.close()
			},
			open(){
				this.show=true
			},
			close(){
				this.timer=setTimeout(_=>{
					this.show=false
				},this.continueTime)
			}

		},
		
	})
	document.body.appendChild(Instance.$mount().$el)
	return {
		message(msg,continueTime){
			if(!msg)return;
			Instance.setMsg(msg,continueTime)
			Instance.open()
		},
	}
}
export default Message