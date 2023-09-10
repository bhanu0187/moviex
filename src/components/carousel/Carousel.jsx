import React, { useRef } from "react";

import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyloading/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import { Rating, Genres } from "../index";

const Carousel = ({ data, loading }) => {
	const carouselContainerRef = useRef();
	const { url } = useSelector((state) => state.home);
	const navigate = useNavigate();

	const navigation = (navDirection) => {
		const container = carouselContainerRef.current;

		const scrollAmount =
			navDirection === "left"
				? container.scrollLeft - (container.offsetWidth + 20)
				: container.scrollLeft + (container.offsetWidth + 20);

		container.scrollTo({
			left: scrollAmount,
			behavior: "smooth",
		});
	};

	const skItem = () => {
		return (
			<div className='skeleton-item'>
				<div className='poster-block skeleton'></div>
				<div className='text-block'>
					<div className='title skeleton'></div>
					<div className='date skeleton'></div>
				</div>
			</div>
		);
	};

	return (
		<div className='carousel'>
			<ContentWrapper className='content-wrapper'>
				<BsFillArrowLeftCircleFill
					className='carousel-left-nav arrow'
					onClick={() => navigation("left")}
				/>
				<BsFillArrowRightCircleFill
					className='carousel-right-nav arrow'
					onClick={() => navigation("right")}
				/>
				{!loading ? (
					<div
						className='carousel-items'
						ref={carouselContainerRef}
					>
						{data?.map((item) => {
							const posterUrl = item?.poster_path
								? url.poster + item.poster_path
								: PosterFallback;
							return (
								<div
									className='carousel-item'
									key={item.id}
									onClick={() => navigate(`/${item.media_type}/${item.id}`)}
								>
									<div className='poster-block'>
										<Img src={posterUrl} />
										<Rating rating={item.vote_average.toFixed(1)} />
										<Genres data={item.genre_ids.slice(0, 2)} />
									</div>
									<div className='text-block'>
										<span className='title'>{item.title || item.name}</span>
										<span className='date'>
											{dayjs(item.release_date).format("MM, D, YYYY")}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div className='loading-skeleton'>
						{skItem()}
						{skItem()}
						{skItem()}
						{skItem()}
						{skItem()}
					</div>
				)}
			</ContentWrapper>
		</div>
	);
};

export default Carousel;
