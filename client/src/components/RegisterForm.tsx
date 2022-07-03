import { FC, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, register } from "../api/auth";
import { Context } from "../App";
import loading from "../assets/loading-buffering.gif";
import { HOME_ROUTE, LOGIN_ROUTE } from "../routes/consts";

const RegisterForm: FC = () => {
    const { user } = useContext(Context as any);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const validate = () => {
        if (!email || !password || !repeatPassword) {
            return false;
        }
        if (password !== repeatPassword) {
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        // console.log(email, password)
        if (validate()) {
            try {
				setIsLoading(true);
                const response = await register(email, password);
                localStorage.setItem("token", response.data.accessToken);

                user.setUser({ data: response.data.user, isAuth: true });
            } catch (e) {
                console.log(e);
            } finally {
				setIsLoading(false);
			}
        }
    };

    useEffect(() => {
        if (user?.isAuth) {
            navigate(HOME_ROUTE);
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
        <div className="w-full h-screen flex flex-col ">
            <div className="m-auto flex flex-col gap-4 p-8 rounded-lg border-[1px] border-gray-700 shadow-md">
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    placeholder="Email..."
                    className="p-2"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    placeholder="Password..."
                    className="p-2"
                />
                <input
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    autoComplete="off"
                    placeholder="Repeat password..."
                    className="p-2"
                />
                <button
                    onClick={handleSubmit}
                    className="p-2 font-bold text-gray-700 border rounded-md hover:scale-95 transition-all"
                >
                    Register
                </button>

                <span className="text-gray-400 text-sm">
                    Have an account?{" "}
                    <Link
                        to={LOGIN_ROUTE}
                        className="text-blue-500 font-semibold"
                    >
                        Login!
                    </Link>{" "}
                </span>
            </div>
        </div>
    );
};

export default RegisterForm;
