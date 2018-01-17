<template>
	<span :class="prefix" v-if="show" :style="styles">
		{{message}}
	</span>
</template>
<script>
	export default{
		name:'Message',
		props:{
			message:String,
			opacity:{default:0.75},
			show:{type:Boolean,default:false},
		},
		computed:{
			styles(){
				let styles={opacity:this.opacity,'z-index':this.zIndex,}
				return styles
			}
		},
		data(){
			return {
				prefix:'ws-message',
				zIndex:this.$modal.zIndex+20180115
			}
		},
		
	}
</script>