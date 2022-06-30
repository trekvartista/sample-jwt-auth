import { createContext, FC, useState } from "react";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";

export const Context = createContext({});

const App: FC = () => {

	const [user, setUser] = useState({
		data: {},
		isAuth: true
	})

    return (
        <Context.Provider value={{ user: {user, setUser}}}>
            <div className="text-center">
                <div>
					<Navbar />
					<LoginForm />
				</div>
            </div>
        </Context.Provider>
    );
};

export default App;
