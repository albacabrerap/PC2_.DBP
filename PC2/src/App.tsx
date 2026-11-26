import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './AuthContext'
import Navbar from './components/Navbar'
import Login from './Login'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col gap-10 pb-12 bg-slate-50 text-slate-800">
          <Navbar/>
          <Routes>
            <Route path ="/" element ={<Navigate to="/mainpage" replace/>}/>
            <Route path ="/login" element ={<Login/>}/>
            <Route path ="/login" element ={<Register/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
