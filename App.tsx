
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Stats from './pages/Stats';
import Merch from './pages/Merch';
import EventManagement from './pages/EventManagement';
import EventBrowser from './pages/EventBrowser';
import BookingHistory from './pages/BookingHistory';
import Sidebar from './components/Sidebar';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'admin' | 'customer' | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('vibe_auth');
    const role = localStorage.getItem('vibe_role') as 'admin' | 'customer';
    if (authStatus === 'true' && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (role: 'admin' | 'customer') => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('vibe_auth', 'true');
    localStorage.setItem('vibe_role', role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('vibe_auth');
    localStorage.removeItem('vibe_role');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-[#050505] text-white">
        {isAuthenticated && <Sidebar onLogout={handleLogout} role={userRole!} />}
        <main className={`flex-1 overflow-auto ${isAuthenticated ? 'md:ml-64' : ''}`}>
          <Routes>
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/" 
              element={isAuthenticated ? <Dashboard role={userRole!} /> : <Navigate to="/login" />} 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/events-manage" 
              element={isAuthenticated && userRole === 'admin' ? <EventManagement /> : <Navigate to="/" />} 
            />
            <Route 
              path="/stats" 
              element={isAuthenticated && userRole === 'admin' ? <Stats /> : <Navigate to="/" />} 
            />

            {/* Shared/Customer Routes */}
            <Route 
              path="/explore" 
              element={isAuthenticated ? <EventBrowser /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/bookings" 
              element={isAuthenticated ? <BookingHistory /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/merch" 
              element={isAuthenticated ? <Merch /> : <Navigate to="/login" />} 
            />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
