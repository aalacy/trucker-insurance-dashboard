<template>
	<Service 
		title="Maintenance"
		content="Maintenance content"
	/>
</template>

<script>
	export default {
		name: 'Maintenance',

		components: {
			Service:() => import('./Service.vue')
		}
	}
</script>