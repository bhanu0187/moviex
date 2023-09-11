import React, { useState } from "react";
import { Carousel, ContentWrapper, Switchtabs } from "../../../components";
import useFetch from "../../../hooks/useFetch";

const Popular = () => {
	const [endPoint, setEndPoint] = useState("movie");

	const { data, loading } = useFetch(`/${endPoint}/popular
`);

	const onTabChange = (tab) => {
		setEndPoint(tab === "Movies" ? "movie" : "tv");
	};
	return (
		<div className='carousel-section'>
			<ContentWrapper>
				<span className='carousel-title'>Popular Movies and TV Shows</span>
				<Switchtabs
					data={["Movies", "TV Shows"]}
					onTabChange={onTabChange}
				/>
			</ContentWrapper>
			<Carousel
				data={data?.results}
				loading={loading}
			/>
		</div>
	);
};

export default Popular;
