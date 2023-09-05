import React, { useState } from "react";
import "./style.scss";

const Switchtabs = ({ data, onTabChange }) => {
	const [selectedTab, setSelectedTab] = useState(0);
	const [left, setLeft] = useState(0);
	const activeTab = (tab, index) => {
		setLeft(index * 100);
		setTimeout(() => {
			setSelectedTab(index);
		}, 300);
		onTabChange(tab, index);
	};
	return (
		<div className='tab-switchings'>
			<div className='tab-items'>
				{data.map((tab, index) => (
					<span
						key={index}
						className={`tab-item ${selectedTab === index ? "active" : ""}`}
						onClick={() => activeTab(tab, index)}
					>
						{tab}
					</span>
				))}
				<span
					className='active-bg'
					style={{ left: left }}
				/>
			</div>
		</div>
	);
};

export default Switchtabs;
