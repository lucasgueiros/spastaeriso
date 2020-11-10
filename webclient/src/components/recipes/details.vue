<template>
	<form>
		<p>{{ state.editable ? "Criando uma" : "Detalhes da"}} receita</p>
		<h1>{{ recipe.title }}</h1>
		<div class="form-row">
			<div class="form-group col-md-6">
				<label for="title">Título</label> <input id="title"
					v-model="recipe.title" type="text"
					v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
					v-bind:readonly="!state.editable" />
			</div>
			<div class="form-group col-md-6">
				<label for="data">Data de criação</label> <input id="data"
					v-model="recipe.data" type="date"
					v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
					v-bind:readonly="!state.editable" />
			</div>
			<div class="form-group col-md-6">
				<label for="preparationTime">Tempo de preparação</label> <input
					id="preparationTime" v-model="recipe.preparationTime" type="number"
					v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
					v-bind:readonly="!state.editable" />
			</div>
			<div class="form-group col-md-6">
				<label for="totalTime">Tempo de total</label> <input id="totalTime"
					type="number"
					v-model="recipe.totalTime"
					v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
					v-bind:readonly="!state.editable" />
			</div>
		</div>
		<div class="form-row" v-if="recipe._embedded.output">
			<div class="form-group col-md-6">
				<label for="output-quantity">Rendimento</label> <input
					id="output-quantity" type="number" v-model="recipe._embedded.output.quantity"
					v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
					v-bind:readonly="!state.editable" />
			</div>
			<div class="form-group col-md-6">
				<label for="output-unit">Unidade do rendimento</label> <input
					id="output-unit" type="text" v-model="recipe._embedded.output.unit.name"
					v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
					v-bind:readonly="!state.editable" />
			</div>
			<div class="form-group col-md-6">
				<label for="output-input">Resultado</label> <input id="output-input"
					type="text" v-model="recipe._embedded.output.input.name"
					v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
					v-bind:readonly="!state.editable" />
			</div>
			<div class="form-group col-md-6">
				<label for="output-comment">Comentarios</label> <input
					id="output-comment" type="text" v-model="recipe._embedded.output.comment"
					v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
					v-bind:readonly="!state.editable" />
			</div>
		</div>
		<div class="form-row" v-else>
				Essa receita não tem um resultado definido.
		</div>
		<div class="form-row">
			<div v-if="!recipe._embedded.ingredients">
				Não há nenhuma instrução nessa receita.
			</div>
			<div v-else>
				<table class="table">
					<thead>
						<tr>
							<th scope="col" style="width: 10%">#</th>
							<th scope="col" v-bind:style="{width: state.editable ? '50%' : '60%'}">Ingredientes</th>
							<th scope="col" style="width: 15%">Qtd</th>
							<th scope="col" style="width: 15%">Uni.</th>
							<th scope="col" style="width: 10%" v-if="state.editable">Ações</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(ingredient,index) in recipe._embedded.ingredients" :key="index">
							<td>
								<div class="form-group">
									<input id="ingredient-index" v-model="ingredient.index"
										type="number"
										v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
										v-bind:readonly="!state.editable" />
								</div>
							</td>
							<td>
								<div class="form-group">
									<input id="ingredient-input" v-model="ingredient.input.name"
										type="text"
										v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
										v-bind:readonly="!state.editable" />
								</div>
							</td>
							<td>
								<div class="form-group">
									<input id="ingredient-quantity" v-model="ingredient.quantity"
										type="number"
										v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
										v-bind:readonly="!state.editable" />
								</div>
							</td>
							<td>
								<div class="form-group">
									<input id="ingredient-unit" v-model="ingredient.unit.name"
										type="text"
										v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
										v-bind:readonly="!state.editable" />
								</div>
							</td>
							<td v-if="state.editable">
								<button type="button" class="btn btn-block btn-light"
									v-on:click="rmIngredient(index)">
									-
								</button>
							</td>
						</tr>
						<tr v-if="state.editable">
							<td colspan="5">
								<button type="button" class="btn btn-block btn-light"
									v-on:click="addIngredient">+</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="form-row">
			<div v-if="!recipe._embedded.instructions">
				Não há nenhuma instrução nessa receita.
			</div>
			<div class="w-100" v-else>
				<table class="table">
					<thead>
						<tr>
							<th scope="col" style="width: 10%">#</th>
							<th scope="col" v-bind:style="{width: state.editable ? '80%' : '90%'}">Etapas</th>
							<th scope="col" style="width: 10%" v-if="state.editable">Ações</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(instruction,index) in recipe._embedded.instructions" :key="index">
							<td>
								<div class="form-group">
									<input id="instructions-index" v-model="instruction.index"
										type="number"
										v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
										v-bind:readonly="!state.editable" />
								</div>
							</td>
							<td>
								<div class="form-group">
									<input id="instructions-text" v-model="instruction.text"
										type="text"
										v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
										v-bind:readonly="!state.editable" />
								</div>
							</td>
							<td v-if="state.editable">
								<button type="button" class="btn btn-block btn-light"
									v-on:click="rmInstruction(index)">
									-
								</button>
							</td>
						</tr>
						<tr v-if="state.editable">
							<td colspan="3">
								<button type="button" class="btn btn-block btn-light"
									v-on:click="addInstruction">+</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		
		<div class="form-row">
			<div v-if="!recipe._embedded.otherItems" class="w-100">
				<p>Não há outros itens nessa receita.</p>
			</div>
		</div>
		<div class="form-row" v-if="state.editable">
			<button type="button" class="btn btn-block btn-primary"
				v-on:click="save">Salvar</button>
		</div>
		<div v-else>
			<router-link tag="button" type="button" class="btn btn-block btn-primary"
					:to="{ name: 'recipes-list', params: { link: 'http://localhost:8090/api1/recipes' } }">
					Editar receita
				</router-link>
				<router-link tag="button" type="button" class="btn btn-block btn-primary"
					:to="{ name: 'recipes-list', params: { link: 'http://localhost:8090/api1/recipes' } }">
					Voltar à lista de receitas
				</router-link>
		</div>
	</form>
</template>

<script>
import axios from "axios";

export default {
	name: "recipe-details",
	data() {
		return initialState();
	},
	computed: {
		orderedIntructions: function () {
			function compare(a,b) {
				if (a.index < b.index)
					return -1;
				if (a.index > b.index)
					return 1;
				return 0;
			}
			return this.recipe._embedded.instructions.slice().sort(compare);
		}
	},
	methods: {
		reset() {
			Object.assign(this.$data, initialState());
		},
		addIngredient() {
			var theIndex = this.recipe._embedded.ingredients.length + 1;
			this.recipe._embedded.ingredients.push({
				index: theIndex,
				quantity: 0,
				coment: '',
				unit: {
					name: ''
				},
				input: {
					name: ''
				} });
		},
		addInstruction() {
			var theIndex = this.recipe._embedded.instructions.length + 1;
			this.recipe._embedded.instructions.push({
				index: theIndex,
				text: '',
				self: ''
			});
		},
		rmInstruction (index) {
			this.recipe._embedded.instructions.splice(index,1);
			if(this.recipe._embedded.instructions.length > 0) {
				for(var i = 0; i < this.recipe._embedded.instructions.length; i++) {
					this.recipe._embedded.instructions[i].index = i + 1;
				}
			}
		},
		rmIngredient(index) {
			this.recipe._embedded.ingredients.splice(index,1);
			if(this.recipe._embedded.ingredients.length > 0) {
				for(var i = 0; i < this.recipe._embedded.ingredients.length; i++) {
					this.recipe._embedded.ingredients[i].index = i + 1;
				}
			}
		},
		async save() {
			//DataService.post("http://localhost:8090/api1/recipes",this.recipe);
			if(this.state.editable) {
				var recipe = {
						title: this.recipe.title,
						data: this.recipe.date,
						preparationTime: this.recipe.preparationTime,
						totalTime: this.recipe.totalTime,
						output: {
							input: '',
							unit: '',
							quantity: this.recipe._embedded.output.quantity,
							comment: this.recipe._embedded.output.comment
						},
						ingredients: [],
						instructions: []
				};
				
				// SALVANDO O OUTPUT
				
				// recuperando o INPUT
				recipe.output.input = (
					await axios.get(
						"http://localhost:8090/api1/inputs/search/findByName?name=" + this.recipe._embedded.output.input.name,
						{
							headers: {
								'Content-Type' : 'application/json',
								'charset' : 'UTF-8'
							}
						}
					)
				).data._links.self.href;
				
				// recuperando a UNIT
				recipe.output.unit = (
					await axios.get(
						"http://localhost:8090/api1/units/search/findByName?name=" + this.recipe._embedded.output.unit.name,
						{
							headers: {
								'Content-Type' : 'application/json',
								'charset' : 'UTF-8'
							}
						}
					)
				).data._links.self.href;
				
				// agora salve o output
				recipe.output = (await axios.post("http://localhost:8090/api1/items",recipe.output,{
					headers: {
						'Content-Type' : 'application/json',
						'charset' : 'UTF-8'
					}
				})).data._links.self.href;
				
				// salvando as instrucoes
				for(var i in this.recipe._embedded.instructions) {
					recipe.instructions[i] = {
						index: 	this.recipe._embedded.instructions[i].index,
						text: 	this.recipe._embedded.instructions[i].text
					},
					
					recipe.instructions[i] = (await axios.post("http://localhost:8090/api1/instructions",recipe.instructions[i],{
						headers: {
							'Content-Type' : 'application/json',
							'charset' : 'UTF-8'
						}
					})).data._links.self.href;
					
				}
				
				// salvando os ingredientes
				for(var j in this.recipe._embedded.ingredients) {
					recipe.ingredients[j] = {
						input: '',
						unit: '',
						index: this.recipe._embedded.ingredients[j].index,
						quantity: this.recipe._embedded.ingredients[j].quantity
					};
					// recuperando o INPUT
					recipe.ingredients[j].input = (
						await axios.get(
							"http://localhost:8090/api1/inputs/search/findByName?name=" + this.recipe._embedded.ingredients[j].input.name,
							{
								headers: {
									'Content-Type' : 'application/json',
									'charset' : 'UTF-8'
								}
							}
						)
					).data._links.self.href;
					
					// recuperando a UNIT
					recipe.ingredients[j].unit = (
						await axios.get(
							"http://localhost:8090/api1/units/search/findByName?name=" + this.recipe._embedded.ingredients[j].unit.name,
							{
								headers: {
									'Content-Type' : 'application/json',
									'charset' : 'UTF-8'
								}
							}
						)
					).data._links.self.href;
					
					recipe.ingredients[j] = (await axios.post("http://localhost:8090/api1/ingredients",recipe.ingredients[j],{
						headers: {
							'Content-Type' : 'application/json',
							'charset' : 'UTF-8'
						}
					})).data._links.self.href;
					
				}
				
				// agora salve a receita
				recipe = (await axios.post("http://localhost:8090/api1/recipes",recipe,{
					headers: {
						'Content-Type' : 'application/json',
						'charset' : 'UTF-8'
					}
				}));
				console.log(recipe);
			}
		}
	},
	async created () {
		if(this.$route.params.link) {
			this.state.editable = false;
			//DataService.retriveObject(this.recipe, this.$route.params.link);
			this.recipe = (await axios.get(this.$route.params.link,{
				headers: {
					'Content-Type' : 'application/json',
					'charset' : 'UTF-8'
				}
			})).data;
		} else {
			this.state.editable = true;
		}
	}
}

function initialState () {
	return {
		state: {
			editable : false,
		},
		recipe: {
			title: '',
			data: new Date().toISOString().slice(0, 10),
			preparationTime: 0,
			totalTime: 0,
			self: '',
			_embedded: {
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
						index: 1,
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
				instructions: [
					{
						index: 1,
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
	}
}
</script>

<style scoped>
label {
	font-style: italic
}
</style>