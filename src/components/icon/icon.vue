<template>
	<div>
		<i :class="[prefix,icons]" :style="styles" @click="click"></i>
	</div>
</template>
<script>
	export default{
		name:'Icon',
		data(){
			return {
				prefix:'ws-icon',
			}
		},
		props:{
			icon:String,
			size:[Number,String],
			color:String,
		},
		computed:{
			icons(){
				return 'icon-'+this.icon;
			},
			styles(){
				let style = {};
                if (this.size)style['font-size'] = `${this.size}px`;
                if (this.color)style.color = this.color;
                return style;
			}
		},
		methods:{
			click(e){
				this.$emit('click',e)
			}
		}
	}
</script>