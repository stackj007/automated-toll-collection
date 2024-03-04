import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import LandingPage from './components/pages/LandingPage/LandingPage'
import LoginPage from './components/pages/LoginPage/LoginPage'
import Header from './components/Header.jsx'
import './tailwind.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
