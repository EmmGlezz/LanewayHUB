import React, {useEffect, useState} from "react";
import { Box, useMediaQuery, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendList";

import './HomePage.css'

const HomePage = () => {
	const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
	const { _id, picturePath } = useSelector((state) => state.user);

	const [isLoading, setIsLoading] = useState(true);

	const handleLoading = () => {
	setIsLoading(false);
	}

	useEffect(()=>{
		if (document.readyState === "complete") {
			handleLoading();
		  } else {
			window.addEventListener('load', handleLoading);
			return () => document.removeEventListener('load', handleLoading);
		  }
	},[])

	return !isLoading ? (
		<Box>
			<Navbar />
			<Box
				width='100%'
				padding='2rem 6%'
				display={isNonMobileScreens ? "flex" : "block"}
				gap='0.5rem'
				justifyContent='space-between'
			>
				<Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
					<UserWidget userId={_id} picturePath={picturePath} />
				</Box>
				<Box
					flexBasis={isNonMobileScreens ? "42%" : undefined}
					mt={isNonMobileScreens ? undefined : "2rem"}
				>
					<MyPostWidget picturePath={picturePath} />
					<PostsWidget userId={_id} />
				</Box>
				{isNonMobileScreens && (
					<Box flexBasis='26%'>
						<AdvertWidget />
						<Box m='2rem 0'>
							<FriendListWidget userId={_id} />
						</Box>
					</Box>
				)}
			</Box>
		</Box>
	) : (
		<div className="loader-container">
			<Typography
					fontWeight='bold'
					fontSize='2rem'
					color='primary'
					className="logo-anim"
				>
					Laneway Hub
				</Typography>
			<div className="spinner"></div>
			<div></div>
      </div>
	);
};

export default HomePage;
