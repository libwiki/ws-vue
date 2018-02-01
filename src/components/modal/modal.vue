<template>
	<div :class="prefix" :id="prefix" :item="prefix" :style="styles" @click.self="click">
		<slot></slot>
	</div>
</template>
<script>
	export default{
		name:'Modal',
		props:{
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
				if(this.show)styles['visibility']='visible';
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