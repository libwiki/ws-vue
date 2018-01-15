import Vue from 'vue'
import Overlayer  from './modal'  
Overlayer.Instance=function(options={}){
	const Modal=Vue.extend(Overlayer)
	const Instance=new Vue({
		data:Object.assign(options,{
			defaultZIndex:20180111,
			list:{},
			isClickClose:true,
			show:false,
		}),
		render(h){
			let self=this;
	        return h(Modal,{
	          props:{
	            show:self.show,
	            zIndex:self.defaultZIndex
	          },
	          on:{
	            click:self.click
	          }
	        })
	    },
	    computed:{
	    	zIndex(){
	    		return this.defaultZIndex+Object.keys(this.list).length+1
	    	}
	    },
	    methods:{
	    	add(key,instance){
			    if(instance&&instance)this.list[key]=instance
			},
			remove(key){
			    this.close()
			    if(!key||!this.list[key])return;
			    // instance=this.list[key]
			    // instance.$el.remove()
			    // instance.$destroy()
			    this.list[key].close(false)
			    delete this.list[key]
			    this.close()
			},
			removeAll(){
			    let self=this,max=Object.keys(self.list).length,count=0;
			    if(!max)self.close()
			    Object.values(self.list).forEach(item=>{
			      count++;
			      // item.$el.remove()
			      // item.$destroy()
			      item.close(false)
			      if(count===max){
			        self.list={}
			        self.close()
			      }
			    })
			},
			//开启关闭
			open(val=true){
				this.show=val
			},
			//仅当不存在弹框时关闭
			close(){
				if(!Object.keys(this.list).length)this.open(false)
			},
			click(){
			    if(this.isClickClose){
			    	let keys=Object.keys(this.list)
			      	this.remove(keys[keys.length-1])
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

export default Overlayer.Instance()