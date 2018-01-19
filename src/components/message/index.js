import Message from './message'
Message.Instance=function(Vue){
	const Instance=new Vue({
		data:{
			opacity:0.75,
			show:false,
			autoClose:true,
			duration:1800,
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
			setMsg(message,duration=null,opacity=null){
				if(!message)return;
				this.message=message
				if(duration!==null)this.duration=duration;
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
				},this.duration)
			}

		},
		
	})
	document.body.appendChild(Instance.$mount().$el)
	return {
		message(message,duration){
			if(!message)return;
			Instance.setMsg(message,duration)
			Instance.open()
		},
	}
}
export default Message