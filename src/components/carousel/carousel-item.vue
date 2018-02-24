<template>
	<div :class="classs" :style="style">
		<slot></slot>
		<div :class="[prefix+'-title']">
			<slot name="title"></slot>
		</div>
	</div>
</template>
<script>
	export default {
		name:'CarouselItem',
		data(){
			return {
				prefix:'ws-carousel-item',
				animate:'',
				zIndex:0,
			}
		},
		props:{
			bgColor:String,
			height:String,
		},
		computed:{
			style(){
				let style={'z-index':this.zIndex};
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