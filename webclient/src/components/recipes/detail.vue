<template>
	<form>
		<div class="form-row">
			<div class="form-group">
				<label for="titulo">Título</label>
				<input
					id="titulo"
					v-model="item.titulo"
					type="text"
					class="form-control form-control-plaintext" 
					readonly/>
			</div>
		</div>
	</form>
</template>

<script>
import http from "../../http-common";

export default {
	name: "recipe-detail",
	data() {
		return {
			item: {
				title: ""
			}
		}
	},
	methods: {
		retrive() {
			console.log(this.$route.query.link);
			http.get(this.$route.query.link)
			.then(r => {
				this.item = r.data;
				console.log(this.item);
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

<style scoped>

</style>