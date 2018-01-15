<template>
	<div :class="prefix">
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
			close(){
				this.$emit('close')
			}
		}
	}
</script>