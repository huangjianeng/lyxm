<template>
	<div class="wrap">
		<publish-head></publish-head>
		<div class="main">
			<publish-main></publish-main>
		</div>
		<div class="content_wrap">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import PublishMain from '../components/main.vue'
import PublishHead from '../components/head.vue'

export default {
	name: 'systemIndex',
	components: {
		PublishMain,
		PublishHead,
	},
}
</script>
<style lang="scss" scoped>
.wrap {
	position: relative;
	height: 100%;
	width: 100%;
}
.main {
	// display: flex;
	position: absolute;
	z-index: 1;
	left: 0;
	top: 70px;
	height: 100%;
	width:200px;
}
.content_wrap {
    position: relative;
    box-sizing: border-box;
    padding-left: 200px;
    padding-top: 70px;
    height: 100%;
    width: 100%;
}
</style>
