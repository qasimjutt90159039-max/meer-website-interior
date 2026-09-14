import React, { useState, useEffect } from 'react';
import { Eye, Filter, Image as ImageIcon, Box } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import Lightbox from '../components/Lightbox';
import api from '../services/api';

const filterCategories = ['All', 'Workstations', 'Meeting Furniture', 'Office Desks', 'Office Chairs', 'Storage'];

export const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const data = await api.getGallery(currentFilter);
        setItems(data);
      } catch (err) {
        console.warn('Error loading gallery items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [currentFilter]);

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="pt-20">
      {/* Header Banner */}
      <section className="bg-[#172326] text-white py-20 border-b border-[#324145] relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#95B2B8] block mb-2 font-semibold">
            VISUAL ARCHIVE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Furniture & Workspace Gallery.
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-sm sm:text-base font-light leading-relaxed">
            Visual reference catalog of commercial office furniture designs, workstation layouts, and ergonomic details.
          </p>
        </div>
      </section>

      {/* Filter Navigation Bar */}
      <section className="bg-white border-b border-[#E5EBEC] sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
            {filterCategories.map((cat) => {
              const isActive = currentFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCurrentFilter(cat)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-mono uppercase whitespace-nowrap tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#172326] text-[#95B2B8] font-bold'
                      : 'bg-[#F4F7F7] text-[#596568] hover:bg-[#E5EBEC]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <span className="hidden sm:inline-block font-mono text-xs text-gray-400">
            {items.length} items
          </span>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-[#F4F7F7] min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-24 text-center">
              <div className="w-8 h-8 border-2 border-[#95B2B8] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="mt-3 font-mono text-xs uppercase text-[#596568]">Loading visual gallery...</p>
            </div>
          ) : items.length > 0 ? (
            /* Responsive Masonry Layout */
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {items.map((item, index) => (
                <div
                  key={item._id || index}
                  onClick={() => setLightboxIndex(index)}
                  className="break-inside-avoid group relative bg-white border border-[#E5EBEC] hover:border-[#95B2B8] rounded-sm overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <div className="relative overflow-hidden bg-[#172326]">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#172326]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="p-3 bg-[#95B2B8] text-[#172326] rounded-full shadow-lg">
                        <Eye className="w-5 h-5" />
                      </span>
                    </div>

                    {item.category && (
                      <div className="absolute top-3 left-3">
                        <span className="font-mono text-[9px] uppercase tracking-wider bg-[#172326]/90 backdrop-blur-sm text-[#95B2B8] px-2 py-0.5 rounded-sm border border-[#324145]">
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-bold text-[#172326] group-hover:text-[#95B2B8] transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-1 text-xs text-[#596568] font-light line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Strict prompt requirement: "Gallery images will appear here once they are added." */
            <div className="border border-dashed border-[#E5EBEC] bg-white p-16 text-center rounded-sm max-w-xl mx-auto shadow-xs">
              <Box className="w-12 h-12 text-[#95B2B8] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#172326]">
                Gallery images will appear here once they are added.
              </h3>
              <p className="mt-2 text-xs text-[#596568] font-mono">
                No visual entries currently match the selected filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default Gallery;
