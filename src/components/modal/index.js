import Vue from 'vue'
import Overlayer  from './modal'  
Overlayer.Instance=function(options={}){
	const Modal=Vue.extend(Overlayer)
	const Instance=new Vue({
		data:Object.assign(options,{
			defaultZIndex:20180111,
			list:[],
			isClickClose:true,
			isShow:false,
		}),
		render(h){
			let self=this;
	        return h(Modal,{
	          props:{
	            isShow:self.isShow,
	            zIndex:self.zIndex
	          },
	          nativeOn:{
	            click:self.click
	          }
	        })
	    },
	    computed:{
	    	zIndex(){
	    		return this.defaultZIndex+this.list.length+1
	    	}
	    },
	    methods:{
	    	add(instance){
			    if(instance)this.list.push(instance)
			},
			remove(instance){
			    this.close()
			    if(!instance||!this.list[instance])return;
			    // instance=this.list[instance]
			    this.list=this.list.filter(item=>{
			      return item!==instance
			    })
			    // instance.$el.remove()
			    // instance.$destroy()
			    this.close()
			},
			removeAll(){
			    let self=this,max=self.list.length,count=0;
			    if(!max)self.close()
			    self.list.forEach(item=>{
			      count++;
			      item.$el.remove()
			      item.$destroy()
			      if(count===max){
			        self.list=[]
			        self.close()
			      }
			    })
			},

			open(){
				this.isShow=true
			},
			close(){
				if(!this.list.length)this.isShow=false
			},
			click(){
			    if(this.isClickClose){
			      	this.remove(this.list[this.list.length-1])
			    }
			},
	    }
	})
    document.body.appendChild(Instance.$mount().$el);
    window.addEventListener('keydown',function(e){
	  if(e.keyCode===27){
	    Instance.remove()
	  }
	})
    return Instance
}

export default Overlayer