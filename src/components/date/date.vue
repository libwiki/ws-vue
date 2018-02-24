<template>
	<div :class="prefix">
		<Input :placeholder="placeholder" :readonly="readonly" icon="rili1" v-model="val" @click="datePicker"></Input>
		<div :class="[prefix+'-main']" v-show="drop">
			<Calendar :time="value" @click="checkDate"></Calendar>
		</div>
	</div>
</template>
<script>
	import mixins from '@/mixins'
	export default {
		name:'Date',
		mixins:[mixins],
		props:{
			value:[String,Number],
			placeholder:[String,Number],
			format:{
				type:String,
				default:'Y-m-d'
			},
			readonly:{
				type:Boolean,
				default:true
			},
		},
		data(){
			return {
				prefix:'ws-date',
				drop:false,
				sign:true,
			}
		},
		computed:{
			val(){
				return this.dateFormat(this.value,this.format);
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
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
			checkDate(val){
				this.drop=false;
				this.$emit('input',this.dateFormat(val.date,this.format));
				this.$emit('check',val);
			},
			datePicker(){
				this.drop=!this.drop;
			}
		}
	}
</script>