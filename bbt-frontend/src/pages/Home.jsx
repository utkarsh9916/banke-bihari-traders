import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
// import Header from "../components/Header"
import Footer from "../components/Footer"
import Categories from "../components/Categories"
import StoreCard from "../components/StoreCard"  // ✅ Correct import
import banner1 from "../assets/banner1.png"
import banner2 from "../assets/banner2.png"
import banner3 from "../assets/banner3.png"
import kt2 from "../assets/kt2.jpeg"


// Icons
import { 
  FaArrowRight, FaStar, FaTruck, FaShieldAlt, FaHeadset,
  FaMoneyBillWave, FaCreditCard
} from "react-icons/fa"
import { BsFan } from "react-icons/bs"
import { GiLightBulb } from "react-icons/gi"
import { MdOutlineKitchen } from "react-icons/md"
import { TbWindmill } from "react-icons/tb"

function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [likedStores, setLikedStores] = useState([])
  const [bookmarkedStores, setBookmarkedStores] = useState([])

  // STORES DATA - UPDATED with actual stores from Stores.jsx
  const featuredStores = [
    {
      id: 1,
      name: "Banke Bihari Traders ",
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
        sunday: "Closed"
      },
      rating: 4.8,
      reviews: 1245,
      manager: "Mr. Utkarsh Maheshwari",
      established: "2010",
      image: kt2,
      features: ["Free Parking", "Wheelchair Accessible", "Free WiFi", "ATM"]
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
        sunday: "11:00 AM - 5:00 PM"
      },
      rating: 4.7,
      reviews: 982,
      manager: "Mr. Utkarsh Maheshwari",
      established: "2025",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=400&fit=crop",
      features: ["Free Parking", "Wheelchair Accessible", "Free WiFi", "ATM"]
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
        sunday: "10:00 AM - 6:00 PM"
      },
      rating: 4.9,
      reviews: 1567,
      manager: "Mr. Utkarsh Maheshwari",
      established: "2010",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&h=400&fit=crop",
      features: ["Free Parking", "Wheelchair Accessible", "Free WiFi", "Coffee Shop", "ATM"]
    }
  ]

  // Sab banners same size ke liye
  const banners = [
    {
      url: banner1,
      title: "Premium Home Appliances",
      subtitle: "Energy efficient & stylish"
    },
    {
      url: banner2,
      title: "Beat the Heat with the Best AC Deals",
      subtitle: "Your Comfort, Our Cooling"
    },
    {
      url: banner3,
      title: "Latest Smartphones",
      subtitle: "One Device, Endless Possibilities"
    }
  ]

  // Auto banner rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Categories with icons (for banner pills only)
  const categories = [
    { name: "Fans", icon: <TbWindmill className="text-2xl" />, color: "from-blue-500 to-blue-600" },
    { name: "Coolers", icon: <BsFan className="text-2xl" />, color: "from-cyan-500 to-cyan-600" },
    { name: "Lighting", icon: <GiLightBulb className="text-2xl" />, color: "from-yellow-500 to-yellow-600" },
    { name: "Kitchen", icon: <MdOutlineKitchen className="text-2xl" />, color: "from-orange-500 to-orange-600" }
  ]

  // Toggle like
  const toggleLike = (storeId) => {
    if (likedStores.includes(storeId)) {
      setLikedStores(likedStores.filter(id => id !== storeId))
    } else {
      setLikedStores([...likedStores, storeId])
    }
  }

  // Toggle bookmark
  const toggleBookmark = (storeId) => {
    if (bookmarkedStores.includes(storeId)) {
      setBookmarkedStores(bookmarkedStores.filter(id => id !== storeId))
    } else {
      setBookmarkedStores([...bookmarkedStores, storeId])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* HEADER COMPONENT */}
      {/* <Header /> */}

      {/* ===== HERO SECTION with BANNER ===== */}
      <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
        {/* Banner Images */}
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentBanner ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={banner.url}
              alt={banner.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            
            {/* Banner Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 text-white">
                <div className="max-w-2xl">
                  <span className="inline-block bg-yellow-500 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    New Arrivals
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
                    {banner.title}
                  </h2>
                  <p className="text-xl text-gray-200 mb-6">{banner.subtitle}</p>
                  
                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {categories.map((cat, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 bg-gradient-to-r ${cat.color} px-4 py-2 rounded-full text-white shadow-lg`}
                      >
                        {cat.icon}
                        <span className="font-medium">{cat.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/aboutUs
                      
                      
                      
                      
                      "
                      className="group flex items-center gap-2 bg-yellow-500 text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all hover:scale-105 shadow-xl"
                    >
                      Explore Products
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/wholesale"
                      className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all"
                    >
                      Wholesale Inquiry
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Banner Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentBanner
                  ? "w-8 bg-yellow-500"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ===== CATEGORIES SECTION ===== */}
      <Categories />

      

      {/* ===== FEATURES SECTION ===== */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Premium Quality */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <FaStar className="text-yellow-600 text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Premium Quality</h3>
              <p className="text-sm text-gray-500">100% genuine products</p>
            </div>
          </div>

          {/* CASH ON DELIVERY */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <FaMoneyBillWave className="text-yellow-600 text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Cash on Delivery</h3>
              <p className="text-sm text-gray-500">Pay when you receive</p>
            </div>
          </div>

          {/* EMI AVAILABLE */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <FaCreditCard className="text-yellow-600 text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">EMI Available</h3>
              <p className="text-sm text-gray-500">No cost EMI options</p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <FaHeadset className="text-yellow-600 text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">24/7 Support</h3>
              <p className="text-sm text-gray-500">Call or WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
      {/* ===== FEATURED STORES SECTION ===== */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-600 rounded-full text-sm font-semibold mb-4">
              ✦ VISIT US ✦
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-yellow-500">Stores</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Visit our stores in Sahaswan for the best shopping experience
            </p>
          </div>

          {/* Stores Grid - USING StoreCard COMPONENT with UPDATED DATA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onSelect={(store) => console.log("Selected:", store.name)}
                isLiked={likedStores.includes(store.id)}
                isBookmarked={bookmarkedStores.includes(store.id)}
                onLike={toggleLike}
                onBookmark={toggleBookmark}
                showDistance={false}
                onFocus={(store) => console.log("Focus on map:", store.name)}
              />
            ))}
          </div>

          {/* View All Stores Button */}
          <div className="text-center mt-10">
            <Link
              to="/stores"
              className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <span>View All Stores</span>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      <footer/>
    </div>
  )
}

export default HomePage