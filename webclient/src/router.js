import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router ({
	mode: "history",
	routes: [
		{
			path: "/home",
			alias: "/",
			component: () => import ("./components/Home")
		},
		{
			path: "/recipes/create",
			alias: "/recipes",
			name: "recipes-create",
			component: () => import ("./components/recipes/Create")
		}
	]
});