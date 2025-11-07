import AuctionCard from './AuctionCard';

export default function AuctionGrid({ auctions = [] }) {
  if (!Array.isArray(auctions) || auctions.length === 0) {
    return (
      <div className="no-auctions">
        <h3>No auctions found</h3>
        <p>Try adjusting your search or check back later for new auctions.</p>
      </div>
    );
  }

  return (
    <div className="auction-grid">
      {auctions.map((auction, idx) => (
        // Use a stable id when available, otherwise fall back to title or index
        <AuctionCard key={auction?.id ?? auction?.title ?? idx} auction={auction} />
      ))}
    </div>
  );
}