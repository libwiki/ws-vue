<template>
	<div :class="prefix">
		<Input :icon="dropIcon" :size="size" :value="value" @click="click" :placeholder="placeholder" bgColor="#fff" readonly></Input>
		<div v-show="drop" :class="mainClass">
			<slot>
				<p class="no-data">暂无数据</p>
			</slot>
		</div>
	</div>
</template>
<script>
	import store from '@/store'
	export default{
		name:'Select',
		props:{
			value:String,
			placeholder:String,
			size:String,
		},
		data(){
			return {
				prefix:'ws-select',
				drop:false,
				sign:true,
			}
		},
		computed:{
			dropIcon(){
				if(this.drop)return 'shangjiantou';
				return 'xiajiantou';
			},
			mainClass(){
				let classs=[this.prefix+'-main'];
				if(this.size)classs.push(this.prefix+'-'+this.size);
				return classs;
			}
		},
		watch:{
			value(val){
				this.setDefaultValue(val);
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				this.setDefaultValue(this.value);// 初始化默认选中状态
				//监听用户选择
				store.store.$on('ws-option-selected',data=>{
					if(this._uid===data._uid){
						if(typeof data.value!=='undefine'){
							this.$emit('input',data.value)
						}
						this.drop=false;
					}
				})

				this.$el.addEventListener('click',e=>{
					if(this.drop){
						this.sign=false
					}
				})
				window.addEventListener('click',e=>{
					if(this.sign){
						this.drop=false;
					}else{
						this.sign=true;
					}
				})
			},
			setDefaultValue(val){
				store.store.$emit('ws-option-default',{_uid:this._uid,value:val});
			},
			click(e){
				this.drop=!this.drop;
				this.$emit('click',e);
			},

		}
	}
</script>