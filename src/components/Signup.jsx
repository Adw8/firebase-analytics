// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
/* eslint-disable no-unused-vars */
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { incrementLoginCount, storeSessionStart } from './Db'
import Signin from './Signin'
import { addDoc, collection, doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {createUser} = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError('')
        try {
            const uid = await createUser(email, password)
            // console.log(uid);

            const userCollectionRef = collection(db, "users");
            const docRef = doc(userCollectionRef, uid);
            
            setDoc(docRef, {
                username: email,
                loginCount: 1,
            })
            const userDocRef = doc(collection(db, "userSessions"), uid)
            const userDoc = getDoc(userDocRef)

            storeSessionStart(uid)
            console.log('Document written with id: ', docRef.id);
            navigate('/account')
        } catch (e) {
            setError(e.message);
            alert(e.message);
        }
    }   

  return (
    <div className= 'max-w-[700px] mx-auto my-16 p-4'>
        <div>
            <h1 className='text-2xl font-bold py-2'>Sign up for a free account</h1>
            <p className='py-2'>
                Already have an account? <Link to ='/' className='underline'>Log in.</Link>
            </p>
        </div>
    <form onSubmit={handleSubmit}>
        <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Email Address</label>
            <input onChange = {(e)=>setEmail(e.target.value)}className='border p-3' type='email' />
            
        </div>
        <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Password</label>
            <input onChange = {(e)=>setPassword(e.target.value)} className='border p-3' type='password' />
            
        </div>
        <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>Sign Up</button>
    </form>
    </div>

  )
}

export default Signup