import http from "../http-common";
import axios from "axios";

export default class DataService {
	
	static urls = {
		output : 'http://localhost:8090/api1/items',
		items: 'http://localhost:8090/api1/items'
	};
	
	static getUrlFor(something) {
		return DataService.urls[something];
	}

	static async post(url, object) {
		try {
		
			var keys = Object.keys(object);
			for(var i in keys) {
				var key = keys[i];
				if(key == 'self') {
					continue;
				} else if(Array.isArray(object[key])) {
					for(var j in object[key]) {
						var response1 = DataService.post(DataService.urls[key],object[key][j]);
						object[key][j] = response1.data._links.self;
					}
				} else if (object[key] instanceof Object) {
					var response2 = DataService.post(DataService.urls[key],object[key]);
					object[key] = response2.data._links.self;
				} else {
					continue;
				}
			}
			
			var result = await axios.post(url,object,{
				headers: {
					'Content-Type' : 'application/json',
					'charset' : 'UTF-8'
				}
			});
			return result;
		} catch (e) {
			console.log(e);
		}
	}

	static async retriveArray(item,key,url) {
		//try {
			var result = (await http.get(url)).data;
			result = result._embedded[key];
			console.log(result);
			if(result.length == 0) {
				item[key] = [];
			} else {
				var i;
				for(i in result) {
					var keys = Object.keys(item[key][0]);
					item[key][i].self = result[i]._links.self.href;
					console.log(item[key][i].self);
					var j;
					for(j in keys) {
						var skey = keys[j];
						if(skey == 'self') {
							continue;
						} else if(Array.isArray(item[key][i][skey])) {
							await DataService.retriveArray(item[key][i],skey,result[i]._links[skey].href);
						} else if (item[key][i][skey] instanceof Object) {
							await DataService.retriveObject(item[key][i][skey],result[i]._links[skey].href);
						} else {
							item[key][i][skey] = result[i][skey];
						}
					}
				}
			}
		/*} catch(e) {
			console.log(e);
		}*/
	}
	
	static async retriveObject (item, url) {
		//try {
			var result = (await http.get(url)).data;
			var itemKeys = Object.keys(item);
			var i;
			item.self = result._links.self.href;
			for(i in itemKeys) {
				var key = itemKeys[i];
				if(key == 'self') {
					continue;
				} else if(Array.isArray(item[key])) {
					await DataService.retriveArray(item,key,result._links[key].href);
				} else if (item[key] instanceof Object) {
					await DataService.retriveObject(item[key],result._links[key].href);
				} else {
					item[key] = result[key];
				}
			}
		//} catch(e) {
		//	console.log(e);
		//}
	}

}