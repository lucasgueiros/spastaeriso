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
			path: "/recipes/list/:link",
			alias: "/recipes",
			name: "recipes-list",
			component: () => import ("./components/recipes/list")
		},
		{
			path: "/recipes/details/:link",
			name: "recipe-details",
			component: () => import ("./components/recipes/details")
		}
	]
});