import { useNavigate } from "react-router-dom";
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaStar, 
  FaHeart, 
  FaRegHeart, 
  FaBookmark, 
  FaRegBookmark,
  FaMap
} from "react-icons/fa"

function StoreCard({ store, onSelect, isLiked, isBookmarked, onLike, onBookmark, showDistance, distance, onFocus }) {
  
  const navigate = useNavigate();
  
  // Safety check - if store is not provided, don't render
  if (!store) {
    return null;
  }

  // Function to handle view details click
  const handleViewDetails = (e) => {
    e.stopPropagation();
    console.log("📋 View Details clicked for:", store.name);
    navigate(`/store/${store.id}`);
  };

  // Function to handle view on map click
  const handleViewOnMap = (e) => {
    e.stopPropagation();
    console.log("🗺️ View on Map clicked for:", store.name);
    
    if (onFocus) {
      console.log("✅ Calling onFocus function");
      onFocus(store);
    } else {
      console.log("⚠️ onFocus not provided, using fallback");
      // Fallback - open Google Maps directly
      const url = `https://www.google.com/maps/dir/?api=1&destination=${store.coordinates?.lat || 28.0836},${store.coordinates?.lng || 78.9836}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer group border border-gray-100"
      onClick={() => onSelect && onSelect(store)}
    >
      {/* Store Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        {store.image ? (
          <img
            src={store.image}
            alt={store.name || "Store"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/600x400/cccccc/969696?text=Store+Image";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-gray-600">No Image</span>
          </div>
        )}
        
        {/* Rating Badge - Only show if rating exists */}
        {store.rating && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
            <FaStar className="text-xs" />
            <span>{store.rating}</span>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-4 left-4 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onLike) onLike(store.id);
            }}
            className="p-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/40 transition-all shadow-lg"
            aria-label="Like store"
          >
            {isLiked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-white" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onBookmark) onBookmark(store.id);
            }}
            className="p-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/40 transition-all shadow-lg"
            aria-label="Bookmark store"
          >
            {isBookmarked ? (
              <FaBookmark className="text-yellow-500" />
            ) : (
              <FaRegBookmark className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Store Details */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">{store.name || "Store Name"}</h3>
          {showDistance && distance && (
            <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
              {distance} km
            </span>
          )}
        </div>
        
        <div className="space-y-3 mb-4">
          {store.address && (
            <div className="flex items-start gap-3 text-gray-500">
              <FaMapMarkerAlt className="text-yellow-500 mt-1 flex-shrink-0" />
              <p className="text-sm">{store.address}</p>
            </div>
          )}
          
          {store.phone && (
            <div className="flex items-center gap-3 text-gray-500">
              <FaPhone className="text-yellow-500 flex-shrink-0" />
              <a href={`tel:${store.phone}`} className="text-sm hover:text-yellow-600 transition-colors">
                {store.phone}
              </a>
            </div>
          )}
        </div>

        {/* Services Tags - Only show if services exist */}
        {store.services && store.services.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {store.services.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
              >
                {service}
              </span>
            ))}
            {store.services.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                +{store.services.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Buttons */}
        <button 
          className="w-full bg-yellow-500 text-white py-2 rounded-xl font-semibold hover:bg-yellow-600 transition-all shadow-md hover:shadow-lg"
          onClick={handleViewDetails}
        >
          View Store Details
        </button>
        
        <button
          onClick={handleViewOnMap}
          className="w-full mt-2 bg-gray-100 text-gray-700 py-2 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <FaMap className="text-sm" />
          View on Map
        </button>
      </div>
    </div>
  )
}

export default StoreCard