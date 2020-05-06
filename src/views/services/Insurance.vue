<template>
	<Service 
		title="Insurance"
		content="Insurance content"
	/>
</template>

<script>
	export default {
		name: 'Insurance',

		components: {
			Service:() => import('./Service.vue')
		}
	}
</script>