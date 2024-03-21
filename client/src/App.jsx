import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import LandingPage from './components/pages/LandingPage/LandingPage'
import LoginPage from './components/pages/LoginPage/LoginPage'
import SignUp from './components/pages/SignUp/SignUp'
import Header from './components/Header.jsx'
import './tailwind.css'
import axios from 'axios'
import { useAuth } from './AuthContext.jsx'
import { useEffect } from 'react'
import { DashboardPage } from './components/pages/DashboardPage/DashboardPage.jsx'
import { Documents } from './components/pages/DashboardPage/Documents.jsx'
import AdminDashboard from './components/pages/AdminDashboard/AdminDashboard.jsx'

function App() {
  axios.defaults.withCredentials = true
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

  const { fetchUser, user } = useAuth()

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
          user?.isAdmin
            ? <AdminDashboard /> // TODO: bad naming, rename to UserDashboard or any other
            : <DashboardPage />
          }
        />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </Router>
  )
}

export default App
