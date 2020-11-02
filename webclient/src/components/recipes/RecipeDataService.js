 import DataService from "../../generics/DataService"

class RecipeDataService extends DataService {
	constructor() {
		super("/recipes");
	}
}

export default new RecipeDataService();