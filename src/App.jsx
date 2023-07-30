import { useEffect } from "react";

import { fetchData } from "./utils/api";

function App() {
	useEffect(() => {
		apiTesting();
	}, []);

	const apiTesting = () => {
		fetchData("/movie/popular").then((data) => {
			console.log(data);
		});
	};

	return <div className='app'>App</div>;
}

export default App;
