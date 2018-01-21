<template>
	<div :class="classs" :style="style" v-show="show">
		<slot></slot>
	</div>
</template>
<script>
	import {Animates} from '../base'
	export default {
		name:'CarouselItem',
		data(){
			return {
				prefix:'ws-carousel-item',
				show:true,
				animate:'',
			}
		},
		props:{
			bgColor:String,
			height:String,
		},
		computed:{
			style(){
				let style={};
				if(this.bgColor)style['background-color']=this.bgColor;
				if(this.height)style['height']=this.height;
				return style;
			},
			classs(){
				let classs=[this.prefix,'animated',this.animate];
				return classs;
			}
		},

	}
</script>