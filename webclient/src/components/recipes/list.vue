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
					v-for="(item,index) in recipes"
					:key="index">
						<td> {{ item.title }} </td>
						<td>
							
							<router-link
								tag="button"
								class="btn btn-primary" 
								:to="{ name: 'recipes-details', params: {link: item.self} }">
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
import DataService from "../../generics/DataService";

export default {
	data() {
		return {
			recipes: [
				{
					title: '',
					self: ''
				}
			],
			item: {},
			index: 0
		}
	},
	created () {
		DataService.retriveArray(this,"recipes",this.$route.params.link);
	}
}
</script>