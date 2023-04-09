import { HashRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/HomePage/HomePage";
import LoginPage from "./scenes/LoginPage/LoginPage";
import ProfilePage from "./scenes/ProfilePage/ProfilePage";
import DemoPage from "./scenes/DemoPage/DemoPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

const App = () => {
	const mode = useSelector((state) => state.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	const isAuth = Boolean(useSelector((state) => state.token));

	
	return (
		<div className='app'>
			<HashRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route path='/' element={<LoginPage />} />
						<Route
							path='/home'
							element={isAuth ? <HomePage /> : <Navigate to='/' />}
						/>
						<Route
							path='/profile/:userId'
							element={isAuth ? <ProfilePage /> : <Navigate to='/' />}
						/>
						{/* DEMO SITE */}
						<Route path='/demo' element={<DemoPage />} />
					</Routes>
				</ThemeProvider>
			</HashRouter>
		</div>
	);
};

export default App;
