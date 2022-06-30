import { FC, useContext } from 'react';
import { logout } from '../api/auth';
import { Context } from '../App';
import { IUser } from '../models/IUser';

const Navbar: FC = () => {

	const {user} = useContext(Context as any);

	const handleLogout = async() => {

		const response = await logout()

		localStorage.removeItem('token');
		user.setUser({data: {} as IUser, isAuth: false});
	}

	return (
		<div className='py-4 px-12 absolute w-full'>
			<nav className='flex flex-row gap-4'>
				<div className='ml-auto py-1 px-3'>
					{user?.isAuth
						?
							<div className='flex flex-row gap-4'>
								<strong>{user.data.email}</strong>
								<button onClick={handleLogout} className='text-gray-700 font-bold hover:bg-zinc-100 rounded-md'>Logout</button>
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