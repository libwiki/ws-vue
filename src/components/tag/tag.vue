<template>
	<span :class="classs" :style="style" @click="checked" @mouseover="mouseover" @mouseout="mouseout">
		<input class="ws-tag-content" type="text" :size="inputWidth" :value="value" :style="inputStyle" :autofocus="editable" :focus="editable" @input="input" @keydown.enter="blur" @blur="blur"  v-if="editType">
		<span class="ws-tag-content" v-text="value" @dblclick="dblclick" v-else="editType"></span>
		<Icon icon="cuowuguanbiquxiao" class="ws-tag-close" @click="close" v-if="closable"></Icon>
	</span>
</template>
<script>
	import Icon from '../icon'
	export default{
		name:'Tag',
		props:{
			item:[String,Number],
			value:String,
			size:String,
			type:String,
			hoverType:String,
			color:String,
			bgColor:String,
			checkable:{type:Boolean,default:false},
			closable:{type:Boolean,default:false},
			editable:{type:Boolean,default:false},
		},
		data(){
			return {
				prefix:'ws-tag',
				hoverStr:'multi',
				checkedStyle:false,
				hoverStyle:false,
				editType:false,
			}
		},
		computed:{
			classs(){
				let classs=[this.prefix];
				if(this.checkedStyle)classs.push(this.prefix+'-checked');
				if(this.size)classs.push(this.prefix+'-'+this.size);
				if(this.type)classs.push(this.prefix+'-'+this.type);
				if(this.hoverType===this.hoverStr)classs.push(this.prefix+'-'+this.hoverType);
				return classs;
			},
			style(){
				let style={}
				if(this.closable)style['padding-right']='5px';
				if(this.color)style['color']=this.color;
				if(this.bgColor){
					if(this.checkedStyle||this.hoverStyle){
						style['background-color']=this.bgColor;
						style['border-color']=this.bgColor;
						style['color']='#fff';
					}
				}
				return style;
			},
			inputStyle(){
				let style={}
				if(this.bgColor)style['color']=this.bgColor;
				return style;
			},
			inputWidth(){
				return this.getChartLength(this.value);
			}
		},
		created(){
			window.addEventListener('click',e=>{
				if(e.target.className!=='ws-tag-content'||e.target.tagName!=='INPUT'){
					this.blur()
				}
			})
		},
		methods:{
			//实现input随内容增加自动增长
			getChartLength(val,defaultLength=5){
                let len=val.length,pattern = /[^\x00-\x80]/g,length=0,count=0;
                if(len<=0||typeof val !=='string')return 1;
                for (let i = 0; i <= len; i++) {
                	if(pattern.test(val)||val==='%'||val==='@'){//占位两字符
	                    length+=2;
	                }else{
	                	count++;
	                	length++;
	                }
                }
                if(count===0){
                	length+=2;
                }else if(count===1){
                	length++;
                }
                let rs=length>defaultLength?length-defaultLength:1;
                console.log(rs)
                return rs;
			},
			//点击关闭按钮
			close(e){
				this.$emit('close',e,this.item)
			},
			//单击改变选中状态
			checked(e){
				if(this.checkable&&!this.editable)this.checkedStyle=!this.checkedStyle;
				this.$emit('click',e,this.item,this.checkedStyle)
			},
			//自定义背景色并且开启hoverType
			mouseover(e){
				if(this.hoverType===this.hoverStr&&this.bgColor){
					this.hoverStyle=true;
				}
				this.$emit('mouseover',e)
			},
			mouseout(e){
				this.hoverStyle=false;
				this.$emit('mouseout',e)
			},
			input(e){
				this.$emit('input',e.target.value)
			},
			//可编辑开启
			dblclick(e){
				if(this.editable)this.editType=true;
				this.$emit('dblclick',e)
			},
			//可编辑状态还原
			blur(){
				this.editType=false
			}
		}
	}
</script>