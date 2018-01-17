<template>
	<div :class="prefix" v-if="show" :style="style" >
		<LayHead @close="close" @mousedown="mousedown">{{title}}</LayHead>
		<LayBody><slot>{{content}}</slot></LayBody>
		<LayFoot :btnList="btnList"><slot name="foot"></slot></LayFoot>
	</div>
</template>
<script>
	import {LayHead,LayBody,LayFoot} from '../base'
	export default {
		name:'MessageBox',
		props:{
			title:String,
			content:String,
			show:{type:Boolean,default:false},
			modal:{type:Boolean,default:false},
			btnList:{
				type:Array,
				default(){
					return [];
				}
			},
		},
		data(){
			return {
				prefix:'ws-message-box',
				zIndex:this.$modal.zIndex,
				isMove:false,
				moveOptions:{
					left: '50%',
					top: '50%',
					transform:'translate(-50%,-50%)'
				},
			}
		},
		computed:{
			style(){
				let moveOptions=this.moveOptions,style={'z-index':this.zIndex}
				Object.keys(moveOptions).forEach(key=>{
					style[key]=moveOptions[key];
				})
				return style;
			},
			
		},
		methods:{
			close(e){
				this.$emit('close',e)
			},
			mousedown(e){
				this.isMove=true;
				let self=this,w=window.innerWidth,h=window.innerHeight,abs_x=e.pageX-e.offsetX,abs_y=e.pageY-e.offsetY;
				if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
					h = document.documentElement.clientHeight;
					w = document.documentElement.clientWidth;
				}
				self.moveOptions={
					left:abs_x.toString()+'px',
					top:abs_y.toString()+'px',
				}
				window.addEventListener('mouseup',function(event){
					self.isMove=false;
				})
				window.addEventListener('mousemove',function(event){
					if(self.isMove){
						let left=event.pageX-e.pageX+abs_x,top=event.pageY-e.pageY+abs_y;
						if(left<0){
							left = 0
						}else if(left+self.$el.offsetWidth>w){
							left = w-self.$el.offsetWidth
							
						}
						if(top<0){
							top = 0
						}else if(top+self.$el.offsetHeight>h){
							top = h-self.$el.offsetHeight
						}
						self.moveOptions={
							left:left.toString()+'px',
							top:top.toString()+'px',
						}
					}
				})
				
			},
		}
	}
</script>
