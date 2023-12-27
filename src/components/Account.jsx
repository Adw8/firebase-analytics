import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
import UserDashboard from './Dashboard';

const Account = () => {
  const {user, logout} = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () =>{
    try {
      await logout(); 
      navigate('/');
      // console.log('logged out!');
    } catch (error) {
      console.log(error.message);
    }
  }

  

  return (

    <div className='max-w-2xl mx-auto my-16 p-4 bg-white shadow-md rounded-md'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <p className='mb-4'><strong>User Email: </strong> {user && user.email}</p>
      <p className='mb-4'><strong>Account created on: </strong> {user && user.metadata && user.metadata.creationTime}</p>
      <p className='mb-4'><strong>Last Login at : </strong> {user && user.metadata && user.metadata.lastSignInTime}</p>

      {/* <button onClick={()=>console.log(user)}>ffff</button> */}
      <UserDashboard />
      <button
        onClick={handleLogout}
        className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
      >
        Logout
      </button>
    </div>
  )
}

export default Account