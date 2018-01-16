<template>
	<div :class="prefix" v-if="show" :style="style">
		<LayHead @close="close" @mousedown="mousedown">{{title}}</LayHead>
		<LayBody><slot>{{content}}</slot></LayBody>
		<LayFoot :btnList="btnList"><slot name="foot"></slot></LayFoot>
	</div>
</template>
<script>
	import {LayHead,LayBody,LayFoot} from '../base'
	import Modal from '../modal'
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
				zIndex:Modal.zIndex,
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
		watch:{
			show(newVal,oldVal){
				console.log('show:',oldVal,newVal)
				if(!oldVal&&newVal){//false=>true
					Modal.add(this.prefix,this)
				}else{//true=>false
					Modal.remove(this.prefix,false);
				}
				
			},
			modal(newVal,oldVal){
				Modal.open(newVal)
			}
		},
		created(){
			Modal.open(this.modal)
			//console.log(this.modal)
		},
		updated(){
			console.log('updated')
		},
		methods:{
			close(e){
				this.$emit('close',e)
			},
			callback(){
				console.log('callback123123')
			},
			mousedown(e){
				this.isMove=true;
				let self=this,abs_x=e.pageX-e.offsetX,abs_y=e.pageY-e.offsetY;
				self.moveOptions={
					left:abs_x.toString()+'px',
					top:abs_y.toString()+'px',
				}
				window.addEventListener('mousemove',function(event){
					if(self.isMove){
						let left=parseInt(self.moveOptions.left.replace('px',''))+event.movementX,top=parseInt(self.moveOptions.top.replace('px',''))+event.movementY;
						self.moveOptions={
							left:left.toString()+'px',
							top:top.toString()+'px',
						}
					}
				})
				window.addEventListener('mouseup',function(event){
					self.isMove=false;
				})
			},
		}
	}
</script>
