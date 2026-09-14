import React from 'react';
import { Phone, MapPin, ExternalLink, ArrowUpRight } from 'lucide-react';

export const QuickContactStrip = () => {
  return (
    <section className="bg-[#172326] text-white border-y border-[#324145]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#324145]">
          {/* Phone */}
          <a
            href="tel:+923009490734"
            className="py-5 px-4 sm:px-6 flex items-center justify-between group hover:bg-[#202A2D] transition-colors"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-sm bg-[#202A2D] group-hover:bg-[#95B2B8]/20 border border-[#324145] group-hover:border-[#95B2B8] flex items-center justify-center text-[#95B2B8] transition-all">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest uppercase text-gray-400">
                  Call Showroom
                </span>
                <span className="text-sm font-mono font-bold text-white group-hover:text-[#95B2B8] transition-colors">
                  +92 300 9490734
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#95B2B8] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Location */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=4+Mission+Rd,+Anarkali+Bazaar+Lahore,+54000,+Pakistan"
            target="_blank"
            rel="noopener noreferrer"
            className="py-5 px-4 sm:px-6 flex items-center justify-between group hover:bg-[#202A2D] transition-colors"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-sm bg-[#202A2D] group-hover:bg-[#95B2B8]/20 border border-[#324145] group-hover:border-[#95B2B8] flex items-center justify-center text-[#95B2B8] transition-all">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest uppercase text-gray-400">
                  Store Location
                </span>
                <span className="text-xs sm:text-sm font-medium text-gray-200 group-hover:text-white transition-colors line-clamp-1">
                  4 Mission Rd, Anarkali Bazaar Lahore
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#95B2B8] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Facebook */}
          <a
            href="http://www.facebook.com/MeersInterior"
            target="_blank"
            rel="noopener noreferrer"
            className="py-5 px-4 sm:px-6 flex items-center justify-between group hover:bg-[#202A2D] transition-colors"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-sm bg-[#202A2D] group-hover:bg-[#95B2B8]/20 border border-[#324145] group-hover:border-[#95B2B8] flex items-center justify-center text-[#95B2B8] transition-all">
                <span className="font-bold text-base">f</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest uppercase text-gray-400">
                  Social Presence
                </span>
                <span className="text-sm font-mono font-medium text-white group-hover:text-[#95B2B8] transition-colors">
                  facebook.com/MeersInterior
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#95B2B8] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default QuickContactStrip;
