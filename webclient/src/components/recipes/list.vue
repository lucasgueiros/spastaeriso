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
								:to="{ name: 'recipe-details', params: {link: item.self} }">
								Details
							</router-link>
						</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>


<script>
import HalNav from "../../generics/HalNav";

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
		HalNav.retriveArray(this,"recipes",this.$route.params.link);
	}
}
</script>