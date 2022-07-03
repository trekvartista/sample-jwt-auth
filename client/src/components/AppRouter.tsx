import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Context } from "../App";
import { privateRoutes, publicRoutes } from "../routes";

const AppRouter = () => {

	const {user} = useContext(Context as any);
    return (
        <Routes>
			{
				user?.isAuth && privateRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))
			}
            { 
				publicRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))
			}
        </Routes>
    );
};

export default AppRouter;
