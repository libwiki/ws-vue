<template>
	<div :class="prefix">
		<p class="ws-lay-title"><slot>标题</slot></p>
		<Icon icon="cuowuguanbiquxiao" color="#888" class="ws-lay-close"></Icon>
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
	}
</script>