<template>
	<transition-group v-if="group" 
		:name="name" 
		:enter-active-class="enterActiveClass" 
		:leave-active-class="leaveActiveClass" 
		:move-class="moveClass" 
		:tag="tag" 
		:mode="mode" 
	>
		<slot></slot>
	</transition-group>
	<transition v-else="group" 
		:name="name" 
		:enter-active-class="enterActiveClass" 
		:leave-active-class="leaveActiveClass" 
		:move-class="moveClass" 
		:tag="tag" 
		:mode="mode" 
	>
		<slot></slot>
	</transition>
</template>
<script>
	export default {
		name:'Animate',
		props:{
			group:{type:Boolean,default:false},
			name:String,
			in:String,
			out:String,
			move:String,
			tag:String,
			mode:String,
		},
		computed:{
			enterActiveClass(){
				let enterActiveClass='animated '+this.in;
				return this.name?'':enterActiveClass;
			},
			leaveActiveClass(){
				let leaveActiveClass='animated '+this.out;
				return this.name?'':leaveActiveClass;
			},
			moveClass(){
				let moveClass='animated '+this.move;
				return this.name?'':moveClass;
			},
		}
	}
</script>