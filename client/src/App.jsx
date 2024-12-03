import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import Orders from './pages/Orders'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login-user' element={<Login />}/> 
        <Route path='/register-user' element={<Register />}/> 
        <Route path='/profile' element={<Profile />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
      <Toaster position='bottom-right'/>
    </Router>
  )
}

export default App
