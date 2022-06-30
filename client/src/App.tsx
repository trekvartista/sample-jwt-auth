import axios from "axios";
import { createContext, FC, useEffect, useState } from "react";
import { API_URL } from "./api";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import { AuthResponse } from "./models/response/AuthResponse";

export const Context = createContext({});

const App: FC = () => {
    const [user, setUser] = useState({
        data: {},
        isAuth: true,
    });

    const checkAuth = async () => {
        try {
            const response = await axios.get<AuthResponse>(
                API_URL + "/refresh",
                {
                    withCredentials: true,
                }
            );

            localStorage.setItem("token", response.data.accessToken);
            setUser({ data: response.data.user, isAuth: true });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            checkAuth();
        }
    }, []);

    return (
        <Context.Provider value={{ user: { user, setUser } }}>
            <div className="text-center">
                <Navbar />
                <div>{user.isAuth ? <HomePage /> : <LoginForm />}</div>
            </div>
        </Context.Provider>
    );
};

export default App;
