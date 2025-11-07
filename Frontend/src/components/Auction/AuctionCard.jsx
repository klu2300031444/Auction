import { useState, useEffect } from 'react';
import { Clock, User, TrendingUp } from 'lucide-react';
import { formatDistanceToNow, isValid as isValidDate } from 'date-fns';
import BidModal from './BidModal';

export default function AuctionCard({ auction }) {
  // Defensive defaults in case auction is undefined or missing fields
  auction = auction || {};
  const bids = auction.bids || [];

  const [timeLeft, setTimeLeft] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
    const endTime = auction.endTime ? new Date(auction.endTime) : null;
    const diff = endTime && isValidDate(endTime) ? (endTime - now) : Infinity;

      if (diff <= 0) {
        setTimeLeft('Auction ended');
        setIsExpired(true);
      } else {
        setTimeLeft(endTime && isValidDate(endTime) ? formatDistanceToNow(endTime, { addSuffix: true }) : 'No end time');
        setIsExpired(false);
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [auction.endTime]);

  const getHighestBidder = () => {
    if (bids.length === 0) return null;
    return bids[bids.length - 1]?.userName ?? null;
  };

  return (
    <>
      <div className="auction-card">
        <div className="auction-image">
          <img src={auction.image} alt={auction.title} />
          <div className={`auction-status ${isExpired ? 'expired' : 'active'}`}>
            <Clock size={16} />
            {timeLeft}
          </div>
        </div>

        <div className="auction-content">
          <h3 className="auction-title">{auction.title}</h3>
          <p className="auction-description">{auction.description}</p>

          <div className="auction-seller">
            <User size={16} />
            <span>{auction.sellerName}</span>
          </div>

          <div className="auction-pricing">
            <div className="current-price">
              <span className="price-label">Current Bid</span>
              <span className="price-amount">${(Number(auction.currentPrice || auction.startingPrice || 0)).toLocaleString()}</span>
            </div>
            
            {getHighestBidder() && (
              <div className="highest-bidder">
                <TrendingUp size={16} />
                <span>Leading: {getHighestBidder()}</span>
              </div>
            )}
          </div>

          <div className="auction-bids">
            <span className="bid-count">{bids.length} bid{bids.length !== 1 ? 's' : ''}</span>
            <span className="starting-price">Started at ${(Number(auction.startingPrice || 0)).toLocaleString()}</span>
          </div>

          <button
            className={`bid-button ${isExpired ? 'disabled' : ''}`}
            onClick={() => !isExpired && setShowBidModal(true)}
            disabled={isExpired}
          >
            {isExpired ? 'Auction Ended' : 'Place Bid'}
          </button>
        </div>
      </div>

      <BidModal
        auction={auction}
        isOpen={showBidModal}
        onClose={() => setShowBidModal(false)}
      />
    </>
  );
}