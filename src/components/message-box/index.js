import MessageBox from './message-box'
MessageBox.Instance=Vue=>{
	let Instance=Vue.extend({
		data(){
			return {
				title:'',
				content:'',
				show:false,
				btnList:[],
				modal:true,
			}
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
			open(content,title,options,modal){
				this.setData(true,content,title,options,modal);
				this.$modal.add(MessageBox.name,this)
				this.$modal.open(this.modal&&this.show).then(ele=>{
					ele.appendChild(this.$mount().$el);
				})
			},
			setData(show=false,content='',title='',options=[],modal=true){
				this.show=show;
				this.content=content;
				this.title=title;
				this.btnList=options;
				this.modal=modal;
			},
			close(){
				this.show=false;
				this.$modal.remove(MessageBox.name,false);
			},
		}
	})
	Instance=new Instance();
	return Instance;
}
export default MessageBox