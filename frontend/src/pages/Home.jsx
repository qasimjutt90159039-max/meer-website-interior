import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Shield,
  Layers,
  Sparkles,
  Sliders,
  CheckCircle2,
  Box,
  Compass,
  Grid,
  Phone,
  LayoutGrid
} from 'lucide-react';
import QuickContactStrip from '../components/QuickContactStrip';
import WorkspaceExplorer from '../components/WorkspaceExplorer';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import InquiryModal from '../components/InquiryModal';
import api from '../services/api';

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const data = await api.getProducts({ featured: true });
        setFeaturedProducts(data.slice(0, 4));
      } catch (err) {
        console.warn('Could not load featured products:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const handleInquire = (product) => {
    setSelectedProductForInquiry(product);
    setIsModalOpen(true);
  };

  const workspaceCategoriesList = [
    { title: 'Office Desks', count: '01', desc: 'Executive suites, computer tables & minimalist task surfaces' },
    { title: 'Office Chairs', count: '02', desc: 'Ergonomic task chairs, high-back mesh & leather executive seating' },
    { title: 'Workstations', count: '03', desc: 'Modular 2/4/6 person benching systems with acoustic dividers' },
    { title: 'Storage', count: '04', desc: 'Under-desk mobile pedestals, filing cabinets & credenzas' },
    { title: 'Meeting Furniture', count: '05', desc: 'Boardroom conference tables & executive discussion groupings' },
    { title: 'Workspace Accessories', count: '06', desc: 'Concealed wire raceways, CPU mounts & desktop privacy screens' },
  ];

  return (
    <div className="pt-20">
      {/* 1. HERO SECTION - ASYMMETRIC SPLIT-SCREEN */}
      <section className="relative overflow-hidden bg-[#F4F7F7] border-b border-[#E5EBEC] min-h-[calc(100vh-5rem)] flex items-center">
        {/* Background architectural grid */}
        <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-6 space-y-6">
              {/* Category eyebrow */}
              <div className="inline-flex items-center space-x-2 bg-white border border-[#E5EBEC] px-3 py-1 rounded-sm shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#95B2B8] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#172326] font-bold">
                  OFFICE FURNITURE STORE
                </span>
              </div>

              {/* Large Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#172326] tracking-tight leading-[1.08]">
                Architectural Furniture for Modern Workspaces.
              </h1>

              {/* Strict Authentic Description */}
              <p className="text-base sm:text-lg text-[#596568] leading-relaxed max-w-xl font-light">
                Meer’s Interior supplies dedicated office desks, ergonomic seating, modular workstations, and commercial storage solutions located at Anarkali Bazaar, Lahore.
              </p>

              {/* CTA Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/furniture"
                  className="inline-flex items-center space-x-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-bold font-mono text-xs uppercase px-6 py-3.5 rounded-sm transition-all shadow-sm hover:shadow"
                >
                  <span>Explore Furniture</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-white hover:bg-[#172326] hover:text-white text-[#172326] border border-[#E5EBEC] hover:border-[#172326] font-mono text-xs uppercase font-semibold px-6 py-3.5 rounded-sm transition-all"
                >
                  <span>Contact Meer’s Interior</span>
                  <ArrowUpRight className="w-4 h-4 text-[#95B2B8]" />
                </Link>
              </div>

              {/* Technical Indicator Badges */}
              <div className="pt-8 border-t border-[#E5EBEC] grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs text-[#596568]">
                <div>
                  <span className="text-[10px] uppercase text-gray-400 block">Location</span>
                  <span className="font-bold text-[#172326]">Lahore, Pakistan</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-gray-400 block">Catalog Core</span>
                  <span className="font-bold text-[#172326]">Office Environments</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase text-gray-400 block">Inquiries</span>
                  <span className="font-bold text-[#172326]">+92 300 9490734</span>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Layered floating architectural visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Decorative #95B2B8 Accent Frame */}
                <div className="absolute -top-3 -right-3 w-full h-full border-2 border-[#95B2B8] rounded-sm pointer-events-none z-0" />
                
                {/* Main Visual Card */}
                <div className="relative z-10 bg-[#172326] rounded-sm overflow-hidden border border-[#324145] shadow-2xl aspect-[4/3] sm:aspect-[16/11]">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                    alt="Modern Office Workspace Composition"
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172326] via-transparent to-transparent opacity-80" />

                  {/* Corner Label */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="font-mono text-[10px] tracking-widest uppercase bg-[#172326]/90 text-[#95B2B8] px-3 py-1 border border-[#324145] rounded-sm">
                      CATALOG PREVIEW // 01
                    </span>
                  </div>

                  {/* Image Bottom Strip */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 bg-[#202A2D]/95 backdrop-blur-md p-3.5 rounded-sm border border-[#324145] flex items-center justify-between text-white">
                    <div>
                      <span className="block font-mono text-[10px] text-[#95B2B8] uppercase">Layout Concept</span>
                      <span className="text-xs font-bold font-sans">Open Benching & Acoustic Partitions</span>
                    </div>
                    <Link
                      to="/workspace"
                      className="p-1.5 rounded-sm bg-[#95B2B8] text-[#172326] hover:bg-white transition-colors"
                      aria-label="View workspace solutions"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Floating Technical Badge 1 (Bottom Left) */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 z-30 bg-white border border-[#E5EBEC] p-3.5 rounded-sm shadow-xl hidden sm:flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-sm bg-[#95B2B8]/20 border border-[#95B2B8] flex items-center justify-center text-[#172326]">
                    <Layers className="w-5 h-5 text-[#172326]" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-gray-400">Standard</span>
                    <span className="text-xs font-bold text-[#172326]">Modular Fabrication</span>
                  </div>
                </div>

                {/* Floating Technical Badge 2 (Top Right) */}
                <div className="absolute -top-5 -right-4 sm:-right-6 z-30 bg-white border border-[#E5EBEC] p-3 rounded-sm shadow-xl hidden sm:flex items-center space-x-2 font-mono text-[11px] text-[#172326]">
                  <span className="w-2 h-2 rounded-full bg-[#95B2B8]" />
                  <span>Anarkali Bazaar • Lahore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK CONTACT STRIP */}
      <QuickContactStrip />

      {/* 3. SECTION: FURNITURE FOR DIFFERENT WORKSPACES */}
      <section className="py-20 bg-white border-b border-[#E5EBEC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            number="01 // CLASSIFICATION"
            eyebrow="Commercial Categories"
            title="Furniture for Different Workspaces"
            description="Office environments require purpose-built ergonomics and zoning. Browse our core catalog classifications designed to accommodate focused individual work, team clusters, and conference areas."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaceCategoriesList.map((cat) => (
              <div
                key={cat.count}
                className="p-6 bg-[#F4F7F7] border border-[#E5EBEC] hover:border-[#95B2B8] rounded-sm group transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#95B2B8] px-2 py-0.5 bg-white border border-[#E5EBEC] rounded-sm">
                      {cat.count}
                    </span>
                    <span className="text-xs font-mono uppercase text-gray-400">Classification</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#172326] group-hover:text-[#95B2B8] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#596568] leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5EBEC] flex items-center justify-between">
                  <Link
                    to={`/furniture?category=${encodeURIComponent(cat.title)}`}
                    className="text-xs font-mono uppercase font-semibold text-[#172326] group-hover:text-[#95B2B8] flex items-center space-x-1.5 transition-colors"
                  >
                    <span>View In Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#95B2B8]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION: INTERACTIVE WORKSPACE EXPLORER */}
      <section className="py-20 bg-[#F4F7F7] border-b border-[#E5EBEC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            number="02 // INTERACTIVE EXPLORER"
            eyebrow="Spatial Layouts"
            title="Interactive Workspace Explorer"
            description="Select a furniture zone below to inspect functional engineering standards, cable containment provisions, and recommended office setups."
          />

          <WorkspaceExplorer />
        </div>
      </section>

      {/* 5. SECTION: FEATURED FURNITURE AREA */}
      <section className="py-20 bg-white border-b border-[#E5EBEC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeader
              number="03 // SELECTED PIECES"
              eyebrow="Catalog Spotlight"
              title="Featured Office Furniture"
              description="Review selected office furniture models available for order and custom fabrication inquiry."
            />

            <div className="mb-8 md:mb-12">
              <Link
                to="/furniture"
                className="inline-flex items-center space-x-2 text-xs font-mono uppercase font-bold text-[#172326] hover:text-[#95B2B8] border-b-2 border-[#95B2B8] pb-1 transition-colors"
              >
                <span>Browse Full Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-2 border-[#95B2B8] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="mt-3 font-mono text-xs uppercase text-[#596568]">Loading featured furniture items...</p>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onInquire={handleInquire}
                />
              ))}
            </div>
          ) : (
            /* Elegant empty state per strict prompt requirements */
            <div className="border border-dashed border-[#E5EBEC] bg-[#F4F7F7] p-12 text-center rounded-sm">
              <Box className="w-10 h-10 text-[#95B2B8] mx-auto mb-3" />
              <h4 className="text-base font-bold text-[#172326]">No Featured Products</h4>
              <p className="text-xs text-[#596568] max-w-md mx-auto mt-1 font-mono">
                Furniture collection will appear here once product information is added.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 6. SECTION: GENERAL FURNITURE CONSIDERATIONS */}
      {/* Strict adherence: NO invented business-specific claims. Explains general furniture considerations only. */}
      <section className="py-20 bg-[#172326] text-white border-b border-[#324145]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            number="04 // PLANNING CRITERIA"
            eyebrow="Workspace Considerations"
            title="General Office Furniture Considerations"
            description="When planning an office environment, selecting the appropriate furniture system requires balancing biomechanics, spatial flow, and long-term durability. These core considerations guide commercial workspace layout design:"
            dark={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#202A2D] border border-[#324145] rounded-sm space-y-3">
              <span className="font-mono text-xs text-[#95B2B8] block">01 / APPEARANCE</span>
              <h4 className="text-base font-bold text-white">Professional Workspace Appearance</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Cohesive architectural finishes and clean desk profiles establish an organized, credible business environment for clients and employees alike.
              </p>
            </div>

            <div className="p-6 bg-[#202A2D] border border-[#324145] rounded-sm space-y-3">
              <span className="font-mono text-xs text-[#95B2B8] block">02 / ORGANIZATION</span>
              <h4 className="text-base font-bold text-white">Practical Organization & Cable Flow</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Dedicated wire management raceways and mobile storage pedestals keep work surfaces uncluttered and technical cables safely routed.
              </p>
            </div>

            <div className="p-6 bg-[#202A2D] border border-[#324145] rounded-sm space-y-3">
              <span className="font-mono text-xs text-[#95B2B8] block">03 / ERGONOMICS</span>
              <h4 className="text-base font-bold text-white">Workspace Comfort & Posture</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Chairs with lumbar adjustment and proportional work surface heights help reduce physical strain during sustained hours of computer work.
              </p>
            </div>

            <div className="p-6 bg-[#202A2D] border border-[#324145] rounded-sm space-y-3">
              <span className="font-mono text-xs text-[#95B2B8] block">04 / AESTHETICS</span>
              <h4 className="text-base font-bold text-white">Clean Architectural Aesthetics</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Minimalist geometries, matte powder-coated steel frameworks, and balanced color palettes maintain visual clarity across open-plan floors.
              </p>
            </div>
          </div>

          <div className="mt-10 p-4 bg-[#202A2D]/50 border border-[#324145] rounded-sm text-center">
            <p className="text-[11px] font-mono text-gray-400">
              Note: The items above reflect general furniture considerations and planning principles for commercial workspaces.
            </p>
          </div>
        </div>
      </section>

      {/* 7. PRE-FOOTER INQUIRY BANNER */}
      <section className="py-16 bg-[#F4F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#E5EBEC] p-8 sm:p-12 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
            <div className="space-y-2 max-w-xl">
              <span className="font-mono text-xs uppercase text-[#95B2B8] tracking-widest font-bold">
                Showroom Consultation
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172326]">
                Planning Your Office Layout in Lahore?
              </h3>
              <p className="text-xs sm:text-sm text-[#596568]">
                Visit Meer’s Interior at 4 Mission Rd, Anarkali Bazaar Lahore, or contact us directly at +92 300 9490734 for catalog inquiries and specifications.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:+923009490734"
                className="inline-flex items-center space-x-2 bg-[#172326] hover:bg-[#202A2D] text-white font-mono text-xs uppercase font-bold px-6 py-3.5 rounded-sm transition-all"
              >
                <Phone className="w-4 h-4 text-[#95B2B8]" />
                <span>+92 300 9490734</span>
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-mono text-xs uppercase font-bold px-6 py-3.5 rounded-sm transition-all"
              >
                <span>Inquire Online</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefillProduct={selectedProductForInquiry}
      />
    </div>
  );
};

export default Home;
