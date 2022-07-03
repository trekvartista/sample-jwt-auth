import React, { useState } from 'react';
import { getUsers } from '../api/user';
import { IUser } from '../models/IUser';

const HomePage = () => {

	const [users, setUsers] = useState<IUser[]>([])

	const handleClick = async () => {
		const response = await getUsers()

		setUsers(response.data)
		// console.log(response)
	}

	return (
		<div className='w-full h-screen flex flex-col p-24 items-start'>
			<div className='text-xl font-semibold'>Home Page</div>
			<div className='mt-10 flex flex-col gap-4 w-1/2'>
				<button onClick={handleClick} className="border p-1 px-3 rounded-md hover:bg-teal-50 hover:scale-[98%]">Get list of users</button>
				<div className='w-full flex flex-col items-start gap-2'>
					{users.map(user => (
						<div key={user.id} className="w-full border-t-2 p-4 text-gray-600 font-semibold">{user.email}</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HomePage;