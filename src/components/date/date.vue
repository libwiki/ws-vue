<template>
	<div :class="prefix">
		<Input :placeholder="placeholder" :readonly="true" icon="rili1" v-model="val" @click="datePicker"></Input>
		<div :class="[prefix+'-main']" v-show="drop">
			<Calendar :time="value" :drop="drop" @click="checkDate"></Calendar>
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
				default:false
			},
			range:{
				type:Boolean,
				default:false
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
			val:{
				get(){
					return this.dateFormat(this.value,this.format);
				},
				set(val){
					this.$emit('input',val);
				}
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