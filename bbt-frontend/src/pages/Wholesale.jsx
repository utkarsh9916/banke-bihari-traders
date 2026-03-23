import { useState } from "react";
import axios from 'axios';
import { 
  FaBuilding, 
  FaUserTie, 
  FaEnvelope, 
  FaPhone, 
  FaFileInvoice,
  FaBoxes,
  FaCalendarAlt,
  FaWhatsapp,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowRight,
  FaPercent,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaClock,
  FaDownload,
  FaUpload,
  FaStar,
  FaAward,
  FaChartLine,
  FaIndustry,
  FaShoppingCart,
  FaEllipsisH
} from "react-icons/fa";
import { BsShop, BsTruckFlatbed, BsGraphUp } from "react-icons/bs";
import { MdBusinessCenter, MdVerified, MdSupportAgent } from "react-icons/md";

function Wholesale() {
  const [formData, setFormData] = useState({
    // Business Details
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    gstNumber: "",
    businessType: "retailer",
    yearsInBusiness: "",
    
    // Address
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    
    // Order Details
    products: "",
    estimatedQuantity: "",
    preferredTimeline: "",
    monthlyRequirement: "",
    additionalNotes: "",
    
    // Agreement
    agreeTerms: false
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const businessTypes = [
    { value: "retailer", label: "Retailer", icon: <FaBuilding /> },
    { value: "distributor", label: "Distributor", icon: <BsTruckFlatbed /> },
    { value: "manufacturer", label: "Manufacturer", icon: <FaIndustry /> },
    { value: "wholesaler", label: "Wholesaler", icon: <BsShop /> },
    { value: "ecommerce", label: "E-commerce Seller", icon: <FaShoppingCart /> },
    { value: "other", label: "Other", icon: <FaEllipsisH /> }
  ];

  const timelineOptions = [
    { value: "immediate", label: "🚀 Immediate (Within 1 week)", days: "7" },
    { value: "urgent", label: "⚡ Urgent (1-2 weeks)", days: "14" },
    { value: "normal", label: "📦 Normal (2-4 weeks)", days: "28" },
    { value: "flexible", label: "🔄 Flexible (1-2 months)", days: "60" },
    { value: "future", label: "📅 Future Planning", days: "90+" }
  ];

  const monthlyRequirementOptions = [
    { value: "less-than-50k", label: "Less than ₹50,000" },
    { value: "50k-1lac", label: "₹50,000 - ₹1,00,000" },
    { value: "1lac-5lac", label: "₹1,00,000 - ₹5,00,000" },
    { value: "5lac-10lac", label: "₹5,00,000 - ₹10,00,000" },
    { value: "more-than-10lac", label: "More than ₹10,00,000" }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }
    setUploadedFile(file);
  };

  const validateStep = (step) => {
    switch(step) {
      case 1:
        return formData.businessName && formData.ownerName && formData.email && formData.phone;
      case 2:
        return formData.address && formData.city && formData.state && formData.pincode;
      case 3:
        return formData.products && formData.estimatedQuantity && formData.preferredTimeline;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    } else {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Please fill all required fields in this section"
      });
      setTimeout(() => setFormStatus({ submitted: false, success: false, message: "" }), 3000);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log("📤 Submitting wholesale inquiry:", formData);
    
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      if (uploadedFile) {
        formDataToSend.append('document', uploadedFile);
      }

      const response = await axios.post('http://localhost:5000/api/wholesale', formDataToSend, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      
      console.log("✅ Wholesale inquiry sent:", response.data);
      
      setFormStatus({
        submitted: true,
        success: true,
        message: "🎉 Thank you for your wholesale inquiry! Our B2B team will contact you within 24 hours with exclusive pricing."
      });
      
      // Reset form
      setFormData({
        businessName: "",
        ownerName: "",
        email: "",
        phone: "",
        alternatePhone: "",
        gstNumber: "",
        businessType: "retailer",
        yearsInBusiness: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        products: "",
        estimatedQuantity: "",
        preferredTimeline: "",
        monthlyRequirement: "",
        additionalNotes: "",
        agreeTerms: false
      });
      setUploadedFile(null);
      setUploadProgress(0);
      setCurrentStep(1);
      
    } catch (error) {
      console.error("❌ Error:", error);
      setFormStatus({
        submitted: true,
        success: false,
        message: error.response?.data?.error || "Something went wrong. Please try again or contact us directly."
      });
      
    } finally {
      setLoading(false);
      
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ""
        });
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Mobile-Optimized Hero Section */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 px-2">
            Wholesale <span className="text-gray-900">Partnership</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto px-4">
            Join our B2B network and get exclusive wholesale prices, bulk discounts, and priority support
          </p>
        </div>
      </div>

      {/* Mobile-Responsive Benefits Cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 md:-mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 flex items-center gap-3 md:gap-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FaPercent className="text-yellow-600 text-xl md:text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm md:text-base">Bulk Discounts</h3>
              <p className="text-xs md:text-sm text-gray-500">Up to 40% off</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 flex items-center gap-3 md:gap-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FaTruck className="text-yellow-600 text-xl md:text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm md:text-base">Free Delivery</h3>
              <p className="text-xs md:text-sm text-gray-500">PAN India</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 flex items-center gap-3 md:gap-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FaHeadset className="text-yellow-600 text-xl md:text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm md:text-base">Dedicated Support</h3>
              <p className="text-xs md:text-sm text-gray-500">24/7 Priority</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 flex items-center gap-3 md:gap-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FaAward className="text-yellow-600 text-xl md:text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm md:text-base">Credit Terms</h3>
              <p className="text-xs md:text-sm text-gray-500">For verified businesses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Mobile Optimized */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        
        {/* Progress Steps - Mobile Responsive */}
        <div className="mb-8 md:mb-12">
          <div className="flex justify-between items-center px-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all ${
                  currentStep >= step 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {currentStep > step ? '✓' : step}
                </div>
                <span className="text-[10px] md:text-xs mt-1 text-gray-500">
                  {step === 1 && "Business"}
                  {step === 2 && "Address"}
                  {step === 3 && "Order"}
                  {step === 4 && "Review"}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded"></div>
            <div 
              className="absolute top-0 left-0 h-1 bg-yellow-500 rounded transition-all duration-300"
              style={{ width: `${(currentStep - 1) * 33.33}%` }}
            ></div>
          </div>
        </div>

        {/* Form and Info Grid - Mobile Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 md:p-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Wholesale Inquiry</h2>
              <p className="text-sm md:text-base text-gray-500 mb-6">Fill the form below and our B2B team will get back to you</p>

              {/* Status Message - Mobile Optimized */}
              {formStatus.submitted && (
                <div className={`mb-4 md:mb-6 p-3 md:p-4 rounded-lg flex items-center gap-2 md:gap-3 ${
                  formStatus.success 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  {formStatus.success ? (
                    <FaCheckCircle className="text-green-500 text-lg md:text-xl flex-shrink-0" />
                  ) : (
                    <FaExclamationCircle className="text-red-500 text-lg md:text-xl flex-shrink-0" />
                  )}
                  <p className={`text-xs md:text-sm ${formStatus.success ? 'text-green-700' : 'text-red-700'}`}>
                    {formStatus.message}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Step 1: Business Details */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaBuilding className="text-yellow-500" />
                      Business Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Business Name *
                        </label>
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          required
                          className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                          placeholder="Your Business Name"
                        />
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Owner/Contact Person *
                        </label>
                        <input
                          type="text"
                          name="ownerName"
                          value={formData.ownerName}
                          onChange={handleChange}
                          required
                          className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                          placeholder="Full Name"
                        />
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                          placeholder="business@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Alternate Phone
                        </label>
                        <input
                          type="tel"
                          name="alternatePhone"
                          value={formData.alternatePhone}
                          onChange={handleChange}
                          className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                          placeholder="+91 98765 43211"
                        />
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          GST Number
                        </label>
                        <input
                          type="text"
                          name="gstNumber"
                          value={formData.gstNumber}
                          onChange={handleChange}
                          className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                          placeholder="22AAAAA0000A1Z5"
                        />
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Business Type *
                        </label>
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleChange}
                          required
                          className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                        >
                          {businessTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Years in Business
                        </label>
                        <input
                          type="number"
                          name="yearsInBusiness"
                          value={formData.yearsInBusiness}
                          onChange={handleChange}
                          min="0"
                          className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                          placeholder="5"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Address Details */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-yellow-500" />
                      Business Address
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Street Address *
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          rows="2"
                          className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                          placeholder="Complete address"
                        />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                            placeholder="City"
                          />
                        </div>

                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                            State *
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                            placeholder="State"
                          />
                        </div>

                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                            Pincode *
                          </label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                            className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                            placeholder="Pincode"
                          />
                        </div>

                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                            Country
                          </label>
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                            placeholder="India"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Order Details */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaBoxes className="text-yellow-500" />
                      Order Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Products Interested In *
                        </label>
                        <textarea
                          name="products"
                          value={formData.products}
                          onChange={handleChange}
                          required
                          rows="2"
                          className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                          placeholder="List the products you're interested in (e.g., Fans, Coolers, ACs, etc.)"
                        />
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Estimated Quantity *
                        </label>
                        <input
                          type="text"
                          name="estimatedQuantity"
                          value={formData.estimatedQuantity}
                          onChange={handleChange}
                          required
                          className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                          placeholder="e.g., 100 units, 50 boxes"
                        />
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Monthly Requirement
                        </label>
                        <select
                          name="monthlyRequirement"
                          value={formData.monthlyRequirement}
                          onChange={handleChange}
                          className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                        >
                          <option value="">Select range</option>
                          {monthlyRequirementOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Preferred Timeline *
                        </label>
                        <select
                          name="preferredTimeline"
                          value={formData.preferredTimeline}
                          onChange={handleChange}
                          required
                          className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                        >
                          <option value="">Select timeline</option>
                          {timelineOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Additional Notes / Special Requirements
                        </label>
                        <textarea
                          name="additionalNotes"
                          value={formData.additionalNotes}
                          onChange={handleChange}
                          rows="2"
                          className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                          placeholder="Any specific requirements or questions..."
                        />
                      </div>
                    </div>

                    {/* File Upload */}
                    <div className="mt-4">
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                        Upload Business Document (Optional)
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="flex-1 cursor-pointer">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 md:p-4 text-center hover:border-yellow-500 transition-colors">
                            <FaUpload className="mx-auto text-yellow-500 text-lg md:text-xl mb-1" />
                            <span className="text-xs md:text-sm text-gray-500">
                              {uploadedFile ? uploadedFile.name : 'Click to upload'}
                            </span>
                            <span className="text-[10px] md:text-xs text-gray-400 block">
                              (PDF, JPG, PNG - Max 5MB)
                            </span>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="mt-2 h-1 bg-gray-200 rounded">
                          <div 
                            className="h-1 bg-yellow-500 rounded transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaCheckCircle className="text-yellow-500" />
                      Review Your Information
                    </h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                        <div>
                          <span className="text-gray-500">Business:</span>
                          <p className="font-medium">{formData.businessName || 'Not provided'}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Owner:</span>
                          <p className="font-medium">{formData.ownerName || 'Not provided'}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Email:</span>
                          <p className="font-medium">{formData.email || 'Not provided'}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Phone:</span>
                          <p className="font-medium">{formData.phone || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-2">
                        <span className="text-gray-500 text-xs md:text-sm">Products:</span>
                        <p className="font-medium text-xs md:text-sm mt-1">{formData.products || 'Not provided'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 mt-4">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                      <label htmlFor="agreeTerms" className="text-xs md:text-sm text-gray-600">
                        I confirm that the information provided is correct and I agree to the 
                        <a href="/terms" className="text-yellow-600 hover:underline ml-1">Terms & Conditions</a>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between gap-3 mt-6">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 md:px-6 py-2 md:py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all text-sm md:text-base"
                    >
                      ← Back
                    </button>
                  )}
                  
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 bg-yellow-500 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-all text-sm md:text-base"
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading || !formData.agreeTerms}
                      className="flex-1 bg-yellow-500 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Inquiry'
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          {/* Right Column - Mobile Responsive Info Cards */}
          <div className="space-y-4 md:space-y-6">
            
            {/* Quick Contact - Mobile Optimized */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Quick Contact</h3>
              <div className="space-y-3">
                <a href="tel:+918439424125" className="flex items-center gap-3 text-gray-600 hover:text-yellow-600 p-2 rounded-lg hover:bg-gray-50 transition-all">
                  <FaPhone className="text-yellow-500 text-base md:text-lg" />
                  <span className="text-sm md:text-base">+91 84394 24125</span>
                </a>
                <a href="https://wa.me/918439424125" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-green-600 p-2 rounded-lg hover:bg-gray-50 transition-all">
                  <FaWhatsapp className="text-green-500 text-base md:text-lg" />
                  <span className="text-sm md:text-base">WhatsApp Business</span>
                </a>
                <a href="mailto:wholesale@bankebihari.com" className="flex items-center gap-3 text-gray-600 hover:text-yellow-600 p-2 rounded-lg hover:bg-gray-50 transition-all">
                  <FaEnvelope className="text-yellow-500 text-base md:text-lg" />
                  <span className="text-sm md:text-base">shribankebiharitraders141@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Wholesale Benefits */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Wholesale Benefits</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaPercent className="text-yellow-500 text-lg mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Tiered Pricing</h4>
                    <p className="text-xs md:text-sm text-gray-500">Better prices for higher volumes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaTruck className="text-yellow-500 text-lg mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Free Logistics</h4>
                    <p className="text-xs md:text-sm text-gray-500">PAN India delivery for bulk orders</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaHeadset className="text-yellow-500 text-lg mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Dedicated Support</h4>
                    <p className="text-xs md:text-sm text-gray-500">Personal account manager</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaAward className="text-yellow-500 text-lg mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Credit Terms</h4>
                    <p className="text-xs md:text-sm text-gray-500">Available for verified businesses</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 text-white">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Why Partner With Us?</h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold">500+</div>
                  <div className="text-xs md:text-sm text-white/80">Wholesale Partners</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold">15+</div>
                  <div className="text-xs md:text-sm text-white/80">Years of Trust</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold">50k+</div>
                  <div className="text-xs md:text-sm text-white/80">Products Delivered</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold">24/7</div>
                  <div className="text-xs md:text-sm text-white/80">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wholesale;