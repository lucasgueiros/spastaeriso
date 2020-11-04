<template>
	<form>
		<p>Detalhes da Receita</p>
		<h1> {{ item.title }}</h1>
		<div class="form-row">
			<div class="form-group col-md-6">
				<label for="title">Título</label>
				<input
					id="title"
					v-model="item.title"
					type="text"
					class="form-control-plaintext" 
					readonly/>
			</div>
			<div class="form-group col-md-6">
				<label for="data">Data de criação</label>
				<input
					id="data"
					v-model="item.data"
					type="date"
					class="form-control-plaintext" 
					readonly/>
			</div>
			<div class="form-group col-md-6">
				<label for="preparationTime">Tempo de preparação</label>
				<input
					id="preparationTime"
					v-model="item.preparationTime"
					type="number"
					class="form-control-plaintext" 
					readonly/>
			</div>
			<div class="form-group col-md-6">
				<label for="totalTime">Tempo de total</label>
				<input
					id="totalTime"
					type="number"
					class="form-control-plaintext" 
					readonly/>
					<!-- v-model="item.totalTime" -->
			</div>
			<div class="form-group col-md-6">
				<label for="output-quantity">Rendimento</label>
				<input
					id="output-quantity"
					type="number"
					v-model="item.output.quantity"
					class="form-control-plaintext" 
					readonly/>
			</div>
			<div class="form-group col-md-6">
				<label for="output-input">Resultado</label>
				<input
					id="output-input"
					type="text"
					v-model="item.output.input.name"
					class="form-control-plaintext" 
					readonly/>
			</div>
			<div class="form-group col-md-6">
				<label for="output-unit">Unidade do rendimento</label>
				<input
					id="output-unit"
					type="text"
					v-model="item.output.unit.name"
					class="form-control-plaintext" 
					readonly/>
			</div>
			<div class="form-group col-md-6">
				<label for="output-comment">Comentarios</label>
				<input
					id="output-comment"
					type="text"
					v-model="item.output.comment"
					class="form-control-plaintext" 
					readonly/>
			</div>
		</div>
		<div class="form-row">
			<table class="table">
				<thead>
					<tr>
						<th scope="col" style="width: 70%">Ingredientes</th>
						<th scope="col" style="width: 20%">Qtd</th>
						<th scope="col" style="width: 10%">Unit</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(ingredient,index) in item.ingredients"
						:key="index">
						<td>
							<div class="form-group">
								<input
									id="ingredient-input"
									v-model="ingredient.input.name"
									type="text"
									class="form-control-plaintext" 
									readonly/>
							</div>
						</td>
						<td>
							<div class="form-group">
								<input
									id="ingredient-quantity"
									v-model="ingredient.quantity"
									type="number"
									class="form-control-plaintext" 
									readonly/>
							</div>
						</td>
						<td>
							<div class="form-group">
								<input
									id="ingredient-unit"
									v-model="ingredient.unit.name"
									type="text"
									class="form-control-plaintext" 
									readonly/>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
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
				self: '',
				output: {
					quantity: 0,
					comment: '',
					input: {
						name: ''
					},
					unit: {
						name: ''
					}
				},
				ingredients: [
					{
						index: 0,
						quantity: 0,
						coment: '',
						unit: {
							name: ''
						},
						input: {
							name: ''
						},
						self: ''
					}
				],
				intructions: [
					{
						index: 0,
						text: '',
						self: ''
					}
				],
				otherItems: [
					{
						quantity: 0,
						input: {
							name: ''
						},
						unit: {
							name: ''
						},
						comment: '',
						self: ''
					}
				]
			}
		}
	},
	methods: {
		
	},
	created () {
		HalNav.retriveObject(this.item, this.$route.params.link);
		console.log(this.item);
	}
}
</script>

<style scoped>
label {
	font-style: italic
}
</style>