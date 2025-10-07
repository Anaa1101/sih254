import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../App';
import { 
  Shield, 
  Search, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Moon, 
  Sun,
  BarChart3,
  Home,
  FileText
} from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, setUser, theme, setTheme, searchQuery, setSearchQuery } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/results');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/trends', label: 'Trends', icon: BarChart3 },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Inline styles
  const headerStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
    borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    height: '64px',
    maxWidth: '100%',
    margin: '0 auto'
  };

  const brandStyle = {
    display: 'flex',
    alignItems: 'center',
    flex: '0 0 auto'
  };

  const brandButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '0.5rem',
    transition: 'background-color 0.2s',
    color: theme === 'light' ? '#1f2937' : '#f9fafb'
  };

  const brandIconStyle = {
    width: '24px',
    height: '24px',
    color: '#3b82f6'
  };

  const brandTextStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: theme === 'light' ? '#1f2937' : '#f9fafb'
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flex: '1 1 auto',
    justifyContent: 'center'
  };

  const navItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: isActive 
      ? (theme === 'light' ? '#eff6ff' : '#1e3a8a')
      : 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '0.5rem',
    transition: 'all 0.2s',
    color: isActive
      ? '#3b82f6'
      : (theme === 'light' ? '#4b5563' : '#d1d5db'),
    fontSize: '0.875rem',
    fontWeight: isActive ? '600' : '500'
  });

  const navIconStyle = {
    width: '18px',
    height: '18px'
  };

  const actionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: '0 0 auto'
  };

  const actionButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    padding: '0.5rem',
    backgroundColor: 'transparent',
    border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`,
    cursor: 'pointer',
    borderRadius: '0.5rem',
    transition: 'all 0.2s',
    color: theme === 'light' ? '#4b5563' : '#d1d5db'
  };

  const userMenuWrapperStyle = {
    position: 'relative'
  };

  const userMenuStyle = {
    position: 'absolute',
    top: 'calc(100% + 0.5rem)',
    right: 0,
    width: '280px',
    backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
    border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`,
    borderRadius: '0.75rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    zIndex: 100,
    overflow: 'hidden'
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem'
  };

  const userAvatarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    backgroundColor: theme === 'light' ? '#eff6ff' : '#1e3a8a',
    borderRadius: '50%',
    color: '#3b82f6'
  };

  const userDetailsStyle = {
    flex: 1,
    minWidth: 0
  };

  const userNameStyle = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: theme === 'light' ? '#1f2937' : '#f9fafb',
    marginBottom: '0.25rem'
  };

  const userEmailStyle = {
    fontSize: '0.75rem',
    color: theme === 'light' ? '#6b7280' : '#9ca3af',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  const dividerStyle = {
    height: '1px',
    backgroundColor: theme === 'light' ? '#e5e7eb' : '#374151'
  };

  const userMenuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    color: theme === 'light' ? '#4b5563' : '#d1d5db',
    fontSize: '0.875rem',
    fontWeight: '500',
    textAlign: 'left'
  };

  const menuItemIconStyle = {
    width: '18px',
    height: '18px'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 90
  };

  return (
    <header style={headerStyle} className="header">
      <div style={containerStyle} className="header-container">
        {/* Logo and Brand - LEFT */}
        <div style={brandStyle} className="header-brand">
          <button 
            style={brandButtonStyle}
            className="brand-button"
            onClick={() => navigate('/dashboard')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme === 'light' ? '#f3f4f6' : '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Shield style={brandIconStyle} className="brand-icon" />
            <span style={brandTextStyle} className="brand-text">GovPortal</span>
          </button>
        </div>

        {/* Desktop Navigation - CENTER */}
        <nav style={navStyle} className="header-nav desktop-nav">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            return (
              <button
                key={item.path}
                style={navItemStyle(isActive)}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = theme === 'light' ? '#f3f4f6' : '#374151';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon style={navIconStyle} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Header Actions - RIGHT */}
        <div style={actionsStyle} className="header-actions">
          {/* Theme Toggle */}
          <button
            style={actionButtonStyle}
            className="action-button theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme === 'light' ? '#f3f4f6' : '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* User Menu */}
          <div style={userMenuWrapperStyle} className="user-menu-wrapper">
            <button
              style={actionButtonStyle}
              className="action-button user-button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              aria-label="User menu"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme === 'light' ? '#f3f4f6' : '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <User size={20} />
            </button>
            
            {isUserMenuOpen && (
              <div style={userMenuStyle} className="user-menu">
                <div style={userInfoStyle} className="user-info">
                  <div style={userAvatarStyle} className="user-avatar">
                    <User size={24} />
                  </div>
                  <div style={userDetailsStyle} className="user-details">
                    <div style={userNameStyle} className="user-name">{user?.name || 'User'}</div>
                    <div style={userEmailStyle} className="user-email">{user?.email}</div>
                  </div>
                </div>
                <div style={dividerStyle} className="user-menu-divider"></div>
                <button
                  style={userMenuItemStyle}
                  className="user-menu-item"
                  onClick={handleLogout}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme === 'light' ? '#f9fafb' : '#374151';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <LogOut style={menuItemIconStyle} className="menu-item-icon" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Menu Overlay */}
      {isUserMenuOpen && (
        <div 
          style={overlayStyle}
          className="user-menu-overlay"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;