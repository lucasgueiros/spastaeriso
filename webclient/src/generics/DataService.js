import http from "../http-common";

export default class DataService {

	constructor(theUrl) {
		this.url = theUrl; 
	}

	getAll() {
		return http.get(this.url);
	}

	get(id) {
		return http.get(`${this.url}/${id}`);
	}

	create(data) {
		return http.post(this.url, data);
	}

	update(id, data) {
		return http.put(`${this.url}/${id}`, data);
	}

	delete(id) {
		return http.delete(`${this.url}/${id}`);
	}
	deleteAll() {
		return http.delete(`${this.url}`);
	}
}