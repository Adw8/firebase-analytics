// import { useState } from 'react'

import './App.css'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Account from './components/Account'
import { Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
      <h1 className='text-center text-3xl my-4 font-bold'>
        Firebase Auth and Context
      </h1>
      <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/account' element={
        <ProtectedRoute><Account /></ProtectedRoute>
        } />
        </Routes>
        </AuthContextProvider>
    </>
  )
}

export default App
