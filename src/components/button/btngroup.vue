<template>
	<div :class="prefix">
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name:'BtnGroup',
		data(){
			return{
				prefix:'ws-btn-group',
			}
		},
	}
</script>