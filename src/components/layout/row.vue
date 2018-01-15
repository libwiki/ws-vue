<template>
	<div :class="prefix">
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name:'Row',
		data(){
			return{
				prefix:'ws-row',
			}
		},
	}
</script>