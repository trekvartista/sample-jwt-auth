import { FC, useContext, useState } from "react";
import { login } from "../api/auth";
import { Context } from "../App";
import loading from "../assets/loading-buffering.gif";

const LoginForm: FC = () => {

    const {user, setUser} = useContext(Context as any);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

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

	if (isLoading) {
		return (
            <div className="w-full h-screen flex flex-col">
                <img className="m-auto w-12" src={loading} alt="loading..." />
            </div>
        );
	}

    return (
        <div className="w-full h-screen flex flex-col ">
            <div className="m-auto flex flex-col gap-4 p-8 rounded-lg shadow-md">
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
            </div>
        </div>
    );
};

export default LoginForm;
