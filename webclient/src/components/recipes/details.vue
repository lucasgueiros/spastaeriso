<template>
	<form>
		<h1>Details of Recipe</h1>
		<div class="form-row">
			<div class="form-group">
				<label for="title">Título</label>
				<input
					id="title"
					v-model="item.title"
					type="text"
					class="form-control form-control-plaintext" 
					readonly/>
			</div>
			<div class="form-group">
				<label for="data">Data de criação</label>
				<input
					id="data"
					v-model="item.data"
					type="date"
					class="form-control form-control-plaintext" 
					readonly/>
			</div>
			<div class="form-group">
				<label for="preparationTime">Tempo de preparação</label>
				<input
					id="preparationTime"
					v-model="item.preparationTime"
					type="number"
					class="form-control form-control-plaintext" 
					readonly/>
			</div>
			<div class="form-group">
				<label for="totalTime">Tempo de total</label>
				<input
					id="totalTime"
					type="number"
					class="form-control form-control-plaintext" 
					readonly/>
					<!-- v-model="item.totalTime" -->
			</div>
			<div class="form-group">
				<label for="output-quantity">Rendimento</label>
				<input
					id="output-quantity"
					type="number"
					v-model="item.output.quantity"
					class="form-control form-control-plaintext" 
					readonly/>
			</div>
			<div class="form-group">
				<label for="output-input">Resultado</label>
				<input
					id="output-input"
					type="text"
					v-model="item.output.input.name"
					class="form-control form-control-plaintext" 
					readonly/>
			</div>
		</div>
	</form>
</template>

<script>
import HalNav from "../../generics/HalNav";

export default {
	name: "recipe-details",
	data() {
		return {
			item: {
				title: '',
				data: '',
				preparationTime: 0,
				totalTime: 0,
				output: {
					quantity: 0,
					comment: '',
					input: {
						name: ''
					}
				},
				ingredients: [
					{
						quantity: 0,
						coment: '',
						unit: {
							name: ''
						},
						input: {
							name: ''
						}
					}
				]
			}
		}
	},
	created () {
		HalNav.retriveObject(this.item, this.$route.params.link);
		console.log(this.item);
	}
}
</script>

<style scoped>

</style>