import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import './index.css'
import Dashboard from './DashBoard'
import Authentication from './Authentication'
import HomePage from './Homepage'


createRoot(document.getElementById('root')).render(
 
      
  
      <BrowserRouter>
      <Routes>
        <Route path='/'  element={<Dashboard/>  }></Route>
        <Route path='/Auth'  element={<Authentication/>}></Route>
        <Route path='/Home'  element ={<HomePage/>}></Route>
      </Routes>
      </BrowserRouter>
)
