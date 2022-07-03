import { FC, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { Context } from "../App";
import loading from "../assets/loading-buffering.gif";
import { HOME_ROUTE, REGISTER_ROUTE } from "../routes/consts";

const LoginForm: FC = () => {

    const {user, setUser} = useContext(Context as any);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate()

    const handleSubmit = async () => {

        try {
			setIsLoading(true);
        	const response = await login(email, password)
        	localStorage.setItem('token', response.data.accessToken)

			setUser({data: response.data.user, isAuth: true})
        } catch (e) {
        	console.log(e)
        } finally {
			setIsLoading(false);
		}
    };

	useEffect(() => {
		if (user?.isAuth) {
			navigate(HOME_ROUTE)
		}
		// console.log(user)
	}, [user])

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
                <button
                    onClick={handleSubmit}
                    className="p-2 font-bold text-gray-700 border rounded-md hover:scale-95 transition-all"
                >
                    Login
                </button>
				<span className="text-gray-400 text-sm">Need an account? <Link to={REGISTER_ROUTE} className="text-blue-500 font-semibold">Register!</Link> </span>
            </div>
        </div>
    );
};

export default LoginForm;
