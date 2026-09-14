import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Furniture', path: '/furniture' },
    { name: 'Categories', path: '/categories' },
    { name: 'Workspace', path: '/workspace' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#172326]/95 backdrop-blur-md border-b border-[#324145] text-white shadow-xl shadow-black/10 py-3 sm:py-3.5'
          : 'bg-[#F4F7F7]/95 backdrop-blur-sm border-b border-[#E5EBEC] text-[#172326] py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Identity: Clean, bold typography without top sub-text */}
          <Link to="/" className="flex items-center space-x-3 group focus:outline-none">
            {/* Minimalist Architectural Monogram Mark */}
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-sm flex items-center justify-center border transition-all duration-300 ${
                isScrolled
                  ? 'bg-[#202A2D] border-[#324145] group-hover:border-[#95B2B8]'
                  : 'bg-white border-[#E5EBEC] group-hover:border-[#95B2B8] shadow-xs'
              }`}
            >
              <div className="flex items-baseline space-x-0.5">
                <span className="font-serif text-base sm:text-lg font-bold text-[#95B2B8]">M</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#95B2B8]" />
              </div>
            </div>

            {/* Brand Name (Text above Meer's is completely removed) */}
            <div className="flex items-baseline space-x-1.5">
              <span
                className={`text-xl sm:text-2xl font-black tracking-tight font-sans transition-colors ${
                  isScrolled ? 'text-white group-hover:text-[#95B2B8]' : 'text-[#172326] group-hover:text-[#95B2B8]'
                }`}
              >
                Meer’s
              </span>
              <span className="text-xl sm:text-2xl font-light tracking-wide text-[#95B2B8] font-sans">
                Interior
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Clean links without numbers */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-200 rounded-sm relative group ${
                    isActive
                      ? isScrolled
                        ? 'bg-[#202A2D] text-[#95B2B8] font-bold border border-[#324145]'
                        : 'bg-white text-[#172326] font-bold border border-[#95B2B8] shadow-xs'
                      : isScrolled
                      ? 'text-gray-300 hover:text-white hover:bg-white/5'
                      : 'text-[#596568] hover:text-[#172326] hover:bg-black/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="relative flex items-center space-x-1">
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#95B2B8]" />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right CTA - Sleek unique Contact / Consultation button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/contact"
              className="relative inline-flex items-center space-x-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-mono font-bold text-xs uppercase px-5 py-2.5 rounded-sm transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 group"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Right: Menu Toggle & Quick Action */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              to="/contact"
              className="text-[11px] font-mono font-bold uppercase bg-[#95B2B8] text-[#172326] px-3 py-1.5 rounded-sm"
            >
              Contact
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#95B2B8] transition-colors ${
                isScrolled ? 'text-white hover:bg-[#202A2D]' : 'text-[#172326] hover:bg-[#E5EBEC]'
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation - Clean links without numbers or location tag */}
      {isOpen && (
        <div className="lg:hidden bg-[#172326] border-b border-[#324145] px-4 pt-4 pb-6 space-y-3 animate-fadeIn text-white shadow-2xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 text-xs font-mono uppercase tracking-wider rounded-sm transition-colors ${
                    isActive
                      ? 'bg-[#202A2D] text-[#95B2B8] font-bold border-l-2 border-[#95B2B8]'
                      : 'text-gray-300 hover:bg-[#202A2D] hover:text-white'
                  }`
                }
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-[#324145]">
            <Link
              to="/contact"
              className="block w-full text-center bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-mono font-bold text-xs uppercase tracking-wider py-3.5 rounded-sm transition-colors shadow-sm"
            >
              Contact Meer’s Interior
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
