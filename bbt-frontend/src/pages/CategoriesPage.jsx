import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import acc from "../assets/accessories.jpg"
import acs from "../assets/acs.jpg"
import coolers from "../assets/coolers.jpg"
import fans from "../assets/fans.jpg"
import fridge from "../assets/fridge.jpg"
import micro from "../assets/microwave.jpg"
import wm from "../assets/washingMachines.jpg"

function Categories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  const categories = [
    { id: 1, name: "Fans", count: "128+ products", image: fans },
    { id: 2, name: "Coolers", count: "86+ products", image: coolers },
    { id: 3, name: "ACs", count: "67+ products", image: acs },
    { id: 4, name: "Refrigerators", count: "75+ products", image: fridge },
    { id: 5, name: "Washing Machines", count: "92+ products", image: wm },
    { id: 6, name: "Kitchen Appliances", count: "180+ products", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=400&fit=crop" },
    { id: 7, name: "Microwaves", count: "45+ products", image: micro },
    { id: 8, name: "Lighting", count: "245+ products", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=400&fit=crop" },
    { id: 9, name: "Laptops", count: "120+ products", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop" },
    { id: 10, name: "Smart TVs", count: "90+ products", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=400&fit=crop" },
    { id: 11, name: "Mobile Phones", count: "200+ products", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop" },
    { id: 12, name: "Accessories", count: "300+ products", image: acc },
    { id: 13, name: "Smart Watches", count: "52+ products", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop" },
    { id: 14, name: "Headphones", count: "156+ products", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop" }
  ]

  const [itemsPerSlide, setItemsPerSlide] = useState(1)

  // Update items per slide based on screen width
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth
      if (width < 640) setItemsPerSlide(1)      // Mobile
      else if (width < 768) setItemsPerSlide(2) // Small tablet
      else if (width < 1024) setItemsPerSlide(3) // Large tablet
      else setItemsPerSlide(4)                  // Desktop
    }
    
    updateItemsPerSlide()
    window.addEventListener('resize', updateItemsPerSlide)
    return () => window.removeEventListener('resize', updateItemsPerSlide)
  }, [])

  const totalItems = categories.length
  const totalSlides = Math.ceil(totalItems / itemsPerSlide)

  // Auto play
  useEffect(() => {
    let interval
    if (isAutoPlaying && totalSlides > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides)
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, totalSlides])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const startIndex = currentIndex * itemsPerSlide
  const currentItems = categories.slice(startIndex, startIndex + itemsPerSlide)

  return (
    <div className="py-6 sm:py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="px-3 sm:px-4 md:px-6 max-w-7xl mx-auto">
        
        {/* Header - Fully Responsive */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <span className="inline-block px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-2 bg-yellow-100 text-yellow-600 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold mb-2 sm:mb-3 md:mb-4">
            ✦ 14+ CATEGORIES ✦
          </span>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
            Categories <span className="text-yellow-500">We Deal In</span>
          </h2>
          <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-gray-500 px-2">
            Mobile Phones, Accessories & More
          </p>
        </div>

        {/* Slider Section */}
        <div className="relative">
          
          {/* Navigation Arrows - Responsive */}
          {currentIndex > 0 && (
            <button 
              onClick={prevSlide}
              className="absolute -left-2 sm:-left-3 md:-left-4 top-1/2 -translate-y-1/2 z-10 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-md text-xs sm:text-sm md:text-base"
            >
              ←
            </button>
          )}
          
          {currentIndex < totalSlides - 1 && (
            <button 
              onClick={nextSlide}
              className="absolute -right-2 sm:-right-3 md:-right-4 top-1/2 -translate-y-1/2 z-10 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-md text-xs sm:text-sm md:text-base"
            >
              →
            </button>
          )}

          {/* Categories Grid - Fully Responsive */}
          <div className="overflow-hidden mx-4 sm:mx-6 md:mx-8">
            <div className="grid gap-2 sm:gap-3 md:gap-4 lg:gap-5"
                 style={{
                   gridTemplateColumns: `repeat(${itemsPerSlide}, minmax(0, 1fr))`
                 }}>
              {currentItems.map((category) => (
                <div key={category.id} className="group cursor-default">
                  <div className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    {/* Image Container - Responsive Height */}
                    <div className="relative w-full overflow-hidden rounded-t-lg sm:rounded-t-xl"
                         style={{ height: 'clamp(140px, 25vw, 200px)' }}>
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      
                      {/* Category Name */}
                      <div className="absolute bottom-1 sm:bottom-2 left-2 sm:left-3 right-2 text-white">
                        <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg truncate">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Bottom Section - Responsive Padding */}
                    <div className="p-2 sm:p-3 md:p-4 flex justify-between items-center">
                      <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">
                        {category.count}
                      </span>
                      <span className="text-yellow-600 font-semibold text-[10px] sm:text-xs md:text-sm">
                        Shop →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide Indicators - Responsive */}
        <div className="flex justify-center gap-1 sm:gap-2 mt-4 sm:mt-5 md:mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false)
                setCurrentIndex(index)
                setTimeout(() => setIsAutoPlaying(true), 5000)
              }}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "w-4 sm:w-5 md:w-6 bg-yellow-500" 
                  : "w-1 sm:w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Auto-play Status */}
        <div className="text-center mt-2 sm:mt-3 md:mt-4">
          <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-400">
            {isAutoPlaying ? '✨ Auto-sliding every 3 seconds' : '⏸️ Paused - Tap dots to navigate'}
          </span>
        </div>

        {/* View All Button - Responsive */}
        <div className="text-center mt-5 sm:mt-6 md:mt-8 lg:mt-10">
          <Link
            to="/categories"
            className="inline-flex items-center gap-1 sm:gap-2 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-yellow-500 text-white rounded-full font-semibold text-xs sm:text-sm md:text-base hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span>View All Categories</span>
            <span className="text-sm sm:text-base">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Categories