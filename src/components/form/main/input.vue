<template>
	<span :class="classs">
		<span :class="[prefix+'-before']" :ref="prefix+'-before'" :style="beforeStyle">
			<slot>
				<Icon :icon="iconBefore" :color="iconColor" v-if="iconBefore"></Icon>
			</slot>
		</span>
		<input :class="[prefix+'-main']" type="text" autocomplete="off" :value="value" @input="input" @focus="focus" @blur="blur" :style="mainStyle">
		<span :class="[prefix+'-after']" :ref="prefix+'-after'" :style="afterStyle">
			<slot name="after">
				<Icon :icon="icon" :color="iconColor" v-if="icon"></Icon>
			</slot>
		</span>
	</span>
</template>
<script>
	export default {
		name:'Input',
		props:{
			value:[String,Number],
			iconBefore:String,
			icon:String,
			iconColor:String,
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
			classs(){
				let classs=[this.prefix];
				if(this.active)classs.push('hover');
				return classs;
			},
			mainStyle(){
				let style={};
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
		}
	}
</script>