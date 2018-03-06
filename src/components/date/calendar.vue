<template>
	<div :class="prefix">
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
			<span 
				:class="[prefix+'-col',v.isDate?'is-date':'',...v.otherClass]" 
				v-for="(v,k) of item"	  
				:style="signStyle"
				@click="click(i,k)"
				@mouseover="mouseover(i,k)"
			>
				<Icon icon="check" :class="[prefix+'-sign']" v-if="v.isDate&&sign"></Icon>
				{{v.val}}
			</span>
		</p>
	</div>
</template>
<script>
	import mixins from '@/mixins'
	export default {
		name:'Calendar',
		mixins:[mixins],
		props:{
			time:[String,Number],
			min:[String,Number],
			end:[String,Number],
			range:{
				type:Boolean,
				default:false,
			},
			sign:{
				type:Boolean,
				default:false,
			},
			cancel:{
				type:Boolean,
				default:false,
			},
			format:{
				type:String,
				default:'Y-m-d',
			},
			drop:{
				type:Boolean,
				default:false,
			},
		},
		data(){
			return {
				prefix:'ws-calendar',
				year:null,
				month:null,
				date:null,
				isCancel:false,
				startTime:0,//range(true) 起点时间 未选中为0
				endTime:0,//range(true) 终点时间 未选中为0
				mouseLocation:0,//range(true) 起点时间存在时 鼠标的范围大于起点时间
				dateArray:[],//this.time指向的时间分解数组
				dateView:[],//日历主体二维数组
				dateWeek:['日','一','二','三','四','五','六'],
				className:{
					selected:'is-selected',//选中样式
					range:'is-range',//范围样式
					disable:'is-disable',//禁用样式
				}
			}
		},
		computed:{
			signStyle(){
				let style={};
				if(this.sign){
					style['width']='40px';
					style['line-height']='40px';
				}
				return style;
			},
			// 最小时间 小于该时间 用户不可选择
			minTime(){
				return this.wsTime(this.min||this.dateFormat(Date.now(),'Y-m-d'));
			},
			//用户设置的初始时间
			sTime(){
				return this.wsTime(this.time||this.dateFormat(Date.now(),'Y-m-d'));
			},
		},
		watch:{
			//开始点选中监听
			startTime(newVal,oldVal){
				let isSelected=this.className.selected;
				this._removeOtherClass(isSelected,oldVal,oldVal);
				this._addOtherClass(isSelected,newVal,newVal);

			},
			//结束点选中监听
			endTime(newVal,oldVal){
				//当用户选择的新起点为范围的终点时
				if(newVal===0&&this.startTime===oldVal)return;

				let isSelected=this.className.selected;
				this._removeOtherClass(isSelected,oldVal,oldVal);
				this._addOtherClass(isSelected,newVal,newVal);
			},
			//range 鼠标选择范围
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

				if(newVal===0&&this.endTime===0)this._removeOtherClass(this.className.range,1);
			},
			//用于日期选择器中的打开关闭的重载
			drop(newVal,oldVal){
				if(newVal)this.reset();
			},
		},
		created(){
			this.init();
		},
		methods:{
			//用于日期选择器中的打开关闭的重载
			reset(){
				let date=this.wsDate(this.startTime);
				this.year=date[0];
				this.month=date[12];
				this.date=date[2];
				this.init();
			},
			//初始化
			init(){
				this.initTime();
				this.initDateView();
				this.initSelected();
			},
			//初始化当前时间
			initTime(){
				if(this.end&&this.endTime===0){
					this.endTime=this.wsTime(this.end);
				}
				if(this.startTime===0&&!this.isCancel){
					this.startTime=this.sTime;
					let date=this.wsDate(this.startTime);
					if(this.year===null)this.year=date[0];
					if(this.month===null)this.month=date[12];
					if(this.date===null)this.date=date[2];
					let dateArray=this.wsDate(this._getDate());
					this.dateArray=dateArray;
				}
				
			},
			//初始化日历内容数组
			initDateView(){
				let dateView=[],col=7,
					dateArray=this.dateArray,
					className=this.className,
					minTime=this.minTime,
					startTime=this.wsTime(this.startTime),
					endTime=this.wsTime(this.endTime),
					than=col-parseInt(dateArray[11]),
					row=Math.ceil((parseInt(dateArray[10])-than)/col+1);
				for(let i=0;i<row;i++){
					let cols=[];
					for(let j=1;j<=col;j++){
						let number=i*col+j-dateArray[11];
						if(number>0&&number<=dateArray[10]){
							let timeStamp=this.wsTime(this._getDate(number)),
								isRange=timeStamp>startTime&&timeStamp<endTime;
							cols.push({
								val:number,
								timeStamp:timeStamp,
								isDate:true,
								otherClass:[
									timeStamp<minTime?className.disable:'',//小于最小时间则禁止选择
									isRange?className.range:'',//初始化选择范围
								],
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
				this.dateView=dateView;
			},
			// 初始化选择(主要用于用户选择年份、月份等切换后 返回的初始化选择样式)
			initSelected(){
				let startTime=this.wsTime(this.startTime),endTime=this.wsTime(this.endTime);
				if(startTime>0){
					this._addOtherClass(this.className.selected,startTime,startTime);
				}
				if(this.range&&endTime>0){
					this._addOtherClass(this.className.selected,endTime,endTime);
				}

			},
			//日历点击时间
			click(row,col){
				let dateView=this.dateView,dateArray=this.dateArray;
				//当且仅当点击的是日期范围
				if(dateView[row]&&dateView[row][col]&&dateView[row][col].isDate){
					let checkDay=dateView[row][col].val,//当天（10）
						date=this._getDate(checkDay),//当天（2018-02-10）
						checkTime=dateView[row][col].timeStamp;//当天 (时间戳)
					
					//this.minTime 限制了用户的最小选择日期
					if(checkTime<this.wsTime(this.minTime))return;
						
					if(this.range){//范围选择
						if(this.startTime===0){//首次点击设置起点
							this.startTime=checkTime;
						}else if(this.endTime>0){//已存在终点 重新设置起点
							this.endTime=0;
							this.startTime=checkTime;
							//重新设置起点 需要取消范围选择
							this._removeOtherClass(this.className.range,1);

						}else{
							if(checkTime>=this.startTime){//设置终点
								this.endTime=checkTime;
							}else{//当前点小于起始点(终点未存在) 重新设置起点
								this.endTime=0;
								this.startTime=checkTime;
							}
						}
						//触发 click 事件
						this.$emit('click',{
							date:this.dateFormat(this.startTime,this.format),
							timeStamp:this.startTime,
							selected:this.startTime>0,
						},{
							date:this.endTime>0?this.dateFormat(this.endTime,this.format):null,
							timeStamp:this.endTime,
							selected:this.endTime>0,
						});	
					}else{
						if(this.cancel&&this.startTime===checkTime){
							this.isCancel=true;
							this.startTime=0;
						}else{
							this.isCancel=false;
							this.startTime=checkTime;
						}
						this.$emit('click',{
							date,
							timeStamp:this.startTime,
							selected:this.startTime>0,
						});	
					}
				}

			},
			//用户范围选择样式
			mouseover(row,col){
				let dateView=this.dateView;
				if(dateView[row]&&dateView[row][col]&&dateView[row][col].isDate&&dateView[row][col].timeStamp>this.startTime){
					this.mouseLocation=dateView[row][col].timeStamp;
				}else{
					this.mouseLocation=0;
				}
			},
			//鼠标离开日历控件(主要用于取消用户范围选择样式)
			mouseout(){
				if(this.endTime===0)this.mouseLocation=0;
			},
			//获取当前日期（私有方法）
			_getDate(date=this.date,month=this.month,year=this.year){
				return this.dateFormat(year+'-'+month+'-'+date,this.format)
			},
			//添加样式
			_addOtherClass(className,startTime,endTime){
				if(typeof startTime==='string')startTime=this.wsTime(startTime);
				if(typeof endTime==='string')endTime=this.wsTime(endTime);
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
			//去除样式
			_removeOtherClass(className,startTime=0,endTime=0){
				if(typeof startTime==='string')startTime=this.wsTime(startTime);
				if(typeof endTime==='string')endTime=this.wsTime(endTime);
				this.dateView.forEach(row=>{
					row.forEach(col=>{
						if(col.isDate){
							let hasIndex=col.otherClass.indexOf(className);
							if(endTime===0&&startTime>0){
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
		},
	}
</script>