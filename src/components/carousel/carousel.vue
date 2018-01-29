<template>
	<div :class="prefix" :style="style" @mouseover="mouseover" @mouseout="mouseout">
		<div :class="[prefix+'-main']">
			<slot></slot>
		</div>
		<Icon :class="prevClass" :style="arrowStyle" icon="return" :size="40" @click="prev"></Icon>
		<Icon :class="nextClass" :style="arrowStyle" icon="enter" :size="40" @click="next"></Icon>
		<ul :class="[prefix+'-nav']" v-if="items">
			<li v-for="(item,i) of items" :class="i===current?'hover':''" @click="triggerClick(i)" @mouseover="triggerHover(i)"></li>
		</ul>
	</div>
</template>
<script>
	import Icon from '../icon'
	import {Animates} from '../base'
	import {CarouselItem} from './carousel-item'
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
			animate:{type:String,default:'slide'},
		},
		data(){
			return {
				prefix:'ws-carousel',
				direction:'right',
				timer:null,
				items:null,
				current:this.index,
				prevIndex:0,
				arrowStatus:true,
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
				
			}
		},
		mounted(){
			this.init();
			this.play()
			this.slide();

		},
		computed:{
			style(){
				let height=this.height?this.height:this.offsetHeight,style={height};
				if(this.width)style.width=this.width;
				return style;
			},
			prevClass(){
				return [this.prefix+'-prev'];
			},
			nextClass(){
				return [this.prefix+'-next'];
			},
			arrowStyle(){
				if((this.arrow==='never'||this.arrow==='hover')&&this.arrowStatus){
					return {display:'none'}
				}
				return {}
			},
			animateClass(){
				let defaultAnimate=this.animateList.bounce,animate=this.animateList[this.animate]?this.animateList[this.animate]:defaultAnimate;
				return animate[this.direction];
			},
			offsetHeight(){
				if(!this.height&&this.items!==null){
					return this.items[0].$el.offsetHeight.toString()+'px';
				}
				return '0px';
			}
		},
		methods:{
			//初始化用户项目
			init(){
				this.items=this.$children.filter(item=>{
					return item.$options._componentTag==='carousel-item';
				})
			},
			//定时器
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
			//实际的切换
			slide(){
				if(this.items===null)return;
				this.items.forEach((item,index)=>{
					if(this.current===index){
						item.show=true;
						item.animate=this.animateClass.in;
					}else{
						item.animate=this.animateClass.out;
					}
				})
				this.$emit('slide',this.current,this.prevIndex)
			},
			//点击时间限制(待完成)
			prev(e){
				if(this.items===null)return;
				let current=this.current;
				this.direction='left';
				current--;
				if(current<0){
					current=this.items.length-1;
				}
				this.prevIndex=this.current;
				this.current=current;
				this.slide()
				this.play()
				this.$emit('prev',e,this.current)
			},
			next(e){
				if(this.items===null)return;
				let current=this.current;
				this.direction='right';
				current++;
				if(current>this.items.length-1){
					current=0;
				}
				this.prevIndex=this.current;
				this.current=current;
				this.slide()
				this.play()
				this.$emit('next',e,this.current)
			},
			//鼠标点击菜单切换
			triggerClick(val){
				if(this.trigger==='click'&&this.current!==val){
					if(this.current<val||(val===0&&this.current!==1)){
						this.direction='right';
					}else{
						this.direction='left';
					}
					this.prevIndex=this.current;
					this.current=val;
					this.slide()
					this.play()
				}
			},
			//鼠标经过菜单切换
			triggerHover(val){
				if(this.trigger==='hover'&&this.current!==val){
					if(this.current<val||(val===0&&this.current!==1)){
						this.direction='right';
					}else{
						this.direction='left';
					}
					this.prevIndex=this.current;
					this.current=val;
					this.slide()
					this.play()
				}
			},
			//箭头的显示
			mouseover(e){
				if(this.timer!==null){
					clearInterval(this.timer);
					this.timer=null;
				}
				if(this.arrow)this.arrowStatus=false;
				this.$emit('mouseover',e,this.current)
			},
			//箭头的隐藏
			mouseout(e){
				this.play()
				this.arrowStatus=true;
				this.$emit('mouseout',e,this.current)
			}
		}
	}
</script>
