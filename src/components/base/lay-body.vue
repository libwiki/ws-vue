<template>
	<div :class="prefix">
		<slot>{{content}}</slot>
	</div>
</template>
<script>
	export default{
		name:'LayBody',
		props:{
			content:{type:String,default:'暂无内容'}
		},
		data(){
			return {
				prefix:'ws-lay-body',
			}
		},
	}
</script>