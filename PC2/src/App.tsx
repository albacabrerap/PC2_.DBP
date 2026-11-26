import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { AuthProvider } from './AuthContext'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col gap-10 pb-12 bg-slate-50 text-slate-800">
          <Navbar/>
          <Routes>
            <Route path ="/" element ={<Navigate to="/main" replace/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
