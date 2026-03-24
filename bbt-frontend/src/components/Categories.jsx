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
  const [itemsPerSlide, setItemsPerSlide] = useState(4)
  
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

  // Create infinite array by duplicating categories 3 times
  const infiniteCategories = [...categories, ...categories, ...categories]
  const totalItems = infiniteCategories.length
  const middleIndex = categories.length // Starting index for infinite loop

  // Responsive items per slide
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth
      if (width < 640) setItemsPerSlide(1)
      else if (width < 768) setItemsPerSlide(2)
      else if (width < 1024) setItemsPerSlide(3)
      else setItemsPerSlide(4)
    }
    
    updateItemsPerSlide()
    window.addEventListener('resize', updateItemsPerSlide)
    return () => window.removeEventListener('resize', updateItemsPerSlide)
  }, [])

  // Set initial index to middle for seamless infinite loop
  useEffect(() => {
    setCurrentIndex(middleIndex)
  }, [itemsPerSlide, middleIndex])

  const totalSlides = Math.ceil(totalItems / itemsPerSlide)

  // Auto play - infinite loop
  useEffect(() => {
    let interval
    if (isAutoPlaying && totalSlides > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          let newIndex = prev + 1
          
          // Check if we need to reset to middle
          if (newIndex >= totalItems - itemsPerSlide) {
            // Jump back to middle without animation
            setTimeout(() => {
              setCurrentIndex(middleIndex)
            }, 50)
            return newIndex - categories.length
          }
          return newIndex
        })
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, totalSlides, totalItems, itemsPerSlide, middleIndex, categories.length])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => {
      let newIndex = prev + 1
      if (newIndex >= totalItems - itemsPerSlide) {
        setTimeout(() => {
          setCurrentIndex(middleIndex)
        }, 50)
        return newIndex - categories.length
      }
      return newIndex
    })
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => {
      let newIndex = prev - 1
      if (newIndex < 0) {
        setTimeout(() => {
          setCurrentIndex(totalItems - itemsPerSlide - categories.length)
        }, 50)
        return newIndex + categories.length
      }
      return newIndex
    })
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  // Get current slide items
  const startIndex = currentIndex
  const currentItems = infiniteCategories.slice(startIndex, startIndex + itemsPerSlide)

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-yellow-100 text-yellow-600 rounded-full text-xs sm:text-sm font-semibold mb-2 sm:mb-3 md:mb-4">
            ✦ 14+ CATEGORIES ✦
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-1 sm:mb-2 md:mb-4">
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

          {/* Categories Grid - Infinite Loop */}
          <div className="overflow-hidden mx-4 sm:mx-6 md:mx-8">
            <div 
              className="grid gap-3 sm:gap-4 md:gap-5 transition-transform duration-500 ease-in-out"
              style={{
                gridTemplateColumns: `repeat(${itemsPerSlide}, minmax(0, 1fr))`
              }}
            >
              {currentItems.map((category, index) => (
                <div key={`${category.id}-${currentIndex}-${index}`} className="group cursor-default">
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    {/* Image - Perfect Square - NO CUTTING */}
                    <div className="relative w-full pt-[100%] bg-gray-100">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      
                      {/* Category Name on Image */}
                      <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 text-white">
                        <h3 className="font-bold text-xs sm:text-sm md:text-base truncate">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Bottom Section */}
                    <div className="p-2 sm:p-3 md:p-4 flex justify-between items-center border-t border-gray-100">
                      <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">
                        {category.count}
                      </span>
                      <span className="text-yellow-600 font-semibold text-[10px] sm:text-xs md:text-sm">
                        {category.count}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mt-5 sm:mt-6 md:mt-8">
          <div className="flex gap-1 sm:gap-2">
            {categories.slice(0, Math.min(8, categories.length)).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(middleIndex + index)
                  setTimeout(() => setIsAutoPlaying(true), 5000)
                }}
                className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                  Math.floor((currentIndex - middleIndex) % categories.length) === index
                    ? "w-4 sm:w-5 md:w-6 bg-yellow-500" 
                    : "w-1 sm:w-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
          
          {/* Auto-play indicator */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-400">
              {isAutoPlaying ? 'Infinite Loop • Auto-sliding' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Infinite Loop Text */}
        <div className="text-center mt-3 sm:mt-4">
          <p className="text-[10px] sm:text-xs text-gray-400 animate-pulse">
            {/* 🔄 Infinite Loop • Never Ends • {categories.length}+ Categories */}
          </p>
        </div>

        {/* View All Button */}
        <div className="text-center mt-5 sm:mt-6 md:mt-8 lg:mt-10">
          <Link
            to="/categories"
            className="inline-flex items-center gap-1 sm:gap-2 px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 bg-yellow-500 text-white rounded-full font-semibold text-xs sm:text-sm md:text-base hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <span>View All Categories</span>
            <span className="group-hover:translate-x-1 transition-transform text-sm sm:text-base">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Categories