import { FC, useContext, useState } from "react";
import { login, register } from "../api/auth";
import { Context } from "../App";

const RegisterForm: FC = () => {

    const { user } = useContext(Context as any);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handleSubmit = async () => {
        // console.log(email, password)
        try {
        	const response = await register(email, password)
        	localStorage.setItem('token', response.data.accessToken)

			user.setUser({data: response.data.user, isAuth: true})
        } catch (e) {
        	console.log(e)
        }
    };

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
            </div>
        </div>
    );
};

export default RegisterForm;
