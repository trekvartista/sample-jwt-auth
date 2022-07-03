import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import { Context } from '../App';
import { IUser } from '../models/IUser';
import { LOGIN_ROUTE } from '../routes/consts';

const Navbar: FC = () => {

	const {user, setUser} = useContext(Context as any);
	const navigate = useNavigate()

	const handleLogout = async() => {

		const response = await logout()

		localStorage.removeItem('token');
		setUser({data: {} as IUser, isAuth: false});
		navigate(LOGIN_ROUTE);
	}

	return (
		<div className='py-4 px-12 absolute w-full'>
			<nav className='flex flex-row gap-4'>
				<div className='w-full py-1 px-3'>
					{user?.isAuth
						?
							<div className='flex flex-row justify-between items-center gap-4'>
								{user.data.isActivated
									?
										<span className='bg-green-400 p-1 rounded-sm'>Account is activated by email</span>
									:
										<span className='bg-red-400 p-1 rounded-sm'>Account is not activated</span>

									}
								<span className='text-violet-700 font-medium'>{user?.data?.email}</span>
								<button onClick={handleLogout} className='p-1 px-3 text-gray-700 font-bold hover:bg-zinc-100 rounded-md'>Logout</button>
							</div>
						:
							<></>
					}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;