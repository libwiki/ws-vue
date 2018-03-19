<template>
	<div :class="prefix" :style="style">
		<span :class="[prefix+'-multiple']" v-for="item of imagesUrl" :style="imgStyle">
			<img :src="item">
		</span>
		<div :class="[prefix+'-file']" :style="fileStyle">
			<span :class="[prefix+'-file-icon']">+</span>
			<img 
				:class="[prefix+'-file-img']" 
				:src="imagesUrl[0]" 
				v-if="!multiple" 
				v-show="imagesUrl[0]" 
				:style="imgStyle"
			>
			<input type="file" title=" " :class="[prefix+'-file-input']" @change="upload">
		</div>
		
	</div>
</template>
<script>
	import http from './http'
	import img from './head.jpg'
	export default{
		props:{
			action:String,
			data:Array,
			autoUpload:{
				type:Boolean,
				default:true
			},
			multiple:{
				type:Boolean,
				default:true
			},
			name:{
				type:String,
				default:'file'
			},
			width:{
				type:Number,
				default:150
			},
			height:{
				type:Number,
				default:150
			}
		},
		data(){
			return {
				prefix:'ws-upload',
				imagesUrl:[img,img],
				files:[],
				isOneImage:true,
			}
		},
		computed:{
			style(){
				let w=this.width,h=this.height,l=this.imagesUrl.length,
					width=l>0?l*w:w,height=l>0?l*h:h;
				if(this.multiple){
					return {display:'table-row'}
				}else{
					return {width:width+'px',height:height+'px'}
				}
			},
			fileStyle(){
				let style={width:this.width+'px',height:this.height+'px','line-height':this.height+'px'}
				if(this.multiple)style['display']='table-cell';
				return style;
			},
			imgStyle(){
				let style={width:this.width-2+'px',height:this.height-2+'px'}
				if(this.multiple)style['display']='table-cell';
				return style;
			},
		},
		methods:{
			upload(e){
				let file=e.target.files[0],
					URL=window.URL||window.webkitURL||window.mozURL,
					url=URL.createObjectURL(file);
				if(this.multiple){
					this.imagesUrl.push(url)
					if(this.autoUpload){ 
						//上传
					}else{
						this.files.push(file)
					}
				}else{
					this.imagesUrl=[url]
					if(this.autoUpload){ 
						//上传
					}else{
						this.files=[file]
					}
					
				}
			}
		},
	}
</script>