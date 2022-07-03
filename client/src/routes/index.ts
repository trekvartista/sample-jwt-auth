import HomePage from "../components/HomePage";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "./consts";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: LoginForm,
    },
	{
		path: REGISTER_ROUTE,
		Component: RegisterForm
	}
];

export const privateRoutes = [
	{
		path: HOME_ROUTE,
		Component: HomePage
	}
];
