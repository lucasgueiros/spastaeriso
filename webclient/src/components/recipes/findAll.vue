<template>
	<div>
		<b-table striped hover :items="items"></b-table>
	</div>
</template>

<script>
import RecipeDataService from "./RecipeDataService"

export default {
	data() {
		return {
			items: []
		}
	},
	methods: {
		retrive() {
			RecipeDataService.findAll()
			.then(response => {
				this.items = response.data._embedded.recipes;
				console.log(this.items);
			})
			.catch(e => {
				console.log(e);
			});
		}
	},
	created () {
		this.retrive();
	}
}
</script>