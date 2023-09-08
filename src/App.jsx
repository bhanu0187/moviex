import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Home, Explore, PageNotFound, Details, SearchResult } from "./pages";
import { Header, Footer } from "./components";
import { fetchData } from "./utils/api";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { useEffect } from "react";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		fetchApiConfig();
		genresCall();
	}, []);

	const fetchApiConfig = () => {
		fetchData("/configuration").then((res) => {
			const url = {
				backdrop: res?.images?.secure_base_url + "original",
				poster: res?.images?.secure_base_url + "original",
				profile: res?.images?.secure_base_url + "original",
			};

			dispatch(getApiConfiguration(url));
		});
	};

	const genresCall = async () => {
		let promises = [];
		let endPoints = ["tv", "movie"];
		let allGeneras = {};

		endPoints.forEach((endPoint) => {
			promises.push(fetchData(`/genre/${endPoint}/list`));
		});

		const genreData = await Promise.all(promises);

		genreData.map(({ genres }) => {
			return genres.map((genre) => {
				allGeneras[genre.id] = genre;
			});
		});
		dispatch(getGenres(allGeneras));
	};

	return (
		<BrowserRouter>
			<Header />

			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/:mediaType/:id'
					element={<Details />}
				/>
				<Route
					path='/search/:query'
					element={<SearchResult />}
				/>
				<Route
					path='/explore/:mediaType'
					element={<Explore />}
				/>
				<Route
					path='*'
					element={<PageNotFound />}
				/>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
