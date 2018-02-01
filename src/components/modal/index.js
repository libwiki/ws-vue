import Modal  from './modal'  
Modal.Instance=function(Vue){
	const Instance=new Vue({
		data:{
			defaultZIndex:20180111,
			list:{},
			isClickClose:true,
			show:false,
		},
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
			remove(key,type=true){
			    if(!key||!this.list[key]){
			    	this.close();
			    	return;
			    }
			    if(type)this.list[key].close();
			    delete this.list[key];
			    this.close()
			},
			removeAll(){
			    let self=this,max=Object.keys(self.list).length,count=0;
			    if(!max)self.close()
			    Object.values(self.list).forEach(item=>{
			      count++;
			      // item.$el.remove()
			      // item.$destroy()
			      item.close()
			      if(count===max){
			        self.list={}
			        self.close()
			      }
			    })
			},
			getElement(){
				let el=this.$el,eleAll=document.querySelectorAll('#'+el.id);
			    let ele=Array.from(eleAll).filter(item=>{
			      return item.attributes.item.value!=='undefined'&&item.attributes.item.value===el.attributes.item.value;
			    });
			    return ele[0];
			},
			//开启关闭
			open(val=true){
				this.show=val;
				return new Promise(resolve=>{
					resolve(this.getElement());
				});
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
	    Instance.removeAll()
	  }
	})
    return Instance
}

export default Modal