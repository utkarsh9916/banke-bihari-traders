import { useState } from "react";
import axios from 'axios'; // 👈 ADD THIS IMPORT
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPaperPlane,
  FaUser,
  FaComment,
  FaCheckCircle,
  FaExclamationCircle // 👈 ADD THIS for error icon
} from "react-icons/fa";
import { BsShop } from "react-icons/bs";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ UPDATED: Now actually sends data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log("📤 Sending data to backend:", formData);
    
    try {
      const response = await axios.post('http://localhost:5000/api/leads', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log("✅ Server response:", response.data);
      
      setFormStatus({
        submitted: true,
        success: true,
        message: response.data.message || "Thank you for contacting us! We'll get back to you soon."
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      console.error("Error details:", error.response?.data);
      
      setFormStatus({
        submitted: true,
        success: false,
        message: error.response?.data?.error || "Something went wrong. Please try again."
      });
      
    } finally {
      setLoading(false);
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ""
        });
      }, 5000);
    }
  };

  // Store locations
  const stores = [
    {
      id: 1,
      name: "Banke Bihari Traders - Darling Road",
      address: "Darling Road, Sahaswan, Budaun, UP - 243638",
      phone: "+91 8439424125",
      email: "shribankebiharitraders141@gmail.com",
      timing: "Mon-Sat: 10:00 AM - 8:00 PM",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Kavya Traders 2.0",
      address: "Darling Road, Sahaswan, Budaun, UP - 243638",
      phone: "+91 8439424125",
      email: "kavyatraders141@gmail.com",
      timing: "Mon-Sat: 10:30 AM - 8:30 PM, Sun: 11:00 AM - 5:00 PM",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Kavya Traders",
      address: "Near Tehsil Road, Sahaswan, Budaun, UP - 243638",
      phone: "+91 8439424125",
      email: "kavyatraders141@gmail.com",
      timing: "Mon-Sat: 9:30 AM - 9:00 PM, Sun: 10:00 AM - 6:00 PM",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get in <span className="text-gray-900">Touch</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Phone Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPhone className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Call Us</h3>
            <a href="tel:+918439424125" className="text-gray-600 hover:text-yellow-600 transition-colors">
              +91 84394 24125
            </a>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Us</h3>
            <a href="mailto:shribankebiharitraders141@gmail.com" className="text-gray-600 hover:text-yellow-600 transition-colors break-all">
              shribankebiharitraders141@gmail.com
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaWhatsapp className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">WhatsApp</h3>
            <a 
              href="https://wa.me/918439424125" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              +91 84394 24125
            </a>
          </div>

          {/* Visit Us Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaMapMarkerAlt className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Visit Us</h3>
            <p className="text-gray-600">
              Darling Road, Sahaswan<br />
              Budaun, UP - 243638
            </p>
          </div>
        </div>

        {/* Contact Form & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h2>
            <p className="text-gray-500 mb-6">We'll get back to you within 24 hours</p>

            {/* Status Message - Updated to show both success and error */}
            {formStatus.submitted && (
              <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                formStatus.success 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                {formStatus.success ? (
                  <FaCheckCircle className="text-green-500 text-xl" />
                ) : (
                  <FaExclamationCircle className="text-red-500 text-xl" />
                )}
                <p className={formStatus.success ? 'text-green-700' : 'text-red-700'}>
                  {formStatus.message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                  placeholder="How can we help you?"
                />
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <div className="relative">
                  <FaComment className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all resize-none"
                    placeholder="Tell us about your query..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map Section - Keep as is */}
          <div className="space-y-6">
            {/* Google Maps */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[400px]">
              <iframe
                title="Shri Banke Bihari Traders Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3520.4627968638015!2d78.75276017406911!3d28.0714229093424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39752f89c303e977%3A0xa1bfd5fcd152bbc8!2sShri%20Banke%20Bihari%20Traders!5e0!3m2!1sen!2sin!4v1773752593188!5m2!1sen!2sin"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaClock className="text-yellow-500" />
                Business Hours
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Monday - Saturday</span>
                  <span className="font-medium">10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Sunday</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm mt-2 pt-2 border-t border-gray-100">
                  <span>Customer Support</span>
                  <span className="text-green-600">24/7 Available</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-yellow-500 hover:text-white transition-all hover:scale-110"
                >
                  <FaFacebookF className="text-xl" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-yellow-500 hover:text-white transition-all hover:scale-110"
                >
                  <FaTwitter className="text-xl" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-yellow-500 hover:text-white transition-all hover:scale-110"
                >
                  <FaInstagram className="text-xl" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-yellow-500 hover:text-white transition-all hover:scale-110"
                >
                  <FaYoutube className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Store Locations */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Our <span className="text-yellow-500">Stores</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Come visit us at any of our 3 locations in Sahaswan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stores.map((store) => (
              <div key={store.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={store.image} 
                    alt={store.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 mb-2">{store.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <FaMapMarkerAlt className="text-yellow-500 mt-1 flex-shrink-0" />
                      <span>{store.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-yellow-500 flex-shrink-0" />
                      <a href={`tel:${store.phone}`} className="hover:text-yellow-600">
                        {store.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-yellow-500 flex-shrink-0" />
                      <span className="text-xs">{store.timing}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact