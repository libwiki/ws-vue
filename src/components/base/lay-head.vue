<template>
	<div :class="prefix" @mousedown="mousedown">
		<p class="ws-lay-title"><slot>标题</slot></p>
		<Icon icon="cuowuguanbiquxiao" class="ws-lay-close" @click="close"></Icon>
	</div>
</template>
<script>
	import Icon from '../icon'
	export default{
		name:'LayHead',
		data(){
			return {
				prefix:'ws-lay-head',
			}
		},
		methods:{
			close(e){
				this.$emit('close',e)
			},
			mousedown(e){
				if(e.target.tagName==='I')return;
				this.$emit('mousedown',e)
			},
		}
	}
</script>