import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Results from './components/Results';
import Document from './components/Document';
import Trends from './components/Trends';

// Create context for global state
const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    category: 'All Categories',
    source: 'All Sources',
    year: 'All Years'
  });

  const contextValue = {
    user,
    setUser,
    theme,
    setTheme,
    searchQuery,
    setSearchQuery,
    searchFilters,
    setSearchFilters
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className={`app ${theme}`} data-theme={theme}>
        <Router>
          <Routes>
            <Route 
              path="/login" 
              element={
                user ? <Navigate to="/dashboard" replace /> : <Login />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                user ? <Dashboard /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/results" 
              element={
                user ? <Results /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/document/:id" 
              element={
                user ? <Document /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/trends" 
              element={
                user ? <Trends /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/" 
              element={
                user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
