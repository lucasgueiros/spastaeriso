<template>
	<div>
		<b-table striped hover :items="items" :fields="fields"></b-table>
	</div>
</template>

<script>
import RecipeDataService from "./RecipeDataService"

export default {
	data() {
		return {
			fields: [
				{
					key: 'title',
					label: "Título"
				},
				{
					key: 'data',
					label: "Criada em"
				},
				{
					key: 'preparationTime',
					label: "Tempo de preparação (min)"
				},
				{
					key: 'totalTime',
					label: "Tempo total (min)"
				}],
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