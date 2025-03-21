import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Pagenotfound from './Components/pagenotfound'
import Login from './Components/Login'
import REgister from './Components/REgister'
import Questions from './Components/Questions'
import Feedback from './Components/Feedback'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className=''>
      <Routes>

      <Route  path='/' element ={<Home />} />
      <Route  path='*' element ={<Pagenotfound />} />
      <Route  path='/Login' element ={<Login />} />
      <Route  path='/register' element ={<REgister />} />
      <Route  path='/questions' element ={<Questions />} />
      <Route  path='/feedback' element ={<Feedback />} />


      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  )
}

export default App