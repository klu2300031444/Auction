import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import apiClient from '../api/apiClient';

const AuctionContext = createContext();

export function useAuction() {
  return useContext(AuctionContext);
}

export function AuctionProvider({ children }) {
  const [auctions, setAuctions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    let mounted = true;

    // Try to fetch from backend, fall back to localStorage/sample data
    async function loadAuctions() {
      try {
        // using apiClient (handles baseURL + token header)
        const { data } = await apiClient.get('/auctions');

        // Ensure we always set an array (backend should return array, but be defensive)
        const arr = Array.isArray(data) ? data : (data ? [data] : []);

        // Normalize endTime: if missing or invalid, set to 24h from now
        const normalized = arr.map(a => {
          const copy = { ...a };
          try {
            const e = copy.endTime ? new Date(copy.endTime) : null;
            if (!e || Number.isNaN(e.getTime())) {
              copy.endTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
            }
          } catch (err) {
            copy.endTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
          }
          return copy;
        });

        if (mounted) {
          setAuctions(normalized);
          localStorage.setItem('auctions', JSON.stringify(normalized));
        }
      } catch (err) {
        // Backend unavailable — fall back to localStorage or sample data
        console.warn('Could not load auctions from backend, using local data:', err.message);
        const savedAuctions = localStorage.getItem('auctions');
        if (savedAuctions) {
          setAuctions(JSON.parse(savedAuctions));
        } else {
          const sampleAuctions = [
            {
              id: '1',
              title: 'Vintage Guitar',
              description: 'Beautiful vintage acoustic guitar in excellent condition',
              image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=500',
              startingPrice: 500,
              currentPrice: 750,
              endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
              sellerId: 'demo-seller',
              sellerName: 'Music Store Pro',
              bids: []
            }
          ];
          setAuctions(sampleAuctions);
          localStorage.setItem('auctions', JSON.stringify(sampleAuctions));
        }
      }
    }

    loadAuctions();

    return () => { mounted = false; };
  }, []);

  const addAuction = async (auctionData) => {
    const payload = {
      title: auctionData.title,
      description: auctionData.description,
      image: auctionData.image || null,
      startingPrice: parseFloat(auctionData.startingPrice),
      currentPrice: parseFloat(auctionData.startingPrice),
      endTime: auctionData.endTime,
      sellerId: currentUser?.id || 'anonymous',
      sellerName: currentUser?.name || 'Anonymous Seller'
    };

    // Optimistic UI: add locally first
    const optimistic = { id: Date.now().toString(), ...payload };
    setAuctions(prev => {
      const updated = [...prev, optimistic];
      localStorage.setItem('auctions', JSON.stringify(updated));
      return updated;
    });

    // Attempt to POST to backend
    try {
      const { data: created } = await apiClient.post('/auctions', payload);

      // Replace optimistic item with server response (which may include real id)
      setAuctions(prev => {
        const filtered = prev.filter(a => a.id !== optimistic.id);
        const updated = [...filtered, created];
        localStorage.setItem('auctions', JSON.stringify(updated));
        return updated;
      });

      return created;
    } catch (err) {
      console.warn('addAuction: backend unavailable, persisted locally', err.message);
      // keep optimistic item; return it so callers can proceed
      return optimistic;
    }
  };

  const placeBid = async (auctionId, amount) => {
    const auction = auctions.find(a => a.id == auctionId);
    if (!auction) return;

    // Optimistic update
    const updatedAuctions = auctions.map(a => {
      if (a.id == auctionId) {
        const updated = {
          ...a,
          currentPrice: amount
        };
        return updated;
      }
      return a;
    });
    setAuctions(updatedAuctions);
    localStorage.setItem('auctions', JSON.stringify(updatedAuctions));

    // Add notification
    const notification = {
      id: Date.now().toString(),
      type: 'bid',
      message: `New bid of $${amount} placed on ${auction.title}`,
      time: new Date().toISOString(),
      auctionId
    };
    setNotifications(prev => [notification, ...prev.slice(0, 9)]);

    // Update on backend
    try {
      const updatePayload = {
        ...auction,
        currentPrice: amount
      };
      await apiClient.put(`/auctions/${auctionId}`, updatePayload);
    } catch (err) {
      console.warn('placeBid: failed to update backend', err.message);
    }
  };

  const updateAuction = async (auctionId, auctionData) => {
    // Optimistic update
    const updatedAuctions = auctions.map(a => {
      if (a.id == auctionId) {
        return { ...a, ...auctionData };
      }
      return a;
    });
    setAuctions(updatedAuctions);
    localStorage.setItem('auctions', JSON.stringify(updatedAuctions));

    // Update on backend
    try {
      const { data: updated } = await apiClient.put(`/auctions/${auctionId}`, auctionData);
      setAuctions(prev => prev.map(a => a.id == auctionId ? updated : a));
      localStorage.setItem('auctions', JSON.stringify(auctions));
      return updated;
    } catch (err) {
      console.warn('updateAuction: backend unavailable', err.message);
      return updatedAuctions.find(a => a.id == auctionId);
    }
  };

  const deleteAuction = async (auctionId) => {
    // Optimistic delete
    const updatedAuctions = auctions.filter(a => a.id != auctionId);
    setAuctions(updatedAuctions);
    localStorage.setItem('auctions', JSON.stringify(updatedAuctions));

    // Delete on backend
    try {
      await apiClient.delete(`/auctions/${auctionId}`);
    } catch (err) {
      console.warn('deleteAuction: backend unavailable', err.message);
    }
  };

  const value = {
    auctions,
    notifications,
    addAuction,
    placeBid,
    updateAuction,
    deleteAuction
  };

  return (
    <AuctionContext.Provider value={value}>
      {children}
    </AuctionContext.Provider>
  );
}