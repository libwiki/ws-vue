<template>
	<div :class="prefix" :style="styles" v-show="isShow">
		<slot></slot>
	</div>
</template>
<script>
	export default{
		name:'Modal',
		props:{
			opacity:{default:0.1},
			bgColor:{type:String,default:'#000'},
			zIndex:Number,
			isShow:{type:Boolean,default:false}
		},
		data(){
			return {
				prefix:'ws-modal',
				
			}
		},
		computed:{
			styles(){
				let styles={};
				if(this.opacity)styles['opacity']=this.opacity;
				if(this.bgColor)styles['background-color']=this.bgColor;
				if(this.zIndex)styles['z-index']=this.zIndex;
				return styles;
			}
		},

	}
</script>