import { useState, useMemo } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AuctionProvider } from './contexts/AuctionContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAuction } from './contexts/AuctionContext';
import Header from './components/Header/Header';
import AuctionGrid from './components/Auction/AuctionGrid';
import './App.css';

function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const { auctions: rawAuctions } = useAuction();
  const auctions = Array.isArray(rawAuctions) ? rawAuctions : [];

  const filteredAuctions = useMemo(() => {
    return auctions.filter(auction =>
      (auction.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (auction.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (auction.sellerName || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [auctions, searchTerm]);

  return (
    <div className="app">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <main className="main-content">
        <div className="hero-section">
          <div className="hero-content">
            <h1>Discover Amazing Auctions</h1>
            <p>Bid on unique items from trusted sellers around the world</p>
          </div>
        </div>

        <div className="auctions-section">
          <div className="container">
            <div className="section-header">
              <h2>Active Auctions</h2>
              <p>Find your next treasure among {auctions.length} active auctions</p>
            </div>
            
            <AuctionGrid auctions={filteredAuctions} />
          </div>
        </div>
      </main>
    </div>
  );
}


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuctionProvider>
          <AppContent />
        </AuctionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;