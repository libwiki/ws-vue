<template>
	<div :class="prefix" :style="style">
		<div :class="[prefix+'-nav',prefix+'-nav-'+type]" :ref="prefix+'-nav'">
			<div :style="navStyle">
				<div :ref="prefix+'-nav-item'" :class="[current===i?'hover':'',prefix+'-nav-item']" v-for="(item,i) of data"  @click="tabClick(i)">
				{{item[finalKeys.title]}}
				</div>
				<Icon :class="[prefix+'-nav-prev']" icon="return" :size="20" v-if="arrow" @click="prev"></Icon>
				<Icon :class="[prefix+'-nav-next']" icon="enter" :size="20" v-if="arrow" @click="next"></Icon>
				<div :class="[prefix+'-nav-active']" v-if="false">这是可滑动的下边框(未实现)</div>
			</div>
		</div>
		<div :class="[prefix+'-main']" :style="mainStyle">
			<Animates :in="animateList[slideDirection].in" :out="animateList[slideDirection].out" tag="p" group>
				<div :ref="prefix+'-main-item'" :class="[prefix+'-main-item',current===i?'hover':'']" v-show="current===i" v-for="(item,i) of data" :key="i">
					<slot :val="item">{{item[finalKeys.content]}}</slot>
				</div>
			</Animates>
		</div>
	</div>
</template>
<script>
	import {Animates} from '../base'
	import Icon from '../icon'
	export default {
		name:'Tabs',
		props:{
			data:Array,
			keys:Object,
			index:{
				type:Number,
				default:0,
			},
			type:{
				type:String,
				default:'line',
			}
		},
		data(){
			return {
				prefix:'ws-tabs',
				current:this.index,
				prevIndex:this.index,
				slideDirection:'right',
				navMaxWidth:0,//导航区最大宽度(可视区)
				navWidth:0,//导航区实际宽度
				navMarginLeft:0,
				mainHeight:0,//内容最大高度
				animateList:{
					left:{
						in:'bounceInLeft',
						out:'bounceOutRight',
					},
					right:{
						in:'bounceInRight',
						out:'bounceOutLeft',
					},
				},
			}
		},
		mounted(){
			this.init();
		},
		updated(){
			this.init();
		},
		computed:{
			finalKeys(){
				let defaultKeys={
					item:'item',
					title:'title',
					content:'content',
				};
				return Object.assign(defaultKeys,this.keys);
			},
			style(){
				let style={};
				if(this.type==='line'){
					style['padding-top']='10px';
				}
				return style;
			},
			navStyle(){
				let style={'margin-left':this.navMarginLeft.toString()+'px'};
				style['min-width']=this.navWidth.toString()+'px';
				return style;
			},
			mainStyle(){
				let style={};
				style['min-height']=this.mainHeight.toString()+'px';
				return style;
			},
			arrow(){
				return this.navWidth>this.navMaxWidth;
			},
		},
		methods:{
			init(){
				const refs=this.$refs;
				let navMaxWidth=refs[this.prefix+'-nav'].offsetWidth,
					navWidth=this.getNavWidth(refs[this.prefix+'-nav-item']),
					mainHeight=this.getMainHeight(refs[this.prefix+'-main-item']);
				
				if(this.navMaxWidth!==navMaxWidth)this.navMaxWidth=navMaxWidth;
				if(Math.abs(this.navWidth-navWidth)>5)this.navWidth=navWidth;
				if(this.mainHeight!==mainHeight)this.mainHeight=mainHeight;

				console.log(refs);
				
			},
			//获取导航区宽度
			getNavWidth(navArray,index=-1){
				let w=0;
				navArray.forEach((item,i)=>{
					if(index===-1){
						w+=item.offsetWidth;
					}else if(i<=index){
						w+=item.offsetWidth;
					}
				})
				return w;
			},
			//获取内容区最大高度
			getMainHeight(mainArray){
				let h=0;
				mainArray.forEach(item=>{
					if(item.offsetHeight>h)h=item.offsetHeight;
				})
				return h;
			},
			tabClick(i){
				let current=this.current,data=this.data,keys=this.finalKeys,item=data[i][keys.item];
				if(current!==i){
					this.prevIndex=current;
					this.current=i;
					this.slideDirection=i>current?'right':'left';
					this.$emit('tab-switch',i,current);
				}
				if(item){
					this.$emit('tab-click',i,item);
				}else{
					this.$emit('tab-click',i);
				}
			},
			prev(){
				let left=this.navMarginLeft+this.navMaxWidth;
				if(left<=0)this.navMarginLeft=left;
			},
			next(){
				let left=this.navMarginLeft-this.navMaxWidth;
				if(Math.abs(left)<this.navWidth+5)this.navMarginLeft=left;
			}
		}
	}
</script>