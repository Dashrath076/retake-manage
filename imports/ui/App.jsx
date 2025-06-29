import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router,Switch, Routes, Route, Navigate } from 'react-router-dom';
import Sidenav from './sideBar';
import ControlDesk from './pages/ControlDesk/ControlDesk.jsx';
import Devices from './pages/Device/Devices';
import Employees from './pages/Employee/Employees';
import Accounts from './pages/Account/Accounts.jsx';
import Invoices from './pages/Invoices';
import Header from './Header';
import Login from './LoginOrSignUp';
import {QueryClient, QueryClientProvider} from 'react-query';
import { Meteor } from 'meteor/meteor';
import './App.css';

export const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const queryClient = new QueryClient();
  //const [currentUser, setCurrentUser] = useState(null);


  const handleLogin = (email, password) => {

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.error('Login failed:', error.reason);
        // Handle login failure (show error message, redirect, etc.)
      } else {
        alert('Login successful!');
        setAuthenticated(true);

        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('loginTime', new Date().getTime());

        const currentUser = Meteor.user();
        if (currentUser && currentUser.emails && currentUser.emails.length > 0) {
          localStorage.setItem('email', currentUser.emails[0].address);
        }

        if (currentUser && currentUser.profile) {
          localStorage.setItem('firstName', currentUser.profile.firstName || '');
          localStorage.setItem('lastName', currentUser.profile.lastName || '');
          localStorage.setItem('phone', currentUser.profile.phone || '');
          localStorage.setItem('altphone', currentUser.profile.altphone || '');
        }
      }
    });
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    const loginTime = localStorage.getItem('loginTime');
    const now = new Date().getTime();
    const timeDifference = now - parseInt(loginTime, 10);

    if (loggedIn === 'true' && timeDifference < 3600000) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loginTime');
    setAuthenticated(false);
    localStorage.clear();
  };

  return (
    <div className="App">
  <QueryClientProvider client={queryClient}>
    <Router>
      {/* Sidenav and Header are rendered only when authenticated */}
      {authenticated && (
        <>
          <Sidenav onLogout={handleLogout} />
          <Header />
        </>
      )}

      {/* Routes */}
      <Routes>
        {/* ControlDesk route accessible only when authenticated */}
        {authenticated && <Route path="/" element={<ControlDesk />} />}

        {/* Login route accessible only when not authenticated */}
        {!authenticated && <Route path="/login" element={<Login onLogin={handleLogin} />} />}

        {/* These routes are accessible only when authenticated */}
        {authenticated && (
          <>
            <Route path="/controlDesk" element={<ControlDesk />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/invoices" element={<Invoices />} />

            {/* Redirect any unknown paths to the root path */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>

      {/* Redirect to the login page if not authenticated */}
      {!authenticated && <Navigate to="/login" replace />}
    </Router>
  </QueryClientProvider>
</div>
  )
};
