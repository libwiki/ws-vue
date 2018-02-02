import Message from './message'
Message.Instance=function(Vue){
	let Instance=Vue.extend({
		data(){
			return {
				opacity:0.75,
				show:false,
				autoClose:true,
				duration:1800,
				timer:null,
				message:'',
			}
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
				this.$modal.open(false).then(ele=>{
					ele.appendChild(this.$mount().$el);
				})
				this.open();
				if(this.timer!==null){
					clearTimeout(this.timer)
					this.timer=null
				}
				if(this.autoClose)this.close();
			},
			open(val=true){
				this.show=val;
			},
			close(){
				this.timer=setTimeout(_=>{
					this.open(false);
				},this.duration)
			},
		},
		
	})
	Instance=new Instance();
	return Instance;
}
export default Message