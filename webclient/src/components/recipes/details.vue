<template>
	<form>
		<p>{{ state.editable ? "Criando uma" : "Detalhes da"}} receita</p>
		<h1>{{ item.title }}</h1>
		<div class="form-row">
			<div class="form-group col-md-6">
				<label for="title">Título</label> <input id="title"
					v-model="item.title" type="text"
					v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
					v-bind:readonly="!state.editable" />
			</div>
			<div class="form-group col-md-6">
				<label for="data">Data de criação</label> <input id="data"
					v-model="item.data" type="date"
					v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
					v-bind:readonly="!state.editable" />
			</div>
			<div class="form-group col-md-6">
				<label for="preparationTime">Tempo de preparação</label> <input
					id="preparationTime" v-model="item.preparationTime" type="number"
					v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
					v-bind:readonly="!state.editable" />
			</div>
			<div class="form-group col-md-6">
				<label for="totalTime">Tempo de total</label> <input id="totalTime"
					type="number"
					v-model="item.totalTime"
					v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
					v-bind:readonly="!state.editable" />
			</div>
			<div class="form-group col-md-6">
				<label for="output-quantity">Rendimento</label> <input
					id="output-quantity" type="number" v-model="item.output.quantity"
					v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
					v-bind:readonly="!state.editable" />
			</div>
			<div class="form-group col-md-6">
				<label for="output-input">Resultado</label> <input id="output-input"
					type="text" v-model="item.output.input.name"
					v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
					v-bind:readonly="!state.editable" />
			</div>
			<div class="form-group col-md-6">
				<label for="output-unit">Unidade do rendimento</label> <input
					id="output-unit" type="text" v-model="item.output.unit.name"
					v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
					v-bind:readonly="!state.editable" />
			</div>
			<div class="form-group col-md-6">
				<label for="output-comment">Comentarios</label> <input
					id="output-comment" type="text" v-model="item.output.comment"
					v-bind:class="[state.editable ? 'form-control' : 'form-control-plaintext']"
					v-bind:readonly="!state.editable" />
			</div>
		</div>
		<div class="form-row">
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
					<tr v-for="(ingredient,index) in item.ingredients" :key="index">
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
			<table class="table">
				<thead>
					<tr>
						<th scope="col" style="width: 10%">#</th>
						<th scope="col" v-bind:style="{width: state.editable ? '80%' : '90%'}">Etapas</th>
						<th scope="col" style="width: 10%" v-if="state.editable">Ações</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(instruction,index) in item.instructions" :key="index">
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
		<div class="form-row" v-if="state.editable">
			<button type="button" class="btn btn-block btn-primary"
				v-on:click="save">Salvar</button>
		</div>
	</form>
</template>

<script>
import DataService from "../../generics/DataService";

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
			return this.item.instructions.slice().sort(compare);
		}
	},
	methods: {
		reset() {
			Object.assign(this.$data, initialState());
		},
		addIngredient() {
			var theIndex = this.item.ingredients.length + 1;
			this.item.ingredients.push({
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
			var theIndex = this.item.instructions.length + 1;
			this.item.instructions.push({
				index: theIndex,
				text: '',
				self: ''
			});
		},
		rmInstruction (index) {
			this.item.instructions.splice(index,1);
			if(this.item.instructions.length > 0) {
				for(var i = 0; i < this.item.instructions.length; i++) {
					this.item.instructions[i].index = i + 1;
				}
			}
		},
		rmIngredient(index) {
			this.item.ingredients.splice(index,1);
			if(this.item.ingredients.length > 0) {
				for(var i = 0; i < this.item.ingredients.length; i++) {
					this.item.ingredients[i].index = i + 1;
				}
			}
		},
		save() {
			DataService.post("http://localhost:8090/api1/recipes",this.item);
		}
	},
	created () {
		if(this.$route.params.link) {
			this.state.editable = false;
			DataService.retriveObject(this.item, this.$route.params.link);
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
		item: {
			title: '',
			data: new Date().toISOString().slice(0, 10),
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
</script>

<style scoped>
label {
	font-style: italic
}
</style>