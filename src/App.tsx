import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Budget from './pages/Budget';
import Savings from './pages/Savings';
import VerifyEmail from './pages/VerifyEmail';
import ThankYou from './pages/ThankYou';
import LanguageSwitcher from './components/LanguageSwitcher';
import { authService } from './services/authService';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = await authService.getCurrentUser();
        if (!userData.isVerified) {
          authService.logout();
          setUser(null);
        } else {
          setUser(userData);
        }
      } catch {
        authService.logout();
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser().finally(() => setLoading(false));
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        checkUser();
      }
    };

    const handleLogin = () => {
      checkUser();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLogin', handleLogin);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleLogin);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Auth />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Auth />} />
          {user ? (
            <Route path="/*" element={
              <Layout user={user}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/applications" element={<Applications />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/savings" element={<Savings />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
              </Layout>
            } />
          ) : (
            <Route path="/*" element={<Navigate to="/login" />} />
          )}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
