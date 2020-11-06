import http from "../http-common";

export default class DataService {

	static async retriveArray(item,key,url) {
		try {
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
		} catch(e) {
			console.log(e);
		}
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