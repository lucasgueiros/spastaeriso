<template>
	<div>
		<table class="table">
			<thead>
				<tr>
					<th>Título</th>
					<th>Ações</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(item,index) in items"
					:key="index">
						<td> {{ item.title }} </td>
						<td>
							
							<router-link
								tag="button"
								class="btn btn-primary" 
								:to="{ name: 'recipe-details', params: {link: item._links.self.href} }">
								Details
							</router-link>
						</td>
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