<template>
	<div :class="prefix">
		<slot>
			<Button v-for="(item,key) of btnList" :type="item.type" @click="item.callback" :key="key" :item="item.item">{{item.value}}</Button>
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
	}
</script>