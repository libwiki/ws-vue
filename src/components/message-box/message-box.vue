<template>
	<div :class="prefix" v-if="show">
		<LayHead @close="close">{{title}}</LayHead>
		<LayBody><slot>{{content}}</slot></LayBody>
	</div>
</template>
<script>
	import {LayHead,LayBody} from '../base'
	import Modal from '../modal'
	export default {
		name:'MessageBox',
		props:{
			title:String,
			content:String,
			show:{type:Boolean,default:false}
		},
		created(){
			//Modal.open()
		},
		data(){
			return {
				prefix:'ws-message-box',
			}
		},
		methods:{
			close(e){
				this.$emit('close',e)
			},
		}
	}
</script>
