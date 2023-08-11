import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import { ContentWrapper, Img } from "../../../components";

const HeroBanner = () => {
	const [background, setBackground] = useState("");
	const [query, setQuery] = useState("");

	const navigate = useNavigate();
	const { url } = useSelector((state) => state.home);

	const { data, loading } = useFetch("/movie/upcoming");

	useEffect(() => {
		const randomNumber = Math.floor(Math.random() * 20);
		const bg = url.backdrop + data?.results[randomNumber]?.backdrop_path;
		setBackground(bg);
	}, [data, url]);

	const searchQueryHandler = (e) => {
		if (e.key === "Enter" && query.length > 0) {
			navigate(`/search/${query}`);
		}
	};
	return (
		<div className='hero-banner'>
			{!loading && (
				<div className='backdrop-img'>
					<Img src={background} />
				</div>
			)}

			<div className='opacity-layer'></div>
			<ContentWrapper>
				<div className='hero-banner-content'>
					<span className='title'>Welcome</span>
					<span className='sub-title'>
						Millions of movies, TV Shows and people to discover. Explore Now
					</span>
					<div className='search-input'>
						<input
							type='text'
							placeholder='Search for a movie or tv show...'
							onChange={(e) => setQuery(e.target.value)}
							onKeyUp={searchQueryHandler}
						/>
						<button>Search</button>
					</div>
				</div>
			</ContentWrapper>
		</div>
	);
};

export default HeroBanner;
