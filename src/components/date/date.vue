<template>
	<div :class="prefix">
		<Input :placeholder="placeholder" :readonly="true" icon="rili1" v-model="value" @click="datePicker"></Input>
		<div :class="[prefix+'-main']" v-show="drop">
			<Calendar :time="startTime" :end="endTime" :drop="drop" @click="checkDate" :range="range" style="float:left;"></Calendar>
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
			separator:{
				type:String,
				default:' ~ '
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
				startTime:0,
				endTime:0
			}
		},
		computed:{
			// val:{
			// 	get(){
			// 		return this.dateFormat(this.value,this.format);
			// 	},
			// 	set(val){
			// 		this.$emit('input',val);
			// 	}
			// },
		},
		created(){
			let valDate=this.value.split(this.separator);
			this.startTime=this.wsTime();
			if(valDate[1])this.endTime=this.wsTime(valDate[1]);
			
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
			checkDate(start,end){
				this.startDate=start.timeStamp
				let val=this.dateFormat(start.timeStamp,this.format)
				if(this.range){
					this.endDate=end.timeStamp
					val+=this.separator
					if(end.timeStamp>0){
						this.drop=false;
						val+=this.dateFormat(end.timeStamp,this.format)
					}
				}else{
					this.drop=false;
				}
				this.$emit('input',val);
				this.$emit('check',start,end);
			},
			datePicker(){
				this.drop=!this.drop;
			}
		}
	}
</script>