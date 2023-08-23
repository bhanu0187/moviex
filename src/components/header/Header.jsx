import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";
import { ContentWrapper } from "../index";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
	const [show, setShow] = useState("top");
	const [lastScrollY, setLastScrollY] = useState(0);
	const [mobileMenu, setMobileMenu] = useState(false);
	const [query, setQuery] = useState("");
	const [showSearch, setShowSearch] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	const controlNavbarScroll = () => {
		if (window.scrollY > 200) {
			setShow("hide");
			if (window.scrollY < lastScrollY && !mobileMenu) {
				setShow("show");
			} else {
				setShow("hide");
			}
		} else {
			setShow("top");
		}
		setLastScrollY(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", controlNavbarScroll);

		return () => {
			window.removeEventListener("scroll", controlNavbarScroll);
		};
	}, [lastScrollY]);

	const openSearch = () => {
		setMobileMenu(false);
		setShowSearch(true);
	};

	const openMobileMenu = () => {
		setMobileMenu(true);
		setShowSearch(false);
	};

	const searchQueryHandler = (e) => {
		if (e.key === "Enter" && query.length > 0) {
			navigate(`/search/${query}`);
			setTimeout(() => {
				setShowSearch(false);
			}, 1000);
		}
	};

	const navigationHandler = (type) => {
		if (type === "movies") {
			navigate("/explore/movie");
		} else {
			navigate("/explore/tv");
		}

		setMobileMenu(false);
	};

	return (
		<header className={`header ${mobileMenu ? "mobile-view" : ""} ${show}`}>
			<ContentWrapper className='content-wrapper'>
				<div className='logo'>
					<img
						src={logo}
						alt=''
						onClick={() => navigate("/")}
					/>
				</div>
				<ul className='menu-items'>
					<li
						className='menu-item'
						onClick={() => navigationHandler("movies")}
					>
						Movies
					</li>
					<li
						className='menu-item'
						onClick={navigationHandler}
					>
						TV Shows
					</li>
					<li className='menu-item'>
						<HiOutlineSearch onClick={() => setShowSearch(true)} />
					</li>
				</ul>
				<div className='mobile-menu-items'>
					<HiOutlineSearch
						className='menu-item'
						onClick={openSearch}
					/>
					{mobileMenu ? (
						<VscChromeClose
							className='menu-item'
							onClick={() => setMobileMenu(false)}
						/>
					) : (
						<SlMenu
							className='menu-item'
							onClick={openMobileMenu}
						/>
					)}
				</div>
			</ContentWrapper>
			{showSearch && (
				<div className='search-bar'>
					<ContentWrapper>
						<div className='search-input'>
							<input
								type='text'
								placeholder='Search for a movie or tv show...'
								onChange={(e) => setQuery(e.target.value)}
								onKeyUp={searchQueryHandler}
							/>
							<VscChromeClose onClick={() => setShowSearch(false)} />
						</div>
					</ContentWrapper>
				</div>
			)}
		</header>
	);
};

export default Header;
