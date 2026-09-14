import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ExternalLink, ArrowRight, Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#172326] text-white border-t border-[#324145]">
      {/* Top Accent Strip */}
      <div className="h-1 bg-[#95B2B8] w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand & Category */}
          <div className="space-y-4">
            <div className="inline-block border-b border-[#95B2B8] pb-1">
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#95B2B8] font-bold">
                Office Furniture Store
              </span>
              <h3 className="text-2xl font-black tracking-tight text-white mt-1">
                Meer’s Interior
              </h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Dedicated provider of commercial office furniture systems, ergonomic executive seating, and modern workspace layout solutions located in Lahore, Pakistan.
            </p>
            <div className="pt-2">
              <a
                href="http://www.facebook.com/MeersInterior"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#95B2B8] hover:text-white border border-[#324145] hover:border-[#95B2B8] px-3 py-2 rounded-sm transition-all"
              >
                <span>Follow on Facebook</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#95B2B8] mb-4">
              Explore Catalog
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/furniture" className="text-gray-300 hover:text-[#95B2B8] transition-colors flex items-center space-x-2">
                  <ArrowRight className="w-3 h-3 text-[#95B2B8]" />
                  <span>All Office Furniture</span>
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-[#95B2B8] transition-colors flex items-center space-x-2">
                  <ArrowRight className="w-3 h-3 text-[#95B2B8]" />
                  <span>Furniture Categories</span>
                </Link>
              </li>
              <li>
                <Link to="/workspace" className="text-gray-300 hover:text-[#95B2B8] transition-colors flex items-center space-x-2">
                  <ArrowRight className="w-3 h-3 text-[#95B2B8]" />
                  <span>Workspace Solutions</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-[#95B2B8] transition-colors flex items-center space-x-2">
                  <ArrowRight className="w-3 h-3 text-[#95B2B8]" />
                  <span>Design & Visual Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-[#95B2B8] transition-colors flex items-center space-x-2">
                  <ArrowRight className="w-3 h-3 text-[#95B2B8]" />
                  <span>About Meer’s Interior</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Direct Actions */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#95B2B8] mb-4">
              Direct Contact
            </h4>
            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-xs font-mono uppercase text-gray-400 mb-1">Direct Phone</span>
                <a
                  href="tel:+923009490734"
                  className="text-base font-mono font-bold text-white hover:text-[#95B2B8] flex items-center space-x-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#95B2B8]" />
                  <span>+92 300 9490734</span>
                </a>
              </div>

              <div>
                <span className="block text-xs font-mono uppercase text-gray-400 mb-1">Showroom Address</span>
                <p className="text-gray-300 flex items-start space-x-2 text-xs leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#95B2B8] shrink-0 mt-0.5" />
                  <span>4 Mission Rd, Anarkali Bazaar Lahore, 54000, Pakistan</span>
                </p>
              </div>

              <div className="pt-1">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=4+Mission+Rd,+Anarkali+Bazaar+Lahore,+54000,+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-[#95B2B8] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Architectural Note & Business Focus */}
          <div className="bg-[#202A2D] p-5 border border-[#324145] rounded-sm flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#95B2B8] block mb-2">
                Commercial Standards
              </span>
              <p className="text-xs text-gray-300 leading-relaxed">
                Consult with Meer’s Interior for custom modular configurations, executive desk layouts, and ergonomic task seating specifications for your corporate environment.
              </p>
            </div>
            
            <div className="pt-4 border-t border-[#324145] mt-4 flex items-center justify-between">
              <Link
                to="/contact"
                className="text-xs font-mono text-[#95B2B8] hover:text-white uppercase tracking-wider flex items-center space-x-1"
              >
                <span>Inquire Now</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              <Link
                to="/admin"
                className="text-[11px] text-gray-400 hover:text-gray-200 flex items-center space-x-1"
                title="Management Portal"
              >
                <Shield className="w-3 h-3" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#324145] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-mono">
          <p>© {new Date().getFullYear()} Meer’s Interior. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 text-[11px]">
            Lahore, Pakistan • Office Furniture Store
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
