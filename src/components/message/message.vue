<template>
	<span :class="prefix" v-if="isShow" :style="styles">
		{{message}}
	</span>
</template>
<script>
	export default{
		name:'Message',
		props:{
			message:String,
			opacity:{default:0.75},
			isShow:{type:Boolean,default:false},
		},
		computed:{
			styles(){
				let styles={opacity:this.opacity}
				return styles
			}
		},
		data(){
			return {
				prefix:'ws-message',
			}
		},
		
	}
</script>