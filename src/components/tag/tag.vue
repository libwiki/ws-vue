<template>
	<span :class="classs" :style="style" @click="check" @mouseover="mouseover" @mouseout="mouseout">
		<slot>{{value}}</slot>
		<Icon icon="cuowuguanbiquxiao" class="ws-tag-close" @click="close" v-if="closable"></Icon>
	</span>
</template>
<script>
	import Icon from '../icon'
	export default {
		name:'Tag',
		props:{
			item:[String,Number],
			value:String,
			size:String,
			type:String,
			hoverType:String,
			color:String,
			bgColor:String,
			checked:{type:Boolean,default:true},
			closable:{type:Boolean,default:true},
			checkable:{type:Boolean,default:true},
			
		},
		data(){
			return {
				prefix:'ws-tag',
				hoverStr:'multi',
				checkedStyle:false,
				hoverStyle:false,
			}
		},
		computed:{
			classs(){
				let classs=[this.prefix];
				if(this.checkedStyle)classs.push(this.prefix+'-checked');
				if(this.size)classs.push(this.prefix+'-'+this.size);
				if(this.type)classs.push(this.prefix+'-'+this.type);
				if(this.hoverType===this.hoverStr)classs.push(this.prefix+'-'+this.hoverType);
				return classs;
			},
			style(){
				let style={}
				if(this.closable)style['padding-right']='5px';
				if(this.color)style['color']=this.color;
				if(this.bgColor){
					if(this.checkedStyle||this.hoverStyle){
						style['background-color']=this.bgColor;
						style['border-color']=this.bgColor;
						style['color']='#fff';
					}
				}
				return style;
			}
		},
		methods:{
			close(e){
				this.$emit('close',e)
			},
			check(e){
				if(this.checked)this.checkedStyle=!this.checkedStyle;
				this.$emit('click',e,this.item,this.checkedStyle)
			},
			mouseover(e){
				if(this.hoverType===this.hoverStr&&this.bgColor){
					this.hoverStyle=true;
				}
				this.$emit('mouseover',e)
			},
			mouseout(e){
				this.hoverStyle=false;
				this.$emit('mouseout',e)
			}
		}
	}
</script>