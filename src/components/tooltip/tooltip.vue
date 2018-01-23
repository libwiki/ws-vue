<template>
	<div :class="prefix">
		<!-- <span :class="[prefix+'-main']">
			123123123123123123333333333333
			sdasda
			123123
			23423
			asdasd
			22342
		</span> -->
		<slot></slot>
		<Icon :icon="arrowIcon" :class="[prefix+'-arrow']" :style="iconStyle"></Icon>
	</div>
</template>
<script>
	import Icon from '../icon'
	export default {
		name:'Tooltip',
		data(){
			return {
				prefix:'ws-tooltip',
				context:null,
				tooltip:null,
				arrow:null,
			}
		},
		props:{
			placement:{
				default:3,
				type:Number,
				validator(val){
					return val>0&&val<=12;
				},
			}
		},
		mounted(){
			this.context=this.$slots.default[0].elm;
			this.tooltip=this.$el.children[0];
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
			contextArea(){
				let area=[0,0];
				if(this.context!==null){
					area=[this.context.offsetWidth,this.context.offsetHeight];
				}
				return area;
			},
			tooltipArea(){
				let area=[0,0];
				if(this.tooltip!==null){
					area=[this.tooltip.offsetWidth,this.tooltip.offsetHeight];
				}
				return area;
			},
			mainStyle(){
				let contextArea=this.contextArea,tooltipArea=this.tooltipArea,placement=this.placement,style={};
				switch(placement){
					case 'left':
						style.left=(0-tooltipArea[0]).toString()+'px';
					  	break;
					case 'top':
						style.top=(0-tooltipArea[1]).toString()+'px';
						style.left='50%';
						style.transform='translate(-50%,0)';
					  	break;
					case 'right':
						style.left=contextArea[0].toString()+'px';
					  	break;
					default:
						style.top=contextArea[1].toString()+'px';
				}
				return style;
			},
			iconStyle(){
				let contextArea=this.contextArea,tooltipArea=this.tooltipArea,placement=this.placement,style={};
				if(this.placement<4){//上
					style.top='0px';
					style.left='50%';
					style.transform='translate(-50%,0)';
				}else if(this.placement<7){//右
					return 'zuojiantou';
				}else if(this.placement<10){//下
					style.top=tooltipArea[1].toString()+'px';
					style.left='50%';
					style.transform='translate(-50%,0)';
				}else{//左
					return 'youjiantou';
				}
				return style;
			},
		},
		methods:{

		}
		
	}
</script>
