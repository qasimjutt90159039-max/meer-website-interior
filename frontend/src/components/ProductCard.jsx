import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, MessageSquare } from 'lucide-react';

export const ProductCard = ({ product, onInquire }) => {
  const { _id, name, category, description, images, specifications, availability } = product;
  const mainImage = images && images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80';

  // Extract up to 2 key specifications
  const specsList = specifications ? (
    specifications instanceof Map 
      ? Array.from(specifications.entries())
      : Object.entries(specifications)
  ).slice(0, 2) : [];

  return (
    <article className="group bg-white border border-[#E5EBEC] hover:border-[#95B2B8] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md">
      <div>
        {/* Image Container with Floating Badges */}
        <div className="relative aspect-[4/3] bg-[#F4F7F7] overflow-hidden">
          <img
            src={mainImage}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Category Tag */}
          <div className="absolute top-3 left-3">
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold bg-[#172326]/85 backdrop-blur-sm text-[#95B2B8] px-2.5 py-1 rounded-sm border border-[#324145]">
              {category}
            </span>
          </div>

          {/* Availability Tag */}
          {availability && (
            <div className="absolute bottom-3 left-3">
              <span className="inline-flex items-center space-x-1 text-[10px] font-mono bg-white/90 backdrop-blur-sm text-[#172326] px-2 py-0.5 rounded-sm border border-[#E5EBEC]">
                <CheckCircle2 className="w-3 h-3 text-[#95B2B8]" />
                <span>{availability}</span>
              </span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-5">
          <Link to={`/furniture/${_id}`} className="focus:outline-none">
            <h3 className="text-base sm:text-lg font-bold text-[#172326] group-hover:text-[#95B2B8] transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>

          <p className="mt-2 text-xs text-[#596568] line-clamp-2 leading-relaxed font-light">
            {description}
          </p>

          {/* Specifications Preview */}
          {specsList.length > 0 && (
            <div className="mt-4 pt-3 border-t border-[#E5EBEC] space-y-1.5">
              {specsList.map(([key, val]) => (
                <div key={key} className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-gray-400 truncate pr-2">{key}:</span>
                  <span className="text-[#172326] font-medium truncate">{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 py-3.5 bg-[#F4F7F7]/60 border-t border-[#E5EBEC] flex items-center justify-between">
        <Link
          to={`/furniture/${_id}`}
          className="inline-flex items-center space-x-1 text-xs font-mono font-semibold text-[#172326] hover:text-[#95B2B8] transition-colors"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#95B2B8]" />
        </Link>

        {onInquire ? (
          <button
            type="button"
            onClick={() => onInquire(product)}
            className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase bg-white hover:bg-[#95B2B8] hover:text-white text-[#172326] border border-[#E5EBEC] hover:border-[#95B2B8] px-2.5 py-1.5 rounded-sm transition-all"
          >
            <MessageSquare className="w-3 h-3 text-[#95B2B8] group-hover:text-white" />
            <span>Inquire</span>
          </button>
        ) : (
          <Link
            to={`/contact?product=${encodeURIComponent(name)}&id=${_id}`}
            className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase bg-white hover:bg-[#95B2B8] hover:text-white text-[#172326] border border-[#E5EBEC] hover:border-[#95B2B8] px-2.5 py-1.5 rounded-sm transition-all"
          >
            <MessageSquare className="w-3 h-3 text-[#95B2B8]" />
            <span>Inquire</span>
          </Link>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
