<template>
	<div :class="[prefix]">
		<p :class="[prefix+'-row']" v-for="(item,i) of dateView">
			<span :class="[prefix+'-col','date']" v-for="(v,k) of item">日</span>
		</p>
	</div>
</template>
<script>
	import mixins from '@/mixins'
	export default {
		name:'Date',
		mixins:[mixins],
		props:{

		},
		data(){
			return {
				prefix:'ws-date',
				row:0,
				col:7,
				dateArray:[],
				dateView:[],
			}
		},
		created(){
			this.init();
			console.log(this.dateArray,this.row,this.col)
			
		},
		methods:{
			init(val){
				let dateView=[],col=this.col,dateArray=this.getDate(val),
				than=col-parseInt(dateArray[11]),
				row=Math.ceil((parseInt(dateArray[10])-than)/col+2);
				for(let i=0;i<row;i++){
					let cols=[];
					for(let j=0;j<col;j++){
						cols.push(j);

					}
					dateView.push(cols);
				}
				this.dateView=dateView;
				this.row=row;
				this.dateArray=dateArray;

			}
		}
	}
</script>