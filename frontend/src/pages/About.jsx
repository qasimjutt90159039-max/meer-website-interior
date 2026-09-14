import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ExternalLink, ArrowRight, Compass, Layers, ShieldCheck, Box, Sliders } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

export const About = () => {
  return (
    <div className="pt-20">
      {/* Header Banner */}
      <section className="bg-[#172326] text-white py-20 border-b border-[#324145] relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#95B2B8] block mb-3 font-semibold">
            ABOUT THE BUSINESS
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Commercial Furniture & Modern Workspace Purpose.
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-sm sm:text-base font-light leading-relaxed">
            Meer’s Interior is an office furniture store situated at 4 Mission Rd, Anarkali Bazaar Lahore, providing specialized desks, ergonomic seating, and modular office configurations.
          </p>
        </div>
      </section>

      {/* 1. About & Business Category */}
      <section className="py-20 bg-white border-b border-[#E5EBEC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionHeader
                number="01 // BUSINESS OVERVIEW"
                eyebrow="Identity & Role"
                title="Dedicated Office Furniture Specialist"
              />
              <p className="text-sm text-[#596568] leading-relaxed font-light">
                Meer’s Interior operates within the dedicated business category of an <strong className="text-[#172326] font-semibold">Office Furniture Store</strong>. The catalog and showroom focus exclusively on commercial workspace environments, including executive offices, shared workstation clusters, and corporate meeting rooms.
              </p>
              <p className="text-sm text-[#596568] leading-relaxed font-light">
                Modern corporate work environments require structural stability, ergonomic certifications, and wire-safe architectural detailing. Meer’s Interior serves businesses and organizations in Lahore looking for functional and aesthetically sound furnishings.
              </p>

              <div className="p-4 bg-[#F4F7F7] border-l-2 border-[#95B2B8] space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#172326] font-bold">Category Confirmation</span>
                <p className="text-xs text-[#596568]">
                  Classification: Commercial Office Furniture Store (Desks, Chairs, Benching, Storage & Conference Furniture).
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative border border-[#E5EBEC] p-3 bg-[#F4F7F7] rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80"
                  alt="Architectural Workspace Interior"
                  className="w-full aspect-[4/3] object-cover rounded-sm"
                />
                <div className="p-4 bg-white border-t border-[#E5EBEC] mt-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#172326] font-bold">Office Furniture Store</span>
                  <span className="font-mono text-xs text-[#95B2B8]">Lahore, Pakistan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Office Furniture Focus */}
      <section className="py-20 bg-[#F4F7F7] border-b border-[#E5EBEC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            number="02 // CATALOG DOMAIN"
            eyebrow="Commercial Focus"
            title="Office Furniture Focus & Ergonomic Utility"
            description="Our primary merchandise lines prioritize workplace posture, spatial adaptability, and commercial grade finishes."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 border border-[#E5EBEC] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#172326] text-[#95B2B8] flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172326]">Ergonomic Task Seating</h3>
              <p className="text-xs text-[#596568] leading-relaxed">
                Chairs built with synchronized tilt mechanisms, adjustable lumbar curves, and breathable mesh designed to support extended seated computer work.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#E5EBEC] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#172326] text-[#95B2B8] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172326]">Modular Workstation Benching</h3>
              <p className="text-xs text-[#596568] leading-relaxed">
                Shared desk systems featuring integrated data raceways and acoustic privacy dividers, allowing flexible team setups and future expansion.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#E5EBEC] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#172326] text-[#95B2B8] flex items-center justify-center">
                <Box className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172326]">Executive & Storage Systems</h3>
              <p className="text-xs text-[#596568] leading-relaxed">
                Managerial desk suites paired with under-desk lockable mobile pedestals, low-height credenzas, and secure filing cabinets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Design & Workspace Philosophy */}
      <section className="py-20 bg-white border-b border-[#E5EBEC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            number="03 // DESIGN PERSPECTIVE"
            eyebrow="Workspace Philosophy"
            title="Design & Workspace Philosophy"
            description="A functional office layout is not merely decorative; it directly influences team communication, focus, physical well-being, and organizational order."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="border border-[#E5EBEC] p-6 sm:p-8 bg-[#F4F7F7] space-y-4">
              <span className="font-mono text-xs text-[#95B2B8] uppercase font-bold">Axiom 01</span>
              <h4 className="text-xl font-bold text-[#172326]">Form Follows Functional Workflow</h4>
              <p className="text-xs sm:text-sm text-[#596568] leading-relaxed font-light">
                Desk geometries, aisle clearances, and wire management paths must align with how team members move and interact. When furniture reduces physical friction, the workplace operates with greater clarity.
              </p>
            </div>

            <div className="border border-[#E5EBEC] p-6 sm:p-8 bg-[#F4F7F7] space-y-4">
              <span className="font-mono text-xs text-[#95B2B8] uppercase font-bold">Axiom 02</span>
              <h4 className="text-xl font-bold text-[#172326]">Long-Term Material Durability</h4>
              <p className="text-xs sm:text-sm text-[#596568] leading-relaxed font-light">
                Commercial office furniture withstands continuous daily use. High-density melamine, scratch-resistant coatings, and powder-coated steel understructures ensure consistent performance year after year.
              </p>
            </div>
          </div>

          {/* Timeline-like visual for design concept purposes only (NO fake dates, NO fake events) */}
          <div className="mt-16 pt-12 border-t border-[#E5EBEC]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#95B2B8] block mb-2 font-semibold">
              WORKFLOW STAGES // CONCEPTUAL DESIGN PROCESS
            </span>
            <h4 className="text-lg font-bold text-[#172326] mb-6">
              Commercial Furniture Specification Stages
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              <div className="p-4 bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm">
                <span className="font-mono text-xs text-[#95B2B8] block font-bold">STAGE 01</span>
                <span className="font-bold text-sm text-[#172326] mt-1 block">Spatial Assessment</span>
                <p className="text-[11px] text-[#596568] mt-1">Reviewing room dimensions, access points, and power socket layouts.</p>
              </div>

              <div className="p-4 bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm">
                <span className="font-mono text-xs text-[#95B2B8] block font-bold">STAGE 02</span>
                <span className="font-bold text-sm text-[#172326] mt-1 block">Furniture Selection</span>
                <p className="text-[11px] text-[#596568] mt-1">Matching desks, ergonomic seating, and storage to functional requirements.</p>
              </div>

              <div className="p-4 bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm">
                <span className="font-mono text-xs text-[#95B2B8] block font-bold">STAGE 03</span>
                <span className="font-bold text-sm text-[#172326] mt-1 block">Configuration & Wiring</span>
                <p className="text-[11px] text-[#596568] mt-1">Planning wire management conduits, partition dividers, and pedestals.</p>
              </div>

              <div className="p-4 bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm">
                <span className="font-mono text-xs text-[#95B2B8] block font-bold">STAGE 04</span>
                <span className="font-bold text-sm text-[#172326] mt-1 block">Deployment</span>
                <p className="text-[11px] text-[#596568] mt-1">Placement, leveling, and ergonomic orientation for workplace readiness.</p>
              </div>
            </div>
            <p className="mt-3 text-[11px] font-mono text-gray-400">
              Note: This diagram illustrates the standard office furniture layout progression.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Location Information */}
      <section className="py-20 bg-[#172326] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            number="04 // STORE LOCATION"
            eyebrow="Showroom & Direct Contact"
            title="Situated in Anarkali Bazaar, Lahore"
            description="Our storefront is conveniently located in the historic commercial hub of Anarkali Bazaar, Lahore."
            dark={true}
          />

          <div className="bg-[#202A2D] border border-[#324145] p-6 sm:p-10 rounded-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <span className="font-mono text-xs uppercase text-[#95B2B8] block">Physical Address</span>
                <p className="text-base sm:text-lg font-bold text-white mt-1 flex items-start space-x-2">
                  <MapPin className="w-5 h-5 text-[#95B2B8] shrink-0 mt-1" />
                  <span>4 Mission Rd, Anarkali Bazaar Lahore, 54000, Pakistan</span>
                </p>
              </div>

              <div className="pt-2">
                <span className="font-mono text-xs uppercase text-[#95B2B8] block">Direct Telephone</span>
                <a
                  href="tel:+923009490734"
                  className="text-lg font-mono font-bold text-white hover:text-[#95B2B8] flex items-center space-x-2 transition-colors mt-1"
                >
                  <Phone className="w-5 h-5 text-[#95B2B8]" />
                  <span>+92 300 9490734</span>
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=4+Mission+Rd,+Anarkali+Bazaar+Lahore,+54000,+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-mono text-xs uppercase font-bold px-4 py-2.5 rounded-sm transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="http://www.facebook.com/MeersInterior"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 border border-[#324145] hover:border-[#95B2B8] text-gray-200 hover:text-white font-mono text-xs uppercase px-4 py-2.5 rounded-sm transition-colors"
                >
                  <span>Visit Facebook Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="border border-[#324145] p-6 bg-[#172326] rounded-sm space-y-3">
              <span className="font-mono text-xs text-[#95B2B8] uppercase block">Direct Inquiries</span>
              <p className="text-xs text-gray-300 leading-relaxed">
                Whether you need a single executive desk or a complete modular workstation benching arrangement, contact Meer’s Interior directly for current availability and custom sizing.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase text-[#95B2B8] hover:underline"
                >
                  <span>Go to Contact & Inquiry Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
