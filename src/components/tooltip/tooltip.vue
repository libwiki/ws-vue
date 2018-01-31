<template>
	<div :class="prefix" @mouseover="mouseover"  @mouseout="mouseout">
		<span :class="[prefix+'-main']" :style="mainStyle" v-show="show">
			{{value}}
			<Icon :icon="arrowIcon" :class="[prefix+'-arrow']" :style="iconStyle"></Icon>
		</span>
		<slot></slot>
		
	</div>
</template>
<script>
	import Icon from '../icon'
	import mixins from '../../mixins'
	export default {
		name:'Tooltip',
		mixins:[mixins],
		props:{
			value:String,
			placement:{
				default:8,
				type:Number,
				validator(val){
					return val>0&&val<=12;
				},
			}
		},
		data(){
			return {
				prefix:'ws-tooltip',
				show:false,
				// context:null,
				// tooltip:null,
				contextArea:[0,0],
				tooltipArea:[0,0],
				tooltipWidth:0,
			}
		},
		mounted(){
			this.init();
		},
		updated(){
			this.init();
		},
		methods:{
			init(){
				const context=this.$slots.default[0].elm;
				const tooltip=this.$el.children[0];
				let oldContextArea=this.contextArea,oldTooltipArea=this.tooltipArea,contextArea=[context.offsetWidth,context.offsetHeight],tooltipArea=[tooltip.offsetWidth,tooltip.offsetHeight];
				if(oldContextArea[0]!==contextArea[0]||oldContextArea[1]!==contextArea[1]){
					this.contextArea=contextArea;
				}
				if(oldTooltipArea[0]!==tooltipArea[0]||oldTooltipArea[1]!==tooltipArea[1]){
					this.tooltipArea=tooltipArea;
				}
				//提示框内容宽度控制
				if(this.value){
					this.tooltipWidth=this.getCharLength(this.value,0);
				}
			},
			mouseover(e){
				if(this.value){
					this.show=true;
				}
				this.$emit('mouseover',e);
			},
			mouseout(e){
				this.show=false;
				this.$emit('mouseout',e);
			},
		},
		computed:{
			arrowIcon(){
				if(this.placement<4){
					return 'xiajiantou';
				}else if(this.placement<7){
					return 'zuojiantou';
				}else if(this.placement<10){
					return 'shangjiantou';
				}else{
					return 'youjiantou';
				}
			},
			mainStyle(){
				let contextArea=this.contextArea,tooltipArea=this.tooltipArea,placement=this.placement,style={};
				if(this.tooltipWidth>0){
					let w=this.tooltipWidth*10;
					w=w>200?200:w;
					style['min-width']=w.toString()+'px';
				}
				// top
				if(placement<=3){//上
					style.bottom=(contextArea[1]+8).toString()+'px';
				}else if(placement===4||placement===12){//中上
					style.top='0px';
				}else if(placement===5||placement===11){//中
					style.top=((contextArea[1]-tooltipArea[1])/2).toString()+'px';
				}else if(placement===6||placement===10){//中下
					style.bottom='0px';
				}else if(placement>=7&&placement<=9){//下
					style.top=(contextArea[1]+8).toString()+'px';
				}

				// left 
				if(placement>=10){//左
					style.right=(contextArea[0]+8).toString()+'px';
				}else if(placement===1||placement===9){//中左
					style.left='0px';
				}else if(placement===2||placement===8){//中
					style.left=((contextArea[0]-tooltipArea[0])/2).toString()+'px';
				}else if(placement===3||placement===7){//中右
					style.right='0px';
				}else if(placement>=4&&placement<=6){//右
					style.left=(contextArea[0]+8).toString()+'px';
				}
				
				return style;
			},
			iconStyle(){
				let contextArea=this.contextArea,tooltipArea=this.tooltipArea,placement=this.placement,style={};
				// top
				if(placement<=3){//上
					style.top=(tooltipArea[1]-5).toString()+'px';
				}else if(placement===4||placement===12){//中上
					if(tooltipArea[1]>=contextArea[1]){
						style.top=((contextArea[1]/2)-8).toString()+'px';
					}else{
						style.top=((tooltipArea[1]/2)-8).toString()+'px';
					}
				}else if(placement===5||placement===11){//中
					style.top=((contextArea[1]/2)-8).toString()+'px';
				}else if(placement===6||placement===10){//中下
					if(tooltipArea[1]>=contextArea[1]){
						style.bottom=((contextArea[1]/2)-8).toString()+'px';
					}else{
						style.bottom=((tooltipArea[1]/2)-8).toString()+'px';
					}
				}else if(placement>=7&&placement<=9){//下
					style.bottom=(tooltipArea[1]-6).toString()+'px';
				}

				// left 
				if(placement>=10){//左
					style.right='-11px';
				}else if(placement===1||placement===9){//中左
					if(tooltipArea[0]>=contextArea[0]){
						style.left=((contextArea[0]/2)-8).toString()+'px';
					}else{
						style.left=((tooltipArea[0]/2)-8).toString()+'px';
					}
				}else if(placement===2||placement===8){//中
					style.left=((tooltipArea[0]/2)-8).toString()+'px';
				}else if(placement===3||placement===7){//中右
					if(tooltipArea[0]>=contextArea[0]){
						style.right=((contextArea[0]/2)-8).toString()+'px';
					}else{
						style.right=((tooltipArea[0]/2)-8).toString()+'px';
					}
				}else if(placement>=4&&placement<=6){//右
					style.left='-11px';
				}
				return style;
			},
		},
		
		
	}
</script>
