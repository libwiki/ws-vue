<template>
	<div :class="prefix" :style="styles" v-show="show" @click.self="click">
		<slot></slot>
	</div>
</template>
<script>
	export default{
		name:'Modal',
		props:{
			opacity:{default:0.5},
			bgColor:{type:String,default:'#000'},
			zIndex:Number,
			show:{type:Boolean,default:false}
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
		methods:{
			click(){
				this.$emit('click')
			}
		}

	}
</script>