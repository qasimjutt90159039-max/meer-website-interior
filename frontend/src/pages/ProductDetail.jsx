import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, MessageSquare, Phone, Layers, ShieldCheck, Box, Share2, ArrowRight } from 'lucide-react';
import InquiryModal from '../components/InquiryModal';
import api from '../services/api';

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const data = await api.getProductById(id);
        if (!data || data.message === 'Product not found') {
          setNotFound(true);
        } else {
          setProduct(data);
        }
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-28 pb-20 min-h-[60vh] flex items-center justify-center bg-[#F4F7F7]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#95B2B8] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-mono text-xs uppercase text-[#596568]">Loading furniture specifications...</p>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="pt-28 pb-20 min-h-[70vh] flex items-center justify-center bg-[#F4F7F7]">
        <div className="max-w-md w-full bg-white border border-[#E5EBEC] p-10 text-center rounded-sm shadow-sm space-y-4">
          <Box className="w-12 h-12 text-[#95B2B8] mx-auto" />
          <span className="font-mono text-xs uppercase text-gray-400 block">Status 404</span>
          <h2 className="text-2xl font-bold text-[#172326]">Product Not Found</h2>
          <p className="text-xs text-[#596568] leading-relaxed">
            The requested furniture item could not be found or may have been removed from the catalog.
          </p>
          <div className="pt-4">
            <Link
              to="/furniture"
              className="inline-flex items-center space-x-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-mono text-xs uppercase font-bold px-5 py-2.5 rounded-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Furniture Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { name, category, description, images = [], specifications = {}, availability } = product;
  const imageList = images.length > 0 ? images : ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80'];
  const specsEntries = specifications instanceof Map ? Array.from(specifications.entries()) : Object.entries(specifications);

  return (
    <div className="pt-20 bg-[#F4F7F7] min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-[#E5EBEC] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-mono text-[#596568]">
          <div className="flex items-center space-x-2">
            <Link to="/" className="hover:text-[#172326]">Home</Link>
            <span>/</span>
            <Link to="/furniture" className="hover:text-[#172326]">Furniture</Link>
            <span>/</span>
            <span className="text-[#172326] font-bold truncate max-w-[200px] sm:max-w-xs">{name}</span>
          </div>

          <Link
            to="/furniture"
            className="inline-flex items-center space-x-1 hover:text-[#172326]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Catalog</span>
          </Link>
        </div>
      </div>

      {/* Main Details Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Visual Presentation & Gallery Thumbnails */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white border border-[#E5EBEC] rounded-sm p-2 shadow-xs">
                <div className="relative aspect-[4/3] bg-[#172326] overflow-hidden rounded-sm">
                  <img
                    src={imageList[activeImageIndex] || imageList[0]}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                  {availability && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold bg-[#172326]/90 backdrop-blur-sm text-[#95B2B8] px-3 py-1 rounded-sm border border-[#324145]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{availability}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {imageList.length > 1 && (
                <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                  {imageList.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-sm overflow-hidden border-2 shrink-0 transition-all ${
                        activeImageIndex === idx ? 'border-[#95B2B8]' : 'border-[#E5EBEC] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Showroom Verification Note */}
              <div className="p-4 bg-white border border-[#E5EBEC] rounded-sm flex items-start space-x-3 text-xs text-[#596568]">
                <ShieldCheck className="w-5 h-5 text-[#95B2B8] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#172326] block">Physical Inspection at Meer’s Interior Showroom</span>
                  <p className="mt-0.5 font-light">
                    Located at 4 Mission Rd, Anarkali Bazaar Lahore. Visit in person to inspect material swatches, frame finishes, and ergonomic comfort mechanisms.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Specifications & Inquiry Action */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-[#E5EBEC] p-6 sm:p-8 rounded-sm shadow-xs space-y-6">
                <div>
                  <div className="inline-block font-mono text-xs uppercase tracking-widest text-[#95B2B8] font-bold bg-[#172326] px-2.5 py-1 rounded-sm mb-2">
                    {category}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172326] tracking-tight">
                    {name}
                  </h1>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Design Description
                  </h3>
                  <p className="text-sm text-[#596568] leading-relaxed font-light">
                    {description}
                  </p>
                </div>

                {/* Technical Specifications */}
                {specsEntries.length > 0 && (
                  <div className="border-t border-[#E5EBEC] pt-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[#172326] font-bold mb-3 flex items-center space-x-2">
                      <Layers className="w-4 h-4 text-[#95B2B8]" />
                      <span>Specifications</span>
                    </h3>

                    <div className="bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm divide-y divide-[#E5EBEC]">
                      {specsEntries.map(([key, value]) => (
                        <div key={key} className="p-3 text-xs grid grid-cols-3 gap-2">
                          <span className="font-mono text-gray-500 font-medium col-span-1">{key}</span>
                          <span className="text-[#172326] font-medium col-span-2">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary CTA: Ask About This Furniture */}
                <div className="border-t border-[#E5EBEC] pt-6 space-y-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full flex items-center justify-center space-x-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-bold font-mono text-xs uppercase py-3.5 px-4 rounded-sm transition-all shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Ask About This Furniture</span>
                  </button>

                  <a
                    href="tel:+923009490734"
                    className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-[#172326] hover:text-white text-[#172326] border border-[#E5EBEC] hover:border-[#172326] font-mono text-xs uppercase py-3 px-4 rounded-sm transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#95B2B8]" />
                    <span>Call Direct: +92 300 9490734</span>
                  </a>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[11px] font-mono text-gray-400">
                    Pricing and customization provided on inquiry based on quantities and spatial specifications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefillProduct={product}
      />
    </div>
  );
};

export default ProductDetail;
