/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
const Signin = () => {
    const {signIn} = UserAuth ();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('')
        try {
            const uid = await signIn(email, password)
            await incrementLoginCount(uid);
            navigate('/account');

        } catch (e) {
            setError(e.message);
            alert(e.message);
            
        }
    }

    const incrementLoginCount = async(uid) =>{
        const userDocRef = doc(collection(db, "users"), uid);
        const userDoc = await getDoc(userDocRef);
        const currentLoginCount = userDoc.exists() ? userDoc.data().loginCount || 0: 0
        await updateDoc(userDocRef, {
            loginCount: currentLoginCount + 1,
        });
    }

    return (
 


    <div className= 'max-w-[700px] mx-auto my-16 p-4'>
        <div>
            <h1 className='text-2xl font-bold py-2'>Log in to your account</h1>
            <p className='py-2'>
                Don`t have an account yet? <Link to ='/signup' className='underline'>Sign up</Link>
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
        <button className='border border-blue-500 bg-green-600 hover:bg-greeb-500 w-full p-4 my-2 text-white'>Log In</button>
    </form>
    </div>
  )
}

export default Signin
