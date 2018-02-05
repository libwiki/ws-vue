<template>
	<div :class="classs" @click="select">
		<slot>{{label?label:value}}</slot>
	</div>
</template>
<script>
	import store from '@/store'
	export default {
		name:'Option',
		props:{
			value:[Number,String],
			label:[Number,String],
		},
		data(){
			return {
				prefix:'ws-option',
				selected:false,
			}
		},
		computed:{
			classs(){
				let style=[this.prefix];
				if(this.selected)style.push('hover');
				return style;
			}
		},
		mounted(){
			store.store.$on('ws-option-default',data=>{
				if(this.$parent._uid===data._uid){
					this.selected=this.value===data.value;
				}
			});
		},
		methods:{
			select(e){
				let val=this.value;
				if(!this.value){
					val=e.target.innerText;
				}
				store.store.$emit('ws-option-selected',{_uid:this.$parent._uid,value:val});
			}
		},
	}
</script>