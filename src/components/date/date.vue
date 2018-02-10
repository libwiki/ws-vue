<template>
	<div :class="[prefix]">
		<header :class="[prefix+'-title']">
			<p>
				<span :class="[prefix+'-prev-year']" @click="prevYear">《</span>
				<Icon icon="return" @click="prevMonth"></Icon>
			</p>
			<span :class="[prefix+'-year']">{{year}}年</span>
			<span :class="[prefix+'-month']">{{month}}月</span>
			<p>
				<Icon icon="enter" @click="nextMonth"></Icon>
				<span :class="[prefix+'-next-year']" @click="nextYear">》</span>
			</p>
		</header>

		<div :class="[prefix+'-row',prefix+'-head','date']">
			<span :class="[prefix+'-col']" v-for="(item,i) of dateWeek" :style="signStyle">{{item}}</span>
		</div>

		<p :class="[prefix+'-row','date']" v-for="(item,i) of dateView" @mouseout="mouseout">
			<span :class="[prefix+'-col',v.isDate?'is-date':'',sign?'':'is-check',...v.otherClass]" v-for="(v,k) of item" @click="click(i,k)" @mouseover="mouseover(i,k)" :style="signStyle">
				<Icon icon="check" :class="[prefix+'-sign']" v-if="v.isDate&&sign"></Icon>
				{{v.val}}
			</span>
		</p>
	</div>
</template>
<script>
	import mixins from '@/mixins'
	export default {
		name:'Date',
		mixins:[mixins],
		props:{
			time:{
				type:[String,Number],
				default:Date.now(),
			},
			start:{
				type:[String,Number],
				default:0,
			},
			range:{
				type:Boolean,
				default:false,
			},
			format:{
				type:String,
				default:'Y-m-d',
			},
			sign:{
				type:Boolean,
				default:false,
			},
		},
		data(){
			return {
				prefix:'ws-date',
				year:null,
				month:null,
				date:null,
				selectedTime:0,//单选时设置该时间 取消时为0
				startTime:0,//range(true) 起点时间 未选中为0
				endTime:0,//range(true) 终点时间 未选中为0
				mouseLocation:0,//range(true) 起点时间存在时 鼠标的范围大于起点时间
				dateArray:[],//this.time指向的时间分解数组
				dateView:[],//日历主体二维数组
				dateWeek:['日','一','二','三','四','五','六'],
				className:{
					selected:'is-selected',//选中样式
					range:'is-range',//范围样式
				}
			}
		},
		watch:{
			mouseLocation(newVal,oldVal){
				if(!this.range)return;
				if(this.endTime===0&&this.startTime>0&&newVal>this.startTime){
					let dateView=this.dateView,className=this.className.range;
					dateView.forEach(row=>{
						row.forEach(col=>{
							if(col.isDate){
								let hasIndex=col.otherClass.indexOf(className);
								if(col.timeStamp<=newVal&&col.timeStamp>this.startTime){
									if(hasIndex<0)col.otherClass.push(className);
								}else{
									if(hasIndex>=0)col.otherClass.splice(hasIndex,1);
								}
							}
						})
					})
				}
				if(newVal===0&&this.endTime===0)this.removeOtherClass(this.className.range);
			},
			selectedTime(newVal,oldVal){
				this.removeOtherClass(this.className.selected,oldVal,oldVal);
				this.addOtherClass(this.className.selected,newVal,newVal);
			},
			startTime(newVal,oldVal){
				this.removeOtherClass(this.className.selected,oldVal);
				this.removeOtherClass(this.className.range,oldVal);
				this.addOtherClass(this.className.selected,newVal,newVal);
			},
			endTime(newVal,oldVal){
				if(newVal===0){
					this.removeOtherClass(this.className.range,this.startTime,oldVal);
				}
				this.addOtherClass(this.className.selected,newVal,newVal);
			},
			time(){
				this.init();
			},
			start(){
				this.initStartTime();
			},
		},
		computed:{
			signStyle(){
				let style={};
				if(this.sign){
					style['width']='40px';
					style['line-height']='40px';
				}
				return style;
			}
		},
		created(){
			this.init();
		},
		methods:{
			init(){
				this.initTime();
				this.initDateView();
				this.initStartTime();
			},
			initTime(){
				let date=this.wsDate(this.time);
				this.year=date[0];
				this.month=date[12];
				this.date=date[2];
				this.dateArray=date;
			},
			initStartTime(){
				let startTime=this.wsDate(this.start)[7];
				this.startTime=startTime;
				this.addOtherClass(this.className.selected,startTime,startTime);
			},
			getDate(date=this.date,month=this.month,year=this.year){
				return this.dateFormat(year+'-'+month+'-'+date,this.format)
			},
			initDateView(){
				let dateView=[],col=7,dateArray=this.dateArray,
				than=col-parseInt(dateArray[11]),
				row=Math.ceil((parseInt(dateArray[10])-than)/col+1);
				for(let i=0;i<row;i++){
					let cols=[];
					for(let j=1;j<=col;j++){
						let number=i*col+j-dateArray[11];
						if(number>0&&number<=dateArray[10]){
							cols.push({
								val:number,
								timeStamp:this.wsDate(this.getDate(number))[7],
								isDate:true,
								otherClass:[],
							});
						}else{
							cols.push({
								val:'',
								timeStamp:0,
								isDate:false,
								otherClass:[],
							});
						}
					}
					dateView.push(cols);
				}
				this.dateArray=dateArray;
				this.dateView=dateView;
			},
			addOtherClass(className,startTime,endTime){
				this.dateView.forEach(row=>{
					row.forEach(col=>{
						if(col.isDate){
							let hasIndex=col.otherClass.indexOf(className);
							if(col.timeStamp<=endTime&&col.timeStamp>=startTime){
								if(hasIndex<0)col.otherClass.push(className);
							}
						}
					})
				})
			},
			removeOtherClass(className,startTime=0,endTime=0){
				this.dateView.forEach(row=>{
					row.forEach(col=>{
						if(col.isDate){
							let hasIndex=col.otherClass.indexOf(className);
							if(endTime===0){
								if(hasIndex>=0&&col.timeStamp>=startTime){
									col.otherClass.splice(hasIndex,1);
								}
							}else{
								if(hasIndex>=0&&col.timeStamp<=endTime&&col.timeStamp>=startTime){
									col.otherClass.splice(hasIndex,1);
								}
							}
							
						}
					})
				})
			},
			click(row,col){
				let dateView=this.dateView,dateArray=this.dateArray,selected=false;
				if(dateView[row]&&dateView[row][col]&&dateView[row][col].isDate){
					let className='is-selected',//选中样式
						checkDay=dateView[row][col].val,//当天（10）
						date=this.getDate(checkDay),//当天（2018-02-10）
						checkDate=this.wsDate(date);//当天 (Array)
					if(this.range){//范围选择
						if(this.startTime===0){//首次点击设置起点
							this.startTime=checkDate[7];
						}else if(this.endTime>0){//已存在终点 重新设置起点
							this.removeOtherClass(this.className.selected,this.endTime);
							this.endTime=0;
							this.startTime=checkDate[7];
						}else{
							if(checkDate[7]>=this.startTime){
								this.endTime=checkDate[7];
							}else{//当前点小于起始点 重新设置起点
								this.removeOtherClass(this.className.selected,this.endTime);
								this.endTime=0;
								this.startTime=checkDate[7];
							}
						}
						this.$emit('click',{
							date,
							date:this.dateFormat(this.startTime,this.format),
							timeStamp:this.startTime,
							selected:this.startTime>0,
						},{
							date:this.endTime>0?this.dateFormat(this.endTime,this.format):null,
							timeStamp:this.endTime,
							selected:this.endTime>0,
						});	
					}else{
						if(this.selectedTime===checkDate[7]){
							this.selectedTime=0;
						}else{
							this.selectedTime=checkDate[7];
						}
						this.$emit('click',{
							date,
							timeStamp:checkDate[7],
							selected:this.selectedTime>0,
						});	
					}
				}

			},
			mouseover(row,col){
				let dateView=this.dateView;
				if(dateView[row]&&dateView[row][col]&&dateView[row][col].isDate&&dateView[row][col].timeStamp>this.startTime){
					this.mouseLocation=dateView[row][col].timeStamp;
				}else{
					this.mouseLocation=0;
				}
			},
			//鼠标离开日历控件
			mouseout(){
				if(this.endTime===0)this.mouseLocation=0;
			},
			prevYear(){
				let year=parseInt(this.year);
				if(year>0){
					this.year=year-1;
				}
				this.init();
			},
			nextYear(){
				let year=parseInt(this.year);
				this.year=year+1;
				this.init();
			},
			prevMonth(){
				let month=parseInt(this.month);
				if(month>1){
					this.month=this.prefixInteger(month-1,2);
					this.init();
				}else{
					this.month=12;
					this.prevYear();
				}
				
			},
			nextMonth(){
				let month=parseInt(this.month);
				if(month<12){
					this.month=this.prefixInteger(month+1,2);
					this.init();
				}else{
					this.month='01';
					this.nextYear();
				}
			},
		}
	}
</script>