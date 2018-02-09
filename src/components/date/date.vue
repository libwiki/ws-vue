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
			<span :class="[prefix+'-col']" v-for="(item,i) of dateHead">{{item}}</span>
		</div>

		<p :class="[prefix+'-row','date']" v-for="(item,i) of dateView">
			<span :class="[prefix+'-col',v.isDate?'is-date':'',sign?'':'is-check',...v.otherClass]" v-for="(v,k) of item" @click="click(i,k)" @mouseover="mouseover(i,k)" @mouseout="mouseout(i,k)">
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
				year:'',
				month:'',
				date:'',
				dateArray:[],//this.currentDate指向的时间分解数组
				dateView:[],//日历主体二维数组
				dateHead:['日','一','二','三','四','五','六'],
				selectArea:[],//当前选中的坐标[row,col]...
			}
		},
		computed:{
			currentDate(){
				return this.year+'-'+this.month+'-'+this.date;
			},
		},
		created(){
			this.setDefaultTime();
			this.init();
		},
		methods:{
			setDefaultTime(){
				let date=this.wsDate(this.time);
				this.year=date[0];
				this.month=date[12];
				this.date=date[2];
			},
			getDate(date=this.date,month=this.month,year=this.year){
				return this.dateFormat(year+'-'+month+'-'+date,this.format)
			},
			init(val=this.currentDate){
				let dateView=[],col=7,dateArray=this.wsDate(val),
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
				this.dateView=dateView;
				this.dateArray=dateArray;
			},
			click(row,col){
				let dateView=this.dateView,dateArray=this.dateArray,selected=false;
				if(dateView[row]&&dateView[row][col]&&dateView[row][col].isDate){
					let className='is-selected',hasIndex=dateView[row][col].otherClass.indexOf(className),checkDay=dateView[row][col].val,
						date=this.getDate(checkDay);
					if(hasIndex>=0){
						dateView[row][col].otherClass.splice(hasIndex,1);
					}else{
						//清除已选项
						this.selectArea.forEach(item=>{
							let index=dateView[item[0]][item[1]].otherClass.indexOf(className);
							if(index>=0)dateView[item[0]][item[1]].otherClass.splice(index,1);
						});

						dateView[row][col].otherClass.push(className);
						this.selectArea.push([row,col]);
						this.date=checkDay;
						selected=true;
					}

					this.$emit('click',{
						date,
						timeStamp:this.wsDate(date)[7],
						selected,
					});	
				}

			},
			mouseover(row,col){
			},
			mouseout(row,col){
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