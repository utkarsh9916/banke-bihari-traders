import { useState, useEffect } from "react";
import pic1 from "../assets/pic1.jpg"
import pic2 from "../assets/pic2.jpg"

import { 
  FaQuoteLeft, 
  FaQuoteRight, 
  FaStar, 
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt
} from "react-icons/fa";

function AboutUs() {
  // Owner data
  const owners = [
    {
      id: 1,
      name: "Ankur Maheshwari",
      role: "Founder",
      experience: "15+ years",
      image: pic1,
      // bio: "Visionary leader with 15+ years of experience in electronics retail. Founded Banke Bihari Traders in 2010 with a mission to provide quality products at affordable prices to the people of Sahaswan.",
      quote: "Quality is not an act, it's a habit. We believe in building relationships, not just selling products.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "ankur.maheshwari141@gmail.com"
      }
    },
    {
      id: 2,
      name: "Anchal Maheshwari",
      role: "Founder ",
      experience: "12+ years",
      image:pic2,
      // bio: "Expert in supply chain management and business operations. Rajesh has been instrumental in expanding our business to 3 successful stores across Sahaswan.",
      quote: "Customer satisfaction is our priority. We strive to exceed expectations every single day.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "anchalmaheshwari141@gmail.com"
      }
    }
  ];

  // Company story
  const story = {
    founded: "2010",
    location: "Sahaswan, Uttar Pradesh",
    mission: "To provide high-quality home appliances and electronics at affordable prices while ensuring exceptional customer service.",
    vision: "To become the most trusted electronics retailer in Western UP, known for quality, reliability, and innovation.",
    description: "Banke Bihari Traders started its journey in 2010 with a small store on Darling Road in Sahaswan. What began as a humble venture by Ankur Maheshwari and Anchal Maheshwari has grown into a trusted name with 3 stores across the region. Our growth is driven by our commitment to quality, competitive pricing, and exceptional customer service. Today, we are proud to be the preferred choice for thousands of customers and businesses in Sahaswan and surrounding areas."
  };

  // Animated stats
  const [stats, setStats] = useState({
    years: 0,
    stores: 0,
    customers: 0
  });

  useEffect(() => {
    const targets = {
      years: 15,
      stores: 3,
      customers: 50
    };

    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        years: Math.min(Math.round(targets.years * progress), targets.years),
        stores: Math.min(Math.round(targets.stores * progress), targets.stores),
        customers: Math.min(Math.round(targets.customers * progress), targets.customers)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-gray-900">Us</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Get to know the people behind Banke Bihari Traders and our journey
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-3 gap-4 bg-white rounded-xl shadow-lg p-6">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-yellow-600">{stats.years}+</div>
            <div className="text-xs md:text-sm text-gray-500">Years of Excellence</div>
          </div>
          <div className="text-center border-l border-r border-gray-200">
            <div className="text-2xl md:text-3xl font-bold text-yellow-600">{stats.stores}</div>
            <div className="text-xs md:text-sm text-gray-500">Stores</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-yellow-600">{stats.customers}K+</div>
            <div className="text-xs md:text-sm text-gray-500">Happy Customers</div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our <span className="text-yellow-500">Story</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-gray-600">
              <FaCalendarAlt className="text-yellow-500 text-xl" />
              <span className="text-lg">Founded in <span className="font-bold text-gray-800">{story.founded}</span></span>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <FaMapMarkerAlt className="text-yellow-500 text-xl" />
              <span className="text-lg">Based in <span className="font-bold text-gray-800">{story.location}</span></span>
            </div>
            
            <p className="text-gray-600 leading-relaxed text-lg">
              {story.description}
            </p>

            <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Our Mission</h3>
              <p className="text-gray-600">{story.mission}</p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Our Vision</h3>
              <p className="text-gray-600">{story.vision}</p>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://content3.jdmagicbox.com/comp/sahaswan/e4/9999p5832.5832.190912114723.z1e4/catalogue/kavya-traders-sahaswan-sahaswan-mobile-phone-dealers-samsung-yf032ck4qv.jpg"
              alt="Our First Store"
              className="w-full h-auto rounded-xl shadow-xl"
            />
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-sm font-semibold text-gray-800">Our first store in 2010</p>
            </div>
          </div>
        </div>
      </div>

      {/* Owners Section - WITH CIRCULAR PHOTOS */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet Our <span className="text-yellow-500">Founders</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              The visionaries behind Banke Bihari Traders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {owners.map((owner) => (
              <div key={owner.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all p-8">
                <div className="flex flex-col items-center text-center">
                  {/* Circular Image */}
                  <div className="mb-6">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-500 shadow-xl mx-auto">
                      <img 
                        src={owner.image} 
                        alt={owner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Experience Badge */}
                    <div className="mt-3">
                      <span className="inline-block bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        {owner.experience}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{owner.name}</h3>
                    <p className="text-yellow-600 font-medium text-lg">{owner.role}</p>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 mb-6">
                    {owner.bio}
                  </p>

                  {/* Quote */}
                  <div className="bg-yellow-50 p-4 rounded-lg mb-6 w-full">
                    <FaQuoteLeft className="text-yellow-300 text-sm mb-2" />
                    <p className="text-gray-600 text-sm italic">{owner.quote}</p>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-4">
                    <a href={owner.social.linkedin} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
                      <FaLinkedin />
                    </a>
                    <a href={owner.social.twitter} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-400 hover:text-white transition-all">
                      <FaTwitter />
                    </a>
                    <a href={`mailto:${owner.social.email}`} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-yellow-500 hover:text-white transition-all">
                      <FaEnvelope />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Want to know more about us?
          </h2>
          <p className="text-white/90 mb-6">
            Visit any of our stores or contact us directly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/stores"
              className="inline-flex items-center justify-center gap-2 bg-white text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Find Our Stores
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;