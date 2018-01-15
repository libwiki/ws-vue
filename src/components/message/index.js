import Vue from 'vue'
import Message from './message'
Message.Instance=function(options={}){
	const Instance=new Vue({
		data:Object.assign(options,{
			opacity:0.75,
			isShow:false,
			autoClose:true,
			continueTime:1800,
			timer:null,
			message:'',
		}),
		render(h){
			return h(Message,{
				props:{
					message:this.message,
					isShow:this.isShow,
					opacity:this.opacity,
				}
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
				this.isShow=true
			},
			close(){
				this.timer=setTimeout(_=>{
					this.isShow=false
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