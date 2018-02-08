<template>
	<span :class="classs" :style="style">
		<span :class="[prefix+'-before']" :ref="prefix+'-before'" :style="beforeStyle" @click="beforeClick">
			<slot>
				<Icon :icon="iconBefore" :color="iconColor" v-if="iconBefore"></Icon>
			</slot>
		</span>
		<input :class="mainClass" type="text" autocomplete="off" :value="value" @input="input" @focus="focus" @blur="blur" @click="click" :placeholder="placeholder" :style="mainStyle" :readonly="readonly" :disabled="disabled" :size="inputWidth">
		<span :class="[prefix+'-after']" :ref="prefix+'-after'" :style="afterStyle" @click="afterClick">
			<slot name="after">
				<Icon :icon="icon" :color="iconColor" v-if="icon&&!clearable"></Icon>
				<Icon icon="cuowuguanbiquxiao" v-if="clearable" v-show="hasValue" class="clearable" @click="clear"></Icon>
			</slot>
		</span>
	</span>
</template>
<script>
	import mixins from '@/mixins'
	export default {
		name:'Input',
		mixins:[mixins],
		props:{
			value:[String,Number],
			bgColor:String,
			minWidth:String,
			maxWidth:String,
			iconBefore:String,
			icon:String,
			iconColor:String,
			clearable:{
				type:Boolean,
				default:false
			},
			placeholder:String,
			size:String,
			readonly:{
				type:Boolean,
				default:false
			},
			disabled:{
				type:Boolean,
				default:false
			},
		},
		data(){
			return {
				prefix:'ws-input',
				active:false,
				hasBefore:false,
				hasAfter:false,
			}
		},
		mounted(){
			this.init();
		},
		updated(){
			this.init();
		},
		computed:{
			hasValue(){
				return this.value.toString().length>0;
			},
			inputWidth(){
				//仅当设置了最小宽度和最大宽度时input可随内容变换
				if(!this.minWidth||!this.maxWidth)return 0;
				if(this.value){
					let w=this.getCharLength(this.value);
					if(w>=18)return w;
				}
				return 0;
			},
			classs(){
				let classs=[this.prefix];
				if(this.readonly)classs.push('readonly')
				if(this.active)classs.push('hover');
				if(this.disabled)classs.push('disabled');
				if(this.size)classs.push(this.prefix+'-'+this.size);
				return classs;
			},
			style(){
				let style={};
				if(this.bgColor)style['background-color']=this.bgColor;
				return style;
			},
			mainClass(){
				let classs=[this.prefix+'-main'];
				if(this.readonly)classs.push('readonly')
				if(this.disabled)classs.push('disabled');
				return classs;
			},
			mainStyle(){
				let style={};
				if(this.bgColor)style['background-color']=this.bgColor;
				if(this.minWidth)style['min-width']=this.minWidth;
				if(this.maxWidth)style['max-width']=this.maxWidth;
				if(!this.hasBefore)style['border-left-width']='0px';
				if(this.icon||!this.hasAfter)style['border-right-width']='0px';
				return style;
			},
			beforeStyle(){
				let style={};
				if(!this.iconBefore&&!this.hasBefore)style['padding']='0px';
				return style;
			},
			afterStyle(){
				let style={};
				if(!this.icon&&!this.hasAfter)style['padding']='0px';
				return style;
			},
		},
		methods:{
			init(){
				let refs=this.$refs,
					hasBefore=refs[this.prefix+'-before'].innerText.length>0?true:false,
					hasAfter=refs[this.prefix+'-after'].innerText.length>0?true:false;
				if(this.hasBefore!==hasBefore)this.hasBefore=hasBefore;
				if(this.hasAfter!==hasAfter)this.hasAfter=hasAfter;

			},
			input(e){
				this.$emit('input',e.target.value);
			},
			focus(e){
				this.active=true;
				this.$emit('focus',e);
			},
			blur(e){
				this.active=false;
				this.$emit('blur',e);
			},
			clear(){
				this.$emit('input','');
			},
			click(e){
				this.$emit('click',e);
			},
			beforeClick(e){
				this.$emit('beforeClick',e);
			},
			afterClick(e){
				this.$emit('afterClick',e);
			},
		}
	}
</script>