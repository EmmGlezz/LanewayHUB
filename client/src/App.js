import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/HomePage/HomePage";
import LoginPage from "./scenes/LoginPage/LoginPage";
import ProfilePage from "./scenes/ProfilePage/ProfilePage";

const App = () => {
	return (
		<div className='app'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LoginPage />} />
					<Route path='/home' element={<HomePage />} />
					<Route path='/profile/:userId' element={<ProfilePage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
