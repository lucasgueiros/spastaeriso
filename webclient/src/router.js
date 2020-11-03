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
			name: "recipes-create",
			component: () => import ("./components/recipes/Create")
		},
		{
			path: "/recipes/findAll",
			alias: "/recipes",
			name: "recipes-findAll",
			component: () => import ("./components/recipes/findAll")
		},
		{
			path: "/recipes/detail",
			name: "recipe-detail",
			component: () => import ("./components/recipes/detail")
		}
	]
});