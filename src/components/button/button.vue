<template>
	<div :class="classs" :disabled="disabled" @click="callClick">
		<Icon v-if="icon" :icon="icon"></Icon>
		<span><slot>{{value}}</slot></span>
	</div>
</template>
<script>
	import Icon from '../icon'
	export default{
		name:'Button',
		data(){
			return {
				prifix:'ws-btn',
			}
		},
		props:{
			value:String,
			type:String,
			size:[String,Number],
			disabled:Boolean,
			icon:String,
		},
		computed:{
			classs(){
				let classs=[this.prifix];
				if(this.type)classs.push(this.prifix+'-'+this.type);
				if(this.size)classs.push(this.prifix+'-'+this.size);
				return classs;
			},
		},
		methods:{
			callClick(e){
				this.$emit('click',e);
			}
		}
	}
</script>