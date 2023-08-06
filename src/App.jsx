/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Explore, PageNotFound, Details, SearchResult } from "./pages";
import { Header, Footer } from "./components";

function App() {
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
