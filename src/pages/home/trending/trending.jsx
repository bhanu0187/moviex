import React, { useState } from "react";
import { Carousel, ContentWrapper, Switchtabs } from "../../../components";
import useFetch from "../../../hooks/useFetch";

const Trending = () => {
	const [endPoint, setEndPoint] = useState("day");

	const { data, loading } = useFetch(`/trending/all/${endPoint}`);

	console.log(data);

	const onTabChange = (tab) => {
		setEndPoint(tab === "day" ? "day" : "week");
	};
	return (
		<div className='carousel-section'>
			<ContentWrapper>
				<span className='carousel-title'>Trending</span>
				<Switchtabs
					data={["Day", "Week"]}
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

export default Trending;
