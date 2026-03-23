import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import logo from "../assets/logo.png"

// Icons
import { 
  FaPhone, FaWhatsapp, FaUser, FaBars, FaTimes, FaSignOutAlt
} from "react-icons/fa"
import { BsCloudSun } from "react-icons/bs"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Check login status on load
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setIsLoggedIn(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  // Time update
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)
      
      const day = now.getDate().toString().padStart(2, '0')
      const month = (now.getMonth() + 1).toString().padStart(2, '0')
      const year = now.getFullYear()
      setCurrentDate(`${day}-${month}-${year}`)
    }
    updateDateTime()
    const timer = setInterval(updateDateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUser(null)
    navigate('/')
  }

  return (
    <header className="font-['Poppins']">
      {/* ===== TOP BAR with Weather & Time ===== */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 text-xs sm:text-sm">
            {/* Weather */}
            <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1 rounded-full">
              <BsCloudSun className="text-yellow-400 text-sm sm:text-base" />
              <span className="font-medium">25°C</span>
              <span className="text-gray-400 hidden xs:inline">|</span>
              <span className="hidden xs:inline text-gray-300">Partly</span>
            </div>
            
            {/* Language */}
            <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1 rounded-full">
              <span className="font-medium">ENG</span>
              <span className="text-gray-400">/</span>
              <span className="font-medium text-yellow-400">IN</span>
            </div>
            
            {/* Time & Date */}
            <div className="hidden sm:flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1 rounded-full">
              <span className="font-mono text-xs">{currentTime}</span>
              <span className="text-gray-400 hidden md:inline">|</span>
              <span className="font-mono text-xs hidden md:inline">{currentDate}</span>
            </div>

            {/* Show logged in user (mobile) */}
            {isLoggedIn && (
              <div className="flex items-center gap-2 sm:hidden">
                <span className="text-yellow-400 text-xs">Hi, {user?.name?.split(' ')[0]}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== MAIN NAVIGATION ===== */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-2 sm:py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center mr-8 lg:mr-12">
              <img
                src={logo}
                alt="Banke Bihari Traders"
                className="h-10 sm:h-12 md:h-14 object-contain"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1">
              {["HOME", "ABOUT US", "STORES", "WHOLESALE", "GALLERY", "CONTACT"].map((item) => {
                let path;
                if (item === "HOME") path = "/";
                else if (item === "ABOUT US") path = "/aboutus";
                else path = `/${item.toLowerCase()}`;
                
                return (
                  <Link
                    key={item}
                    to={path}
                    className="text-sm xl:text-base font-semibold text-gray-600 hover:text-yellow-500 transition-colors relative group whitespace-nowrap"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              
              {/* Show user name if logged in */}
              {isLoggedIn && (
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <span className="hidden sm:inline">Hi,</span>
                  <span className="font-semibold text-yellow-600 text-sm">{user?.name?.split(' ')[0]}</span>
                </span>
              )}
              
              {/* LOGIN / LOGOUT BUTTONS */}
              {isLoggedIn ? (
                <>
                  {/* Admin badge */}
                  {user?.role === 'admin' && (
                    <span className="hidden lg:block text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-500 transition-colors p-1 flex items-center gap-1"
                    title="Logout"
                  >
                    <FaSignOutAlt className="text-base sm:text-lg" />
                    <span className="hidden lg:inline text-xs">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  {/* Login Icon */}
                  <Link 
                    to="/login" 
                    className="text-gray-600 hover:text-yellow-500 transition-colors p-1"
                    title="Login / Sign Up"
                  >
                    <FaUser className="text-base sm:text-lg" />
                  </Link>
                  
                  {/* Signup Link */}
                  <Link 
                    to="/signup" 
                    className="hidden sm:block text-xs sm:text-sm font-semibold text-yellow-600 hover:text-yellow-700 transition-colors whitespace-nowrap"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              
              {/* Call Button */}
              <a 
                href="tel:+918439424125" 
                className="text-gray-600 hover:text-yellow-500 transition-colors p-1 flex items-center gap-1"
                title="Call us"
              >
                <FaPhone className="text-sm sm:text-base" />
                <span className="hidden lg:inline text-xs">Call</span>
              </a>
              
              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/918439424125?text=Hi%20Banke%20Bihari%20Traders%2C%20I%20have%20a%20query." 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 sm:gap-2 bg-green-500 hover:bg-green-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                title="Chat on WhatsApp"
              >
                <FaWhatsapp className="text-sm sm:text-base" />
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">WhatsApp</span>
              </a>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden text-xl sm:text-2xl text-gray-600 hover:text-yellow-500 transition-colors p-1"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-4 shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-3">
              
              {/* Mobile User Info */}
              {isLoggedIn && (
                <div className="bg-yellow-50 p-3 rounded-lg mb-2">
                  <p className="font-semibold text-gray-800 text-sm">Hi, {user?.name}</p>
                  {user?.role === 'admin' && (
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full inline-block mt-1">Admin</span>
                  )}
                </div>
              )}

              {/* Mobile Navigation Links */}
              <div className="grid grid-cols-2 gap-2">
                {["HOME", "ABOUT US", "STORES", "WHOLESALE", "GALLERY", "CONTACT"].map((item) => {
                  let path;
                  if (item === "HOME") path = "/";
                  else if (item === "ABOUT US") path = "/aboutus";
                  else path = `/${item.toLowerCase()}`;
                  
                  return (
                    <Link
                      key={item}
                      to={path}
                      className="py-2 px-3 text-center text-sm text-gray-600 hover:text-yellow-500 hover:bg-yellow-50 font-medium rounded-lg transition-all"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-200">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={handleLogout}
                      className="col-span-2 flex items-center justify-center gap-2 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-2 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaUser className="text-sm" /> Login
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center justify-center gap-2 py-2 text-sm text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
                <a 
                  href="tel:+918439424125" 
                  className="flex items-center justify-center gap-2 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <FaPhone className="text-sm" /> Call
                </a>
                <a 
                  href="https://wa.me/918439424125?text=Hi%20Banke%20Bihari%20Traders%2C%20I%20have%20a%20query." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaWhatsapp className="text-sm" /> WhatsApp
                </a>
              </div>

              {/* Mobile Weather & Time */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <BsCloudSun className="text-yellow-500 text-sm" />
                  <span>25°C</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>ENG/IN</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-mono text-xs">{currentTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-mono text-xs">{currentDate}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header