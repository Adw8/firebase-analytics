import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom";
import { arrayRemove, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
// import UserDashboard from './Dashboard';

const Account = () => {
  const {user, logout} = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () =>{
    try {
      await logout(); 
      navigate('/');
      // const session_id = localStorage.getItem('session_id')
      // console.log(user.uid, session_id, timestamp)
      await updateSessionEndOnLogout()
      // console.log('logged out!');
    } catch (error) {
      console.log(error.message);
    }
  }

  const updateSessionEndOnLogout = async () => {
    try {
        const userDocRef = doc(collection(db, "userSessions"), user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const id = Number(localStorage.getItem("session_id"));
            const timestamp = new Date();

    
          const updatedSessions = userDoc.data().sessions.map(session => {
            if (session.session_id === id) {
                return {
                    ...session,
                    session_end: timestamp,
                };
            }
            return session;
        });
          //  console.log(sessionsCopy)
          
           await setDoc(userDocRef, {
            sessions: updatedSessions,
        });

        } else {
            console.log('User document not found.');
        }
    } catch (error) {
        console.log('Error updating session end:', error.message);
    }
};


 

  

  return (
    <> 
    <h1 className='text-center text-3xl my-4 font-bold'>
      Account Info
    </h1>
    <div className='max-w-2xl mx-auto my-16 p-4 bg-white shadow-md rounded-md'>
      {/* <h1 className='text-2xl font-bold py-4'>Account</h1> */}
      <p className='mb-4'><strong>User Email: </strong> {user && user.email}</p>
      <p className='mb-4'><strong>Account created on: </strong> {user && user.metadata && user.metadata.creationTime}</p>
      <p className='mb-4'><strong>Last Login at : </strong> {user && user.metadata && user.metadata.lastSignInTime}</p>

      <p className='my-4'><Link to ='/reports' className='underline'>View User Info</Link></p>
      <button
        onClick={handleLogout}
        className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
      >
        Logout
      </button>
      
    </div>
    </>
  )
}

export default Account