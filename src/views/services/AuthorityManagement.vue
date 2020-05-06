<template>
	<Service 
		title="Authority Management"
		content="Authority Management content"
	/>
</template>

<script>
	export default {
		name: 'AuthorityManagement',

		components: {
			Service:() => import('./Service.vue')
		}
	}
</script>