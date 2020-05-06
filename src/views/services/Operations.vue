<template>
	<Service 
		title="Business Operations"
		content="Business Operations content"
	/>
</template>

<script>
	export default {
		name: 'BusinessOperations',

		components: {
			Service:() => import('./Service.vue')
		}
	}
</script>