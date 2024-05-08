import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './component/Home.jsx'
import Navbar from './component/Navbar.jsx'
import Login from './component/Login.jsx'
import AddDish from './component/addDish.jsx'
import ViewDish from './component/ViewDish.jsx'
import Profile from './component/Profile.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Home/>}></Route>
        <Route path ="/navbar" element={<Navbar/>}></Route>
        <Route path ="/login" element={<Login/>}></Route>
        <Route path ="/add" element={<AddDish/>}></Route>
        <Route path ="/home/:id" element={<ViewDish/>}></Route>
        <Route path ="/profile" element={<Profile/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
