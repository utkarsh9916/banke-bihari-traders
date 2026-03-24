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

  // Responsive items per slide based on screen size
  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1      // Mobile: 1 item
      if (window.innerWidth < 768) return 2      // Tablet small: 2 items
      if (window.innerWidth < 1024) return 3     // Tablet large: 3 items
      return 4                                    // Desktop: 4 items
    }
    return 4
  }

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide())
  const totalItems = categories.length

  // Update items per slide on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto play - infinite loop
  useEffect(() => {
    let interval
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalItems)
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, totalItems])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % totalItems)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  // Get current items in circular manner
  const getCurrentItems = () => {
    const items = []
    for (let i = 0; i < itemsPerSlide; i++) {
      const index = (currentIndex + i) % totalItems
      items.push(categories[index])
    }
    return items
  }

  const currentItems = getCurrentItems()

  // Calculate width based on items per slide
  const getItemWidth = () => {
    return `${100 / itemsPerSlide}%`
  }

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        
        {/* Header - Responsive */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-yellow-100 text-yellow-600 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            ✦ 14+ CATEGORIES ✦
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 sm:mb-4">
            Categories <span className="text-yellow-500">We Deal In</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-500">Mobile Phones, Accessories & More</p>
        </div>

        {/* Slider with Arrows */}
        <div className="relative">
          {/* Left Arrow */}
          <button 
            onClick={prevSlide}
            className="absolute -left-2 sm:-left-3 md:-left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ←
          </button>
          
          {/* Right Arrow */}
          <button 
            onClick={nextSlide}
            className="absolute -right-2 sm:-right-3 md:-right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            →
          </button>

          {/* Categories Grid - Responsive */}
          <div className="overflow-hidden mx-4 sm:mx-6 md:mx-8">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-3 sm:gap-4 md:gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)` }}
            >
              {categories.map((category, index) => (
                <div
                  key={`${category.id}-${index}`}
                  className="flex-shrink-0 group cursor-default"
                  style={{ width: `calc(${getItemWidth()} - ${itemsPerSlide > 1 ? '12px' : '0px'})` }}
                >
                  <div className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Image */}
                    <div className="relative w-full h-32 sm:h-40 md:h-48 overflow-hidden rounded-t-lg sm:rounded-t-xl">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* Category Name on Image */}
                      <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white">
                        <h3 className="font-bold text-sm sm:text-base md:text-lg">{category.name}</h3>
                      </div>
                    </div>
                    
                    {/* Bottom Section */}
                    <div className="p-2 sm:p-3 md:p-4 flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-500">{category.count}</span>
                      <span className="text-yellow-600 font-semibold text-xs sm:text-sm">
                        {category.count}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicators - Responsive */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8">
          <div className="flex gap-1 sm:gap-2">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(index)
                  setTimeout(() => setIsAutoPlaying(true), 5000)
                }}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-4 sm:w-6 md:w-8 bg-yellow-500" 
                    : "w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
          
          {/* Auto-play indicator - Hidden on very small screens */}
          <div className="hidden xs:flex items-center gap-1 sm:gap-2">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-[10px] sm:text-xs text-gray-400">
              {isAutoPlaying ? 'Auto-sliding' : 'Paused'}
            </span>
          </div>
        </div>

        {/* View All Button - Responsive */}
        <div className="text-center mt-6 sm:mt-8 md:mt-10">
          <Link
            to="/categories"
            className="inline-flex items-center gap-1 sm:gap-2 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-yellow-500 text-white rounded-full font-semibold text-sm sm:text-base hover:bg-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span>View All Categories</span>
            <span className="group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform text-base sm:text-lg">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Categories