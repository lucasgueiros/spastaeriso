<template>
	<div id="app">
		<div>
			<div class="navbar navbar-expand-sm navbar-dark bg-dark">
				<router-link class="navbar-brand" to="/">
					Sistema Pasta e Riso
				</router-link>
				<button class="navbar-toggler" type="button" data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent" aria-expanded="false"
					aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav mr-auto">
						<li class="navbar-item active">
							<router-link class="nav-link" 
								:to="{ name: 'recipes-list', params: { link: 'http://localhost:8090/api1/recipes' } }">
								Receitas
							</router-link>
						</li>
					</ul>
				</div>
			</div>
			<div class="container mt-3 mb-3" >
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
