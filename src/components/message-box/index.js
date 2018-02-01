import MessageBox from './message-box'
MessageBox.Instance=Vue=>{
	return new Vue({
		data:{
			title:'',
			content:'',
			show:false,
			btnList:[],
			modal:true,
		},
		render(h){
			return h(MessageBox,{
				props:{
					title:this.title,
					content:this.content,
					show:this.show,
					btnList:this.btnList,
				},
				on:{
					close:this.close
				}
				
			})
		},
		methods:{
			open(content='',title='',options=[],modal=false){
				this.content=content;
				this.title=title;
				this.show=true;
				this.btnList=options;
				this.modal=modal;
				this.$modal.add(MessageBox.name,this)
				this.$modal.open(this.modal&&this.show).then(ele=>{
					ele.appendChild(this.$mount().$el);
				})
			},
			close(){
				this.show=false;
				this.$modal.remove(MessageBox.name,false);
			},
		}
	})
}
export default MessageBox