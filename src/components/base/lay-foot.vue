<template>
	<div :class="prefix">
		<slot>
			<Button v-for="item of btnList" :type="item.type" @click="item.callback">{{item.value}}</Button>
		</slot>
	</div>
</template>
<script>
	import Button from '../button'
	export default{
		name:'LayHead',
		props:{
			btnList:{
				type:Array,
				default:function(){
					return [];
				}
			},
		},
		data(){
			return {
				prefix:'ws-lay-foot',
				
			}
		},
		methods:{
			close(){
				this.$emit('close')
			},
			callback(){
				console.log('callback')
			}
		}
	}
</script>