import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout components
import Layout from './components/layout/Layout';
import DashboardLayout from './components/layout/DashboardLayout';

// Page components
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import SetupPage from './pages/SetupPage';
import DashboardHome from './pages/dashboard/DashboardHome';
import ProfileEdit from './pages/dashboard/ProfileEdit';
import StyleCustomize from './pages/dashboard/StyleCustomize';
import NfcWritePage from './pages/dashboard/NfcWritePage';
import SettingsPage from './pages/dashboard/SettingsPage';
import AlteLink from './pages/dashboard/AlteLink';
import PublicProfilePage from './pages/PublicProfilePage';
import ShopPage from './pages/ShopPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes with main layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/u/:username" element={<PublicProfilePage />} />
          </Route>
          
          {/* Dashboard routes with dashboard layout */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<ProfileEdit />} />
            <Route path="style" element={<StyleCustomize />} />
            <Route path="nfc-write" element={<NfcWritePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="alte-link" element={<AlteLink />} />
          </Route>
          
          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;