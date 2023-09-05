import React from "react";
import { ContentWrapper, Switchtabs } from "../../../components";

const Trending = () => {
	const onTabChange = (tab) => {};
	return (
		<div className='carousel-section'>
			<ContentWrapper>
				<span className='carousel-title'>Trending</span>
				<Switchtabs
					data={["Day", "Week"]}
					onTabChange={onTabChange}
				/>
			</ContentWrapper>
		</div>
	);
};

export default Trending;
