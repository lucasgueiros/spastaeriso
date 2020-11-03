<template>
	<div>
		<table class="table">
			<thead>
				<tr>
					<th>Título</th>
					<th>Tempo total (min)</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(item,index) in items"
					:key="index"
					@click="setActive(item,index)">
						<td> {{ item.title }} </td>
						<td> <router-link :to="{ path: 'recipes/detail', params: {id: 1}, query: { link: item._links.self.href} }">Details</router-link> </td>
				</tr>
			</tbody>
		</table>
	</div>
</template>


<script>
import RecipeDataService from "./RecipeDataService"

export default {
	data() {
		return {
			items: [],
			item: {},
			index: 0
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