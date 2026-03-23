import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { FaArrowLeft, FaStar, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaEnvelope, FaDirections } from "react-icons/fa"

function StoreDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [store, setStore] = useState(null)
  const [loading, setLoading] = useState(true)

  // Store Data - Same as in your Stores.jsx
  const storesData = [
    {
      id: 1,
      name: "Banke Bihari Traders - Darling Road",
      address: "Darling Road, Sahaswan, Budaun, UP - 243638",
      phone: "+91 8439424125",
      whatsapp: "918439424125",
      email: "shribankebiharitraders141@gmail.com",
      coordinates: { lat: 28.0836, lng: 78.9836 },
      services: ["fans", "coolers", "ac", "kitchen", "lighting"],
      rating: 4.8,
      reviews: 1245,
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&h=400&fit=crop",
      timing: {
        monday: "10:00 AM - 8:00 PM",
        sunday: "Closed"
      }
    },
    {
      id: 2,
      name: "Kavya Traders 2.0",
      address: "Darling Road, Sahaswan, Budaun, UP - 243638",
      phone: "+91 8439424125",
      whatsapp: "918439424125",
      email: "kavyatraders141@gmail.com",
      coordinates: { lat: 28.0845, lng: 78.9842 },
      services: ["fans", "coolers", "ac", "kitchen", "lighting", "laptops", "tvs"],
      rating: 4.7,
      reviews: 982,
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=400&fit=crop",
      timing: {
        monday: "10:30 AM - 8:30 PM",
        sunday: "11:00 AM - 5:00 PM"
      }
    },
    {
      id: 3,
      name: "Kavya Traders",
      address: "Near Tehsil Road, Sahaswan, Budaun, UP - 243638",
      phone: "+91 8439424125",
      whatsapp: "918439424125",
      email: "kavyatraders141@gmail.com",
      coordinates: { lat: 28.0828, lng: 78.9850 },
      services: ["fans", "coolers", "ac", "kitchen", "lighting", "mobile"],
      rating: 4.9,
      reviews: 1567,
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&h=400&fit=crop",
      timing: {
        monday: "9:30 AM - 9:00 PM",
        sunday: "10:00 AM - 6:00 PM"
      }
    }
  ]

  useEffect(() => {
    // Find store by ID
    const foundStore = storesData.find(s => s.id === parseInt(id))
    if (foundStore) {
      setStore(foundStore)
    }
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading store details...</p>
        </div>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Store Not Found</h2>
          <p className="text-gray-600 mb-6">The store you're looking for doesn't exist.</p>
          <Link to="/stores" className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600">
            Back to Stores
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 mb-6"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        {/* Store Details Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Store Image */}
          <div className="relative h-64 md:h-80">
            <img
              src={store.image}
              alt={store.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {/* Store Name Overlay */}
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{store.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span>{store.rating}</span>
                  <span className="text-gray-300">({store.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Store Info */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Address</h3>
                  <div className="flex items-start gap-2 text-gray-600">
                    <FaMapMarkerAlt className="text-yellow-500 mt-1" />
                    <p>{store.address}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Contact</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaPhone className="text-yellow-500" />
                      <a href={`tel:${store.phone}`} className="hover:text-yellow-600">
                        {store.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaWhatsapp className="text-green-500" />
                      <a href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
                        WhatsApp
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaEnvelope className="text-yellow-500" />
                      <a href={`mailto:${store.email}`} className="hover:text-yellow-600">
                        {store.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Store Hours</h3>
                  <div className="space-y-1">
                    <p className="text-gray-600">Monday - Saturday: {store.timing.monday}</p>
                    <p className="text-gray-600">Sunday: {store.timing.sunday}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {store.services.map((service, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-yellow-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-yellow-600 transition-all"
              >
                <FaDirections className="inline mr-2" />
                Get Directions
              </a>
              <Link
                to="/stores"
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-center hover:bg-gray-300 transition-all"
              >
                Back to Stores
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreDetails