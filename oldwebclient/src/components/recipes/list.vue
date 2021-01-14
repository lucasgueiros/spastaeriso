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
					v-for="(recipe,index) in recipes"
					:key="index">
						<td> {{ recipe.title }} </td>
						<td>
							
							<router-link
								tag="button"
								class="btn btn-primary" 
								:to="{ name: 'recipes-details', params: {link: recipe._links.self.href + '?profile=recipeDetails'} }">
								Detalhes
							</router-link>
						</td>
				</tr>
			</tbody>
		</table>
		<router-link
			tag="button"
			class="btn btn-primary"
			:to="{ name: 'recipes-details' }">
			Nova receita
		</router-link>
	</div>
</template>


<script>
import axios from "axios";

export default {
	data() {
		return {
			recipes: [
				{
					title: '',
					_links: {
						self: {
							href: ''
						}
					}
				}
			],
			item: {},
			index: 0
		}
	},
	async created () {
		this.recipes = (await axios.get(this.$route.params.link,{
			headers: {
				'Content-Type' : 'application/json',
				'charset' : 'UTF-8'
			}
		})).data._embedded.recipes;
	}
}
</script>