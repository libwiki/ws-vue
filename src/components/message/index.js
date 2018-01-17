import Message from './message'
Message.Instance=function(Vue){
	const Instance=new Vue({
		data:{
			opacity:0.75,
			show:false,
			autoClose:true,
			continueTime:1800,
			timer:null,
			message:'',
		},
		render(h){
			return h(Message,{
				props:{
					message:this.message,
					show:this.show,
					opacity:this.opacity,
				},
			})
		},
		
		methods:{
			setMsg(message,continueTime=null,opacity=null){
				if(!message)return;
				this.message=message
				if(continueTime!==null)this.continueTime=continueTime;
				if(opacity!==null)this.opacity=opacity;
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
		message(message,continueTime){
			if(!message)return;
			Instance.setMsg(message,continueTime)
			Instance.open()
		},
	}
}
export default Message