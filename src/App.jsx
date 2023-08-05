/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchData } from "./utils/api";
import { getApiConfiguration } from "./store/homeSlice";

function App() {
	const dispatch = useDispatch();
	const url = useSelector((state) => state.home.url);
	console.log(url);
	useEffect(() => {
		apiTesting();
	}, []);

	const apiTesting = () => {
		fetchData("/movie/popular").then((data) => {
			dispatch(getApiConfiguration(data));
		});
	};

	return <div className='app'>App</div>;
}

export default App;
