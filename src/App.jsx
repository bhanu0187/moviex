import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Home, Explore, PageNotFound, Details, SearchResult } from "./pages";
import { Header, Footer } from "./components";
import { fetchData } from "./utils/api";
import { getApiConfiguration } from "./store/homeSlice";
import { useEffect } from "react";

function App() {
	const dispatch = useDispatch();
	const { url } = useSelector((state) => state.home);

	useEffect(() => {
		fetchApiConfig();
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
	return (
		<BrowserRouter>
			{/* <Header /> */}
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
			{/* <Footer /> */}
		</BrowserRouter>
	);
}

export default App;
