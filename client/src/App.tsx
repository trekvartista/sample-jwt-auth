import axios from "axios";
import { createContext, FC, useEffect, useState } from "react";
import { API_URL } from "./api";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import { AuthResponse } from "./models/response/AuthResponse";
import loading from "./assets/loading-buffering.gif";
import RegisterForm from "./components/RegisterForm";
import AppRouter from "./components/AppRouter";
import { LOGIN_ROUTE, REFRESH_ROUTE } from "./routes/consts";
import { useNavigate } from "react-router-dom";

export const Context = createContext({});

const App: FC = () => {
    const [user, setUser] = useState({
        data: {},
        isAuth: false,
    });
    const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate()

    const checkAuth = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get<AuthResponse>(
                API_URL + REFRESH_ROUTE,
                {
                    withCredentials: true,
                }
            );

            localStorage.setItem("token", response.data.accessToken);
            setUser({ data: response.data.user, isAuth: true });
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            checkAuth();
        }
		else {
			navigate(LOGIN_ROUTE)
		}
    }, []);


    if (isLoading) {
        return (
            <div className="w-full h-screen flex flex-col">
                <img className="m-auto w-12" src={loading} alt="loading..." />
            </div>
        );
    }

    return (
        <Context.Provider value={{ user, setUser }}>
            {
                <div className="text-center">
                    <Navbar />
                    <AppRouter />
                </div>
            }
        </Context.Provider>
    );
};

export default App;
