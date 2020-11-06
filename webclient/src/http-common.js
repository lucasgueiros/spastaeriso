import axios from "axios";

export default axios.create ({
	headers: {
		post: {
			"Content-type" : "application/json"
		},
		put: {
			"Content-type" : "application/json"
		}
	}
});