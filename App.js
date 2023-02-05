import { useState, useContext, useEffect } from "react";
import MainDrawer from "./MainDrawer";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
// import { Button } from "@mui/material";

import { Routes, Route } from "react-router-dom";

import { AuthContext } from "./AuthProvider";

// const Home = <div>Home</div>;
import {verify} from './apiCalls';

function Home() {
	const { auth } = useContext(AuthContext);

	return (
		<div>
			{ auth ? "Login User" : "Guest User"}
		</div>
	)
}

export default function App() {
	const [drawerState, setDrawerState] = useState(false);

	const { setAuth, setAuthUser } = useContext(AuthContext);

	useEffect(()=> {
		(async () => {
			const user = await verify();
			if(user) {
				setAuth(true);
				setAuthUser(user);
			}
		})();
	});

	const toggleDrawer = open => event => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setDrawerState(open);
	};

	return (
		<div>
			<Header toggleDrawer={toggleDrawer} />
			<MainDrawer drawerState={drawerState} toggleDrawer={toggleDrawer} />
			{/* <Button type="submit" variant="contained">brands_edit</Button> */}
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				
			</Routes>
		</div>
	);
}