import { useState } from "react";
import { FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Import your store images
import store1 from "../assets/banner1.png";
import store2 from "../assets/banner2.png";
import store3 from "../assets/banner3.png";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Gallery images - Only 3 store images
  const galleryImages = [
    {
      id: 1,
      title: "Banke Bihari Traders - Darling Road",
      location: "Darling Road, Sahaswan",
      image: store1,
      description: "Main store at Darling Road - Established 2010"
    },
    {
      id: 2,
      title: "Kavya Traders 2.0",
      location: "Darling Road, Sahaswan",
      image: store2,
      description: "Second store - Modern shopping experience"
    },
    {
      id: 3,
      title: "Kavya Traders",
      location: "Near Tehsil Road, Sahaswan",
      image: store3,
      description: "Third store serving the Tehsil Road area"
    }
  ];

  // Get current index
  const currentIndex = selectedImage 
    ? galleryImages.findIndex(img => img.id === selectedImage.id) 
    : -1;

  // Navigation functions
  const prevImage = () => {
    if (currentIndex > 0) {
      setSelectedImage(galleryImages[currentIndex - 1]);
    }
  };

  const nextImage = () => {
    if (currentIndex < galleryImages.length - 1) {
      setSelectedImage(galleryImages[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-yellow-500 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Our Stores Gallery</h1>
          <p className="text-white/90">Take a look at our 3 stores in Sahaswan</p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.image}
                alt={image.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{image.title}</h3>
                <p className="text-sm text-yellow-600 mt-1">{image.location}</p>
                <p className="text-xs text-gray-500 mt-2">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Store count badge */}
        <div className="text-center mt-8">
          <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
            Total {galleryImages.length} Stores in Sahaswan
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-yellow-500 text-3xl z-10"
          >
            <FaTimes />
          </button>

          {/* Previous button */}
          {currentIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-yellow-500 text-3xl z-10"
            >
              <FaArrowLeft />
            </button>
          )}

          {/* Next button */}
          {currentIndex < galleryImages.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-yellow-500 text-3xl z-10"
            >
              <FaArrowRight />
            </button>
          )}

          {/* Image */}
          <img
            src={selectedImage.image}
            alt={selectedImage.title}
            className="max-w-full max-h-[70vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          {/* Image info */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-lg text-center max-w-md">
            <h3 className="text-xl font-bold">{selectedImage.title}</h3>
            <p className="text-sm text-gray-300 mt-1">{selectedImage.location}</p>
            <p className="text-xs text-gray-400 mt-2">{selectedImage.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;