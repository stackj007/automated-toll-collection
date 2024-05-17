import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { DocumentsUploadedProvider } from './hooks/DocumentsUploadedContext'
import { TransactionProvider } from './hooks/useTransactions'
import LoginPage from './components/pages/LoginPage'
import SignUp from './components/pages/SignUp'
import Header from './components/Navbar.jsx'
import './tailwind.css'
import axios from 'axios'
import { useAuth } from './AuthContext.jsx'
import { useEffect } from 'react'
import { DashboardPage } from './components/pages/DashboardPage/UserDashboard.jsx'
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
import SuccessPage from './components/pages/SuccessPage'
import FailedPage from './components/pages/FailedPage'
import TollStationsContent from './components/pages/AdminDashboard/Content/TollStationsContent'
import LandingPage from './components/pages/LandingPage/LandingPage.jsx'

function App() {
  axios.defaults.withCredentials = true
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

  const { fetchUser, user, loading } = useAuth()

  useEffect(() => {
    fetchUser()
  }, [])

  if (loading) {
    return <CircularProgress size={50} sx={{ color: 'black' }} />
  }

  return (
    <TransactionProvider>
      <DocumentsUploadedProvider>
        <Router>
          {<Header />}

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            {!!user && (
              <>
                <Route
                  path="/dashboard"
                  element={user?.isAdmin ? <AdminDashboard /> : <DashboardPage />}
                />

                <Route
                  path="/documents"
                  element={
                    user?.isApproved ? <Navigate to="/dashboard" /> : <Documents />
                  }
                />

                {!user?.isAdmin && <Route path="/account" element={<Account />} />}

                <Route path="/success" element={<SuccessPage />} />
                <Route path="/cancel" element={<FailedPage />} />

                <Route path="/profile-completion" element={<ProfileCompletion />} />
                <Route path="/qr-code" element={<QrCodePage />} />
                <Route
                  path="/transaction-history-details"
                  element={<TransactionHistoryDetails />}
                />
              </>
            )}
            {user?.isAdmin && (
              <Route path="/dashboard" element={<AdminDashboard />}>
                <Route path="/dashboard/users" element={<UsersContent />} />
                <Route path="/dashboard/transactions" element={<TransactionsContent />} />
                <Route path="/dashboard/userRequests" element={<UserRequests />} />
                <Route path="/dashboard/tollStations" element={<TollStationsContent />} />
              </Route>
            )}
          </Routes>
        </Router>
      </DocumentsUploadedProvider>
    </TransactionProvider>
  )
}

export default App
