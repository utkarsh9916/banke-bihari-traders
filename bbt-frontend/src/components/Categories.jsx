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

  // 4 products per slide
  const itemsPerSlide = 4
  const totalItems = categories.length

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

  // Get current 4 items in circular manner
  const getCurrentItems = () => {
    const items = []
    for (let i = 0; i < itemsPerSlide; i++) {
      const index = (currentIndex + i) % totalItems
      items.push(categories[index])
    }
    return items
  }

  const currentItems = getCurrentItems()

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-600 rounded-full text-sm font-semibold mb-4">
            ✦ 14+ CATEGORIES ✦
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Categories <span className="text-yellow-500">We Deal In</span>
          </h2>
          <p className="text-gray-500 text-lg">Mobile Phones, Accessories & More</p>
        </div>

        {/* Slider with Arrows */}
        <div className="relative">
          {/* Left Arrow */}
          <button 
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ←
          </button>
          
          {/* Right Arrow */}
          <button 
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            →
          </button>

          {/* Categories Grid - NON-CLICKABLE (removed Link) */}
          <div className="overflow-hidden mx-8">
            <div className="grid grid-cols-4 gap-6">
              {currentItems.map((category, index) => (
                <div  // 👈 Changed from Link to div
                  key={`${category.id}-${currentIndex}-${index}`}
                  className="group w-full cursor-default"  // 👈 cursor-default
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    {/* Image */}
                    <div className="relative w-full h-48 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* Category Name on Image */}
                      <div className="absolute bottom-3 left-3 text-white">
                        <h3 className="font-bold text-lg">{category.name}</h3>
                      </div>
                    </div>
                    
                    {/* Bottom Section */}
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">{category.count}</span>
                      <span className="text-yellow-600 font-semibold">
                        {category.count}  {/* 👈 Changed from "Shop →" to count */}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <div className="flex gap-2">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(index)
                  setTimeout(() => setIsAutoPlaying(true), 5000)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-yellow-500" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
          
          {/* Auto-play indicator */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-xs text-gray-400">
              {isAutoPlaying ? 'Auto-sliding' : 'Paused'}
            </span>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-6">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span>View All Categories</span>
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Categories