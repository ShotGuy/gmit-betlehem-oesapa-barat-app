import { Calendar, ChevronLeft, ChevronRight, Images as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function GalleryImage({ galleryItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Data Mapping (Support DB fields & Fallbacks)
  const title = galleryItem.namaKegiatan || galleryItem.title || "Kegiatan Gereja";
  const rawDate = galleryItem.tanggalKegiatan || galleryItem.date;
  const description = galleryItem.deskripsi || galleryItem.description || "";

  // Format Date
  const formatDate = (dateString) => {
    if (!dateString) return "Jadwal Rutin";
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  const displayDate = rawDate ? formatDate(rawDate) : null;

  // 2. Image Parsing
  let images = [];
  if (galleryItem.fotos) {
    if (Array.isArray(galleryItem.fotos)) {
      images = galleryItem.fotos;
    } else if (typeof galleryItem.fotos === 'string') {
      try {
        images = JSON.parse(galleryItem.fotos);
      } catch (e) {
        console.error("Error parsing fotos:", e);
        images = [];
      }
    }
  }

  if (images.length === 0 && galleryItem.url) {
    images = [{ url: galleryItem.url }];
  }

  if (images.length === 0) return null;

  const handleNext = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[currentIndex];

  return (
    <div
      className="relative break-inside-avoid mb-6 group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-gray-100 dark:bg-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] md:aspect-auto">
        <Image
          src={currentImage.url}
          alt={title}
          width={500}
          height={500}
          className="w-full h-auto object-cover transform transition-transform duration-700 ease-out"
        />

        {/* Multi-Image Badge */}
        {images.length > 1 && (
          <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1.5 z-20">
            <ImageIcon className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">{currentIndex + 1}/{images.length}</span>
          </div>
        )}

        {/* Carousel Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className={`absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Overlay Content */}
        <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none`}>
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {/* 1. Date (Top) */}
            {displayDate && (
              <span className="inline-flex items-center gap-1.5 px-2 py-1 mb-2 text-xs font-bold text-amber-500 bg-amber-950/30 border border-amber-500/20 rounded-full tracking-wider backdrop-blur-sm">
                <Calendar className="w-3 h-3" />
                {displayDate}
              </span>
            )}

            {/* 2. Event Name (Middle) */}
            <h3 className="font-serif text-lg font-bold text-white leading-tight mb-1">
              {title}
            </h3>

            {/* 3. Description (Bottom) */}
            {description && (
              <p className="text-gray-300 text-sm line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
