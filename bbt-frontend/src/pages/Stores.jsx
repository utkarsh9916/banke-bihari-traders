import kt2 from "../assets/kt2.jpeg"
import sbbt from "../assets/sbbt.jpeg"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import StoreCard from "../components/StoreCard"
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { 
  FaSearch, FaFilter, FaMapMarkerAlt, FaDirections, 
  FaWhatsapp, FaEnvelope, FaClock, FaStar, FaList,
  FaMap, FaTimes, FaLocationArrow
} from "react-icons/fa"

// Google Maps container style
const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '1rem'
}

// Default center (Sahaswan, Budaun)
const defaultCenter = {
  lat: 28.0836,
  lng: 78.9836
}

// Map options
const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  mapTypeControl: true,
  fullscreenControl: true
}

function Stores() {
  const [selectedStore, setSelectedStore] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState("all")
  const [selectedService, setSelectedService] = useState("all")
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [viewMode, setViewMode] = useState("grid") // "grid", "map"
  const [likedStores, setLikedStores] = useState([])
  const [bookmarkedStores, setBookmarkedStores] = useState([])
  const [userLocation, setUserLocation] = useState(null)
  const [distance, setDistance] = useState({})
  const [sortBy, setSortBy] = useState("nearest")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
  const [showFilters, setShowFilters] = useState(false)
  const [ratingFilter, setRatingFilter] = useState(0)
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [mapCenter, setMapCenter] = useState(defaultCenter)
  const [mapZoom, setMapZoom] = useState(12)
  const [selectedMarker, setSelectedMarker] = useState(null)

  // Store Data - 3 stores with complete details
  const stores = [
    {
      id: 1,
      name: "Banke Bihari Traders - Darling Road",
      shortName: "BBT",
      address: "Darling Road, Sahaswan, Budaun, UP - 243638",
      phone: "+91 8439424125",
      whatsapp: "918439424125",
      email: "shribankebiharitraders141@gmail.com",
      city: "Sahaswan",
      area: "Darling Road",
      pincode: "243638",
      coordinates: { lat: 28.0836, lng: 78.9836 },
      services: ["fans", "coolers", "ac", "kitchen", "lighting"],
      timing: {
        monday: "10:00 AM - 8:00 PM",
        tuesday: "10:00 AM - 8:00 PM",
        wednesday: "10:00 AM - 8:00 PM",
        thursday: "10:00 AM - 8:00 PM",
        friday: "10:00 AM - 8:00 PM",
        saturday: "10:00 AM - 8:00 PM",
        sunday: "Closed"
      },
      rating: 4.8,
      reviews: 1245,
      manager: "Mr. Utkarsh Maheshwari",
      established: "2010",
      image: sbbt,
      features: ["Free Parking", "Wheelchair Accessible", "Free WiFi", "ATM"],
      offers: [
        { id: 1, title: "Summer Sale", discount: "20% off" }
      ]
    },
    {
      id: 2,
      name: "Kavya Traders 2.0",
      shortName: "KT2",
      address: "Darling Road, Sahaswan, Budaun, UP - 243638",
      phone: "+91 8439424125",
      whatsapp: "918439424125",
      email: "kavyatraders141@gmail.com",
      city: "Sahaswan",
      area: "Darling Road",
      pincode: "243638",
      coordinates: { lat: 28.0845, lng: 78.9842 },
      services: ["fans", "coolers", "ac", "kitchen", "lighting", "laptops", "tvs"],
      timing: {
        monday: "10:30 AM - 8:30 PM",
        tuesday: "10:30 AM - 8:30 PM",
        wednesday: "10:30 AM - 8:30 PM",
        thursday: "10:30 AM - 8:30 PM",
        friday: "10:30 AM - 8:30 PM",
        saturday: "10:30 AM - 8:30 PM",
        sunday: "11:00 AM - 5:00 PM"
      },
      rating: 4.7,
      reviews: 982,
      manager: "Mr. Utkarsh Maheshwari",
      established: "2025",
      image: kt2,
      features: ["Free Parking", "Wheelchair Accessible", "Free WiFi", "ATM"],
      offers: [
        { id: 1, title: "Weekend Special", discount: "15% off" }
      ]
    },
    {
      id: 3,
      name: "Kavya Traders",
      shortName: "KT",
      address: "Near Tehsil Road, Sahaswan, Budaun, UP - 243638",
      phone: "+91 8439424125",
      whatsapp: "918439424125",
      email: "kavyatraders141@gmail.com",
      city: "Sahaswan",
      area: "Tehsil Road",
      pincode: "243638",
      coordinates: { lat: 28.0828, lng: 78.9850 },
      services: ["fans", "coolers", "ac", "kitchen", "lighting", "mobile"],
      timing: {
        monday: "9:30 AM - 9:00 PM",
        tuesday: "9:30 AM - 9:00 PM",
        wednesday: "9:30 AM - 9:00 PM",
        thursday: "9:30 AM - 9:00 PM",
        friday: "9:30 AM - 9:00 PM",
        saturday: "9:30 AM - 9:00 PM",
        sunday: "10:00 AM - 6:00 PM"
      },
      rating: 4.9,
      reviews: 1567,
      manager: "Mr. Utkarsh Maheshwari",
      established: "2010",
      image: kt2,
      features: ["Free Parking", "Wheelchair Accessible", "Free WiFi", "Coffee Shop", "ATM"],
      offers: [
        { id: 1, title: "New Store Offer", discount: "25% off" }
      ]
    }
  ]

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setUserLocation(userPos)
          setMapCenter(userPos)
        },
        (error) => {
          console.log("Location permission denied")
        }
      )
    }
  }, [])

  // Calculate distance
  useEffect(() => {
    if (userLocation) {
      const newDistances = {}
      stores.forEach(store => {
        const dist = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          store.coordinates.lat,
          store.coordinates.lng
        )
        newDistances[store.id] = dist
      })
      setDistance(newDistances)
    }
  }, [userLocation])

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const d = R * c
    return d.toFixed(1)
  }

  const deg2rad = (deg) => {
    return deg * (Math.PI/180)
  }

  // Filter stores
  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCity = selectedCity === "all" || store.city === selectedCity
    const matchesService = selectedService === "all" || store.services.includes(selectedService)
    return matchesSearch && matchesCity && matchesService
  })

  // Sort stores
  const sortedStores = [...filteredStores].sort((a, b) => {
    if (sortBy === "nearest" && userLocation) {
      return distance[a.id] - distance[b.id]
    } else if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "reviews") {
      return b.reviews - a.reviews
    }
    return 0
  })

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentStores = sortedStores.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(sortedStores.length / itemsPerPage)

  // Get directions URL
  const getDirectionsUrl = (store) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`
  }

  const toggleLike = (storeId) => {
    if (likedStores.includes(storeId)) {
      setLikedStores(likedStores.filter(id => id !== storeId))
    } else {
      setLikedStores([...likedStores, storeId])
    }
  }

  const toggleBookmark = (storeId) => {
    if (bookmarkedStores.includes(storeId)) {
      setBookmarkedStores(bookmarkedStores.filter(id => id !== storeId))
    } else {
      setBookmarkedStores([...bookmarkedStores, storeId])
    }
  }

  // FIXED: Focus on store on map
  const focusOnStore = (store) => {
    console.log("🔵 focusOnStore called for:", store.name);
    
    // Switch to map view
    setViewMode("map");
    console.log("✅ ViewMode set to map");
    
    // Update map settings
    setMapCenter(store.coordinates);
    setMapZoom(16);
    setSelectedMarker(store);
    
    console.log("📍 Map center set to:", store.coordinates);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-600 rounded-full text-sm font-semibold mb-4">
            ✦ FIND US NEAR YOU ✦
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-yellow-500">Store Locations</span>
          </h1>
          <p className="text-lg text-gray-500">Visit our stores in Sahaswan for the best shopping experience</p>
        </div>

        {/* Search and View Toggle */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search stores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === "grid" ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="Grid View"
              >
                <FaMapMarkerAlt />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === "map" ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="Map View"
              >
                <FaMap />
              </button>
            </div>
          </div>
        </div>

        {/* Map View */}
        {viewMode === "map" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={mapZoom}
                options={mapOptions}
              >
                {/* User Location Marker */}
                {userLocation && (
                  <Marker
                    position={userLocation}
                    icon={{
                      url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                      scaledSize: { width: 40, height: 40 }
                    }}
                  />
                )}

                {/* Store Markers */}
                {filteredStores.map((store) => (
                  <Marker
                    key={store.id}
                    position={store.coordinates}
                    onClick={() => setSelectedMarker(store)}
                    icon={{
                      url: selectedMarker?.id === store.id 
                        ? "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                        : "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                      scaledSize: { width: 40, height: 40 }
                    }}
                  />
                ))}

                {/* Info Window for Selected Store */}
                {selectedMarker && (
                  <InfoWindow
                    position={selectedMarker.coordinates}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div className="p-2 max-w-xs">
                      <h3 className="font-bold text-gray-800 mb-1">{selectedMarker.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{selectedMarker.address}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <FaStar className="text-yellow-500 text-sm" />
                        <span className="text-sm font-medium">{selectedMarker.rating}</span>
                        <span className="text-xs text-gray-400">({selectedMarker.reviews} reviews)</span>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={getDirectionsUrl(selectedMarker)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-yellow-500 text-white text-sm py-2 rounded-lg text-center hover:bg-yellow-600"
                        >
                          Directions
                        </a>
                        <a
                          href={`tel:${selectedMarker.phone}`}
                          className="flex-1 bg-gray-100 text-gray-700 text-sm py-2 rounded-lg text-center hover:bg-gray-200"
                        >
                          Call
                        </a>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>

            {/* Store List Below Map */}
            <div className="p-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-4">Stores Near You</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredStores.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => focusOnStore(store)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedMarker?.id === store.id
                        ? 'bg-yellow-50 border-2 border-yellow-500'
                        : 'bg-gray-50 border border-gray-200 hover:border-yellow-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{store.shortName}</h4>
                        <p className="text-sm text-gray-500 mt-1">{store.address.substring(0, 30)}...</p>
                      </div>
                      {userLocation && (
                        <span className="text-sm text-green-600 font-medium">
                          {distance[store.id]} km
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <FaStar className="text-yellow-500 text-xs" />
                      <span className="text-xs font-medium">{store.rating}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentStores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onSelect={setSelectedStore}
                  isLiked={likedStores.includes(store.id)}
                  isBookmarked={bookmarkedStores.includes(store.id)}
                  onLike={toggleLike}
                  onBookmark={toggleBookmark}
                  showDistance={!!userLocation}
                  distance={distance[store.id]}
                  onFocus={focusOnStore}  // 👈 THIS IS CRITICAL
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      currentPage === index + 1
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Stores