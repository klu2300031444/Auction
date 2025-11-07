import { useState } from 'react';
import { X, Gavel, TrendingUp, Clock, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAuction } from '../../contexts/AuctionContext';
import { formatDistanceToNow, isValid as isValidDate } from 'date-fns';

export default function BidModal({ auction, isOpen, onClose }) {
  auction = auction || {};
  const bids = Array.isArray(auction.bids) ? auction.bids : [];
  const safeCurrentPrice = Number(auction.currentPrice ?? auction.startingPrice ?? 0) || 0;
  const [bidAmount, setBidAmount] = useState(safeCurrentPrice + 10);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { placeBid } = useAuction();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (bidAmount <= (Number(auction.currentPrice ?? 0))) {
      alert('Bid must be higher than current price');
      return;
    }

    setLoading(true);
    
    try {
      if (auction?.id) {
        placeBid(auction.id, bidAmount);
      }
      onClose();
    } catch (error) {
      console.error('Error placing bid:', error);
    }
    
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bid-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Place Your Bid</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="auction-summary">
          <img src={auction.image} alt={auction.title} />
          <div className="auction-details">
            <h3>{auction.title}</h3>
            <div className="auction-meta">
              <div className="meta-item">
                <User size={16} />
                <span>{auction.sellerName}</span>
              </div>
                <div className="meta-item">
                  <Clock size={16} />
                  <span>
                    Ends {
                      (() => {
                        const end = auction.endTime ? new Date(auction.endTime) : null;
                        return end && isValidDate(end) ? formatDistanceToNow(end, { addSuffix: true }) : 'Unknown';
                      })()
                    }
                  </span>
                </div>
            </div>
          </div>
        </div>

        <div className="current-bid-info">
          <div className="current-price">
            <TrendingUp size={20} />
            <div>
              <span className="price-label">Current Highest Bid</span>
              <span className="price-amount">${Number(auction.currentPrice || auction.startingPrice || 0).toLocaleString()}</span>
            </div>
          </div>
          <div className="bid-count">
            {bids.length} bid{bids.length !== 1 ? 's' : ''}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bid-form">
          <div className="bid-input-group">
            <label htmlFor="bidAmount">Your Bid Amount</label>
            <div className="bid-input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                id="bidAmount"
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                min={auction.currentPrice + 1}
                step="1"
                required
              />
            </div>
            <div className="bid-suggestions">
              <button
                type="button"
                onClick={() => setBidAmount(safeCurrentPrice + 10)}
                className="suggestion-btn"
              >
                +$10
              </button>
              <button
                type="button"
                onClick={() => setBidAmount(safeCurrentPrice + 25)}
                className="suggestion-btn"
              >
                +$25
              </button>
              <button
                type="button"
                onClick={() => setBidAmount(safeCurrentPrice + 50)}
                className="suggestion-btn"
              >
                +$50
              </button>
            </div>
          </div>

          <div className="bid-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="place-bid-btn" disabled={loading}>
              <Gavel size={20} />
              {loading ? 'Placing Bid...' : `Bid $${Number(bidAmount || 0).toLocaleString()}`}
            </button>
          </div>
        </form>

        {bids.length > 0 && (
          <div className="recent-bids">
            <h4>Recent Bids</h4>
            <div className="bids-list">
              {bids.slice(-5).reverse().map((bid, idx) => (
                <div key={bid?.id ?? idx} className="bid-item">
                  <div className="bidder-info">
                    <User size={16} />
                    <span>{bid?.userName ?? 'Unknown'}</span>
                  </div>
                  <div className="bid-details">
                    <span className="bid-amount">${Number(bid?.amount ?? 0).toLocaleString()}</span>
                    <span className="bid-time">
                      {(() => {
                        const t = bid?.time ? new Date(bid.time) : null;
                        return t && isValidDate(t) ? formatDistanceToNow(t, { addSuffix: true }) : 'Unknown time';
                      })()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}