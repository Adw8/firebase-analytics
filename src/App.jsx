import { useState } from 'react'

import './App.css'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Account from './components/Account'
import { Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-center text-3xl font-bold'>
        Firebase Auth and Context
      </h1>
      <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/account' element={<Account />} />

        </Routes>
        </AuthContextProvider>
    </>
  )
}

export default App