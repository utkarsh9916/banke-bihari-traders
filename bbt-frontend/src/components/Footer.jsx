import { Link } from "react-router-dom"
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaGooglePay,
  FaApplePay,
  FaArrowRight
} from "react-icons/fa"
import { BsShop } from "react-icons/bs"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <BsShop className="text-gray-900 text-xl" />
              </div>
              <span className="text-xl font-bold"> Shri Banke Bihari <span className="text-yellow-500">Traders</span></span>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for premium home appliances and electronics since 2010. Quality products, best prices, and exceptional service.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-yellow-500"></span>
            </h3>
            
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "AboutUs", path: "/aboutUs" },
                { name: "Stores", path: "/stores" },
                { name: "Wholesale", path: "/wholesale" },
                { name: "Gallery", path: "/gallery" },
                { name: "Contact", path: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-yellow-500 transition-colors flex items-center gap-2 group"
                  >
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-yellow-500"></span>
            </h3>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-yellow-500 mt-1 flex-shrink-0" />
                <span>Darling Road, Sahaswan, Budaun, UP - 243638</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaPhone className="text-yellow-500 flex-shrink-0" />
                <a href="tel:+918439424125" className="hover:text-yellow-500 transition-colors">
                  +91 84394 24125
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="text-yellow-500 flex-shrink-0" />
                <a href="mailto:shribankebiharitraders141@gmail.com" className="hover:text-yellow-500 transition-colors">
                  shribankebiharitraders141@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaClock className="text-yellow-500 flex-shrink-0" />
                <span>Mon-Sat: 10:00 AM - 8:00 PM</span>
              </li>
            </ul>

            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/918439424125" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all hover:scale-105 mt-2"
            >
              <FaWhatsapp />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold relative inline-block">
              Newsletter
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-yellow-500"></span>
            </h3>
            
            <p className="text-gray-400 text-sm">
              Subscribe to get updates on new products and special offers
            </p>
            
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-500 text-gray-900 p-2 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  <FaArrowRight />
                </button>
              </div>
            </form>

            {/* Payment Methods */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">We Accept</h4>
              <div className="flex flex-wrap gap-2">
                <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-gray-400 text-xs hover:text-yellow-500 transition-colors">Visa</div>
                <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-gray-400 text-xs hover:text-yellow-500 transition-colors">MC</div>
                <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-gray-400 text-xs hover:text-yellow-500 transition-colors">Amex</div>
                <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-gray-400 text-xs hover:text-yellow-500 transition-colors">PayPal</div>
                <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-gray-400 text-xs hover:text-yellow-500 transition-colors">G Pay</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Banke Bihari Traders. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Shipping Policy
              </Link>
            </div>

            {/* Made with love */}
            <p className="text-gray-500 text-sm">
              Made with ❤️ in Sahaswan
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer