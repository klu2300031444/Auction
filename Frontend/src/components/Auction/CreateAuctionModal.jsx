import { useRef, useState } from 'react';
import { X, Upload, Calendar, DollarSign } from 'lucide-react';
import { useAuction } from '../../contexts/AuctionContext';

export default function CreateAuctionModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    startingPrice: '',
    duration: '24'
  });
  const [loading, setLoading] = useState(false);
  const { addAuction } = useAuction();

  const sampleImages = [
    'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500'
  ];

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endTime = new Date();
    endTime.setHours(endTime.getHours() + parseInt(formData.duration));

    const auctionData = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      startingPrice: parseFloat(formData.startingPrice),
      endTime: endTime.toISOString()
    };

    addAuction(auctionData);
    
    setFormData({
      title: '',
      description: '',
      image: '',
      startingPrice: '',
      duration: '24'
    });
    
    setLoading(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="create-auction-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Auction</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-auction-form">
          <div className="form-group">
            <label htmlFor="title">Auction Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter a descriptive title for your item"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your item in detail..."
              required
            />
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', width: '100%' }}>
                <div className="image-selector" style={{ flex: 1 }}>
              {sampleImages.map((image, index) => (
                <div
                  key={index}
                  className={`image-option ${formData.image === image ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, image })}
                >
                  <img src={image} alt={`Option ${index + 1}`} />
                </div>
              ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={async (e) => {
                      const file = e.target.files && e.target.files[0];
                      if (!file) return;
                      // read file as data URL
                      const reader = new FileReader();
                      reader.onload = () => {
                        setFormData(prev => ({ ...prev, image: reader.result }));
                      };
                      reader.readAsDataURL(file);
                    }}
                  />

                  <button
                    type="button"
                    className="header-button"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    title="Upload your own image"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <Upload size={16} />
                    Upload Image
                  </button>
                </div>
              </div>

              {formData.image && (
                <div className="selected-image-preview">
                  <img src={formData.image} alt="Selected" />
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startingPrice">Starting Price</label>
              <div className="price-input">
                <DollarSign size={20} className="price-icon" />
                <input
                  type="number"
                  id="startingPrice"
                  value={formData.startingPrice}
                  onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                  placeholder="0"
                  min="1"
                  step="1"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="duration">Auction Duration</label>
              <div className="duration-input">
                <Calendar size={20} className="duration-icon" />
                <select
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                >
                  <option value="1">1 Hour</option>
                  <option value="6">6 Hours</option>
                  <option value="12">12 Hours</option>
                  <option value="24">24 Hours</option>
                  <option value="48">48 Hours</option>
                  <option value="72">72 Hours</option>
                  <option value="168">7 Days</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="create-btn" disabled={loading}>
              {loading ? 'Creating...' : 'Create Auction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}