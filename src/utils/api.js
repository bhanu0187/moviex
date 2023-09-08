import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMBD_API_TOKEN;

const headers = {
	Authorization: "Bearer " + TMDB_TOKEN,
};

export const fetchData = async (url, params) => {
	try {
		const { data } = await axios.get(BASE_URL + url, {
			headers,
			params,
		});
		// console.log(BASE_URL + url);
		return data;
	} catch (error) {
		console.log(error);
		return error;
	}
};
