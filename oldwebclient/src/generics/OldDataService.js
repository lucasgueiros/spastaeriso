import http from "../http-common";

export default class DataService {

	constructor(theUrl) {
		this.url = "http://localhost:8090/api1" + theUrl; 
	}

	get(theUrl) {
		return http.get(theUrl);
	}

	findAll() {
		return http.get(this.url);
	}

	findById(id) {
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