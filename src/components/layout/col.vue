<template>
	<div :class="classs">
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name:'Col',
		data(){
			return {
				prefix:'ws-col',
			}
		},
		props:{
			span:{
				type:[Number,String,Array,Object],
				//required:true,
			},
			offset:[Number,String,Array,Object],
		},
		computed:{
			classs(){
				let prefix=this.prefix,classs=[prefix],span=this.span,offset=this.offset;
				if(span){
					if(Object.prototype.toString.call(span)=='[object Array]'){
						for(let val of span){
							classs.push(`${prefix}-offset-${val}`);
						}
					}else if(typeof span==='object'){
						for(let key in span){
							classs.push(prefix+'-'+key+span[key]);
						};
					}else{
						classs.push(prefix+'-'+span);
					}
				}
				if(offset){
					if(Object.prototype.toString.call(offset)=='[object Array]'){
						for(let val of offset){
							classs.push(`${prefix}-offset-${val}`);
						}
					}else if(typeof offset==='object'){
						for(let key in offset){
							classs.push(prefix+'-offset-'+key+offset[key]);
						};
					}else{
						classs.push(prefix+'-offset-'+offset);
					}
				}
				return classs;
			}
		}
	}
</script>