import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Gavel, User, Plus, Bell, LogOut, Search } from 'lucide-react';
import AuthModal from '../Auth/AuthModal';
import CreateAuctionModal from '../Auction/CreateAuctionModal';

import { useTheme } from '../../contexts/ThemeContext';

export default function Header({ onSearchChange, searchTerm }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <div className="logo">
              <Gavel className="logo-icon" />
              <span>AuctionHub</span>
            </div>
          </div>

          <div className="header-center">
            <div className="search-bar">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search auctions..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          <div className="header-right">
            <button className="header-button" onClick={toggleTheme} title="Toggle theme">
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            {currentUser ? (
              <>
                <button
                  className="header-button create-btn"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus size={20} />
                  Create Auction
                </button>
                
                <button className="notification-btn">
                  <Bell size={20} />
                  <span className="notification-dot"></span>
                </button>

                <div className="user-menu">
                  <div className="user-info">
                    <User size={20} />
                    <span>{currentUser.name}</span>
                  </div>
                  <button onClick={logout} className="logout-btn">
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <button
                className="header-button login-btn"
                onClick={() => setShowAuthModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      <CreateAuctionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  );
}