<template>
	<div :class="prefix" :style="style">
		<Animates :group="true" :in="animateClass.in" :out="animateClass.out">
			<div class="ws-carousel-main" v-for="(item,i) of list" :key="i" v-show="i===current" :style="Object.assign({'background-color':item.bgColor},mainStyle)"></div>
		</Animates>
		<Icon class="ws-carousel-prev" icon="return" :size="40" @click="prev"></Icon>
		<Icon class="ws-carousel-next" icon="enter" :size="40" @click="next"></Icon>
	</div>
</template>
<script>
	import Icon from '../icon'
	import {Animates} from '../base'
	export default {
		name:'Carousel',
		props:{
			width:String,
			height:String,
			index:{type:Number,default:0},
			trigger:{type:String,default:'click'},
			arrow:{type:String,default:'hover'},
			autoplay:{type:Boolean,default:true},
			duration:{type:Number,default:4000},
			type:{type:String,default:'card'},
			animate:{type:String,default:'bounce'},
			list:{type:Array,required:true},
		},
		data(){
			return {
				prefix:'ws-carousel',
				direction:'right',
				timer:null,
				animateList:{
					bounce:{
						left:{
							in:'bounceInLeft',
							out:'bounceOutRight',
						},
						right:{
							in:'bounceInRight',
							out:'bounceOutLeft',
						},
					},
					zoom:{
						left:{
							in:'zoomInLeft',
							out:'zoomOutRight',
						},
						right:{
							in:'zoomInRight',
							out:'zoomOutLeft',
						},
					},
					fade:{
						left:{
							in:'fadeInLeft',
							out:'fadeOutRight',
						},
						right:{
							in:'fadeInRight',
							out:'fadeOutLeft',
						},
					},
					slide:{
						left:{
							in:'slideInLeft',
							out:'slideOutRight',
						},
						right:{
							in:'slideInRight',
							out:'slideOutLeft',
						},
					},

				},
				current:this.index,
			}
		},
		created(){
			this.play()
		},
		computed:{
			mainStyle(){
				let height=this.height?this.height:this.offsetHeight,style={height}
				return style;
			},
			style(){
				let style=Object.assign({},this.mainStyle);
				if(this.width)style.width=this.width;
				return style;
			},
			animateClass(){
				let defaultAnimate=this.animateList.bounce,animate=this.animateList[this.animate]?this.animateList[this.animate]:defaultAnimate;
				return animate[this.direction];
			},
			offsetHeight(){
				if(!this.height){
					return document.querySelector(`.${this.prefix} .ws-carousel-main`).offsetHeight;
				}
				return 0;
			}
		},
		methods:{
			play(){
				if(this.autoplay){
					if(this.timer!==null){
						clearInterval(this.timer);
						this.timer=null;
					}
					this.timer=setInterval(_=>{
						this.next();
					},this.duration)
				}
			},
			//点击时间限制(待完成)
			prev(e){
				let current=this.current;
				current++;
				this.direction='left';
				if(current>this.list.length-1){
					current=0;
				}
				this.current=current;
				this.play()
				this.$emit('prev',e,this.current)
			},
			next(e){
				let current=this.current;
				current--;
				this.direction='right';
				if(current<0){
					current=this.list.length-1;
				}
				this.current=current;
				this.play()
				this.$emit('next',e,this.current)
			},
		}
	}
</script>
