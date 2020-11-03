import DataService from "../../generics/DataService"

class ItemDataService extends DataService {
	constructor() {
		super("/recipes");
	}
}

export default new ItemDataService();