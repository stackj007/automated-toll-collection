import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { DocumentsUploadedProvider } from './hooks/DocumentsUploadedContext'
import { TransactionProvider } from './hooks/TransactionContext'
// import LandingPage from './components/pages/LandingPage/LandingPage'
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
import Account from './components/pages/AccountPage/account.jsx'
import ProfileCompletion from './components/pages/DashboardPage/ProfileCompletion'
import QrCodePage from './components/pages/DashboardPage/QrCodeScanner'
import TransactionHistoryDetails from './components/pages/AccountPage/TransactionHistoryDetails'

import CircularProgress from '@mui/material/CircularProgress'
import TransactionsContent from './components/pages/AdminDashboard/Content/TransactionsContent'
import UsersContent from './components/pages/AdminDashboard/Content/UsersContent'
import UserRequests from './components/pages/AdminDashboard/Content/UserRequests'
import SuccessPage from './components/pages/SuccessPage/SuccessPage'
import TollStationsContent from './components/pages/AdminDashboard/Content/TollStationsContent'
function App() {
  axios.defaults.withCredentials = true
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

  const { fetchUser, user, loading } = useAuth()

  useEffect(() => {
    fetchUser()
  }, [])

  if (loading) {
    return (
      <CircularProgress size={50} sx={{ color: 'black' }} />
    )
  }

  return (
    <TransactionProvider>
      <DocumentsUploadedProvider>
        <Router>
          {!user?.isAdmin && <Header />}

          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                user?.isAdmin ? (
                  <AdminDashboard /> // TODO: bad naming, rename to UserDashboard or any other
                ) : (
                  <DashboardPage />
                )
              }
            />

            <Route
              path="/documents"
              element={<Documents />}
            />

            <Route path="/account" element={<Account />} />
            <Route
              path="/success"
              element={<SuccessPage />}
            />

            <Route
              path="/profile-completion"
              element={<ProfileCompletion />}
            />
            <Route
              path="/qr-code"
              element={<QrCodePage />}
            />
            <Route
              path="/transaction-history-details"
              element={<TransactionHistoryDetails />}
            />

            <Route
              path="/admin"
              element={<AdminDashboard />}
            >
              <Route
                path="/admin/users"
                element={<UsersContent />}
              />
              <Route
                path="/admin/transactions"
                element={<TransactionsContent />}
              />
              <Route
                path="/admin/userRequests"
                element={<UserRequests />}
              />
              <Route
                path="/admin/tollStations"
                element={<TollStationsContent />}
              />
            </Route>
          </Routes>
        </Router>
      </DocumentsUploadedProvider>
    </TransactionProvider>
  )
}

export default App
