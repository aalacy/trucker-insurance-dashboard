<template>
	<div class="home-view">
		<div class="container">
			<h1>{{ title }}</h1>
			<p>{{ content }}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Service',

		props: {
			title: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-view {
	  min-height: calc(100vh - 165px);
	}
</style>